<template>
  <div class="default-table">
    <BaseDataGrid
      :columnDefs="columnDefs"
      :rowData="props.rowData"
      :gridOptions="gridOptions"
      :sortable="true"
      :filterable="false"
      :pagination="false"
      :resizable="false"
      :disalbeColumnAutoSize="false"
      customColumnWidths
    />
  </div>
</template>
<script setup lang="ts">
import { predefinedStyles, getProfitLossStyle, padDecimalPlaces } from '@template/utils';
import { BaseDataGrid, BaseChip, type ColDef, type GridOptions } from '@template/ui';
import { h, ref, render, computed, onMounted, onUnmounted, watch } from 'vue';
import { selectedSymbolInstance } from '@/composables/useSelectedSymbol';
import { useMarketDataStore } from '@/stores/useMarketDataStore';
import { getDecimalPlaces, formatNumber } from '@template/utils';
import { useMetadataStore } from '@/stores/useMetadataStore';
import type { AssetPosition } from '@template/api';
import { EnumLabelMapper } from '@template/api';
const metadataStore = useMetadataStore();
const marketDataStore = useMarketDataStore();
const { addVisibleSymbols } = selectedSymbolInstance;
const props = defineProps<{
  rowData: AssetPosition[];
}>();

// 그리드 옵션
const gridOptions = ref<GridOptions>({
  suppressRowClickSelection: false, // deprecated 속성 제거
  suppressMenuHide: true, // 유효하지 않은 속성 제거
  suppressCellFocus: true, // 셀 클릭 시 포커스 테두리 제거
});

// 실시간 시세 데이터 변경 감지를 위한 computed
const marketDataTrigger = computed(() => {
  // 테이블에 표시되는 종목들의 시세 데이터 변경을 감지
  const symbols = props.rowData.map((item) => item.stockCd);
  return symbols.map((symbol) => marketDataStore.getSymbolDataBySymbol(symbol)?.price || 0);
});

// 컬럼 정의
const columnDefs = computed<ColDef[]>(() => {
  const _ = marketDataTrigger.value; // 시세 데이터 변경 감지

  return [
    {
      headerName: '종목코드',
      field: 'stockCd',
      sortable: true,
      width: 287,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
    },
    {
      headerName: '통화',
      field: 'stockCd',
      sortable: true,
      width: 287,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      valueFormatter: (params: any) => {
        const value = params.value;
        return value.slice(3, 6);
      },
    },
    {
      headerName: 'L / S',
      field: 'positionCd',
      sortable: true,
      width: 100,
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
      headerName: '수량',
      field: 'accountBookQuantity',
      sortable: true,
      width: 287,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        return padDecimalPlaces(params.value, 2);
      },
    },
    {
      headerName: '가격',
      field: 'accountBookPrice',
      sortable: true,
      width: 287,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },
    {
      headerName: '증거금($)',
      field: 'depositPrice',
      sortable: true,
      width: 287,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => formatNumber(params.value),
    },

    {
      headerName: '평가손익($)',
      field: 'depositPercent',
      sortable: true,
      width: 287,
      headerClass: 'text-center',
      cellStyle: (params: any) => {
        // 실시간 평가손익 계산
        const currentPrice = marketDataStore.getSymbolDataBySymbol(params.data.stockCd)?.price || 0;
        const accountBookPrice = params.data.accountBookPrice || 0;
        const quantity = params.data.accountBookQuantity || 0;
        const positionCd = params.data.positionCd;

        // 평가손익 계산: (현재가 - 장부가격) * 수량 * 포지션 방향
        const priceDiff = currentPrice - accountBookPrice;
        const profitLoss = positionCd === '1' ? priceDiff * quantity : -priceDiff * quantity;

        return getProfitLossStyle(profitLoss, 'right');
      },
      valueFormatter: (params: any) => {
        // 실시간 평가손익 계산
        const currentPrice = marketDataStore.getSymbolDataBySymbol(params.data.stockCd)?.price || 0;
        const accountBookPrice = params.data.accountBookPrice || 0;
        const quantity = params.data.accountBookQuantity || 0;
        const positionCd = params.data.positionCd;

        // 평가손익 계산: (현재가 - 장부가격) * 수량 * 포지션 방향
        const priceDiff = currentPrice - accountBookPrice;
        const profitLoss = positionCd === '1' ? priceDiff * quantity : -priceDiff * quantity;

        const formatted = padDecimalPlaces(profitLoss, 2);
        return profitLoss > 0 ? `+${formatted}` : formatted;
      },
    },
  ];
});

// 테이블에 표시되는 종목들 구독 관리
const subscribeToTableSymbols = () => {
  const symbols = props.rowData.map((item) => item.stockCd);
  if (symbols.length > 0) {
    addVisibleSymbols('PositionTableContent', symbols);
  }
};

// 테이블 종목 구독 해제
const unsubscribeFromTableSymbols = () => {
  // 구독 해제는 전역적으로 관리되므로 별도 처리 불필요
};

// 데이터 변경 시 종목 구독 업데이트
watch(
  () => props.rowData,
  () => {
    subscribeToTableSymbols();
  },
  { deep: true }
);

onMounted(() => {
  subscribeToTableSymbols();
});

onUnmounted(() => {
  unsubscribeFromTableSymbols();
});
</script>
