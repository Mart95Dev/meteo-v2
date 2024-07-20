"use client";

import { useEffect, useState } from "react";
import { useWindowSize } from "./hook/useWindowSize";
import useGeolocationStore from "./store/useGeolocationStore";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import BoxSearchClimatCountryInformation from "./components/BoxSearchClimatCountryInformation/BoxSearchClimatCountryInformation";
import BoxClimatCountryInformation from "./reusable/BoxClimatCountryInformation/BoxClimatCountryInformation";
import CategoryTitle from "./reusable/CategoryTitle/CategoryTitle";
import { TbMapSearch } from "react-icons/tb";
import { IoLocation } from "react-icons/io5";
import Aside from "./Layout/Aside/Aside";
import CodeFlags from "./data/codeFlags.json";
import Flag from "./components/Flag/Flag";
import useFlagStore from "./store/useFlagStore";
import useLanguageBrowserStore from "./store/useLanguageBrowser";

export default function Home() {
  //state
  const [error, setError] = useState("");

  const {
    latitude,
    longitude,    
    country,
    country_code,
    city,
    setCoordinates,
    setCity,
    setCountry,
    setCountry_code,
    setIsGeolocationEnabled,
  } = useGeolocationStore();

  const {
    flag_geolocalisation,
    setFlagGeolocalisation,
    setNoFlagGeolocalisation,
  } = useFlagStore();

const {language_browser,setlanguageBrowser} = useLanguageBrowserStore();

  const { width } = useWindowSize();
  const showAside = width >= 701; // Afficher l'aside si la largeur est >=
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_OPENWEATHER;

  useEffect(() => {
    const browserLanguage = window.navigator.language.slice(0, 2);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates(position.coords.latitude, position.coords.longitude);
      },
      async (error) => {
        const errorMessage =
          "La géolocalisation est désactivée dans votre navigateur. Nous utiliserons votre adresse IP pour estimer votre position et vous fournir une prévision météo.";
        setError(errorMessage);
        setIsGeolocationEnabled(false); // Géolocalisation navigateur non autorisé

        try {
          const response = await fetch("https://api.ipify.org?format=json");
          const data = await response.json();
          // const ipAddress = data.ip;

          const locationIP = await fetch(`http://ip-api.com/json/${data.ip}`);
          const locationIpResponseJson = await locationIP.json();

          setCity(locationIpResponseJson.city);
          setCountry(locationIpResponseJson.country);
          setCountry_code(locationIpResponseJson.countryCode.toUpperCase());
        } catch (ipError) {
          console.error(
            "Erreur lors de la récupération de l'adresse IP :",
            ipError
          );
          setError(
            "Impossible de récupérer les données de localisation par votre Ip ou la localisation via votre naviagateur."
          );
        }
      }
    );

    setlanguageBrowser(browserLanguage == "fr" ? browserLanguage : "en");

    const fechtCountryWithLatitudeAndLongitude = async (
      latitude: number,
      longitude: number,
      language: string
    ) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=${language}`
        );

        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des données de la ville."
          );
        }

        const data = await response.json();
        console.log(data);

        // const responseWeatherData = {
        //   temperature: ,
        //   icon:,
        //   temp_real: ,
        //   temp_feel: ,
        //   rain: ,
        //   wind: ,
        //   humidity: ,
        // }

        // Extraire le nom de la ville de la réponse de l'API
        // const cityName = data[0]?.name || "Ville inconnue"; // Gérer le cas où la ville n'est pas trouvée
        // const country_code = data[0]?.country || "code inconnu";
        //  setCity(cityName);
        //  setCountry_code(country_code);
        //  return;
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de la ville :",
          error
        );
        throw error; // Propager l'erreur pour la gestion dans useEffect
      }
    };

    if (latitude !== null && longitude !== null && language_browser && apiKey) {
      fechtCountryWithLatitudeAndLongitude(latitude, longitude, language_browser);
    }
  }, [
    setCoordinates,
    setlanguageBrowser,
    setCity,
    setCountry,
    setCountry_code,
    setIsGeolocationEnabled,
    language_browser,
    latitude,
    longitude,
    apiKey,
  ]);

  ////////////
  useEffect(() => {
    // Logique du drapeau ici
    const testCodesFlags: boolean =
      CodeFlags.codes_flags.includes(country_code);
    if (testCodesFlags) {
      setFlagGeolocalisation(`https://countryflagsapi.netlify.app/flag/${country_code}.svg`);
    } else {
      setNoFlagGeolocalisation(Flag);
    }
  }, [country_code, setFlagGeolocalisation, setNoFlagGeolocalisation]); // Dépend uniquement de country_code

  ////////////
  ///////////////
  useEffect(() => {
    console.log(language_browser);
    console.log(country);
    console.log(city);
    console.log(country_code);
    console.log(flag_geolocalisation);
  });
  //////////////

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
        <BoxClimatCountryInformation />
        <CategoryTitle level={2}>
          <span>
            <TbMapSearch className="icon-search-localisation" />
          </span>
          Rechercher la météo de la ville ou du pays :
        </CategoryTitle>
        <BoxSearchClimatCountryInformation />
        <BoxClimatCountryInformation />
        <BoxClimatCountryInformation />
        <BoxClimatCountryInformation />
      </main>
      {showAside && <Aside />}
      <Footer />
    </>
  );
}
