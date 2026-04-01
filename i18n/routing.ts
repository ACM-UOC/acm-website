import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['en', 'gr'],
    defaultLocale: 'en',
    localePrefix: 'as-needed'
});
