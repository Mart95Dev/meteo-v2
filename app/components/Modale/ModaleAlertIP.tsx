import React, { useState, useEffect } from "react";
import useErrorStore from "@/app/store/useErrorStore";
import useGeolocationStore from "@/app/store/useGeolocationStore";
import useLanguageBrowserStore from "@/app/store/useLanguageBrowser";
import { weatherWithLatitudeAndLongitude } from "@/app/functions/weatherWithLatitudeAndLongitude";

interface ModaleAlertIPProps {
  className?: string;
}

export default function ModaleAlertIP({ className }: ModaleAlertIPProps) {
  const { error, setError } = useErrorStore();
  const { latitude, longitude, setIsGeolocationEnabled, setCoordinates } =
    useGeolocationStore();
  const { language_browser } = useLanguageBrowserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs((prevLogs) => [
      ...prevLogs,
      `${new Date().toISOString()}: ${message}`,
    ]);
  };

  useEffect(() => {
    addLog(
      `Initialisation - Latitude: ${latitude}, Longitude: ${longitude}, Langue: ${language_browser}`
    );
    addLog(`API Bundle Key: ${process.env.NEXT_PUBLIC_API_BUNDLE_KEY || 'Non définie'}`);

    const fetchIPLocation = async () => {
      try {
        addLog("Début de la récupération par IP");      
        const ApiBundleKey = process.env.NEXT_PUBLIC_API_BUNDLE_KEY;
        if (!ApiBundleKey) {
          throw new Error("Clé API manquante");
        }
        const response = await fetch("https://api.ipify.org?format=json");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const dataIP = await response.json();
        addLog(`IP récupérée: ${dataIP.ip}`);

        const locationIP = await fetch(
          `https://api.apibundle.io/ip-lookup?apikey=${ApiBundleKey}&ip=${dataIP.ip}`
        );
        if (!locationIP.ok) {
          throw new Error(
            `Erreur HTTP lors de la récupération de la localisation: ${locationIP.status}`
          );
        }
        const locationLongitudeLatitude = await locationIP.json();
        addLog(
          `Réponse brute de l'API de géolocalisation : ${JSON.stringify(
            locationLongitudeLatitude
          )}`
        );

        if (
          locationLongitudeLatitude.latitude &&
          locationLongitudeLatitude.longitude
        ) {
          addLog(
            `Tentative de définition des coordonnées : ${locationLongitudeLatitude.latitude}, ${locationLongitudeLatitude.longitude}`
          );
          setCoordinates(
            locationLongitudeLatitude.latitude,
            locationLongitudeLatitude.longitude
          );
        } else {
          throw new Error("Coordonnées non trouvées dans la réponse");
        }
      } catch (ipError) {
        addLog(
          `Erreur détaillée lors de la récupération de l'adresse IP : ${ipError}`
        );
        setError("Impossible de récupérer les données de localisation");
      }
    };

    fetchIPLocation();
  }, [setCoordinates, setError, language_browser, latitude, longitude]);

  useEffect(() => {
    addLog(
      `Mise à jour des coordonnées - Latitude: ${latitude}, Longitude: ${longitude}`
    );
  }, [latitude, longitude]);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (latitude === null || longitude === null || !language_browser) {
      const errorMessage = "Coordonnées ou langue non disponibles";
      addLog(errorMessage);
      setError(errorMessage);
      return;
    }

    setIsLoading(true);
    try {
      addLog("Tentative de récupération des données météo...");
      await weatherWithLatitudeAndLongitude(
        latitude,
        longitude,
        language_browser
      );
      setIsGeolocationEnabled(true);
      addLog("Données météo récupérées avec succès");
    } catch (error) {
      const errorMessage = "Erreur lors de la récupération des données météo";
      addLog(`${errorMessage}: ${error}`);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleContinue}>
        <p className="message-alert">{error}</p>
        <button
          type="submit"
          className="button-alert"
          disabled={isLoading || latitude === null || longitude === null}
        >
          {isLoading ? "Chargement..." : "Continuer"}
        </button>
        <p>
          Latitude: {latitude}, Longitude: {longitude}, Langue:{" "}
          {language_browser}
        </p>
      </form>
      <div className="debug-logs">
        <h3>Logs de débogage :</h3>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
