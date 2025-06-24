import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Footer from "@/components/footer/Footer";
import ScrollingBanner from "@/components/scrollingbanner/ScrollingBanner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ICLSMHA",
  description:
    "ICLSMHA - International Conference on Learning Sciences and Mental Health Awareness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="flex flex-col">
          <ScrollingBanner />
          <Navbar />
        </div>

        <Container className="py-20 ">{children}</Container>
        <Footer />
        
      </body>
    </html>
  );
}
