import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextBox from '../../../../components/TextBox';

import { ReactNode } from 'react';
import styles from '../../../../style/sampler.module.scss';
import Switch from '../../../common/components/Switch';
import { MappingsMetadata } from '../../mappings/fetch';
import MappingsSelector from './MappingsSelector';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface SettingsMenuProps {
    mappingsMetadata?: MappingsMetadata;
    mappings: string;
    setMappings: (type: string) => void;
    infoPoints: boolean;
    toggleInfoPoints: () => void;
}

export default function SettingsMenu({
    mappingsMetadata,
    mappings,
    setMappings,
    infoPoints,
    toggleInfoPoints,
}: SettingsMenuProps) {
    const { t } = useTranslation();
    return (
        <TextBox extraClassName={styles['settings-menu']}>
            {mappingsMetadata && (
                <Setting
                    name={t('settings.mappings')}
                    desc={t('settings.mappingsDesc')}
                >
                    <MappingsSelector
                        mappingsMetadata={mappingsMetadata}
                        mappings={mappings}
                        setMappings={setMappings}
                    />
                </Setting>
            )}
            <Setting
                name={t('settings.infoPoints')}
                desc={t('settings.infoPointsDesc')}
            >
                <Switch value={infoPoints} toggle={toggleInfoPoints} />
            </Setting>
        </TextBox>
    );
}

interface SettingProps {
    name: string;
    desc: string;
    children: ReactNode;
}

const Setting = ({ name, desc, children }: SettingProps) => {
    return (
        <div className="setting">
            <div className="setting-control">
                <FontAwesomeIcon icon={faSliders} /> <span>{name}:</span>{' '}
                {children}
            </div>
            <p>{desc}</p>
        </div>
    );
};
