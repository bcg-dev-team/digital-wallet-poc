<!-- BaseListItemText - 리스트 아이템 내부에서 사용하는 텍스트 컴포넌트 -->
<script setup lang="ts">
/**
 * BaseListItemText - 리스트 아이템 내부에서 사용하는 텍스트 컴포넌트
 *
 * 이 컴포넌트는 BaseListItem의 content 슬롯 내부에서 사용되어야 합니다.
 * BaseListItemAvatar와 함께 사용하여 아바타 다음에 텍스트를 표시할 수 있습니다.
 *
 * @props primary - 주요 텍스트 (필수)
 * @props secondary - 보조 텍스트 (선택)
 * @props rightPrimary - 오른쪽 끝 주요 텍스트 (선택)
 * @props rightSecondary - 오른쪽 끝 보조 텍스트 (선택)
 * @props inset - 들여쓰기 여부 (아바타가 있을 때 사용)
 * @props multiline - 여러 줄 텍스트 지원 여부
 * @props noWrap - 텍스트 줄바꿈 방지 여부
 */
import { computed } from 'vue';

interface Props {
  /** 주요 텍스트 (필수) */
  primary: string;
  /** 보조 텍스트 (선택) */
  secondary?: string;
  /** 오른쪽 끝 주요 텍스트 (선택) */
  rightPrimary?: string;
  /** 오른쪽 끝 보조 텍스트 (선택) */
  rightSecondary?: string;
  /** 들여쓰기 여부 (아바타가 있을 때 사용) */
  inset?: boolean;
  /** 여러 줄 텍스트 지원 여부 */
  multiline?: boolean;
  /** 텍스트 줄바꿈 방지 여부 */
  noWrap?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  secondary: undefined,
  rightPrimary: undefined,
  rightSecondary: undefined,
  inset: false,
  multiline: false,
  noWrap: false,
});

/**
 * 텍스트 컨테이너 클래스 계산
 */
const textClasses = computed(() => {
  const classes = ['list-item-text'];

  if (props.inset) classes.push('list-item-text--inset');
  if (props.multiline) classes.push('list-item-text--multiline');
  if (props.noWrap) classes.push('list-item-text--no-wrap');
  if (props.rightPrimary || props.rightSecondary) classes.push('list-item-text--with-right');

  return classes.join(' ');
});

/**
 * 주요 텍스트 클래스 계산
 */
const primaryClasses = computed(() => {
  const classes = ['list-item-text__primary'];

  if (props.multiline) classes.push('list-item-text__primary--multiline');
  if (props.noWrap) classes.push('list-item-text__primary--no-wrap');

  return classes.join(' ');
});

/**
 * 보조 텍스트 클래스 계산
 */
const secondaryClasses = computed(() => {
  const classes = ['list-item-text__secondary'];

  if (props.multiline) classes.push('list-item-text__secondary--multiline');
  if (props.noWrap) classes.push('list-item-text__secondary--no-wrap');

  return classes.join(' ');
});

/**
 * 오른쪽 주요 텍스트 클래스 계산
 */
const rightPrimaryClasses = computed(() => {
  const classes = ['list-item-text__right-primary'];

  if (props.multiline) classes.push('list-item-text__right-primary--multiline');
  if (props.noWrap) classes.push('list-item-text__right-primary--no-wrap');

  return classes.join(' ');
});

/**
 * 오른쪽 보조 텍스트 클래스 계산
 */
const rightSecondaryClasses = computed(() => {
  const classes = ['list-item-text__right-secondary'];

  if (props.multiline) classes.push('list-item-text__right-secondary--multiline');
  if (props.noWrap) classes.push('list-item-text__right-secondary--no-wrap');

  return classes.join(' ');
});
</script>

<template>
  <div :class="textClasses">
    <!-- 왼쪽 영역: 슬롯 + props 함께 사용 -->
    <div class="list-item-text__left">
      <!-- 왼쪽 슬롯 (있는 경우) -->
      <slot name="left" />

      <template v-if="!$slots.left">
        <!-- 주요 텍스트 -->
        <div :class="primaryClasses">
          {{ primary }}
        </div>

        <!-- 보조 텍스트 (있는 경우에만 표시) -->
        <div v-if="secondary" :class="secondaryClasses">
          {{ secondary }}
        </div>
      </template>
    </div>

    <!-- 오른쪽 영역: 슬롯 + props 함께 사용 -->
    <div class="list-item-text__right">
      <!-- 오른쪽 슬롯 (있는 경우) -->
      <slot name="right" />

      <!-- 오른쪽 끝 주요 텍스트 (있는 경우에만 표시) -->
      <div v-if="rightPrimary" :class="rightPrimaryClasses">
        {{ rightPrimary }}
      </div>

      <!-- 오른쪽 끝 보조 텍스트 (있는 경우에만 표시) -->
      <div v-if="rightSecondary" :class="rightSecondaryClasses">
        {{ rightSecondary }}
      </div>
    </div>
  </div>
</template>
