import lodash from 'lodash';
import TerserPlugin from 'terser-webpack-plugin';

export default ({ babelConfig, jsCompiler }) => webpackConfig => {
    webpackConfig.module.rules.push({
        test: /\.(jsx?|tsx?)$/,
        exclude: [ /node_modules/ ],
        use: [
            jsCompiler === 'swc' ?
                {
                    loader: 'swc-loader'
                } :
                {
                    loader: 'babel-loader',
                    options: babelConfig
                }
        ]
    });

    webpackConfig.resolve.extensions.push('.jsx', '.tsx');

    if (!webpackConfig.optimization?.minimizer) {
        lodash.set(webpackConfig, 'optimization.minimizer', []);
    }

    webpackConfig.optimization.minimizer.push(
        new TerserPlugin()
    );

    return webpackConfig;
}
