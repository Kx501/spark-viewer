import {
    faBackwardStep,
    faForwardStep,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useState } from 'react';
import { useTranslation } from '../../../../../hooks/useTranslation';
import {
    WorldStatistics_Region,
    WorldStatistics_World,
} from '../../../../proto/spark_pb';
import ChunkCountsList from './ChunkCountsList';
import EntityCountsList from './EntityCountsList';

interface Region extends WorldStatistics_Region {
    world: string;
}

export interface WorldRegionSummaryProps {
    worlds: WorldStatistics_World[];
}

export default function WorldRegionSummary({
    worlds,
}: WorldRegionSummaryProps) {
    const { t } = useTranslation();
    const regions = useMemo(() => {
        const regions: Region[] = [];
        for (const world of worlds) {
            for (const worldRegion of world.regions) {
                const region: Region = { ...worldRegion, world: world.name };
                region.chunks.sort((a, b) => b.totalEntities - a.totalEntities);
                regions.push(region);
            }
        }
        regions.sort((a, b) => b.totalEntities - a.totalEntities);
        return regions;
    }, [worlds]);

    const [regionIdx, setRegionIdx] = useState(0);

    const region = useMemo(() => regions[regionIdx], [regions, regionIdx]);

    const combinedEntities = useMemo(() => {
        const combinedEntities: Record<string, number> = {};
        for (const chunk of region.chunks) {
            for (const [name, count] of Object.entries(chunk.entityCounts)) {
                if (!combinedEntities[name]) {
                    combinedEntities[name] = 0;
                }
                combinedEntities[name] += count;
            }
        }
        return combinedEntities;
    }, [region]);

    function previous() {
        setRegionIdx(prev => (prev - 1 + regions.length) % regions.length);
    }

    function next() {
        setRegionIdx(prev => (prev + 1) % regions.length);
    }

    return (
        <div className="region-view">
            <div className="header region-selector">
                <div className="button" onClick={previous} title={t('button.previous')}>
                    <FontAwesomeIcon icon={faBackwardStep} />
                </div>
                <span>
                    {t('sampler.worldStatistics.regionOf', { number: regionIdx + 1, total: regions.length })}
                </span>
                <div className="button" onClick={next} title={t('button.next')}>
                    <FontAwesomeIcon icon={faForwardStep} />
                </div>
            </div>
            <div className="detail-lists">
                <div>
                    <p>
                        <b>{t('sampler.worldStatistics.entities')}</b> (<span>{region.totalEntities}</span>):
                    </p>
                    <EntityCountsList entityCounts={combinedEntities} />
                </div>
                <div>
                    <p>
                        <b>{t('sampler.worldStatistics.world')}</b>: {region.world}
                    </p>
                    <br />
                    <p>
                        <b>{t('sampler.worldStatistics.chunks')}</b> (<span>{region.chunks.length}</span>):
                    </p>
                    <ChunkCountsList chunks={region.chunks} />
                </div>
            </div>
        </div>
    );
}
