import { createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Locale, defaultLocale, getLocaleMessages } from '../locales';

interface TranslationContextType {
    locale: Locale;
    t: (key: string, params?: Record<string, string | number>) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    
    const locale = (router.locale as Locale) || defaultLocale;
    
    const t = (key: string, params?: Record<string, string | number>): string => {
        const messages = getLocaleMessages(locale);
        const keys = key.split('.');
        let value: any = messages;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                const defaultMessages = getLocaleMessages(defaultLocale);
                value = defaultMessages;
                for (const k2 of keys) {
                    if (value && typeof value === 'object' && k2 in value) {
                        value = value[k2];
                    } else {
                        return key;
                    }
                }
                break;
            }
        }

        if (typeof value === 'string') {
            if (params) {
                return value.replace(/\{(\w+)\}/g, (match, param) => {
                    return params[param]?.toString() || match;
                });
            }
            return value;
        }

        return key;
    };

    return (
        <TranslationContext.Provider value={{ locale, t }}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
}