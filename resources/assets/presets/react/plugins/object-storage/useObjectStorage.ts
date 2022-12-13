import get from '@savks/not-need-lodash/get';
import { useCallback } from 'react';
import { Get } from 'type-fest';
import { useSyncExternalStore } from 'use-sync-external-store/shim';

import { ObjectStorage, Storage } from './ObjectStorage';

function useObjectStorage<T extends Storage, P extends string>(
    storage: ObjectStorage<T>,
    opts?: {
        immediate?: boolean,
        path: P
    }
): Get<T, P>;

function useObjectStorage<T extends Storage>(
    storage: ObjectStorage<T>,
    opts?: {
        immediate?: boolean,
        path?: undefined
    }
): T;

function useObjectStorage<T extends Storage, P extends string | undefined>(
    storage: ObjectStorage,
    opts?: {
        immediate?: boolean,
        path?: P
    }
): P extends string ? Get<T, P> : T {
    const { path, immediate } = opts ?? {};

    return useSyncExternalStore(
        useCallback(listener => {
            if (path) {
                return storage.subscribe(listener, { path, immediate });
            }

            return storage.subscribe(listener, { immediate });
        }, [ path, storage, immediate ]),
        () => path ? get(storage.data, path) : storage.data
    );
}

export default useObjectStorage;
