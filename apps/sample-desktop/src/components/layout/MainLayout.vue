<template>
  <Header />
  <main class="mt-[64px]">
    <slot />
  </main>
  <Footer v-if="showFooter" />
</template>
<script lang="ts" setup>
import Header from '@/components/layout/fragments/Header.vue';
import Footer from '@/components/layout/fragments/Footer.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

/**
 * Footer 표시 여부를 계산
 * meta.footer가 명시적으로 false인 경우에만 숨김
 */
const showFooter = computed(() => route.meta?.footer !== false);
</script>
