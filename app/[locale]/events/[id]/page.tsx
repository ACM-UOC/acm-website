"use client";
import { m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import Sponsors from '@/components/Sponsors';

import { getEventById, type Speaker, type AgendaItem } from '@/data/events';
import { getGoogleCalendarUrl } from '@/lib/calendar';

export default function EventDetailPage() {
    const t = useTranslations();
    const params = useParams();
    const rawId = params.id;
    const eventId = Array.isArray(rawId) ? rawId[0] : rawId ?? '';

    const event = getEventById(eventId);

    if (!event) {
        return (
            <main className="min-h-screen bg-slate-50 pt-32 pb-24 flex items-center justify-center">
                <div className="text-center px-6 max-w-md">
                    <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-4">404</p>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase mb-6">Event Not Found</h1>
                    <p className="text-slate-500 leading-relaxed mb-10">This event doesn&apos;t exist or may have been removed.</p>
                    <Link href="/events" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Events
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 pt-32 pb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-6 relative z-10">

                <Link href="/events" className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs tracking-widest uppercase mb-12 hover:text-blue-600 transition-colors group">
                    <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t('event_detail.back')}
                </Link>

                <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="flex items-center gap-3 mb-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${event.status === 'upcoming' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-slate-200 text-slate-500'}`}>
                            {event.status === 'upcoming' ? t('event_detail.upcoming_badge') : t('event_detail.past_badge')}
                        </span>
                        <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                            {event.category}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-tight mb-6">
                        {event.status === 'upcoming'
                            ? t(`events.${eventId}.title`)
                            : t(`events_page.archive.${eventId}.title`)}
                    </h1>

                    <div className="space-y-4 mb-10 border-l-4 border-blue-600 pl-5">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-blue-600 font-mono font-bold tracking-widest uppercase text-sm">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {event.date}
                            </div>

                            {event.status === "upcoming" && (
                                <a
                                    href={getGoogleCalendarUrl({
                                        title: t(`events.${eventId}.title`),
                                        date: event.date,
                                        description: t(`events.${eventId}.description`)
                                    })}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-900 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest border border-slate-200 shadow-sm"
                                >
                                    + {t('event_detail.add_to_calendar')}
                                </a>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 text-blue-600 font-bold tracking-tight text-sm">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {t('event_detail.location_placeholder')}
                            </div>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Department+of+Computer+Science+University+of+Crete"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-900 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest border border-slate-200 shadow-sm"
                            >
                                {t('event_detail.view_on_maps')}
                            </a>
                        </div>
                    </div>
                </m.div>

                <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    {event.status === "upcoming" ? (
                        <div className="space-y-16">
                            <p className="text-lg text-slate-600 leading-relaxed font-light bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                {t(`events.${eventId}.description`)}
                            </p>

                            {event.speakers && (
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">
                                        {t('event_detail.speakers')}
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {event.speakers.map((speaker: Speaker) => (
                                            <div key={speaker.name} className="bg-white border border-slate-100 rounded-3xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                                                <Image src={speaker.image} alt={speaker.name} width={64} height={64} className="rounded-full object-cover border-2 border-slate-50" />
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{speaker.name}</h4>
                                                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-1">{speaker.role}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {event.agenda && (
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6">
                                        {t('event_detail.agenda')}
                                    </h3>
                                    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                            {event.agenda.map((item: AgendaItem) => (
                                                <div key={item.time} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 group-hover:bg-blue-600 text-blue-600 group-hover:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors duration-300">
                                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path></svg>
                                                    </div>
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

                            <Sponsors sponsors={event.sponsors} variant="page" />

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
                                        {event.registrationUrl ? (
                                            <a
                                                href={event.registrationUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-900 transition-colors shadow-lg shadow-blue-600/20"
                                            >
                                                {t('event_detail.register_btn')}
                                            </a>
                                        ) : (
                                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                                                {t('event_detail.registration_soon')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4">
                                    {t('event_detail.recap_title')}
                                </h3>
                                <p className="text-lg text-slate-600 leading-relaxed font-light bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                    {t(`events_page.archive.${eventId}.description`)}
                                </p>
                            </div>

                            <Sponsors sponsors={event.sponsors} variant="page" />

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
                </m.div>
            </div>

        </main>
    );
}
