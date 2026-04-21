"use client";
import { m } from 'framer-motion';
import { Link } from '@/i18n/navigation';


interface TeamCardProps {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
}

export default function TeamCard({ id, name, url, icon }: TeamCardProps) {
  return (
    <Link
      href={url}
      target='_blank'
      key={id}
      className="relative h-64 bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden flex flex-col justify-center items-center cursor-default group cursor-pointer"
    >

      <m.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-blue-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        whileHover={{
          scale: 2,
          rotate: 15,
          transition: { duration: 0.8, ease: "easeOut" }
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl scale-0 group-hover:scale-150 transition-transform duration-1000 ease-out pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        {/* Hover Icon Animation - Kept for interactivity */}
        <m.div
          className="text-blue-600 mb-2"
          whileHover={{
            y: -8,
            scale: 1.1,
            filter: "drop-shadow(0 10px 15px rgba(37,99,235,0.2))",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {/* TODO: check what should happen with icon */}
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
            {icon}
          </svg>
        </m.div>

        <span className="text-lg text-slate-900 tracking-tight uppercase font-black leading-tight group-hover:text-blue-600 transition-colors duration-500">
          {name}
        </span>
      </div>

      <div className="absolute bottom-8 w-1 h-1 bg-slate-200 rounded-full group-hover:w-12 group-hover:bg-blue-600 transition-all duration-500" />
    </Link>
  );
}
