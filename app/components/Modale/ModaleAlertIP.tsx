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
  const { latitude, longitude, setIsGeolocationEnabled } = useGeolocationStore();
  const { language_browser } = useLanguageBrowserStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    console.log("Language browser:", language_browser);
    console.log("Langue du navigateur dans le composant:", language_browser);
  }, [latitude, longitude, language_browser]);

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (latitude === null || longitude === null || !language_browser) {
      const errorMessage = "Coordonnées ou langue non disponibles";
      console.error(errorMessage);
      setError(errorMessage);
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
      console.error("Erreur lors de la récupération des données météo:", error);
      setError("Erreur lors de la récupération des données météo");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleContinue} className={className}>
      <p className="message-alert">{error}</p>
      <button
        type="submit"
        className="button-alert"
        disabled={isLoading || !latitude || !longitude || !language_browser}
      >
        {isLoading ? "Chargement..." : "Continuer"}
      </button>
      <p>Latitude: {latitude}, Longitude: {longitude}, Langue: {language_browser}</p>
    </form>
  );
}