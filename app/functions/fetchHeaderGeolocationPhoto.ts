import useCountryStore from "../store/useCountryStore";

export const fetchHeaderGeolocationPhoto =  async () => {
    const apiKeyPixabay = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
    
    
    try {
      const response = await fetch(`https://pixabay.com/api/?key=${apiKeyPixabay}&q=${useCountryStore.getState().geo_capital}&image_type=photo&per_page=5&pretty=true`);
      if (!response.ok) {
        throw new Error(`Erreur: ${response.status}`);
      }
      const data = await response.json();
      return  data
      
    } catch (error) {
      console.error("Erreur lors de la récupération de la photo:", error);
    }
  };