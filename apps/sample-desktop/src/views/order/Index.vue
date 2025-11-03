<template>
  <div class="order-page flex min-w-[1920px]">
    <!-- 좌측 패널-->
    <div class="order-list-panel panel-border-right min-w-[340px]">
      <SymbolList
        :selected-symbol="selectedSymbol.selectedSymbol.value"
        @symbol-select="handleSymbolSelect"
      />
    </div>
    <!-- 중앙 패널-->
    <div class="panel-border-right flex-1">
      <!-- 차트 패널-->
      <div class="chart-panel">
        <MultiChartLayout
          ref="multiChartLayoutRef"
          :initial-symbols="[]"
          @chart-select="handleChartSelect"
          @symbol-change="handleSymbolChange"
        />
      </div>

      <!-- 테이블 패널-->
      <div class="table-panel relative">
        <div class="flex items-center justify-between pt-3">
          <!-- 라디오 그룹 -->
          <div class="w-[236px]">
            <BaseRadioGroup
              v-model="activeTab"
              :options="radioOptions"
              size="sm"
              variant="underline"
              noUnderline
            />
          </div>

          <!-- 탭별 우측 UI -->
          <div class="flex items-center gap-2">
            <!-- 잔고 탭: 검색 필드 -->
            <BaseInput
              v-if="activeTab === 'balance'"
              v-model="searchKeyword"
              placeholder="종목코드로 검색"
              size="sm"
              variant="search"
              class="w-[180px]"
              :full="false"
              @onSearch="handleSearch"
            />

            <!-- 주문/청산 탭: 날짜 선택 -->
            <div
              v-else-if="activeTab === 'order' || activeTab === 'clear'"
              class="mb-1 mr-1 flex items-center gap-2"
            >
              <div class="w-[100px]">
                <BaseInputSelect
                  v-model="datePeriod"
                  :options="[
                    { value: 'today', label: '오늘' },
                    { value: 'weeks', label: '일주일' },
                    { value: 'months', label: '1개월' },
                    { value: 'custom', label: '직접입력' },
                  ]"
                />
              </div>
              <div class="w-[140px]">
                <BaseInputCalendar
                  v-model="dateStartDate"
                  :disabled="!isCustomDatePeriod"
                  size="sm"
                />
              </div>
              <span>~</span>
              <div class="w-[140px]">
                <BaseInputCalendar
                  v-model="dateEndDate"
                  :disabled="!isCustomDatePeriod"
                  size="sm"
                />
              </div>
            </div>

            <!-- 미체결 탭: 빈 공간 -->
            <div v-else-if="activeTab === 'unsettled'"></div>
          </div>
        </div>
        <!-- 테이블 컨텐츠 영역 -->
        <div class="flex-1 overflow-hidden">
          <OrderBalanceTable v-if="activeTab === 'balance'" :search-keyword="searchKeyword" />
          <OrderHistoryTable
            v-else-if="activeTab === 'order'"
            :start-date="dateStartDate"
            :end-date="dateEndDate"
          />
          <PendingExecutionTable v-else-if="activeTab === 'unsettled'" />
          <CloseOutTable
            v-else-if="activeTab === 'clear'"
            :start-date="dateStartDate"
            :end-date="dateEndDate"
          />
        </div>
      </div>
    </div>
    <!-- 우측 패널-->
    <div class="order-action-panel w-[380px] !min-w-[380px]">
      <RightPanel :selected-symbol="selectedSymbol.selectedSymbol.value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BaseRadioGroup,
  BaseInput,
  BaseInputSelect,
  BaseInputCalendar,
  type RadioOption,
} from '@template/ui';
import PendingExecutionTable from '@/components/order/bottomSection/PendingExecutionTable.vue';
import { selectedSymbolInstance as selectedSymbol } from '@/composables/useSelectedSymbol';
import OrderHistoryTable from '@/components/order/bottomSection/OrderHistoryTable.vue';
import OrderBalanceTable from '@/components/order/bottomSection/OrderBalanceTable.vue';
import { useWebSocketSubscription } from '@/composables/useWebSocketSubscription';
import CloseOutTable from '@/components/order/bottomSection/CloseOutTable.vue';
import MultiChartLayout from '@/components/chart/MultiChartLayout.vue';
import { useGlobalWebSocket } from '@/composables/useGlobalWebSocket';
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useMarketDataStore } from '@/stores/useMarketDataStore';
import SymbolList from '@/components/order/SymbolList.vue';
import RightPanel from '@/components/order/RightPanel.vue';
import { useAccountStore } from '@/stores/useAccountStore';
import { useOrderData } from '@/composables/useOrderData';
import { useDateRange } from '@/composables/useDateRange';
import type { TradingSymbol } from '@template/types';
import './Index.scss';

// 상태 관리
const multiChartLayoutRef = ref<any>(null);

// 선택된 심볼의 시장 데이터 사용
const { marketData } = selectedSymbol;

