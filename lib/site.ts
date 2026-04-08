export const BASE_URL = 'https://uoc.acm.org';

const LOCALE_PREFIXES: Record<string, string> = {
    en: '',
    el: '/gr',
};

function normalizePagePath(path = '') {
    if (!path || path === '/') {
        return '';
    }

    return path.startsWith('/') ? path : `/${path}`;
}

export function getLocalizedPath(locale: string, path = '') {
    const localizedPath = `${LOCALE_PREFIXES[locale] ?? `/${locale}`}${normalizePagePath(path)}`;
    return localizedPath || '/';
}

export function getAbsoluteUrl(locale: string, path = '') {
    return new URL(getLocalizedPath(locale, path), BASE_URL).toString();
}

export function getLanguageAlternates(path = '') {
    return {
        en: getAbsoluteUrl('en', path),
        el: getAbsoluteUrl('el', path),
        'x-default': getAbsoluteUrl('en', path),
    };
}
