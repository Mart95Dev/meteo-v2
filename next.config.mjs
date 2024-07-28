/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http', // Le protocole utilisé par l'API OpenWeatherMap
            hostname: 'openweathermap.org', // Le nom de domaine de l'API OpenWeatherMap
            port: '',
            pathname: '/img/wn/**', // Le chemin d'accès aux icônes météo
          },
        ],
      },  
};

export default nextConfig;
