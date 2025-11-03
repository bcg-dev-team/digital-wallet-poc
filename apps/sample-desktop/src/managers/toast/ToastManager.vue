<template>
  <Teleport to="#overlay-root">
    <div class="toast-container">
      <BaseToast
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :message="toast.message"
        :show="toast.show"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/useToastStore';
import { BaseToast } from '@template/ui';
import { watch } from 'vue';

const toastStore = useToastStore();
const toastTimers = new Map<string, NodeJS.Timeout>();

watch(
  () => toastStore.toasts,
  (toasts) => {
    toasts.forEach((toast) => {
      // 이미 타이머가 설정된 토스트는 건너뜀
      if (toastTimers.has(toast.id)) {
        return;
      }

      // 새 토스트에 대한 타이머 설정
      const timer = setTimeout(() => {
        // 페이드 아웃 애니메이션을 위해 show를 false로 변경
        toast.show = false;

        // 애니메이션 완료 후 목록에서 제거
        setTimeout(() => {
          toastStore.removeToast(toast.id);
          toastTimers.delete(toast.id);
        }, 300);
      }, toast.duration || 1200);

      toastTimers.set(toast.id, timer);
    });
  },
  { deep: true, immediate: true }
);
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: var(--base-size-size-20);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: var(--base-size-size-12);
  z-index: var(--z-index-toast);
  pointer-events: none;
}
</style>
