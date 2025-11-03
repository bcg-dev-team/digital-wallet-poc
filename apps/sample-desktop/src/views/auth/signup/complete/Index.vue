<template>
  <AuthContent class="!pb-[30px]">
    <template #content>
      <SingUpComplete />
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import SingUpComplete from '@/components/auth/signup/common/SingUpComplete.vue';
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
