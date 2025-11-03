<!--
  Figma 컴포넌트: Input/Stepper
  BaseInput을 확장한 스테퍼 입력 컴포넌트
-->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed, ref, watch } from 'vue';

/**
 * BaseInputStepper - 스테퍼 입력 컴포넌트
 *
 * @props modelValue - 현재 값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props size - 크기 (sm, md)
 * @props disabled - 비활성화 여부
 * @props min - 최소값 (기본: 제한 없음, 음수 가능)
 * @props max - 최대값 (기본: 제한 없음)
 * @props step - 증감 단위 (기본: 0.00001)
 * @props variant - 표시 형식: 기본값(default) | 단위(unit) | 범위(range)
 * @props unitLabel - variant가 unit일 때 뒤에 표시할 단위 문자열 (기본: 'Lot')
 * @emits update:modelValue - 값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Props {
  /**
   * 현재 값 (v-model)
   */
  modelValue?: number;
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  /**
   * 크기
   * @default 'sm'
   */
  size?: 'sm' | 'md';
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 최소값 (기본: 제한 없음, 음수 가능)
   */
  min?: number;
  /**
   * 최대값 (기본: 제한 없음)
   */
  max?: number;
  /**
   * 증감 단위
   * @default 0.00001
   */
  step?: number;
  /**
   * 표시 형식: 기본(default) | 단위(unit) | 범위(range)
   * @default 'default'
   */
  variant?: 'default' | 'unit' | 'range';
  /**
   * 단위 표시 텍스트 (variant가 'unit'일 때 사용)
   * @default 'Lot'
   */
  unitLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  placeholder: '',
  size: 'sm',
  disabled: false,
  min: undefined,
  max: undefined,
  step: 0.00001,
  variant: 'default',
  unitLabel: 'Lot',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
}>();

// 로컬 상태로 값 관리 (초기값 처리 개선)
const localValue = ref(props.modelValue ?? 0);

// props.modelValue 변경 시 로컬 상태 동기화
watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue ?? 0;
  }
);

// 아이콘 크기 계산
const iconSize = computed(() => {
  return props.size === 'sm' ? 'sm' : 'md';
});

// 최소/최대값 체크 (음수 지원 개선)
const canDecrease = computed(() => {
  if (props.disabled) return false;
  // min이 설정되어 있을 때만 체크: 감소 후 값이 min보다 작아지면 감소 불가
  if (props.min !== undefined && localValue.value - props.step < props.min) return false;
  return true;
});

const canIncrease = computed(() => {
  if (props.disabled) return false;
  // max가 설정되어 있을 때만 체크: 증가 후 값이 max보다 커지면 증가 불가
  if (props.max !== undefined && localValue.value + props.step > props.max) return false;
  return true;
});

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  // 숫자, 소수점, 음수 기호만 허용하는 정규식
  const validPattern = /^-?(\d+)?\.?\d*$/;

  // 유효하지 않은 문자 제거
  let cleanValue = value.replace(/[^0-9.-]/g, '');

  // 음수 기호(-) 처리: 맨 앞에만 허용
  if (cleanValue.indexOf('-') > 0) {
    cleanValue = cleanValue.replace(/-/g, '');
  }

  // 소수점(.) 처리: 하나만 허용
  const dotCount = (cleanValue.match(/\./g) || []).length;
  if (dotCount > 1) {
    const firstDotIndex = cleanValue.indexOf('.');
    cleanValue =
      cleanValue.substring(0, firstDotIndex + 1) +
      cleanValue.substring(firstDotIndex + 1).replace(/\./g, '');
  }

  // 입력값이 변경되었으면 input 값 업데이트
  if (value !== cleanValue) {
    input.value = cleanValue;
  }

  // 빈 값이나 '-'만 있는 경우 처리
  if (cleanValue === '' || cleanValue === '-') {
    localValue.value = 0;
    return;
  }

  // 숫자 파싱 및 검증
  const numValue = parseFloat(cleanValue);
  if (!Number.isFinite(numValue)) {
    // 잘못된 입력은 무시하고 이전 값 유지
    return;
  }

  // 범위 제한 적용
  const clampedValue = clampToRange(numValue);
  localValue.value = clampedValue;
  emit('update:modelValue', clampedValue);
};

