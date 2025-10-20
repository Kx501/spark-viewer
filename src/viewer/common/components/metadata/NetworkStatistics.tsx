import classNames from 'classnames';
import styles from '../../../../style/widgets.module.scss';
import {
    RollingAverageValues,
    SystemStatistics as SystemStatisticsProto,
    SystemStatistics_NetInterface,
} from '../../../proto/spark_pb';
import { formatBytes } from '../../util/format';
import { Formatter, WidgetFormat } from '../widgets/format';
import Widget from '../widgets/Widget';
import WidgetValue from '../widgets/WidgetValue';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface NetworkStatisticsProps {
    systemStatistics: SystemStatisticsProto;
}

export default function NetworkStatistics({
    systemStatistics,
}: NetworkStatisticsProps) {
    const { t } = useTranslation();
    
    return (
        <>
            <h2>{t('sampler.networkStatistics.networkInterfaces')}</h2>
            <p>
                {t('sampler.networkStatistics.systemLevelNote')}
            </p>
            <div>
                {Object.entries(systemStatistics.net).map(([name, data]) => (
                    <NetworkInterface key={name} name={name} data={data} />
                ))}
            </div>
        </>
    );
}

const NetworkInterface = ({
    name,
    data,
}: {
    name: string;
    data: SystemStatistics_NetInterface;
}) => {
    const { t } = useTranslation();
    
    return (
        <div>
            <h3>{name}</h3>
            <div
                className={classNames(
                    styles.widgets,
                    'widgets',
                    'net-interface-widgets'
                )}
            >
                <NetworkInterfaceWidget
                    direction={t('sampler.networkStatistics.transmit')}
                    format={t('sampler.networkStatistics.bytesPerSecond')}
                    values={data.txBytesPerSecond!}
                />
                <NetworkInterfaceWidget
                    direction={t('sampler.networkStatistics.receive')}
                    format={t('sampler.networkStatistics.bytesPerSecond')}
                    values={data.rxBytesPerSecond!}
                />
            </div>
            <div
                className={classNames(
                    styles.widgets,
                    'widgets',
                    'net-interface-widgets'
                )}
            >
                <NetworkInterfaceWidget
                    direction={t('sampler.networkStatistics.transmit')}
                    format={t('sampler.networkStatistics.packetsPerSecond')}
                    values={data.txPacketsPerSecond!}
                />
                <NetworkInterfaceWidget
                    direction={t('sampler.networkStatistics.receive')}
                    format={t('sampler.networkStatistics.packetsPerSecond')}
                    values={data.rxPacketsPerSecond!}
                />
            </div>
        </div>
    );
};

type Direction = string;
type StatFormat = string;

interface NetworkInterfaceWidgetProps {
    direction: Direction;
    format: StatFormat;
    values: RollingAverageValues;
}

const NetworkInterfaceWidget = ({
    direction,
    format,
    values,
}: NetworkInterfaceWidgetProps) => {
    const { t } = useTranslation();
    const formatter: Formatter = {
        color: value => {
            if (value <= 0) {
                return WidgetFormat.colors.yellow;
            }
            // TODO: set some sensible thresholds here for bytes/packets per second
            return WidgetFormat.colors.green;
        },
        format: value => {
            if (format === 'bytes/sec') {
                return formatBytes(value);
            } else {
                return value.toLocaleString('en-US', {
                    maximumSignificantDigits: 3,
                    useGrouping: false,
                });
            }
        },
    };

    return (
        <Widget title={direction} label={format} formatter={formatter}>
            <WidgetValue value={values.min} label={t('sampler.networkStatistics.min')} />
            <WidgetValue value={values.median} label={t('sampler.networkStatistics.med')} />
            <WidgetValue value={values.percentile95} label={t('sampler.networkStatistics.percentile95')} />
            <WidgetValue value={values.max} label={t('sampler.networkStatistics.max')} />
        </Widget>
    );
};
