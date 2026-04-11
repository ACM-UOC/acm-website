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
        <div className={`flex items-center ml-4 border-l border-slate-200 pl-4 space-x-2 ${isPending ? 'opacity-50' : ''}`}>
            <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                aria-label="Switch to English"
                aria-current={locale === 'en' ? 'true' : undefined}
                className={`cursor-pointer text-[14px] font-bold transition-colors px-1 py-1 ${locale === 'en' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
                EN
            </button>
            <button
                type="button"
                onClick={() => handleLanguageChange('el')}
                aria-label="Switch to Greek"
                aria-current={locale === 'el' ? 'true' : undefined}
                className={`cursor-pointer text-[14px] font-bold transition-colors px-1 py-1 ${locale === 'el' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
                GR
            </button>
        </div>
    );
}
