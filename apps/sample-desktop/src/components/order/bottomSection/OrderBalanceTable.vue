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
  <CloseOutDialog
    :isOpen="isClearOutDialogOpen"
    @close="isClearOutDialogOpen = false"
    :selectedRowData="selectedRowData"
    @confirm="handleCloseOutExecution"
  />
  <EntireCloseOutDialog
    v-model:isOpen="isEntireCloseOutDialogOpen"
    @close="isEntireCloseOutDialogOpen = false"
    @cancel="isEntireCloseOutDialogOpen = false"
    @confirm="handleEntireCloseOutExecution"
  />
</template>

<script setup lang="ts">
// props 정의
interface Props {
  selectedTabKey?: string;
  searchKeyword?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selectedTabKey: '',
  searchKeyword: '',
});

import {
  OrderCloseOutRequest,
  OrderCloseOutRequestOrderTypeCdType,
  OrderCloseOutRequestSideCdType,
} from '@template/api';
import CloseOutDialog, {
  type CloseOutDialogData,
} from '@/components/order/bottomSection/dialog/CloseOutDialog.vue';
import {
  predefinedStyles,
  getProfitLossStyle,
  formatDateForGrid,
  formatDateCompact,
} from '@template/utils';
import EntireCloseOutDialog from '@/components/order/bottomSection/dialog/EntireCloseOutDialog.vue';
import { selectedSymbolInstance as selectedSymbol } from '@/composables/useSelectedSymbol';
import { BaseDataGrid, ColDef, GridOptions, BaseButton, BaseChip } from '@template/ui';
import { ref, onMounted, onUnmounted, computed, watch, h, render } from 'vue';
import { selectedSymbolInstance } from '@/composables/useSelectedSymbol';
import { getDecimalPlaces, padDecimalPlaces } from '@template/utils';
import { useMarketDataStore } from '@/stores/useMarketDataStore';
import { usePositionData } from '@/composables/usePositionData';
import { useMetadataStore } from '@/stores/useMetadataStore';
import { useAccountStore } from '@/stores/useAccountStore';
import { useToastStore } from '@/stores/useToastStore';
import { PositionStockData } from '@template/api';
import { EnumLabelMapper } from '@template/api';
import { stockService } from '@/services/api';
import { orderService } from '@/services/api';

const accountStore = useAccountStore();
const toastStore = useToastStore();
const positionData = usePositionData();
const metadataStore = useMetadataStore();
const marketDataStore = useMarketDataStore();
const { addVisibleSymbols } = selectedSymbolInstance;

const isClearOutDialogOpen = ref(false);
const isEntireCloseOutDialogOpen = ref(false);

/**
 * 평가손익 계산 함수 (이미지 공식 적용)
 * LONG: (현재가 - 가격) x 수량 x lot승수 x price승수 x 거래통화USD
 * SHORT: 위 계산에 부호만 다르게
 */
const calculateProfitLoss = (
  currentPrice: number,
  accountBookPrice: number,
  quantity: number,
  positionCd: string,
  tradeCurrencyCd: string,
  metadata: any
): number => {
  if (!metadata) {
    // 메타데이터가 없으면 기본 계산
    const priceDiff = currentPrice - accountBookPrice;
    return positionCd === '1' ? priceDiff * quantity : -priceDiff * quantity;
  }

  // 1. 가격 차이 계산
  const priceDiff = currentPrice - accountBookPrice;

  // 2. 기본 손익 계산 (포지션 방향 적용)
  const baseProfitLoss = positionCd === '1' ? priceDiff : -priceDiff;

  // 3. lot 승수와 price 승수 적용
  const lotMultiple = metadata.lotMultiple || 1;
  const priceMultiplier = metadata.priceMultiplier || 1;

  // 4. 거래통화 USD 환율 적용
  let currencyRate = 1; // 기본값 (USD인 경우)

  if (tradeCurrencyCd && tradeCurrencyCd !== 'USD') {
    // 거래통화가 USD가 아닌 경우 환율 적용
    // 예: AUDCAD의 경우 CADUSD 매도가 사용
    const currencyPair = `${tradeCurrencyCd}USD`;
    const currencyData = marketDataStore.getSymbolDataBySymbol(currencyPair);

    if (currencyData && currencyData.price > 0) {
      currencyRate = currencyData.price;
    } else {
      // 환율 데이터가 없으면 기본값 사용
      // console.warn(`[calculateProfitLoss] ${currencyPair} 환율 데이터 없음, 기본값 1 사용`);
    }
  }

  // 5. 최종 계산: (현재가 - 가격) x 수량 x lot승수 x price승수 x 거래통화USD
  const finalProfitLoss = baseProfitLoss * quantity * lotMultiple * priceMultiplier * currencyRate;

  return finalProfitLoss;
};

