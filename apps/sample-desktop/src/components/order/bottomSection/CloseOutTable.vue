<template>
  <div class="default-table h-full overflow-hidden">
    <BaseDataGrid
      :columnDefs="columnDefs"
      :rowData="rowData"
      :gridOptions="gridOptions"
      :sortable="true"
      :filterable="false"
      :pagination="false"
      :resizable="false"
      :disalbeColumnAutoSize="false"
      class="h-full w-full"
    />
  </div>
</template>

<script setup lang="ts">
// props 정의
interface Props {
  selectedTabKey?: string;
  startDate?: string;
  endDate?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selectedTabKey: '',
  startDate: '',
  endDate: '',
});

import {
  BaseDataGrid,
  BaseInputSelect,
  BaseInputCalendar,
  ColDef,
  GridOptions,
  BaseChip,
} from '@template/ui';
import {
  predefinedStyles,
  padDecimalPlaces,
  getDecimalPlaces,
  formatNumber,
} from '@template/utils';
import { ref, onMounted, watch, computed, h, render } from 'vue';
import { useCloseOutData } from '@/composables/useCloseOutData';
import { useMetadataStore } from '@/stores/useMetadataStore';
import { EnumLabelMapper } from '@template/api';
const closeOutData = useCloseOutData();
const metadataStore = useMetadataStore();
// BaseDataGrid에서 기본 설정을 제공하므로 추가 설정 불필요
const gridOptions = ref<GridOptions>({});

// 컴포저블에서 데이터 가져오기
const rowData = computed(() => closeOutData.closeOutHistory.value);

// 컬럼 정의
const columnDefs = computed<ColDef[]>(() => {
  const _ = metadataStore.isInitialized;
  return [
    {
      headerName: '주문일자',
      field: 'orderDate',
      sortable: true,
      width: 120,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
    },
    {
      headerName: '주문번호',
      field: 'orderNo',
      sortable: true,
      width: 150,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
    },
    {
      headerName: '체결일자',
      field: 'executionDate',
      sortable: true,
      width: 120,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
    },
    {
      headerName: '종목코드',
      field: 'stockCd',
      sortable: true,
      width: 120,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
    },
    {
      headerName: '통화',
      field: 'tradeCurrencyCd',
      sortable: true,
      width: 80,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
    },
    {
      headerName: 'L / S',
      field: 'positionCd',
      sortable: true,
      width: 80,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');
        const vnode = h(BaseChip, {
          variant: params.value === 'LONG' ? 'red' : 'blue',
          size: 'sm',
          label: EnumLabelMapper.getPositionCodeShort(params.value),
        });
        render(vnode, container);
        return container;
      },
    },
    {
      headerName: '청산수량',
      field: 'closeOutQuantity',
      sortable: true,
      width: 100,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        return padDecimalPlaces(params.value, 2);
      },
    },
    {
      headerName: '매입가격',
      field: 'purchasePrice',
      sortable: true,
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right' as const,
      },
      valueFormatter: (params: any) => {
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },
    {
      headerName: '청산가격',
      field: 'closeOutPrice',
      sortable: true,
      width: 100,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },
    {
      headerName: '청산손익($)',
      field: 'closeOutProfitLoss',
      sortable: true,
      width: 120,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) =>
        formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      headerName: '체결수수료($)',
      field: 'executionFee',
      sortable: true,
      width: 120,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) =>
        formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      headerName: '스왑수수료($)',
      field: 'swapFee',
      sortable: true,
      width: 120,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) =>
        formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
  ];
});

// props 변경 감지하여 날짜 범위 설정
watch(
  () => [props.startDate, props.endDate],
  ([newStartDate, newEndDate]) => {
    if (newStartDate && newEndDate) {
      closeOutData.setDateRange(newStartDate, newEndDate);
    }
  },
  { immediate: true }
);

onMounted(() => {
  // props가 있으면 날짜 범위 설정
  if (props.startDate && props.endDate) {
    closeOutData.setDateRange(props.startDate, props.endDate);
  }
});
</script>