const clampToRange = (value: number) => {
  let v = value;
  if (props.min !== undefined) v = Math.max(v, props.min);
  if (props.max !== undefined) v = Math.min(v, props.max);
  return v;
};

// 부동소수점 연산 오차 제거 (최대 10자리까지 정리)
const roundToSafe = (value: number): number => {
  return Math.round(value * 1e10) / 1e10;
};

const handleDecrease = (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!canDecrease.value) return;
  const newValue = roundToSafe(localValue.value - props.step);
  const clampedValue = clampToRange(newValue);
  localValue.value = clampedValue;
  emit('update:modelValue', clampedValue);
};

const handleIncrease = (event?: Event) => {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!canIncrease.value) return;
  const newValue = roundToSafe(localValue.value + props.step);
  const clampedValue = clampToRange(newValue);
  localValue.value = clampedValue;
  emit('update:modelValue', clampedValue);
};

const handleFocus = (event: FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  emit('blur', event);
};

// 숫자, 소수점, 음수 기호만 허용하는 키보드 입력 제한
const handleKeydown = (event: KeyboardEvent) => {
  const key = event.key;
  const currentValue = (event.target as HTMLInputElement).value;

  // 허용되는 키들: 숫자, 백스페이스, 삭제, 탭, 화살표, 엔터, 이스케이프
  const allowedKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Home',
    'End',
  ];

  // 허용된 키는 통과
  if (allowedKeys.includes(key)) {
    return;
  }

  // 숫자 (0-9) 허용
  if (/^[0-9]$/.test(key)) {
    return;
  }

  // 소수점 (.) 허용 (이미 있으면 차단)
  if (key === '.' && !currentValue.includes('.')) {
    return;
  }

  // 음수 기호 (-) 허용 (맨 앞에만, 이미 있으면 차단)
  if (
    key === '-' &&
    !currentValue.includes('-') &&
    (event.target as HTMLInputElement).selectionStart === 0
  ) {
    return;
  }

  // 그 외 모든 입력 차단
  event.preventDefault();
};

// 입력 필드용 값 (step과 무관하게 입력된 값 그대로 표시)
const inputValue = computed(() => {
  return localValue.value.toString();
});
</script>

<template>
  <div class="flex h-[34px] w-full items-center">
    <!-- Range prefix (variant='range'일 때) -->
    <div
      v-if="variant === 'range'"
      class="bg-input-surface border-input-border-static flex select-none items-center justify-center rounded-l-[6px] border border-r-0 py-2 pl-3 text-[14px] font-normal leading-[18px]"
      :class="{
        'cursor-not-allowed opacity-50': disabled,
      }"
    >
      ~
    </div>

    <!-- 숫자 입력 필드 -->
    <input
      type="text"
      inputmode="decimal"
      class="bg-input-surface border-input-border-static min-w-0 flex-1 border px-3 py-2 text-[14px] font-normal leading-[18px] focus:outline-none"
      :class="{
        'cursor-not-allowed opacity-50': disabled,
        'rounded-l-[6px] border-r-0': variant === 'default' || variant === 'unit',
        'border-r-0': variant === 'range' || variant === 'unit',
        'border-l-0': variant === 'range',
      }"
      :value="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <!-- Unit suffix (variant='unit'일 때) -->
    <div
      v-if="variant === 'unit'"
      class="bg-input-surface border-input-border-static flex select-none items-center justify-center border border-l-0 border-r-0 px-3 py-2 text-[14px] font-normal leading-[18px]"
    >
      {{ unitLabel }}
    </div>

    <!-- 증가 버튼 -->
    <div
      class="bg-input-surface border-input-border-static flex cursor-pointer items-center justify-center border px-1 py-[9px] transition-colors hover:bg-gray-50"
      :class="{
        'cursor-not-allowed opacity-50': !canIncrease,
      }"
      @mousedown="handleIncrease"
      @click.prevent.stop
    >
      <BaseIcon name="plus" :size="iconSize" />
    </div>

    <!-- 감소 버튼 -->
    <div
      class="bg-input-surface border-input-border-static flex cursor-pointer items-center justify-center rounded-r-[6px] border border-l-0 px-1 py-[9px] transition-colors hover:bg-gray-50"
      :class="{ 'cursor-not-allowed opacity-50': !canDecrease }"
      @mousedown="handleDecrease"
      @click.prevent.stop
    >
      <BaseIcon name="minus" :size="iconSize" />
    </div>
  </div>
</template>
