import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from '../../../../../hooks/useTranslation';
import Button from './Button';

export interface BottomUpButtonProps {
    bottomUp: boolean;
    setBottomUp: Dispatch<SetStateAction<boolean>>;
}

export default function BottomUpButton({
    bottomUp,
    setBottomUp,
}: BottomUpButtonProps) {
    const { t } = useTranslation();
    
    return (
        <Button
            value={bottomUp}
            setValue={setBottomUp}
            title="Display"
            titleKey="button.display"
            labelTrue="Bottom Up"
            labelTrueKey="button.bottomUp"
            labelFalse="Top Down"
            labelFalseKey="button.topDown"
        >
            <p>
                {t('button.bottomUpDescription')}
            </p>
            <p>
                {t('button.topDownDescription')}
            </p>
        </Button>
    );
}
