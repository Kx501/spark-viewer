import { SystemStatistics as SystemStatisticsProto } from '../../../proto/spark_pb';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface JvmStartupArgsProps {
    systemStatistics: SystemStatisticsProto;
}

export default function JvmStartupArgs({
    systemStatistics,
}: JvmStartupArgsProps) {
    const { t } = useTranslation();
    
    return (
        <p>
            {t('sampler.jvmStartupArgs.description')}
            <br />
            <br />
            <span
                style={{
                    maxWidth: '1000px',
                    display: 'inline-block',
                    color: 'inherit',
                }}
            >
                {systemStatistics.java!.vmArgs}
            </span>
        </p>
    );
}
