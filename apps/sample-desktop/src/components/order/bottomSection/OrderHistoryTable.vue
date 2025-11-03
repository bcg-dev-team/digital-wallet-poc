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
  formatDateForGrid,
  padDecimalPlaces,
  getDecimalPlaces,
} from '@template/utils';
import { useOrderHistoryData } from '@/composables/useOrderHistoryData';
import { ref, onMounted, watch, computed, h, render } from 'vue';
import { useMetadataStore } from '@/stores/useMetadataStore';
import { EnumLabelMapper } from '@template/api';

const metadataStore = useMetadataStore();
const orderHistoryData = useOrderHistoryData();

// BaseDataGrid에서 기본 설정을 제공하므로 추가 설정 불필요
const gridOptions = ref<GridOptions>({});

// 컴포저블에서 데이터 가져오기
const rowData = computed(() => orderHistoryData.orderHistory.value);

// 컬럼 정의
const columnDefs = computed<ColDef[]>(() => {
  // metadata store의 isInitialized를 의존성으로 추가하여 반응성 보장
  const _ = metadataStore.isInitialized;
  return [
    {
      headerName: '주문일자',
      field: 'orderDate',
      sortable: true,
      width: 120,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      valueFormatter: (params: any) => formatDateForGrid(params.value),
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
      valueFormatter: (params: any) => formatDateForGrid(params.value),
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
      headerName: 'L / S',
      field: 'positionCd',
      sortable: true,
      width: 80,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');

        // Vue 컴포넌트를 VNode로 생성
        const vnode = h(BaseChip, {
          variant: params.value === 'LONG' ? 'red' : 'blue',
          size: 'sm',
          label: EnumLabelMapper.getPositionCodeShort(params.value),
        });

        // VNode를 DOM에 렌더링
        render(vnode, container);

        return container;
      },
    },
    {
      headerName: '유형',
      field: 'orderTypeCd',
      sortable: true,
      width: 80,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      valueFormatter: (params: any) => EnumLabelMapper.getOrderTypeLabel(params.value),
    },
    {
      headerName: '구분',
      field: 'sideCd',
      sortable: true,
      width: 80,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      valueFormatter: (params: any) => EnumLabelMapper.getSideCodeLabel(params.value),
    },
    {
      headerName: '주문수량',
      field: 'orderQuantity',
      sortable: true,
      width: 100,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => padDecimalPlaces(params.value, 2),
    },
    {
      headerName: '배리어가격',
      field: 'barrierPrice',
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
      headerName: '주문가격',
      field: 'orderPrice',
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
      headerName: '이익실현',
      field: 'profitRealizationBarrierPrice',
      sortable: true,
      width: 80,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },
    {
      headerName: '손실제한',
      field: 'lossCutBarrierPrice',
      sortable: true,
      width: 80,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },
    {
      headerName: '체결수량',
      field: 'executionQuantity',
      sortable: true,
      width: 80,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        return padDecimalPlaces(params.value, 2);
      },
    },

    //FIXME: 체결가격, 주문잔량, 상태, 접수일시 추가 (히든 영역)
    // {
    //   headerName: '체결가격',
    //   field: 'executionPrice',
    //   sortable: true,
    //   width: 80,
    //   headerClass: 'text-center',
    //   cellStyle: predefinedStyles.right,
    //   valueFormatter: (params: any) => {
    //     const value = params.value;
    //     return value.toLocaleString();
    //   },
    // },
    // {
    //   headerName: '주문잔량',
    //   field: 'orderBalance',
    //   sortable: true,
    //   width: 80,
    //   headerClass: 'text-center',
    //   cellStyle: predefinedStyles.right,
    //   valueFormatter: (params: any) => {
    //     const value = params.value;
    //     return value.toLocaleString();
    //   },
    // },
    // {
    //   headerName: '상태',
    //   field: 'orderStatusCd',
    //   sortable: true,
    //   width: 80,
    //   headerClass: 'text-center',
    //   cellStyle: predefinedStyles.right,
    //   valueFormatter: (params: any) => {
    //     const value = params.value;
    //     return value.toLocaleString();
    //   },
    // },
    // {
    //   headerName: '접수일시',
    //   field: 'receptionDate',
    //   sortable: true,
    //   width: 80,
    //   headerClass: 'text-center',
    //   cellStyle: predefinedStyles.right,
    //   valueFormatter: (params: any) => {
    //     const value = params.value;
    //     return value.toLocaleString();
    //   },
    // },
  ];
});

// props 변경 감지하여 날짜 범위 설정
watch(
  () => [props.startDate, props.endDate],
  ([newStartDate, newEndDate]) => {
    if (newStartDate && newEndDate) {
      orderHistoryData.setDateRange(newStartDate, newEndDate);
    }
  },
  { immediate: true }
);

onMounted(() => {
  // props가 있으면 날짜 범위 설정 (데이터 로드는 컴포저블에서 자동 처리)
  if (props.startDate && props.endDate) {
    orderHistoryData.setDateRange(props.startDate, props.endDate);
  }
});
</script>
