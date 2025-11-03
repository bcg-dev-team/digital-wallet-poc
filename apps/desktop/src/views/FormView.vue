<template>
  <div class="form-view">
    <h1>폼 검증 예시</h1>

    <div class="form-container">
      <h2>로그인 폼</h2>
      <Form :validation-schema="loginValidationSchema" class="form" @submit="handleLoginSubmit">
        <BaseInput
          name="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          required
        />
        <BaseInput
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
        />
        <BaseButton type="submit" :loading="loading"> 로그인 </BaseButton>
      </Form>
    </div>

    <div class="form-container">
      <h2>회원가입 폼</h2>
      <Form
        :validation-schema="registerValidationSchema"
        class="form"
        @submit="handleRegisterSubmit"
      >
        <BaseInput
          name="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          required
        />
        <BaseInput
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          required
        />
        <BaseInput
          name="confirmPassword"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          required
        />
        <BaseInput name="firstName" label="이름" placeholder="이름을 입력하세요" required />
        <BaseInput name="lastName" label="성" placeholder="성을 입력하세요" required />
        <BaseButton type="submit" :loading="loading"> 회원가입 </BaseButton>
      </Form>
    </div>

    <div class="form-container">
      <h2>사용자 프로필 폼</h2>
      <Form
        :validation-schema="userProfileValidationSchema"
        class="form"
        @submit="handleProfileSubmit"
      >
        <BaseInput name="firstName" label="이름" placeholder="이름을 입력하세요" required />
        <BaseInput name="lastName" label="성" placeholder="성을 입력하세요" required />
        <BaseInput
          name="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          required
        />
        <BaseInput
          name="phone"
          label="전화번호"
          type="tel"
          placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
        />
        <div class="form-group">
          <label class="form-label">자기소개</label>
          <textarea
            v-model="profileForm.bio"
            placeholder="자기소개를 입력하세요 (최대 500자)"
            maxlength="500"
            class="form-textarea"
          />
          <span class="char-count">{{ profileForm.bio?.length || 0 }}/500</span>
        </div>
        <BaseButton type="submit" :loading="loading"> 프로필 저장 </BaseButton>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  loginValidationSchema,
  registerValidationSchema,
  userProfileValidationSchema,
} from '@template/utils';
import { BaseButton, BaseInput } from '@template/ui';
import { Form } from 'vee-validate';
import { ref } from 'vue';

/**
 * 폼 검증 예시 페이지 컴포넌트
 *
 * Vee-Validate와 Zod를 사용한 다양한 폼 검증 예시를 제공합니다.
 * 로그인, 회원가입, 프로필 수정 폼을 포함합니다.
 *
 * @example
 * ```vue
 * <FormView />
 * ```
 */

/** 로딩 상태 */
const loading = ref(false);

/** 프로필 폼 데이터 */
const profileForm = ref({
  bio: '',
});

/**
 * 로그인 폼 제출을 처리합니다.
 * @param values - 폼 데이터
 */
const handleLoginSubmit = async (values: unknown) => {
  loading.value = true;
  try {
    console.log('로그인 데이터:', values);
    // 실제 로그인 로직 구현
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('로그인 성공!');
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('로그인에 실패했습니다.');
  } finally {
    loading.value = false;
  }
};

/**
 * 회원가입 폼 제출을 처리합니다.
 * @param values - 폼 데이터
 */
const handleRegisterSubmit = async (values: unknown) => {
  loading.value = true;
  try {
    console.log('회원가입 데이터:', values);
    // 실제 회원가입 로직 구현
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('회원가입 성공!');
  } catch (error) {
    console.error('회원가입 실패:', error);
    alert('회원가입에 실패했습니다.');
  } finally {
    loading.value = false;
  }
};

/**
 * 프로필 폼 제출을 처리합니다.
 * @param values - 폼 데이터
 */
const handleProfileSubmit = async (values: unknown) => {
  loading.value = true;
  try {
    const profileData = {
      ...(values as Record<string, unknown>),
      bio: profileForm.value.bio,
    };
    console.log('프로필 데이터:', profileData);
    // 실제 프로필 저장 로직 구현
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('프로필 저장 성공!');
  } catch (error) {
    console.error('프로필 저장 실패:', error);
    alert('프로필 저장에 실패했습니다.');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.form-view h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
}

.form-container {
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  margin-bottom: 1.5rem;
  color: #374151;
  font-size: 1.25rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 500;
  color: #374151;
}

.form-textarea {
  width: 100%;
  min-height: 100px;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-family: inherit;
  resize: vertical;
}

.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.char-count {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: right;
}
</style>
