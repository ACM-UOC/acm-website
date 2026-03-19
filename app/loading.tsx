"use client";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        // This container covers the entire screen while the next page gets ready
        <div className="fixed inset-0 z-[200] bg-slate-50 flex flex-col items-center justify-center min-h-screen">
            <div className="relative flex flex-col items-center">
                
                {/* Pulsing ACM Text */}
                <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.98, 1, 0.98] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-4xl font-black text-slate-900 tracking-tighter mb-8 flex items-center gap-2"
                >
                    ACM <span className="text-blue-600 italic">UOC</span>
                </motion.div>

                {/* Sleek Sweeping Loading Bar */}
                <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 1.5, 
                            ease: "easeInOut" 
                        }}
                        className="absolute top-0 left-0 w-1/2 h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                    />
                </div>

                {/* Subtitle */}
                <p className="mt-6 text-[10px] font-mono font-bold text-slate-400 tracking-[0.4em] uppercase">
                    Loading Route
                </p>

            </div>
        </div>
    );
}