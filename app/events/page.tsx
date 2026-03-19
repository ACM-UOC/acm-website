"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

const EventSlider = dynamic(() => import('@/components/EventsSlider'), { ssr: false });

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const pastEventsData = [
    { id: "event_1", year: "2025", category: "Web Dev" },
    { id: "event_2", year: "2024", category: "Security" },
    { id: "event_3", year: "2024", category: "Game Dev" },
];

export default  function EventsPage() {
    const { t } = useTranslation('common');
    const [activeYear, setActiveYear] = useState<string>("All");

    const years = ["All", ...Array.from(new Set(pastEventsData.map(e => e.year)))];

    const filteredEvents = activeYear === "All"
        ? pastEventsData
        : pastEventsData.filter(e => e.year === activeYear);

    return (
        <main className="min-h-screen bg-slate-50 relative z-0">
            <div className="absolute top-0 left-0 w-full  h-[45vh] min-h-[450px] bg-white rounded-b-[4rem] shadow-sm -z-10" />

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

                {/* Page Hero Header */}
                <motion.div
                    initial="hidden" animate="visible" variants={containerVariants}
                    className="text-center max-w-3xl mx-auto mb-32"
                >
                    <h2 className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-4">
                        {t('events_page.badge')}
                    </h2>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">
                        {t('events_page.title')}
                    </h1>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)] mb-8" />
                    <p className="text-lg text-slate-600 leading-relaxed italic px-4">
                        "{t('events_page.description')}"
                    </p>
                </motion.div>

                {/* Upcoming Events Slider */}
                <div className="mb-32">
                    <EventSlider />
                </div>

                {/* Past Events Archive */}
                <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="flex items-center gap-4">
                            <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
                                {t('events_page.archive_title')}
                            </h3>
                        </div>

                        {/* Interactive Year Filter */}
                        <div className="flex flex-wrap gap-2">
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setActiveYear(year)}
                                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${activeYear === year
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                                            : "bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                                        }`}
                                >
                                    {year === "All" ? t('events_page.filter_all') : year}
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div 
                
                            key={activeYear} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >

                            {filteredEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="group bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
                                >
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

                                    {/* Content */}
                                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3 group-hover:text-blue-600 transition-colors">
                                        {t(`events_page.archive.${event.id}.title`)}
                                    </h4>
                                    <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 flex-grow">
                                        {t(`events_page.archive.${event.id}.description`)}
                                    </p>

                                    {/* Action Link */}
                                    <div className="pt-4 border-t border-slate-50 flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors cursor-pointer">
                                        {t('events_page.read_recap')}
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </main>
        
    );
}