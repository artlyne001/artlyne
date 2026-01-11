import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Artlyne",
  description: "The world's largest free, ready-to-use, customizable animation library",
};

import { Providers } from "./providers";

export default function RootLayout({ children }) {
  const themeVars = {
    "--brand-pink": SITE_CONFIG.theme.primary,
    "--brand-pink-hover": SITE_CONFIG.theme.primaryHover,
    "--brand-secondary": SITE_CONFIG.theme.secondary,
    "--primary": SITE_CONFIG.theme.primary,
    "--ring": SITE_CONFIG.theme.primary,
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={themeVars}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
