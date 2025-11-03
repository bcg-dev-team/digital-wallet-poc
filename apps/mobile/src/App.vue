<template>
  <div id="app">
    <!-- 헤더 -->
    <header class="header">
      <h1>📱 모바일 웹앱</h1>
      <p class="subtitle">React Native WebView에서 로딩된 Vue 3 앱</p>
    </header>

    <!-- 네이티브 연동 상태 표시 -->
    <div class="native-status" :class="{ 'is-native': isNativeApp }">
      <div class="status-indicator">
        <span class="status-dot" :class="{ active: isNativeApp }"></span>
        {{ isNativeApp ? '네이티브 앱에서 실행 중' : '브라우저에서 실행 중' }}
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
    <main class="main-content">
      <!-- 카드 섹션 -->
      <section class="cards-section">
        <h2>📦 패키지 정보</h2>
        <div class="cards-grid">
          <div class="card" v-for="pkg in packages" :key="pkg.name">
            <div class="card-icon">{{ pkg.icon }}</div>
            <h3>{{ pkg.name }}</h3>
            <p>{{ pkg.description }}</p>
            <div class="card-version">v{{ pkg.version }}</div>
          </div>
        </div>
      </section>

      <!-- 네이티브 기능 테스트 -->
      <section class="native-features" v-if="isNativeApp">
        <h2>🔧 네이티브 기능 테스트</h2>
        <div class="feature-buttons">
          <BaseButton
            @click="testNativeAlert"
            variant="contained"
            color="primary"
            size="lg"
            class="feature-btn"
          >
            📢 네이티브 알림
          </BaseButton>
          <BaseButton
            @click="testNativeNavigation"
            variant="light"
            color="primary"
            size="lg"
            class="feature-btn"
          >
            🧭 네이티브 네비게이션
          </BaseButton>
          <BaseButton
            @click="getDeviceInfo"
            variant="contained"
            color="blue"
            size="lg"
            class="feature-btn"
          >
            📱 디바이스 정보
          </BaseButton>
        </div>
      </section>

      <!-- 메시지 로그 -->
      <section class="message-log">
        <h2>💬 메시지 로그</h2>
        <div class="log-container">
          <div v-for="(message, index) in messageLog" :key="index" class="log-item">
            <span class="log-time">{{ message.time }}</span>
            <span class="log-type" :class="message.type">{{ message.type }}</span>
            <span class="log-content">{{ message.content }}</span>
          </div>
        </div>
        <BaseButton @click="clearLog" variant="light" color="grey" size="sm" class="clear-btn">
          로그 지우기
        </BaseButton>
      </section>
    </main>

    <!-- 푸터 -->
    <footer class="footer">
      <p>Vue 3 + Vite + TypeScript 모바일 웹앱</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { formatDate, formatRelativeTime, isValidEmail, toTitleCase } from '@template/utils';
import { ref, onMounted, onUnmounted } from 'vue';
import { BaseButton } from '@template/ui';

// 반응형 상태
const isNativeApp = ref(false);
const messageLog = ref<Array<{ time: string; type: string; content: string }>>([]);

// 패키지 정보
const packages = ref([
  {
    name: 'Types',
    description: '공통 타입 정의',
    version: '0.1.0',
    icon: '📝',
  },
  {
    name: 'Utils',
    description: '공통 유틸리티 함수',
    version: '0.1.0',
    icon: '🛠️',
  },
  {
    name: 'API',
    description: 'API 통신 라이브러리',
    version: '0.1.0',
    icon: '🌐',
  },
  {
    name: 'UI',
    description: 'Vue 3 UI 컴포넌트',
    version: '0.1.0',
    icon: '🎨',
  },
]);

// 유틸리티 함수 활용 예시
const currentTime = ref(new Date());
const sampleEmail = 'test@example.com';
const sampleText = 'vue 3 monorepo template';

