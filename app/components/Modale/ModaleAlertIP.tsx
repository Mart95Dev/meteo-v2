import useErrorStore from "@/app/store/useErrorStore";
import useGeolocationStore from "@/app/store/useGeolocationStore";

export default function ModaleAlertIP() {
  const { error } = useErrorStore();
  const {isGeolocationEnabled } = useGeolocationStore();

  return (
    <div className="container-weather">
      <div className={isGeolocationEnabled ? "modale-alert-disabled":"modale-alert"}>
        <p className="message-alert">{error}</p>
        <button className="button-alert">Continuer</button>
      </div>
   </div>
  );
}
