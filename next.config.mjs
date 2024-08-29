import MiniCssExtractPlugin from "mini-css-extract-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Le protocole utilisé par l'API OpenWeatherMap
        hostname: "openweathermap.org", // Le nom de domaine de l'API OpenWeatherMap
        port: "",
        pathname: "/img/wn/**", // Le chemin d'accès aux icônes météo
      },
      {
        // Nouvelle entrée pour Pixabay
        protocol: "https",
        hostname: "pixabay.com",
      },
    ],
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.plugins.push(
        new MiniCssExtractPlugin({
          filename: "static/css/[name].[contenthash:8].css",
          chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        })
      );
    }

    return config;
  },
};

export default nextConfig;
// module.exports = nextConfig;
