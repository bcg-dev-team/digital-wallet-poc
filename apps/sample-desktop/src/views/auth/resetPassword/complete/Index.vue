<template>
  <AuthContent class="!pb-[30px]">
    <template #content>
      <ResetPasswordComplete />
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import ResetPasswordComplete from '@/components/auth/resetPassword/ResetPasswordComplete.vue';
import AuthContent from '@/components/auth/common/AuthContent.vue';
import { onBeforeRouteLeave } from 'vue-router';

onBeforeRouteLeave((to, from, next) => {
  if (to.name !== 'login') {
    next({ name: 'login' });
  } else {
    next();
  }
});
</script>
