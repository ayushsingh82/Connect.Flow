import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Web3Providers from "@/components/Web3Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DynaFi - Modular, AI-Enhanced DeFi for Hyperion DACs",
  description: "Power up your DAC with plug-and-play DeFi tools—staking, lending, swaps—with AI-driven governance and real-time yield optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Web3Providers>
          <Navbar />
          <main className="flex-grow pt-28">
            {children}
          </main>
          <Footer />
        </Web3Providers>
      </body>
    </html>
  );
}
