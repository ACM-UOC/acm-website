import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getEvents } from '@/lib/db_parser';
import { getLocale, getTranslations } from 'next-intl/server';


interface EventCardProps {
  page?: 'home' | 'test';
}


export default async function EventList({ page = 'home' }: EventCardProps) {
  const t = await getTranslations();
  const locale = await getLocale();
  const events = await getEvents();
  const upcomingEvents = events.filter(x => x.status === "upcoming");

  // check the EventCardProps to change the classNames

  return (
    <>
    {upcomingEvents.map((event) => (
          <div
              key={event.id}
              className="group bg-white rounded-[2.5rem] border border-slate-100 p-7 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative flex flex-col h-full"
          >
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full group-hover:bg-blue-100/60 blur-2xl transition-colors duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 border border-slate-100/50 mb-6 shrink-0">
                <Image
                  src={event.image}
                  alt={(locale === 'en') ? event.title_en : event.title_gr}
                  fill
                  quality={70}
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 44vw, 360px"
                  loading="lazy"
                  fetchPriority="low"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg z-20">
                  {event.type}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3 text-blue-700 font-mono text-[10px] tracking-widest font-bold uppercase shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_5px_rgba(37,99,235,0.5)]" />
                <span>{event.date}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight leading-tight group-hover:text-blue-600 transition-colors shrink-0">
                {(locale === 'en') ? event.title_en : event.title_gr}
              </h3>

              <div className="w-8 h-1 bg-blue-600 mb-4 group-hover:w-16 transition-all duration-500 rounded-full shrink-0" />

              <p className="text-slate-500 text-sm font-light leading-relaxed italic mb-6 shrink-0">
                &ldquo;{(locale === 'en') ? event.description_en : event.description_gr}&rdquo;
              </p>

              {/* Event Sponsort -- temporarily hidden */}
              {/*<div className="mb-4 shrink-0 relative z-20">
                <Sponsors sponsors={event.sponsors} variant="card" />
              </div>*/}

              <div className="mt-auto pt-5 border-t border-slate-50 shrink-0 flex items-center gap-3">
                <Link
                  href={`/events/${event.id}`}
                  aria-label={`${t(`events.view_details`)} - ${(locale === 'en') ? event.title_en : event.title_gr}`}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {t(`events.view_details`)}
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                {(event.registrationUrl!=='') && (
                    <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-20 ml-auto text-[9px] font-black uppercase tracking-widest bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-slate-900 transition-colors"
                    >
                        {t('event_detail.register_btn')}
                    </a>
                )}
              </div>
            </div>
          </div>
        ))}
    </>);
}
