"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface Sponsor {
    name: string;
    logo: string;
    url: string;
}

interface SponsorsProps {
    items: Sponsor[];
    label?: string; 
    variant?: 'grid' | 'row'; 
}

export default function Sponsors({ items, label, variant = 'row' }: SponsorsProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className={`py-6 ${variant === 'grid' ? 'w-full' : 'inline-flex flex-col'}`}>
            {label && (
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 block mb-4">
                    {label}
                </span>
            )}
            
            <div className={`flex items-center gap-8 ${variant === 'grid' ? 'grid grid-cols-2 md:grid-cols-4' : 'flex-wrap'}`}>
                {items.map((sponsor, idx) => (
                    <motion.a
                        key={idx}
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="block grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    >
                        <img 
                            src={sponsor.logo} 
                            alt={sponsor.name} 
                            className="h-7 md:h-9 w-auto object-contain max-w-[120px]" 
                        />
                    </motion.a>
                ))}
            </div>
        </div>
    );
}