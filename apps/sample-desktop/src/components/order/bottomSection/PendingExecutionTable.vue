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
  <ModifyOrderDialog
    :isOpen="isModifyOrderDialogOpen"
    @close="isModifyOrderDialogOpen = false"
    :selectedRowData="selectedRowData"
    @confirm="handleModifyOrderExecution"
  />
  <EntireCancelDialog
    v-model:isOpen="isEntireCloseOutDialogOpen"
    @close="isEntireCloseOutDialogOpen = false"
    @cancel="isEntireCloseOutDialogOpen = false"
    @confirm="handleEntireCloseOutExecution"
  />
</template>

<script setup lang="ts">
// props 정의 (경고 제거용 - 실제로 사용하지 않음)
defineProps<{
  selectedTabKey?: string;
}>();

import {
  DetailsPendingOrder,
  OrderModifyRequest,
  OrderModifyRequestOrderTypeCdType,
  OrderModifyRequestSideCdType,
  OrderCancelRequest,
  OrderCancelRequestOrderTypeCdType,
  OrderCancelRequestSideCdType,
} from '@template/api';
import ModifyOrderDialog, {
  type ModifyOrderDialogData,
} from '@/components/order/bottomSection/dialog/ModifyOrderDialog.vue';
import EntireCancelDialog from '@/components/order/bottomSection/dialog/EntireCancelDialog.vue';
import { BaseDataGrid, ColDef, GridOptions, BaseButton, BaseChip } from '@template/ui';
import { usePendingOrderData } from '@/composables/usePendingOrderData';

import {
  predefinedStyles,
  formatDateForGrid,
  formatDateCompact,
  padDecimalPlaces,
  getDecimalPlaces,
} from '@template/utils';
import { ref, onMounted, onUnmounted, h, render, watch, computed } from 'vue';
import { selectedSymbolInstance } from '@/composables/useSelectedSymbol';
import { useMarketDataStore } from '@/stores/useMarketDataStore';
import { executionService, orderService } from '@/services/api';
import { useMetadataStore } from '@/stores/useMetadataStore';
import { useAccountStore } from '@/stores/useAccountStore';
import { useToastStore } from '@/stores/useToastStore';
import { EnumLabelMapper } from '@template/api';

const accountStore = useAccountStore();
const toastStore = useToastStore();
const pendingOrderData = usePendingOrderData();
const metadataStore = useMetadataStore();
const marketDataStore = useMarketDataStore();
const { addVisibleSymbols } = selectedSymbolInstance;
const isModifyOrderDialogOpen = ref(false);
const isEntireCloseOutDialogOpen = ref(false);
const selectedRowData = ref<DetailsPendingOrder>({
  orderDate: '',
  orderNo: '',
  stockCd: '',
  positionCd: 'LONG',
  orderTypeCd: 'MARKET',
  orderCd: 'PURCHASE',
  orderQuantity: 0,
  barrierPrice: 0,
  orderPrice: 0,
  profitRealizationBarrierPrice: 0,
  lossCutBarrierPrice: 0,
  orderBalance: 0,
  orderStatusCd: 'RECEIVED',
  receptionDate: '',
  isProfitExecution: '',
  isLossLimits: '',
  isLossTracing: '',
});

// BaseDataGrid에서 기본 설정을 제공하므로 추가 설정 불필요
const gridOptions = ref<GridOptions>({});

// 컴포저블에서 데이터 가져오기
const rowData = computed(() => pendingOrderData.pendingOrders.value);

// 실시간 시세 데이터 변경 감지를 위한 computed
const marketDataTrigger = computed(() => {
  // 테이블에 표시되는 종목들의 시세 데이터 변경을 감지
  const symbols = rowData.value.map((item) => item.stockCd);
  return symbols.map((symbol) => marketDataStore.getSymbolDataBySymbol(symbol)?.price || 0);
});

