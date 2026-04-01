import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TeamsSection from '@/components/TeamsSection';
import UpcomingEvents from '@/components/UpcomingEvents';

const BASE_URL = 'https://csd.acm.org';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const localePath = locale === 'en' ? '' : `/${locale}`;
    return {
        title: "ACM UOC | Student Chapter at CSD |University of Crete",
        description: "Official ACM Student Chapter at the Computer Science Department (CSD), University of Crete (UOC). Workshops, hackathons, and tech talks in Heraklion, Crete.",
        alternates: {
            canonical: `${BASE_URL}${localePath}`,
            languages: { 'en': BASE_URL, 'el': `${BASE_URL}/gr` },
        },
    };
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ACM UOC Student Chapter',
    url: 'https://csd.acm.org',
    logo: 'https://csd.acm.org/logo.png',
    description: 'Official ACM Student Chapter at the University of Crete, Computer Science Department.',
    parentOrganization: {
        '@type': 'Organization',
        name: 'Association for Computing Machinery',
        url: 'https://www.acm.org',
    },
    memberOf: {
        '@type': 'EducationalOrganization',
        name: 'University of Crete |Computer Science Department',
        url: 'https://www.csd.uoc.gr',
    },
    sameAs: [
        'https://www.instagram.com/acm_uoc',
    ],
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="min-h-screen bg-slate-50 text-slate-900">
                <Hero />
                <About />
                <UpcomingEvents />
                <TeamsSection />
            </main>
        </>
    );
}
