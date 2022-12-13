import { useContext } from 'react';

import { MountedContext } from '../contexts/MountedContext';
import useObjectStorage from '../plugins/object-storage/useObjectStorage';

export default () => {
    const mountedContext = useContext(MountedContext);
    const visible = useObjectStorage(mountedContext.storage, {
        path: 'visible'
    });

    return visible.includes(mountedContext.key);
};
