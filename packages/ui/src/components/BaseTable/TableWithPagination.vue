<!-- Figma: Table with Pagination -->
<script setup lang="ts">
import type { TableHeader, TableRow } from '../../types/components';
import BasePagination from '../BasePagination/BasePagination.vue';
import BaseTable from './BaseTable.vue';
import { computed } from 'vue';

interface Props {
  headers: TableHeader[];
  data: TableRow[];
  currentPage?: number;
  pageSize?: number;
  maxVisiblePages?: number;
  selectable?: boolean;
  sortable?: boolean;
  selectedRows?: (string | number)[];
  headerType?: 'type1' | 'type2';
  headerPreset?: 'gray' | 'blue' | 'pink';
  headerCustomColor?: string;
}

interface Emits {
  (e: 'pageChange', page: number): void;
  (e: 'rowSelect', rowId: string | number, selected: boolean): void;
  (e: 'sort', key: string, direction: 'asc' | 'desc'): void;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  pageSize: 10,
  maxVisiblePages: 5,
  selectable: false,
  sortable: false,
  selectedRows: () => [],
  headerType: 'type1',
  headerPreset: 'gray',
});

const emit = defineEmits<Emits>();

const totalPages = computed(() => Math.ceil(props.data.length / props.pageSize));

const currentPageData = computed(() => {
  const start = (props.currentPage - 1) * props.pageSize;
  const end = start + props.pageSize;
  return props.data.slice(start, end);
});

const handlePageChange = (page: number) => {
  emit('pageChange', page);
};

const handleRowSelect = (rowId: string | number, selected: boolean) => {
  emit('rowSelect', rowId, selected);
};

const handleSort = (key: string, direction: 'asc' | 'desc') => {
  emit('sort', key, direction);
};
</script>

<template>
  <div class="table-with-pagination" data-name="TableWithPagination">
    <!-- 테이블 -->
    <BaseTable
      :headers="headers"
      :data="currentPageData"
      :selectable="selectable"
      :sortable="sortable"
      :selected-rows="selectedRows"
      :header-type="headerType"
      :header-preset="headerPreset"
      :header-custom-color="headerCustomColor"
      @row-select="handleRowSelect"
      @sort="handleSort"
    >
      <!-- 테이블 슬롯들을 그대로 전달 -->
      <template #head="slotProps">
        <slot name="head" v-bind="slotProps" />
      </template>

      <template #body="slotProps">
        <slot name="body" v-bind="slotProps" />
      </template>

      <template #head-cell="slotProps">
        <slot name="head-cell" v-bind="slotProps" />
      </template>

      <template #body-cell="slotProps">
        <slot name="body-cell" v-bind="slotProps" />
      </template>
    </BaseTable>

    <!-- 페이지네이션 -->
    <div v-if="totalPages > 1" class="pagination-container">
      <BasePagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :max-visible-pages="maxVisiblePages"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>
