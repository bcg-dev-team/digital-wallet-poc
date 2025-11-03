<template>
  <div class="flex flex-col items-center justify-center">
    <div>
      <span class="text-font-24 font-semibold">비밀번호 재설정 완료</span>
    </div>
    <div class="mt-size-24 text-font-16 text-center">
      <p>비밀번호 재설징이 완료 됐어요</p>
      <p>다시 로그인해주세요</p>
    </div>
  </div>
  <div class="mt-size-48"><BaseButton label="확인" full-width @click="handleClick" /></div>
</template>

<script lang="ts" setup>
import { BaseButton } from '@template/ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = () => {
  router.push({ name: 'login' });
};
</script>
