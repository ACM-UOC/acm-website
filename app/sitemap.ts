import { MetadataRoute } from 'next';

const BASE_URL = 'https://uoc.acm.org';

// With localePrefix: 'as-needed', English has no prefix, Greek gets /gr/
const localePrefix = (locale: string) => locale === 'en' ? '' : `/${locale}`;

const pages = ['', '/about', '/teams', '/events'];

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    for (const page of pages) {
        const enUrl = `${BASE_URL}${page}`;
        const grUrl = `${BASE_URL}/gr${page}`;

        entries.push({
            url: enUrl,
            lastModified: new Date(),
            changeFrequency: page === '' ? 'weekly' : 'monthly',
            priority: page === '' ? 1.0 : 0.8,
            alternates: {
                languages: {
                    en: enUrl,
                    el: grUrl,
                },
            },
        });

        entries.push({
            url: grUrl,
            lastModified: new Date(),
            changeFrequency: page === '' ? 'weekly' : 'monthly',
            priority: page === '' ? 1.0 : 0.8,
            alternates: {
                languages: {
                    en: enUrl,
                    el: grUrl,
                },
            },
        });
    }

    return entries;
}
