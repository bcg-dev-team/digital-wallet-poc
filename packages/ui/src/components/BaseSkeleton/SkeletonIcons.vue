<!--
  Figma 컴포넌트: SkeletonIcons (공통 아이콘)
  스켈레톤 컴포넌트에서 사용하는 공통 SVG 아이콘들
  디자인 토큰 기반으로 구현
-->
<script setup lang="ts">
import type { IconSize } from '../../types/icons';

interface Props {
  /** 아이콘 타입 */
  type: 'image' | 'user';
  /** 아이콘 크기 */
  size?: IconSize;
  /** 추가 CSS 클래스 */
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  class: '',
});

const iconSizeMap = {
  xs: 'w-3 h-3',
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const iconPaths = {
  image:
    'M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z',
  user: 'M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z',
};

const viewBoxMap = {
  image: '0 0 20 18',
  user: '0 0 20 20',
};
</script>

<template>
  <svg
    :class="[iconSizeMap[props.size], props.class]"
    :style="{ color: 'var(--base-colors-neutral-neutral200)' }"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    :viewBox="viewBoxMap[props.type]"
  >
    <path :d="iconPaths[props.type]" />
  </svg>
</template>

<style scoped>
.dark svg {
  color: var(--base-colors-neutral-neutral700) !important;
}
</style>
