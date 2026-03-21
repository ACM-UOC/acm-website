"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function TeamSection() {
    const { t } = useTranslation('common');

    const teamsData = [
        { id: "game-dev", name: t('team.specialist_teams.game_dev.name'), icon: "🎮" },
        { id: "more", name: t('team.specialist_teams.more_to_come.name'), icon: "✨" },
    ];

    return (
        <section id="synergy" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header*/}
                <div className="mb-16">
                    <h2 className="text-blue-600 font-mono tracking-[0.4em] uppercase text-[10px] font-bold mb-3">
                        {t('team.badge')}
                    </h2>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        {t('team.title')}
                    </h3>
                    <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)]"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamsData.map((team) => (
                        <div
                            key={team.id}
                            className="relative h-64 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden flex flex-col justify-center items-center cursor-default group"
                        >
                           
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                whileHover={{
                                    scale: 2,
                                    rotate: 15,
                                    transition: { duration: 0.8, ease: "easeOut" }
                                }}
                            />

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl scale-0 group-hover:scale-150 transition-transform duration-1000 ease-out pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center gap-5 text-center">
                                {/* Hover Icon Animation - Kept for interactivity */}
                                <motion.div
                                    className="text-5xl mb-2"
                                    whileHover={{
                                        y: -8,
                                        scale: 1.1,
                                        filter: "drop-shadow(0 10px 15px rgba(37,99,235,0.2))",
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                    {team.icon}
                                </motion.div>

                                <span className="text-lg text-slate-900 tracking-tight uppercase font-black leading-tight group-hover:text-blue-600 transition-colors duration-500">
                                    {team.name}
                                </span>
                            </div>

                            <div className="absolute bottom-8 w-1 h-1 bg-slate-200 rounded-full group-hover:w-12 group-hover:bg-blue-600 transition-all duration-500" />
                        </div>
                    ))}
                </div>

                {/* "View All" Button */}
                <div className="mt-16 text-center">
                    <Link href="/teams" className="group inline-flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all duration-500 shadow-lg hover:shadow-blue-600/20">
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Meet All Our Specialist Teams</span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </Link>
                </div>

            </div>
        </section>
    );
}