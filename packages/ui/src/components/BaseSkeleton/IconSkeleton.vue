<!--
  Figma 컴포넌트: Icon Skeleton
  아이콘 로딩 상태를 표시하는 스켈레톤 컴포넌트입니다.
-->
<script setup lang="ts">
import type { IconSkeletonProps, IconSize } from '../../types/icons';
import SkeletonIcons from './SkeletonIcons.vue';
import BaseSkeleton from './BaseSkeleton.vue';

interface Props extends IconSkeletonProps {}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showText: false,
  text: 'Loading...',
});
</script>

<template>
  <div class="icon-skeleton" role="status">
    <div class="icon-skeleton-container">
      <!-- 아이콘 SVG -->
      <div :class="`icon-skeleton-svg icon-skeleton-${props.size}`">
        <SkeletonIcons type="user" :size="props.size" />
      </div>

      <!-- 텍스트 (선택사항) -->
      <BaseSkeleton
        v-if="props.showText"
        width="60px"
        height="12px"
        variant="text"
        class="icon-skeleton-text"
      />
    </div>
    <span class="sr-only">{{ props.text }}</span>
  </div>
</template>

<style scoped>
.icon-skeleton {
  display: inline-flex;
  align-items: center;
}

.icon-skeleton-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.icon-skeleton-svg {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 아이콘 크기별 클래스 */
.icon-skeleton-xs {
  width: 0.75rem; /* w-3 */
  height: 0.75rem; /* h-3 */
}

.icon-skeleton-sm {
  width: 1rem; /* w-4 */
  height: 1rem; /* h-4 */
}

.icon-skeleton-md {
  width: 1.5rem; /* w-6 */
  height: 1.5rem; /* h-6 */
}

.icon-skeleton-lg {
  width: 2rem; /* w-8 */
  height: 2rem; /* h-8 */
}

.icon-skeleton-xl {
  width: 3rem; /* w-12 */
  height: 3rem; /* h-12 */
}

.icon-skeleton-text {
  margin-top: 0.5rem;
}

/* 가로 배치 (텍스트가 있을 때) */
.icon-skeleton-container:has(.icon-skeleton-text) {
  flex-direction: row;
  gap: 1rem;
}

.icon-skeleton-container:has(.icon-skeleton-text) .icon-skeleton-text {
  margin-top: 0;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
