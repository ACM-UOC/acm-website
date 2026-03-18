import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";

// Import your global components
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACM UOC | Student Chapter",
  description: "Official ACM Student Chapter at the University of Crete, Computer Science Department.",
  icons: {
    icon: "/logo.png", 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider>
          {/* 1. Navbar stays at the top of every page */}
          <Navbar />
          
          {/* 2. Children represents the active page (Home, Teams, etc.) */}
          {children}

          {/* 3. Footer stays at the bottom of every page */}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}