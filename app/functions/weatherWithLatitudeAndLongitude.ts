
import useCountryStore from "@/app/store/useCountryStore";
import useGeolocationStore from "@/app/store/useGeolocationStore";
import useFlagStore from "@/app/store/useFlagStore";
import codeCountriesFiltered from "../data/filtered_curiexplore-pays.json"


export const weatherWithLatitudeAndLongitude = async (
  latitude: number,
  longitude: number,
  language: string
) => {
  console.log(`Début de weatherWithLatitudeAndLongitude: lat=${latitude}, lon=${longitude}, lang=${language}`);
  try {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY_OPENWEATHER;
    console.log(`Clé API OpenWeather: ${apiKey ? "Présente" : "Manquante"}`);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=${language}`
    );

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des données de la ville."
      );
    }

    const data = await response.json();
    

    //// weather with time
    interface WeatherData {
      dt_txt: string; // Date et heure de la prévision
      description: string; // Température en degrés Celsius
      icon: string; // URL de l'icône météo
      temp_real: number | null; // Température réelle
      temp_feel: number | null; // Température ressentie
      rain?: { "1h": number } | null; // Précipitations (en mm ou en %)
      wind: number | null; // Vitesse du vent (en km/h)
      humidity: number | null; // Humidité (en %)
    }

    interface ForecastAccumulator {
      data: WeatherData | null;
      hour: number;
    }

    const currentHour = new Date().getHours(); // Obtenir l'heure actuelle (0-23)

    const closestForecast = data.list.reduce(
      (prev: ForecastAccumulator, current: WeatherData) => {
        const forecastHour = parseInt(
          current.dt_txt.split(" ")[1].split(":")[0]
        ); // Extraire l'heure de la prévision
        const prevDiff = Math.abs(currentHour - prev.hour);
        const currDiff = Math.abs(currentHour - forecastHour);
        return currDiff < prevDiff
          ? { data: current, hour: forecastHour }
          : prev;
      },
      { data: null, hour: 24 }
    ); // Initialiser avec une heure impossible (24) pour garantir un résultat

    const closestWeatherData = closestForecast.data;

    const rainData = closestWeatherData.rain?.["1h"];
    const rainValue = rainData !== undefined ? `${rainData} mm` : "0 mm";

    const responseWeatherData = {
      description: closestWeatherData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${closestWeatherData.weather[0].icon}@2x.png`,
      temp_real: closestWeatherData.main.temp,
      temp_feel: closestWeatherData.main.feels_like,
      rain: rainValue,
      wind: closestWeatherData.wind.speed,
      humidity: closestWeatherData.main.humidity,
    };

    ///extraire les données country / flag
    const country = codeCountriesFiltered.find(
      (c) => c.iso2 === data.city.country
    );
    if (country) {
      const countryName = language === "fr" ? country.name_fr : country.name_en;
      const countryFlag = country.flag;
      const countryCapital = country.capital;
      useCountryStore.getState().setGeoCountry(countryName);
      useCountryStore.getState().setGeoCapital(countryCapital)
      useFlagStore.getState().setFlagGeolocation(countryFlag)
      useCountryStore.getState().setGeoCountryCode(data.city.country);

    } else {
      useCountryStore
        .getState()
        .setGeoCountry(language === "fr" ? "Pays inconnu" : "Unknown country");
      useFlagStore.getState().setNoFlagGeolocation(true);
    }
    ///////////////////////////////////

    useCountryStore.getState().setGeoCity(data.city.name);
    console.log("Données météo récupérées avec succès");
    console.log("Mise à jour du store avec les nouvelles données météo");
    useGeolocationStore.getState().setLocationWeather(responseWeatherData);
    console.log("Store mis à jour avec succès");
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de la ville :",
      error
    );
    console.error("Erreur dans weatherWithLatitudeAndLongitude:", error);
    throw error; // Propager l'erreur pour la gestion dans useEffect
  }
};
