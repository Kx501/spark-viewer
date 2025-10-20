import ConfigurationObject from './ConfigurationObject';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface ServerConfigurationsProps {
    parsedConfigurations: Record<string, any>;
}

export default function ServerConfigurations({
    parsedConfigurations,
}: ServerConfigurationsProps) {
    const { t } = useTranslation();
    
    return (
        <div className="configurations">
            <p>{t('sampler.serverConfigurations.description')}</p>
            <ConfigurationObject data={parsedConfigurations} />
        </div>
    );
}
