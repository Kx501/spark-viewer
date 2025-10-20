import React from 'react';
import { WorldStatistics_World } from '../../../../proto/spark_pb';
import { useTranslation } from '../../../../../hooks/useTranslation';

export interface WorldTotalEntitiesProps {
    totalEntities: number;
    worlds: WorldStatistics_World[];
}

export default function WorldTotalEntities({
    totalEntities,
    worlds,
}: WorldTotalEntitiesProps) {
    const { t } = useTranslation();
    
    return (
        <div>
            <b>{t('sampler.worldStatistics.entitiesTotal')}</b>: {totalEntities.toLocaleString()}
        </div>
    );
}
