import Head from 'next/head';
import Avatar from '../../common/components/Avatar';
import { formatBytesShort, formatDate } from '../../common/util/format';
import { useTranslation } from '../../../hooks/useTranslation';
import {
    PlatformMetadata_Type,
    SamplerMetadata,
    SamplerMetadata_DataAggregator_Type,
    SamplerMetadata_SamplerMode,
} from '../../proto/spark_pb';

export interface SamplerTitleProps {
    metadata: SamplerMetadata;
}

export default function SamplerTitle({ metadata }: SamplerTitleProps) {
    const { t } = useTranslation();
    const { user, startTime, interval, dataAggregator } = metadata;

    const comment = metadata.comment ? '"' + metadata.comment + '"' : '';
    const [startTimeStr, startDateStr] = formatDate(startTime);

    let ticksOver = '';
    if (
        dataAggregator &&
        dataAggregator.type === SamplerMetadata_DataAggregator_Type.TICKED
    ) {
        ticksOver =
            ', ' + t('sampler.ticks') + ' >= ' + dataAggregator.tickLengthThreshold / 1000 + 'ms';
    }

    const alloc =
        metadata.samplerMode === SamplerMetadata_SamplerMode.ALLOCATION;
    const title = alloc ? t('sampler.memoryProfile') : t('sampler.profile');
    const formattedInterval = alloc
        ? formatBytesShort(interval)
        : `${interval / 1000}ms`;

    return (
        <div className="textbox title">
            <Head>
                <title>
                    {title} @ {startTimeStr} {startDateStr} | {t('common.spark')}
                </title>
            </Head>
            <span>
                {comment}
                {user &&
                    metadata.platform?.type !==
                        PlatformMetadata_Type.APPLICATION && (
                        <Avatar user={user} />
                    )}
                {user?.name} @ {startTimeStr} {startDateStr}, {t('sampler.interval')}{' '}
                {formattedInterval}
                {ticksOver}
            </span>
        </div>
    );
}
