import { PlatformStatistics_Tps } from '../../../../proto/spark_pb';
import { Formatter, WidgetFormat } from '../format';
import Widget from '../Widget';
import WidgetValue from '../WidgetValue';
import { useTranslation } from '../../../../../hooks/useTranslation';

export interface TpsWidgetProps {
    tps: PlatformStatistics_Tps;
}

export default function TpsWidget({ tps }: TpsWidgetProps) {
    const { t } = useTranslation();
    const formatter: Formatter = {
        color: value => {
            if (value > 18) {
                return WidgetFormat.colors.green;
            } else if (value > 16) {
                return WidgetFormat.colors.yellow;
            } else {
                return WidgetFormat.colors.red;
            }
        },
        format: value => {
            return value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        },
    };

    return (
        <Widget title={t('widget.tps')} formatter={formatter}>
            <WidgetValue value={tps.last1M} label={t('widget.tps1m')} />
            <WidgetValue value={tps.last5M} label={t('widget.tps5m')} />
            <WidgetValue value={tps.last15M} label={t('widget.tps15m')} />
        </Widget>
    );
}
