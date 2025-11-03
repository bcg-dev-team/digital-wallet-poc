<template>
  <div class="flex flex-col" :class="gapSize">
    <div class="gap-size-8 flex items-center">
      <span :class="sizeClass">{{ props.label }}</span>
      <slot name="count" />
    </div>
    <slot name="content" />
  </div>
</template>
<script setup lang="ts">
import type { ComponentSize } from '@template/ui';
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  size?: ComponentSize | 'custom';
  style?: string;
}>();

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-font-12 font-medium';
    case 'md':
      return 'text-font-14 font-medium';
    case 'lg':
      return 'text-font-16 font-semibold';
    case 'custom':
      return props.style;
  }
});

const gapSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'gap-size-2';
    case 'md':
      return 'gap-size-4';
    case 'lg':
      return 'gap-size-8';
  }
});
</script>
