import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Team from '@/components/Team';

const BASE_URL = 'https://csd.acm.org';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const localePath = locale === 'en' ? '' : `/${locale}`;
    return {
        title: "About ACM UOC",
        description: "Learn about ACM UOC,the official ACM Student Chapter at the Computer Science Department (CSD), University of Crete. Our mission, vision, and team.",
        alternates: {
            canonical: `${BASE_URL}${localePath}/about`,
            languages: { 'en': `${BASE_URL}/about`, 'el': `${BASE_URL}/gr/about` },
        },
    };
}

export default async function AboutPage() {
    const t = await getTranslations();

    return (
        <main className="min-h-screen bg-slate-50 relative z-0">
            <div className="absolute top-0 left-0 w-full h-[55vh] min-h-[550px] md:h-[45vh] md:min-h-[450px] bg-white rounded-b-[4rem] shadow-sm -z-10" />

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

                <div className="text-center max-w-4xl mx-auto mb-32 animate-fade-in-up">
                    <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-4">
                        {t('about_page.badge')}
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">
                        {t('about_page.title')}
                    </h1>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)] mb-8" />
                    <p className="text-xl text-slate-600 leading-relaxed italic px-4">
                        &ldquo;{t('about_page.description')}&rdquo;
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 text-blue-600">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">
                            {t('about_page.mission_title')}
                        </h3>
                        <p className="text-slate-500 leading-relaxed">
                            {t('about_page.mission_text')}
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 text-blue-600">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">
                            {t('about_page.vision_title')}
                        </h3>
                        <p className="text-slate-500 leading-relaxed">
                            {t('about_page.vision_text')}
                        </p>
                    </div>
                </div>
            </div>

            <Team />
        </main>
    );
}
