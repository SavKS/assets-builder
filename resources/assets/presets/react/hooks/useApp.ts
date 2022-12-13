import { Services } from '@savks/js-container';
import { useContext } from 'react';

import { AppFunction } from '../app';
import { AppFunctionContext } from '../contexts/AppFunctionContext';

function useApp(): AppFunction;

function useApp<K extends keyof Services>(service?: K): Services[K];

function useApp<K extends keyof Services>(service?: K) {
    const app = useContext(AppFunctionContext);

    if (!app) {
        throw new Error('Can\'t found application context');
    }

    return service ? app(service) : app;
}

export default useApp;
