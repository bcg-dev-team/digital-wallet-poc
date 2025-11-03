import { createPinia } from 'pinia';
import { createApp } from 'vue';
import '@template/ui/ui.css';
import App from './App.vue';
import './style.css';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.mount('#app');