// BaseDataGrid에서 기본 설정을 제공하므로 추가 설정 불필요
const gridOptions = ref<GridOptions>({});

const selectedRowData = ref<PositionStockData>({
  stockCd: '',
  tradeCurrencyCd: '',
  positionCd: 'LONG',
  purchaseDate: '',
  accountBookQuantity: 0,
  liquidationPossibleQuantity: 0,
  accountBookPrice: 0,
  currentPrice: 0,
  assessmentProfitLoss: 0,
  stockGroupCd: 'ALL',
  positionNo: '',
});

// 검색어에 따라 필터링된 데이터 사용
const rowData = computed(() => {
  return positionData.getFilteredPositionStocks(props.searchKeyword);
});

// 실시간 시세 데이터 변경 감지를 위한 computed
const marketDataTrigger = computed(() => {
  // 테이블에 표시되는 종목들의 시세 데이터 변경을 감지
  const symbols = rowData.value.map((item) => item.stockCd);
  return symbols.map((symbol) => marketDataStore.getSymbolDataBySymbol(symbol)?.price || 0);
});

// metadata가 로드되면 자동으로 컬럼 정의 재계산
const columnDefs = computed<ColDef[]>(() => {
  // metadata store의 isInitialized를 의존성으로 추가하여 반응성 보장
  const _ = metadataStore.isInitialized;
  const __ = marketDataTrigger.value; // 시세 데이터 변경 감지

  return [
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
      headerName: '매입일자',
      field: 'purchaseDate',
      sortable: true,
      width: 120,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.center,
      valueFormatter: (params: any) => formatDateForGrid(params.value),
    },
    {
      headerName: '수량',
      field: 'accountBookQuantity',
      sortable: true,
      width: 100,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => padDecimalPlaces(params.value, 2),
    },
    {
      headerName: '청산가능수량',
      field: 'liquidationPossibleQuantity',
      sortable: true,
      width: 120,
      headerClass: 'text-center',
      cellStyle: predefinedStyles.right,
      valueFormatter: (params: any) => padDecimalPlaces(params.value, 2),
    },
    {
      headerName: '가격',
      field: 'accountBookPrice',
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
      headerName: '현재가',
      field: 'currentPrice',
      sortable: true,
      width: 100,
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'right' as const,
      },
      valueFormatter: (params: any) => {
        const currentPrice = marketDataStore.getSymbolDataBySymbol(params.data.stockCd)?.price || 0;
        const metadata = metadataStore.getMetadata(params.data.stockCd);
        return padDecimalPlaces(currentPrice, getDecimalPlaces(metadata?.pointUnit || 0));
      },
    },
    {
      headerName: '평가손익',
      field: 'assessmentProfitLoss',
      sortable: true,
      width: 120,
      headerClass: 'text-center',
      cellStyle: (params: any) => {
        // 실시간 가격 변동 시: 이미지 공식대로 계산
        // 체결 시: WebSocket assessmentProfitLoss 값 사용
        const realTimePrice = marketDataStore.getSymbolDataBySymbol(params.data.stockCd)?.price;
        const apiCurrentPrice = params.data.currentPrice || 0;
        const apiAssessmentProfitLoss = params.data.assessmentProfitLoss || 0;

        let profitLoss;
        if (realTimePrice && realTimePrice > 0) {
          // 실시간 가격 변동 시: 이미지 공식대로 계산
          profitLoss = calculateProfitLoss(
            realTimePrice,
            params.data.accountBookPrice || 0,
            params.data.accountBookQuantity || 0,
            params.data.positionCd,
            params.data.tradeCurrencyCd,
            metadataStore.getMetadata(params.data.stockCd)
          );
        } else {
          // 실시간 가격이 없으면 WebSocket에서 받은 값 사용 (체결 시)
          profitLoss = apiAssessmentProfitLoss;
        }

        return getProfitLossStyle(profitLoss, 'right');
      },
      valueFormatter: (params: any) => {
        // 실시간 가격 변동 시: 이미지 공식대로 계산
        // 체결 시: WebSocket assessmentProfitLoss 값 사용
        const realTimePrice = marketDataStore.getSymbolDataBySymbol(params.data.stockCd)?.price;
        const apiCurrentPrice = params.data.currentPrice || 0;
        const apiAssessmentProfitLoss = params.data.assessmentProfitLoss || 0;

        let profitLoss;
        if (realTimePrice && realTimePrice > 0) {
          // 실시간 가격 변동 시: 이미지 공식대로 계산
          profitLoss = calculateProfitLoss(
            realTimePrice,
            params.data.accountBookPrice || 0,
            params.data.accountBookQuantity || 0,
            params.data.positionCd,
            params.data.tradeCurrencyCd,
            metadataStore.getMetadata(params.data.stockCd)
          );
        } else {
          // 실시간 가격이 없으면 WebSocket에서 받은 값 사용 (체결 시)
          profitLoss = apiAssessmentProfitLoss;
        }

        const value = padDecimalPlaces(profitLoss, 2);
        return profitLoss > 0 ? `+${value}` : value;
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
          label: '청산',
          onMousedown: (e: Event) => {
            e.preventDefault();
            e.stopPropagation();

            selectedRowData.value = params.data;
            isClearOutDialogOpen.value = true;
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
          label: '시장가청산',
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
  ];
});

const loadStockPositionData = async () => {
  const request = {
    accountNo: accountStore.selectedAccountNoSafe,
    stockCd: '', // 검색어는 상위에서 관리
    nextKey: '',
  };

  const response = await stockService.getPositionStocks(request);

  if (response.data) {
    response.data.symbols.forEach((symbol: any) => {
      positionData.updatePositionStock(symbol.stockCd, symbol.positionCd, symbol);
    });
  }
};

const getOppositeSideCd = (positionCd: string): OrderCloseOutRequestSideCdType => {
  return positionCd === 'LONG' ? 'SELL_TO_CLOSE' : 'BUY_TO_COVER';
};

const closeOutExecution = async (
  rowData: PositionStockData,
  orderTypeCd: OrderCloseOutRequestOrderTypeCdType,
  orderQuantity: number,
  orderPrice: number,
  barrierPrice: number
) => {
  try {
    const request: OrderCloseOutRequest = {
      accountNo: accountStore.selectedAccountNoSafe,
      accountPassword: '123456',
      stockCd: rowData.stockCd,
      orderTypeCd: orderTypeCd,
      sideCd: getOppositeSideCd(rowData.positionCd),
      orderQuantity: orderQuantity,
      barrierPrice: barrierPrice,
      orderPrice: orderPrice,
      purchaseDate: formatDateCompact(rowData.purchaseDate),
      balanceNo: rowData.positionNo,
    };
    const response = await orderService.createCloseOutOrder(request);
    if (response.data) {
      const message =
        orderTypeCd === 'MARKET' ? '시장가 청산이 완료되었습니다' : '청산이 완료되었습니다';
      toastStore.addToast(message);
    }
  } catch (error) {
    console.error(error);
  }
};

const handleCloseOutExecution = async (data: CloseOutDialogData) => {
  await closeOutExecution(
    selectedRowData.value,
    data.orderTypeCd as OrderCloseOutRequestOrderTypeCdType,
    data.orderQuantity,
    data.orderPrice,
    data.barrierPrice
  );
  isClearOutDialogOpen.value = false;
};

const handleEntireCloseOutExecution = async () => {
  await closeOutExecution(
    selectedRowData.value,
    'MARKET',
    selectedRowData.value.accountBookQuantity,
    selectedSymbol.currentPrice.value,
    0
  );
  isEntireCloseOutDialogOpen.value = false;
};

// 테이블에 표시되는 종목들 구독 관리
const subscribeToTableSymbols = () => {
  const symbols = rowData.value.map((item) => item.stockCd);
  if (symbols.length > 0) {
    addVisibleSymbols('OrderBalanceTable', symbols);
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

// 검색어 변경 감지 (실시간 필터링)
watch(
  () => props.searchKeyword,
  () => {
    // 검색어가 변경되면 computed 속성인 filteredRowData가 자동으로 업데이트됨
    // 추가 로직이 필요한 경우 여기에 작성
  }
);

onMounted(() => {
  subscribeToTableSymbols();
});

onUnmounted(() => {
  unsubscribeFromTableSymbols();
});
</script>
