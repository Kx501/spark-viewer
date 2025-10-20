import { PlatformStatistics_Ping } from '../../../../proto/spark_pb';
import { Formatter, WidgetFormat } from '../format';
import Widget from '../Widget';
import WidgetValue from '../WidgetValue';
import { useTranslation } from '../../../../../hooks/useTranslation';

export interface PingWidgetProps {
    ping: PlatformStatistics_Ping;
}

export default function PingWidget({ ping }: PingWidgetProps) {
    const { t } = useTranslation();
    const formatter: Formatter = {
        color: value => {
            if (value >= 200) {
                return WidgetFormat.colors.red;
            } else if (value >= 100) {
                return WidgetFormat.colors.yellow;
            } else {
                return WidgetFormat.colors.green;
            }
        },
        format: value => {
            return value.toLocaleString('en-US', {
                maximumSignificantDigits: 3,
                useGrouping: false,
            });
        },
    };

    return (
        <Widget title={t('widget.ping')} formatter={formatter}>
            <WidgetValue value={ping.last15M!.min} label={t('widget.min')} />
            <WidgetValue value={ping.last15M!.median} label={t('widget.med')} />
            <WidgetValue value={ping.last15M!.percentile95} label={t('widget.percentile95')} />
            <WidgetValue value={ping.last15M!.max} label={t('widget.max')} />
        </Widget>
    );
}
