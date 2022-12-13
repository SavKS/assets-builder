import useObjectStorage from '../plugins/object-storage/useObjectStorage';

import useService from './useService';

export default <T = any>(path: string): T => useObjectStorage(
    useService('shared'),
    { path }
);
