<template>
  <div class="grid grid-flow-col" :class="props.gap" :style="gridStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface CardLayoutHorizontalProps {
  /**
   * 각 컬럼의 fr 단위 비율 배열
   * 예: [330, 680, 382] 또는 [1, 2, 1]
   */
  columns?: number[];
  /**
   * 그리드 간격 (gap)
   */
  gap?: string;
}

const props = withDefaults(defineProps<CardLayoutHorizontalProps>(), {
  columns: () => [1, 1, 1], // 기본값: 균등 분할
  gap: 'gap-6',
});

const gridStyle = computed(() => {
  if (!props.columns || props.columns.length === 0) {
    return { gridTemplateColumns: 'repeat(3, 1fr)' }; // 기본값
  }

  // fr 단위로 변환
  const frValues = props.columns.map((col) => `${col}fr`).join(' ');
  return { gridTemplateColumns: frValues };
});
</script>
