import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction } from 'react';
import FaButton from '../../../../components/FaButton';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface GraphButtonProps {
    graphSupported: boolean;
    showGraph: boolean;
    setShowGraph: Dispatch<SetStateAction<boolean>>;
}

export default function GraphButton({
    graphSupported,
    showGraph,
    setShowGraph,
}: GraphButtonProps) {
    const { t } = useTranslation();
    if (!graphSupported) {
        return null;
    }

    function onClick() {
        setShowGraph(state => !state);
    }

    return (
        <FaButton
            icon={faChartLine}
            onClick={onClick}
            title="View the graph"
            titleKey="button.viewGraph"
            extraClassName={showGraph ? 'toggled' : undefined}
        />
    );
}
