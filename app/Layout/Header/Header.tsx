import { useEffect, useState } from "react";
import HeaderImageLocation from "@/app/components/Geolocation/HeaderImageGeolocation";
import useFetchHeaderGeolocationPhotoStore from "@/app/store/useFetchHeaderGeolocationPhoto";
import useGeolocationStore from "@/app/store/useGeolocationStore";

export default function Header() {
  const { isGeolocationEnabled } = useGeolocationStore();
  const [isLoading, setIsLoading] = useState(true);
  const { geo_photo } = useFetchHeaderGeolocationPhotoStore();

  useEffect(() => {
    if (geo_photo) {
      setIsLoading(false);
    }
  }, [geo_photo]);

  return (
   <header>
    
      {!isGeolocationEnabled && (
        <div className={`image-location-container-alert ${!isGeolocationEnabled ? 'fade-in' : ''}`}>
          <span className="alert-photo-header-text poppins-regular">
            Recherche de la photo en attente
          </span>
        </div>
      )}

      {/* Afficher l'image ou le message de chargement en fonction de isLoading et isGeolocationEnabled */}
      {isGeolocationEnabled && (
        <div className={`image-location-container ${isLoading ? 'fade-out' : 'fade-in'}`}>
          {isLoading ? (
            <p>Chargement de la photo...</p>
          ) : geo_photo && (
            <HeaderImageLocation itemImage={geo_photo} />
          )}
        </div>
      )}
    </header>
  );
}
