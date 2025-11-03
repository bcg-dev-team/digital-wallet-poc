<!-- Figma: Pagination/Arrow-Left, Pagination/Arrow-Right -->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed } from 'vue';

/**
 * 페이지네이션 화살표 컴포넌트
 *
 * @props direction - 화살표 방향 ('left' | 'right')
 * @props disabled - 비활성화 상태 여부
 * @emits click - 클릭 이벤트
 */
interface Props {
  /** 화살표 방향 */
  direction?: 'left' | 'right';
  /** 비활성화 상태 여부 */
  disabled?: boolean;
}

interface Emits {
  (e: 'click', event: MouseEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'left',
  disabled: false,
});

const emit = defineEmits<Emits>();

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

// 화살표 아이콘 이름
const iconName = computed(() => {
  return props.direction === 'left' ? 'arrow-backward' : 'arrow-forward';
});

// 화살표 클래스
const arrowClasses = computed(() => {
  const baseClasses = 'pagination-arrow';

  if (props.disabled) {
    return `${baseClasses} pagination-arrow-disabled`;
  }

  return `${baseClasses} pagination-arrow-enabled`;
});

// 아이콘 색상 (피그마 디자인 토큰 적용)
const iconColor = computed(() => {
  return props.disabled ? 'var(--input-color-text-disable)' : 'var(--icon-color-default)';
});
</script>

<template>
  <div
    :class="arrowClasses"
    @click="handleClick"
    :data-name="`Pagination/Arrow-${direction === 'left' ? 'Left' : 'Right'}`"
  >
    <BaseIcon :name="iconName" size="sm" :color="iconColor" />
  </div>
</template>
