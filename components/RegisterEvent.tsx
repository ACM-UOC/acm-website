"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface RegisterEventProps {
    isOpen: boolean;
    onClose: () => void;
    eventName: string;
}

export default function RegisterEvent({ isOpen, onClose, eventName }: RegisterEventProps) {
    const { t } = useTranslation('common');

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        <div className="p-8 md:p-12">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
                                        {t('register.title', 'Registration')}
                                    </h2>
                                    <p className="text-blue-600 font-bold text-sm uppercase tracking-wider">
                                        {eventName}
                                    </p>
                                </div>
                                <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Registered!"); onClose(); }}>
                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required                                
                                        className="w-full bg-transparent border-2 border-slate-300 rounded-2xl px-6 py-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all duration-300"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                                        University Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-transparent border-2 border-slate-300 rounded-2xl px-6 py-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all duration-300"
                                        placeholder="user@csd.uoc.gr"
                                    />
                                </div>

                                <button className="cursor-pointer w-full bg-slate-950 text-white rounded-2xl py-5 mt-4 font-black uppercase tracking-[0.25em] text-[10px] hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-600/20 active:scale-95 duration-300">
                                    {t('register.confirm', 'Confirm Presence')}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}