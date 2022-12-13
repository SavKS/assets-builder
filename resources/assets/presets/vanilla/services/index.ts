import Application from '@savks/js-container';

import ee from './modules/event-emmiter';
import http from './modules/http';

export default (app: Application) => {
    app.use(ee);
    app.use(http);
};
