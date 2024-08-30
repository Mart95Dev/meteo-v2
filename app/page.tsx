"use client";

// import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import useGeolocationStore from "./store/useGeolocationStore";
import useLanguageBrowserStore from "./store/useLanguageBrowser";
import useErrorStore from "./store/useErrorStore";
import { useWindowSize } from "./hook/useWindowSize";

import { weatherWithLatitudeAndLongitude } from "./functions/weatherWithLatitudeAndLongitude";
import { fetchHeaderGeolocationPhoto } from "./functions/fetchHeaderGeolocationPhoto";
import { handleGeolocationPermissionChange } from "./functions/handleGeolocationPermissionChange";

import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Title from "./reusable/Title/Title";
import ModaleAlertIP from "./components/Modale/ModaleAlertIP";
import Aside from "./Layout/Aside/Aside";
// import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader";
import IconAnimation from "./components/IconAnimation/IconAnimation";

import GeolocationClimatCountryWeather from "./components/Geolocation/GeolocationClimatCountryWeather";

import useCountryStore from "./store/useCountryStore";
import useFetchHeaderGeolocationPhotoStore from "./store/useFetchHeaderGeolocationPhoto";

export default function Home() {
  //state
  const [isWeatherDataLoading, setIsWeatherDataLoading] = useState(true);
  // const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const memoizedFetchHeaderGeolocationPhoto = useMemo(
    () => fetchHeaderGeolocationPhoto,
    []
  );

  const geoPhotoCapitalRef = useRef<any>(null);
  const { setError } = useErrorStore();
  const {
    latitude,
    longitude,
    isGeolocationEnabled,
    setCoordinates,
    setIsGeolocationEnabled,
  } = useGeolocationStore();

  const { geo_capital } = useCountryStore();
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

    setlanguageBrowser(browserLanguage === "fr" ? browserLanguage : "en");

    // Appeler la fonction pour initialiser l'écouteur d'événements au montage du composant
    handleGeolocationPermissionChange();
  }, [setCoordinates, setlanguageBrowser, setError, setIsGeolocationEnabled]);

  /// useEffect logique récupération donnée météo
  useEffect(() => {
    if (latitude !== null && longitude !== null && language_browser) {
      setIsWeatherDataLoading(true);
      weatherWithLatitudeAndLongitude(latitude, longitude, language_browser)
        .then(() => {
          setIsWeatherDataLoading(false);
          // setDataLoaded(true);
        })
        .catch((error) => {
          console.error("Impossible de récupérer les données météorologiques");
          setIsWeatherDataLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
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
      {/* Afficher IconAnimation au début du chargement initial */}
      <div
        className={`icon-animation-container ${
          isLoading ? "" : "icon-animation-container-disabled"
        }`}
      >
        <IconAnimation />
      </div>

      <div className="app-container">
        <Header />
        <main className="lato-regular">
      
        {!isGeolocationEnabled && ( 
          <ModaleAlertIP className={`modale-alert ${!isGeolocationEnabled ? 'fade-in' : 'fade-out'}`} />
        )}
               
            {isGeolocationEnabled && !isWeatherDataLoading && ( 
               <div className={`container-weather ${isGeolocationEnabled && !isWeatherDataLoading ? 'fade-in data-loaded' : 'fade-out'}`}>              
                <Title level={2}>
                  <span>Météo basée sur votre position</span>
                </Title>
                <GeolocationClimatCountryWeather />
                </div>
            )}
              
        </main>
        {showAside ? <Aside /> : ""}
        <Footer />
        {/* <SpeedInsights/> */}
      </div>
    </>
  );
}
