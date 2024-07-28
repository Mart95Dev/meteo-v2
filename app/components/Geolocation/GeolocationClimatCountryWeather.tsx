import useCountryStore from "@/app/store/useCountryStore";
import useErrorStore from "@/app/store/useErrorStore";
import useGeolocationStore from "@/app/store/useGeolocationStore";
import FlagDisplay from "@/app/components/Flag/FlagDisplay";

export default function BoxClimatCountryInformation() {
  return (
    <div className="weather-box">
      <div className="country-flag poppins-regular "><FlagDisplay/></div>
      <div className="country-name poppins-semibold ">
        
        <span>Royaume-uni rrr</span>
      </div>
      <div className="capital-name poppins-semibold ">
        
        <span>Andorre-la-veille</span>
      </div>

      <div className="weather-type poppins-semibold">type de temps</div>
      <div className="weather-icon">icon</div>
      <div className="temperature-label poppins-semibold">
        <span>Température</span>
        
      </div>
      <div className="real-feel">
        <span>Réelle :</span>
        
      </div>
      <div className="feels-like">
        <span>Ressenti:</span>
        
      </div>
      <div className="climate-label poppins-semibold">Climat</div>
      <div className="rain ">
        <span>Pluie:</span>
        
      </div>
      <div className="wind ">
        <span>Vent:</span>
        
      </div>
      <div className="humidity ">
        <span>Humidité:</span>
       
      </div>
    </div>
  );
}
