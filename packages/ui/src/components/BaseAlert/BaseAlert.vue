<script setup lang="ts">
import { computed, reactive, onMounted, onBeforeUnmount } from 'vue';
import type { IconName } from '../../types/icons';
import BaseIcon from '../BaseIcon/BaseIcon.vue';

interface Props {
  /**
   * 스타일 변형
   * - light: 연한 배경 + 원색 글씨
   * - filled: 원색 배경 + 흰 글씨
   * - outlined: 투명 배경 + 원색 경계 + 원색 글씨
   */
  variant?: 'light' | 'filled' | 'outlined';
  /**
   * 심각도 (아이콘/기본 색상 매핑)
   * - success, info, warning, error
   */
  severity?: 'success' | 'info' | 'warning' | 'error';
  /**
   * 색상 계열
   * - green, blue, yellow, red, primary
   */
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'primary';
  /**
   * 닫기 가능 여부
   */
  closable?: boolean;
  /**
   * 아이콘 표시 여부
   */
  showIcon?: boolean;
  /**
   * 가운데 정렬 여부
   */
  center?: boolean;
  /**
   * 제목 텍스트 (slot: title로 대체 가능)
   */
  title?: string;
  /**
   * 본문 설명 텍스트 (default slot로 대체 가능)
   */
  description?: string;
  /**
   * 자동 닫힘(ms)
   */
  autoClose?: number;
  /**
   * 텍스트 오버플로우 처리 방식
   * - none: 처리하지 않음
   * - ellipsis: ...으로 표시
   * - clip: 영역에서 잘림
   * - slide: 슬라이드 애니메이션
   */
  textOverflow?: 'none' | 'ellipsis' | 'clip' | 'slide';
  /**
   * 슬라이드 모드 (textOverflow가 'slide'일 때만 적용)
   * - false: 끝까지 보여주면 다시 처음으로 (continuous)
   * - true: 오른쪽으로 지나가서 왼쪽으로 나오는 한바퀴 도는 형태 (rotate)
   */
  rotate?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'light',
  closable: true,
  showIcon: false,
  center: false,
  autoClose: 0,
  textOverflow: 'none',
  rotate: false,
});

const emit = defineEmits<{
  (e: 'open'): void;
  (e: 'close'): void;
}>();

const effectiveColor = computed<NonNullable<Props['color']>>(() => {
  const severityToColor: Record<
    'success' | 'info' | 'warning' | 'error',
    NonNullable<Props['color']>
  > = {
    success: 'green',
    info: 'blue',
    warning: 'yellow',
    error: 'red',
  };
  if (props.color) return props.color;
  if (props.severity) return severityToColor[props.severity];
  return 'blue';
});

const colorClasses = computed(() => {
  // __tokens-light.css의 의미 토큰과 매핑
  // green, blue, yellow, red, primary
  const map: Record<
    string,
    { bg: string; text: string; border: string; solidBg?: string; solidText?: string }
  > = {
    green: {
      bg: 'bg-[var(--trade-correct-background)]',
      text: 'text-[var(--trade-correct-text)]',
      border: 'border-[var(--trade-correct-border)]',
      solidBg: 'bg-[var(--trade-correct-background-solid)]',
      solidText: 'text-[var(--trade-correct-text-solid)]',
    },
    blue: {
      bg: 'bg-[var(--button-blue-background)]',
      text: 'text-[var(--button-blue-text)]',
      border: 'border-[var(--button-blue-border)]',
      solidBg: 'bg-[var(--base-colors-blue-blue800-deep)]',
      solidText: 'text-[var(--font-color-white)]',
    },
    yellow: {
      bg: 'bg-[var(--button-light-solid-background)]',
      text: 'text-[var(--button-light-solid-text)]',
      border: 'border-[var(--button-light-solid-border)]',
      solidBg: 'bg-[var(--base-colors-primary-primary-deep)]',
      solidText: 'text-[var(--font-color-white)]',
    },
    red: {
      bg: 'bg-[var(--button-red-background)]',
      text: 'text-[var(--button-red-text)]',
      border: 'border-[var(--button-red-border)]',
      solidBg: 'bg-[var(--button-red-solid-background)]',
      solidText: 'text-[var(--button-red-solid-text)]',
    },
    primary: {
      bg: 'bg-[var(--background-primary-light)]',
      text: 'text-[var(--font-color-primary)]',
      border: 'border-[var(--background-primary)]',
      solidBg: 'bg-[var(--background-primary)]',
      solidText: 'text-[var(--font-color-black)]',
    },
  };
  const key = effectiveColor.value;
  return map[key];
});

