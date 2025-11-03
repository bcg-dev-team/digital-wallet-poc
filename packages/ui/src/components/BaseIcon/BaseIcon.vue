<!-- packages/ui/src/components/BaseIcon/BaseIcon.vue -->
<!--
  BaseIcon 컴포넌트
  vite-svg-loader를 활용하여 SVG 아이콘을 Vue 컴포넌트로 렌더링합니다.
  
  Figma 컴포넌트: Icon (아이콘 컴포넌트)
-->
<script setup lang="ts">
import IconSkeleton from '../BaseSkeleton/IconSkeleton.vue';
import type { IconName, IconSize } from '../../types/icons';
import { getIconComponent } from './iconRegistry';
import { getIconType } from '../../types/icons';
import { computed } from 'vue';

interface Props {
  name: IconName;
  size?: IconSize | number;
  color?: string;
  className?: string;
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'currentColor',
  isLoading: false,
});

// 아이콘 컴포넌트 가져오기 (정적 방식)
const iconComponent = computed(() => {
  const component = getIconComponent(props.name);
  if (!component && import.meta.env.DEV) {
    console.warn(`Icon "${props.name}" not found. Please check the icon name.`);
  }
  return component;
});

// 크기별 클래스 매핑 (컴포넌트별 토큰)
const sizeClasses = {
  xs: 'icon-xs',
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
  xl: 'icon-xl',
};

// 아이콘 타입별 클래스 매핑 (컴포넌트별 토큰)
const typeClasses = {
  fill: 'icon-fill',
  stroke: 'icon-stroke',
};

const iconClasses = computed(() => {
  const classes = [
    // 1. 레이아웃
    'inline-block',
  ];

  if (typeof props.size === 'string') {
    classes.push(sizeClasses[props.size]);
  }

  // 아이콘 타입에 따른 클래스 추가
  const iconType = getIconType(props.name);
  if (iconType) {
    classes.push(typeClasses[iconType]);
  }

  if (props.className) {
    classes.push(props.className);
  }

  return classes.join(' ');
});

const iconStyles = computed(() => {
  const styles: Record<string, string> = {};

  if (typeof props.size === 'number') {
    styles.width = `${props.size}px`;
    styles.height = `${props.size}px`;
  }

  // 색상 적용: currentColor를 사용하므로 CSS color 속성으로 제어
  if (props.color && props.color !== 'currentColor') {
    styles.color = props.color;
  }

  return styles;
});

// 스켈레톤용 크기 변환
const getSkeletonSize = computed((): IconSize => {
  if (typeof props.size === 'number') {
    // 숫자 크기를 가장 가까운 IconSize로 변환
    if (props.size <= 16) return 'sm';
    if (props.size <= 24) return 'md';
    if (props.size <= 32) return 'lg';
    return 'xl';
  }
  return props.size;
});
</script>

<template>
  <!-- 로딩 상태일 때 스켈레톤 표시 -->
  <IconSkeleton v-if="props.isLoading" :size="getSkeletonSize" />

  <!-- 정상 상태일 때 아이콘 표시 -->
  <component
    v-else-if="iconComponent"
    :is="iconComponent"
    :class="iconClasses"
    :style="iconStyles"
    aria-hidden="true"
  />

  <!-- 아이콘을 찾을 수 없을 때 스켈레톤 표시 -->
  <IconSkeleton v-else :size="getSkeletonSize" />
</template>
