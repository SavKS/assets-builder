import Application, { Services } from '@savks/js-container';

import services from './services';

const app = new Application();

services(app);

export interface AppFunction {
    (): Application,

    <Name extends keyof Services>(serviceName: Name): Promise<Services[Name]>
}

const appFunction = <Name extends keyof Services>(name: Name) => name ? app.make(name) : app;

export default appFunction as AppFunction;
