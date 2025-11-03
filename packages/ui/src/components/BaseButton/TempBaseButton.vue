<script setup lang="ts">
/**
 * BaseButton - Figma 버튼 컴포넌트 1:1 구현
 * @props variant - 버튼 스타일 (contained, contained-grey, outlined, light, chip)
 * @props color - 버튼 색상 (primary, red, blue, green, cancel, grey, white)
 * @props size - 버튼 크기 (lg, md, sm)
 * @props label - 버튼 텍스트
 * @props subLabel - 서브 텍스트 (optional)
 * @emits click - 클릭 이벤트
 */
import type { ComponentSize, InnerIconProps } from '../../types/components';
import BaseSkeleton from '../BaseSkeleton/BaseSkeleton.vue';
import { useTheme } from '../../composables/useTheme';
import { computed } from 'vue';

const { isDark } = useTheme();

/**
 * 버튼 색상 타입
 */
export type ButtonColor = 'red' | 'blue';

interface Props {
  /**
   * 버튼 스타일
   * - contained-grey: 회색 배경 (특수 용도)
   * - light: 파스텔톤 배경 + 외곽선
   */
  variant?: 'contained-grey' | 'light';
  /**
   * 버튼 컬러 (variant와 조합하여 사용)
   * - red: 빨간색
   * - blue: 파란색
   */
  color?: 'red' | 'blue';
  /**
   * 버튼 크기
   * - lg: large (48px)
   * - md: medium (40px)
   * - sm: small (32px)
   */
  size?: ComponentSize | 'mini';

  /**
   * 버튼 텍스트
   */
  label?: string;
  /**
   * 서브 텍스트
   */
  subLabel?: string;
  /**
   * 부모 컨테이너 100% 너비로 확장
   */
  fullWidth?: boolean;

  /**
   * 커스텀 클래스 (button/a에 직접 적용)
   */
  customClass?: string;
  /**
   * 로딩 상태 여부
   */
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  color: 'red',
  size: 'lg',
  fullWidth: false,
  label: '',
});

const getDarkStyle = {
  light: { varient: props.variant },
};

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

// 미리 정의된 색상 목록
const predefinedColors: readonly ButtonColor[] = ['red', 'blue'];

// 텍스트 영역 표시 여부 계산
const showText = computed(() => {
  return props.label || props.subLabel;
});

// 버튼 클래스 계산
const buttonClasses = computed(() => {
  const classes = [
    'inline-flex items-center justify-center gap-2.5',
    'transition-all duration-200',
    'select-none',
    'focus:outline-none',
    props.fullWidth ? 'w-full' : '',
    !isDark.value
      ? `btn-variant-${props.variant}`
      : props.variant === 'light'
        ? 'btn-variant-contained'
        : `btn-variant-${props.variant}`,
    `btn-size-${props.size}`,
  ];
  // customClass가 없을 때만 color 클래스 적용
  if (predefinedColors.includes(props.color as ButtonColor)) {
    classes.push(`btn-color-${props.color}`);
  }
  // customClass는 항상 마지막에 push (우선순위 보장)
  if (props.customClass) classes.push(props.customClass);
  return classes;
});

// 마우스 클릭 핸들러
function handleClick(e: MouseEvent) {
  emit('click', e);
}

// <a role="button"> 키보드 접근성 핸들러
function handleKeydown(e: KeyboardEvent) {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    emit('click', e as any);
  }
}

