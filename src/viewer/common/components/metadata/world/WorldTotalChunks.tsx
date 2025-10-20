import React from 'react';
import { WorldStatistics_World } from '../../../../proto/spark_pb';
import { useTranslation } from '../../../../../hooks/useTranslation';

export interface WorldTotalChunksProps {
    worldsInput: WorldStatistics_World[];
}

export default function WorldTotalChunks({ worldsInput }: WorldTotalChunksProps) {
    const { t } = useTranslation();
    
    const totalChunks = worldsInput.reduce(
        (acc, world) => acc + world.regions.reduce(
            (regionAcc, region) => regionAcc + region.chunks.length,
            0
        ),
        0
    );

    return (
        <div>
            <b>{t('sampler.worldStatistics.chunksTotal')}</b>: {totalChunks.toLocaleString()}
        </div>
    );
}
