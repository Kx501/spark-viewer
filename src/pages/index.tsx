import FilePicker from '../components/FilePicker';

import NextLink from 'next/link';

import {
    faArrowCircleDown,
    faBook,
    faHeartbeat,
    faMemory,
    faMicrochip,
    faLanguage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { ReactNode, useContext } from 'react';
import { HomepageHeader } from '../components/Header';
import SparkLayout from '../components/SparkLayout';
import { NextPageWithLayout, SelectedFileContext } from './_app';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { env } from '../env';
import styles from '../style/homepage.module.scss';
import { useTranslation } from '../hooks/useTranslation';

const Index: NextPageWithLayout = () => {
    const { setSelectedFile } = useContext(SelectedFileContext);
    const router = useRouter();
    const { t } = useTranslation();

    function onFileSelected(file: File) {
        setSelectedFile(file);
        router.push('/_');
    }

    return (
        <article className={styles.homepage}>
            <Navigation />
            <AboutSection />
            <ViewerSection onFileSelected={onFileSelected} />
        </article>
    );
};

const Navigation = () => {
    const { t } = useTranslation();
    
    return (
        <nav>
            <Link title={t('homepage.navigation.downloads.title')} icon={faArrowCircleDown} url="download">
                {t('homepage.navigation.downloads.description')}
            </Link>
            <Link title={t('homepage.navigation.docs.title')} icon={faBook} url="docs">
                {t('homepage.navigation.docs.description')}
            </Link>
        </nav>
    );
};

interface LinkProps {
    title: string;
    icon: IconProp;
    url: string;
    children: ReactNode;
}

const Link = ({ title, icon, url, children }: LinkProps) => {
    return (
        <NextLink href={url} className="link">
            <div className="link-title">
                <FontAwesomeIcon icon={icon} fixedWidth />
                <h3>{title}</h3>
            </div>
            <div className="link-description">{children}</div>
        </NextLink>
    );
};

const AboutSection = () => {
    const { t } = useTranslation();
    
    return (
        <section>
            <h2>{t('homepage.about.title')}</h2>
            <p>{t('homepage.about.description')}</p>
            <AboutFeature title={t('homepage.about.profiler.title')} icon={faMicrochip}>
                {t('homepage.about.profiler.description')}
            </AboutFeature>
            <AboutFeature title={t('homepage.about.memory.title')} icon={faMemory}>
                {t('homepage.about.memory.description')}
            </AboutFeature>
            <AboutFeature title={t('homepage.about.health.title')} icon={faHeartbeat}>
                {t('homepage.about.health.description')}
            </AboutFeature>

            <p>
                {t('homepage.about.moreInfo', {
                    github: 'GitHub',
                    discord: 'Discord'
                })}
                {' '}
                <a href="https://github.com/lucko/spark">GitHub</a>
                {' '}
                {t('common.and')}
                {' '}
                <a href="https://discord.gg/PAGT2fu">Discord</a>
            </p>
        </section>
    );
};

interface AboutFeatureProps {
    title: string;
    icon: IconProp;
    children: ReactNode;
}

const AboutFeature = ({ title, icon, children }: AboutFeatureProps) => {
    return (
        <div className="feature">
            <FontAwesomeIcon icon={icon} fixedWidth />
            <div>
                <h3>{title}</h3>
                {children}
            </div>
        </div>
    );
};

const ViewerSection = ({
    onFileSelected,
}: {
    onFileSelected: (file: File) => void;
}) => {
    const { t } = useTranslation();
    
    return (
        <section>
            <h2>{t('homepage.viewer.title')}</h2>
            <p>{t('homepage.viewer.description')}</p>
            <p>{t('homepage.viewer.usageSteps.title')}</p>
            <ol>
                <li>
                    {t('homepage.viewer.usageSteps.step1', {
                        profileLink: t('common.profile'),
                        heapLink: t('common.heap')
                    })}
                    {' '}
                    <a
                        href={`${env.NEXT_PUBLIC_SPARK_BASE_URL}/docs/Command-Usage#spark-profiler`}
                    >
                        {t('common.profile')}
                    </a>
                    {' '}
                    {t('common.and')}
                    {' '}
                    <a
                        href={`${env.NEXT_PUBLIC_SPARK_BASE_URL}/docs/Command-Usage#spark-heapsummary`}
                    >
                        {t('common.heap')}
                    </a>
                </li>
                <li>
                    {t('homepage.viewer.usageSteps.step2')}
                </li>
            </ol>
            <p>
                {t('homepage.viewer.fileUpload')}
            </p>
            <FilePicker callback={onFileSelected} />
            <p>
                {t('homepage.viewer.techInfo')}
            </p>
        </section>
    );
};

Index.getLayout = page => (
    <SparkLayout header={<HomepageHeader />}>{page}</SparkLayout>
);

export default Index;
