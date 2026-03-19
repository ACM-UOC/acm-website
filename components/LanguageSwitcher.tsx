"use client";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation('common');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLanguageChange = (e: React.MouseEvent, lng: string) => {
        e.preventDefault(); 
        i18n.changeLanguage(lng);
    };

    if (!mounted) {
        return (
            <div className="flex items-center ml-4 border-l border-slate-200 pl-4 space-x-2">
                <button type="button" className="text-xs font-bold text-slate-400">EN</button>
                <button type="button" className="text-xs font-bold text-slate-400">GR</button>
            </div>
        );
    }

    return (
        <div className="flex items-center ml-4 border-l border-slate-200 pl-4 space-x-2">
            <button
                type="button"
                onClick={(e) => handleLanguageChange(e, 'en')}
                className={`text-xs font-bold transition-colors ${i18n.language === 'en' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
                EN
            </button>
            <button
                type="button"
                onClick={(e) => handleLanguageChange(e, 'gr')}
                className={`text-xs font-bold transition-colors ${i18n.language === 'gr' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
                GR
            </button>
        </div>
    );
}