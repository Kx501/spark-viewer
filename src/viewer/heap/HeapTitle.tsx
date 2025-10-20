import Head from 'next/head';
import Avatar from '../common/components/Avatar';
import { formatDate } from '../common/util/format';
import { HeapMetadata, PlatformMetadata_Type } from '../proto/spark_pb';
import { useTranslation } from '../../hooks/useTranslation';

export interface HeapTitleProps {
    metadata: HeapMetadata;
}

export default function HeapTitle({ metadata }: HeapTitleProps) {
    const { t } = useTranslation();
    const { user, generatedTime } = metadata;

    let time;
    if (generatedTime) {
        const [timeStr, dateStr] = formatDate(generatedTime);
        time = ` @ ${timeStr} ${dateStr}`;
    } else {
        time = '';
    }

    return (
        <div className="textbox title">
            <Head>
                <title>{t('heapSummary.title')}{time} | spark</title>
            </Head>
            <span>
                {t('heapSummary.title')} {t('heapSummary.createdBy')}{' '}
                {user &&
                    metadata.platform?.type !==
                        PlatformMetadata_Type.APPLICATION && (
                        <Avatar user={user} />
                    )}
                {user?.name}
                {time}
            </span>
        </div>
    );
}
