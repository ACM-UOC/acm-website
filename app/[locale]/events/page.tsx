"use client";
import React, { useState } from 'react';
import { m, AnimatePresence, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getPastEvents, getAllYears } from '@/data/events';
import EventSlider from '@/components/EventsSlider';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function EventsPage() {
    const t = useTranslations();
    const [activeYear, setActiveYear] = useState<string>("All");

    const pastEvents = getPastEvents();
    const dynamicYears = getAllYears();
    const years = ["All", ...dynamicYears];

    const filteredEvents = activeYear === "All"
        ? pastEvents
        : pastEvents.filter(e => e.year === activeYear);

    return (
        <main className="min-h-screen bg-slate-50 relative z-0">
            <div className="absolute top-0 left-0 w-full h-[45vh] min-h-[450px] bg-white rounded-b-[4rem] shadow-sm -z-10" />

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

                <m.div
                    initial="hidden" animate="visible" variants={containerVariants}
                    className="text-center max-w-3xl mx-auto mb-32"
                >
                    <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-4">
                        {t('events_page.badge')}
                    </p>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">
                        {t('events_page.title')}
                    </h1>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)] mb-8" />
                    <p className="text-lg text-slate-600 leading-relaxed italic px-4">
                        &ldquo;{t('events_page.description')}&rdquo;
                    </p>
                </m.div>

                <div className="mb-32">
                    <EventSlider />
                </div>

                <div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                        <div className="relative">
                            <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs mb-3">
                                {t('events_page.archive_badge')}
                            </p>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                                {t('events_page.archive_title')}
                            </h2>
                            <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.2)]"></div>
                        </div>

                        <div className="flex flex-wrap gap-2 pb-1">
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setActiveYear(year)}
                                    className={`cursor-pointer px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeYear === year
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105"
                                        : "bg-white text-slate-400 border border-slate-100 hover:border-blue-200 hover:text-blue-600"
                                        }`}
                                >
                                    {year === "All" ? t('events_page.filter_all') : year}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <m.div
                            key={activeYear}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className={filteredEvents.length === 0 ? "flex justify-center py-24" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}
                        >
                            {filteredEvents.length === 0 && (
                                <div className="text-center">
                                    <p className="text-slate-300 text-6xl mb-6">📭</p>
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{t('events_page.no_events')}</p>
                                </div>
                            )}
                            {filteredEvents.map((event) => (
                                <div key={event.id} className="group bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="bg-blue-50 rounded-2xl p-3 text-center min-w-[70px] group-hover:bg-blue-600 transition-colors duration-500">
                                            <span className="block text-2xl font-black text-blue-600 group-hover:text-white leading-none mb-1">
                                                {t(`events_page.archive.${event.id}.day`)}
                                            </span>
                                            <span className="block text-[10px] font-bold text-blue-400 tracking-widest uppercase group-hover:text-blue-100">
                                                {t(`events_page.archive.${event.id}.month`)}
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                            {event.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                                        {t(`events_page.archive.${event.id}.title`)}
                                    </h3>

                                    <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 flex-grow">
                                        {t(`events_page.archive.${event.id}.description`)}
                                    </p>

                                    <div className="pt-4 border-t border-slate-50 flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                                        <Link
                                            href={`/events/${event.id}`}
                                            className="inline-flex items-center gap-2 before:absolute before:inset-0"
                                        >
                                            {t('events_page.read_recap')}
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </m.div>
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