// 네이티브 앱 감지
const detectNativeApp = () => {
  // WebView 환경 감지 (더 정확한 방법)
  const userAgent = navigator.userAgent.toLowerCase();

  // React Native WebView 브릿지 확인 (가장 확실한 방법)
  const hasReactNativeBridge = typeof window.ReactNativeWebView !== 'undefined';

  // User Agent에서 WebView 특정 키워드 확인
  // 'wv'는 Android WebView의 고유 식별자
  const hasWebViewIdentifier = userAgent.includes('wv');

  // Expo 환경 확인
  const isExpoEnvironment = userAgent.includes('expo') && userAgent.includes('react-native');

  // 일반적인 모바일 키워드는 제외 (브라우저에서도 포함될 수 있음)
  // 'mobile', 'android', 'ios'는 일반 브라우저에서도 나타날 수 있어 제외

  // User Agent 상세 정보 로그
  addLog('info', `User Agent: ${navigator.userAgent}`);
  addLog('info', `WebView 식별자 (wv): ${hasWebViewIdentifier}`);
  addLog('info', `Expo 환경: ${isExpoEnvironment}`);
  addLog('info', `React Native Bridge: ${hasReactNativeBridge}`);

  // 네이티브 앱 감지 조건을 더 엄격하게 설정
  isNativeApp.value = hasReactNativeBridge || hasWebViewIdentifier || isExpoEnvironment;

  addLog(
    'info',
    `네이티브 앱 감지: ${isNativeApp.value} (Bridge: ${hasReactNativeBridge}, WebView: ${hasWebViewIdentifier}, Expo: ${isExpoEnvironment})`
  );
};

// 네이티브로 메시지 전송
const sendToNative = (message: any) => {
  if (isNativeApp.value && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
    addLog('send', `네이티브로 전송: ${JSON.stringify(message)}`);
  } else {
    addLog('error', '네이티브 환경이 아니거나 WebView 브릿지가 없습니다.');
  }
};

// 네이티브에서 메시지 수신
const handleNativeMessage = (event: MessageEvent) => {
  try {
    // React DevTools 메시지 필터링
    if (event.data && typeof event.data === 'object') {
      const data = event.data as any;
      if (data.source && data.source.includes('react-devtools')) {
        return; // DevTools 메시지는 무시
      }
    }

    // event.data가 문자열인지 확인
    let messageData = event.data;

    // 이미 객체인 경우 JSON.stringify로 변환된 문자열로 처리
    if (typeof messageData === 'object') {
      messageData = JSON.stringify(messageData);
    }

    // 문자열이 아닌 경우 오류 처리
    if (typeof messageData !== 'string') {
      return;
    }

    const message = JSON.parse(messageData);

    // 네이티브 앱 메시지인지 확인 (type 필드가 있는 경우만)
    if (!message.type) {
      return; // type이 없는 메시지는 무시
    }

    addLog('receive', `네이티브에서 수신: ${JSON.stringify(message)}`);

    // 메시지 타입에 따른 처리
    switch (message.type) {
      case 'welcome':
        addLog('info', `환영 메시지: ${message.data.message}`);
        break;
      case 'test':
        addLog('info', `테스트 메시지: ${message.data.message}`);
        break;
      case 'deviceInfoResponse':
        addLog('info', `디바이스 정보: ${JSON.stringify(message.data.device)}`);
        break;
      default:
        addLog('info', `알 수 없는 메시지 타입: ${message.type}`);
    }
  } catch (error) {
    addLog('error', `메시지 파싱 오류: ${error}`);
  }
};

// React Native WebView에서 직접 호출할 수 있는 전역 함수
const receiveMessageFromNative = (messageString: string) => {
  try {
    const message = JSON.parse(messageString);
    addLog('receive', `네이티브에서 수신: ${JSON.stringify(message)}`);

    // 메시지 타입에 따른 처리
    switch (message.type) {
      case 'welcome':
        addLog('info', `환영 메시지: ${message.data.message}`);
        break;
      case 'test':
        addLog('info', `테스트 메시지: ${message.data.message}`);
        break;
      case 'deviceInfoResponse':
        addLog('info', `디바이스 정보: ${JSON.stringify(message.data.device)}`);
        break;
      default:
        addLog('info', `알 수 없는 메시지 타입: ${message.type}`);
    }
  } catch (error) {
    addLog('error', `메시지 파싱 오류: ${error}`);
  }
};

// 로그 추가
const addLog = (type: string, content: string) => {
  const time = new Date().toLocaleTimeString();
  messageLog.value.unshift({ time, type, content });

  // 로그 개수 제한
  if (messageLog.value.length > 20) {
    messageLog.value = messageLog.value.slice(0, 20);
  }
};

// 네이티브 기능 테스트
const testNativeAlert = () => {
  sendToNative({
    type: 'alert',
    data: '웹앱에서 보낸 알림 메시지입니다!',
  });
};

