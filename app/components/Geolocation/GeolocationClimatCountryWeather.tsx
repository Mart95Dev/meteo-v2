import useCountryStore from "@/app/store/useCountryStore";
// import useGeolocationStore from "@/app/store/useGeolocationStore";
import useGeolocationStore, {
  locationWeatherData,
} from "@/app/store/useGeolocationStore"; // Importer l'interface
import useLanguageBrowserStore from "@/app/store/useLanguageBrowser";

import FlagDisplay from "@/app/components/Flag/FlagDisplay";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GeolocationClimatCountryWeather() {
  const [isLoading, setIsLoading] = useState(true);
  const { geo_city, geo_country } = useCountryStore();
  const { locationWeather } = useGeolocationStore();
  const { language_browser } = useLanguageBrowserStore();

  const altIcon =
    language_browser == "fr"
      ? `Description de l'icon météorologique de la journée: ${locationWeather?.description}`
      : `Description of the day's weather icon: ${locationWeather?.description}`;

  const iconUrl =
    typeof locationWeather?.icon === "string" ? locationWeather.icon : "";

  const geoData = (info: string) => {
    return info !== "" ? "weather-data" : "";
  };

  const weatherGeoInfo = (
    info: locationWeatherData | null
  ): string | undefined => {
    return info ? "weather-data" : undefined;
  };

  useEffect(() => {
    if (locationWeather) {
      return setIsLoading(false);
    }
  }, [locationWeather]);

  return (
    <div className="weather-box">
      <div className="country-flag poppins-regular ">
        <FlagDisplay />
      </div>
      <div className="country-name poppins-semibold ">
        <span>PAYS :</span>
        <span className={geoData(geo_country)}>
          {geo_country.toUpperCase()}
        </span>
      </div>
      <div className="capital-name poppins-semibold ">
        <span>VILLE :</span>
        <span className={geoData(geo_city)}>{geo_city.toUpperCase()}</span>
      </div>

      <div className="weather-type poppins-semibold">
        {locationWeather?.description.toUpperCase()}
      </div>
      <div className="weather-icon">
        {isLoading ? (
          <p>Recherche en cours...</p>
        ) : (
          // Afficher l'image si isLoading est false
          <Image src={iconUrl} alt={altIcon} width={80} height={80} />
        )}
      </div>
      <div className="temperature-label poppins-semibold">
        <span>Température</span>
      </div>
      <div className="real-feel">
        <span>
          Réelle :
          <span className={weatherGeoInfo(locationWeather)}>
            {locationWeather?.temp_real} °
          </span>
        </span>
      </div>
      <div className="feels-like">
        <span>Ressenti: </span>
        <span className={weatherGeoInfo(locationWeather)}>
          {locationWeather?.temp_feel} °
        </span>
      </div>
      <div className="climate-label poppins-semibold">Climat</div>
      <div className="rain ">
        <span>Pluie:</span>
        <span className={weatherGeoInfo(locationWeather)}>
          {locationWeather?.rain}
        </span>
      </div>
      <div className="wind ">
        <span>Vent:</span>
        <span className={weatherGeoInfo(locationWeather)}>
          {locationWeather?.wind} km/h
        </span>
      </div>
      <div className="humidity ">
        <span>Humidité:</span>
        <span className={weatherGeoInfo(locationWeather)}>
          {locationWeather?.humidity} %
        </span>
      </div>
    </div>
  );
}
