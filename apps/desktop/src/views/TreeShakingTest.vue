<template>
  <div class="tree-shaking-test">
    <h2>🌳 Tree Shaking 테스트</h2>
    <p class="description">
      특정 함수만 import하여 Tree shaking 효과를 검증합니다. 브라우저 개발자 도구의 Network 탭에서
      실제 로드되는 번들 크기를 확인하세요.
    </p>

    <div class="test-section">
      <h3>✅ 사용하는 함수들 (번들에 포함됨)</h3>
      <div class="function-list">
        <div class="function-item"><code>toCamelCase</code> - 카멜케이스 변환</div>
        <div class="function-item"><code>toPascalCase</code> - 파스칼케이스 변환</div>
        <div class="function-item"><code>toKebabCase</code> - 케밥케이스 변환</div>
        <div class="function-item"><code>isValidEmail</code> - 이메일 검증</div>
      </div>
    </div>

    <div class="test-section">
      <h3>❌ 사용하지 않는 함수들 (Tree shaking으로 제거됨)</h3>
      <div class="function-list">
        <div class="function-item"><code>toSnakeCase</code> - 스네이크케이스 변환</div>
        <div class="function-item"><code>toTitleCase</code> - 제목 케이스 변환</div>
        <div class="function-item"><code>truncate</code> - 문자열 자르기</div>
        <div class="function-item"><code>extractNumbers</code> - 숫자 추출</div>
        <div class="function-item"><code>formatDate</code> - 날짜 포맷팅</div>
        <div class="function-item"><code>calculateAge</code> - 나이 계산</div>
      </div>
    </div>

    <div class="test-section">
      <h3>🧪 실제 테스트</h3>
      <div class="input-group">
        <label>테스트 문자열:</label>
        <input v-model="testInput" placeholder="hello world example" />
      </div>

      <div class="results">
        <div class="result-item"><strong>Camel Case:</strong> {{ camelCaseResult }}</div>
        <div class="result-item"><strong>Pascal Case:</strong> {{ pascalCaseResult }}</div>
        <div class="result-item"><strong>Kebab Case:</strong> {{ kebabCaseResult }}</div>
        <div class="result-item"><strong>Email Valid:</strong> {{ emailValidResult }}</div>
      </div>
    </div>

    <div class="test-section">
      <h3>📊 번들 분석</h3>
      <div class="bundle-info">
        <p>
          <strong>현재 번들 크기:</strong>
          <span class="bundle-size">{{ bundleSize }}</span>
        </p>
        <p>
          <strong>Tree Shaking 효과:</strong>
          사용하지 않는 함수들이 번들에서 제거되어 번들 크기가 최적화됩니다.
        </p>
        <div class="instructions">
          <h4>확인 방법:</h4>
          <ol>
            <li>브라우저 개발자 도구 열기 (F12)</li>
            <li>Network 탭으로 이동</li>
            <li>페이지 새로고침</li>
            <li>JavaScript 파일들의 크기 확인</li>
            <li>UtilsExample.vue와 비교하여 번들 크기 차이 확인</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Tree shaking 테스트를 위해 특정 함수만 import
import { toCamelCase, toPascalCase, toKebabCase, isValidEmail } from '@template/utils';

// 사용하지 않는 함수들은 import하지 않음 (Tree shaking 테스트)
// import { toSnakeCase, toTitleCase, truncate, extractNumbers, formatDate, calculateAge } from '@template/utils';

const testInput = ref('hello world example');

// 사용하는 함수들의 결과
const camelCaseResult = computed(() => toCamelCase(testInput.value));
const pascalCaseResult = computed(() => toPascalCase(testInput.value));
const kebabCaseResult = computed(() => toKebabCase(testInput.value));
const emailValidResult = computed(() => isValidEmail(testInput.value));

// 번들 크기 정보 (실제로는 빌드 후 확인)
const bundleSize = ref('실시간 확인 불가 (빌드 후 확인)');
</script>

<style scoped>
.tree-shaking-test {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.description {
  color: #7f8c8d;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #3498db;
}

.test-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.test-section h3 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.function-list {
  display: grid;
  gap: 0.5rem;
}

.function-item {
  padding: 0.5rem;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.function-item code {
  background-color: #f1f3f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: #d73a49;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.results {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.result-item {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-family: monospace;
}

.result-item strong {
  color: #007acc;
  margin-right: 0.5rem;
}

.bundle-info {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.bundle-size {
  color: #28a745;
  font-weight: bold;
}

.instructions {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
}

.instructions h4 {
  margin-top: 0;
  color: #856404;
}

.instructions ol {
  margin-bottom: 0;
  color: #856404;
}

.instructions li {
  margin-bottom: 0.25rem;
}
</style>
