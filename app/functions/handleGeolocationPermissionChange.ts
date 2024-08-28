import useGeolocationStore from "@/app/store/useGeolocationStore";


// Fonction pour gérer les changements de permission de géolocalisation
export const handleGeolocationPermissionChange = () => {
  if (navigator.permissions) {
    navigator.permissions.query({ name: 'geolocation' })
      .then((permissionStatus: PermissionStatus) => {
        permissionStatus.onchange = () => { // Attacher l'écouteur d'événements à permissionStatus
          if (permissionStatus.state === 'granted') {
            // La géolocalisation a été activée, récupérez à nouveau les coordonnées
            navigator.geolocation.getCurrentPosition(
              (position) => {
                useGeolocationStore.getState().setCoordinates(position.coords.latitude, position.coords.longitude);
                useGeolocationStore.getState().setIsGeolocationEnabled(true);
              },
              (error) => {
                console.error("Erreur de géolocalisation :", error);
              }
            );
          }
        };
      });
  }
};