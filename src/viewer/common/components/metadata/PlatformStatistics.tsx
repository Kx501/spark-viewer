import {
    PlatformMetadata,
    PlatformStatistics as PlatformStatisticsProto,
    SamplerMetadata_SamplerEngine,
    SystemStatistics as SystemStatisticsProto,
} from '../../../proto/spark_pb';
import { formatDuration } from '../../util/format';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface PlatformStatisticsProps {
    platform: PlatformMetadata;
    platformStatistics: PlatformStatisticsProto;
    systemStatistics?: SystemStatisticsProto;
    platformType: string;
    onlineMode?: string;
    runningTime?: number;
    numberOfTicks?: number;
    numberOfIncludedTicks?: number;
    engine?: SamplerMetadata_SamplerEngine;
}

export default function PlatformStatistics({
    platform,
    platformStatistics,
    systemStatistics,
    platformType,
    onlineMode,
    runningTime,
    numberOfTicks,
    numberOfIncludedTicks,
    engine,
}: PlatformStatisticsProps) {
    const { t } = useTranslation();
    
    return (
        <>
            <p>
                {t('sampler.platformStatistics.platformDescription', {
                    platformType: t(`sampler.platformStatistics.${platformType === 'application' ? 'system' : 'platform'}`),
                    brand: platform.brand || platform.name,
                    spark: platform.sparkVersion ? `Spark ${platform.sparkVersion}` : 'Spark',
                    version: platform.version
                })}
            </p>
            {platform.minecraftVersion && (
                <p>
                    {t('sampler.platformStatistics.minecraftVersion', {
                        version: platform.minecraftVersion
                    })}
                </p>
            )}
            {onlineMode && (
                <p>
                    {t('sampler.platformStatistics.onlineMode', {
                        platformType: t(`sampler.platformStatistics.${platformType}`),
                        mode: onlineMode
                    })}
                </p>
            )}
            {platformStatistics?.playerCount > 0 && (
                <p>
                    {t('sampler.platformStatistics.playerCount', {
                        platformType: t(`sampler.platformStatistics.${platformType}`),
                        count: platformStatistics.playerCount
                    })}
                </p>
            )}
            {!!systemStatistics && (
                <SystemStatistics systemStatistics={systemStatistics} />
            )}
            {runningTime && (
                <p>
                    {t('sampler.platformStatistics.profilerRunning', {
                        engine: engine !== undefined ? (engine == SamplerMetadata_SamplerEngine.ASYNC
                            ? t('sampler.platformStatistics.asyncEngine')
                            : t('sampler.platformStatistics.javaEngine')) : t('sampler.platformStatistics.javaEngine'),
                        duration: formatDuration(runningTime),
                        ticks: !!numberOfTicks ? ` (${numberOfTicks} ticks)` : ''
                    })}
                    {!!numberOfIncludedTicks && (
                        <>
                            {' '}
                            {t('sampler.platformStatistics.includedTicks', {
                                count: numberOfIncludedTicks
                            })}
                        </>
                    )}
                </p>
            )}
        </>
    );
}

interface SystemStatisticsProps {
    systemStatistics: SystemStatisticsProto;
}

const SystemStatistics = ({ systemStatistics }: SystemStatisticsProps) => {
    const { t } = useTranslation();
    
    return (
        <>
            <p>
                {t('sampler.platformStatistics.systemDescription', {
                    osName: systemStatistics.os!.name,
                    arch: systemStatistics.os!.arch,
                    osVersion: systemStatistics.os!.version,
                    threads: systemStatistics.cpu!.threads
                })}
            </p>
            {systemStatistics.cpu!.modelName && (
                <p>
                    {t('sampler.platformStatistics.cpuDescription', {
                        modelName: systemStatistics.cpu!.modelName
                    })}
                </p>
            )}
            <p>
                {t('sampler.platformStatistics.javaDescription', {
                    javaVersion: systemStatistics.java!.version,
                    vendorVersion: systemStatistics.java!.vendorVersion,
                    vendor: systemStatistics.java!.vendor
                })}
                {systemStatistics.jvm?.name && (
                    <>
                        {' '}
                        {t('sampler.platformStatistics.jvmDescription', {
                            jvmName: systemStatistics.jvm?.name
                        })}
                    </>
                )}
            </p>
            <p>
                {t('sampler.platformStatistics.uptime', {
                    uptime: formatDuration(systemStatistics.uptime)
                })}
            </p>
        </>
    );
};
