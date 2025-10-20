import React from 'react';
import ConfigurationObject from './ConfigurationObject';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface ExtraPlatformMetadataProps {
    data: Record<string, any>;
}

export default function ExtraPlatformMetadata({
    data,
}: ExtraPlatformMetadataProps) {
    const { t } = useTranslation();
    
    return (
        <div className="configurations">
            <p>{t('sampler.extraPlatformMetadata.description')}</p>
            <ConfigurationObject data={data} />
        </div>
    );
}