const testNativeNavigation = () => {
  sendToNative({
    type: 'navigate',
    data: { screen: 'settings', params: { from: 'webapp' } },
  });
};

const getDeviceInfo = () => {
  sendToNative({
    type: 'deviceInfo',
    data: { requestId: Date.now() },
  });
};

const clearLog = () => {
  messageLog.value = [];
};

// 생명주기 훅
onMounted(() => {
  detectNativeApp();

  // React Native WebView 메시지 수신 설정
  if (window.ReactNativeWebView) {
    // React Native WebView에서 메시지를 받는 함수 등록
    window.addEventListener('message', handleNativeMessage);
  } else {
    // 일반 브라우저에서 테스트용
    window.addEventListener('message', handleNativeMessage);
  }

  // 전역 함수 등록 (React Native WebView에서 직접 호출 가능)
  (window as any).receiveMessageFromNative = receiveMessageFromNative;

  // 전역 함수 등록 (React Native WebView에서 직접 호출 가능)
  (window as any).receiveMessageFromNative = receiveMessageFromNative;

  // 초기 로그
  addLog('info', '모바일 웹앱이 로드되었습니다.');

  // 유틸리티 함수 활용 예시 로그
  addLog('info', `현재 시간: ${formatDate(currentTime.value, 'yyyy년 MM월 dd일 HH:mm:ss')}`);
  addLog('info', `이메일 유효성: ${isValidEmail(sampleEmail) ? '유효' : '유효하지 않음'}`);
  addLog('info', `제목 케이스 변환: ${toTitleCase(sampleText)}`);

  // 네이티브 앱에 로드 완료 알림
  if (isNativeApp.value) {
    setTimeout(() => {
      sendToNative({
        type: 'webappLoaded',
        data: { timestamp: Date.now() },
      });
    }, 1000);
  }

  // 디버깅을 위한 메시지 수신 확인
  addLog('info', '메시지 리스너가 등록되었습니다.');
  addLog(
    'info',
    `전역 함수 등록: receiveMessageFromNative=${typeof (window as any).receiveMessageFromNative}`
  );
});

onUnmounted(() => {
  window.removeEventListener('message', handleNativeMessage);
});

// TypeScript 타입 정의
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
    receiveMessageFromNative?: (messageString: string) => void;
  }
}
</script>

<style scoped>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 100%;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
}

.subtitle {
  margin: 8px 0 0 0;
  font-size: 14px;
  color: #7f8c8d;
}

.native-status {
  background: rgba(255, 255, 255, 0.9);
  margin: 10px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.native-status.is-native {
  background: rgba(46, 204, 113, 0.1);
  border: 1px solid #2ecc71;
}

.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e74c3c;
  transition: background 0.3s ease;
}

.status-dot.active {
  background: #2ecc71;
}

.main-content {
  padding: 20px;
}

.cards-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.cards-section h2 {
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
}

.card-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.card h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}

.card p {
  margin: 0 0 12px 0;
  font-size: 12px;
  opacity: 0.9;
}

.card-version {
  font-size: 11px;
  opacity: 0.7;
  font-weight: 500;
}

.native-features {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.native-features h2 {
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.feature-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-btn {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.feature-btn:active {
  transform: scale(0.98);
}

.message-log {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.message-log h2 {
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
}

.log-container {
  max-height: 200px;
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
}

.log-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  font-size: 12px;
  border-bottom: 1px solid #e9ecef;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #6c757d;
  font-weight: 500;
  min-width: 60px;
}

.log-type {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
}

.log-type.info {
  background: #d1ecf1;
  color: #0c5460;
}

.log-type.send {
  background: #d4edda;
  color: #155724;
}

.log-type.receive {
  background: #fff3cd;
  color: #856404;
}

.log-type.error {
  background: #f8d7da;
  color: #721c24;
}

.log-content {
  flex: 1;
  word-break: break-all;
}

.clear-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.footer {
  background: rgba(255, 255, 255, 0.95);
  text-align: center;
  padding: 20px;
  margin-top: 20px;
  color: #7f8c8d;
  font-size: 14px;
}

/* 모바일 최적화 */
@media (max-width: 768px) {
  .header h1 {
    font-size: 20px;
  }

  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
  }

  .card {
    padding: 16px;
  }

  .card-icon {
    font-size: 24px;
  }

  .feature-btn {
    padding: 14px;
    font-size: 14px;
  }
}
</style>
