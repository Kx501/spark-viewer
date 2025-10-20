import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { MouseEventHandler, ReactNode } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export interface FaButtonProps {
    icon: IconProp;
    onClick: MouseEventHandler<HTMLDivElement>;
    title: string;
    titleKey?: string;
    extraClassName?: string;
    children?: ReactNode;
}

export default function FaButton({
    icon,
    onClick,
    title,
    titleKey,
    extraClassName,
    children,
}: FaButtonProps) {
    const { t } = useTranslation();
    const className = classNames('button', 'textbox', extraClassName);
    return (
        <div className={className} onClick={onClick} title={titleKey ? t(titleKey) : title}>
            <FontAwesomeIcon icon={icon} />
            {children}
        </div>
    );
}
