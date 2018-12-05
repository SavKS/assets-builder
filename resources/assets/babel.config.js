module.exports = {
    'presets': [
        [
            '@babel/preset-env',
            {
                'targets': {
                    'browsers': [
                        'last 2 versions',
                        'ie >= 11'
                    ]
                }
            }
        ]
    ],
    'plugins': [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        [
            'babel-plugin-webpack-alias',
            {
                'config': '../build/webpack/webpack.config.base.js'
            }
        ]
    ]
};
