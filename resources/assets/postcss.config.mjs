import autoprefixer from 'autoprefixer';
import postcssInlineSvg from 'postcss-inline-svg';
import tailwindcss from 'tailwindcss';

const plugins = [
    tailwindcss('../../tailwind.config.js'),
    postcssInlineSvg,
    autoprefixer()
];

export default { plugins };
