import { Services } from '@savks/js-container';
import isPromise from 'is-promise';
import { FC, ReactNode, StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import app from '../app';
import ServicesProvider from '../components/ServicesProvider';
import { AppFunctionContext } from '../contexts/AppFunctionContext';
import { MountedContext } from '../contexts/MountedContext';
import { Manager as ApiManager } from '../plugins/api';
import { Api, ApiResolver } from '../plugins/api/types';
import { ObjectStorage } from '../plugins/object-storage/ObjectStorage';

type PropsFunc<Props> = (el: HTMLElement) => Props;

// eslint-disable-next-line @typescript-eslint/comma-dangle
export default async <Props extends Record<string, any>, >(
    selector: string,
    resolver: () => Promise<{ default: FC<Props> }> | FC<Props>,
    config: {
        props?: PropsFunc<Props> | Props,
        requiredApi?: Api | ApiResolver | (Api | ApiResolver)[],
        requiredServices?: Array<keyof Services>,
        forceRender?: boolean
    } = {}
) => {
    const targets = Array.from(
        document.querySelectorAll<HTMLElement>(selector)
    );

    if (!targets.length) {
        return;
    }

    const componentPredicate = resolver();

    const Component = isPromise(componentPredicate) ? (await componentPredicate).default : componentPredicate;

    const storeService = await app('store');

    if (config.requiredApi) {
        const apiManager = await app('api');

        const apiResolvers = [ config.requiredApi ].flat().filter(
            (apiResolver): apiResolver is ApiResolver => typeof apiResolver === 'function'
        );

        await loadApi(
            storeService,
            apiManager,
            apiResolvers
        );
    }

    const visibilityStorage = new ObjectStorage<{
        visible: symbol[]
    }>({
        visible: []
    });

    const render = (target: HTMLElement) => {
        const prerenderEl = target.cloneNode(false) as HTMLElement;

        prerenderEl.hidden = false;

        const componentProps = (typeof config.props === 'function' ? (config.props as PropsFunc<Props>)(target) : config.props) as Props;

        const componentId = Symbol();

        const root = createRoot(prerenderEl);

        const handleLoad = () => {
            target.parentElement?.replaceChild(prerenderEl, target);

            visibilityStorage.change(data => {
                data.visible.push(componentId);
            });
        };

        root.render(
            <StrictMode>
                <Provider store={ storeService.store }>
                    <MountedContext.Provider
                        value={
                            {
                                storage: visibilityStorage,
                                key: componentId
                            }
                        }
                    >
                        <AppFunctionContext.Provider value={ app }>
                            <ServicesProvider names={ config.requiredServices ?? [] }>
                                <ComponentRenderWatcher onLoad={ handleLoad }>
                                    <Component { ...componentProps } />
                                </ComponentRenderWatcher>
                            </ServicesProvider>
                        </AppFunctionContext.Provider>
                    </MountedContext.Provider>
                </Provider>
            </StrictMode>
        );

        if (APP_DEBUG) {
            // eslint-disable-next-line no-console
            console.log('Rendered:', selector);
        }
    };

    if (config?.forceRender) {
        Array.from(targets).forEach(target => {
            render(target);
        });
    } else {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(async entry => {
                const target = entry.target as HTMLElement;

                if (!entry.isIntersecting) {
                    return;
                }

                observer.unobserve(target);

                render(target);
            });
        });

        Array.from(targets).forEach(el => {
            observer.observe(el);
        });
    }
};

async function loadApi(storeService: Services['store'], apiManager: ApiManager, apiResolvers: ApiResolver[]) {
    const apiPredicates = apiResolvers.map(
        resolver => resolver()
    );

    const apis: Api[] = [];

    for (const apiPredicate of apiPredicates) {
        apis.push(
            isPromise(apiPredicate) ? (await apiPredicate).default : apiPredicate
        );
    }

    await Promise.all(
        apis.map(
            api => apiManager.declareApi(api, storeService)
        )
    );
}

function ComponentRenderWatcher(props: {
    onLoad: () => void,
    children: ReactNode
}) {
    useEffect(() => {
        props.onLoad.call(null);
    }, [ props.onLoad ]);

    return <>{ props.children }</>;
}
