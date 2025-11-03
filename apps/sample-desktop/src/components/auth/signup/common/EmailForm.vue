<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="이메일주소(ID)">
      <BaseInput
        v-model="email"
        size="md"
        placeholder="example@email.com"
        full
        :error="!isEmailValid && email !== ''"
        errorMessage="이메일 형식이 올바르지 않아요"
      />
    </FormField>
  </div>
  <div class="mt-[33px]">
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      color="primary"
      full-width
      @click="handleClickNext"
    />
  </div>
</template>

<script setup lang="ts">
import FormField from '@/components/auth/common/FormField.vue';
import { useSignupStore } from '@/stores/useSignupStore';
import { useToastStore } from '@/stores/useToastStore';
import { BaseInput, BaseButton } from '@template/ui';
import { authService } from '@/services/api';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const toastStore = useToastStore();
const router = useRouter();
const signupStore = useSignupStore();
const email = ref('');

// 이메일 유효성 검사
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isEmailValid = computed(() => {
  return email.value === '' || isValidEmail(email.value);
});

const updateEmail = (value: string) => {
  if (isValidEmail(value)) {
    signupStore.updateUserEmail(value);
    console.log(signupStore.userInfo.email);
  }
};

const handleClickNext = async () => {
  updateEmail(email.value);
  try {
    const res = await authService.sendEmailVerificationCode({
      email: email.value,
      useType: 'SIGN_UP',
    });
    if (res.status === 'success') {
      router.push({ query: { step: 3 } });
    }
  } catch (error) {
    toastStore.addToast((error as any).response.data.detail);
  }
};
</script>
