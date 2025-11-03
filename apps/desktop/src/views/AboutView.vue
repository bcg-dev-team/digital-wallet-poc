<template>
  <div class="about">
    <h1 class="title">프로젝트 소개</h1>

    <div class="content">
      <section class="section">
        <h2>📋 프로젝트 개요</h2>
        <p>
          이 프로젝트는 Vue 3와 TypeScript를 기반으로 한 모노레포 템플릿입니다. 현대적인 웹 개발
          도구와 베스트 프랙티스를 적용하여 확장 가능하고 유지보수가 용이한 애플리케이션을 구축할 수
          있도록 설계되었습니다.
        </p>
      </section>

      <section class="section">
        <h2>🏗️ 아키텍처</h2>
        <div class="architecture">
          <div class="arch-item">
            <h3>📦 Packages</h3>
            <ul>
              <li><strong>@template/types</strong> - 공통 타입 정의</li>
              <li><strong>@template/utils</strong> - 유틸리티 함수</li>
              <li><strong>@template/ui</strong> - Vue UI 컴포넌트</li>
              <li><strong>@template/api</strong> - API 통신 라이브러리</li>
            </ul>
          </div>

          <div class="arch-item">
            <h3>🖥️ Apps</h3>
            <ul>
              <li><strong>@template/desktop</strong> - 데스크톱 웹 앱</li>
              <li><strong>@template/mobile</strong> - 모바일 웹 앱</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>🛠️ 기술 스택</h2>
        <div class="tech-stack">
          <div class="tech-category">
            <h3>Frontend</h3>
            <ul>
              <li>Vue 3 (Composition API)</li>
              <li>TypeScript</li>
              <li>Vue Router</li>
              <li>Pinia (상태 관리)</li>
            </ul>
          </div>

          <div class="tech-category">
            <h3>Build Tools</h3>
            <ul>
              <li>Vite</li>
              <li>ESLint</li>
              <li>Prettier</li>
              <li>Vitest</li>
            </ul>
          </div>

          <div class="tech-category">
            <h3>Package Manager</h3>
            <ul>
              <li>pnpm</li>
              <li>Workspace</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>🚀 시작하기</h2>
        <div class="getting-started">
          <h3>개발 서버 실행</h3>
          <pre><code>pnpm dev</code></pre>

          <h3>빌드</h3>
          <pre><code>pnpm build</code></pre>

          <h3>테스트</h3>
          <pre><code>pnpm test</code></pre>

          <h3>린트</h3>
          <pre><code>pnpm lint</code></pre>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// About 뷰 컴포넌트
</script>

<style scoped>
.about {
  max-width: 900px;
  margin: 0 auto;
}

.title {
  font-size: 2.5rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 3rem;
}

.content {
  text-align: left;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #42b883;
  padding-bottom: 0.5rem;
}

.section p {
  color: #6c757d;
  line-height: 1.8;
  font-size: 1.1rem;
}

.architecture {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.arch-item {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.arch-item h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.arch-item ul {
  list-style: none;
  padding: 0;
}

.arch-item li {
  color: #6c757d;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.arch-item li::before {
  content: '•';
  color: #42b883;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.tech-category {
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tech-category h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.tech-category ul {
  list-style: none;
  padding: 0;
}

.tech-category li {
  color: #6c757d;
  margin-bottom: 0.5rem;
  text-align: center;
}

.getting-started h3 {
  color: #2c3e50;
  margin: 1.5rem 0 0.5rem 0;
}

.getting-started pre {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.getting-started code {
  color: #e83e8c;
  font-family: 'Courier New', monospace;
}
</style>
