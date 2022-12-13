import useObjectStorage from '../plugins/object-storage/useObjectStorage';
import { Nil } from '../types';

import useService from './useService';

export default <T = any>(path: string): T | Nil => {
    return useObjectStorage(
        useService('settings'),
        {
            path: path.replaceAll('.', '__DOT__')
        }
    );
};
