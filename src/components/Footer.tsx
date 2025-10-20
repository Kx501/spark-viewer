import styles from '../style/footer.module.scss';
import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
    const { t } = useTranslation();
    const year = new Date().getFullYear().toString();
    return (
        <footer className={styles.footer}>
            <a href="https://github.com/lucko/spark">spark</a> {t('footer.and')}{' '}
            <a href="https://github.com/lucko/spark-viewer">spark-viewer</a> {t('footer.freeOpenSource')}
            <br />
            {t('footer.copyright')} 2018-{year}{' '}
            <a href="https://github.com/lucko">lucko</a> {t('footer.andOther')}{' '}
            <a href="docs/misc/Credits">{t('footer.contributors')}</a>.
        </footer>
    );
}
