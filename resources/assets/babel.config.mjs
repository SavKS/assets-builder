export default {
    presets: [
        '@babel/preset-typescript',
        // TODO: React babel
        // '@babel/preset-react',
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: [
                        'last 2 versions',
                        'not dead'
                    ]
                }
            }
        ]
    ]
};
