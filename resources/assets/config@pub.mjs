import nodePath from 'node:path';

export default config => ({
    appendHashToFiles: true,
    paths: {
        scripts: nodePath.resolve(config.paths.assets, './js@pub'),
        output: nodePath.resolve(config.paths.output, './pub')
    },
    manifest: nodePath.resolve(config.paths.output, './pub/manifest.json'),
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
