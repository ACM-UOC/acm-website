import { getTranslations } from 'next-intl/server';

interface TeamMember {
  name: string;
  roleKey: string;
  secondRoleKey?: string;
  staticRole?: string;
  linkedin?: string;
}

var team: TeamMember[] = [];

const TeamMemberId: number[] = [];

async function TeamParser() {
  // TODO: here have a while function up until you get a 400 meaning there is no more pages
  let page = 1;
  let allMembers: any[] = [];
  
  console.log("Team Parser has been called");
  
  while (true) {
    const data_url=`https://data.uoc.acm.org/wp-json/wp/v2/members?acf_format=standard&_fields=id,acf&per_page=100&page=${page}`
    const res = await fetch(data_url);

    if(!res.ok || res.status === 400) {
      console.log(`found the last page ${page}`);
      break;
    }

    const data = await res.json();
    
    if (data.length === 0) break;

    allMembers = allMembers.concat(data);
    console.log(data);

    page++;
  }

  const teamFetched: TeamMember[] = [];

  allMembers.forEach((member) => {
    if (member.id in TeamMemberId) return;
    
    const firstname = member.acf.firstname_en;
    const lastname = member.acf.lastname_en;
    const role1 = member.acf.role[0];
    // FIXME: to only be applied if defined
    const role2 = member.acf.role[1] || '';

    console.log(role1);
    console.log(role2);

    console.log(`NAME: ${firstname} ${lastname}`);

    // MAYBE: just check with ids in order to see if any new additions have occurred and only then pull?
    // or just reload site, is just easier
    teamFetched.push({
      name: `${firstname} ${lastname}`,
      roleKey: `${role1}`,
      secondRoleKey: `${role2}`,
      linkedin: `${member.acf.link_linkedin}`
    });

  });

  return teamFetched;
}

export default async function Team() {
  const t = await getTranslations();
  team = await TeamParser();

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
                <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-bold text-[10px] uppercase tracking-widest">
                  {!member.staticRole && t(`team-members.roles.${member.roleKey}`)}
                  {member.secondRoleKey && (
                    <><br />{t(`team-members.roles.${member.secondRoleKey}`)}</>
                  )}
                  {member.staticRole && member.staticRole}
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
