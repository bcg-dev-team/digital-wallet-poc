<template>
  <div class="grid grid-flow-row auto-rows-min" :class="props.gap">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface CardLayoutVerticalProps {
  /**
   * 그리드 간격 (gap)
   */
  gap?: string;
}

const props = withDefaults(defineProps<CardLayoutVerticalProps>(), {
  gap: 'gap-3',
});
</script>
