import Notifications from '@kyvg/vue3-notification';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';


createApp(App).use(store).use(router).use(Notifications).mount('#app')
