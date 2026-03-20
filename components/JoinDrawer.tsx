"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface JoinDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function JoinDrawer({ isOpen, onClose }: JoinDrawerProps) {
    const { t } = useTranslation('common');

    // Prevent scrolling on the main body when the drawer is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Blurred Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Sliding Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-white z-[210] shadow-2xl flex flex-col overflow-y-auto"
                    >
                        {/* Header & Close Button */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                                    {t('join.title')}
                                </h2>
                                <p className="text-sm text-slate-500 font-light mt-1">
                                    {t('join.subtitle')}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 flex-grow flex flex-col gap-10">

                            {/* Section: Why Join Us */}
                            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
                                <h3 className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mb-4">
                                    {t('join.why_title')}
                                </h3>
                                <ul className="space-y-4">
                                    {[1, 2, 3].map((num) => (
                                        <li key={num} className="flex items-start gap-3">
                                            <div className="w-5 h-5 mt-0.5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-sm text-slate-700 leading-relaxed">
                                                {t(`join.perk_${num}`)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Section: The Form */}
                            <div>
                                <h3 className="text-slate-900 font-black uppercase tracking-tight mb-4">
                                    {t('join.form_title')}
                                </h3>

                               
                                <form
                                    className="space-y-4"
                                    onSubmit={(e) => {
                                        e.preventDefault();                          
                                        alert("Application submitted successfully!");
                                        onClose(); 
                                    }}
                                >
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('join.name')}</label>
                                        <input
                                            type="text"
                                            required                                            
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                                            placeholder="Ada Lovelace"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('join.email')}</label>
                                        <input
                                            type="email"
                                            required 
                                            pattern=".*@.*\.uoc\.gr$" 
                                            title="Please enter a valid University of Crete email (ending in uoc.gr)"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                                            placeholder="csdXXXX@csd.uoc.gr"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('join.year')}</label>
                                            <select
                                                required
                                                
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Select Year</option>
                                                <option value="1">1st Year</option>
                                                <option value="2">2nd Year</option>
                                                <option value="3">3rd Year</option>
                                                <option value="4+">4th+ Year</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('join.interests')}</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                                                placeholder="Web, AI..."
                                            />
                                        </div>
                                    </div>
                                         
                                    <button
                                        type="submit"
                                        className="w-full mt-4 bg-blue-600 text-white rounded-xl px-4 py-4 text-sm font-black uppercase tracking-widest hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all active:scale-[0.98]"
                                    >
                                        {t('join.submit')}
                                    </button>
                                </form>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}