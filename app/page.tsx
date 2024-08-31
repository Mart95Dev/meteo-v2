"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import useGeolocationStore from "./store/useGeolocationStore";
import useLanguageBrowserStore from "./store/useLanguageBrowser";
import useErrorStore from "./store/useErrorStore";
import { useWindowSize } from "./hook/useWindowSize";

import { weatherWithLatitudeAndLongitude } from "./functions/weatherWithLatitudeAndLongitude";
import { fetchHeaderGeolocationPhoto } from "./functions/fetchHeaderGeolocationPhoto";
import { handleGeolocationPermissionChange } from "./functions/handleGeolocationPermissionChange";
import { initializeLanguageBrowser } from "@/app/store/useLanguageBrowser";

import Header from "./Layout/Header/Header";
import Footer from "./Layout/Footer/Footer";
import Title from "./reusable/Title/Title";
import ModaleAlertIP from "./components/Modale/ModaleAlertIP";
import Aside from "./Layout/Aside/Aside";
import IconAnimation from "./components/IconAnimation/IconAnimation";

import GeolocationClimatCountryWeather from "./components/Geolocation/GeolocationClimatCountryWeather";

import useCountryStore from "./store/useCountryStore";
import useFetchHeaderGeolocationPhotoStore from "./store/useFetchHeaderGeolocationPhoto";

export default function Home() {
  const [isWeatherDataLoading, setIsWeatherDataLoading] = useState(true);
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
  const { language_browser, setLanguageBrowser } = useLanguageBrowserStore();
  const { width } = useWindowSize();
  const showAside = width >= 701;
  const isMobile = width < 700;

  useEffect(() => {
    const fetchCoordinates = async () => {
      const browserLanguage = window.navigator.language.slice(0, 2);

      try {
        const position: GeolocationPosition = await new Promise(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );
        setCoordinates(position.coords.latitude, position.coords.longitude);
      } catch (error) {
        if (error instanceof GeolocationPositionError) {
          const errorMessage =
            browserLanguage == "fr"
              ? "La géolocalisation est désactivée sur votre navigateur. Nous utiliserons votre adresse IP pour estimer votre position et vous fournir une prévision météo."
              : "Geolocation is disabled in your browser. We will use your IP address to estimate your location and provide you with a weather forecast.";
          setError(errorMessage);
          setIsGeolocationEnabled(false);

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
            console.error(
              "Erreur lors de la récupération de l'adresse IP :",
              ipError
            );
            const ipErrorMessage =
              browserLanguage == "fr"
                ? "Impossible de récupérer les données de localisation par votre IP ou la localisation via votre navigateur."
                : "Unable to retrieve location data from your IP or location via your browser.";
            setError(ipErrorMessage);
          }
        } else {
          console.error("Erreur inconnue:", error);
        }
      }

      setLanguageBrowser(browserLanguage === "fr" ? browserLanguage : "en");
    };

    fetchCoordinates();
    handleGeolocationPermissionChange();
  }, [setCoordinates, setLanguageBrowser, setError, setIsGeolocationEnabled]);

  useEffect(() => {
    if (latitude !== null && longitude !== null && language_browser) {
      setIsWeatherDataLoading(true);
      weatherWithLatitudeAndLongitude(latitude, longitude, language_browser)
        .then(() => {
          setIsWeatherDataLoading(false);
        })
        .catch((error) => {
          console.error("Impossible de récupérer les données météorologiques");
          setIsWeatherDataLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log("Coordonnées non disponibles:", { latitude, longitude });
      setIsLoading(false);
    }
  }, [latitude, longitude, language_browser]);

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
        }
      });
    }
  }, [geo_capital, setGeoPhoto, memoizedFetchHeaderGeolocationPhoto]);

  return (
    <>
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
            <ModaleAlertIP
              className={`modale-alert ${
                !isGeolocationEnabled ? "fade-in" : "fade-out"
              }`}
            />
          )}

          {isGeolocationEnabled && !isWeatherDataLoading && (
            <div
              className={`container-weather ${
                isGeolocationEnabled && !isWeatherDataLoading
                  ? "fade-in data-loaded"
                  : "fade-out"
              }`}
            >
              <Title level={2}>
                <span>Météo basée sur votre position</span>
              </Title>
              <GeolocationClimatCountryWeather />
            </div>
          )}
        </main>
        {showAside || isMobile ? <Aside isMobile={isMobile} /> : null}
        <Footer />
      </div>
    </>
  );
}
