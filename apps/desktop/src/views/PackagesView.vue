<template>
  <div class="packages-view">
    <div class="header">
      <h1>📦 패키지 구조</h1>
      <p>모노레포의 패키지 구조와 의존성 관계를 자세히 살펴보세요.</p>
    </div>

    <div class="content">
      <div class="package-overview">
        <h2>패키지 개요</h2>
        <div class="package-grid">
          <div class="package-card" v-for="pkg in packages" :key="pkg.name">
            <div class="package-header">
              <div class="package-icon">{{ pkg.icon }}</div>
              <div class="package-info">
                <h3>{{ pkg.name }}</h3>
                <span class="package-version">{{ pkg.version }}</span>
              </div>
            </div>
            <p class="package-description">{{ pkg.description }}</p>
            <div class="package-deps" v-if="pkg.dependencies.length">
              <span class="deps-label">의존성:</span>
              <div class="deps-list">
                <span v-for="dep in pkg.dependencies" :key="dep" class="dep-tag">{{ dep }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dependency-graph">
        <h2>의존성 그래프</h2>
        <div class="graph-container">
          <div class="graph-level">
            <div class="level-label">애플리케이션 레벨</div>
            <div class="level-packages">
              <div class="graph-package app-package">
                <span class="package-name">apps/desktop</span>
                <div class="deps-arrows">
                  <div class="arrow" v-for="dep in ['types', 'utils', 'api', 'ui']" :key="dep">
                    ↓ {{ dep }}
                  </div>
                </div>
              </div>
              <div class="graph-package app-package">
                <span class="package-name">apps/mobile</span>
                <div class="deps-arrows">
                  <div class="arrow" v-for="dep in ['types', 'utils', 'api', 'ui']" :key="dep">
                    ↓ {{ dep }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="graph-level">
            <div class="level-label">라이브러리 레벨</div>
            <div class="level-packages">
              <div class="graph-package lib-package">
                <span class="package-name">packages/ui</span>
                <div class="deps-arrows">
                  <div class="arrow">↓ types</div>
                </div>
              </div>
              <div class="graph-package lib-package">
                <span class="package-name">packages/api</span>
                <div class="deps-arrows">
                  <div class="arrow" v-for="dep in ['types', 'utils']" :key="dep">↓ {{ dep }}</div>
                </div>
              </div>
              <div class="graph-package lib-package">
                <span class="package-name">packages/utils</span>
                <div class="deps-arrows">
                  <div class="arrow">↓ types</div>
                </div>
              </div>
            </div>
          </div>

          <div class="graph-level">
            <div class="level-label">기반 레벨</div>
            <div class="level-packages">
              <div class="graph-package base-package">
                <span class="package-name">packages/types</span>
                <div class="deps-arrows">
                  <div class="arrow">기반 패키지</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="package-details">
        <h2>패키지 상세 정보</h2>
        <div class="details-tabs">
          <button
            v-for="pkg in packages"
            :key="pkg.name"
            :class="['tab-button', { active: selectedPackage === pkg.name }]"
            @click="selectedPackage = pkg.name"
          >
            {{ pkg.displayName }}
          </button>
        </div>

        <div class="detail-content" v-if="selectedPackage">
          <div class="detail-card">
            <h3>{{ getPackage(selectedPackage)?.displayName }}</h3>
            <div class="detail-section">
              <h4>📁 디렉토리 구조</h4>
              <div class="code-block">
                <pre><code>{{ getPackage(selectedPackage)?.structure }}</code></pre>
              </div>
            </div>

            <div class="detail-section">
              <h4>🔧 주요 기능</h4>
              <ul class="feature-list">
                <li v-for="feature in getPackage(selectedPackage)?.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="detail-section">
              <h4>📦 사용법</h4>
              <div class="code-block">
                <pre><code>{{ getPackage(selectedPackage)?.usage }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="build-process">
        <h2>빌드 프로세스</h2>
        <div class="process-steps">
          <div class="process-step" v-for="(step, index) in buildSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h4>{{ step.title }}</h4>
              <p>{{ step.description }}</p>
              <div class="step-command" v-if="step.command">
                <code>{{ step.command }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * 패키지 구조 페이지 컴포넌트
 *
 * 모노레포의 패키지 구조와 의존성 관계를 시각적으로 보여줍니다.
 */

const selectedPackage = ref('types');

const packages = [
  {
    name: 'types',
    displayName: 'Types',
    version: '0.1.0',
    icon: '📝',
    description: 'TypeScript 타입 정의를 제공하는 기반 패키지입니다.',
    dependencies: [],
    structure: `packages/types/
├── src/
│   ├── api.ts          # API 관련 타입
│   ├── auth.ts         # 인증 관련 타입
│   ├── common.ts       # 공통 타입
│   ├── ui.ts           # UI 컴포넌트 타입
│   ├── user.ts         # 사용자 관련 타입
│   └── index.ts        # 메인 export
├── package.json
└── tsconfig.json`,
    features: [
      '공통 TypeScript 타입 정의',
      'API 응답/요청 타입',
      'UI 컴포넌트 Props 타입',
      '인증 및 사용자 타입',
      '재사용 가능한 유틸리티 타입',
    ],
    usage: `import type { User, ApiResponse } from '@template/types';

// 타입 사용 예시
const user: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com'
};

const response: ApiResponse<User> = {
  success: true,
  data: user,
  message: 'Success'
};`,
  },
  {
    name: 'utils',
    displayName: 'Utils',
    version: '0.1.0',
    icon: '🔧',
    description: '공통 유틸리티 함수들과 composables를 제공합니다.',
    dependencies: ['types'],
    structure: `packages/utils/
├── src/
│   ├── composables/    # Vue composables
│   │   ├── useDebounce.ts
│   │   └── index.ts
│   ├── crypto.ts       # 암호화 유틸리티
│   ├── date.ts         # 날짜 유틸리티
│   ├── format.ts       # 포맷팅 유틸리티
│   ├── storage.ts      # 스토리지 유틸리티
│   ├── string.ts       # 문자열 유틸리티
│   ├── validation.ts   # 검증 유틸리티
│   └── index.ts        # 메인 export`,
    features: [
      'Vue 3 Composables',
      '날짜/시간 처리 유틸리티',
      '문자열 포맷팅',
      '로컬 스토리지 관리',
      '폼 검증 함수',
      '암호화 유틸리티',
    ],
    usage: `import { formatDate, useDebounce } from '@template/utils';

// 유틸리티 함수 사용
const formattedDate = formatDate(new Date(), 'YYYY-MM-DD');

// Composable 사용
const { debouncedValue } = useDebounce(searchTerm, 300);`,
  },
  {
    name: 'api',
    displayName: 'API',
    version: '0.1.0',
    icon: '🌐',
    description: 'API 통신을 위한 클라이언트와 서비스를 제공합니다.',
    dependencies: ['types', 'utils'],
    structure: `packages/api/
├── src/
│   ├── client/
│   │   ├── ApiClient.ts    # HTTP 클라이언트
│   │   └── index.ts
│   ├── services/           # API 서비스들
│   │   └── index.ts
│   ├── types/              # API 전용 타입
│   │   └── index.ts
│   └── index.ts            # 메인 export`,
    features: [
      'HTTP 클라이언트',
      '인터셉터 지원',
      '에러 핸들링',
      '타입 안전한 API 호출',
      '서비스 레이어 패턴',
    ],
    usage: `import { ApiClient } from '@template/api';

const apiClient = new ApiClient({
  baseURL: 'https://api.example.com',
  timeout: 5000
});

// API 호출
const user = await apiClient.get('/users/1');`,
  },
  {
    name: 'ui',
    displayName: 'UI',
    version: '0.1.0',
    icon: '🎨',
    description: '재사용 가능한 Vue 3 UI 컴포넌트 라이브러리입니다.',
    dependencies: ['types'],
    structure: `packages/ui/
├── src/
│   ├── components/         # Vue 컴포넌트들
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   ├── BaseForm.vue
│   │   └── index.ts
│   ├── composables/        # UI 관련 composables
│   │   ├── useTheme.ts
│   │   ├── useModal.ts
│   │   └── index.ts
│   ├── styles/             # 스타일 토큰
│   │   └── tokens.css
│   └── index.ts            # 메인 export`,
    features: [
      '재사용 가능한 컴포넌트',
      'TypeScript 지원',
      '스타일 토큰 시스템',
      '테마 지원',
      'Storybook 문서화',
      '접근성 고려',
    ],
    usage: `import { BaseButton, BaseInput } from '@template/ui';

// 컴포넌트 사용
<BaseButton variant="primary" @click="handleClick">
  클릭하세요
</BaseButton>

<BaseInput v-model="value" placeholder="입력하세요" />`,
  },
];

const buildSteps = [
  {
    title: '의존성 순환 검사',
    description: '패키지 간 순환 의존성이 있는지 검사합니다.',
    command: 'npx madge --circular packages/',
  },
  {
    title: 'Types 패키지 빌드',
    description: '기반이 되는 타입 정의를 먼저 빌드합니다.',
    command: 'cd packages/types && pnpm build',
  },
  {
    title: 'Utils 패키지 빌드',
    description: '유틸리티 함수들을 빌드합니다.',
    command: 'cd packages/utils && pnpm build',
  },
  {
    title: 'API 패키지 빌드',
    description: 'API 클라이언트를 빌드합니다.',
    command: 'cd packages/api && pnpm build',
  },
  {
    title: 'UI 패키지 빌드',
    description: 'UI 컴포넌트 라이브러리를 빌드합니다.',
    command: 'cd packages/ui && pnpm build',
  },
  {
    title: '애플리케이션 빌드',
    description: '최종 애플리케이션들을 빌드합니다.',
    command: 'cd apps/desktop && pnpm build',
  },
];

const getPackage = (name: string) => {
  return packages.find((pkg) => pkg.name === name);
};
</script>

<style scoped>
.packages-view {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.header p {
  font-size: 1.125rem;
  color: #6c757d;
  max-width: 600px;
  margin: 0 auto;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.package-overview h2,
.dependency-graph h2,
.package-details h2,
.build-process h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.package-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.package-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.2s ease;
}

.package-card:hover {
  transform: translateY(-2px);
  border-color: #667eea;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.package-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.package-icon {
  font-size: 2rem;
}

.package-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.package-version {
  font-size: 0.875rem;
  color: #6c757d;
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.package-description {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.package-deps {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.deps-label {
  font-size: 0.875rem;
  color: #6c757d;
  font-weight: 500;
}

.deps-list {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.dep-tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.graph-container {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.graph-level {
  margin-bottom: 2rem;
}

.graph-level:last-child {
  margin-bottom: 0;
}

.level-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.125rem;
}

.level-packages {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.graph-package {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  min-width: 150px;
}

.app-package {
  background: #e8f5e8;
  border: 2px solid #4caf50;
}

.lib-package {
  background: #fff3e0;
  border: 2px solid #ff9800;
}

.base-package {
  background: #f3e5f5;
  border: 2px solid #9c27b0;
}

.package-name {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.875rem;
}

.deps-arrows {
  margin-top: 0.5rem;
}

.arrow {
  font-size: 0.75rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.details-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.tab-button:hover {
  border-color: #667eea;
  color: #667eea;
}

.tab-button.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.detail-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.detail-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.code-block {
  background: #1e1e1e;
  border-radius: 0.5rem;
  overflow: hidden;
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

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f3f4;
  color: #6c757d;
}

.feature-list li:last-child {
  border-bottom: none;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.process-step {
  display: flex;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.step-number {
  background: #667eea;
  color: white;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.step-content p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.step-command {
  background: #f8f9fa;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border-left: 4px solid #667eea;
}

.step-command code {
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .package-grid {
    grid-template-columns: 1fr;
  }

  .level-packages {
    flex-direction: column;
    align-items: center;
  }

  .details-tabs {
    justify-content: center;
  }

  .process-step {
    flex-direction: column;
    text-align: center;
  }
}
</style>
