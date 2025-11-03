import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

// Theme 패키지 import (CSS 변수 포함)
import '@template/theme';

// UI 패키지 import (스타일 포함)
import '@template/ui/ui.css';
import '@template/ui';

// 전역 스타일
import './style.css';

// 테마 초기화
import { useTheme } from '@template/theme';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// 앱 마운트 전에 테마 초기화
const theme = useTheme();
theme.updateHtmlClass();

app.mount('#app');
