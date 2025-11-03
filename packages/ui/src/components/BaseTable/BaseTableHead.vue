<script setup lang="ts">
import type { TableHeader } from '../../types/components';
import BaseTableCell from './BaseTableCell.vue';
import BaseTableRow from './BaseTableRow.vue';
import { computed } from 'vue';

interface Props {
  headers: TableHeader[];
  type?: 'type1' | 'type2';
  preset?: 'gray' | 'blue' | 'pink';
  customColor?: string;
}

interface Emits {
  (e: 'sort', key: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'type1',
  preset: 'gray',
});

const emit = defineEmits<Emits>();

const presetClasses = {
  gray: 'table-head-type2-gray',
  blue: 'table-head-type2-blue',
  pink: 'table-head-type2-pink',
};

const headRowClasses = computed(() => {
  const baseClasses = ['table-head-row', `table-head-type-${props.type}`].join(' ');

  if (props.type === 'type2') {
    return `${baseClasses} ${presetClasses[props.preset]}`;
  }
  return baseClasses;
});

const customColorStyle = computed(() => {
  if (props.type === 'type2' && props.customColor) {
    return {
      backgroundColor: props.customColor,
      borderBottom: `2px solid ${props.customColor}`,
    };
  }
  return {};
});

const handleSort = (key: string) => {
  emit('sort', key);
};
</script>

<template>
  <thead class="table-head" data-name="Table/Head">
    <BaseTableRow :class="headRowClasses" :style="customColorStyle" type="header">
      <BaseTableCell
        v-for="header in headers"
        :key="header.key"
        type="header"
        :align="header.align"
        :width="header.width"
        @click="handleSort(header.key)"
      >
        <slot name="head-cell" :header="header">
          <span class="table-head-text">{{ header.title }}</span>
        </slot>
      </BaseTableCell>
    </BaseTableRow>
  </thead>
</template>
