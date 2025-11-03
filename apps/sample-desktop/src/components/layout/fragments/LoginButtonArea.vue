<template>
  <div class="flex items-center gap-2">
    <BaseButton
      variant="contained"
      label="로그인"
      size="sm"
      color="white"
      pill
      @click="router.push({ name: 'login' })"
    />
    <BaseButton
      variant="contained"
      label="회원가입"
      size="sm"
      color="primary"
      pill
      @click="router.push({ name: 'sign-up' })"
    />
  </div>
</template>

<script setup lang="ts">
import { BaseButton } from '@template/ui';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
