import type { Metadata } from 'next';
import { getAbsoluteUrl, getLanguageAlternates } from '@/lib/site';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: "Events",
        description: "Upcoming workshops, hackathons, and tech talks by ACM UOC at the Computer Science Department (CSD), University of Crete.",
        alternates: {
            canonical: getAbsoluteUrl(locale, '/events'),
            languages: getLanguageAlternates('/events'),
        },
    };
}

export default function EventsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
