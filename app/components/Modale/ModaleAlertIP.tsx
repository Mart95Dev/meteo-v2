import useErrorStore from "@/app/store/useErrorStore";
import useGeolocationStore from "@/app/store/useGeolocationStore";
import useLanguageBrowserStore from "@/app/store/useLanguageBrowser";
import { weatherWithLatitudeAndLongitude } from "@/app/functions/weatherWithLatitudeAndLongitude";
import { useState, useEffect } from "react";

interface ModaleAlertIPProps {
  className?: string;
}

export default function ModaleAlertIP({ className }: ModaleAlertIPProps) {
  const { error, setError } = useErrorStore();
  const { latitude, longitude, setIsGeolocationEnabled, setCoordinates } = useGeolocationStore();
  const { language_browser } = useLanguageBrowserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prevLogs => [...prevLogs, `${new Date().toISOString()}: ${message}`]);
  };

  useEffect(() => {
    addLog(`État initial - Latitude: ${latitude}, Longitude: ${longitude}, Langue: ${language_browser}`);

    if (latitude === null || longitude === null) {
      addLog("Coordonnées non disponibles. Tentative de récupération...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLatitude = position.coords.latitude;
          const newLongitude = position.coords.longitude;
          addLog(`Position obtenue - Latitude: ${newLatitude}, Longitude: ${newLongitude}`);
          setCoordinates(newLatitude, newLongitude);
        },
        (error) => {
          addLog(`Erreur de géolocalisation: ${error.message}`);
          addLog("Tentative de récupération de l'IP...");
          // Ici, vous pouvez ajouter la logique pour récupérer la position via l'IP
        },
        { timeout: 10000, maximumAge: 0 }
      );
    }
  }, [latitude, longitude, language_browser, setCoordinates]);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (latitude === null || longitude === null || language_browser === null) {
      const errorMessage = "Coordonnées ou langue non disponibles";
      addLog(errorMessage);
      setError(errorMessage);
      return;
    }

    setIsLoading(true);
    try {
      addLog("Tentative de récupération des données météo...");
      await weatherWithLatitudeAndLongitude(latitude, longitude, language_browser);
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
          disabled={isLoading || latitude === null || longitude === null || language_browser === null}
        >
          {isLoading ? "Chargement..." : "Continuer"}
        </button>
        <p>Latitude: {latitude}, Longitude: {longitude}, Langue: {language_browser}</p>
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