"use client";
import { m, Variants } from 'framer-motion';
import { useTranslations } from "next-intl";


const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function PastEventsAnimation() {
  const t = useTranslations();

  return (
    <m.div
        initial="hidden" animate="visible" variants={containerVariants}
        className="text-center max-w-3xl mx-auto mb-32"
    >
        <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-4">
            {t('events_page.badge')}
        </p>
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">
            {t('events_page.title')}
        </h1>
        <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)] mb-8" />
        <p className="text-lg text-slate-600 leading-relaxed italic px-4">
            &ldquo;{t('events_page.description')}&rdquo;
        </p>
    </m.div>
  );
}
