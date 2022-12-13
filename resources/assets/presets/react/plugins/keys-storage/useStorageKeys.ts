import useObjectStorage from '@assets-preset/react/plugins/object-storage/useObjectStorage';

import KeysStorage from './KeysStorage';

export default (keysStorage: KeysStorage) => useObjectStorage(keysStorage.storage, { path: 'keys' });
