import { $mount, registerStore, location } from '@helpers';

import Store from './store';

import routes from './routes';

location.bulkRegister(routes);

registerStore('checkout', Store);

const { store } = window;

$mount('SELECTOR', {
    store
});
