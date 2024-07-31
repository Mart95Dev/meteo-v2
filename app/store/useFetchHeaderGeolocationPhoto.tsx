import {create} from "zustand"

interface fetchHeaderGeolocationPhotoState {
    geo_photo: string;
    setGeoPhoto: (geo_photo: string)=> void;
}

const useFetchHeaderGeolocationPhotoStore = create<fetchHeaderGeolocationPhotoState>((set)=>({
    geo_photo: "",
    setGeoPhoto: (geo_photo)=> set({geo_photo})
}))

export default useFetchHeaderGeolocationPhotoStore;