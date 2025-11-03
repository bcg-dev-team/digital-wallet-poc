<template>
  <div class="theme-test">
    <h1>테마 테스트</h1>

    <div class="theme-info">
      <p>
        현재 테마: <strong>{{ themeStore.isDark ? '다크' : '라이트' }}</strong>
      </p>
      <ThemeToggle />
    </div>

    <div class="component-examples">
      <h2>컴포넌트 예시</h2>

      <div class="example-section">
        <h3>버튼 컴포넌트</h3>
        <div class="button-examples">
          <BaseButton variant="contained" color="primary" label="Primary 버튼" />
          <BaseButton variant="light" color="primary" label="Secondary 버튼" />
          <BaseButton variant="contained" color="blue" label="Blue 버튼" />
          <BaseButton variant="contained" color="red" label="Red 버튼" />
          <BaseButton variant="contained" color="primary" pill label="Pill 버튼" />
        </div>
      </div>

      <div class="example-section">
        <h3>입력 컴포넌트</h3>
        <div class="input-examples"></div>
      </div>

      <div class="example-section">
        <h3>BaseButton 컴포넌트</h3>
        <div class="naive-examples">
          <BaseButton variant="contained" color="primary" label="Primary" />
          <BaseButton variant="light" color="primary" label="Outline" />
          <BaseButton variant="contained" color="blue" label="Blue" />
          <BaseButton variant="contained" color="red" label="Red" />
          <BaseButton variant="contained" color="grey" disabled label="Disabled" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '../components/ThemeToggle.vue';
import { useThemeStore } from '@template/theme';
import { BaseButton } from '@template/ui';
import { ref } from 'vue';

const themeStore = useThemeStore();

const inputValue = ref('');
const inputValue2 = ref('');
</script>

<style scoped>
.theme-test {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.theme-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--n-color);
  border-radius: 8px;
}

.component-examples {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.example-section {
  padding: 1.5rem;
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
  background: var(--n-color);
}

.example-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--n-text-color);
}

.button-examples,
.input-examples,
.naive-examples {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.input-examples {
  flex-direction: column;
  align-items: stretch;
}

.input-examples .base-input {
  width: 100%;
  max-width: 300px;
}
</style>
