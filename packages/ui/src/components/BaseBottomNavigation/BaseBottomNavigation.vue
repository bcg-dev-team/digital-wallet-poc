<!-- BaseBottomNavigation - 하단 네비게이션 컴포넌트 -->
<script setup lang="ts">
/**
 * BaseBottomNavigation - 하단 네비게이션 컴포넌트
 *
 * Material UI의 Bottom Navigation을 참고하여 구현된 Vue 3 컴포넌트입니다.
 * 3-5개의 네비게이션 아이템을 하단에 표시하며, 각 아이템은 아이콘과 라벨을 가집니다.
 *
 * @props items - 네비게이션 아이템 배열
 * @props value - 현재 선택된 아이템의 값
 * @props showLabels - 라벨 표시 여부 (3개 이하일 때는 항상 표시)
 * (fixed 제거)
 * @emits change - 선택된 아이템이 변경될 때 발생
 */
import type { IconName } from '../../types/icons';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed, ref } from 'vue';

/**
 * 네비게이션 아이템 타입
 */
export interface BottomNavigationItem {
  /** 아이템의 고유 값 */
  value: string | number;
  /** 아이템 라벨 */
  label: string;
  /** 아이콘 이름 */
  icon: IconName;
  /** 아이콘 크기 */
  iconSize?: 'sm' | 'md' | 'lg';
  /** 아이콘 색상 */
  iconColor?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

interface Props {
  /** 네비게이션 아이템 배열 */
  items: BottomNavigationItem[];
  /** 현재 선택된 아이템의 값 */
  value?: string | number;
  /** 라벨 표시 여부 (3개 이하일 때는 자동으로 true) */
  showLabels?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  showLabels: undefined,
});

const emit = defineEmits<{
  (e: 'change', value: string | number, item: BottomNavigationItem): void;
}>();

/**
 * 라벨 표시 여부 계산
 * 3개 이하일 때는 항상 표시, 4-5개일 때는 showLabels prop에 따라 결정
 */
const shouldShowLabels = computed(() => {
  if (props.showLabels !== undefined) {
    return props.showLabels;
  }
  return props.items.length <= 3;
});

/**
 * 네비게이션 컨테이너 클래스 계산
 */
const navigationClasses = computed(() => {
  const classes = [
    'base-bottom-navigation',
    shouldShowLabels.value
      ? 'base-bottom-navigation--with-labels'
      : 'base-bottom-navigation--icons-only',
  ].filter(Boolean);

  return classes.join(' ');
});

/**
 * 아이템 클릭 핸들러
 */
const handleItemClick = (item: BottomNavigationItem) => {
  if (item.disabled) return;
  emit('change', item.value, item);
};

/**
 * 아이템이 활성화 상태인지 확인
 */
const isItemActive = (item: BottomNavigationItem) => {
  return props.value === item.value;
};

/**
 * 아이콘 크기 매핑
 */
const getIconSize = (iconSize?: string) => {
  switch (iconSize) {
    case 'sm':
      return 'sm';
    case 'lg':
      return 'lg';
    default:
      return 'md';
  }
};
</script>

<template>
  <nav :class="navigationClasses" role="navigation" :aria-label="'하단 네비게이션'">
    <div class="base-bottom-navigation__container">
      <button
        v-for="item in items"
        :key="item.value"
        :class="[
          'base-bottom-navigation__item',
          {
            'base-bottom-navigation__item--active': isItemActive(item),
            'base-bottom-navigation__item--disabled': item.disabled,
          },
        ]"
        :disabled="item.disabled"
        :aria-label="item.label"
        :aria-current="isItemActive(item) ? 'page' : undefined"
        @click="handleItemClick(item)"
      >
        <!-- 아이콘 -->
        <div class="base-bottom-navigation__icon">
          <BaseIcon :name="item.icon" :size="getIconSize(item.iconSize)" :color="item.iconColor" />
        </div>

        <!-- 라벨 (showLabels가 true일 때만) -->
        <span v-if="shouldShowLabels" class="base-bottom-navigation__label">
          {{ item.label }}
        </span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
@import './BaseBottomNavigation.scss';
</style>
