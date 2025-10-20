import { HeaderProps } from './types';
import { useTranslation } from '../../../../../hooks/useTranslation';

export default function AllViewHeader({ children }: HeaderProps) {
    const { t } = useTranslation();
    
    return (
        <div className="header">
            <h2>{t('sampler.allView')}</h2>
            <p>
                {t('sampler.allViewDescription')}
            </p>
            {children}
        </div>
    );
}
