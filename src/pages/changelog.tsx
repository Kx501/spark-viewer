import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import TextBox from '../components/TextBox';
import { env } from '../env';
import useFetchResult, { Status } from '../hooks/useFetchResult';
import styles from '../style/changelog.module.scss';
import { useTranslation } from '../hooks/useTranslation';

dayjs.extend(relativeTime);

export interface ChangelogData {
    changelog?: ChangelogEntry[];
}

export interface ChangelogEntry {
    version: string;
    timestamp: number;
    title: string;
    commit: string;
}

export default function Changelog() {
    const { t } = useTranslation();
    const [info, status] = useFetchResult<ChangelogData>(
        `${env.NEXT_PUBLIC_SPARK_API_URL}/changelog`
    );

    let content;
    if (status !== Status.ERROR) {
        content = <ChangelogPage info={info} />;
    } else {
        content = <TextBox>{t('changelog.error.getChangelog')}</TextBox>;
    }

    return (
        <article className={styles.changelog}>
            <h1>{t('changelog.title')}</h1>
            {content}
        </article>
    );
}

const ChangelogPage = ({ info }: { info?: ChangelogData }) => {
    const { t } = useTranslation();
    const changelog = info?.changelog || [];
    return (
        <>
            <p>
                {t('changelog.description')}{' '}
                <a href="https://github.com/lucko/spark">
                    {t('changelog.gitRepository')}
                </a>
                .
            </p>
            <p>
                {t('changelog.goTo')} <Link href={'download'}>{t('changelog.downloadsPage')}</Link> {t('changelog.getLatestVersion')}
            </p>
            <br />
            <ChangelogList entries={changelog} />
        </>
    );
};

export const ChangelogList = ({ entries }: { entries: ChangelogEntry[] }) => {
    return (
        <ul>
            {entries.map((entry, i) => (
                <ChangelogItem key={i} entry={entry} />
            ))}
        </ul>
    );
};

const ChangelogItem = ({ entry }: { entry: ChangelogEntry }) => {
    return (
        <li>
            <span>
                <a
                    href={`https://github.com/lucko/spark/commit/${entry.commit}`}
                >
                    <code>{entry.version}</code>
                </a>
                <span className="title">{entry.title}</span>
            </span>
            <span
                className="time"
                title={new Date(entry.timestamp * 1000).toString()}
            >
                {dayjs(entry.timestamp * 1000).fromNow()}
            </span>
        </li>
    );
};