const iconName = computed<IconName>(() => {
  const map = {
    success: 'check-circle',
    info: 'info',
    warning: 'warning2',
    error: 'warning',
  } as const;
  if (props.severity && map[props.severity]) return map[props.severity];
  // severity가 없으면 color 기준으로 유사 매핑 (blue 기본)
  const colorToIcon: Record<NonNullable<Props['color']>, IconName> = {
    green: 'check-circle',
    blue: 'info',
    yellow: 'warning2',
    red: 'warning',
    primary: 'info',
  };
  return colorToIcon[effectiveColor.value];
});

const containerClasses = computed(() => {
  const base = ['relative', 'w-full', 'px-4', 'py-3', 'flex', 'gap-3'];

  const theme =
    props.variant === 'filled'
      ? [colorClasses.value.solidBg!, colorClasses.value.solidText!, 'border', 'border-transparent']
      : props.variant === 'outlined'
        ? [
            'bg-transparent',
            colorClasses.value.text,
            'border',
            colorClasses.value.border,
            'rounded-[var(--radius-md)]',
          ]
        : [colorClasses.value.bg, colorClasses.value.text];

  if (props.center) base.push('text-center', 'justify-center');
  return [...base, ...theme].join(' ');
});

const iconColor = computed<string>(() => {
  // filled에서는 대비를 위해 흰색 아이콘, 나머지는 텍스트 색상 사용
  if (props.variant === 'filled') return 'var(--font-color-white)';
  return 'currentColor';
});

// 텍스트 오버플로우 처리
const textOverflowClasses = computed(() => {
  const base = ['text-sm', 'leading-5'];

  switch (props.textOverflow) {
    case 'ellipsis':
      return [...base, 'truncate'];
    case 'clip':
      return [...base, 'overflow-hidden', 'whitespace-nowrap'];
    case 'slide':
      return [...base, 'overflow-hidden', 'whitespace-nowrap'];
    default:
      return base;
  }
});

const isSliding = computed(() => {
  return props.textOverflow === 'slide';
});

const slideAnimationClass = computed(() => {
  if (!isSliding.value) return '';

  const base = 'base-alert-slide';
  return props.rotate ? `${base} ${base}--rotate` : base;
});

// showAfter/hideAfter 제거
let autoCloseTimer: number | null = null;

const isHidden = computed({
  get: () => state.hidden,
  set: (v: boolean) => (state.hidden = v),
});

const state = reactive({
  mounted: false,
  hidden: true,
});

onMounted(() => {
  state.hidden = false;
  emit('open');
  if (props.autoClose && props.autoClose > 0) {
    autoCloseTimer = window.setTimeout(() => handleClose(), props.autoClose);
  }
  state.mounted = true;
});

onBeforeUnmount(() => {
  if (autoCloseTimer) window.clearTimeout(autoCloseTimer);
});

function handleClose() {
  state.hidden = true;
  emit('close');
}
</script>

<template>
  <transition name="base-alert">
    <div
      v-if="!isHidden"
      :class="[containerClasses, title || $slots.title ? 'items-start' : 'items-center']"
      role="alert"
    >
      <div v-if="showIcon" class="flex items-center">
        <slot name="icon">
          <BaseIcon
            :name="iconName"
            :size="title || $slots.title ? 'md' : 'sm'"
            :color="iconColor"
          />
        </slot>
      </div>

      <div class="min-w-0 flex-1">
        <div v-if="title || $slots.title" class="mb-0.5 font-semibold">
          <slot name="title">{{ title }}</slot>
        </div>
        <div :class="textOverflowClasses">
          <span v-if="isSliding" :class="slideAnimationClass">
            <slot>
              {{ description }}
            </slot>
          </span>
          <slot v-else>
            {{ description }}
          </slot>
        </div>
      </div>

      <div v-if="closable" class="ml-auto pl-2">
        <button
          type="button"
          aria-label="close"
          class="hover:border-current/30 flex h-5 w-5 items-center justify-center rounded border border-transparent"
          @click="handleClose"
        >
          <BaseIcon name="close" size="sm" />
        </button>
      </div>
    </div>
  </transition>
</template>

<style src="./BaseAlert.scss"></style>
