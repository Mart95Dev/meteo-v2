"use client";

// import { SpeedInsights } from "@vercel/speed-insights/next"
import { useEffect, useMemo, useRef } from "react";
import useGeolocationStore from "./store/useGeolocationStore";
import useLanguageBrowserStore from "./store/useLanguageBrowser";
import useErrorStore from "./store/useErrorStore";
import { useWindowSize } from "./hook/useWindowSize";

import { weatherWithLatitudeAndLongitude } from "./functions/weatherWithLatitudeAndLongitude";
import { fetchHeaderGeolocationPhoto } from "./functions/fetchHeaderGeolocationPhoto";

import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Title from "./reusable/Title/Title";
import ModaleAlertIP from "./components/Modale/ModaleAlertIP";
import Aside from "./Layout/Aside/Aside";

import GeolocationClimatCountryWeather from "./components/Geolocation/GeolocationClimatCountryWeather";

import useCountryStore from "./store/useCountryStore";
import useFetchHeaderGeolocationPhotoStore from "./store/useFetchHeaderGeolocationPhoto";

export default function Home() {
  //state
  // Mémorisation de fetchHeaderGeolocationPhoto avec useMemo
  const memoizedFetchHeaderGeolocationPhoto = useMemo(() => fetchHeaderGeolocationPhoto, []);

  const geoPhotoCapitalRef = useRef<any>(null);
  const { setError } = useErrorStore();
  const {
    latitude,
    longitude,
    isGeolocationEnabled,
    setCoordinates,
    setIsGeolocationEnabled,
  } = useGeolocationStore();

  const { geo_country, geo_capital } = useCountryStore();
  const { setGeoPhoto } = useFetchHeaderGeolocationPhotoStore();
  const { language_browser, setlanguageBrowser } = useLanguageBrowserStore();
  const { width } = useWindowSize();
  const showAside = width >= 701; // Afficher l'aside si la largeur est >=

  /// UseEffect logique récupération par ip et langage broswer
  useEffect(() => {
    const browserLanguage = window.navigator.language.slice(0, 2);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates(position.coords.latitude, position.coords.longitude);
      },
      async (error) => {
        const errorMessage =
          browserLanguage == "fr"
            ? "La géolocalisation est désactivée sur votre navigateur. Nous utiliserons votre adresse IP pour estimer votre position et vous fournir une prévision météo."
            : "Geolocation is disabled in your browser. We will use your IP address to estimate your location and provide you with a weather forecast.";
        setError(errorMessage);
        setIsGeolocationEnabled(false); // Géolocalisation navigateur non autorisé

        try {
          const ApiBundleKey = process.env.NEXT_PUBLIC_API_BUNDLE_KEY;
          const response = await fetch("https://api.ipify.org?format=json");
          const dataIP = await response.json();

          if (dataIP) {
            const locationIP = await fetch(
              `https://api.apibundle.io/ip-lookup?apikey=${ApiBundleKey}&ip=${dataIP.ip}`
            );
            const locationLongitudeLatitude = await locationIP.json();
            

            setCoordinates(
              locationLongitudeLatitude.latitude,
              locationLongitudeLatitude.longitude
            );
          }
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
  }, [setCoordinates, setlanguageBrowser, setError, setIsGeolocationEnabled]);

/// useEffect logique récupération donnée météo
  useEffect(() => {
    if (latitude !== null && longitude !== null && language_browser) {
      weatherWithLatitudeAndLongitude(latitude, longitude, language_browser);
    }
  }, [latitude, longitude, language_browser]);
  
/// useEffect récupération photo
useEffect(() => {  
  if (geo_capital !== "") {
    memoizedFetchHeaderGeolocationPhoto().then((data) => {
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
  }, [geo_capital, setGeoPhoto, memoizedFetchHeaderGeolocationPhoto]);

  return (
    <>
      <Header />
      <main className="lato-regular">
        <div className="container-weather">
          <Title level={2}>
            <span>Météo de votre géolocalisation</span>
          </Title>
          {!isGeolocationEnabled ? (
            <ModaleAlertIP />
          ) : (
            <GeolocationClimatCountryWeather />
          )}
        </div>
      </main>
      {showAside ? <Aside /> : ""}
      <Footer />
      {/* <SpeedInsights/> */}
    </>
  );
}
