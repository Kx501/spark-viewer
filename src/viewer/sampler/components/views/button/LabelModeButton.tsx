import { Dispatch, SetStateAction, useContext } from 'react';
import { SamplerMetadata_SamplerMode } from '../../../../proto/spark_pb';
import { MetadataContext } from '../../SamplerContext';
import { useTranslation } from '../../../../../hooks/useTranslation';
import Button from './Button';

export interface LabelModeButtonProps {
    labelMode: boolean;
    setLabelMode: Dispatch<SetStateAction<boolean>>;
}

export default function LabelModeButton({
    labelMode,
    setLabelMode,
}: LabelModeButtonProps) {
    const metadata = useContext(MetadataContext)!;
    const { t } = useTranslation();
    if (!metadata.numberOfTicks) {
        return null;
    }

    if (metadata.samplerMode === SamplerMetadata_SamplerMode.ALLOCATION) {
        return (
            <Button
                value={labelMode}
                setValue={setLabelMode}
                title="Label"
                titleKey="button.label"
                labelTrue="Bytes per second"
                labelTrueKey="button.bytesPerSecond"
                labelFalse="Percentage"
                labelFalseKey="button.percentage"
            >
                <p>
                    {t('sampler.labelMode.allocation.bytesPerSecond')}
                </p>
                <p>
                    {t('sampler.labelMode.allocation.percentage')}
                </p>
            </Button>
        );
    } else {
        return (
            <Button
                value={labelMode}
                setValue={setLabelMode}
                title="Label"
                titleKey="button.label"
                labelTrue="Time per tick"
                labelTrueKey="button.timePerTick"
                labelFalse="Percentage"
                labelFalseKey="button.percentage"
            >
                <p>
                    {t('sampler.labelMode.timing.timePerTick')}
                </p>
                <p>
                    {t('sampler.labelMode.timing.percentage')}
                </p>
            </Button>
        );
    }
}
