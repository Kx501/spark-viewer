import { useContext } from 'react';
import { useTranslation } from '../../../../../hooks/useTranslation';
import { MetadataContext } from '../../SamplerContext';
import { HeaderProps } from './types';

export default function SourcesViewHeader({ children }: HeaderProps) {
    const { t } = useTranslation();
    const metadata = useContext(MetadataContext)!;
    const isModPlatform = ['Fabric', 'Forge', 'NeoForge'].includes(
        metadata.platform?.name!
    );

    return (
        <div className="header">
            <h2>{t(isModPlatform ? 'sampler.pluginsView.title' : 'sampler.pluginsView.title')}</h2>
            <p>
                {t('sampler.pluginsView.description')}
            </p>
            {children}
        </div>
    );
}
