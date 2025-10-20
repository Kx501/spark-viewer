import TextBox from '../components/TextBox';
import { useTranslation } from '../hooks/useTranslation';

export default function Custom500() {
    const { t } = useTranslation();
    return <TextBox>{t('errors.500')}</TextBox>;
}
