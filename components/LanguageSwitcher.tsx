"use client";
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleLanguageChange = (newLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });
    };

    return (
        <div className={`flex items-center ml-4 border-l border-slate-200 pl-4 gap-1 ${isPending ? 'opacity-50' : ''}`}>
            <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                aria-label="Switch to English"
                aria-pressed={locale === 'en'}
                className={`cursor-pointer min-h-11 min-w-11 rounded-full text-[14px] font-bold transition-colors px-3 py-2 ${locale === 'en' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
            >
                EN
            </button>
            <button
                type="button"
                onClick={() => handleLanguageChange('el')}
                aria-label="Switch to Greek"
                aria-pressed={locale === 'el'}
                className={`cursor-pointer min-h-11 min-w-11 rounded-full text-[14px] font-bold transition-colors px-3 py-2 ${locale === 'el' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
            >
                GR
            </button>
        </div>
    );
}
