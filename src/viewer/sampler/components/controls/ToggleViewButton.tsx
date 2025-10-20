import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction } from 'react';
import FaButton from '../../../../components/FaButton';
import { SamplerMetadata } from '../../../proto/spark_pb';
import { View, VIEW_ALL, VIEW_FLAT, VIEW_SOURCES } from '../views/types';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface ToggleViewButtonProps {
    metadata: SamplerMetadata;
    view: View;
    setView: Dispatch<SetStateAction<View>>;
    sourcesViewSupported: boolean;
}

export default function ToggleViewButton({
    metadata,
    view,
    setView,
    sourcesViewSupported,
}: ToggleViewButtonProps) {
    const { t } = useTranslation();
    const supportedViews: View[] = [
        VIEW_ALL,
        VIEW_FLAT,
        ...(sourcesViewSupported ? [VIEW_SOURCES] : []),
    ];

    return (
        <>
            {supportedViews.map(v => {
                function onClick() {
                    setView(v);
                }

                let label;
                let labelKey;
                if (v === VIEW_ALL) {
                    label = 'all';
                    labelKey = 'toggleView.all';
                } else if (v === VIEW_FLAT) {
                    label = 'flat';
                    labelKey = 'toggleView.flat';
                } else {
                    const isModPlatform = ['Fabric', 'Forge', 'NeoForge'].includes(
                        metadata?.platform?.name || ''
                    );
                    label = isModPlatform ? 'mods' : 'plugins';
                    labelKey = isModPlatform ? 'toggleView.mods' : 'toggleView.plugins';
                }

                return (
                    <FaButton
                        key={label}
                        icon={faEye}
                        onClick={onClick}
                        title="Toggle the view"
                        titleKey="button.toggleView"
                        extraClassName={
                            view === v
                                ? 'sources-view-button toggled'
                                : 'sources-view-button'
                        }
                    >
                        <span>{labelKey ? t(labelKey) : label}</span>
                    </FaButton>
                );
            })}
        </>
    );
}
