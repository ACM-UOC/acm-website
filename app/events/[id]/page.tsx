"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import RegisterEvent from '@/components/RegisterEvent';
import Sponsors from '@/components/Sponsors';

//  MOCK DATABASE 
const eventDatabase: Record<string, any> = {
    "event_1": { status: "past", date: "15 OCT 2025", category: "Web Dev", photos: [1, 2, 3, 4] },
    "event_2": { status: "past", date: "20 SEP 2024", category: "Security", photos: [1, 2] },
    "event_3": { status: "past", date: "05 MAR 2024", category: "Game Dev", photos: [1, 2, 3] },
    "featured_event": {
        status: "upcoming",
        date: "22 OCT 2026",
        category: "Workshop",
        photos: [],
        agenda: [
            { time: "10:00 AM", title: "Doors Open & Coffee", desc: "Get your nametags, grab a coffee, and meet the team." },
            { time: "10:30 AM", title: "Keynote Presentation", desc: "An introduction to the current landscape of the tech industry." },
            { time: "11:30 AM", title: "Hands-on Workshop", desc: "Open your laptops! We will be building a project from scratch." },
            { time: "14:00 PM", title: "Networking & Pizza", desc: "Stick around to chat with our speakers and mentors." }
        ],
        speakers: [
            { name: "Dr. Ada Lovelace", role: "Professor of CS", image: "https://i.pravatar.cc/150?u=ada" },
            { name: "Alan Turing", role: "Senior Engineer @ TechCorp", image: "https://i.pravatar.cc/150?u=alan" }
        ]
    }
};

export default function EventDetailPage() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const { t } = useTranslation('common');
    const params = useParams();
    const eventId = params.id as string;

    // Fetch the event data. If the ID doesn't exist in our mock DB, default to a past event.
    const event = eventDatabase[eventId] || { status: "past", date: "TBD", category: "Event", photos: [] };

    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-24 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">

                {/* Back Button */}
                <Link href="/events" className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs tracking-widest uppercase mb-12 hover:text-blue-600 transition-colors group">
                    <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t('event_detail.back')}
                </Link>

                {/* Event Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="flex items-center gap-3 mb-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${event.status === 'upcoming' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-200 text-slate-500'}`}>
                            {event.status === 'upcoming' ? t('event_detail.upcoming_badge') : t('event_detail.past_badge')}
                        </span>
                        <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                            {event.category}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-tight mb-6">
                        {t(`events_page.archive.${eventId}.title`, t(`events.${eventId}.title`, "Event Title"))}
                    </h1>

                    <div className="flex items-center gap-3 text-blue-600 font-mono font-bold tracking-widest uppercase text-sm mb-12 border-l-4 border-blue-600 pl-4">
                        {event.date}
                    </div>
                </motion.div>

                {/* Conditional Layout */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>

                    {event.status === "upcoming" ? (
                        <div className="space-y-16">

                            {/* Description */}
                            <p className="text-xl text-slate-600 leading-relaxed font-light">
                                {t(`events.${eventId}.description`, "Join us for an incredible deep dive into the latest technologies. This event is perfect for students of all skill levels looking to expand their knowledge.")}
                            </p>

                            {/*Speakers Section */}
                            {event.speakers && (
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">
                                        {t('event_detail.speakers')}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {event.speakers.map((speaker: any, idx: number) => (
                                            <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                                <img src={speaker.image} alt={speaker.name} className="w-16 h-16 rounded-full object-cover border-2 border-slate-50" />
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{speaker.name}</h4>
                                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-1">{speaker.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/*Agenda/Schedule Section */}
                            {event.agenda && (
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">
                                        {t('event_detail.agenda')}
                                    </h3>
                                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                            {event.agenda.map((item: any, idx: number) => (
                                                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                                                    {/* Timeline Dot */}
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 group-hover:bg-blue-600 text-blue-600 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300">
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path></svg>
                                                    </div>

                                                    {/* Content Box */}
                                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-6 rounded-2xl border border-slate-100 group-hover:border-blue-100 transition-colors">
                                                        <div className="flex flex-col mb-1">
                                                            <span className="text-blue-600 font-mono text-xs font-bold tracking-widest mb-2">{item.time}</span>
                                                            <h4 className="text-slate-900 font-bold">{item.title}</h4>
                                                        </div>
                                                        <p className="text-sm text-slate-500 font-light mt-2">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Call to Action Box */}
                            <div className="bg-white border border-blue-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden mt-12">
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-2xl" />
                                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                                    <div className="max-w-sm">
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-3">
                                            {t('event_detail.join_prompt_title')}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                            {t('event_detail.join_prompt_desc')}
                                        </p>
                                        <button
                                            onClick={() => setIsRegisterOpen(true)}
                                            className="bg-blue-600 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-lg shadow-blue-600/20 cursor-pointer"
                                        >
                                            {t('event_detail.register_btn')}
                                        </button>
                                    </div>
                                    {/* Photo Upload Placeholder */}
                                    <div className="relative group w-full md:w-48 aspect-square">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="event-photo-upload"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    //TODO: uploding in the server
                                                    alert(`Selected: ${file.name}. Ready to upload!`);
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor="event-photo-upload"
                                            className="w-full h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center flex-col text-slate-400 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
                                        >
                                            {/* Animated Icon */}
                                            <div className="relative">
                                                <svg className="w-8 h-8 mb-2 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {/* Tiny '+' Badge */}
                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                    +
                                                </div>
                                            </div>

                                            <span className="text-[15px] font-black tracking-widest uppercase group-hover:text-blue-600 transition-colors">
                                                {t('event_detail.upload_photo', 'Upload Photo')}
                                            </span>

                                            <span className="text-[13px] text-slate-300 mt-1 uppercase font-bold tracking-tighter group-hover:text-blue-400">
                                                Max 5MB • JPG, PNG
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // PAST EVENT LAYOUT 
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4">
                                    {t('event_detail.recap_title')}
                                </h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-light bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                    {t(`events_page.archive.${eventId}.description`, "Event recap description goes here.")}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-3">
                                    {t('event_detail.gallery_title')}
                                    <span className="text-xs font-bold text-slate-400 bg-slate-200 px-3 py-1 rounded-full">{event.photos.length}</span>
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {event.photos.map((photoNum: number) => (
                                        <div key={photoNum} className="bg-slate-200 aspect-video rounded-2xl overflow-hidden group cursor-pointer relative">
                                            <div className="w-full h-full bg-slate-300 transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </motion.div>
            </div>
            <RegisterEvent
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                eventName={t(`events_page.archive.${eventId}.title`, t(`events.${eventId}.title`, "Event Title"))}
            />
        </main>
    );
}