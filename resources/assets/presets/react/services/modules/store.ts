import Application from '@savks/js-container';

export const factory = async (app: Application) => {
    const { combineReducers, configureStore } = await import('@reduxjs/toolkit');
    const { default: autocompleteApi } = await import('../../services/modules/store/api/autocomplete');
    const { default: preloadSlice } = await import('./store/slices/preload');
    const { default: restoreCacheReducer } = await import('./store/reducers/restoreCache');

    const initialReducers = {
        preload: preloadSlice.reducer,

        [ autocompleteApi.reducerPath ]: autocompleteApi.reducer
    };

    const rootReducer = combineReducers(initialReducers);

    const apiManager = await app.make('api');

    const store = configureStore<ReturnType<typeof rootReducer>>({
        reducer: restoreCacheReducer(rootReducer),

        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(
            autocompleteApi.middleware
        ).concat([
            middlewareApi => apiManager.resolveMiddleware(middlewareApi)
        ]) as any,

        devTools: true
    });

    const injectReducers = (newReducers: Record<string, any>) => {
        const rootReducer = combineReducers({
            ...initialReducers,
            ...newReducers
        });

        store.replaceReducer(
            restoreCacheReducer(rootReducer)
        );
    };

    return {
        store,
        injectReducers
    };
};

declare module '@savks/js-container' {
    interface Services {
        'store': Awaited<ReturnType<typeof factory>>
    }
}

export default {
    register: (app: Application) => {
        app.singleton(
            'store',
            () => factory(app)
        );
    }
};
