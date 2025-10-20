import { SystemStatistics_Cpu_Usage } from '../../../../proto/spark_pb';
import { Formatter, WidgetFormat } from '../format';
import Widget from '../Widget';
import WidgetValue from '../WidgetValue';
import { useTranslation } from '../../../../../hooks/useTranslation';

export interface CpuWidgetProps {
    cpu: SystemStatistics_Cpu_Usage;
    label: string;
}

export default function CpuWidget({ cpu, label }: CpuWidgetProps) {
    const { t } = useTranslation();
    const formatter: Formatter = {
        color: value => {
            if (value > 0.9) {
                return WidgetFormat.colors.red;
            } else if (value > 0.65) {
                return WidgetFormat.colors.yellow;
            } else {
                return WidgetFormat.colors.green;
            }
        },
        format: value => {
            return (
                (value * 100).toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                }) + '%'
            );
        },
    };

    return (
        <Widget title={t('widget.cpu')} label={label} formatter={formatter}>
            <WidgetValue value={cpu.last1M} label={t('widget.cpu1m')} />
            <WidgetValue value={cpu.last15M} label={t('widget.cpu15m')} />
        </Widget>
    );
}