// 스켈레톤 크기 계산 - CSS 값 기반 동적 계산
const getSkeletonWidth = () => {
  // 텍스트 길이 기반 계산
  const textLength = props.label?.length || 0;
  const subTextLength = props.subLabel?.length || 0;

  const getFontSize = () => {
    switch (props.size) {
      case 'md':
        return 14; // btn-size-md font-size: 14px
      case 'sm':
        return 13; // btn-size-sm font-size: 13px
      case 'mini':
        return 12; // btn-size-mini font-size: 12px
      default:
        return 16; // btn-size-lg font-size: 16px
    }
  };

  const getPadding = () => {
    switch (props.size) {
      case 'md':
        return { x: 20, y: 6 }; // padding: 6px 20px
      case 'sm':
        return { x: 12, y: 10 }; // padding: 10px 12px
      case 'mini':
        return { x: 10, y: 2 }; // padding: 2px 8px
      default:
        return { x: 16, y: 12 }; // padding: 12px 16px
    }
  };

  const getIconSize = () => {
    switch (props.size) {
      case 'md':
        return 24;
      case 'sm':
      case 'mini':
        return 16;
      default:
        return 24;
    }
  };

  const fontSize = getFontSize();
  const padding = getPadding();

  // 문자당 너비 계산 (폰트 크기의 60% 정도)
  const charWidth = fontSize * 0.6;

  // 텍스트 너비 계산
  let textWidth = textLength * charWidth;
  if (subTextLength > 0) {
    // 서브 텍스트는 더 작은 폰트 크기 사용
    const subFontSize = props.size === 'mini' ? 10 : props.size === 'sm' ? 12 : 14; // .btn-sub-text font-size
    const subCharWidth = subFontSize * 0.6;
    textWidth = Math.max(textWidth, subTextLength * subCharWidth);
  }

  // 아이콘 공간 계산
  let iconSpace = 0;

  // 전체 너비 계산
  const totalWidth = textWidth + iconSpace + padding.x * 2;

  // 최소/최대 제한 (CSS 값 기반)
  // TODO: CSS 변수로 추출 가능: --button-min-width, --button-max-width 등
  const minWidth =
    props.size === 'md' ? 60 : props.size === 'sm' ? 50 : props.size === 'mini' ? 40 : 80;
  const maxWidth = 400;

  return Math.max(minWidth, Math.min(maxWidth, totalWidth)) + 'px';
};

const getSkeletonHeight = () => {
  // CSS에서 정의된 높이 기반 계산
  // TODO: CSS 변수로 추출 가능: --button-height-small, --button-height-regular 등
  const getBaseHeight = () => {
    switch (props.size) {
      case 'md':
        return 40; // height: 40px
      case 'sm':
        return 36; // height: 36px
      case 'mini':
        return 20; // height: 20px
      default:
        return 48; // height: 48px (lg)
    }
  };

  const baseHeight = getBaseHeight();
  const hasSubLabel = !!props.subLabel;

  // 서브 라벨이 있으면 추가 높이
  if (hasSubLabel) {
    const subLabelHeight = props.size === 'mini' ? 14 : props.size === 'sm' ? 16 : 18; // .btn-sub-text line-height
    const subLabelMargin = 2; // .btn-sub-text margin-top: 2px
    return baseHeight + subLabelHeight + subLabelMargin + 'px';
  }

  return baseHeight + 'px';
};
</script>

<template>
  <component
    v-if="!props.isLoading"
    :is="'button'"
    role="button"
    type="button"
    :class="[...buttonClasses, 'focus-ring']"
    :style="
      !predefinedColors.includes(props.color as ButtonColor)
        ? { '--button-custom-color': props.color }
        : {}
    "
    :aria-label="props.label"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <!-- 텍스트 영역 (중앙 아이콘이 없을 때만) -->
    <div v-if="showText" class="flex flex-col items-center justify-center">
      <span :class="['font-medium', props.subLabel ? 'btn-main-label' : 'btn-label']">{{
        props.label
      }}</span>
      <span v-if="props.subLabel" class="btn-sub-text font-semibold">
        {{ props.subLabel }}
      </span>
    </div>

    <!-- 기본 슬롯 -->
    <slot />
  </component>

  <!-- 스켈레톤 상태 -->
  <div v-else class="button-skeleton">
    <BaseSkeleton
      :width="getSkeletonWidth()"
      :height="getSkeletonHeight()"
      variant="rectangular"
      class="button-skeleton-element"
    />
  </div>
</template>

<style scoped>
.button-skeleton {
  display: inline-block;
}

.button-skeleton-element {
  border-radius: var(--radius-sm);
}
</style>
