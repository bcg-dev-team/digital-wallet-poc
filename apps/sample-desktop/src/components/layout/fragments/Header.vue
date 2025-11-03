<template>
  <header class="z-sticky fixed left-0 right-0 top-0 min-w-[1920px] bg-black">
    <div
      class="header-container flex w-screen min-w-[1500px] max-w-[1920px] items-center justify-between py-[9px] pl-3 pr-6"
    >
      <div class="flex shrink-0 items-center">
        <div class="mr-9">
          <img class="h-10 w-auto" src="@/assets/logo/moda_logo.svg" alt="logo" />
        </div>
        <NavBar />
      </div>

      <div class="header-right">
        <StatusBarArea v-if="isLogin" />
        <LoginButtonArea v-else />
        <slot name="header-right" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import LoginButtonArea from '@/components/layout/fragments/LoginButtonArea.vue';
import LocalStorageService from '@/services/localStorage/local-storage.service';
import StatusBarArea from '@/components/layout/fragments/StatusBarArea.vue';
import LocalStorageKey from '@/services/localStorage/local-storage-key';
import NavBar from '@/components/layout/fragments/NavBar.vue';
import { ref } from 'vue';

const isLogin = ref(!!LocalStorageService.getItem(LocalStorageKey.ACCESS_TOKEN));
</script>
