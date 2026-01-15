import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "./components/ui/Cursor";
import ProgressIndicator from "./components/ui/ProgressIndicator";
import SoundBar from "./components/ui/SoundBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Varun Portfolio V2",
  description: "A modern, animated portfolio built with Next.js 14 and GSAP.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Cursor />
        <ProgressIndicator />
        <SoundBar />
        {children}
      </body>
    </html>
  );
}
