const webpack = require('webpack');

module.exports = (mode, watch = false) => () => {
    const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

    const config = require(`../webpack/webpack.config.${mode}.${env}`);

    config.watch = watch;

    return new Promise(
        resolve => webpack(config, (err, stats) => {
            if (err) {
                console.log('Webpack', err);
            }

            console.log(
                stats.toString({
                    colors: true
                })
            );

            resolve();
        })
    );
};
