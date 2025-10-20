import { HeaderProps } from './types';
import { useTranslation } from '../../../../../hooks/useTranslation';

export default function FlatViewHeader({ children }: HeaderProps) {
    const { t } = useTranslation();
    
    return (
        <div className="header">
            <h2>{t('sampler.flatView.title')}</h2>
            <p>
                {t('sampler.flatView.description')}
            </p>
            {children}
        </div>
    );
}
