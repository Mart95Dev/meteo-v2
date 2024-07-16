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
// import Data from "./data/languages.json"

export default function Home() {
  //state
  const [isGeolocationEnabled,setIsGeolocationEnabled]= useState(true);
  const[error, setError]= useState('');
  const {
    latitude,
    longitude,
    language,
    setCoordinates,
    setLanguage,
    setCity,
    setCountry
  } = useGeolocationStore();
  const { width } = useWindowSize();
  const showAside = width >= 701; // Afficher l'aside si la largeur est >=
  const apiKey = process.env.NEXT_PUBLIC_API_KEY_OPENWEATHER;
 

  //functions
  //fetch api
  //pour retrouver le nom de la ville et code pays
  //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
  

  useEffect(() => {
    const browserLanguage = window.navigator.language.slice(0, 2);
    // const isLanguageSupported = Data.languages.includes(browserLanguage)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates(position.coords.latitude, position.coords.longitude);
      },
      async (error) => {
        console.error("La géolocalisation est désactivée dans votre navigateur. Nous utiliserons votre adresse IP pour estimer votre position et vous fournir une prévision météo.");
        setIsGeolocationEnabled(false); // Géolocalisation échouée
  
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          const ipAddress = data.ip;
  
          const locationIP = await fetch(`http://ip-api.com/json/${ipAddress}`);
          const locationIpResponse = await locationIP.json();
          console.log(locationIpResponse);
          
          setCity(locationIpResponse.city);
          setCountry(locationIpResponse.country);
        } catch (ipError) {
          console.error('Erreur lors de la récupération de l\'adresse IP :', ipError);
          setError('Impossible de récupérer les données de localisation par votre Ip ou la location via votre naviagateur.'); 
        }
      },
    );
    

    setLanguage(browserLanguage == "fr" ? browserLanguage : "en");

    const fechtCountryWithLatitudeAndLongitude = async (
      latitude: number,
      longitude: number,
      language: string
    ) => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}&lang=${language}`
        );

        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des données de la ville."
          );
        }

        const data = await response.json();
        console.log(data[0].name);

        // Extraire le nom de la ville de la réponse de l'API
        const cityName = data[0]?.name || "Ville inconnue"; // Gérer le cas où la ville n'est pas trouvée
        return setCity(cityName);

      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de la ville :",
          error
        );
        throw error; // Propager l'erreur pour la gestion dans useEffect
      }
    };
    if (latitude !== null && longitude !== null && language && apiKey) {
      fechtCountryWithLatitudeAndLongitude(latitude, longitude, language);
    }
  }, [setCoordinates, setLanguage,setCity, setCountry, language, latitude, longitude, apiKey]);

  ///////////////
  useEffect(() => {
    console.log(language);
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
