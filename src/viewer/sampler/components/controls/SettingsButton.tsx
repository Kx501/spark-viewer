import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction } from 'react';
import FaButton from '../../../../components/FaButton';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface SettingsButtonProps {
    showSettings: boolean;
    setShowSettings: Dispatch<SetStateAction<boolean>>;
}

export default function SettingsButton({
    showSettings,
    setShowSettings,
}: SettingsButtonProps) {
    const { t } = useTranslation();
    function onClick() {
        setShowSettings(state => !state);
    }

    return (
        <FaButton
            icon={faSliders}
            onClick={onClick}
            title="Click to show the settings menu"
            titleKey="button.showSettings"
            extraClassName={showSettings ? 'toggled' : undefined}
        />
    );
}
