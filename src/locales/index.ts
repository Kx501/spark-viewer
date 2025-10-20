export const locales = {
    'zh-CN': '简体中文',
    'en-US': 'English'
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'zh-CN';

export const getLocaleMessages = (locale: Locale) => {
    switch (locale) {
        case 'zh-CN':
            return require('./zh-CN.json');
        case 'en-US':
            return require('./en-US.json');
        default:
            return require('./zh-CN.json');
    }
};