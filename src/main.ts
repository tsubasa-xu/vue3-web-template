import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import layoutRegister from './layout';
import pluginsRegister from './plugins';
import componentsRegister from './components';
import naive from "naive-ui";

import './style/reboot.css';
import './style/global.css';
import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';

let app = createApp(App);
app.use(store);
app.use(router);
app.use(naive);
layoutRegister(app);
pluginsRegister(app);
componentsRegister(app);
app.mount('#app');
