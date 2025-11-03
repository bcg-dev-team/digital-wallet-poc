<template>
  <div class="getting-started">
    <div class="hero-section">
      <h1>Vue 3 Monorepo Template</h1>
      <p class="hero-description">빠른 초기 구축을 위한 Vue 3 모노레포 템플릿입니다.</p>
      <div class="hero-badges">
        <span class="badge">Vue 3</span>
        <span class="badge">TypeScript</span>
        <span class="badge">Vite</span>
        <span class="badge">Monorepo</span>
        <span class="badge">Performance</span>
      </div>
    </div>

    <div class="content-section">
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🚀</div>
          <h3>빠른 개발</h3>
          <p>Vite의 빠른 HMR과 TypeScript의 타입 안전성을 통해 효율적인 개발 환경을 제공합니다.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📦</div>
          <h3>모노레포 구조</h3>
          <p>패키지 간 의존성 관리와 코드 재사용성을 위한 최적화된 모노레포 구조입니다.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>UI 컴포넌트</h3>
          <p>
            재사용 가능한 UI 컴포넌트 라이브러리와 Storybook을 통한 컴포넌트 문서화를 지원합니다.
          </p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🔧</div>
          <h3>개발 도구</h3>
          <p>ESLint, Prettier, TypeScript 설정이 미리 구성되어 있어 코드 품질을 보장합니다.</p>
        </div>
      </div>

      <div class="quick-start">
        <h2>빠른 시작</h2>
        <div class="code-block">
          <div class="code-header">
            <span>터미널</span>
          </div>
          <pre><code># 저장소 클론
git clone https://github.com/your-username/vue3-monorepo-template.git
cd vue3-monorepo-template

# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm dev

# 빌드
pnpm build

# 테스트 실행
pnpm test</code></pre>
        </div>
      </div>

      <div class="project-structure">
        <h2>프로젝트 구조</h2>
        <div class="structure-tree">
          <div class="tree-item">
            <span class="tree-icon">📁</span>
            <span class="tree-name">apps/</span>
            <span class="tree-desc">Vue 애플리케이션들</span>
          </div>
          <div class="tree-item indent">
            <span class="tree-icon">🖥️</span>
            <span class="tree-name">desktop/</span>
            <span class="tree-desc">데스크톱 애플리케이션</span>
          </div>
          <div class="tree-item indent">
            <span class="tree-icon">📱</span>
            <span class="tree-name">mobile/</span>
            <span class="tree-desc">모바일 애플리케이션</span>
          </div>
          <div class="tree-item">
            <span class="tree-icon">📦</span>
            <span class="tree-name">packages/</span>
            <span class="tree-desc">공유 패키지들</span>
          </div>
          <div class="tree-item indent">
            <span class="tree-icon">🎨</span>
            <span class="tree-name">ui/</span>
            <span class="tree-desc">UI 컴포넌트 라이브러리</span>
          </div>
          <div class="tree-item indent">
            <span class="tree-icon">🔧</span>
            <span class="tree-name">utils/</span>
            <span class="tree-desc">유틸리티 함수들</span>
          </div>
          <div class="tree-item indent">
            <span class="tree-icon">🌐</span>
            <span class="tree-name">api/</span>
            <span class="tree-desc">API 클라이언트</span>
          </div>
          <div class="tree-item indent">
            <span class="tree-icon">📝</span>
            <span class="tree-name">types/</span>
            <span class="tree-desc">TypeScript 타입 정의</span>
          </div>
        </div>
      </div>

      <div class="next-steps">
        <h2>다음 단계</h2>
        <div class="steps-grid">
          <router-link to="/packages" class="step-card">
            <h3>📦 패키지 구조 살펴보기</h3>
            <p>모노레포의 패키지 구조와 의존성 관계를 자세히 알아보세요.</p>
          </router-link>

          <router-link to="/development" class="step-card">
            <h3>🔧 개발 가이드</h3>
            <p>개발 환경 설정과 개발 워크플로우를 확인하세요.</p>
          </router-link>

          <router-link to="/components" class="step-card">
            <h3>🎨 컴포넌트 데모</h3>
            <p>제공된 UI 컴포넌트들을 살펴보고 사용법을 익히세요.</p>
          </router-link>

          <router-link to="/api-examples" class="step-card">
            <h3>🌐 API 예제</h3>
            <p>API 클라이언트 사용법과 예제를 확인하세요.</p>
          </router-link>

          <router-link to="/utils-example" class="step-card">
            <h3>🔧 유틸리티 예제</h3>
            <p>유틸리티 함수들의 실제 사용 예시를 확인하세요.</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 시작하기 페이지 컴포넌트
 *
 * 템플릿 소개 및 빠른 시작 가이드를 제공합니다.
 */
</script>

<style scoped>
.getting-started {
  max-width: 1000px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 1rem;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.25rem;
  color: #5a6c7d;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-badges {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.badge {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #6c757d;
  line-height: 1.6;
}

.quick-start h2,
.project-structure h2,
.next-steps h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.code-block {
  background: #1e1e1e;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 2rem;
}

.code-header {
  background: #2d2d2d;
  padding: 0.75rem 1rem;
  color: #d4d4d4;
  font-size: 0.875rem;
  font-weight: 500;
}

.code-block pre {
  margin: 0;
  padding: 1.5rem;
  color: #d4d4d4;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  overflow-x: auto;
}

.structure-tree {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tree-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f3f4;
}

.tree-item:last-child {
  border-bottom: none;
}

.tree-item.indent {
  margin-left: 2rem;
}

.tree-icon {
  font-size: 1.25rem;
  width: 1.5rem;
  text-align: center;
}

.tree-name {
  font-weight: 600;
  color: #2c3e50;
  min-width: 120px;
}

.tree-desc {
  color: #6c757d;
  font-size: 0.875rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.step-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.step-card:hover {
  transform: translateY(-2px);
  border-color: #667eea;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.step-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.step-card p {
  color: #6c757d;
  line-height: 1.6;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .steps-grid {
    grid-template-columns: 1fr;
  }

  .tree-item.indent {
    margin-left: 1rem;
  }
}
</style>
