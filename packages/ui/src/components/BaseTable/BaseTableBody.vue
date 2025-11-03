<script setup lang="ts">
import type { TableHeader, TableRow } from '../../types/components';
import BaseTableCell from './BaseTableCell.vue';
import BaseTableRow from './BaseTableRow.vue';

interface Props {
  headers: TableHeader[];
  data: TableRow[];
  selectable?: boolean;
  selectedRows?: (string | number)[];
}

interface Emits {
  (e: 'rowSelect', rowId: string | number, selected: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  selectedRows: () => [],
});

const emit = defineEmits<Emits>();

const handleRowSelect = (rowId: string | number) => {
  if (!props.selectable) return;
  const isSelected = props.selectedRows.includes(rowId);
  emit('rowSelect', rowId, !isSelected);
};

const isRowSelected = (rowId: string | number) => {
  return props.selectedRows.includes(rowId);
};
</script>

<template>
  <tbody class="table-body" data-name="Table/Body">
    <slot name="body">
      <BaseTableRow
        v-for="row in data"
        :key="row.id"
        type="body"
        :selected="isRowSelected(row.id)"
        :selectable="selectable"
        @click="handleRowSelect(row.id)"
      >
        <BaseTableCell
          v-for="header in headers"
          :key="header.key"
          type="body"
          :align="header.align"
          :width="header.width"
        >
          <slot name="body-cell" :row="row" :header="header" :value="row[header.key]">
            <span class="table-body-text">{{ row[header.key] || '' }}</span>
          </slot>
        </BaseTableCell>
      </BaseTableRow>
    </slot>
  </tbody>
</template>
