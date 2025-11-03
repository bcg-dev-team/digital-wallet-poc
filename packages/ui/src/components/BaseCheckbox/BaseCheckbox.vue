<!--
  Figma 컴포넌트: Input/Checkbox (node-id: 29-405)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=29-405&m=dev
-->
<script setup lang="ts">
import type { ComponentSize } from '../../types/components';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed, onMounted, ref } from 'vue';

/**
 * BaseCheckbox - 체크박스 컴포넌트
 *
 * @props modelValue - 체크 여부 (v-model)
 * @props disabled - 비활성화 여부
 * @props indeterminate - 부분 선택 상태 (3-state checkbox)
 * @props size - 컴포넌트 크기 (sm: 16px, md: 18px, lg: 20px)
 * @emits update:modelValue - 값 변경 시 발생
 */
interface Props {
  /**
   * 체크 여부 (v-model)
   */
  modelValue: boolean;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 부분 선택 상태 (3-state checkbox)
   * @default false
   */
  indeterminate?: boolean;
  /**
   * 컴포넌트 크기
   * - sm: 16px
   * - md: 18px (기본)
   * - lg: 20px
   * @default 'md'
   */
  size?: ComponentSize;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  indeterminate: false,
  size: 'md',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

// 상태 계산
const isChecked = computed(() => props.modelValue);
const isDisabled = computed(() => props.disabled);
const isIndeterminate = computed(() => props.indeterminate);

// 체크박스 스타일 계산
const checkboxStyles = computed(() => {
  const styles: Record<string, string> = {};

  styles.width = `${sizeToBoxSize[props.size]}`;
  styles.height = `${sizeToBoxSize[props.size]}`;

  if (isDisabled.value) {
    if (isChecked.value) {
      // Disabled + Checked
      styles.backgroundColor = 'var(--base-colors-neutral-neutral400)';
      styles.borderColor = 'var(--base-colors-neutral-neutral400)';
    } else {
      // Disabled + Unchecked
      styles.backgroundColor = 'var(--base-colors-neutral-neutral300)';
      styles.borderColor = 'var(--base-colors-neutral-neutral400)';
    }
  } else {
    if (isChecked.value || isIndeterminate.value) {
      // Enabled + Checked or Indeterminate
      styles.backgroundColor = 'var(--base-colors-primary-primary800)';
      styles.borderColor = 'var(--base-colors-primary-primary800)';
    } else {
      // Enabled + Unchecked
      styles.backgroundColor = 'var(--input-check-radio-active-bg)';
      styles.borderColor = 'var(--base-colors-neutral-neutral400)';
    }
  }

  return styles;
});

// 크기별 스타일 계산
const sizeToBoxSize: Record<ComponentSize, string> = {
  sm: 'var(--base-size-size-16)',
  md: 'var(--base-size-size-18)',
  lg: 'var(--base-size-size-20)',
};

const containerBoxStyle = computed(() => {
  return {
    flexShrink: '0',
    boxSizing: 'border-box',
  } as Record<string, string>;
});

// 이벤트 핸들러
const handleClick = () => {
  if (!isDisabled.value) {
    emit('update:modelValue', !isChecked.value);
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
};

// hidden input 요소에 대한 참조
const hiddenInput = ref<HTMLInputElement>();

// indeterminate 속성을 실제 DOM 요소에 설정
onMounted(() => {
  if (hiddenInput.value) {
    hiddenInput.value.indeterminate = props.indeterminate;
  }
});
</script>

<template>
  <div
    class="inline-flex min-w-fit flex-shrink-0 cursor-pointer select-none items-center gap-1 align-top leading-none"
    :class="{ 'cursor-not-allowed': isDisabled }"
    @click="handleClick"
    @keydown="handleKeydown"
    tabindex="0"
    role="checkbox"
    :aria-checked="isIndeterminate ? 'mixed' : isChecked ? 'true' : 'false'"
    :aria-disabled="isDisabled"
  >
    <div class="flex items-center justify-center">
      <!-- 체크박스 박스 -->
      <div
        class="box-border flex h-full w-full items-center justify-center rounded-[3px] border border-[1.5px]"
        :style="checkboxStyles"
      >
        <!-- 체크 아이콘 (체크된 상태) -->
        <BaseIcon v-if="isChecked && !isIndeterminate" name="check-sm" color="white" />

        <!-- 부분 선택 아이콘 (indeterminate 상태) -->
        <BaseIcon v-if="isIndeterminate" name="minus" color="white" />
      </div>
    </div>

    <!-- 숨겨진 실제 input 요소 -->
    <input
      type="checkbox"
      class="sr-only"
      :checked="isChecked"
      :disabled="isDisabled"
      :indeterminate="isIndeterminate"
      @change="(e) => emit('update:modelValue', (e.target as HTMLInputElement).checked)"
      ref="hiddenInput"
    />

    <!-- 라벨 슬롯 -->
    <slot />
  </div>
</template>
