import { getTranslations } from 'next-intl/server';

interface TeamMember {
  name: string;
  roleKey: string;
  secondRoleKey?: string;
  staticRole?: string;
  linkedin?: string;
}

const team: TeamMember[] = [
  // Chair
  { name: "Nikos Kanakousakis", roleKey: "admin", secondRoleKey: "web_dev", linkedin: "https://www.linkedin.com/in/nikos-kanakousakis-277487334/" },
  // Vice Chair
  { name: "Vasiliki Tsiouvra", roleKey: "vice_chair", linkedin: "https://www.linkedin.com/in/vasiliki-tsiourva-350467375" },
  // Web Dev (alphabetical by surname)
  { name: "Kostas Anagnostakis", roleKey: "web_dev", linkedin: "https://www.linkedin.com/in/κωνσταντίνος-αναγνωστάκης-13bb04253" },
  { name: "Pavlos Grigoriadis", roleKey: "web_dev", linkedin: "https://www.linkedin.com/in/pavlos-grigoriadis/" },
  { name: "John Grigoriadis", roleKey: "web_dev", linkedin: "https://www.linkedin.com/in/γιάννης-γρηγοριάδης" },
  { name: "Tzeortziana Komoritsan", roleKey: "web_dev", linkedin: "https://www.linkedin.com/in/entisa-tzeortziana-komoritsan-887467374" },
  { name: "Eleni Manassaki", roleKey: "web_dev", linkedin: "https://www.linkedin.com/in/eleni-manassaki" },
  { name: "Christina Papachristoudi", roleKey: "web_dev", linkedin: "https://www.linkedin.com/in/christina-papachristoudi/" },
  { name: "Spyros Siachamis", roleKey: "web_dev", linkedin: "https://www.linkedin.com/in/spyridon-siachamis-578793290" },
  // Game Dev Team
  { name: "Mihalis Karapiperakis", roleKey: "game_dev", linkedin: "https://www.linkedin.com/in/mihalis-karapiperakis/" },
  // Social (alphabetical by surname)
  { name: "Anastasia Samara", roleKey: "social" },
  { name: "Argyro Sxoinaraki", roleKey: "social" },
  // Content (alphabetical by surname)
  { name: "Dimitris Aspetakis", roleKey: "text", staticRole: "Faculty Advisor", linkedin: "https://www.linkedin.com/in/aspe/" },
  // Communications (alphabetical by surname)
  { name: "Manos Akoumianakis", roleKey: "communication", linkedin: "https://www.linkedin.com/in/akoumianakism/" },
  { name: "Nikos Chronis", roleKey: "communication", linkedin: "https://www.linkedin.com/in/nikolaos-chronis-4a4773373" },
  { name: "Michalis Kouroupakis", roleKey: "communication" },
];

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

        <div className="flex flex-wrap justify-center gap-12 lg:gap-16">
          {team.map((member) => (
            <div key={member.name} className="group flex flex-col items-center w-48">
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white rounded-full flex items-center justify-center border-4 border-slate-50 shadow-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                  <span className="text-slate-400 font-bold text-5xl group-hover:text-blue-600 transition-colors">
                    {member.name[0]}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                  {member.name}
                </h4>
                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">
                  {t(`team-members.roles.${member.roleKey}`)}
                  {member.secondRoleKey && (
                    <><br />{t(`team-members.roles.${member.secondRoleKey}`)}</>
                  )}
                  {member.staticRole && (
                    <><br />{member.staticRole}</>
                  )}
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

      </div>
    </section>
  );
}
