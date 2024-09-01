import type { Metadata, Viewport } from "next";
import Head from 'next/head'

import "./styles/globals.css";

export const metadata: Metadata = {
  title: "WeatherMap",
  description: "geolocation weather", 
  icons: {
    icon: "/favicon/weathermap.ico",
  }, 
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">       
      <body>{children}</body>
    </html>
  );
}