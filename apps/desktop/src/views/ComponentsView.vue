<template>
  <div class="components-view">
    <h1>UI 컴포넌트</h1>
    <p class="description">재사용 가능한 UI 컴포넌트 라이브러리</p>

    <div class="components-grid">
      <div class="component-card">
        <h3>BaseTabs - Underline 스타일</h3>
        <p class="component-description">
          밑줄 스타일의 탭입니다. 선택된 탭에 밑줄이 표시되며, 각 탭의 컨텐츠가 TabPanel로
          렌더링됩니다.
        </p>
        <div class="component-demo">
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTabUnderline"
            variant="underline"
            size="lg"
            underline
          />
        </div>
        <div class="component-code">
          <pre><code>&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="underline"
  size="lg"
  underline
/&gt;</code></pre>
        </div>
      </div>

      <div class="component-card">
        <h3>BaseTabs - Inner 스타일</h3>
        <p class="component-description">
          알약 형태의 탭입니다. 선택된 탭이 배경색으로 강조되며, 컴팩트한 디자인을 제공합니다.
        </p>
        <div class="component-demo">
          <BaseTabs :tabs="tabs" v-model="selectedTabInner" variant="inner" />
        </div>
        <div class="component-code">
          <pre><code>&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="inner"
  size="md"
/&gt;</code></pre>
        </div>
      </div>

      <div class="component-card">
        <h3>BaseTabs - Background 옵션</h3>
        <p class="component-description">
          배경색이 있는 underline 스타일입니다. hasBackground 옵션으로 탭의 배경색을 조정할 수
          있습니다.
        </p>
        <div class="component-demo">
          <BaseTabs
            :tabs="tabs"
            v-model="selectedTabBackground"
            variant="underline"
            size="md"
            :has-background="true"
          />
        </div>
        <div class="component-code">
          <pre><code>&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="underline"
  size="md"
  :has-background="true"
/&gt;</code></pre>
        </div>
      </div>
    </div>

    <div class="usage-section">
      <h2>BaseTabs 사용법</h2>
      <div class="code-block">
        <pre><code>// 컴포넌트 임포트
import { BaseTabs } from '@template/ui'

// 탭 데이터 정의 (새로운 형식)
const tabs = {
  '첫 번째 탭': {
    value: 'tab1',
    component: FirstTabComponent,
  },
  '두 번째 탭': {
    value: 'tab2', 
    component: SecondTabComponent,
  },
  '세 번째 탭': {
    value: 'tab3',
    component: ThirdTabComponent,
  },
  '네 번째 탭': {
    value: 'tab4',
    component: FourthTabComponent,
  },
};

// 1. Underline 스타일 탭 (밑줄)
&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="underline"
  size="lg"
  underline
/&gt;

// 2. Inner 스타일 탭 (알약 형태)
&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="inner"
  size="md"
/&gt;

// 3. 배경색이 있는 underline 탭
&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="underline"
  size="md"
  :has-background="true"
/&gt;

// 모든 옵션
&lt;BaseTabs
  :tabs="tabs"
  v-model="selectedTab"
  variant="underline"          // underline | inner
  size="lg"                   // lg | md
  underline="true"           // underline variant에서 밑
  :has-background="false"     // underline variant에서 배경색 여부
  aria-label="탭 목록"        // 접근성을 위한 라벨
