import useErrorStore from "@/app/store/useErrorStore";


interface ModaleAlertIPProps {
  className?: string;
}

export default function ModaleAlertIP({className}: ModaleAlertIPProps) {
  const { error } = useErrorStore();


  return (
    <div className={className}>   
        <p className="message-alert">{error}</p>
        <button className="button-alert">Continuer</button>      
   </div>
  );
}
