<script setup lang="ts">
/**
 * BaseBadge - Material UI와 Element Plus를 참고한 배지 컴포넌트
 * @props value - 배지에 표시할 값 (숫자 또는 문자열)
 * @props max - 최대값 (숫자일 때만 적용)
 * @props variant - 배지 스타일 (dot: 점 형태, standard: 값 표시)
 * @props color - 배지 색상
 * @props showZero - 0일 때도 표시할지 여부
 * @props hidden - 배지 숨김 여부
 * @props overlap - 겹침 여부 (overlap: 겹쳐서, no-overlap: 나란히)
 * @props anchorOrigin - 배지 위치 (overlap일 때만 적용)
 */
import { BadgeColor, BadgeVariant, BadgeOverlap, BadgeAnchorOrigin } from '../../types/components';
import { computed } from 'vue';
import './BaseBadge.scss';
interface Props {
  /**
   * 배지에 표시할 값
   */
  value: number;
  /**
   * 최대값 (숫자일 때만 적용)
   */
  max?: number;
  /**
   * 배지 스타일
   * - dot: 작은 점 형태
   * - standard: 값이 표시되는 형태
   */
  variant?: BadgeVariant;
  /**
   * 배지 색상
   */
  color?: BadgeColor;
  /**
   * 0일 때도 표시할지 여부
   */
  showZero?: boolean;
  /**
   * 배지 숨김 여부
   */
  hidden?: boolean;
  /**
   * 배지 겹침 여부
   * - overlap: 컨텐츠에 겹쳐서 배치 (Material UI 스타일)
   * - no-overlap: 컨텐츠 옆에 나란히 배치
   */
  overlap?: BadgeOverlap;
  /**
   * 배지 위치 (overlap일 때만 적용)
   */
  anchorOrigin?: BadgeAnchorOrigin;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 99,
  variant: 'standard',
  color: 'red',
  showZero: false,
  hidden: false,
  overlap: 'overlap',
  anchorOrigin: () => ({ vertical: 'top', horizontal: 'right' }),
});

// 배지 표시 여부 계산
const shouldShowBadge = computed(() => {
  if (props.hidden) return false;
  if (props.variant === 'dot') return true;

  return props.showZero ? true : props.value > 0;
});

// 배지 표시 값 계산
const displayValue = computed(() => {
  if (props.variant === 'dot') return;
  if (typeof props.value === 'number') {
    return props.value > props.max ? `${props.max}+` : props.value;
  }
  return props.value;
});

// square 변형에 대한 강제 배치 규칙 적용
const effectiveOverlap = computed<BadgeOverlap>(() => {
  return props.variant === 'square' ? 'no-overlap' : props.overlap;
});

const effectiveAnchor = computed<BadgeAnchorOrigin>(() => {
  return props.variant === 'square'
    ? { vertical: 'middle', horizontal: 'right' }
    : props.anchorOrigin!;
});

// 배지 클래스 계산
const badgeClasses = computed(() => {
  const classes = [
    'base-badge',
    `base-badge--${props.variant}`,
    `base-badge--${props.color}`,
    `base-badge--${effectiveOverlap.value}`,
  ];

  // 위치 클래스 추가 (overlap과 no-overlap 모두)
  classes.push(`base-badge--${effectiveAnchor.value.vertical}-${effectiveAnchor.value.horizontal}`);

  return classes;
});
</script>

<template>
  <div :class="['base-badge-wrapper', `base-badge-wrapper--${props.overlap}`]">
    <!-- 슬롯 컨텐츠 -->
    <slot />

    <!-- 배지 -->
    <span v-if="shouldShowBadge" :class="badgeClasses">
      {{ displayValue }}
    </span>
  </div>
</template>
