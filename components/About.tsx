import { getTranslations } from 'next-intl/server';

const pillars = [
  {
    id: "chapter",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011-1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: "history",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: "events",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  }
];

export default async function About() {
  const t = await getTranslations();

  return (
    <section id="about" className="py-24 bg-white scroll-mt-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-50 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="text-center mb-20">
          <p className="text-blue-600 font-mono tracking-[0.4em] uppercase text-xs mb-3 font-bold">
            {t('about.badge')}
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">
            {t('about.title')}
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-8 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed italic">
            &ldquo;{t('about.description')}&rdquo;
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative p-10 bg-white rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-500"></div>
              <div className="relative z-10">
                <div className="text-blue-600 mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                  {t(`about.pillars.${pillar.id}.title`)}
                </h3>
                <div className="w-8 h-1 bg-blue-600 mb-6 group-hover:w-16 transition-all duration-500 rounded-full"></div>
                <p className="text-slate-500 leading-relaxed font-light text-sm italic">
                  &ldquo;{t(`about.pillars.${pillar.id}.desc`)}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
