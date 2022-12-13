import { Services } from '@savks/js-container';
import { createContext } from 'react';

export const ServicesContext = createContext<Partial<Services>>(undefined!);
