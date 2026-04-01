import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
    output: 'standalone',
    turbopack: {
        root: __dirname,
    },
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'i.pravatar.cc' },
            { protocol: 'https', hostname: 'www.gstatic.com' },
            { protocol: 'https', hostname: 'upload.wikimedia.org' },
        ],
    },
};

export default withNextIntl(nextConfig);
