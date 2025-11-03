<!-- BaseListItemAvatar - 리스트 아이템 내부에서 사용하는 아바타 컴포넌트 -->
<script setup lang="ts">
/**
 * BaseListItemAvatar - 리스트 아이템 내부에서 사용하는 아바타 컴포넌트
 *
 * 이 컴포넌트는 BaseListItem의 content 슬롯 내부에서 사용되어야 합니다.
 *
 * @props src - 아바타 이미지 URL
 * @props alt - 이미지 대체 텍스트
 * @props size - 아바타 크기 (sm, md, lg)
 * @props variant - 아바타 스타일 (circular, rounded, square)
 * @props icon - 직접 표시할 BaseIcon (src보다 우선순위 높음)
 * @props fallback - 이미지 로드 실패 시 표시할 텍스트 또는 아이콘
 * @props color - 아바타 색상 테마 (primary, red, blue, green, purple)
 * @emits error - 이미지 로드 실패 시 발생
 */
import type { InnerIconProps } from '../../types/components';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed, ref } from 'vue';

interface Props {
  /** 아바타 이미지 URL */
  src?: string;
  /** 이미지 대체 텍스트 */
  alt?: string;
  /** 아바타 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 아바타 스타일 */
  variant?: 'circular' | 'rounded' | 'square';
  /** 직접 표시할 BaseIcon (src보다 우선순위 높음) */
  icon?: InnerIconProps;
  /** 이미지 로드 실패 시 표시할 텍스트 또는 아이콘 */
  fallback?: string | InnerIconProps;
  /** 아바타 색상 테마 */
  color?: 'default' | 'primary' | 'red' | 'blue' | 'green' | 'purple';
  /** 아바타 투명도 */
  opacity?: number;
}

interface Emits {
  (e: 'error', error: Event): void;
}

const props = withDefaults(defineProps<Props>(), {
  src: undefined,
  alt: '',
  size: 'md',
  variant: 'circular',
  icon: undefined,
  fallback: undefined,
  color: 'default',
  opacity: 1,
});

const emit = defineEmits<Emits>();

const imageError = ref(false);

/**
 * 아바타 클래스 계산
 */
const avatarClasses = computed(() => {
  const classes = ['list-item-avatar'];

  classes.push(`list-item-avatar--${props.size}`);
  classes.push(`list-item-avatar--${props.variant}`);

  if (props.color !== 'default') {
    classes.push(`list-item-avatar--${props.color}`);
  }

  if (imageError.value) {
    classes.push('list-item-avatar--error');
  }

  return classes.join(' ');
});

/**
 * 아바타 크기 스타일 계산
 */
const avatarSize = computed(() => {
  const sizeMap = {
    sm: 'var(--base-size-size-40)',
    md: '44px',
    lg: 'var(--base-size-size-48)',
  };
  return sizeMap[props.size];
});

/**
 * 이미지 에러 처리
 */
const handleImageError = (event: Event) => {
  imageError.value = true;
  emit('error', event);
};

/**
 * 이미지 로드 성공 처리
 */
const handleImageLoad = () => {
  imageError.value = false;
};
</script>

<template>
  <div :class="avatarClasses" :style="[{ width: avatarSize, height: avatarSize }]">
    <!-- 직접 지정된 아이콘이 있는 경우 (최우선) -->
    <div v-if="icon" class="list-item-avatar__icon">
      <BaseIcon
        :name="icon.name"
        :size="icon.size || 'md'"
        :color="icon.color || 'var(--input-icon-default)'"
        className="list-item-avatar__icon-content"
        :style="{ opacity: opacity }"
      />
    </div>

    <!-- 이미지가 있고 에러가 없는 경우 -->
    <img
      v-else-if="src && !imageError"
      :src="src"
      :alt="alt"
      class="list-item-avatar__image"
      @error="handleImageError"
      @load="handleImageLoad"
    />

    <!-- 폴백 콘텐츠 (이미지가 없거나 에러가 있는 경우) -->
    <div v-else class="list-item-avatar__fallback">
      <!-- 아이콘 폴백 -->
      <BaseIcon
        v-if="typeof fallback === 'object'"
        :name="fallback.name"
        :size="fallback.size || 'md'"
        className="list-item-avatar__fallback-icon"
      />
      <!-- 텍스트 폴백 -->
      <span v-else-if="typeof fallback === 'string'" class="list-item-avatar__fallback-text">
        {{ fallback }}
      </span>
      <!-- 기본 폴백 (사용자 아이콘) -->
      <BaseIcon v-else name="person" size="md" className="list-item-avatar__fallback-icon" />
    </div>
  </div>
</template>
