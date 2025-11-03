<!--
  Figma 컴포넌트: BaseSkeleton (공통 베이스)
  고급 스켈레톤 로딩 컴포넌트 - Shimmer 효과 지원
  피그마 디자인 토큰 기반으로 구현
-->
<script setup lang="ts">
import type { BaseSkeletonProps } from '../../types/skeleton';
import { computed } from 'vue';

/**
 * BaseSkeleton - 스켈레톤 로딩 컴포넌트
 * @props width - 스켈레톤 너비
 * @props height - 스켈레톤 높이
 * @props variant - 스켈레톤 스타일 (text, circular, rectangular)
 * @props class - 추가 CSS 클래스
 * @figma Skeleton (node-id: TBD)
 */
interface Props extends BaseSkeletonProps {}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '1rem',
  variant: 'text',
  class: '',
});

// 스켈레톤 클래스 계산
const skeletonClasses = computed(() => {
  const classes = ['skeleton-base', 'animate-pulse'];

  // variant별 클래스
  switch (props.variant) {
    case 'circular':
      classes.push('skeleton-circular');
      break;
    case 'rectangular':
      classes.push('skeleton-rectangular');
      break;
    case 'text':
    default:
      classes.push('skeleton-text');
      break;
  }

  if (props.class) {
    classes.push(props.class);
  }

  return classes.join(' ');
});
</script>

<template>
  <div
    :class="skeletonClasses"
    :style="{
      width: props.width,
      height: props.height,
    }"
  />
</template>
