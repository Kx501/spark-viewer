import Link from 'next/link';
import SparkLogo from '../assets/spark-logo.svg';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import styles from '../style/header.module.scss';
import { useTranslation } from '../hooks/useTranslation';
import { locales, Locale } from '../locales';

export interface HeaderProps {
    title?: string;
}

export default function Header({ title = 'spark' }: HeaderProps) {
    const { t, locale } = useTranslation();
    const router = useRouter();

    const switchLanguage = (newLocale: Locale) => {
        router.push(router.pathname, router.asPath, { locale: newLocale });
    };

    return (
        <header className={styles.header}>
            <Link href="/" className="logo">
                <SparkLogo width="2.5em" height="2.5em" />
                <h1>{t('common.spark')}</h1>
            </Link>
            <div className={styles.languageSwitcher}>
                <FontAwesomeIcon icon={faLanguage} />
                <select 
                    value={locale} 
                    onChange={(e) => switchLanguage(e.target.value as Locale)}
                    className={styles.languageSelect}
                >
                    {Object.entries(locales).map(([code, name]) => (
                        <option key={code} value={code}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
        </header>
    );
}

export function HomepageHeader() {
    const { t } = useTranslation();
    
    return (
        <div className={styles['homepage-header']}>
            <div>
                <SparkLogo />
                <div>
                    <h1>{t('common.spark')}</h1>
                    <div>
                        {t('homepage.subtitle')}
                    </div>
                </div>
            </div>
        </div>
    );
}
