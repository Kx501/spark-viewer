import { faPlug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import bukkitLogo from '../assets/logos/bukkit.png';
import bungeeCordLogo from '../assets/logos/bungeecord.png';
import fabricLogo from '../assets/logos/fabric.png';
import forgeLogo from '../assets/logos/forge.png';
import neoForgeLogo from '../assets/logos/neoforge.png';
import spongeLogo from '../assets/logos/sponge.png';
import velocityLogo from '../assets/logos/velocity.png';
import TextBox from '../components/TextBox';
import { env } from '../env';
import useFetchResult, { Status } from '../hooks/useFetchResult';
import changelogStyles from '../style/changelog.module.scss';
import styles from '../style/downloads.module.scss';
import { ChangelogData, ChangelogEntry, ChangelogList } from './changelog';
import { useTranslation } from '../hooks/useTranslation';

interface JenkinsInfo {
    artifacts: JenkinsArtifact[];
    timestamp: number;
    url: string;
}

interface JenkinsArtifact {
    fileName: string;
    relativePath: string;
}

interface OldVersion {
    modloader: string;
    curseGameVersionTypeId: number;
    logo: StaticImageData;
    versions: string[];
}

const OLD_VERSIONS: OldVersion[] = [
    {
        modloader: 'Fabric',
        curseGameVersionTypeId: 4,
        logo: fabricLogo,
        versions: [
            '1.21.1',
            '1.21',
            '1.20.6',
            '1.20.4',
            '1.19.4',
            '1.18.2',
            '1.17.1',
            '1.16.5',
            '1.15.2',
        ],
    },
    {
        modloader: 'Forge',
        curseGameVersionTypeId: 1,
        logo: forgeLogo,
        versions: [
            '1.21.1',
            '1.21',
            '1.20.6',
            '1.20.4',
            '1.19.4',
            '1.18.2',
            '1.17.1',
            '1.16.5',
            '1.15.2',
            '1.12.2',
            '1.7.10',
        ],
    },
    {
        modloader: 'NeoForge',
        curseGameVersionTypeId: 6,
        logo: neoForgeLogo,
        versions: ['1.21.1', '1.21', '1.20.6', '1.20.4'],
    },
];

export default function Download() {
    const { t } = useTranslation();
    const [info, status] = useFetchResult<JenkinsInfo>(
        `https://ci.lucko.me/job/spark/lastSuccessfulBuild/api/json?tree=url,timestamp,artifacts[fileName,relativePath]`
    );

    const [changelog] = useFetchResult<ChangelogData>(
        `${env.NEXT_PUBLIC_SPARK_API_URL}/changelog`
    );

    let content;
    if (status !== Status.ERROR) {
        content = <DownloadPage info={info} changelog={changelog} />;
    } else {
        content = <TextBox>{t('downloads.error.versionInfo')}</TextBox>;
    }

    return (
        <article className={styles.downloads}>
            <h1>{t('downloads.title')}</h1>
            {content}
        </article>
    );
}

interface ArtifactsMap {
    [key: string]: {
        fileName: string;
        url: string;
    };
}

const processJenkinsInfo = (
    info: JenkinsInfo | undefined
): [string, string, ArtifactsMap] => {
    const artifacts: ArtifactsMap = {};
    let version = 'unknown';
    const timestamp = info
        ? new Date(info?.timestamp).toLocaleString()
        : 'unknown';
    for (const { fileName, relativePath } of info?.artifacts || []) {
        const [v, platform] = fileName.slice(0, -4).split('-').slice(1);
        version = v;
        artifacts[platform] = {
            fileName,
            url: info!.url + 'artifact/' + relativePath,
        };
    }
    return [version, timestamp, artifacts];
};

const DownloadPage = ({
    info,
    changelog,
}: {
    info?: JenkinsInfo;
    changelog?: ChangelogData;
}) => {
    const { t } = useTranslation();
    const [version, timestamp, artifacts] = processJenkinsInfo(info);
    const changelogSlice = changelog?.changelog?.slice(0, 5) || [];

    return (
        <>
            <p>
                {t('downloads.latestVersion')}{' '}
                <span className="version-number">v{version}</span>{t('downloads.createdAt')}{timestamp}.
            </p>
            <br />

            <DownloadButtons artifacts={artifacts} />

            <br />
            <p>
                {t('downloads.afterInstall')}{' '}
                <a href={`${env.NEXT_PUBLIC_SPARK_BASE_URL}/docs`}>
                    {t('downloads.documentation')}
                </a>{' '}
                {t('downloads.learnHowToUse')}
            </p>
            <p className="caveat">
                {t('downloads.notePaperBundled')}
            </p>

            <h2>{t('downloads.recentChanges')}</h2>
            <RecentChangelog changelog={changelogSlice} />

            <h2>{t('downloads.otherPlatforms')}</h2>
            <p>
                {t('downloads.otherPlatformsDesc')}
            </p>
            <p>
                {t('downloads.forMoreInfo')}{' '}
                <a href="https://github.com/lucko/spark-extra-platforms">
                    spark-extra-platforms
                </a>{' '}
                {t('downloads.onGitHub')}{' '}
                <a href="https://ci.lucko.me/job/spark-extra-platforms/">
                    Jenkins
                </a>
                .
            </p>

            <h2>{t('downloads.olderVersions')}</h2>
            <p>
                {t('downloads.olderVersionsDesc')}
            </p>
            <OlderVersionsList versions={OLD_VERSIONS} />
            <p>{t('downloads.noteCurseForgeLinks')}</p>
        </>
    );
};

const RecentChangelog = ({ changelog }: { changelog: ChangelogEntry[] }) => {
    const { t } = useTranslation();
    if (changelog.length === 0) {
        return <p>{t('common.loading')}</p>;
    }

    return (
        <div className={changelogStyles.changelog}>
            <ChangelogList entries={changelog} />
            <p>
                {t('downloads.andMore')} <Link href={'changelog'}>{t('downloads.fullChangelog')}</Link>
                .
            </p>
        </div>
    );
};

const DownloadButtons = ({ artifacts }: { artifacts: ArtifactsMap }) => {
    return (
        <div className="download-buttons">
            <DownloadInfo
                artifacts={artifacts}
                name="Bukkit"
                comment="Paper/Spigot"
                artifact="bukkit"
                logo={bukkitLogo}
            />
            <DownloadInfo
                artifacts={artifacts}
                name="BungeeCord"
                artifact="bungeecord"
                logo={bungeeCordLogo}
            />
            <DownloadInfo
                artifacts={artifacts}
                name="Velocity"
                artifact="velocity"
                logo={velocityLogo}
            />
            <DownloadInfo
                artifacts={artifacts}
                name="Fabric"
                comment="MC 1.21.10"
                artifact="fabric"
                logo={fabricLogo}
            />
            <DownloadInfo
                artifacts={artifacts}
                name="NeoForge"
                comment="MC 1.21.10"
                artifact="neoforge"
                logo={neoForgeLogo}
            />
            <DownloadInfo
                artifacts={artifacts}
                name="Forge"
                comment="MC 1.21.10"
                artifact="forge"
                logo={forgeLogo}
            />
            <DownloadInfo
                artifacts={artifacts}
                name="Sponge"
                comment="API 12"
                artifact="sponge"
                logo={spongeLogo}
            />
            <DownloadInfo
                artifacts={artifacts}
                name="Standalone"
                comment="Java Agent"
                artifact="standalone"
                icon={<FontAwesomeIcon fixedWidth={true} icon={faPlug} />}
            />
        </div>
    );
};

interface DownloadInfoProps {
    artifacts: ArtifactsMap;
    name: string;
    comment?: string;
    artifact: string;
    logo?: StaticImageData;
    icon?: ReactNode;
}

const DownloadInfo = ({
    artifacts,
    name,
    comment,
    artifact,
    logo,
    icon,
}: DownloadInfoProps) => {
    const { url } = Object.keys(artifacts).length
        ? artifacts[artifact]
        : { url: '#' };

    return (
        <a className="link" href={url}>
            {logo && (
                <Image
                    src={logo}
                    style={{ objectFit: 'contain' }}
                    width={50}
                    height={50}
                    alt={name + ' logo'}
                />
            )}
            {icon}
            <div className="link-title">
                <div className="link-name">
                    <h3>{name}</h3>
                    {comment && <span> ({comment})</span>}
                </div>
            </div>
        </a>
    );
};

const OlderVersionsList = ({ versions }: { versions: OldVersion[] }) => {
    return (
        <div className="older-versions">
            {versions.map(oldVersion => {
                const getUrl = (version: string) => {
                    return `https://www.curseforge.com/minecraft/mc-mods/spark/files?gameVersionTypeId=${oldVersion.curseGameVersionTypeId}&version=${version}&showAlphaFiles=show`;
                };

                return (
                    <div key={oldVersion.modloader}>
                        <h3>
                            <Image
                                src={oldVersion.logo}
                                style={{
                                    objectFit: 'contain',
                                    verticalAlign: 'middle',
                                }}
                                width={40}
                                height={40}
                                alt={oldVersion.modloader + ' logo'}
                            />{' '}
                            {oldVersion.modloader}
                        </h3>
                        <hr />
                        <ul>
                            {oldVersion.versions.map(version => (
                                <li key={version}>
                                    <a
                                        href={getUrl(version)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {version}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};
