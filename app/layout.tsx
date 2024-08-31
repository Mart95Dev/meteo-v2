import type { Metadata, Viewport } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Weather APP",
  description: "Climat countries or cities informations",  
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