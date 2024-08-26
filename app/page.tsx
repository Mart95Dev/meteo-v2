"use client";

import { useEffect, useRef } from "react";
import useGeolocationStore from "./store/useGeolocationStore";
import useLanguageBrowserStore from "./store/useLanguageBrowser";
import useErrorStore from "./store/useErrorStore";
import { useWindowSize } from "./hook/useWindowSize";

import { weatherWithLatitudeAndLongitude } from "./functions/weatherWithLatitudeAndLongitude";
import { fetchHeaderGeolocationPhoto } from "./functions/fetchHeaderGeolocationPhoto";

import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

import GeolocationClimatCountryWeather from "./components/Geolocation/GeolocationClimatCountryWeather";

import CategoryTitle from "./reusable/CategoryTitle/CategoryTitle";

import ModaleAlertIP from "./components/Modale/ModaleAlertIP";
import useCountryStore from "./store/useCountryStore";
import useFetchHeaderGeolocationPhotoStore from "./store/useFetchHeaderGeolocationPhoto";
import Aside from "./Layout/Aside/Aside";

export default function Home() {
  //state
  const geoPhotoCapitalRef = useRef<any>(null);
  const { setError } = useErrorStore();
  const {
    latitude,
    longitude,
    isGeolocationEnabled,
    setCoordinates,
    setIsGeolocationEnabled,
  } = useGeolocationStore();

  const { geo_country, geo_capital} = useCountryStore();

  const { setGeoPhoto } = useFetchHeaderGeolocationPhotoStore();

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

    if (geo_capital !== "") {
      fetchHeaderGeolocationPhoto().then((data) => {
        if (data) {
          geoPhotoCapitalRef.current = data;
          const imagesWithLargeUrl = geoPhotoCapitalRef.current.hits.filter(
            (item: any) => item.largeImageURL
          );

          const randomIndex = Math.floor(
            Math.random() * imagesWithLargeUrl.length
          );
          const selectedImage = imagesWithLargeUrl[randomIndex].largeImageURL;
          setGeoPhoto(selectedImage);
          geoPhotoCapitalRef.current = null;

          return;
        }
      });
    }
  }, [
    setCoordinates,
    setlanguageBrowser,
    setIsGeolocationEnabled,
    setError,
    setGeoPhoto,
    geo_capital,
    language_browser,
    latitude,
    longitude,
    geo_country,
  ]);

  
  return (
    <>
      <Header />
      <main className="lato-regular">
        <div className="container-weather">
          <CategoryTitle level={2}>
            <span>Météo de votre géolocalisation actuelle :</span>
          </CategoryTitle>
          {!isGeolocationEnabled ? (
            <ModaleAlertIP />
          ) : (
            <GeolocationClimatCountryWeather />
          )}
        </div>
      </main>
      {showAside ? <Aside/> : ""}
      <Footer />
    </>
  );
}
