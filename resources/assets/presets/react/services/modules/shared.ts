import Application from '@savks/js-container';

import type { ObjectStorage } from '../../plugins/object-storage/ObjectStorage';

declare module '@savks/js-container' {
    interface Services {
        'shared': ObjectStorage
    }
}

export default {
    register: (app: Application) => {
        app.singleton('shared', async () => {
            const { ObjectStorage } = await import('../../plugins/object-storage/ObjectStorage');

            return new ObjectStorage(window.__preload?.shared ?? {});
        });
    }
};
