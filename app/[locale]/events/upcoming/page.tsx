import { Suspense } from 'react';
import { Link } from '@/i18n/navigation';
import EventCards from '@/components/EventCards';
import { getTranslations } from 'next-intl/server';


export default async function AllUpcomingEventsPage() {
  const t = await getTranslations();

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <Link href="/events" className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs tracking-widest uppercase mb-12 hover:text-blue-600 transition-colors group">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('event_detail.back')}
        </Link>

        <div>
          <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-4">
              {t('events.badge')}
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-16">
              {t('events.upcoming_title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <Suspense fallback={<div className="animate-pulse text-slate-400">Loading upcoming events...</div>}>
            <EventCards page="home" />
          </Suspense>
        </div>

      </div>
    </main>
  );
}
