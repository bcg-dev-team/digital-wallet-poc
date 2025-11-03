<template>
  <div class="flex flex-col items-center justify-center">
    <div>
      <span class="text-font-24 font-semibold">가입신청 완료</span>
    </div>
    <div class="mt-size-24 text-font-16 text-center">
      <p>가입신청이 완료되었습니다.</p>
      <p>관리자 확인 후 이메일로 승인 알림을 보내드릴게요!</p>
    </div>
  </div>
  <div class="mt-size-48">
    <BaseButton label="확인" full-width @click="goToLogin" />
  </div>
</template>

<script lang="ts" setup>
import { BaseButton } from '@template/ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToLogin = () => {
  router.push({ name: 'login' });
};
</script>
