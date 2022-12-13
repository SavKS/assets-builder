import { Services } from '@savks/js-container';
import { useContext } from 'react';

import { ServicesContext } from '../contexts/ServicesContext';

export default <Name extends keyof Services>(name: Name) => {
    const context = useContext(ServicesContext);

    if (!context) {
        throw new Error('Can\'t found ServicesContext');
    }

    if (!Object.hasOwn(context, name)) {
        throw new Error(`The service "${ name }" not provided`);
    }

    return context[ name ]!;
};
