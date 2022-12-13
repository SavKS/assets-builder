import { Services } from '@savks/js-container';
import { useMemoCompare } from '@savks/react-helpers';
import { ReactNode, useCallback, useMemo } from 'react';

import { ServicesContext } from '@assets-preset/react/contexts/ServicesContext';
import useApp from '@assets-preset/react/hooks/useApp';
import usePromise from '@assets-preset/react/hooks/usePromise';

type Props<Names extends Array<keyof Services>> = {
    names: Names,
    fallback?: ReactNode,
    children: ReactNode
};

export default function ServicesProvider<Names extends Array<keyof Services>>(props: Props<Names>) {
    const app = useApp();

    const names = useMemoCompare(
        () => props.names,
        [ props.names ]
    );

    const result = usePromise(
        useCallback(
            () => Promise.all(
                names.map(
                    async name => [ name, await app(name) ]
                )
            ),
            [ app, names ]
        )
    );

    const contextValue = useMemo(
        () => Object.fromEntries(result ?? []),
        [ result ]
    );

    if (!result) {
        return props.fallback ? <>{ props.fallback }</> : null;
    }

    return (
        <ServicesContext.Provider value={ contextValue }>{ props.children }</ServicesContext.Provider>
    );
}
