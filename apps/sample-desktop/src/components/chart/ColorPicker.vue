<!--
  @fileoverview 색상 선택 컴포넌트
  @component ColorPicker
  FIXME: 임의 구현한 사항으로, 피그마 기획 요청 및 수정 필요
-->
<template>
  <button
    :class="['color-picker', { disabled: disabled }]"
    :disabled="disabled"
    :title="title"
    @click="openColorPicker"
  >
    <div class="color-preview" :style="{ backgroundColor: modelValue }"></div>
    <input
      ref="colorInput"
      type="color"
      :value="modelValue"
      @input="handleColorChange"
      class="hidden-input"
    />
  </button>
</template>

<script setup lang="ts">
import './ColorPicker.scss';
import { ref } from 'vue';

interface Props {
  /**
   * 선택된 색상 값
   */
  modelValue: string;
  /**
   * 비활성화 상태
   */
  disabled?: boolean;
  /**
   * 툴팁 제목
   */
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  title: '색상 선택',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  change: [value: string];
}>();

const colorInput = ref<HTMLInputElement>();

/**
 * 색상 선택기를 열기
 */
const openColorPicker = () => {
  if (!props.disabled && colorInput.value) {
    colorInput.value.click();
  }
};

/**
 * 색상 변경 처리
 */
const handleColorChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newColor = target.value;

  emit('update:modelValue', newColor);
  emit('change', newColor);
};
</script>