// 컬럼 정의
const columnDefs = computed<ColDef[]>(() => {
  const _ = metadataStore.isInitialized;
  const __ = marketDataTrigger.value; // 시세 데이터 변경 감지
  return [
    {
      headerName: '주문일자',
      field: 'orderDate',
      width: 120,
      sortable: true,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      valueFormatter: (params: any) => formatDateForGrid(params.value),
    },
    {
      headerName: '주문번호',
      field: 'orderNo',
      width: 150,
      sortable: true,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
    },
    {
      headerName: '종목코드',
      field: 'stockCd',
      width: 120,
      sortable: true,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
    },
    {
      headerName: 'L / S',
      field: 'positionCd',
      width: 80,
      sortable: true,
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
      headerName: '유형',
      field: 'orderTypeCd',
      width: 80,
      sortable: true,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      valueFormatter: (params: any) => EnumLabelMapper.getOrderTypeLabel(params.value),
    },
    {
      headerName: '구분',
      field: 'sideCd',
      width: 80,
      sortable: true,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      valueFormatter: (params: any) => EnumLabelMapper.getSideCodeLabel(params.value),
    },
    {
      headerName: '주문수량',
      field: 'orderQuantity',
      width: 100,
      sortable: true,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        return padDecimalPlaces(params.value, 2);
      },
    },
    {
      headerName: '배리어가격',
      field: 'barrierPrice',
      width: 100,
      sortable: true,
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
      width: 100,
      sortable: true,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },
    {
      headerName: '이익실현배리어',
      field: 'profitRealizationBarrierPrice',
      width: 120,
      sortable: true,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        const value = params.value;
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },
    {
      headerName: '손실제한배리어',
      field: 'lossCutBarrierPrice',
      width: 120,
      sortable: true,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },

    {
      headerName: '',
      field: 'actions',
      sortable: false,
      headerClass: 'text-center',
      width: 100,
      cellStyle: predefinedStyles.center,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');

        // Vue 컴포넌트를 VNode로 생성
        const vnode = h(BaseButton, {
          variant: 'outlined',
          size: 'mini',
          color: 'black',
          label: '정정',
          onMousedown: (e: Event) => {
            e.preventDefault();
            e.stopPropagation();

            selectedRowData.value = params.data;
            isModifyOrderDialogOpen.value = true;
          },
        });

        // VNode를 DOM에 렌더링
        render(vnode, container);

        return container;
      },
    },
    {
      headerName: '',
      field: 'actions',
      sortable: false,
      width: 120,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      cellRenderer: (params: any) => {
        const container = document.createElement('div');

        // Vue 컴포넌트를 VNode로 생성
        const vnode = h(BaseButton, {
          variant: 'outlined',
          size: 'mini',
          color: 'black',
          label: '전량취소',
          onMousedown: (e: Event) => {
            e.preventDefault();
            e.stopPropagation();

            selectedRowData.value = params.data;
            isEntireCloseOutDialogOpen.value = true;
          },
        });

        // VNode를 DOM에 렌더링
        render(vnode, container);

        return container;
      },
    },

    //FIXME: 잔량, 상태, 접수일시 추가 (히든 영역)
    // {
    //   headerName: '잔량',
    //   field: 'executionQuantity',
    //   sortable: true,
    //   headerClass: 'text-center',
    //   cellStyle: predefinedStyles.right,
    //   valueFormatter: (params: any) => {
    //     return padDecimalPlaces(params.value, 2);
    //   },
    // },

    // {
    //   headerName: '상태',
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
    //   headerName: '접수일시',
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
    //   headerName: '이익실현여부',
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
    //   headerName: '손실제한여부',
    //   field: 'receptionDate',
    //   sortable: true,
    //   width: 80,
    //   headerClass: 'text-center',
    //   cellStyle: predefinedStyles.right,
    //   valueFormatter: (params: any) => {
    //     const value = params.value;
    //     return value.toLocaleString();
    //   },
    // {
    //   headerName: '손실추적여부',
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

/**
 * positionCd와 orderCd를 조합하여 sideCd를 추론
 * - LONG + PURCHASE → BUY
 * - LONG + CLOSE_OUT → SELL_TO_CLOSE
 * - SHORT + PURCHASE → SELL
 * - SHORT + CLOSE_OUT → BUY_TO_COVER
 */
const getSideCd = (positionCd: string, orderCd: string): OrderModifyRequestSideCdType => {
  if (positionCd === 'LONG') {
    return orderCd === 'PURCHASE' ? 'BUY' : 'SELL_TO_CLOSE';
  } else {
    return orderCd === 'PURCHASE' ? 'SELL' : 'BUY_TO_COVER';
  }
};

const modifyOrderExecution = async (
  rowData: DetailsPendingOrder,
  orderTypeCd: OrderModifyRequestOrderTypeCdType,
  orderQuantity: number,
  orderPrice: number,
  barrierPrice: number,
  profitRealizationYn?: string,
  lossCutYn?: string,
  lossTrackingYn?: string,
  profitRealizationBarrierPrice?: number,
  lossCutBarrierPrice?: number
) => {
  try {
    const request: OrderModifyRequest = {
      accountNo: accountStore.selectedAccountNoSafe,
      accountPassword: '123456',
      stockCd: rowData.stockCd,
      orderTypeCd: orderTypeCd,
      sideCd: getSideCd(rowData.positionCd, rowData.orderCd),
      orderDate: formatDateCompact(rowData.orderDate),
      orderNo: rowData.orderNo,
      orderQuantity: orderQuantity,
      barrierPrice: barrierPrice,
      orderPrice: orderPrice,
      profitRealizationYn: profitRealizationYn,
      lossCutYn: lossCutYn,
      lossTrackingYn: lossTrackingYn,
      profitRealizationBarrierPrice: profitRealizationBarrierPrice,
      lossCutBarrierPrice: lossCutBarrierPrice,
    };
    const response = await orderService.createModifyOrder(request);
    if (response.data) {
      toastStore.addToast('정정이 완료되었습니다');
    }
  } catch (error) {
    console.error(error);
  }
};

const cancelOrderExecution = async (rowData: DetailsPendingOrder) => {
  try {
    const request: OrderCancelRequest = {
      accountNo: accountStore.selectedAccountNoSafe,
      accountPassword: '123456',
      orderTypeCd: rowData.orderTypeCd,
      sideCd: getSideCd(rowData.positionCd, rowData.orderCd),
      orderDate: formatDateCompact(rowData.orderDate),
      orderNo: rowData.orderNo,
    };
    const response = await orderService.createCancelOrder(request);
    if (response.data) {
      toastStore.addToast('취소가 완료되었습니다');
    }
  } catch (error) {
    console.error(error);
  }
};

const handleModifyOrderExecution = async (data: ModifyOrderDialogData) => {
  await modifyOrderExecution(
    selectedRowData.value,
    data.orderTypeCd,
    data.orderQuantity,
    data.orderPrice,
    data.barrierPrice,
    data.profitRealizationYn,
    data.lossCutYn,
    data.lossTrackingYn,
    data.profitRealizationBarrierPrice,
    data.lossCutBarrierPrice
  );
  isModifyOrderDialogOpen.value = false;
};

const handleEntireCloseOutExecution = async () => {
  await cancelOrderExecution(selectedRowData.value);
  isEntireCloseOutDialogOpen.value = false;
};

/**
 * 주문 내역 데이터를 로드하는 함수
 */
const loadPendingExecutionData = async () => {
  const request = {
    accountNo: accountStore.selectedAccountNoSafe,
    nextKey: '',
  };

  const response = await executionService.getPendingOrderHistory(request);

  if (response.data) {
    // API 응답 데이터로 대기 주문 데이터 업데이트
    response.data.details.forEach((order: any) => {
      pendingOrderData.updatePendingOrder(order.orderNo, order);
    });
  }
};

// selectedAccount가 변경될 때만 데이터 재조회
watch(
  () => accountStore.selectedAccountNo,
  (newAccount) => {
    if (newAccount) {
      loadPendingExecutionData();
    }
  }
);

// 테이블에 표시되는 종목들 구독 관리
const subscribeToTableSymbols = () => {
  const symbols = rowData.value.map((item) => item.stockCd);
  if (symbols.length > 0) {
    addVisibleSymbols('PendingExecutionTable', symbols);
  }
};

// 테이블 종목 구독 해제
const unsubscribeFromTableSymbols = () => {
  // 구독 해제는 전역적으로 관리되므로 별도 처리 불필요
};

// 데이터 변경 시 종목 구독 업데이트
watch(
  rowData,
  () => {
    subscribeToTableSymbols();
  },
  { deep: true }
);

onMounted(() => {
  loadPendingExecutionData();
  subscribeToTableSymbols();
});

onUnmounted(() => {
  unsubscribeFromTableSymbols();
});
</script>
