import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import "../globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import MotionProvider from "@/components/MotionProvider";
import { BASE_URL, getAbsoluteUrl, getLanguageAlternates } from "@/lib/site";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    return {
        metadataBase: new URL(BASE_URL),
        title: {
            default: "ACM UOC | Student Chapter at CSD | University of Crete",
            template: "%s | ACM UOC | CSD",
        },
        description: "Official ACM Student Chapter at the Computer Science Department (CSD), University of Crete (UOC). Join our workshops, hackathons, and CS community in Heraklion.",
        icons: { icon: "/logo.png" },
        keywords: ["ACM", "UOC", "Computer Science", "Student Chapter", "University of Crete", "Tech Community", "Heraklion", "CSD", "Programming"],
        alternates: {
            canonical: getAbsoluteUrl(locale),
            languages: getLanguageAlternates(),
        },
        openGraph: {
            title: "ACM UOC | Student Chapter",
            description: "Official ACM Student Chapter at the University of Crete, Computer Science Department.",
            url: getAbsoluteUrl(locale),
            siteName: "ACM UOC",
            images: [{ url: "/acm_logo.jpg", alt: "ACM UOC Student Chapter" }],
            type: "website",
            locale: locale === 'en' ? 'en_US' : 'el_GR',
        },
        twitter: {
            card: "summary_large_image",
            title: "ACM UOC | Student Chapter",
            description: "Official ACM Student Chapter at the University of Crete, Computer Science Department.",
            images: ["/acm_logo.jpg"],
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                suppressHydrationWarning
            >
                <NextIntlClientProvider messages={messages}>
                    <MotionProvider>
                        <Navbar />
                        {children}
                        <BackToTop />
                        <Footer />
                    </MotionProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
