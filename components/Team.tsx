import { Suspense } from 'react';
import { parseDb } from '@/lib/db_parser';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';

interface TeamMember {
  name: string;
  name_gr: string;
  roles: Array<string>;
  image: string;
  linkedin?: string;
}

async function TeamParser(): Promise<TeamMember[]> {
  try {
    const allMembers = await parseDb("members", 60*60*24);

    const result = allMembers.map((member: any) => {
      const { firstname_en, lastname_en, firstname_gr, lastname_gr, role, image, link_linkedin } = member.acf;

      return {
        name: `${firstname_en} ${lastname_en}`,
        name_gr: `${firstname_gr} ${lastname_gr}`,
        roles: role,
        linkedin: link_linkedin,
        image: (image===false) ? '' : image,
      };
    });

    const sortedRoles = ["chair", "vice_chair", "treasurer", "secretary"];
    const getRank = (role: string) => {
      const index = sortedRoles.indexOf(role);
      return index === -1 ? Infinity : index;
    };

    result.sort((a, b) => {
      let a_min = Math.min(...a.roles.map(getRank));
      let b_min = Math.min(...b.roles.map(getRank));
      return a_min - b_min;
    });

    return result;
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

async function TeamList() {
  const locale = await getLocale();
  const t = await getTranslations();
  const team = await TeamParser();

  if (team.length === 0) {
    return (
      <p className="text-slate-500 text-center italic mt-8">
        Team members are currently unavailable. Please check back later.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-12 lg:gap-16">
      {team.map((member) => (
        <div key={member.name} className="group flex flex-col items-center w-48">
          <div className="relative mb-6">
            <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full opacity-0 blur-sm"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center border-4 border-slate-50 shadow-xl overflow-hidden">
              {member.image!=='' ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  quality={70}
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-cover"
                />
              ) : (
                <span className="text-slate-400 font-bold text-5xl">
                  {locale==='el' ? (member.name_gr[0]) : (member.name[0])}
                </span>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
              {locale==='el' ? (member.name_gr) : (member.name)}
            </h3>
            <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">
              {member.roles.map((role, index) => (
                <span key={role}>
                  {index>0 && <br />}
                  {t(`team-members.roles.${role}`)}
                </span>
              ))}
            </p>
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className="inline-block mt-2 text-slate-400 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Team() {
  const t = await getTranslations();

  return (
    <section id="team" className="py-24 bg-transparent scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="mb-20">
          <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-4">
            {t('team-members.badge')}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            {t('team-members.title')}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed italic">
            &ldquo;{t('team-members.description')}&rdquo;
          </p>
        </div>

        {/* Handle slow DB query */}
        <Suspense fallback={<div className="animate-pulse text-slate-400">Loading team members...</div>}>
          <TeamList />
        </Suspense>

      </div>
    </section>
  );
}
