import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { useTranslation } from '../../../../../hooks/useTranslation';

export interface ButtonProps {
    value: boolean;
    setValue: Dispatch<SetStateAction<boolean>>;
    title: string;
    titleKey?: string;
    labelTrue: string;
    labelTrueKey?: string;
    labelFalse: string;
    labelFalseKey?: string;
    children: ReactNode[];
}

export default function Button({
    value,
    setValue,
    title,
    titleKey,
    labelTrue,
    labelTrueKey,
    labelFalse,
    labelFalseKey,
    children,
}: ButtonProps) {
    const { t } = useTranslation();
    
    function onClick() {
        setValue(!value);
    }

    return (
        <div className="button">
            <button onClick={onClick}>
                <FontAwesomeIcon icon={faCogs} /> <span>{titleKey ? t(titleKey) : title}:</span>{' '}
                {value ? (labelTrueKey ? t(labelTrueKey) : labelTrue) : (labelFalseKey ? t(labelFalseKey) : labelFalse)}
            </button>
            {value ? children[0] : children[1]}
        </div>
    );
}
