<template>
  <AuthContent title="로그인">
    <template #content>
      <BaseTabs
        v-model="modelValue"
        size="lg"
        fullwidth
        variant="underline"
        underline
        :tabs="tabs"
      />
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import AuthContent from '@/components/auth/common/AuthContent.vue';
import BaseLogin from '@/components/auth/login/BaseLogin.vue';
import { BaseTabs } from '@template/ui';
import { ref } from 'vue';

const modelValue = ref('INDIVIDUAL');

const tabs = [
  { key: 'INDIVIDUAL', label: '개인회원', component: BaseLogin },
  { key: 'CORPORATE', label: '법인회원', component: BaseLogin },
];
</script>
