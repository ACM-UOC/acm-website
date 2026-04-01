//components/Hero.tsx

"use client";

import { m } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useTranslations } from "next-intl"

type NetworkItem = {
    id: number;
    targetX: number;
    targetY: number;
    path: string;
    size: number;
    delay: number;
    duration: number;
};

const generateNetwork = (): NetworkItem[] =>
    Array.from({ length: 20 }).map((_, i) => {
        const targetX = Math.random() > 0.5 ? (5 + Math.random() * 20) : (55 + Math.random() * 20);
        const targetY = Math.random() > 0.5 ? (5 + Math.random() * 20) : (55 + Math.random() * 20);
        const cpX = 40 + (Math.random() - 0.5) * 100;
        const cpY = 40 + (Math.random() - 0.5) * 100;
        return {
            id: i,
            targetX,
            targetY,
            path: `M 40 40 Q ${cpX} ${cpY} ${targetX} ${targetY}`,
            size: Math.random() > 0.6 ? 5 + Math.random() * 3 : 2 + Math.random() * 2,
            delay: Math.random() * 2,
            duration: 2.5 + Math.random() * 2,
        };
    });

const Hero = () => {
    const t = useTranslations('hero');
    const containerRef = useRef(null);
    const [network, setNetwork] = useState<NetworkItem[]>([]);

    useEffect(() => {
        setNetwork(generateNetwork());
    }, []);


    return (
        <section
            id="home"
            ref={containerRef}
            className="relative min-h-screen w-full bg-[#020617] flex items-center justify-center overflow-hidden"
        >
            {/* stage: dark background and a subtle grid*/}
            {/*<div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:100px_100px]" />*/}
            <svg
                viewBox="0 0 80 80"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            >
                <defs>
                    <filter x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="0.4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                    </linearGradient>
                </defs>

                <g>
                    {network.map((item) => (
                        <g key={`group-${item.id}`}>
                            <m.path
                                d={item.path}
                                stroke="url(#curveGradient)"
                                strokeWidth="0.2" 
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.7 }}
                                transition={{ duration: item.duration, delay: item.delay, ease: "easeOut" }}
                            />

                            <m.circle
                                cx={item.targetX}
                                cy={item.targetY}
                                r={item.size / 10}
                                fill="#60a5fa"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: [0, 1, 0.5], scale: 1 }}
                                transition={{ delay: item.delay + item.duration * 0.8, duration: 1 }}
                            />
                        </g>
                    ))}
                </g>
            </svg>

            <div className="relative z-30 text-center select-none px-6">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="bg-slate-950/60 backdrop-blur-md p-10 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl max-w-2xl mx-auto"
                >
                    {/*Badge*/}
                    <p className="text-blue-500 font-mono tracking-[0.4em] uppercase text-[10px] md:text-xl mb-6">
                        {t('badge')}
                    </p>

                    {/*Main Title*/}
                    <h1 className="text-3xl md:text-3xl font-black text-white leading-none tracking-tighter mb-8">
                        {t('title_before')} <span className="text-blue-600 italic">{t('title_highlight')}</span> <br className="md:hidden" /> {t('title_after')}
                    </h1>

                    {/* The Slogan */}
                    <p className="text-slate-400 max-w-md mx-auto text-sm md:text-lg font-light leading-relaxed italic">
                        &ldquo;{t('tagline')}&rdquo;
                    </p>
                </m.div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

            {/* Stats strip */}
            <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center px-6">
                <div className="flex items-stretch divide-x divide-white/10 bg-slate-900/70 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
                    {[
                        { value: "2025", label: "Founded" },
                        { value: "40+", label: "Members" },
                        { value: "3+", label: "Events" },
                        { value: "CSD", label: "Univ. of Crete" },
                    ].map(({ value, label }) => (
                        <div key={label} className="px-5 sm:px-8 py-4 text-center">
                            <p className="text-white font-black text-lg sm:text-xl tracking-tighter">{value}</p>
                            <p className="text-slate-400 text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.15em] mt-0.5">{label}</p>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )

}

export default Hero;

