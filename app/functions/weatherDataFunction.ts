
const apiKey = process.env.NEXT_PUBLIC_API_KEY_OPENWEATHER;

export async function fetchWeatherDataFunction( language: string, country: string, country_code?: string,) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&lang=${language}`
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données météo.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo :", error);
    throw error; // Propager l'erreur pour la gestion dans useEffect
  }
}
