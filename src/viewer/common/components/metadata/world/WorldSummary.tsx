import React from 'react';
import { WorldStatistics as WorldStatisticsProto } from '../../../../proto/spark_pb';
import EntityCountsList from './EntityCountsList';
import WorldTotalChunks from './WorldTotalChunks';
import WorldTotalEntities from './WorldTotalEntities';
import { useTranslation } from '../../../../../hooks/useTranslation';

export interface WorldSummaryProps {
    worldStatistics: WorldStatisticsProto;
}

export default function WorldSummary({ worldStatistics }: WorldSummaryProps) {
    const { t } = useTranslation();
    
    return (
        <div>
            <div className="header">{t('sampler.worldStatistics.summary')}</div>
            <div className="detail-lists">
                <div>
                    <WorldTotalEntities
                        totalEntities={worldStatistics.totalEntities}
                        worlds={worldStatistics.worlds}
                    />
                    <WorldTotalChunks worldsInput={worldStatistics.worlds} />
                </div>
                <div>
                    <p>
                        <b>{t('sampler.worldStatistics.entityCounts')}</b>:
                    </p>
                    <EntityCountsList
                        entityCounts={worldStatistics.entityCounts}
                    />
                </div>
            </div>
        </div>
    );
}
