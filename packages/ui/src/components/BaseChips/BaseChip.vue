<!--
  Figma 공통 칩 최소 단위 컴포넌트
  하이브리드 방식: 기본 variant + 커스텀 색상 지원
  가이드: 피그마 HEX → 디자인 토큰 변환 적용
  접근성: ARIA 속성, 키보드 네비게이션, 포커스 표시기 지원
-->
<script setup lang="ts">
import type { ChipVariant, ComponentSize } from '../../types/components';
import { computed } from 'vue';

/**
 * 칩(Chip) 최소 단위 컴포넌트
 * 하이브리드 방식: 기본 variant + 커스텀 색상 지원
 * 접근성: ARIA 속성, 키보드 네비게이션, 포커스 표시기 지원
 *
 * @props label - 칩 텍스트
 * @props variant - 칩 스타일 변형 (surface, primary, secondary 등)
 * @props size - 칩 크기 (sm, md, lg)
 * @props rounded - border-radius 클래스 (Tailwind 토큰)
 * @props fontWeight - 폰트 굵기 (font-normal, font-medium 등)
 * @props backgroundColor - 커스텀 배경색 (CSS 변수 또는 HEX)
 * @props textColor - 커스텀 텍스트색 (CSS 변수 또는 HEX)
 * @props borderColor - 커스텀 테두리색 (CSS 변수 또는 HEX)
 * @slot 기본 슬롯(텍스트 대신 커스텀)
 */
interface Props {
  /**
   * 칩 텍스트
   */
  label?: string;
  /**
   * 칩 스타일 변형
   * @default 'grey'
   */
  variant?: ChipVariant;
  /**
   * 칩 크기
   * - lg: large (40px)
   * - md: medium (32px)
   * - sm: small (24px)
   * @default 'md'
   */
  size?: ComponentSize;
  /**
   * border-radius 클래스
   * @default 'rounded-sm'
   */
  rounded?: string;
  /**
   * 폰트 굵기
   * @default 'font-normal'
   */
  fontWeight?: string;
  /**
   * 커스텀 배경색 (CSS 변수 또는 HEX)
   */
  backgroundColor?: string;
  /**
   * 커스텀 텍스트색 (CSS 변수 또는 HEX)
   */
  textColor?: string;
  /**
   * 커스텀 테두리색 (CSS 변수 또는 HEX)
   */
  borderColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'grey',
  size: 'md',
  rounded: 'rounded-sm',
  fontWeight: 'font-normal',
});

// Size별 클래스 매핑
const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1.5',
};

// Variant별 클래스 매핑 (컴포넌트별 토큰)
const variantClasses = {
  grey: 'chip-grey',
  red: 'chip-red',
  green: 'chip-green',
  blue: 'chip-blue',
  yellow: 'chip-yellow',
  purple: 'chip-purple',
};

// Font weight별 클래스 매핑
const fontWeightClasses: Record<string, string> = {
  'font-normal': 'font-normal',
  'font-medium': 'font-medium',
  'font-semibold': 'font-semibold',
  'font-bold': 'font-bold',
};

// Rounded별 클래스 매핑
const roundedClasses: Record<string, string> = {
  'rounded-sm': 'rounded-sm',
  'rounded-md': 'rounded-md',
  'rounded-lg': 'rounded-lg',
  'rounded-full': 'rounded-full',
};

// 기본 색상 규칙 (backgroundColor만 입력 시 적용)
const getDefaultTextColor = (backgroundColor: string) => {
  // 디자인 토큰 기반 기본 텍스트색 결정
  if (backgroundColor.includes('--trade-short-bg') || backgroundColor.includes('#e8f0fa')) {
    return 'var(--trade-short-text)'; // #0067ef
  }
  if (backgroundColor.includes('--trade-cancel-bg') || backgroundColor.includes('#f9f3ff')) {
    return 'var(--trade-cancel-text)'; // #892fe9
  }
  if (backgroundColor.includes('--table-chip-bg') || backgroundColor.includes('#eaecee')) {
    return 'var(--font-color-footer)'; // #5a5c5e
  }
  // 기본값
  return 'var(--font-color-primary)';
};

// 접근성을 위한 ARIA 속성 계산
const ariaAttributes = computed(() => {
  const attributes: Record<string, string | boolean> = {};

  // 라벨 설정
  if (props.label) {
    attributes['aria-label'] = props.label;
  }

  return attributes;
});

// 칩 클래스 계산
const chipClasses = computed(() => {
  const classes = [
    // 1. 레이아웃
    'inline-flex items-center justify-center',

    // 2. 전환 효과
    'transition-all duration-150',

    // 3. 크기별 클래스 (패딩 + 타이포그래피)
    sizeClasses[props.size] || 'text-sm px-2.5 py-1',

    // 4. 폰트 굵기
    fontWeightClasses[props.fontWeight] || 'font-normal',

    // 5. 테두리
    roundedClasses[props.rounded] || 'rounded-sm',

    // 6. 기본 칩 클래스
    'base-chip',

    // 7. 접근성 관련 클래스
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-blue-500',
  ];

  // 8. 상태별 클래스
  // 커스텀 색상이 있으면 우선 적용
  if (props.backgroundColor || props.textColor || props.borderColor) {
    return classes.join(' ');
  }

  // 없으면 기본 variant 적용
  classes.push(variantClasses[props.variant] || 'chip-grey');
  return classes.join(' ');
});

// 커스텀 스타일 계산
const customStyles = computed(() => {
  const styles: Record<string, string> = {};

  if (props.backgroundColor) {
    styles.backgroundColor = props.backgroundColor;
  }

  if (props.textColor) {
    styles.color = props.textColor;
  } else if (props.backgroundColor) {
    // backgroundColor만 입력된 경우 기본 텍스트색 적용
    styles.color = getDefaultTextColor(props.backgroundColor);
  }

  if (props.borderColor) {
    styles.borderColor = props.borderColor;
    styles.borderWidth = '1px';
    styles.borderStyle = 'solid';
  }

  return styles;
});
</script>

<template>
  <span :class="chipClasses" :style="customStyles" v-bind="ariaAttributes">
    <slot>{{ label }}</slot>
  </span>
</template>
