<!-- BaseListItem - 리스트 아이템 컴포넌트 -->
<script setup lang="ts">
/**
 * BaseListItem - 리스트 아이템 컴포넌트
 *
 * 이 컴포넌트는 BaseList 내부에서 사용되어야 합니다.
 *
 * @props clickable - 클릭 가능 여부 (버튼 동작)
 * @props disabled - 비활성화 여부
 * @props divider - 하단 구분선 표시 여부
 * @props selected - 선택된 상태 여부
 * @props secondaryAction - 우측에 표시할 BaseIcon 컴포넌트
 * @emits click - 클릭 이벤트
 * @emits secondaryActionClick - 보조 액션 클릭 이벤트
 */
import type { InnerIconProps } from '../../types/components';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed } from 'vue';

interface Props {
  /** 클릭 가능 여부 (버튼 동작) */
  clickable?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 하단 구분선 표시 여부 */
  divider?: boolean;
  /** 선택된 상태 여부 */
  selected?: boolean;
  /** 우측에 표시할 BaseIcon 컴포넌트 */
  secondaryAction?: InnerIconProps;
}

interface Emits {
  (e: 'click', event: MouseEvent): void;
  (e: 'secondaryActionClick', event: MouseEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  clickable: false,
  disabled: false,
  divider: false,
  selected: false,
  secondaryAction: undefined,
});

const emit = defineEmits<Emits>();

/**
 * 리스트 아이템 클래스 계산
 */
const itemClasses = computed(() => {
  const classes = ['list-item'];

  if (props.clickable) classes.push('list-item--clickable');
  if (props.disabled) classes.push('list-item--disabled');
  if (props.divider) classes.push('list-item--divider');
  if (props.selected) classes.push('list-item--selected');

  return classes.join(' ');
});

/**
 * 리스트 아이템 ARIA 속성 계산
 */
const itemAriaAttributes = computed(() => {
  const attrs: Record<string, any> = {};

  if (props.clickable) {
    attrs.role = 'button';
    attrs.tabindex = props.disabled ? -1 : 0;
  }

  if (props.disabled) {
    attrs['aria-disabled'] = true;
  }

  if (props.selected) {
    attrs['aria-selected'] = true;
  }

  return attrs;
});

/**
 * 클릭 이벤트 처리
 */
const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event);
  }
};

/**
 * 보조 액션 클릭 이벤트 처리
 */
const handleSecondaryActionClick = (event: MouseEvent) => {
  if (props.disabled) return;

  event.stopPropagation(); // 리스트 아이템 클릭 이벤트 전파 방지
  emit('secondaryActionClick', event);
};

/**
 * 키보드 이벤트 처리
 */
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.clickable && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    emit('click', event as unknown as MouseEvent);
  }
};
</script>

<template>
  <li
    :class="itemClasses"
    v-bind="itemAriaAttributes"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <!-- 기본 슬롯 -->
    <div class="list-item__content">
      <slot name="content" />
    </div>

    <!-- 보조 액션 (BaseIcon만 허용) -->
    <div
      v-if="props.secondaryAction"
      class="list-item__secondary-action"
      @click.prevent="handleSecondaryActionClick"
    >
      <BaseIcon :name="props.secondaryAction.name" size="md" />
    </div>
  </li>
</template>
