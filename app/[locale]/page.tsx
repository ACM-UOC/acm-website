import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TeamsSection from '@/components/TeamsSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import { getAbsoluteUrl, getLanguageAlternates } from '@/lib/site';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "ACM UOC | Student Chapter at CSD | University of Crete",
        description: "Official ACM Student Chapter at the Computer Science Department (CSD), University of Crete (UOC). Workshops, hackathons, and tech talks in Heraklion, Crete.",
        alternates: {
            canonical: getAbsoluteUrl(locale),
            languages: getLanguageAlternates(),
        },
    };
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ACM UOC Student Chapter',
    url: 'https://uoc.acm.org',
    logo: {
        '@type': 'ImageObject',
        url: 'https://uoc.acm.org/logo.png',
        width: 499,
        height: 499,
    },
    description: 'Official ACM Student Chapter at the University of Crete, Computer Science Department.',
    parentOrganization: {
        '@type': 'Organization',
        name: 'Association for Computing Machinery',
        url: 'https://www.acm.org',
    },
    memberOf: {
        '@type': 'EducationalOrganization',
        name: 'University of Crete, Computer Science Department',
        url: 'https://www.csd.uoc.gr',
    },
    sameAs: [
        'https://www.instagram.com/acmuoc',
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
