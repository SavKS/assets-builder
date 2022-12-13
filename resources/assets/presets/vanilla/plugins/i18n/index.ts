import { sprintf } from 'sprintf-js';

const $t = (text: string) => text;
const $ti = (text: string, args: any[]) => sprintf(text, ...args);

export {
    $t,
    $ti
};
