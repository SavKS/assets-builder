declare module '@assets-preset/react' {
    import Application, { Services } from '@savks/js-container';

    export interface AppFunction {
        (): Application<Services>,

        <K extends keyof Services>(serviceName: K): Services[K]
    }

    const app: AppFunction;

    export default app;
}
