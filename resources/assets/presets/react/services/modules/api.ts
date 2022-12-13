import Application from '@savks/js-container';

import type { Manager } from '@assets-preset/react/plugins/api';

declare module '@savks/js-container' {
    interface Services {
        'api': Manager
    }
}

export default {
    register: (app: Application) => {
        app.singleton('api', async () => {
            const { Manager } = await import('@assets-preset/react/plugins/api');

            return new Manager();
        });
    }
};
