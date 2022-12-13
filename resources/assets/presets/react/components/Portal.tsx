import { ReactNode, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    children: ReactNode,
    to: string,
    isExternal?: boolean
};

export default function Portal(props: Props) {
    const target = useMemo(
        () => document.querySelector(props.to),
        [ props.to ]
    );

    if (!target) {
        throw new Error(`Target not found by selector "${ props.to }"`);
    }

    const [ wrapper ] = useState(
        () => document.createElement('div')
    );

    useEffect(() => {
        if (props.isExternal) {
            target.insertAdjacentElement('beforeend', wrapper);
        }
    }, [ props.isExternal, target, wrapper ]);

    useEffect(
        () => () => {
            wrapper?.remove();
        },
        [ wrapper ]
    );

    return <>{ createPortal(props.children, props.isExternal ? wrapper : target) }</>;
}
