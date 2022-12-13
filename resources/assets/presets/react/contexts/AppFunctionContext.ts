import { createContext } from 'react';

import { AppFunction as AppFunctionType } from '../app';

export const AppFunctionContext = createContext<AppFunctionType | null>(null);
