<template>
  <LabelContent label="보유 포지션" size="lg">
    <template #count>
      <div
        class="rounded-xs flex h-[18px] w-[15px] items-center justify-center bg-[var(--trade-long-background)]"
      >
        <span class="text-red text-[11px] font-medium">{{ props.rowData.length }}</span>
      </div>
    </template>
    <template #content>
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
  </LabelContent>
</template>
<script setup lang="ts">
import {
  predefinedStyles,
  formatDateForGrid,
  getProfitLossStyle,
  padDecimalPlaces,
  getDecimalPlaces,
  formatNumber,
} from '@template/utils';
import { BaseDataGrid, BaseChip, type ColDef, type GridOptions } from '@template/ui';
import { h, ref, render, computed, onMounted, onUnmounted, watch } from 'vue';
import { selectedSymbolInstance } from '@/composables/useSelectedSymbol';
import { useMarketDataStore } from '@/stores/useMarketDataStore';
import LabelContent from '@/components/common/LabelContent.vue';
import { useMetadataStore } from '@/stores/useMetadataStore';
import { EnumLabelMapper } from '@template/api';
import type { Position } from '@template/api';
const metadataStore = useMetadataStore();
const marketDataStore = useMarketDataStore();
const { addVisibleSymbols } = selectedSymbolInstance;
const props = defineProps<{
  rowData: Position[];
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
      width: 160,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
    },
    {
      headerName: '통화',
      field: 'tradeCurrencyCd',
      sortable: true,
      width: 156,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
    },
    {
      headerName: 'L / S',
      field: 'positionCd',
      sortable: true,
      width: 156,
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
      headerName: '장부수량',
      field: 'accountBookQuantity',
      sortable: true,
      width: 156,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        return padDecimalPlaces(params.value, 2);
      },
    },
    {
      headerName: '청산가능수량',
      field: 'closeOutPossibleQuantity',
      sortable: true,
      width: 156,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        return padDecimalPlaces(params.value, 2);
      },
    },
    {
      headerName: '장부가격',
      field: 'accountBookPrice',
      sortable: true,
      width: 156,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },
    {
      headerName: '현재가',
      field: 'currentPrice',
      sortable: true,
      width: 156,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => {
        const currentPrice = marketDataStore.getSymbolDataBySymbol(params.data.stockCd)?.price || 0;
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(currentPrice, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },
    {
      headerName: '평가손익($)',
      field: 'assessmentProfitLoss',
      sortable: true,
      width: 156,
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
    {
      headerName: '수익률(%)',
      field: 'reLongExecutionPrice',
      sortable: true,
      width: 156,
      headerClass: 'text-center',
      cellStyle: (params: any) => {
        // 실시간 수익률 계산
        const currentPrice = marketDataStore.getSymbolDataBySymbol(params.data.stockCd)?.price || 0;
        const accountBookPrice = params.data.accountBookPrice || 0;

        if (accountBookPrice === 0) return getProfitLossStyle(0, 'right');

        // 수익률 계산: ((현재가 - 장부가격) / 장부가격) * 100
        const profitRate = ((currentPrice - accountBookPrice) / accountBookPrice) * 100;

        return getProfitLossStyle(profitRate, 'right');
      },
      valueFormatter: (params: any) => {
        // 실시간 수익률 계산
        const currentPrice = marketDataStore.getSymbolDataBySymbol(params.data.stockCd)?.price || 0;
        const accountBookPrice = params.data.accountBookPrice || 0;

        if (accountBookPrice === 0) return '0.00';

        // 수익률 계산: ((현재가 - 장부가격) / 장부가격) * 100
        const profitRate = ((currentPrice - accountBookPrice) / accountBookPrice) * 100;

        const formatted = padDecimalPlaces(profitRate, 2);
        return profitRate > 0 ? `+${formatted}` : formatted;
      },
    },
  ];
});

// 테이블에 표시되는 종목들 구독 관리
const subscribeToTableSymbols = () => {
  const symbols = props.rowData.map((item) => item.stockCd);
  if (symbols.length > 0) {
    addVisibleSymbols('HoldPosition', symbols);
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
