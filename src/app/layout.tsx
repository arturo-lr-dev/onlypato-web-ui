import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spartanSans = League_Spartan({
  variable: "--font-spartan-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Only Pato",
  description: "Only pato. Todo lo demás, es pollo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${spartanSans.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
