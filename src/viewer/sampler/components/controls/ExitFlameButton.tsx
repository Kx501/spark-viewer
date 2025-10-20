import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction } from 'react';
import FaButton from '../../../../components/FaButton';
import VirtualNode from '../../node/VirtualNode';
import { useTranslation } from '../../../../hooks/useTranslation';

export interface ExitFlameButtonProps {
    setFlameData: Dispatch<SetStateAction<VirtualNode | undefined>>;
}

export default function ExitFlameButton({
    setFlameData,
}: ExitFlameButtonProps) {
    const { t } = useTranslation();
    function onClick() {
        setFlameData(undefined);
    }

    return (
        <FaButton
            icon={faTimes}
            onClick={onClick}
            title="Exit the Flame Graph view"
            titleKey="button.exitFlameGraph"
        />
    );
}
