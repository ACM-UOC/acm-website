"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

const Team = dynamic(() => import('@/components/Team'), { ssr: false });

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPage() {
    const { t } = useTranslation('common');

    return (
        <main className="min-h-screen bg-slate-50 relative z-0">
            

            <div className="absolute top-0 left-0 w-full h-[45vh] min-h-[450px] bg-white rounded-b-[4rem] shadow-sm -z-10" />

            <div className="max-w-7xl mx-auto px-6 pt-32 pb-10">
                
                {/* Page Hero Header */}
                <motion.div 
                    initial="hidden" animate="visible" variants={containerVariants}
                    className="text-center max-w-4xl mx-auto mb-32"
                >
                    <motion.h2 variants={itemVariants} className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-4">
                        {t('about_page.badge')}
                    </motion.h2>
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">
                        {t('about_page.title')}
                    </motion.h1>
                    <motion.div variants={itemVariants} className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)] mb-8" />
                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
                        {t('about_page.description')}
                    </motion.p>
                </motion.div>

                
                <motion.div 
                    initial="hidden" animate="visible" variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
                >
                    {/* Mission Card */}
                    <motion.div variants={itemVariants} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
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
                    </motion.div>

                    {/* Vision Card */}
                    <motion.div variants={itemVariants} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col items-center text-center">
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
                    </motion.div>
                </motion.div>
            </div>

            {/* The Team Component */}
            <Team />
            
        </main>
    );
}