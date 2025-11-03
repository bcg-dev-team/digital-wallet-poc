<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';
import type { RadioOption } from '../../types/components';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed } from 'vue';

interface Props {
  /**
   * 라디오 옵션 목록
   */
  options: RadioOption[];
  /**
   * 라디오 그룹 라벨
   */
  label?: string;
  /**
   * 크기
   * @default 'md'
   */
  size?: 'sm' | 'md';
  /**
   * 라디오 스타일 variant
   * - default: 기본 스타일
   * - underline: 밑줄 스타일
   * @default 'default'
   */
  variant?: 'default' | 'underline';
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 폼에서 사용할 name 속성
   */
  name?: string;
  /**
   * 객체 비교를 위한 키 또는 비교 함수
   */
  by?: string | ((a: any, b: any) => boolean);
  /**
   * 전체 너비 사용 여부 (underline variant에서만 사용)
   */
  fullwidth?: boolean;
  /**
   * 밑줄 모드 - 선택된 옵션만 활성화, 나머지는 비활성화
   * @default false
   */
  noUnderline?: boolean;
  /**
   * 허용된 옵션 인덱스 목록
   * 지정된 인덱스의 옵션만 활성화되고, 나머지는 비활성화됩니다.
   * 예: [0, 3]이면 0번과 3번 인덱스만 활성화
   */
  allowedList?: number[];
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  label: '',
  size: 'md',
  variant: 'default',
  disabled: false,
  name: '',
  fullwidth: false,
  noUnderline: false,
  allowedList: undefined,
});

const model = defineModel<any>();

/**
 * 라디오 옵션의 클래스를 동적으로 생성하는 함수
 * @param checked - 선택된 옵션 여부
 * @param active - 활성 상태 여부
 * @param disabled - 비활성화 여부
 * @returns CSS 클래스 문자열
 */
// 컨테이너 클래스
const containerClasses = computed(() => {
  if (props.variant === 'underline') {
    return props.fullwidth ? 'flex w-full' : 'flex flex-nowrap';
  }
  return `bg-neutral-neutral050 flex gap-x-[5px] rounded-[6px] py-1 px-1`;
});

const getRadioOptionClasses = (
  checked: boolean,
  active: boolean = false,
  disabled: boolean = false
): string => {
  const baseClasses = `focus:outline-none focus:ring-0 flex items-center gap-x-2 ${props.fullwidth ? 'flex-1 justify-center' : ''}`;

  // underline variant 스타일
  if (props.variant === 'underline') {
    // 비활성화 상태
    if (disabled) {
      const sizeClasses =
        props.size === 'sm' ? 'px-4 py-3 text-sm font-medium' : 'py-3 px-6 text-base font-semibold';
      return [
        baseClasses,
        'opacity-50 cursor-not-allowed',
        sizeClasses,
        'text-default-muted-dark',
      ].join(' ');
    }

    const sizeClasses =
      props.size === 'sm' ? 'px-4 py-3 text-sm font-medium' : 'py-3 px-6 text-base font-semibold';
    const textColorClasses = checked
      ? 'bg-bg-bg-default text-default font-semibold'
      : 'bg-bg-bg-default text-default-muted-dark';

    // noUnderline이 true이고 선택되지 않은 경우 밑줄 제거
    const underlineClasses = checked
      ? props.size === 'sm'
        ? 'shadow-[inset_0_-2px_0_0_var(--input-color-border-focus)]'
        : 'shadow-[inset_0_-3px_0_0_var(--input-color-border-focus)]'
      : props.noUnderline
        ? '' // noUnderline이 true면 선택되지 않은 항목의 밑줄 제거
        : props.size === 'sm'
          ? 'shadow-[inset_0_-1px_0_0_var(--background-bg-outline)]'
          : 'shadow-[inset_0_-2px_0_0_var(--background-bg-outline)]';

    return [baseClasses, 'whitespace-nowrap', sizeClasses, textColorClasses, underlineClasses]
      .filter(Boolean)
      .join(' ');
  }

  // default variant 스타일 (기존)
  const sizeClass = props.size === 'sm' ? 'h-[28px]' : 'h-[34px]';
  const defaultBaseClasses = `${baseClasses} justify-center ${sizeClass} px-3 text-[13px] leading-[16px] tracking-tight rounded-xs transition-colors duration-200 whitespace-nowrap`;

  // 비활성화 상태
  if (disabled) {
    return [
      defaultBaseClasses,
      'opacity-50 cursor-not-allowed text-[var(--button-tab-text-off)]',
    ].join(' ');
  }

  // 선택된 상태
  if (checked) {
    return [
      defaultBaseClasses,
      'bg-[var(--button-tab-button-on)] text-[var(--button-tab-text-on)] font-semibold',
    ].join(' ');
  }

  // 활성 상태 (호버/포커스)
  if (active) {
    return [
      defaultBaseClasses,
      'bg-[var(--button-tab-button-hover)] text-[var(--button-tab-text-on)]',
    ].join(' ');
  }

  // 기본 상태
  return [
    defaultBaseClasses,
    'text-[var(--button-tab-text-off)] hover:bg-[var(--button-tab-button-hover)] hover:text-[var(--button-tab-text-on)]',
  ].join(' ');
};
</script>

<template>
  <div class="w-full">
    <!-- 라디오 그룹 컨테이너 -->
    <RadioGroup v-model="model" :disabled="disabled" :name="name" :by="by" class="space-y-2">
      <!-- 라디오 그룹 라벨 -->
      <RadioGroupLabel
        v-if="label"
        class="block text-sm font-medium text-[var(font-color-default)]"
      >
        {{ label }}
      </RadioGroupLabel>

      <!-- 라디오 옵션들 -->
      <div :class="containerClasses">
        <RadioGroupOption
          v-for="(option, index) in options"
          :key="option.value"
          :value="option.value"
          :disabled="
            option.disabled ||
            disabled ||
            (allowedList !== undefined && !allowedList.includes(index))
          "
          as="template"
          v-slot="{ checked, active, disabled: optionDisabled }"
        >
          <button
            :class="getRadioOptionClasses(checked, active, optionDisabled)"
            :disabled="optionDisabled"
            type="button"
          >
            <!-- 아이콘이 있는 경우 -->
            <BaseIcon v-if="option.icon" :name="option.icon" className="h-4 w-4" />

            <!-- 옵션 라벨 -->
            <span class="block max-w-[66px] overflow-hidden text-ellipsis whitespace-nowrap">{{
              option.label
            }}</span>
          </button>
        </RadioGroupOption>
      </div>
    </RadioGroup>
  </div>
</template>
