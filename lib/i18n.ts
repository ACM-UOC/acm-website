// lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';


import enTranslation from '../public/locales/en/common.json';
import grTranslation from '../public/locales/gr/common.json';

i18n
  .use(LanguageDetector) // browser language detector
  .use(initReactI18next) 
  .init({
    resources: {
      en: { common: enTranslation },
      gr: { common: grTranslation }
    },
    fallbackLng: 'en',
    ns: ['common'], // Namespace
    defaultNS: 'common',
    debug: false, 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;