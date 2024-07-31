import HeaderImageLocation from "@/app/components/Geolocation/HeaderImageGeolocation";
import useFetchHeaderGeolocationPhotoStore from "@/app/store/useFetchHeaderGeolocationPhoto";
import { StaticImageData } from "next/image";


export default function Header() {

const {geo_photo} = useFetchHeaderGeolocationPhotoStore();


  return (
    <header>
      {geo_photo ? <HeaderImageLocation itemImage={geo_photo}/> : "Recherche en cours..."}
    
    </header>
  );
}
