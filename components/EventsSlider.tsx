"use client";
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Sponsors from '@/components/Sponsors';



const upcomingEvents = [
    { id: "featured_event", image: "/game.jpeg", date: "22 OCT 2026" },
    { id: "featured_event", image: "/game.jpeg", date: "15 NOV 2026" },
    { id: "featured_event", image: "/game.jpeg", date: "05 DEC 2026" },
    { id: "featured_event", image: "/game.jpeg", date: "05 DEC 2026" },
    { id: "featured_event", image: "/game.jpeg", date: "05 DEC 2026" }
];

export default function EventSlider() {
    const { t } = useTranslation('common');
    const [scrollProgress, setScrollProgress] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        AutoScroll({
            playOnInit: true,
            speed: 1,
            stopOnInteraction: false,
            stopOnMouseEnter: true
        })
    ]);

    const onScroll = useCallback((api: any) => {
        const progress = Math.max(0, Math.min(1, api.scrollProgress()));
        setScrollProgress(progress * 100);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('scroll', onScroll);
        onScroll(emblaApi);
    }, [emblaApi, onScroll]);

    return (
        <section className="relative overflow-hidden w-full">
            {/* Header */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs mb-3">
                        {t('events.badge')}
                    </h2>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                        {t('events.title')}
                    </h3>
                    <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full"></div>
                </div>
            </div>

            {/* Viewport */}
            <div className="overflow-hidden -mx-4 px-4 pb-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                ref={emblaRef}
            >
                <div className='flex'>
                    {upcomingEvents.map((event, idx) => (
                        <div key={idx} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-8">
                           
                            <Link href={`/events/${event.id}`} className="block h-full">
                                <div className="group bg-white rounded-[2.5rem] border border-slate-100 p-7 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative flex flex-col h-[480px] cursor-pointer">
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full group-hover:bg-blue-100/60 blur-2xl transition-colors duration-500 pointer-events-none" />
                                    
                                    <div className='relative z-10 flex flex-col h-full'>
                                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 border border-slate-100/50 mb-6">
                                            <img src={event.image} alt="Event" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        </div>

                                        <div className="flex items-center gap-3 mb-3 text-blue-500 font-mono text-[10px] tracking-widest font-bold uppercase">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_5px_rgba(37,99,235,0.5)]" />
                                            <span>{event.date}</span>
                                        </div>

                                        <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                                            {t(`events.${event.id}.title`)}
                                        </h4>

                                        <div className="w-8 h-1 bg-blue-600 mb-5 group-hover:w-16 transition-all duration-500 rounded-full" />
                                        
                                        <p className="text-slate-500 text-sm font-light leading-relaxed italic line-clamp-2 mb-6">
                                            "{t(`events.${event.id}.description`)}"
                                        </p>

                                       
                                        <div className="mt-auto pt-5 border-t border-slate-50">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 inline-flex">
                                                {t(`events.${event.id}.cta`)}
                                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 max-w-xs mx-auto">
                <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-blue-600"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>
            </div>
        </section>
    );
}