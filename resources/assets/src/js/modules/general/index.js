import '@base';

import { registerStore, vMount } from '@helpers';

import Test from './components/Test.vue';
import Store from './store';

import store from '@store';

registerStore('general', Store);

// vMount('#el', {
//     store,
//     render(h) {
//         return h(Test);
//     }
// });
