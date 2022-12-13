export default webpackConfig => {
    webpackConfig.module.rules.push({
        test: /^@svg[\\\/].*\.svg$/i,
        use: 'svg-loader'
    });

    return webpackConfig;
}
