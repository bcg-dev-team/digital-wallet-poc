<template>
  <div class="composables-example">
    <h1>Composables 사용 예시</h1>

    <!-- 테마 관리 -->
    <section class="section">
      <h2>테마 관리 (useTheme)</h2>
      <div class="theme-controls">
        <button @click="setTheme(false)" :class="{ active: !isDark }">라이트 모드</button>
        <button @click="setTheme(true)" :class="{ active: isDark }">다크 모드</button>
        <button @click="setSystemTheme" :class="{ active: false }">시스템 설정</button>
      </div>
      <p>현재 테마: {{ isDark ? '다크' : '라이트' }}</p>
    </section>

    <!-- 브레이크포인트 관리 -->
    <section class="section">
      <h2>반응형 브레이크포인트 (useBreakpoint)</h2>
      <div class="breakpoint-info">
        <p>화면 크기: {{ width }} x {{ height }}</p>
        <p>현재 브레이크포인트: {{ currentBreakpoint }}</p>
        <div class="breakpoint-status">
          <span v-if="isAbove('lg')" class="status">대형 화면 (lg 이상)</span>
          <span v-if="isBetween('md', 'lg')" class="status">중형 화면 (md ~ lg)</span>
          <span v-if="isBelow('md')" class="status">소형 화면 (md 미만)</span>
        </div>
      </div>
    </section>

    <!-- 모달 관리 -->
    <section class="section">
      <h2>모달 관리 (useModal)</h2>
      <button @click="openModal({ title: '테스트 모달', content: '이것은 테스트 모달입니다.' })">
        모달 열기
      </button>
      <button @click="toggleModal">모달 토글</button>

      <!-- 모달 컴포넌트 -->
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal" @click.stop>
          <h3>{{ title }}</h3>
          <p>{{ content }}</p>
          <button @click="closeModal">닫기</button>
        </div>
      </div>
    </section>

    <!-- 폼 관리 -->
    <section class="section">
      <h2>폼 관리 (useForm)</h2>
      <form @submit.prevent="handleSubmit(onFormSubmit)" class="form">
        <div class="form-field">
          <label for="name">이름</label>
          <input
            id="name"
            v-model="formFields.name.value"
            @blur="setFieldTouched('name')"
            :class="{ error: formFields.name.error && formFields.name.touched }"
          />
          <span v-if="formFields.name.error && formFields.name.touched" class="error-message">
            {{ formFields.name.error }}
          </span>
        </div>

        <div class="form-field">
          <label for="email">이메일</label>
          <input
            id="email"
            v-model="formFields.email.value"
            @blur="setFieldTouched('email')"
            :class="{ error: formFields.email.error && formFields.email.touched }"
          />
          <span v-if="formFields.email.error && formFields.email.touched" class="error-message">
            {{ formFields.email.error }}
          </span>
        </div>

        <div class="form-actions">
          <button type="submit" :disabled="!isValid || isSubmitting">
            {{ isSubmitting ? '제출 중...' : '제출' }}
          </button>
          <button type="button" @click="reset">리셋</button>
        </div>

        <div class="form-status">
          <p>유효성: {{ isValid ? '✅' : '❌' }}</p>
          <p>변경됨: {{ isDirty ? '✅' : '❌' }}</p>
          <p>터치됨: {{ isTouched ? '✅' : '❌' }}</p>
        </div>
      </form>
    </section>

    <!-- 디바운스 예시 -->
    <section class="section">
      <h2>디바운스 예시 (useDebounce)</h2>
      <input
        v-model="searchInput"
        placeholder="검색어를 입력하세요..."
        @input="handleSearchInput"
      />
      <p>실시간 입력: {{ searchInput }}</p>
      <p>디바운스된 값: {{ debouncedSearchValue || '대기 중...' }}</p>
      <p>디바운싱 중: {{ isDebouncing ? '✅' : '❌' }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTheme, useBreakpoint, useModal, useForm } from '@template/ui';
import { useDebounce } from '@template/utils';
import { ref } from 'vue';

// 테마 관리
const { isDark, setTheme, setSystemTheme } = useTheme();

// 브레이크포인트 관리
const { width, height, currentBreakpoint, isAbove, isBelow, isBetween } = useBreakpoint();

// 모달 관리
const { isOpen, title, content, openModal, closeModal, toggleModal } = useModal();

// 폼 관리
interface FormData {
  name: string;
  email: string;
}

const validators = {
  name: (value: string) => {
    if (!value) return '이름을 입력해주세요';
    if (value.length < 2) return '이름은 2자 이상이어야 합니다';
    return null;
  },
  email: (value: string) => {
    if (!value) return '이메일을 입력해주세요';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '유효한 이메일을 입력해주세요';
    return null;
  },
};

const {
  fields: formFields,
  isValid,
  isDirty,
  isTouched,
  isSubmitting,
  setFieldValue,
  setFieldTouched,
  reset,
  handleSubmit,
} = useForm<FormData>({ name: '', email: '' }, validators);

// 디바운스 예시
const searchInput = ref('');
const { debouncedValue: debouncedSearchValue, isDebouncing, debounce } = useDebounce<string>(500);

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchInput.value = target.value;
  debounce(target.value, (value) => {
    console.log('디바운스된 검색어:', value);
  });
};

// 폼 제출 핸들러
const onFormSubmit = async (values: FormData) => {
  console.log('폼 제출:', values);
  // 실제 API 호출 로직
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert('폼이 성공적으로 제출되었습니다!');
};
</script>

<style scoped>
.composables-example {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.section h2 {
  margin-top: 0;
  color: #333;
}

.theme-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.theme-controls button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.theme-controls button.active {
  background: #007bff;
  color: white;
}

.breakpoint-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 4px;
}

.breakpoint-status {
  margin-top: 10px;
}

.status {
  display: inline-block;
  padding: 4px 8px;
  background: #28a745;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-modal);
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 90%;
}

.form {
  max-width: 400px;
}

.form-field {
  margin-bottom: 15px;
}

.form-field label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-field input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-field input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.form-actions button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.form-actions button[type='submit'] {
  background: #007bff;
  color: white;
}

.form-actions button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-status {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
}

.form-status p {
  margin: 5px 0;
}

/* 다크 모드 스타일 */
:root[data-theme='dark'] .composables-example {
  background: #1a1a1a;
  color: #fff;
}

:root[data-theme='dark'] .section {
  border-color: #444;
  background: #2a2a2a;
}

:root[data-theme='dark'] .theme-controls button,
:root[data-theme='dark'] .form-field input {
  background: #333;
  color: #fff;
  border-color: #555;
}

:root[data-theme='dark'] .modal {
  background: #2a2a2a;
  color: #fff;
}

:root[data-theme='dark'] .breakpoint-info,
:root[data-theme='dark'] .form-status {
  background: #333;
}
</style>
