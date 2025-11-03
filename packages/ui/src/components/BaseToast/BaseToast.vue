<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-300 ease-in"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="visible" class="min-w-[200px] max-w-[400px]" role="alert" aria-live="polite">
      <div
        class="relative flex items-center justify-center gap-[10px] rounded-[5px] border border-[var(--popup-border)] bg-[var(--popup-background)] px-[68px] py-[42px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)]"
      >
        <p class="m-0 whitespace-nowrap text-center text-[16px] font-normal leading-[24px]">
          {{ message }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

/**
 * @props message - 표시할 메시지 텍스트
 * @props show - 토스트 표시 여부
 */
interface Props {
  message: string;
  show?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
});

const visible = ref(false);

watch(
  () => props.show,
  (newShow) => {
    visible.value = newShow;
  },
  { immediate: true }
);
</script>
