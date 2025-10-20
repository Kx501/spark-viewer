import { PlatformStatistics_Mspt } from '../../../../proto/spark_pb';
import { Formatter, WidgetFormat } from '../format';
import Widget from '../Widget';
import WidgetValue from '../WidgetValue';
import { useTranslation } from '../../../../../hooks/useTranslation';

export interface MsptWidgetProps {
    mspt: PlatformStatistics_Mspt;
}

export default function MsptWidget({ mspt }: MsptWidgetProps) {
    const { t } = useTranslation();
    const formatter: Formatter = {
        color: value => {
            if (value >= 50) {
                return WidgetFormat.colors.red;
            } else if (value >= 40) {
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
        <Widget title={t('widget.mspt')} formatter={formatter}>
            <WidgetValue value={mspt.last5M!.min} label={t('widget.min')} />
            <WidgetValue value={mspt.last5M!.median} label={t('widget.med')} />
            <WidgetValue value={mspt.last5M!.percentile95} label={t('widget.percentile95')} />
            <WidgetValue value={mspt.last5M!.max} label={t('widget.max')} />
        </Widget>
    );
}
