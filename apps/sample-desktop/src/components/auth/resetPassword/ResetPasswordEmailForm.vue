<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="이메일주소(ID)">
      <BaseInput
        v-model="email"
        size="md"
        placeholder="example@email.com"
        :error="!isEmailValid && email !== ''"
        errorMessage="이메일 형식이 올바르지 않아요"
        full
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
      :disabled="!(isEmailValid && email !== '')"
      @click="handleClickNext"
    />
  </div>
</template>

<script lang="ts" setup>
import FormField from '@/components/auth/common/FormField.vue';
import { BaseInput, BaseButton } from '@template/ui';
import { authService } from '@/services/api';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

const email = defineModel<string>('email', { default: '' });

// 이메일 유효성 검사
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isEmailValid = computed(() => {
  return email.value === '' || isValidEmail(email.value);
});

const router = useRouter();

const handleClickNext = async () => {
  try {
    const res = await authService.sendEmailVerificationCode({
      email: email.value,
      useType: 'RESET_PASSWORD',
    });
    if (res.status === 'success') {
      router.push({ query: { step: 1 } });
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
