import {
    PlatformStatistics_Gc,
    PlatformStatistics_Memory,
    PlatformStatistics_Memory_MemoryUsage,
} from '../../../proto/spark_pb';
import { formatBytes } from '../../util/format';
import { WidgetFormat } from '../widgets/format';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface MemoryStatisticsProps {
    memory: PlatformStatistics_Memory;
    gc: Record<string, PlatformStatistics_Gc>;
}

export default function MemoryStatistics({
    memory,
    gc,
}: MemoryStatisticsProps) {
    const { t } = useTranslation();
    
    return (
        <>
            <h2>{t('sampler.memoryStatistics.memoryAreas')}</h2>
            <div className="memory">
                {memory.heap && <MemoryPool name={t('sampler.memoryStatistics.heap')} usage={memory.heap} />}
                {memory.nonHeap && (
                    <MemoryPool name={t('sampler.memoryStatistics.nonHeap')} usage={memory.nonHeap} />
                )}
                {(memory.pools || [])
                    .filter(pool => pool.usage)
                    .map(pool => {
                        return (
                            <MemoryPool
                                key={pool.name}
                                name={t('sampler.memoryStatistics.heapPrefix') + pool.name}
                                usage={pool.usage!}
                                collectionUsage={pool.collectionUsage}
                            />
                        );
                    })}
            </div>
        </>
    );
}

interface MemoryPoolProps {
    name: string;
    usage: PlatformStatistics_Memory_MemoryUsage;
    collectionUsage?: PlatformStatistics_Memory_MemoryUsage;
}

const MemoryPool = ({ name, usage, collectionUsage }: MemoryPoolProps) => {
    const { t } = useTranslation();
    
    return (
        <div className="memory-pool">
            <div className="header">{name}</div>
            <MemoryUsageBar {...usage} />
            {collectionUsage && (
                <div>
                    <br />
                    <div className="header">{name}{t('sampler.memoryStatistics.atLastGC')}</div>
                    <MemoryUsageBar {...collectionUsage} />
                </div>
            )}
        </div>
    );
};

const MemoryUsageBar = ({
    used,
    committed,
    max,
}: PlatformStatistics_Memory_MemoryUsage) => {
    const { t } = useTranslation();
    
    let percent;
    if (max && max > 0) {
        percent = used / max;
    } else {
        percent = used / committed;
    }

    let color;
    if (percent > 0.9) {
        color = WidgetFormat.colors.red;
    } else if (percent > 0.65) {
        color = WidgetFormat.colors.yellow;
    } else {
        color = WidgetFormat.colors.green;
    }

    return (
        <>
            <div className="usage-bar">
                <div
                    style={{
                        width: `${Math.ceil(percent * 100)}%`,
                        backgroundColor: color,
                    }}
                />
            </div>
            <ul>
                <li>
                    {t('sampler.memoryStatistics.used')}: <span>{formatBytes(used)}</span>
                </li>
                <li>
                    {t('sampler.memoryStatistics.committed')}: <span>{formatBytes(committed)}</span>
                </li>
                {max !== -1 && max !== committed && (
                    <li>
                        {t('sampler.memoryStatistics.max')}: <span>{formatBytes(max)}</span>
                    </li>
                )}
            </ul>
        </>
    );
};
