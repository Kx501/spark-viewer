import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from '../../../../../hooks/useTranslation';
import Button from './Button';

export interface MergeModeButtonProps {
    merged: boolean;
    setMerged: Dispatch<SetStateAction<boolean>>;
}

export default function MergeModeButton({
    merged,
    setMerged,
}: MergeModeButtonProps) {
    const { t } = useTranslation();
    
    return (
        <Button
            value={merged}
            setValue={setMerged}
            title="Merge Mode"
            titleKey="button.mergeMode"
            labelTrue="Merge"
            labelTrueKey="button.merge"
            labelFalse="Separate"
            labelFalseKey="button.separate"
        >
            <p>
                {t('sampler.mergeModeDescription')}
            </p>
            <p>
                {t('button.separateDescription')}
            </p>
        </Button>
    );
}
