module.exports = {
    content: process.env.SERVE_MODE ?
        [] :
        process.env.BUILD_ENV === 'src' ?
            [
                '../../layouts/**/*.twig',
                '../../js@src/**/*.{ts,tsx}'
            ] :
            [
                '../../js@pub/**/*.{ts,tsx}',
                '../../../views/**/*.blade.php'
            ],
    prefix: '',
    theme: {
        screens: {
            'sm': '576px',
            'md': '768px',
            'lg': '992px',
            'xl': '1260px',
            '2xl': '1440px',
            '3xl': '1600px',
            '4xl': '1921px'
        },
        extend: {
            colors: {
                'primary': '#000000',

                'gray': '#C4C4C4',
                'gray-4': '#d9d9d9',
                'gray-5': '#e6e6e6',
                'gray-6': '#f5f5f5',

                'red': '#FE0000',
                'blue': '#4797FC'
            },
            spacing: {
                15: '3.75rem'
            }
        }
    },
    important: false
};
