import type { Metadata } from 'next';

const BASE_URL = 'https://csd.acm.org';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const localePath = locale === 'en' ? '' : `/${locale}`;
    return {
        title: "Events",
        description: "Upcoming workshops, hackathons, and tech talks by ACM UOC at the Computer Science Department (CSD), University of Crete.",
        alternates: {
            canonical: `${BASE_URL}${localePath}/events`,
            languages: {
                'en': `${BASE_URL}/events`,
                'el': `${BASE_URL}/gr/events`,
            },
        },
    };
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
