<!-- Figma: Pagination/Number -->
<script setup lang="ts">
import { computed } from 'vue';

/**
 * 페이지네이션 번호 컴포넌트
 *
 * @props number - 표시할 페이지 번호
 * @props status - 상태 ('selected' | 'unselected' | 'hover')
 * @emits click - 클릭 이벤트
 */
interface Props {
  /** 표시할 페이지 번호 */
  number: number;
  /** 상태 */
  status?: 'selected' | 'unselected' | 'hover';
}

interface Emits {
  (e: 'click', number: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'unselected',
});

const emit = defineEmits<Emits>();

const handleClick = () => {
  emit('click', props.number);
};

// 번호 클래스
const numberClasses = computed(() => {
  const baseClasses = 'pagination-number';

  switch (props.status) {
    case 'selected':
      return `${baseClasses} pagination-number-selected`;
    case 'hover':
      return `${baseClasses} pagination-number-hover`;
    default:
      return `${baseClasses} pagination-number-unselected`;
  }
});
</script>

<template>
  <div :class="numberClasses" @click="handleClick" :data-name="`Pagination/Number-${status}`">
    <span class="pagination-number-text">{{ number }}</span>
  </div>
</template>
