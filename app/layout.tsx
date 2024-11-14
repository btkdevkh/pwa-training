import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthContextProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PwaInstallPrompt from "./components/PwaInstallPrompt";

// Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const APP_NAME = "GreenMeteo";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Weather forcast app";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [{ url: "/ios/180.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <Navbar />
          <div className="container lg mx-auto px-4">{children}</div>

          {/* Add the install prompt component */}
          <PwaInstallPrompt />
        </AuthContextProvider>
      </body>
    </html>
  );
}
