"use client";
import { useState, useEffect, useCallback } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { m } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

import Sponsors from '@/components/Sponsors';
import { getUpcomingEvents } from '@/data/events';

export default function EventSlider() {
    const upcomingEvents = getUpcomingEvents();
    const t = useTranslations();
    const [scrollProgress, setScrollProgress] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        AutoScroll({
            playOnInit: true,
            speed: 1,
            stopOnInteraction: false,
            stopOnMouseEnter: true
        })
    ]);

    const onScroll = useCallback((api: EmblaCarouselType) => {
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
            <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-8">
                <div>
                    <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs mb-3 font-bold">
                        {t('events.badge')}
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        {t('events.title')}
                    </h2>
                    <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)]"></div>
                </div>

                <Link
                    href="/events/upcoming"
                    className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-blue-600/30 group shrink-0"
                >
                    {t('events.view_all')}
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>

            <div
                className="overflow-hidden -mx-4 px-4 pb-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                ref={emblaRef}
            >
                <div className="flex items-stretch">
                    {upcomingEvents.map((event) => (
                        <div key={event.id} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-8">
                            <div className="block h-full">
                                <div className="group bg-white rounded-[2.5rem] border border-slate-100 p-7 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden relative flex flex-col h-full min-h-[500px] cursor-pointer">
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full group-hover:bg-blue-100/60 blur-2xl transition-colors duration-500 pointer-events-none" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 border border-slate-100/50 mb-6 shrink-0">
                                            <Image
                                                src={event.image}
                                                alt={t(`events.${event.id}.title`)}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                                        <p className="text-slate-500 text-sm font-light leading-relaxed italic line-clamp-2 mb-4 shrink-0">
                                            &ldquo;{t(`events.${event.id}.description`)}&rdquo;
                                        </p>

                                        <div className="mb-2 shrink-0 relative z-20">
                                            <Sponsors sponsors={event.sponsors} variant="card" />
                                        </div>

                                        <div className="mt-auto pt-5 border-t border-slate-50 shrink-0 flex items-center gap-3">
                                            <Link
                                                href={`/events/${event.id}`}
                                                aria-label={`${t('events.view_details')} - ${t(`events.${event.id}.title`)}`}
                                                className="text-[10px] font-black uppercase tracking-widest text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 inline-flex before:absolute before:inset-0 z-10"
                                            >
                                                {t('events.view_details')}
                                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </Link>
                                            {event.registrationUrl && (
                                                <a
                                                    href={event.registrationUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="relative z-20 ml-auto text-[9px] font-black uppercase tracking-widest bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-slate-900 transition-colors"
                                                >
                                                    {t('event_detail.register_btn')}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 max-w-xs mx-auto">
                <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                    <m.div
                        className="h-full bg-blue-600"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>
            </div>
        </section>
    );
}
