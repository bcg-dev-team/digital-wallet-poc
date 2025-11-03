import { createPinia } from 'pinia';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';

import '@/assets/scss/index.scss';

// MSW는 Simple Mock 모드에서만 사용되므로 별도 초기화 불필요
// Simple Mock WebSocket 서비스가 내부적으로 MSW를 사용

// Theme 패키지 import (CSS 변수 포함)
import '@template/theme';

// UI 패키지 import (스타일 포함)
import '@template/ui/ui.css';
import '@template/ui';

// 전역 스타일
import './style.css';

// TradingView 차트 선언
declare global {
  interface Window {
    TradingView: any;
    tvWidget: any;
  }
}

// 테마 초기화
import { useTheme } from '@template/theme';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// 앱 마운트 전에 테마 초기화
const theme = useTheme();
theme.updateHtmlClass();

// Manager Factory 초기화
import { initializeManagers } from './managers';

async function initializeApp() {
  try {
    // Manager들 초기화
    await initializeManagers();
    console.log('[Main] Manager 초기화 완료');
  } catch (error) {
    console.error('[Main] Manager 초기화 실패:', error);
  }

  app.mount('#app');
}

initializeApp();
