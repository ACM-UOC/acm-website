//components/Hero.tsx

"use clinet";

import { motion } from "framer-motion"
import { useRef, useMemo } from "react" // useRef for DOM reference, useMemo for performance


const Hero = () => {

    const containerRef = useRef(null);

    // drawing random curved-magnetic lines line a network
    const network = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => { 

            // Keep dots visible 
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
                            <motion.path
                                d={item.path}
                                stroke="url(#curveGradient)"
                                strokeWidth="0.2" 
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.7 }}
                                transition={{ duration: item.duration, delay: item.delay, ease: "easeOut" }}
                            />

                            <motion.circle
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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="bg-slate-950/60 backdrop-blur-md p-10 md:p-16 rounded-[2.5rem] border border-white/10 shadow-2xl max-w-2xl mx-auto"
                >
                    {/*Badge*/}
                    <h2 className="text-blue-500 font-mono tracking-[0.4em] uppercase text-[10px] md:text-xl mb-6">
                        ACM UOC Student Chapter
                    </h2>

                    {/*Main Title*/}
                    <h1 className="text-3xl md:text-3xl font-black text-white leading-none tracking-tighter mb-8">
                        From <span className="text-blue-600 italic">Code</span> <br className="md:hidden" /> to Community
                    </h1>

                    {/* The Slogan */}
                    <p className="text-slate-400 max-w-md mx-auto text-sm md:text-lg font-light leading-relaxed italic">
                        "Translating logic into shared experiences <br className="hidden md:block" />
                        at the <span className="text-slate-200">heart of Crete.</span>"
                    </p>
                </motion.div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

        </section>
    )

}

export default Hero;

