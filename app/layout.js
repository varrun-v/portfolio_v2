import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "./components/ui/Cursor";
import ProgressIndicator from "./components/ui/ProgressIndicator";
import SoundBar from "./components/ui/SoundBar";
import { CursorProvider } from "./context/CursorContext";
import ServiceWorkerCleanup from "./components/ServiceWorkerCleanup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Varun",
  description: "Varun's Portfolio.",
  appleWebApp: {
    title: "Varun",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServiceWorkerCleanup />
        <CursorProvider>
          <Cursor />
          <ProgressIndicator />
          <SoundBar />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
