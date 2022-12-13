import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import lodash from 'lodash';

export default webpackConfig => {
    if (!webpackConfig.optimization?.minimizer) {
        lodash.set(webpackConfig, 'optimization.minimizer', []);
    }

    webpackConfig.optimization.minimizer.push(
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        'imagemin-gifsicle',
                        'imagemin-mozjpeg',
                        'imagemin-pngquant',
                        [ 'imagemin-svgo', {
                            plugins: [
                                'preset-default',
                                {
                                    name: 'collapseGroups',
                                    active: false
                                },
                                {
                                    name: 'removeHiddenElems',
                                    active: false
                                }
                            ]
                        } ]
                    ]
                }
            }
        })
    );

    return webpackConfig;
}
