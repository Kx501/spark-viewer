import { Dispatch, SetStateAction, useContext } from 'react';
import { SamplerMetadata_SamplerMode } from '../../../../proto/spark_pb';
import { MetadataContext } from '../../SamplerContext';
import Button from './Button';
import { useTranslation } from '../../../../../hooks/useTranslation';

export interface SelfTimeModeButtonProps {
    selfTimeMode: boolean;
    setSelfTimeMode: Dispatch<SetStateAction<boolean>>;
}

export default function SelfTimeModeButton({
    selfTimeMode,
    setSelfTimeMode,
}: SelfTimeModeButtonProps) {
    const metadata = useContext(MetadataContext)!;
    const { t } = useTranslation();

    if (metadata.samplerMode === SamplerMetadata_SamplerMode.ALLOCATION) {
        return (
            <Button
                value={selfTimeMode}
                setValue={setSelfTimeMode}
                title="Sort Mode"
                titleKey="button.sortMode"
                labelTrue="Self bytes allocated"
                labelTrueKey="button.selfBytesAllocated"
                labelFalse="Total bytes allocated"
                labelFalseKey="button.totalBytesAllocated"
            >
                <p>
                    {t('button.selfBytesAllocatedDesc')}
                </p>
                <p>
                    {t('button.totalBytesAllocatedDesc')}
                </p>
            </Button>
        );
    } else {
        return (
            <Button
                value={selfTimeMode}
                setValue={setSelfTimeMode}
                title="Sort Mode"
                titleKey="button.sortMode"
                labelTrue="Self Time"
                labelTrueKey="button.selfTime"
                labelFalse="Total Time"
                labelFalseKey="button.totalTime"
            >
                <p>
                    {t('button.selfTimeDesc')}
                </p>
                <p>
                    {t('button.totalTimeDesc')}
                </p>
            </Button>
        );
    }
}
