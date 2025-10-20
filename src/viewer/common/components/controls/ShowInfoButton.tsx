import { faGauge, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import FaButton from '../../../../components/FaButton';
import { SparkMetadata } from '../../../proto/guards';
import { MetadataToggle } from '../../hooks/useMetadataToggle';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface ShowInfoButtonProps {
    metadata: SparkMetadata;
    metadataToggle: MetadataToggle;
}

export default function ShowInfoButton({
    metadata,
    metadataToggle,
}: ShowInfoButtonProps) {
    const { t } = useTranslation();
    if (!metadata.platform) {
        return null;
    }

    return (
        <>
            <FaButton
                icon={faGauge}
                onClick={metadataToggle.toggleWidgets}
                title="Click to toggle the widgets"
                titleKey="button.toggleWidgets"
                extraClassName={
                    metadataToggle.showWidgets ? 'toggled' : undefined
                }
            />
            <FaButton
                icon={faInfoCircle}
                onClick={metadataToggle.toggleInfo}
                title="Click to toggle the detailed metadata display"
                titleKey="button.toggleMetadata"
                extraClassName={metadataToggle.showInfo ? 'toggled' : undefined}
            />
        </>
    );
}
