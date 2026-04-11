"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { m, AnimatePresence } from 'framer-motion';

export interface SponsorType {
    name: string;
    logo: string;
    url: string;
    desc?: string;
}

interface SponsorsProps {
    sponsors?: SponsorType[];
    variant?: 'card' | 'page' | 'sidebar';
}

export default function Sponsors({ sponsors, variant = 'card' }: SponsorsProps) {
    const t = useTranslations();
    const [activeSponsorName, setActiveSponsorName] = useState<string | null>(null);

    if (!sponsors || sponsors.length === 0) return null;

    const isCard = variant === 'card';
    const isSidebar = variant === 'sidebar';
    const isPage = variant === 'page';
    const activeSponsor = sponsors.find((sponsor) => sponsor.name === activeSponsorName) ?? sponsors[0];

    // Using next/image instead of <img> for automatic format conversion (WebP/AVIF),
    // lazy loading, and CDN caching — avoids layout shift and reduces bandwidth on sponsor logos.
    const renderLogo = (sponsor: SponsorType, className: string) => (
        <div className={className}>
            <Image
                src={sponsor.logo}
                alt={sponsor.name}
                fill
                sizes="120px"
                unoptimized={sponsor.logo.endsWith('.svg')}
                className="object-contain"
            />
        </div>
    );


    // VARIANT: PAGE 
    if (isPage) {
        return (
            <div className="mb-16">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8">
                    {t('event_detail.sponsored_by')}
                </h3>
                
                <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
                    {/* 1. The Logo Row */}
                    <div className="flex flex-wrap items-center gap-8 mb-8 pb-8 border-b border-slate-50">
                        {sponsors.map((sponsor) => {
                            const isActive = activeSponsor?.name === sponsor.name;
                            return (
                                <button
                                    type="button"
                                    key={sponsor.name}
                                    aria-label={`${sponsor.name}${isActive ? ' (active)' : ''}`}
                                    onMouseEnter={() => setActiveSponsorName(sponsor.name)}
                                    onFocus={() => setActiveSponsorName(sponsor.name)}
                                    className={`cursor-pointer relative transition-all duration-500 transform outline-none ${
                                        isActive 
                                        ? 'grayscale-0 opacity-100 scale-110' 
                                        : 'grayscale opacity-40 hover:opacity-70'
                                    }`}
                                >
                                    {renderLogo(sponsor, "relative h-8 w-[120px] md:h-10")}
                                    {isActive && (
                                        <m.div 
                                            layoutId="active-sponsor-dot"
                                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-600 rounded-full"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Dynamic Description Box */}
                    <div className="min-h-[100px] relative">
                        <AnimatePresence mode="wait">
                            {activeSponsor && (
                                <m.div
                                    key={activeSponsor.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                                >
                                    <div className="max-w-2xl">
                                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">
                                            {activeSponsor.name}
                                        </h4>
                                        <p className="text-sm text-slate-500 leading-relaxed font-light">
                                            {activeSponsor.desc || "A proud supporter of ACM UOC and student developer initiatives."}
                                        </p>
                                    </div>
                                    
                                    <a 
                                        href={activeSponsor.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors group shrink-0"
                                    >
                                        {t('sponsors.visit')}
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </m.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        );
    }


    // VARIANTS: CARD & SIDEBAR 
    return (
        <div className={`flex flex-col gap-4 ${isCard ? 'mb-4' : ''}`}>
            <span className={`font-black uppercase tracking-widest text-slate-500 ${isCard ? 'text-[8px]' : 'text-[10px]'}`}>
                {isCard ? t('events.supported_by') : t('event_detail.sponsored_by')}
            </span>
            
            <div className={`flex ${isSidebar ? 'flex-col gap-6' : 'flex-wrap items-center gap-4'}`}>
                {sponsors.map((sponsor) => (
                    <a
                        key={sponsor.name}
                        href={sponsor.url}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`group block grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform ${isSidebar ? 'hover:translate-x-2' : 'hover:scale-105'}`}
                    >
                        {renderLogo(sponsor, `relative ${isCard ? 'h-5' : 'h-8'} w-[120px] mb-2`)}
                        {isSidebar && sponsor.desc && (
                            <p className="text-xs text-slate-500 font-light leading-relaxed group-hover:text-slate-700 transition-colors">
                                {sponsor.desc}
                            </p>
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}
