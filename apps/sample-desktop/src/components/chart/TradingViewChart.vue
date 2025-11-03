<template>
  <div class="chart-container">
    <!-- TradingView 차트 -->
    <div :id="containerId" class="chart-wrapper"></div>

    <!-- FIXME: 기획 검토를 위한 매수/매도 임시 구현. 기획 결정 시 수정 -->
    <div v-if="showTradingButtons" class="trading-overlay">
      <div class="trading-buttons">
        <button class="sell-button" @click="handleSell">
          <div class="price">{{ sellPrice }}</div>
          <BaseIcon name="trending-up" size="sm" />
        </button>
        <button class="buy-button" @click="handleBuy">
          <BaseIcon name="trending-down" size="sm" />
          <div class="price">{{ buyPrice }}</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getGlobalChartSettingsInstance } from '@/composables/useGlobalChartSettings';
import { calculateBuyPrice, calculateSellPrice } from '@template/utils';
import { useEventBus, MARKET_EVENTS } from '@/composables/useEventBus';
import { tradingViewManager } from '@/managers/ui/TradingViewManager';
import { onMounted, onUnmounted, ref, computed, watch } from 'vue';
import { useMarketDataStore } from '@/stores/useMarketDataStore';
import { generateContainerId } from '@/utils/chart/ChartUtils';
import { BaseIcon } from '@template/ui';
import './TradingViewChart.scss';

interface Props {
  symbol?: string;
  chartId?: string;
  timeframe?: string;
}

interface Emits {
  (e: 'chart-ready'): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  symbol: 'EURTRY',
  chartId: '',
  timeframe: '1',
});

const isChartReady = ref<boolean>(false);

// 전역 TradingView 매니저 사용
const chartManager = tradingViewManager;

// 글로벌 차트 설정 인스턴스 가져오기
const globalChartSettings = getGlobalChartSettingsInstance();

// Event Bus를 통한 실시간 데이터 구독
const { on } = useEventBus();

// 매수/매도 버튼 표시 여부
// FIXME: 기획 검토를 위한 임시 구현. 기획 결정 시 수정
const showTradingButtons = computed(() => {
  const globalSettings = globalChartSettings.getGlobalChartSettings();
  // 차트 로딩 완료 후에 표시
  return isChartReady.value && globalSettings.trading.showBuySellButtons;
});

// Pinia Store에서 실시간 가격 데이터 가져오기
const marketDataStore = useMarketDataStore();

// 실시간 매수/매도 가격 계산
const sellPrice = computed(() => {
  const marketData = marketDataStore.getSymbolDataBySymbol(props.symbol || '');
  const currentPrice = marketData?.price || 0;
  const calculatedSellPrice = calculateSellPrice(props.symbol, currentPrice);
  return calculatedSellPrice.toFixed(5);
});

const buyPrice = computed(() => {
  const marketData = marketDataStore.getSymbolDataBySymbol(props.symbol || '');
  const currentPrice = marketData?.price || 0;
  const calculatedBuyPrice = calculateBuyPrice(props.symbol, currentPrice);
  return calculatedBuyPrice.toFixed(5);
});

const spread = computed(() => {
  const buy = parseFloat(buyPrice.value);
  const sell = parseFloat(sellPrice.value);
  return (buy - sell).toFixed(5);
});

// 고유한 컨테이너 ID 생성
const containerId = computed(() => {
  return generateContainerId(props.chartId);
});

// 커스텀 트레이딩 핸들러
const handleSell = () => {
  console.log('[TradingView] Sell button clicked:', {
    symbol: props.symbol,
    price: sellPrice.value,
  });
  // TODO: 실제 매도 로직 구현
};

const handleBuy = () => {
  console.log('[TradingView] Buy button clicked:', {
    symbol: props.symbol,
    price: buyPrice.value,
  });
  // TODO: 실제 매수 로직 구현
};

