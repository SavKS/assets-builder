import { createContext } from 'react';

import { ObjectStorage } from '../plugins/object-storage/ObjectStorage';

export const MountedContext = createContext<{
    storage: ObjectStorage,
    key: symbol
}>(null!);