// 시장 데이터 관리 (Pinia Store 사용)
const marketDataStore = useMarketDataStore();

// 계좌 스토어
const accountStore = useAccountStore();

// Composable 사용
const { updateWebSocketSubscriptions, unsubscribeAll } = useWebSocketSubscription();
const { initializeGlobalWebSocket, isConnected } = useGlobalWebSocket();
const { datePeriod, dateStartDate, dateEndDate, isCustomDatePeriod, initializeDateRange } =
  useDateRange();

// 주문 데이터 관리
const {
  orderHistoryData,
  pendingOrderData,
  positionData,
  closeOutData,
  setupAllWebSocketSubscriptions,
  cleanupAllWebSocketSubscriptions,
} = useOrderData();

// 검색 키워드
const searchKeyword = ref('');

// 검색 핸들러
const handleSearch = () => {
  // 검색 로직은 각 테이블 컴포넌트에서 처리
  console.log('검색어:', searchKeyword.value);
};

const activeTab = ref('balance');

const radioOptions: RadioOption[] = [
  { value: 'balance', label: '잔고' },
  { value: 'order', label: '주문' },
  { value: 'unsettled', label: '미체결' },
  { value: 'clear', label: '청산' },
];

// 이벤트 핸들러
const handleSymbolSelect = async (symbol: TradingSymbol) => {
  selectedSymbol.setSelectedSymbol(symbol.ticker);

  // 선택된 차트의 심볼 변경
  if (multiChartLayoutRef.value) {
    multiChartLayoutRef.value.changeSelectedChartSymbol(symbol);
  }

  // WebSocket 구독 업데이트 (종목 변경으로 인한 orderbook 채널 변경)
  await updateWebSocketSubscriptions(symbol);

  // console.log(`[OrderPage] 심볼 변경: ${symbol.ticker} - WebSocket 구독 업데이트 완료`);
};

// 다중 차트 이벤트 핸들러
const handleChartSelect = (chart: any) => {
  console.log('차트 선택됨:', chart);
  // 선택된 차트에 따른 우측 패널 업데이트 로직
};

const handleSymbolChange = (symbol: TradingSymbol) => {
  // 선택된 차트의 심볼만 업데이트 (다른 차트는 영향받지 않음)
  selectedSymbol.setSelectedSymbol(symbol.ticker);
};

// WebSocket 구독 준비 상태 계산
// 모든 필수 조건이 갖춰졌는지 확인
const isReadyForSubscription = computed(() => {
  const ready = !!accountStore.selectedAccountNo && !!accountStore.wsAccessTokenComputed;

  return {
    ready,
    accountNo: accountStore.selectedAccountNo,
    hasToken: !!accountStore.wsAccessTokenComputed,
  };
});

// WebSocket 구독 자동 관리
// 계좌/토큰/심볼이 변경되면 자동으로 구독 업데이트
watch(
  [
    () => accountStore.selectedAccountNo,
    () => accountStore.wsAccessTokenComputed,
    () => selectedSymbol.selectedSymbol.value,
  ],
  async ([accountNo, wsToken, symbol]) => {
    // WebSocket이 연결되지 않았으면 스킵
    if (!isConnected()) {
      return;
    }

    const currentSymbol = symbol
      ? ({ ticker: symbol } as TradingSymbol)
      : ({ ticker: 'EURUSD' } as TradingSymbol);

    await updateWebSocketSubscriptions(currentSymbol);
  },
  {
    deep: true,
    // 초기 실행 방지 (onMounted에서 처리)
    flush: 'post',
  }
);

// 실시간 데이터는 WebSocket을 통해 자동으로 처리됨

// 컴포넌트 언마운트 시 정리
onUnmounted(async () => {
  // 전역 함수는 각 테이블 컴포넌트에서 자체적으로 처리

  // 주문 데이터 웹소켓 구독 정리
  cleanupAllWebSocketSubscriptions();

  // WebSocket 연결 해제
  await unsubscribeAll();
});

// 컴포넌트 초기화
onMounted(async () => {
  // 1. 초기 날짜 계산
  initializeDateRange();

  // 2. 전역 WebSocket 연결 초기화 (한 번만 실행)
  try {
    await initializeGlobalWebSocket();
  } catch (error) {
    console.error('[OrderPage] 전역 WebSocket 연결 초기화 실패:', error);
    return;
  }

  // 3. 초기 WebSocket 구독 설정
  // watch가 자동으로 처리하지만, 초기 로드를 위해 한 번 호출
  // FIXME: 초기 심볼 설정 로직 수정 필요
  const defaultSymbol = { ticker: 'EURUSD' } as TradingSymbol;
  await updateWebSocketSubscriptions(defaultSymbol);

  // 4. 주문 데이터 웹소켓 이벤트 리스너 설정
  setupAllWebSocketSubscriptions();

  // 이후 계좌/심볼 변경은 watch에서 자동으로 처리됨
});
</script>
