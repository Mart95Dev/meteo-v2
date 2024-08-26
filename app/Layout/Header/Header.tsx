import { useEffect, useState } from "react";
import HeaderImageLocation from "@/app/components/Geolocation/HeaderImageGeolocation";
import useFetchHeaderGeolocationPhotoStore from "@/app/store/useFetchHeaderGeolocationPhoto";

export default function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const { geo_photo } = useFetchHeaderGeolocationPhotoStore();

 useEffect(() => {
  if (geo_photo) {
    setIsLoading(false);
  }
 }, [geo_photo])
 

  return (
    <header>
           {isLoading ? (
        <p>Recherche de la photo...</p>
      ) : (
        <HeaderImageLocation itemImage={geo_photo} /> 
      )}

    </header>
  );
}

//   return (
//     <header>
//       {geo_photo ? <HeaderImageLocation itemImage={geo_photo}/> : "Recherche en cours..."}

//     </header>
//   );
// }
