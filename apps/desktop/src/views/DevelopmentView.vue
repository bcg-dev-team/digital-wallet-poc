<template>
  <div class="development-view">
    <div class="header">
      <h1>🔧 개발 가이드</h1>
      <p>개발 환경 설정과 개발 워크플로우를 확인하세요.</p>
    </div>

    <div class="content">
      <div class="setup-section">
        <h2>개발 환경 설정</h2>
        <div class="setup-grid">
          <div class="setup-card">
            <h3>📋 필수 요구사항</h3>
            <ul class="requirement-list">
              <li><strong>Node.js:</strong> 18.0.0 이상</li>
              <li><strong>pnpm:</strong> 8.0.0 이상</li>
              <li><strong>Git:</strong> 최신 버전</li>
            </ul>
            <div class="code-block">
              <div class="code-header">버전 확인</div>
              <pre><code>node --version
pnpm --version
git --version</code></pre>
            </div>
          </div>

          <div class="setup-card">
            <h3>🚀 프로젝트 설정</h3>
            <div class="code-block">
              <div class="code-header">초기 설정</div>
              <pre><code># 저장소 클론
git clone https://github.com/your-username/vue3-monorepo-template.git
cd vue3-monorepo-template

# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm dev</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="workflow-section">
        <h2>개발 워크플로우</h2>
        <div class="workflow-steps">
          <div class="workflow-step" v-for="(step, index) in workflowSteps" :key="index">
            <div class="step-header">
              <div class="step-number">{{ index + 1 }}</div>
              <h3>{{ step.title }}</h3>
            </div>
            <p>{{ step.description }}</p>
            <div class="step-commands">
              <div class="command-item" v-for="cmd in step.commands" :key="cmd.label">
                <span class="command-label">{{ cmd.label }}:</span>
                <code class="command-code">{{ cmd.command }}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="scripts-section">
        <h2>주요 스크립트</h2>
        <div class="scripts-grid">
          <div class="script-card" v-for="script in scripts" :key="script.name">
            <div class="script-header">
              <h3>{{ script.name }}</h3>
              <span class="script-command">pnpm {{ script.command }}</span>
            </div>
            <p>{{ script.description }}</p>
            <div class="script-examples" v-if="script.examples">
              <h4>사용 예시:</h4>
              <ul>
                <li v-for="example in script.examples" :key="example">{{ example }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="tools-section">
        <h2>개발 도구</h2>
        <div class="tools-grid">
          <div class="tool-card" v-for="tool in tools" :key="tool.name">
            <div class="tool-icon">{{ tool.icon }}</div>
            <h3>{{ tool.name }}</h3>
            <p>{{ tool.description }}</p>
            <div class="tool-config" v-if="tool.config">
              <h4>설정 파일:</h4>
              <code>{{ tool.config }}</code>
            </div>
          </div>
        </div>
      </div>

      <div class="best-practices">
        <h2>베스트 프랙티스</h2>
        <div class="practices-grid">
          <div class="practice-card" v-for="practice in bestPractices" :key="practice.title">
            <h3>{{ practice.title }}</h3>
            <p>{{ practice.description }}</p>
            <div class="practice-example" v-if="practice.example">
              <h4>예시:</h4>
              <div class="code-block">
                <pre><code>{{ practice.example }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 개발 가이드 페이지 컴포넌트
 *
 * 개발 환경 설정과 워크플로우를 안내합니다.
 */

const workflowSteps = [
  {
    title: '브랜치 생성',
    description: '새로운 기능이나 버그 수정을 위한 브랜치를 생성합니다.',
    commands: [
      { label: '새 브랜치 생성', command: 'git checkout -b feature/new-feature' },
      { label: '브랜치 확인', command: 'git branch' },
    ],
  },
  {
    title: '개발 및 테스트',
    description: '코드를 작성하고 로컬에서 테스트를 실행합니다.',
    commands: [
      { label: '개발 서버 시작', command: 'pnpm dev' },
      { label: '타입 체크', command: 'pnpm type-check' },
      { label: '린트 검사', command: 'pnpm lint:check' },
      { label: '테스트 실행', command: 'pnpm test' },
    ],
  },
  {
    title: '커밋 및 푸시',
    description: '변경사항을 커밋하고 원격 저장소에 푸시합니다.',
    commands: [
      { label: '변경사항 확인', command: 'git status' },
      { label: '스테이징', command: 'git add .' },
      { label: '커밋', command: 'git commit -m "feat: 새로운 기능 추가"' },
      { label: '푸시', command: 'git push origin feature/new-feature' },
    ],
  },
  {
    title: '빌드 및 배포',
    description: '프로덕션 빌드를 생성하고 배포합니다.',
    commands: [
      { label: '전체 빌드', command: 'pnpm build' },
      { label: '패키지만 빌드', command: 'pnpm build:packages' },
      { label: '앱만 빌드', command: 'pnpm build:apps' },
    ],
  },
];

const scripts = [
  {
    name: '개발 서버',
    command: 'dev',
    description: '모든 패키지의 개발 서버를 시작합니다.',
    examples: ['pnpm dev', 'pnpm dev:desktop', 'pnpm dev:mobile'],
  },
  {
    name: '빌드',
    command: 'build',
    description: '의존성 순서에 따라 모든 패키지를 빌드합니다.',
    examples: ['pnpm build', 'pnpm build:parallel', 'pnpm build:packages'],
  },
  {
    name: '테스트',
    command: 'test',
    description: '모든 패키지의 테스트를 실행합니다.',
    examples: ['pnpm test', 'pnpm test --watch', 'pnpm test --coverage'],
  },
  {
    name: '린트',
    command: 'lint',
    description: 'ESLint를 사용하여 코드 품질을 검사합니다.',
    examples: ['pnpm lint', 'pnpm lint:check', 'pnpm lint --fix'],
  },
  {
    name: '타입 체크',
    command: 'type-check',
    description: 'TypeScript 타입 검사를 실행합니다.',
    examples: ['pnpm type-check', 'pnpm type-check --watch'],
  },
  {
    name: '정리',
    command: 'clean',
    description: '빌드 산출물과 캐시를 정리합니다.',
    examples: ['pnpm clean', 'pnpm clean:all'],
  },
];

const tools = [
  {
    name: 'TypeScript',
    icon: '📝',
    description: '타입 안전성을 제공하는 JavaScript의 상위 집합입니다.',
    config: 'tsconfig.json, tsconfig.base.json',
  },
  {
    name: 'Vite',
    icon: '⚡',
    description: '빠른 개발 서버와 빌드 도구입니다.',
    config: 'vite.config.ts, shared/config/vite.common.ts',
  },
  {
    name: 'ESLint',
    icon: '🔍',
    description: '코드 품질과 일관성을 유지하는 린터입니다.',
    config: 'eslint.config.js',
  },
  {
    name: 'Prettier',
    icon: '🎨',
    description: '코드 포맷팅을 자동화하는 도구입니다.',
    config: '.prettierrc',
  },
  {
    name: 'Storybook',
    icon: '📚',
    description: 'UI 컴포넌트를 독립적으로 개발하고 문서화합니다.',
    config: '.storybook/main.ts',
  },
  {
    name: 'pnpm',
    icon: '📦',
    description: '빠르고 효율적인 패키지 매니저입니다.',
    config: 'pnpm-workspace.yaml',
  },
];

const bestPractices = [
  {
    title: '커밋 메시지 규칙',
    description: 'Conventional Commits 규칙을 따라 명확하고 일관된 커밋 메시지를 작성하세요.',
    example: `feat(packages/ui): 새로운 버튼 컴포넌트 추가

- Primary, Secondary, Tertiary 변형 지원
- 접근성 속성 추가
- Storybook 문서화

Closes #123`,
  },
  {
    title: '타입 안전성',
    description: '모든 함수와 변수에 명시적인 타입을 정의하고, any 타입 사용을 피하세요.',
    example: `// 좋은 예시
function getUserById(id: string): Promise<User | null> {
  return apiClient.get(\`/users/\${id}\`);
}

// 피해야 할 예시
function getUserById(id: any): any {
  return apiClient.get(\`/users/\${id}\`);
}`,
  },
  {
    title: '컴포넌트 설계',
    description: '단일 책임 원칙을 따르고, 재사용 가능한 컴포넌트를 만드세요.',
    example: `// 좋은 예시 - Props 인터페이스 정의
interface Props {
  variant: 'primary' | 'secondary';
  size: ComponentSize; // 'lg' | 'md' | 'sm'
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
});`,
  },
  {
    title: '패키지 의존성',
    description: '순환 의존성을 피하고, 명확한 의존성 방향을 유지하세요.',
    example: `// 올바른 의존성 방향
packages/types/     ← 기반 패키지
packages/utils/     ← types에 의존
packages/api/       ← types, utils에 의존
packages/ui/        ← types에 의존
apps/desktop/       ← 모든 패키지 사용`,
  },
];
</script>

<style scoped>
.development-view {
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

.setup-section h2,
.workflow-section h2,
.scripts-section h2,
.tools-section h2,
.best-practices h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.setup-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.setup-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.setup-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.requirement-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.requirement-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f1f3f4;
  color: #6c757d;
}

.requirement-list li:last-child {
  border-bottom: none;
}

.code-block {
  background: #1e1e1e;
  border-radius: 0.5rem;
  overflow: hidden;
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

.workflow-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.workflow-step {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.step-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
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

.step-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.workflow-step p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.step-commands {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.command-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border-left: 4px solid #667eea;
}

.command-label {
  font-weight: 500;
  color: #2c3e50;
  min-width: 100px;
}

.command-code {
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  color: #2c3e50;
  background: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.scripts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.script-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.script-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.script-header h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.script-command {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
}

.script-card p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.script-examples h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.script-examples ul {
  list-style: none;
  padding: 0;
}

.script-examples li {
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
  color: #6c757d;
  padding: 0.25rem 0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.tool-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.tool-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tool-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.tool-card p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tool-config h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.tool-config code {
  background: #f8f9fa;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #2c3e50;
}

.practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.practice-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.practice-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.practice-card p {
  color: #6c757d;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.practice-example h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .setup-grid,
  .scripts-grid,
  .tools-grid,
  .practices-grid {
    grid-template-columns: 1fr;
  }

  .step-header {
    flex-direction: column;
    text-align: center;
  }

  .script-header {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .command-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .command-label {
    min-width: auto;
  }
}
</style>
