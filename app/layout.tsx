
import type { Metadata } from "next";
import "./styles/globals.css";


 


export const metadata: Metadata = {
  title: "Weather APP",
  description: "Climat countries or cities informations",
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
