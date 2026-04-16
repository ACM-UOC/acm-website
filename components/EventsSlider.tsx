"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getUpcomingEvents } from '@/data/events';


export default function EventSlider({ children }: { children: React.ReactNode }) {
    const upcomingEvents = getUpcomingEvents();
    const t = useTranslations();
    const [scrollProgress, setScrollProgress] = useState(0);
    const shouldLoop = upcomingEvents.length > 3;
    const emblaOptions = useMemo(() => ({ loop: shouldLoop }), [shouldLoop]);
    const emblaPlugins = useMemo(
        () =>
            shouldLoop
                ? [
                      AutoScroll({
                          playOnInit: true,
                          speed: 1,
                          stopOnInteraction: false,
                          stopOnMouseEnter: true,
                      }),
                  ]
                : [],
        [shouldLoop]
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, emblaPlugins);

    const onScroll = useCallback((api: EmblaCarouselType) => {
        const progress = Math.max(0, Math.min(1, api.scrollProgress()));
        setScrollProgress(progress * 100);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('scroll', onScroll);
        onScroll(emblaApi);
        return () => {
            emblaApi.off('scroll', onScroll);
        };
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
                  {children}
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
