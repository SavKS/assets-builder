import { useState } from 'react';

import preloadedState from '../utils/preloadedState';

export default <T>(selector: string, defaultValue?: T) => {
    const [ state, setState ] = useState<T>(
        () => preloadedState(selector, defaultValue)
    );

    return [ state, setState ] as const;
};
