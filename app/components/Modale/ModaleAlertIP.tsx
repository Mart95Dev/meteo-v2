import useErrorStore from "@/app/store/useErrorStore"

export default function ModaleAlertIP() {
const{error} = useErrorStore();


  return (
    <div className="weather-box modale-alert">
      <p className="message-alert">{error}</p>
      <button className="button-alert">Continuer</button>
      </div>
  )
}
