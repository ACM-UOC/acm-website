import { MetadataRoute } from 'next';
import { getAbsoluteUrl, getLanguageAlternates } from '@/lib/site';

const pages = ['', '/about', '/teams', '/events'];

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [];

    for (const page of pages) {
        const enUrl = getAbsoluteUrl('en', page);
        const grUrl = getAbsoluteUrl('el', page);

        entries.push({
            url: enUrl,
            lastModified: new Date(),
            changeFrequency: page === '' ? 'weekly' : 'monthly',
            priority: page === '' ? 1.0 : 0.8,
            alternates: {
                languages: getLanguageAlternates(page),
            },
        });

        entries.push({
            url: grUrl,
            lastModified: new Date(),
            changeFrequency: page === '' ? 'weekly' : 'monthly',
            priority: page === '' ? 1.0 : 0.8,
            alternates: {
                languages: getLanguageAlternates(page),
            },
        });
    }

    return entries;
}
