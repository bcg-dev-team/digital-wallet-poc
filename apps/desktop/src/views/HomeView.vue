<template>
  <div class="home">
    <h1 class="title">Vue 3 Monorepo Template</h1>
    <p class="subtitle">모던 Vue 3 모노레포 템플릿에 오신 것을 환영합니다!</p>

    <div class="features">
      <div class="feature-card">
        <h3>📦 모노레포 구조</h3>
        <p>공통 패키지와 앱을 효율적으로 관리할 수 있는 모노레포 구조</p>
      </div>

      <div class="feature-card">
        <h3>⚡ Vue 3 + TypeScript</h3>
        <p>Composition API와 TypeScript를 활용한 현대적인 개발 경험</p>
      </div>

      <div class="feature-card">
        <h3>🎨 UI 컴포넌트</h3>
        <p>재사용 가능한 UI 컴포넌트 라이브러리</p>
      </div>

      <div class="feature-card">
        <h3>🔧 개발 도구</h3>
        <p>ESLint, Prettier, Vitest 등 완벽한 개발 환경</p>
      </div>
    </div>

    <div class="actions">
      <BaseButton variant="contained" color="primary" @click="showWelcome = !showWelcome">
        {{ showWelcome ? '숨기기' : '환영 메시지 보기' }}
      </BaseButton>
    </div>

    <div v-if="showWelcome" class="welcome-message">
      <h2>🚀 시작하기</h2>
      <p>이 템플릿을 사용하여 멋진 Vue 3 애플리케이션을 만들어보세요!</p>
      <ul>
        <li>패키지별 독립적인 개발 및 배포</li>
        <li>공통 타입 및 유틸리티 재사용</li>
        <li>모던 개발 도구 및 워크플로우</li>
        <li>확장 가능한 아키텍처</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseButton } from '@template/ui';
import { ref } from 'vue';

const showWelcome = ref(false);
</script>

<style scoped>
.home {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 3rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #6c757d;
  line-height: 1.6;
}

.actions {
  margin-bottom: 2rem;
}

.welcome-message {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: left;
  margin-top: 2rem;
}

.welcome-message h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.welcome-message p {
  color: #6c757d;
  margin-bottom: 1rem;
}

.welcome-message ul {
  color: #6c757d;
  line-height: 1.8;
}

.welcome-message li {
  margin-bottom: 0.5rem;
}
</style>
