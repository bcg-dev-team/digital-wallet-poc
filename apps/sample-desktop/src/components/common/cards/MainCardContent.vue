<template>
  <div class="bg-bg-bg-default rounded-md">
    <div class="flex items-center justify-between" v-if="title">
      <div>
        <span class="leading-snug tracking-wide" :class="[titleSizeClass]">
          {{ props.title }}
        </span>
      </div>

      <div><slot name="title-right" /></div>
    </div>
    <slot name="title" />
    <div :class="!title ? 'mt-0' : 'mt-4'">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComponentSize } from '@template/ui';
import { computed } from 'vue';

interface MainCardContentProps {
  title?: string;
  size?: ComponentSize; // 'lg' | 'md' | 'sm'
  isLink?: boolean;
}

const props = withDefaults(defineProps<MainCardContentProps>(), {
  title: '',
  size: 'md',
  isLink: false,
});

const titleSizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-lg font-medium';
    case 'md':
      return 'text-xl font-medium';
    case 'lg':
      return 'text-font-24 font-semibold';
  }
});
</script>
