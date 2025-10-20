import TextBox from '../components/TextBox';
import { useTranslation } from '../hooks/useTranslation';

export default function Custom404() {
    const { t } = useTranslation();
    return <TextBox>{t('errors.404')}</TextBox>;
}
