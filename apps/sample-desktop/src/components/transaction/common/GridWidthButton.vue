<template>
  <button
    class="w-size-20 h-size-20 flex items-center justify-center rounded-full bg-[#D9D9D9]/50"
    :class="{ hidden: hidden }"
    @click="handleClick"
  >
    <BaseIcon
      :name="props.direction === 'left' ? 'arrow-backward-sm' : 'arrow-forward-sm'"
      size="sm"
    />
  </button>
</template>

<script setup lang="ts">
import { BaseIcon } from '@template/ui';

const props = defineProps<{
  hidden?: boolean;
  direction?: 'left' | 'right';
}>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>
