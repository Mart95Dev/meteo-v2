"use client";

import { useEffect } from "react";
import useGeolocationStore from "./store/useGeolocationStore";
import useLanguageBrowserStore from "./store/useLanguageBrowser";
import useErrorStore from "./store/useErrorStore";
import { useWindowSize } from "./hook/useWindowSize";

import { weatherWithLatitudeAndLongitude } from "./functions/weatherWithLatitudeAndLongitude";

import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import InputSearchCountry from "./components/SearchLocation/InputSearchCountry";
import GeolocationClimatCountryWeather from "./components/Geolocation/GeolocationClimatCountryWeather";
import SearchClimatCountryWeather from "./components/SearchLocation/SearchClimatCountryWeather";
import CategoryTitle from "./reusable/CategoryTitle/CategoryTitle";
import { TbMapSearch } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";
import Aside from "./Layout/Aside/Aside";
import ModaleAlertIP from "./components/Modale/ModaleAlertIP";

export default function Home() {
  //state

  const { setError } = useErrorStore();
  const {
    latitude,
    longitude,
    isGeolocationEnabled,
    setCoordinates,
    setIsGeolocationEnabled,
  } = useGeolocationStore();

  const { language_browser, setlanguageBrowser } = useLanguageBrowserStore();

  const { width } = useWindowSize();
  const showAside = width >= 701; // Afficher l'aside si la largeur est >=

  useEffect(() => {
    const browserLanguage = window.navigator.language.slice(0, 2);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates(position.coords.latitude, position.coords.longitude);
      },
      async (error) => {
        const errorMessage =
          browserLanguage == "fr"
            ? "La géolocalisation est désactivée dans votre navigateur. Nous utiliserons votre adresse IP pour estimer votre position et vous fournir une prévision météo."
            : "Geolocation is disabled in your browser. We will use your IP address to estimate your location and provide you with a weather forecast.";
        setError(errorMessage);
        setIsGeolocationEnabled(false); // Géolocalisation navigateur non autorisé

        try {
          const response = await fetch("https://api.ipify.org?format=json");
          const data = await response.json();

          const locationIP = await fetch(`http://ip-api.com/json/${data.ip}`);
          const locationIpResponseJson = await locationIP.json();

          setCoordinates(
            locationIpResponseJson.lat,
            locationIpResponseJson.lon
          );
        } catch (ipError) {
          console.error(
            "Erreur lors de la récupération de l'adresse IP :",
            ipError
          );
          const errorMessage =
            browserLanguage == "fr"
              ? "Impossible de récupérer les données de localisation par votre Ip ou la localisation via votre naviagateur."
              : "Unable to retrieve location data from your IP or location via your browser.";
          setError(errorMessage);
        }
      }
    );

    setlanguageBrowser(browserLanguage == "fr" ? browserLanguage : "en");

    if (latitude !== null && longitude !== null && language_browser) {
      weatherWithLatitudeAndLongitude(latitude, longitude, language_browser);
    }
  }, [
    setCoordinates,
    setlanguageBrowser,
    setIsGeolocationEnabled,
    setError,
    language_browser,
    latitude,
    longitude,
  ]);


  return (
    <>
      <Header />
      <main className="lato-regular">
        <CategoryTitle level={1}>
          <span>
            <IoLocation className="icon-search-localisation" />
          </span>
          Météo de votre géolocalisation actuelle :
        </CategoryTitle>
        {!isGeolocationEnabled ? (
          <ModaleAlertIP />
        ) : (
          <GeolocationClimatCountryWeather />
        )}

        <CategoryTitle level={2}>
          <span>
            <TbMapSearch className="icon-search-localisation" />
          </span>
          Rechercher la météo de la ville ou du pays :
        </CategoryTitle>
        <InputSearchCountry />
        {/* <SearchClimatCountryWeather/> */}
      </main>
      {showAside && <Aside />}
      <Footer />
    </>
  );
}
