import Application from '@savks/js-container';

import api from './modules/api';
import ee from './modules/event-emmiter';
import http from './modules/http';
import settings from './modules/settings';
import shared from './modules/shared';
import store from './modules/store';

export default (app: Application) => {
    app.use(api);
    app.use(ee);
    app.use(http);
    app.use(settings);
    app.use(shared);
    app.use(store);
};
