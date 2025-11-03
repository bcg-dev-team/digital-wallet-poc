<!--
  Figma 컴포넌트: TextSkeleton (텍스트 전용)
  여러 라인의 텍스트 스켈레톤을 지원하는 컴포넌트
  피그마 디자인 토큰 기반으로 구현
-->
<script setup lang="ts">
import BaseSkeleton from './BaseSkeleton.vue';
import { computed } from 'vue';

/**
 * TextSkeleton - 텍스트 전용 스켈레톤 컴포넌트
 * @props lines - 텍스트 라인 수
 * @props lastLineWidth - 마지막 라인 너비 비율 (0-100)
 * @figma TextSkeleton (node-id: TBD)
 */
interface Props {
  /** 텍스트 라인 수 */
  lines?: number;
  /** 마지막 라인 너비 비율 (0-100) */
  lastLineWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  lines: 1,
  lastLineWidth: 60,
});

const lineArray = computed(() => Array.from({ length: props.lines }, (_, i) => i));
</script>

<template>
  <div class="text-skeleton">
    <BaseSkeleton
      v-for="(line, index) in lineArray"
      :key="`text-line-${index}`"
      :width="index === props.lines - 1 ? `${props.lastLineWidth}%` : '100%'"
      height="1rem"
      variant="text"
      class="text-skeleton-line"
    />
  </div>
</template>

<style scoped>
.text-skeleton {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.text-skeleton-line {
  margin-bottom: 0.5rem;
}
</style>
