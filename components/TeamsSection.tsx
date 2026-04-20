import React from 'react';
import { Team } from '@/lib/types';
import { Link } from '@/i18n/navigation';
import { getTeams } from '@/lib/db_parser';
import TeamCard from '@/components/TeamCard';
import { getTranslations } from 'next-intl/server';


// TODO: check if this should be server-side or client-side
const teamIcons: Record<string, React.ReactNode> = {
  "98": (<><rect x="2" y="8" width="20" height="12" rx="5" /><path d="M9 12H7M8 11v2M16 11.5h.01M18 13h.01" /></>)
}

export default async function TeamSection() {
  const t = await getTranslations();
  const teams = await getTeams();

  return (
    <section id="synergy" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header*/}
        <div className="mb-16">
          <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-[10px] font-bold mb-3">
            {t('team.badge')}
          </p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            {t('team.title')}
          </h2>
          <div className="w-16 h-1.5 bg-blue-600 mt-6 rounded-full shadow-[0_2px_10px_rgba(37,99,235,0.3)]"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team: Team) => (
            <TeamCard
              key={team.id}
              id={team.id}
              name={team.short_name || team.name}
              url={team.websiteUrl}
              icon={teamIcons[team.id]}
            />
          ))}

          {/* Stay Tuned Card */}
          <div className="relative h-64 rounded-[2.5rem] border bg-slate-50/50 border-dashed border-slate-300 p-8 transition-all duration-700 overflow-hidden flex flex-col justify-center items-center cursor-default group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl scale-0 group-hover:scale-150 transition-transform duration-1000 ease-out pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center gap-5 text-center">
              <div className="text-blue-600 mb-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>

              <span className="text-lg text-slate-600 tracking-tight font-bold uppercase leading-tight">
                {t('team.specialist_teams.more_to_come.name')}
              </span>
            </div>
          </div>
        </div>

        {/* "View All" Button */}
        <div className="mt-16 text-center">
          <Link href="/teams" className="group inline-flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-all duration-500 shadow-lg hover:shadow-blue-600/20">
            <span className="text-xs font-black uppercase tracking-[0.2em]">Meet All Our Specialist Teams</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
