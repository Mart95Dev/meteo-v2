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
  const [isLocationReady, setIsLocationReady] = useState(false);

  useEffect(() => {
    const fetchIPLocation = async () => {
      try {
        const ApiBundleKey = process.env.NEXT_PUBLIC_API_BUNDLE_KEY;
        if (!ApiBundleKey) {
          throw new Error("Clé API manquante");
        }
        const response = await fetch("https://api.ipify.org?format=json");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const dataIP = await response.json();

        const locationIP = await fetch(
          `https://api.apibundle.io/ip-lookup?apikey=${ApiBundleKey}&ip=${dataIP.ip}`
        );
        if (!locationIP.ok) {
          throw new Error(
            `Erreur HTTP lors de la récupération de la localisation: ${locationIP.status}`
          );
        }
        const locationLongitudeLatitude = await locationIP.json();

        if (
          locationLongitudeLatitude.latitude &&
          locationLongitudeLatitude.longitude
        ) {
          setCoordinates(
            locationLongitudeLatitude.latitude,
            locationLongitudeLatitude.longitude
          );
        } else {
          throw new Error("Coordonnées non trouvées dans la réponse");
        }
      } catch (ipError) {
        setError("Impossible de récupérer les données de localisation");
      }
    };

    fetchIPLocation();
  }, [setCoordinates, setError]);

  useEffect(() => {
    if (latitude !== null && longitude !== null && language_browser) {
      setIsLocationReady(true);
    }
  }, [latitude, longitude, language_browser]);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (latitude === null || longitude === null || !language_browser) {
      setError("Coordonnées ou langue non disponibles");
      return;
    }

    setIsLoading(true);
    try {
      await weatherWithLatitudeAndLongitude(
        latitude,
        longitude,
        language_browser
      );
      setIsGeolocationEnabled(true);
    } catch (error) {
      setError("Erreur lors de la récupération des données météo");
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
          disabled={isLoading || !isLocationReady}
        >
          {isLoading ? "Chargement..." : "Continuer"}
        </button>
      </form>
    </div>
  );
}
