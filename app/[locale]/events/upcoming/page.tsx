"use client";
import React from 'react';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Sponsors from '@/components/Sponsors';
import { getUpcomingEvents } from '@/data/events';

export default function AllUpcomingEventsPage() {
    const t = useTranslations();
    const allUpcomingEvents = getUpcomingEvents();
    const getEventImageClassName = (eventId: string) => {
        if (eventId === "game-dev-workshop") {
            return "object-cover object-[50%_10%] transition-transform duration-1000 group-hover:scale-105";
        }
        if (eventId === "game-jam") {
            return "object-cover object-center transition-transform duration-1000 group-hover:scale-105";
        }
        return "object-cover object-center transition-transform duration-1000 group-hover:scale-110";
    };

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

                <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-4">
                        {t('events.badge')}
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-16">
                        {t('events.upcoming_title')}
                    </h1>
                </m.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                    {allUpcomingEvents.map((event, idx) => (
                        <m.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="block h-full"
                        >
                            <div className="group bg-white rounded-[2.5rem] border border-slate-100 p-7 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative flex flex-col h-full cursor-pointer">
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full group-hover:bg-blue-100/60 blur-2xl transition-colors duration-500 pointer-events-none" />

                                <div className='relative z-10 flex flex-col h-full'>
                                    <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 border border-slate-100/50 mb-6 shrink-0">
                                        <Image src={event.image} alt={t(`events.${event.id}.title`)} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={getEventImageClassName(event.id)} />
                                        <div className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg z-20">
                                            {t(`events.${event.id}.status`)}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 mb-3 text-blue-500 font-mono text-[10px] tracking-widest font-bold uppercase shrink-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_5px_rgba(37,99,235,0.5)]" />
                                        <span>{event.date}</span>
                                    </div>

                                    <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight leading-tight group-hover:text-blue-600 transition-colors shrink-0">
                                        {t(`events.${event.id}.title`)}
                                    </h4>

                                    <div className="w-8 h-1 bg-blue-600 mb-4 group-hover:w-16 transition-all duration-500 rounded-full shrink-0" />

                                    <p className="text-slate-500 text-sm font-light leading-relaxed italic mb-6 shrink-0">
                                        &ldquo;{t(`events.${event.id}.description`)}&rdquo;
                                    </p>

                                    <div className="mb-2 shrink-0 relative z-20">
                                        <Sponsors sponsors={event.sponsors} variant="card" />
                                    </div>

                                    <div className="mt-auto pt-5 border-t border-slate-50 shrink-0">
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 inline-flex before:absolute before:inset-0 z-10"
                                        >
                                            {t('events.view_details')}
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
