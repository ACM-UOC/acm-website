// Kept as a server component intentionally — avoids shipping JS to the client for static
// event data, and preserves per-image loading/priority/quality optimizations below.
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import EventCards from '@/components/EventCards';


export default async function UpcomingEventsGrid() {

  const t = await getTranslations();

  return (
    <section id="events" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs mb-3 font-bold">
            {t('events.badge')}
          </p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            {t('events.title')}
          </h2>
            <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-h-[500px]">
          {/* Upcoming Events */}
          <Suspense fallback={<div className="animate-pulse text-slate-400">Loading upcoming events...</div>}>
            <EventCards page="rest" />
          </Suspense>

          {/* Stay Tuned Card*/}
          <div className="group bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200 p-7 transition-all duration-500 flex flex-col h-full min-h-[400px] items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 text-blue-300">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-600 mb-3 tracking-tight uppercase">
                {t('events.stay_tuned.title')}
            </h3>
            <p className="text-slate-500 text-sm font-light italic max-w-[200px]">
                {t('events.stay_tuned.description')}
            </p>
            <div className="mt-8 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-200 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-blue-200 animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-blue-200 animate-pulse delay-150" />
            </div>
          </div>
        </div>
      </div>
    </section>
    );
}
