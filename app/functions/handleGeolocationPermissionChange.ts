import useGeolocationStore from "@/app/store/useGeolocationStore";

export const handleGeolocationPermissionChange = () => {
  if (navigator.permissions) {
    navigator.permissions.query({ name: 'geolocation' as PermissionName })
      .then((permissionStatus: PermissionStatus) => {
        permissionStatus.onchange = () => {
          if (permissionStatus.state === 'granted') {
            navigator.geolocation.getCurrentPosition(
              (position: GeolocationPosition) => {
                useGeolocationStore.getState().setCoordinates(position.coords.latitude, position.coords.longitude);
                useGeolocationStore.getState().setIsGeolocationEnabled(true);
              },
              (error: GeolocationPositionError) => {
                console.error("Erreur de géolocalisation :", error.message);
              }
            );
          }
        };
      });
  }
};