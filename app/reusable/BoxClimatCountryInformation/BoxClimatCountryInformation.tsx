export default function BoxClimatCountryInformation() {
  return (
    <div className="weather-box">
      <div className="country-flag poppins-regular ">drapeau</div>
      <div className="country-name poppins-regular ">Pays :</div>
      <div className="capital-name poppins-regular ">Capitale :</div>

      <div className="weather-type">type de temps</div>
      <div className="weather-icon">icon</div>
      <div className="temperature-label poppins-regular">Température</div>
      <div className="lato-regular real-feel">
        <span>Réelle :</span>
      </div>
      <div className="feels-like lato-regular">
        <span>Ressenti :</span>
      </div>
      <div className="climate-label poppins-regular">Climat</div>
      <div className="rain lato-regular">
        <span>Pluie :</span>
      </div>
      <div className="wind lato-regular">
        <span>Vent :</span>
      </div>
      <div className="humidity lato-regular">
        <span>Humidité :</span>
      </div>
    </div>
  );
}
