<!-- Figma: Table/Body-Input, Table/Body-Input-bg, Table/Body-Type2 -->
<script setup lang="ts">
import type { TextAlign } from '../../types/components';
import { computed } from 'vue';

interface Props {
  type?: 'header' | 'body' | 'footer';
  content?: string;
  align?: TextAlign;
  width?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'body',
  content: '',
  align: 'left',
  width: 'auto',
});

const cellClasses = computed(() => {
  const classes = ['table-cell', `table-cell-${props.type}`];
  const alignClass = `text-${props.align}`;
  classes.push(alignClass);
  return classes.join(' ');
});

const cellStyle = computed(() => {
  return {
    width: props.width,
  };
});
</script>

<template>
  <component
    :is="type === 'header' ? 'th' : 'td'"
    :class="cellClasses"
    :style="cellStyle"
    :data-type="type"
  >
    <slot>
      <span class="table-cell-text">{{ content }}</span>
    </slot>
  </component>
</template>
