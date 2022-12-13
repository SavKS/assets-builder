import { useMemoCompare } from '@savks/react-helpers';
import { useCallback, useEffect } from 'react';

import { Nil } from '../types';

type BaseConfig = {
    handler: (event: MouseEvent) => void,
    isDisabled?: boolean
};

type ConfigWithMiddleware = {
    middleware: ((event: MouseEvent) => boolean)[]
};

type ConfigWithCustomChecker<T extends Element> = {
    customReferenceChecker: (referenceElement: T, target: Element) => boolean
};

type Config<T extends Element> =
    | BaseConfig
    | ConfigWithMiddleware & BaseConfig
    | ConfigWithCustomChecker<T> & BaseConfig;

export default <T extends Element>(referenceElement: T | Nil, config: Config<T>) => {
    const middleware = useMemoCompare(
        () => 'middleware' in config ? config.middleware : undefined,
        [ config ]
    );

    const handler = useCallback((event: MouseEvent) => {
        if (!referenceElement) {
            return;
        }

        const target = event.target as Element;

        if ('customReferenceChecker' in config) {
            if (config.customReferenceChecker(referenceElement, target)) {
                config.handler(event);
            } else {
                return;
            }
        }

        if (referenceElement.contains(target)) {
            return;
        }

        const isCapturedByMiddleware = (middleware ?? []).some(
            middlewareHandler => !middlewareHandler(event)
        );

        if (!isCapturedByMiddleware) {
            config.handler(event);
        }
    }, [ config, middleware, referenceElement ]);

    useEffect(() => {
        if (!referenceElement) {
            return;
        }

        const clickHandler = handler;

        document.addEventListener('click', clickHandler);

        return () => {
            document.removeEventListener('click', clickHandler);
        };
    }, [ handler, referenceElement ]);
};