/&gt;</code></pre>
      </div>
    </div>

    <div class="features-section">
      <h2>BaseTabs 디자인 특징</h2>
      <div class="features-grid">
        <div class="feature-item">
          <h4>📏 Underline 스타일</h4>
          <p>
            밑줄로 선택된 탭을 표시하는 클래식한 스타일입니다. size(lg/md)와 underline,
            hasBackground 옵션으로 다양하게 커스터마이징할 수 있습니다.
          </p>
        </div>
        <div class="feature-item">
          <h4>💊 Inner 스타일</h4>
          <p>
            선택된 탭이 배경색으로 강조되는 알약 형태의 컴팩트한 디자인입니다. 좁은 공간에서
            효과적으로 사용할 수 있습니다.
          </p>
        </div>
        <div class="feature-item">
          <h4>🎨 Design Token 기반</h4>
          <p>
            디자인 시스템의 색상 토큰을 활용하여 일관성 있는 시각적 스타일을 제공합니다. CSS 변수를
            통해 테마 변경이 용이합니다.
          </p>
        </div>
        <div class="feature-item">
          <h4>🧩 컴포넌트 기반 컨텐츠</h4>
          <p>
            각 탭의 컨텐츠를 Vue 컴포넌트로 정의할 수 있어, 복잡한 UI도 깔끔하게 구성할 수 있습니다.
            component 속성을 통한 동적 렌더링을 지원합니다.
          </p>
        </div>
        <div class="feature-item">
          <h4>♿ 접근성 지원</h4>
          <p>
            Headless UI의 Tab 컴포넌트를 기반으로 하여 키보드 네비게이션, 스크린 리더 지원, ARIA
            속성 등 웹 접근성 가이드라인을 준수합니다.
          </p>
        </div>
        <div class="feature-item">
          <h4>⚡ 타입 안전성</h4>
          <p>
            TypeScript로 작성되어 컴파일 시점에 타입 검사를 수행하며, props와 이벤트에 대한 완전한
            타입 정의를 제공합니다.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue';
import { BaseTabs } from '@template/ui';

// BaseTabs 관련 상태
const selectedTabUnderline = ref('tab1');
const selectedTabInner = ref('tab1');
const selectedTabBackground = ref('tab1');

// 탭 컨텐츠 컴포넌트들
const FirstTabContent = defineComponent({
  name: 'FirstTabContent',
  template: `
    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <h3 class="text-lg font-semibold text-red-800 mb-2">첫 번째 탭</h3>
      <p class="text-red-700">이것은 첫 번째 탭의 컨텐츠입니다. 새로운 BaseTabs 컴포넌트로 렌더링되고 있습니다.</p>
    </div>
  `,
});

const SecondTabContent = defineComponent({
  name: 'SecondTabContent',
  template: `
    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-800 mb-2">두 번째 탭</h3>
      <p class="text-blue-700">이것은 두 번째 탭의 컨텐츠입니다. 각 탭은 독립적인 Vue 컴포넌트를 가질 수 있습니다.</p>
    </div>
  `,
});

const ThirdTabContent = defineComponent({
  name: 'ThirdTabContent',
  template: `
    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 class="text-lg font-semibold text-green-800 mb-2">세 번째 탭</h3>
      <p class="text-green-700">이것은 세 번째 탭의 컨텐츠입니다. 복잡한 로직과 상태를 가진 컴포넌트도 사용할 수 있습니다.</p>
    </div>
  `,
});

const FourthTabContent = defineComponent({
  name: 'FourthTabContent',
  template: `
    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h3 class="text-lg font-semibold text-purple-800 mb-2">네 번째 탭</h3>
      <p class="text-purple-700">이것은 네 번째 탭의 컨텐츠입니다. TabCategories 인터페이스를 사용하여 구조화되었습니다.</p>
    </div>
  `,
});

// BaseTabs 컴포넌트에 맞는 TabItem[] 배열 형식
const tabs = [
  {
    key: 'tab1',
    label: '첫 번째 탭',
    component: FirstTabContent,
  },
  {
    key: 'tab2',
    label: '두 번째 탭',
    component: SecondTabContent,
  },
  {
    key: 'tab3',
    label: '세 번째 탭',
    component: ThirdTabContent,
  },
  {
    key: 'tab4',
    label: '네 번째 탭',
    component: FourthTabContent,
  },
];
</script>

<style scoped>
.components-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.description {
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.component-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.component-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.component-description {
  color: #7f8c8d;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.component-demo {
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.component-code {
  background: #2c3e50;
  border-radius: 6px;
  overflow: hidden;
}

.component-code pre {
  margin: 0;
  padding: 1rem;
  color: #ecf0f1;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.component-code code {
  background: none;
  padding: 0;
}

.usage-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.usage-section h2 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.code-block {
  background: #2c3e50;
  border-radius: 6px;
  overflow: hidden;
}

.code-block pre {
  margin: 0;
  padding: 1rem;
  color: #ecf0f1;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.code-block code {
  background: none;
  padding: 0;
}

.features-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
}

.features-section h2 {
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-item {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  border-left: 3px solid #3498db;
}

.feature-item h4 {
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 1.1rem;
}

.feature-item p {
  color: #7f8c8d;
  line-height: 1.5;
  margin: 0;
}
</style>
