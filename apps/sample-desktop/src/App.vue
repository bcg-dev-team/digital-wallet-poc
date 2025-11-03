<template>
  <div id="app" class="flex min-h-screen flex-col">
    <component :is="route.meta.layout || NoneLayout">
      <router-view />
    </component>
    <ToastManager />
  </div>
</template>

<script setup lang="ts">
import NoneLayout from './components/layout/fragments/NoneLayout.vue';
import ToastManager from './managers/toast/ToastManager.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
