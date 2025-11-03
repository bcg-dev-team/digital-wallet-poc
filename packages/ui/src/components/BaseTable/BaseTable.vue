<!-- Figma: Table -->
<script setup lang="ts">
import type { TableHeader, TableRow } from '../../types/components';
import BaseSkeleton from '../BaseSkeleton/BaseSkeleton.vue';
import BaseTableHead from './BaseTableHead.vue';
import BaseTableBody from './BaseTableBody.vue';
import { computed } from 'vue';

/**
 * 테이블 컴포넌트
 *
 * @props headers - 헤더 데이터 배열
 * @props data - 테이블 데이터 배열
 * @props selectable - 행 선택 가능 여부
 * @props sortable - 정렬 가능 여부
 * @props selectedRows - 선택된 행 ID들
 * @props headerType - 헤더 타입 ('type1' | 'type2')
 * @props headerPreset - Type2 헤더의 preset 색상 ('gray' | 'blue' | 'pink')
 * @props headerCustomColor - Type2 헤더의 커스텀 색상
 * @emits rowSelect - 행 선택 이벤트
 * @emits sort - 정렬 이벤트
 */

interface Props {
  /** 헤더 데이터 배열 */
  headers: TableHeader[];
  /** 테이블 데이터 배열 */
  data: TableRow[];
  /** 행 선택 가능 여부 */
  selectable?: boolean;
  /** 정렬 가능 여부 */
  sortable?: boolean;
  /** 선택된 행 ID들 */
  selectedRows?: (string | number)[];
  /** 헤더 타입 */
  headerType?: 'type1' | 'type2';
  /** Type2 헤더의 preset 색상 */
  headerPreset?: 'gray' | 'blue' | 'pink';
  /** Type2 헤더의 커스텀 색상 */
  headerCustomColor?: string;
  /** 로딩 상태 여부 */
  isLoading?: boolean;
  /** 스켈레톤 행 개수 */
  skeletonRows?: number;
}

interface Emits {
  (e: 'rowSelect', rowId: string | number, selected: boolean): void;
  (e: 'sort', key: string, direction: 'asc' | 'desc'): void;
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
  sortable: false,
  selectedRows: () => [],
  headerType: 'type1',
  headerPreset: 'gray',
  isLoading: false,
  skeletonRows: 5,
});

const emit = defineEmits<Emits>();

const handleRowSelect = (rowId: string | number, selected: boolean) => {
  emit('rowSelect', rowId, selected);
};

const handleSort = (key: string) => {
  if (!props.sortable) return;
  // 기본적으로 오름차순으로 정렬
  emit('sort', key, 'asc');
};

const isRowSelected = (rowId: string | number) => {
  return props.selectedRows.includes(rowId);
};

// 행 클래스 (선택 상태에 따라)
const getRowClasses = (rowId: string | number) => {
  const classes = ['table-row'];

  if (isRowSelected(rowId)) {
    classes.push('table-row-selected');
  }

  return classes.join(' ');
};

// 셀 클래스
const getCellClasses = (rowId: string | number) => {
  const classes = ['table-cell'];

  if (isRowSelected(rowId)) {
    classes.push('table-cell-selected');
  }

  return classes.join(' ');
};
</script>

<template>
  <div class="table-container" data-name="Table">
    <table class="table">
      <!-- 헤더 -->
      <slot name="head">
        <BaseTableHead
          :headers="headers"
          :type="headerType"
          :preset="headerPreset"
          :custom-color="headerCustomColor"
          @sort="handleSort"
        >
          <template #head-cell="slotProps">
            <slot name="head-cell" v-bind="slotProps" />
          </template>
        </BaseTableHead>
      </slot>

      <!-- 바디 -->
      <slot name="body">
        <BaseTableBody
          v-if="!props.isLoading"
          :headers="headers"
          :data="data"
          :selectable="selectable"
          :selected-rows="selectedRows"
          @row-select="handleRowSelect"
        >
          <template #body-cell="slotProps">
            <slot name="body-cell" v-bind="slotProps" />
          </template>
        </BaseTableBody>

        <!-- 스켈레톤 바디 -->
        <tbody v-else class="table-skeleton">
          <tr v-for="i in props.skeletonRows" :key="`skeleton-row-${i}`" class="table-row">
            <td
              v-for="header in headers"
              :key="`skeleton-cell-${header.key}-${i}`"
              class="table-cell"
            >
              <BaseSkeleton
                :width="header.key === headers[0].key ? '80%' : '60%'"
                height="1rem"
                variant="text"
                class="table-skeleton-cell"
              />
            </td>
          </tr>
        </tbody>
      </slot>
    </table>
  </div>
</template>