onMounted(async () => {
  try {
    // 글로벌 설정 가져오기
    const globalSettings = globalChartSettings.getGlobalChartSettings();
    console.log('props.timeframe 초기값', props.timeframe);

    // 전역 TradingView 매니저를 사용하여 차트 초기화
    await tradingViewManager.initializeChart({
      symbol: props.symbol,
      interval: '1',
      container: containerId.value,
      width: '100%',
      locale: 'ko',
      debug: false,
      settings: globalSettings, // 글로벌 설정 적용
    });

    // ChartManager를 글로벌 설정 관리에 등록
    const currentChartManager = tradingViewManager.getExistingChartManager(containerId.value);
    if (currentChartManager) {
      globalChartSettings.registerChartManager(currentChartManager);
      console.log('[TradingView] ChartManager registered to global settings');
    }

    // 실시간 데이터 업데이트 이벤트 구독 (로깅용)
    on(MARKET_EVENTS.DATA_UPDATED, (data: any) => {
      // 현재 차트의 심볼과 일치하는 데이터만 처리
      if (data.symbol === props.symbol && isChartReady.value) {
        // console.log(`[TradingView] ${props.symbol} 실시간 데이터 수신:`, {
        //   price: data.price,
        //   bid: data.bid,
        //   ask: data.ask,
        //   timestamp: data.timestamp,
        // });
      }
    });

    isChartReady.value = true;
    emit('chart-ready');
    // console.log(
    //   '[TradingView] Chart initialized with global settings for container:',
    //   containerId.value
    // );
    // console.log('[TradingView] Applied theme:', globalSettings.basic.theme);
    // console.log(`[TradingView] 실시간 데이터 구독 시작: ${props.symbol}`);
  } catch (error) {
    console.error('[TradingView] Chart initialization failed:', error);
  }
});

onUnmounted(() => {
  // ChartManager 등록 해제
  const currentChartManager = tradingViewManager.getExistingChartManager(containerId.value);
  if (currentChartManager) {
    globalChartSettings.unregisterChartManager(currentChartManager);
    console.log('[TradingView] ChartManager unregistered from global settings');
  }

  // 전역 TradingView 매니저에서 차트 제거
  tradingViewManager.destroyChart(containerId.value);

  isChartReady.value = false;
  console.log('[TradingView] Chart destroyed');
});

// timeframe 변경 감지 및 적용
watch(
  () => props.timeframe,
  (newTimeframe, oldTimeframe) => {
    if (newTimeframe && newTimeframe !== oldTimeframe && isChartReady.value) {
      console.log('[TradingView] Timeframe changed from', oldTimeframe, 'to', newTimeframe);
      tradingViewManager.changeInterval(containerId.value, newTimeframe);
    }
  }
);

// 심볼 변경 감지
watch(
  () => props.symbol,
  (newSymbol, oldSymbol) => {
    if (newSymbol && newSymbol !== oldSymbol && isChartReady.value) {
      console.log(`[TradingView] Symbol changed from ${oldSymbol} to ${newSymbol}`);
      console.log(`[TradingView] 실시간 데이터 구독 대상 변경: ${oldSymbol} -> ${newSymbol}`);
      tradingViewManager.changeSymbol(containerId.value, newSymbol);
    }
  }
);

// 외부에서 차트 심볼 변경을 위한 메서드 노출
defineExpose({
  changeChartSymbol: (symbol: string) => {
    if (isChartReady.value) {
      tradingViewManager.changeSymbol(containerId.value, symbol);
    }
  },
  refreshChart: () => {
    if (isChartReady.value) {
      const chartManager = tradingViewManager.getExistingChartManager(containerId.value);
      if (chartManager) {
        chartManager.refreshChart();
      }
    }
  },
  isChartReady: () => isChartReady.value,
  // ChartManager 인스턴스 노출
  getChartManager: () => tradingViewManager.getExistingChartManager(containerId.value),
});
</script>
