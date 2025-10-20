import { NextPage } from 'next';
import TextBox from '../components/TextBox';
import { useTranslation } from '../hooks/useTranslation';

interface ErrorPageProps {
    statusCode?: number;
}

const Error: NextPage<ErrorPageProps> = ({ statusCode }) => {
    const { t } = useTranslation();
    
    return (
        <TextBox>
            {statusCode
                ? t('errors.serverError', { statusCode })
                : t('errors.unexpectedError')}
        </TextBox>
    );
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
