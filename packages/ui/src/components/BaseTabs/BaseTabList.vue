<script setup lang="ts">
import type { TabItem, TabVariant, TabsSize } from 'types/components';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { Tab } from '@headlessui/vue';

interface Props {
  /**
   * 탭 데이터
   */
  tabs: TabItem[];
  /**
   * 탭 스타일 variant
   * - underline: 밑줄 스타일 (기본)
   * - inner: 알약 형태 스타일
   */
  variant?: TabVariant;
  /**
   * 글자 크기
   * - lg: large (18px)
   * - md: medium (16px)
   */
  size?: TabsSize;
  /**
   * 밑줄 여부 (underline variant에서만 사용)
   */
  underline?: boolean;
  /**
   * 배경색 여부 (underline variant에서만 사용)
   */
  hasBackground?: boolean;
  /**
   * 현재 선택된 탭 key
   */
  selectedTabKey?: string;
  /**
   * 전체 너비 사용 여부
   */
  fullwidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'inner',
  size: 'md',
  underline: false,
  hasBackground: false,
  fullwidth: false,
  selectedTabKey: '',
});

/**
 * 탭 버튼의 클래스를 동적으로 생성하는 함수
 * @param selected - 선택된 탭 여부
 * @param disabled - 비활성화 여부
 * @returns CSS 클래스 문자열
 */
const getTabButtonClasses = (selected: boolean, disabled: boolean = false): string => {
  const baseClasses = `focus:outline-none focus:ring-0 flex items-center gap-x-2 ${props.fullwidth ? 'flex-1 justify-center' : ''}`;

  // 비활성화 상태
  if (disabled) {
    return [
      baseClasses,
      'opacity-50 cursor-not-allowed',
      props.variant === 'inner'
        ? 'px-3 py-1.5 text-[13px] leading-[16px] tracking-tight text-[var(--button-tab-text-off)]'
        : props.size === 'lg'
          ? 'py-3 px-6 text-base font-semibold text-default-muted-dark'
          : 'px-4 py-3 text-sm font-medium text-default-muted-dark',
    ].join(' ');
  }

  // inner variant 스타일
  if (props.variant === 'inner') {
    return [
      baseClasses,
      'px-3 py-1.5 text-[13px] leading-[16px] tracking-tight ',
      selected
        ? 'bg-[var(--button-tab-button-on)] text-[var(--button-tab-text-on)] rounded-xs font-medium'
        : 'text-[var(--button-tab-text-off)]',
    ].join(' ');
  }

  // Underline variant 스타일 (기본)
  const sizeClasses =
    props.size === 'lg'
      ? selected
        ? 'py-3 px-6 text-base font-semibold'
        : 'py-3 px-6 text-base font-normal'
      : selected
        ? 'px-4 py-3 text-sm font-medium'
        : 'px-4 py-3 text-sm font-normal';

  const textColorClasses = selected
    ? 'bg-bg-bg-default text-default'
    : props.hasBackground
      ? 'bg-bg-bg-surface text-default-muted-dark'
      : 'bg-bg-bg-default text-default-muted-dark';

  const underlineClasses = selected
    ? props.size === 'lg'
      ? 'shadow-[inset_0_-3px_0_0_var(--input-color-border-focus)]'
      : 'shadow-[inset_0_-2px_0_0_var(--input-color-border-focus)]'
    : props.underline
      ? props.size === 'lg'
        ? 'shadow-[inset_0_-3px_0_0_var(--background-bg-outline)]'
        : 'shadow-[inset_0_-2px_0_0_var(--background-bg-outline)]'
      : '';

  return [baseClasses, 'whitespace-nowrap ', sizeClasses, textColorClasses, underlineClasses]
    .filter(Boolean)
    .join(' ');
};

/**
 * 컨테이너의 클래스를 반환하는 함수
 * @returns CSS 클래스 문자열
 */
const getContainerClasses = (): string => {
  if (props.variant === 'inner') {
    return 'flex p-1 bg-neutral-neutral050 rounded-[6px] gap-x-[10px]';
  }
  return props.fullwidth ? 'flex w-full' : 'flex flex-nowrap';
};
</script>

<template>
  <div :class="getContainerClasses()">
    <Tab
      v-for="(tab, index) in tabs"
      as="template"
      :key="index"
      v-slot="{ selected }"
      :disabled="tab.disabled"
    >
      <button :class="getTabButtonClasses(selected, tab.disabled)" :disabled="tab.disabled">
        <BaseIcon v-if="tab.icon" :name="tab.icon" />
        {{ tab.label }}
      </button>
    </Tab>
  </div>
</template>
