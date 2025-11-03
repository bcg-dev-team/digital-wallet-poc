<script setup lang="ts">
/**
 * BaseSwitch - Figma 토글 스위치 컴포넌트 1:1 구현
 * @props size - 스위치 크기 (sm: 20px, md: 24px)
 * @props disabled - 비활성화 여부
 * @figma Button/Toggle(20px) (node-id: 36-182)
 */
import type { SwitchSize } from '../../types/components';
import { computed } from 'vue';

interface Props {
  /**
   * 스위치 크기
   * - sm: 20px 높이 (작은 토글)
   * - md: 24px 높이 (기본 토글)
   */
  size?: SwitchSize;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
});

// defineModel을 사용하여 v-model 자동 처리 (기본값 false)
const modelValue = defineModel<boolean>({ default: false });

// 스위치 클래스 계산
const switchClasses = computed(() => {
  const classes = [
    'base-switch',
    'relative inline-flex transition-all duration-200',
    'focus:outline-none',
  ];

  if (props.size === 'sm') {
    classes.push('w-[34px] h-[20px]');
  } else {
    classes.push('w-[50px] h-[24px]');
  }

  if (props.disabled) {
    classes.push('base-switch--disabled');
  }

  return classes.join(' ');
});

// 배경 클래스 계산
const backgroundClasses = computed(() => {
  const classes = [
    'base-switch__background',
    'absolute inset-0 rounded-full transition-all duration-200',
  ];

  if (modelValue.value) {
    classes.push('base-switch__background--on');
  } else {
    classes.push('base-switch__background--off');
  }

  return classes.join(' ');
});

// 썸 클래스 계산
const thumbClasses = computed(() => {
  const classes = ['base-switch__thumb', 'absolute rounded-full transition-all duration-200'];

  if (props.size === 'sm') {
    // 20px 크기: 14px 썸
    classes.push('w-[14px] h-[14px] top-[3px]');
    if (modelValue.value) {
      classes.push('translate-x-[17px]'); // On 상태: 오른쪽으로 이동
    } else {
      classes.push('translate-x-[3px]'); // Off 상태: 왼쪽에 위치
    }
  } else {
    // 24px 크기: 20px 썸
    classes.push('w-[20px] h-[20px] top-[2px]');
    if (modelValue.value) {
      classes.push('translate-x-[28px]'); // On 상태: 오른쪽으로 이동
    } else {
      classes.push('translate-x-[2px]'); // Off 상태: 왼쪽에 위치
    }
  }

  return classes.join(' ');
});

// 토글 상태 변경 핸들러
const handleToggle = () => {
  if (!props.disabled) {
    modelValue.value = !modelValue.value;
  }
};

// 이벤트 핸들러 타입 정의
const handleChange = (event: Event) => {
  if (!props.disabled) {
    const target = event.target as HTMLInputElement;
    if (target) {
      modelValue.value = target.checked;
    }
  }
};
</script>

<template>
  <div :class="switchClasses" @click="handleToggle">
    <!-- 숨겨진 checkbox (접근성용) -->
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="sr-only"
      @change="handleChange"
    />

    <!-- 배경 -->
    <div :class="backgroundClasses" />

    <!-- 썸 (토글 핸들) -->
    <div :class="thumbClasses" />

    <!-- 스크린 리더용 라벨 -->
    <span class="sr-only">Toggle switch</span>
  </div>
</template>
