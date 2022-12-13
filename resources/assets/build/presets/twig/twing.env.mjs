import { TwingLoaderChain, TwingLoaderFilesystem } from 'twing';

/** @type {import('twing').TwingEnvironmentOptions} */
export const options = {};

/**
 * @param {import('webpack').LoaderContext<{}>} loader
 * @param {import('twing').TwingEnvironment} env
 */
export async function configure({ loader, env }) {
    env.addGlobal('mode', this.mode);

    env.enableDebug();

    env.setLoader(
        new TwingLoaderChain([
            env.getLoader(),
            new TwingLoaderFilesystem()
        ])
    );
};
