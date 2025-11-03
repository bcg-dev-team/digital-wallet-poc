<!-- Figma: Table Row -->
<script setup lang="ts">
import type { TextAlign } from '../../types/components';
import { computed } from 'vue';

interface Props {
  type?: 'header' | 'body' | 'footer';
  align?: TextAlign;
  selected?: boolean;
  selectable?: boolean;
}

interface Emits {
  (e: 'click', event: MouseEvent): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'body',
  align: 'left',
  selected: false,
  selectable: false,
});

const emit = defineEmits<Emits>();

const rowClasses = computed(() => {
  const classes = ['table-row', `table-row-${props.type}`];

  if (props.selected) {
    classes.push('table-row-selected');
  }

  if (props.selectable) {
    classes.push('table-row-selectable');
  }

  return classes.join(' ');
});

const handleClick = (event: MouseEvent) => {
  if (props.selectable) {
    emit('click', event);
  }
};
</script>

<template>
  <tr :class="rowClasses" :data-type="type" @click="handleClick">
    <slot />
  </tr>
</template>
