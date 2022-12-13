import WebpackBetterEntries from 'webpack-better-entries';
import nodePath from 'node:path';

export default ({
    jsRootEntry,
    tailwindRuntimeJit,
    modules,
    cssEntries
}) => (webpackConfig, { WEBPACK_WATCH, WEBPACK_SERVE }) => {
    webpackConfig.plugins.push(
        new WebpackBetterEntries(async function* ({ glob }) {
            yield {
                name: 'css/runtime',
                import: tailwindRuntimeJit?.enable && (WEBPACK_SERVE || WEBPACK_WATCH) ?
                    tailwindRuntimeJit.configFilePath :
                    'data:application/javascript;base64,'
            };

            yield {
                name: 'app',
                import: jsRootEntry,
                dependOn: (WEBPACK_SERVE || WEBPACK_WATCH) ? 'css/runtime' : undefined
            };

            if (modules) {
                for await (const file of glob(`${ modules.path }/*/${ modules.entriesPattern }`)) {
                    const name = file.split(/[\\\/]/).slice(-2)[ 0 ];

                    yield {
                        name,
                        dependOn: 'app',
                        import: file
                    };
                }
            }

            if (cssEntries?.length) {
                for await (const file of glob(cssEntries)) {
                    const name = nodePath.basename(
                        file,
                        nodePath.extname(file)
                    );

                    yield {
                        name: `css/${ name }`,
                        dependOn: 'css/runtime',
                        import: file
                    };
                }
            }
        }),
    )

    return webpackConfig;
}
