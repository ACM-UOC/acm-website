import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import BackToTop from "@/components/BackToTop";

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

// TODO:  see it in an app lin insta
export const metadata: Metadata = {
  title: "ACM UOC | Student Chapter",
  description: "Official ACM Student Chapter at the University of Crete, Computer Science Department.",
  icons: {
    icon: "/logo.png", 
  },

  keywords: ["ACM", "UOC", "Computer Science", "Student Chapter", "University of Crete", "Tech Community", "Heraklion", "CSD", "Programming"],

  // TODO: CHANGE THIS to your actual live URL once you deploy 
  metadataBase: new URL("https://localhost:3000"), 

  openGraph: {
    title: "ACM UOC | Student Chapter",
    description: "Official ACM Student Chapter at the University of Crete, Computer Science Department.",
    url: "/",
    siteName: "ACM UOC",
    images: [
      {
        url: "/social-preview.jpg", 
        width: 1200,
        height: 630,
        alt: "ACM UOC Student Chapter Preview Card",
      },
    ],
    locale: "en_US", 
    type: "website",
  },


  twitter: {
    card: "summary_large_image", 
    title: "ACM UOC | Student Chapter",
    description: "Official ACM Student Chapter at the University of Crete, Computer Science Department.",
    images: ["/social-preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased` } suppressHydrationWarning>
        <I18nProvider>
          <Navbar />
          {children}
          <BackToTop />
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}

