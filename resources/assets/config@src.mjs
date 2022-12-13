import nodePath from 'node:path';

export default config => ({
    appendHashToFiles: false,
    paths: {
        scripts: nodePath.resolve(config.paths.assets, './js@src'),
        output: nodePath.resolve(config.paths.output, './src')
    },
    manifest: nodePath.resolve(config.paths.output, './src/manifest.json'),
    copy: [
        /*{
            patterns: [
                {
                    from: nodePath.resolve(assetsPath, './vendor/fa'),
                    to: nodePath.resolve(outputPath, 'fa')
                }
            ]
        }*/
    ]
});
