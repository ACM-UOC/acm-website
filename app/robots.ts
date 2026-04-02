import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: 'https://csd.acm.org/sitemap.xml',
        host: 'https://csd.acm.org',
    };
}
