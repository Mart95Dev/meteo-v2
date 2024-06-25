"use client";

import { useEffect, useState } from "react";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import BoxSearchClimatCountryInformation from "./components/BoxSearchClimatCountryInformation/BoxSearchClimatCountryInformation";
import BoxClimatCountryInformation from "./reusable/BoxClimatCountryInformation/BoxClimatCountryInformation";
import CategoryTitle from "./reusable/CategoryTitle/CategoryTitle";


export default function Home() {
  //state
  const [browser, setBrowser] = useState("");
  const [coordinates, setCoordinates] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  //functions
  //fetch api
  //pour retrouver le nom de la ville et code pays
  //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
  //pour rectrouver les donnees météo
  //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}





  useEffect(() => {
    const browser = window.navigator.language.slice(0, 2);
    setBrowser(browser);
    navigator.geolocation.getCurrentPosition((position) => {
      const newCoordinates = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setCoordinates(newCoordinates);
    });
  }, []);

  // *** useEffect temporaire afin de visualiser les resultats
  useEffect(() => {
    console.log(coordinates);
    console.log(browser);
  }, [browser,coordinates]);

  return (
    <>
      <Header />
      <main className="lato-regular">
        <CategoryTitle title="Météo de votre géolocalisation actuelle :" />
        <BoxClimatCountryInformation />
        <CategoryTitle title="Rechercher la météo de la ville ou du pays :" />
        <BoxSearchClimatCountryInformation />
      </main>
      <Footer />
    </>
  );
}
