<template>
  <AuthContent
    title="비밀번호 재설정"
    :description="resetPasswordDescription[step].description"
    :total-step="4"
    v-model:current-step="step"
  >
    <template #content>
      <ResetPasswordEmailForm v-if="step === 0" v-model:email="email" />
      <ResetPasswordEmailAuth v-if="step === 1" v-model:email="email" />
      <ResetPasswordNewPassword v-if="step === 2" v-model:email="email" />
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import ResetPasswordNewPassword from '@/components/auth/resetPassword/ResetPasswordNewPassword.vue';
import ResetPasswordEmailForm from '@/components/auth/resetPassword/ResetPasswordEmailForm.vue';
import ResetPasswordEmailAuth from '@/components/auth/resetPassword/ResetPasswordEmailAuth.vue';
import type { AuthContentTitle } from '@/types/components/auth.types';
import AuthContent from '@/components/auth/common/AuthContent.vue';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';

const route = useRoute();
const email = ref('');

// TODO: 현재 페이지에서 파라미터 전달 방식으로 구현되어 있음. 추후 리팩토링 필요
const step = computed(() => {
  return parseInt(route.query.step as string) || 0;
});

const resetPasswordDescription: AuthContentTitle[] = [
  {
    description: '비밀번호를 재설정하고자 하는 아이디를 입력해주세요',
  },
  {
    description: '보안을 위해 이메일 인증을 진행할게요',
  },
  {
    description: '새로운 비밀번호를 설정하세요',
  },
];
</script>
