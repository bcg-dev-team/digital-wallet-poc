<!-- packages/ui/src/components/BaseLink/BaseLink.vue -->
<template>
  <!-- to가 있을 때는 router-link 사용 -->
  <router-link
    v-if="props.to"
    :to="{ name: props.to }"
    class="cursor-pointer underline"
    :class="sizeClasses"
    v-bind="$attrs"
  >
    <slot />
  </router-link>

  <!-- to가 없을 때는 span 사용 (클릭 이벤트 처리) -->
  <span
    v-else
    class="text-blue cursor-pointer underline"
    :class="sizeClasses"
    @click="emit('click', $event)"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  to?: string;
  size?: 'sm' | 'md';
}

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  size: 'md',
});

const sizeClasses = computed(() => {
  if (props.size === 'sm') {
    return 'text-font-13';
  }
  return '';
});
</script>
