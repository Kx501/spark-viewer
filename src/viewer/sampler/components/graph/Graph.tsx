import { useState } from 'react';
import { WindowStatistics } from '../../../proto/spark_pb';
import { TimeSelector } from '../../hooks/useTimeSelector';
import GraphChart from './GraphChart';
import GraphLegend from './GraphLegend';
import { ChartDataWrapper, IGNORED_KEYS, WindowStatisticsKey } from './util';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface GraphProps {
    show: boolean;
    timeSelector: TimeSelector;
    windowStatistics: Record<number, WindowStatistics>;
}

export default function Graph({
    show,
    timeSelector,
    windowStatistics,
}: GraphProps) {
    const { t } = useTranslation();
    
    // get an array of all window times
    const times = Array.from(timeSelector.times).sort();

    // decide which statistics to show
    const sampleStatistics = windowStatistics[times[0]];
    const availableStatisticKeys = (
        Object.keys(sampleStatistics) as WindowStatisticsKey[]
    ).filter(
        key =>
            !!sampleStatistics[key] &&
            sampleStatistics[key] != -1 && // only show statistics we have values for
            !IGNORED_KEYS.includes(key)
    );

    const [statisticKeys, setStatisticKeys] = useState(() => {
        let keys = availableStatisticKeys;
        if (keys.includes('msptMedian')) {
            keys = keys.filter(el => ['msptMedian', 'tps'].includes(el));
        } else if (keys.includes('tps')) {
            keys = keys.filter(el => ['cpuProcess', 'tps'].includes(el));
        } else {
            keys = keys.filter(el => ['cpuProcess', 'cpuSystem'].includes(el));
        }
        return keys;
    });

    if (!show) {
        return null;
    }

    const maxTime = Math.max(...times);
    const data: ChartDataWrapper[] = statisticKeys.map((statisticName, i) => {
        return {
            statisticName,
            data: times.map(time => ({
                i,
                unit: statisticName,
                x: time - maxTime,
                y: windowStatistics[time][statisticName],
                active: timeSelector.isTimeSelected(time),
            })),
        };
    });

    // calculate maximas so that we can normalise the data & display within the same domain/axis
    const maxima = data.map(wrapper => {
        if (['cpuProcess', 'cpuSystem'].includes(wrapper.statisticName)) {
            return 1; // 100%
        }

        const max = Math.max(...wrapper.data.map(d => d.y));
        if (wrapper.statisticName === 'tps') {
            return Math.max(max, 20);
        }
        if (wrapper.statisticName === 'msptMedian') {
            return Math.ceil(max / 10) * 10; // round up to nearest 5
        }

        const divisor = max > 1000 ? 1000 : max > 100 ? 100 : 10;
        return Math.ceil(max / divisor) * divisor; // round up to nearest 10
    });

    const scale = times.length - 1;

    return (
        <div className="graph">
            <div className="header">
                <h2>{t('graph.refine')}</h2>
                <p>{t('graph.description')}</p>
            </div>

            <GraphChart
                scale={scale}
                data={data}
                maxima={maxima}
                selectionCallback={(range: [number, number]) => {
                    timeSelector.setSelectedTimes(time => {
                        const x = time - maxTime;
                        return x >= range[0] && x <= range[1];
                    });
                }}
            />

            <GraphLegend
                availableStatisticKeys={availableStatisticKeys}
                statisticKeys={statisticKeys}
                setStatisticKeys={setStatisticKeys}
            />
        </div>
    );
}
