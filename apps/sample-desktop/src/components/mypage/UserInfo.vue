<template>
  <div class="bg-primary-primary800 px-6 pb-6 pt-9">
    <div class="flex items-center gap-2">
      <span class="text-2xl font-bold">{{ userInfo.name }}</span>
    </div>
    <div class="mt-2">
      <span class="text-sm">마지막 로그인: {{ userInfo.lastLogin }}</span>
    </div>
  </div>
  <div class="p-6">
    <div class="flex flex-col gap-3">
      <div class="bg-bg-innerframe rounded-md px-4 py-3">
        <BaseIcon name="email" size="xs" color="primary" />
        <span class="text-md font-medium">{{ userInfo.email }}</span>
      </div>
      <div class="bg-bg-innerframe rounded-md px-4 py-3">
        <BaseIcon name="phone" size="xs" color="primary" />
        <span class="text-md font-medium">{{ userInfo.phone }}</span>
      </div>
    </div>
    <div class="mt-4 flex items-center justify-center">
      <BaseButton
        label="정보 수정"
        variant="outlined"
        color="white"
        size="lg"
        :leftIcon="{ name: 'order', size: 'lg', color: 'current' }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { BaseButton, BaseIcon } from '@template/ui';
import { reactive } from 'vue';

const userInfo = reactive({
  name: '김트레이더',
  lastLogin: '2025.07.22 14:30',
  email: 'traderkim@email.com',
  phone: '010-1234-5678',
});
</script>
