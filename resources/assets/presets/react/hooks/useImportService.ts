import { Services } from '@savks/js-container';
import { useCallback } from 'react';

import useApp from './useApp';
import usePromise from './usePromise';

export default <Name extends keyof Services>(name: Name) => {
    const app = useApp();

    return usePromise(
        useCallback(
            () => app(name),
            [ app, name ]
        )
    );
};
