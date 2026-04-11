import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function Footer() {
  const t = await getTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-slate-950 text-white pt-12 pb-8 border-t border-slate-900">
      <div className="max-w-[95%] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-6">
            <Link href="#home" className="inline-flex items-center space-x-3 group cursor-pointer">
              <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[5deg] relative">
                <Image
                  src="/logo.png"
                  alt="ACM UOC Logo"
                  width={48}
                  height={48}
                  className="object-contain drop-shadow-sm"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-black text-2xl tracking-tighter leading-none text-white group-hover:text-blue-500 transition-colors">
                  ACM <span className="text-blue-500 italic">UOC</span>
                </span>
                <span className="text-[9px] font-mono font-bold text-slate-400 tracking-[0.2em] uppercase mt-1 group-hover:text-slate-300 transition-colors">
                  Student Chapter
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light italic">
              &ldquo;{t('footer.description')}&rdquo;
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5 text-slate-100">
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-3 text-slate-400 text-base font-medium">
              <li><Link href="/teams" className="hover:text-blue-500 transition-colors">{t('nav.team')}</Link></li>
              <li><Link href="/events" className="hover:text-blue-500 transition-colors">{t('nav.events')}</Link></li>
              <li><Link href="/about" className="hover:text-blue-500 transition-colors">{t('nav.about')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5 text-slate-100">{t('footer.connect')}</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/acmuoc/" aria-label="ACM UOC on Instagram" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all group shadow-md">
                <svg className="w-6 h-6 fill-slate-400 group-hover:fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-5 text-slate-100">{t('footer.contact_us')}</h3>
            <a href="mailto:acmuoc@csd.uoc.gr" className="text-blue-400 text-lg font-bold hover:text-blue-300 transition-colors">
              acmuoc@csd.uoc.gr
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {currentYear} ACM Student Chapter UOC. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-5 group cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-500 transition-colors">
                {t('footer.university')}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">{t('footer.department')}</p>
            </div>
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Image
                src="/uoclogo.png"
                alt="University of Crete Seal"
                width={56}
                height={56}
                className="relative object-contain opacity-80 brightness-200 grayscale group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
