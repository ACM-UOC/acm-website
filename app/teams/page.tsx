"use client";
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const teamIds = ["game_dev"];

export default function TeamsPage() {
  const { t } = useTranslation('common');

  return (
    <main className="min-h-screen bg-slate-50 relative z-0">

      <div className="absolute top-0 left-0 w-full h-[70vh] min-h-[650px] md:h-[45vh] md:min-h-[450px] bg-white rounded-b-[4rem] shadow-sm -z-10" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-32">
          <h2 className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-4">
            {t('teams_page.badge')}
          </h2>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">
            {t('teams_page.title')}
          </h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)] mb-8"></div>

          <p className="text-lg text-slate-600 leading-relaxed italic px-4">
            "{t('teams_page.description')}"
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamIds.map((id) => (
            <div
              key={id}
              className="relative h-full bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col group"
            >
              {/* Background Glow Effect */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full group-hover:bg-blue-100/80 transition-colors duration-500 blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 origin-left">
                  {t(`teams_page.teams.${id}.icon`)}
                </div>

                <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase mb-4 group-hover:text-blue-600 transition-colors">
                  {t(`teams_page.teams.${id}.name`)}
                </h3>

                <div className="w-8 h-1 bg-blue-600 mb-6 group-hover:w-16 transition-all duration-500 rounded-full" />

                <p className="text-slate-500 text-sm font-light leading-relaxed mb-8 flex-grow">
                  {t(`teams_page.teams.${id}.description`)}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <Link
                    href={`/teams/${id}`}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors before:absolute before:inset-0"
                  >
                    {t('teams_page.explore_cta')}
                  </Link>

                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors text-slate-400 relative z-20">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Stay Tuned Card */}
          <div
            className="group bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200 p-10 transition-all duration-500 flex flex-col items-center justify-center text-center min-h-[320px]"
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
              ✨
            </div>
            <h4 className="text-xl font-bold text-slate-400 mb-3 tracking-tight uppercase">
              {t('events.stay_tuned.title')}
            </h4>
            <div className="mt-4 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-200 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-blue-200 animate-pulse delay-75" />
              <div className="w-2 h-2 rounded-full bg-blue-200 animate-pulse delay-150" />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}