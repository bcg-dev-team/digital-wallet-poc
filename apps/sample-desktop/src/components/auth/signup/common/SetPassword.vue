<template>
  <form @submit.prevent name="set-password" class="gap-size-16 flex flex-col">
    <FormField label="비밀번호">
      <BaseInput
        v-model="state.password"
        variant="password-strength"
        size="md"
        placeholder="영문+숫자, 8~16자리 이상"
        :maxLength="128"
        :error="state.password.length > 0 && !isPasswordValid"
        :errorMessage="
          state.password.length > 0 && !isPasswordValid ? '비밀번호 조건을 확인해주세요' : ''
        "
        autocomplete="new-password"
        full
      />
    </FormField>
    <div
      class="12 border-primary-primary800 bg-primary-primary100 p-size-8 gap-size-4 flex items-start rounded-md border"
    >
      <div class="text-font-12 gap-size-4 flex flex-col">
        <!-- 8자 이상 체크 -->
        <div class="gap-size-4 flex items-center">
          <BaseIcon
            name="check-sm"
            size="sm"
            :color="
              validations.minLength
                ? 'var(--chips-status-pending-text)'
                : 'var(--font-color-default-muted-dark)'
            "
          />
          <p
            :class="
              validations.minLength
                ? 'text-[var(--chips-status-pending-text)]'
                : 'text-[var(--font-color-default-muted-dark)]'
            "
          >
            8자 이상 입력해주세요
          </p>
        </div>

        <!-- 문자 조합 체크 -->
        <div class="gap-size-4 flex items-center">
          <BaseIcon
            name="check-sm"
            size="sm"
            :color="
              validations.characterTypes
                ? 'var(--chips-status-pending-text)'
                : 'var(--font-color-default-muted-dark)'
            "
          />
          <p
            :class="
              validations.characterTypes
                ? 'text-[var(--chips-status-pending-text)]'
                : 'text-[var(--font-color-default-muted-dark)]'
            "
          >
            영문 대/소문자, 숫자, 특수문자를 포함해주세요
          </p>
        </div>

        <!-- 연속/반복 문자 체크 -->
        <div class="gap-size-4 flex items-center">
          <BaseIcon
            name="check-sm"
            size="sm"
            :color="
              validations.noSequential
                ? 'var(--chips-status-pending-text)'
                : 'var(--font-color-default-muted-dark)'
            "
          />
          <p
            :class="
              validations.noSequential
                ? 'text-[var(--chips-status-pending-text)]'
                : 'text-[var(--font-color-default-muted-dark)]'
            "
          >
            연속된 문자나 반복 문자는 피해주세요
          </p>
        </div>
      </div>
    </div>

    <FormField label="비밀번호 확인">
      <BaseInput
        v-model="state.passwordCheck"
        variant="password"
        size="md"
        placeholder="다시 입력해주세요"
        :maxLength="128"
        :error="state.passwordCheck.length > 0 && !isPasswordMatch"
        :errorMessage="
          state.passwordCheck.length > 0 && !isPasswordMatch ? '비밀번호가 일치하지 않습니다' : ''
        "
        autocomplete="new-password"
        full
      />
      <div v-if="state.passwordCheck.length > 0 && isPasswordMatch" class="text-green text-[12px]">
        <BaseIcon name="check-sm" size="sm" color="var(--font-color-green)" />
        비밀번호가 일치합니다
      </div>
    </FormField>
  </form>
  <div class="gap-size-12 mt-[33px] flex items-center">
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      color="primary"
      full-width
      @click="handleSubmit"
      :disabled="!isPasswordValid || !isPasswordMatch"
    />
  </div>
</template>

<script lang="ts" setup>
import FormField from '@/components/auth/common/FormField.vue';
import { BaseInput, BaseButton, BaseIcon } from '@template/ui';
import { useSignupStore } from '@/stores/useSignupStore';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const signupStore = useSignupStore();
const state = reactive({
  password: '',
  passwordCheck: '',
});

// 비밀번호 유효성 검사 로직
const validations = computed(() => {
  const pwd = state.password;

  return {
    minLength: checkMinLength(pwd),
    characterTypes: checkCharacterTypes(pwd),
    noSequential: checkNoSequential(pwd),
  };
});

// 1. 8자 이상 체크
const checkMinLength = (pwd: string): boolean => {
  return pwd.length >= 8 && pwd.length <= 128;
};

// 2. 4종류 문자 조합 체크
const checkCharacterTypes = (pwd: string): boolean => {
  const patterns = [
    /[A-Z]/, // 대문자
    /[a-z]/, // 소문자
    /[0-9]/, // 숫자
    /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]/, // 특수문자
  ];

  const matchCount = patterns.reduce((count, pattern) => {
    return pattern.test(pwd) ? count + 1 : count;
  }, 0);

  return matchCount >= 4;
};

// 3. 연속/반복 문자 체크
const checkNoSequential = (pwd: string): boolean => {
  if (pwd.length === 0 || pwd.length < 3) return false; // 빈 값,3자 미만은 조건 미달

  // 연속 3자 체크 (abc, 123, cba 등)
  for (let i = 0; i < pwd.length - 2; i++) {
    const char1 = pwd.charCodeAt(i);
    const char2 = pwd.charCodeAt(i + 1);
    const char3 = pwd.charCodeAt(i + 2);

    // 오름차순 연속 (abc, 123)
    if (char2 === char1 + 1 && char3 === char2 + 1) {
      return false;
    }

    // 내림차순 연속 (cba, 321)
    if (char2 === char1 - 1 && char3 === char2 - 1) {
      return false;
    }
  }

  // 반복 3자 체크 (aaa, 111)
  for (let i = 0; i < pwd.length - 2; i++) {
    if (pwd[i] === pwd[i + 1] && pwd[i + 1] === pwd[i + 2]) {
      return false;
    }
  }

  return true;
};

// 전체 유효성 및 강도 점수
const isPasswordValid = computed(() => {
  return (
    validations.value.minLength &&
    validations.value.characterTypes &&
    validations.value.noSequential
  );
});

const passwordStrength = computed(() => {
  const checks = validations.value;
  let score = 0;

  if (checks.minLength) score += 1;
  if (checks.characterTypes) score += 1;
  if (checks.noSequential) score += 1;

  return score;
});

// 비밀번호 확인 체크
const isPasswordMatch = computed(() => {
  return state.password === state.passwordCheck && state.password.length > 0;
});

const handleSubmit = () => {
  if (isPasswordValid.value && isPasswordMatch.value) {
    signupStore.updateUserPassword(state.password);
    router.push({ query: { step: 5 } });
  }
};
</script>
