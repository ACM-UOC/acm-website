"use client";
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

import Sponsors from '@/components/Sponsors';
import { getUpcomingEvents } from '@/data/events';

export default function UpcomingEventsGrid() {
    const upcomingEvents = getUpcomingEvents();
    const t = useTranslations();

    return (
        <section id="events" className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="mb-16">
                    <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs mb-3 font-bold">
                        {t('events.badge')}
                    </p>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        {t('events.title')}
                    </h2>
                    <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    
                    {upcomingEvents.map((event) => (
                        
                        <div 
                            key={event.id}
                            className="group bg-white rounded-[2.5rem] border border-slate-100 p-7 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative flex flex-col h-full"
                        >
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full group-hover:bg-blue-100/60 blur-2xl transition-colors duration-500 pointer-events-none" />
                            
                            <div className='relative z-10 flex flex-col h-full'>
                                <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 border border-slate-100/50 mb-6 shrink-0">
                                    <Image
                                        src={event.image}
                                        alt={t(`events.${event.id}.title`)}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg z-20">
                                        {t(`events.${event.id}.status`)}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-3 text-blue-700 font-mono text-[10px] tracking-widest font-bold uppercase shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_5px_rgba(37,99,235,0.5)]" />
                                    <span>{event.date}</span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight leading-tight group-hover:text-blue-600 transition-colors shrink-0">
                                    {t(`events.${event.id}.title`)}
                                </h3>

                                <div className="w-8 h-1 bg-blue-600 mb-4 group-hover:w-16 transition-all duration-500 rounded-full shrink-0" />
                                
                                <p className="text-slate-500 text-sm font-light leading-relaxed italic mb-6 shrink-0">
                                    "{t(`events.${event.id}.description`)}"
                                </p>
                                                                            
                                <div className="mb-4 shrink-0 relative z-20">
                                    <Sponsors sponsors={event.sponsors} variant="card" />
                                </div>

                                <div className="mt-auto pt-5 border-t border-slate-50 shrink-0">
                                    <Link
                                        href={`/events/${event.id}`}
                                        aria-label={`${t('events.view_details')} – ${t(`events.${event.id}.title`)}`}
                                        className="text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 cursor-pointer inline-flex"
                                    >
                                        {t('events.view_details')}
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

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