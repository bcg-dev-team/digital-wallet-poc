<!--
  @fileoverview 다중 차트를 표시하는 메인 레이아웃 컴포넌트
  @component MultiChartLayout
  @figma 다중 차트 레이아웃
-->
<template>
  <div class="multi-chart-layout">
    <!-- 좌측 드로잉 툴바 (TBD) -->
    <!-- TODO: 툴바 구현을 위한 공식 API가 제공되지 않아 기획 검토 필요 -->
    <!-- <div class="chart-drawing-toolbar">
      <ChartDrawingToolbar />
    </div> -->

    <!-- 메인 차트 영역 -->
    <div class="chart-main-area">
      <!-- 상단 툴바 영역 -->
      <div class="chart-top-toolbar">
        <ChartTopToolbar
          :selected-chart="selectedChart"
          :selected-chart-data="selectedChartData"
          :current-layout="currentLayout"
          @timeframe-change="handleTimeframeChange"
          @indicator-change="handleIndicatorChange"
          @layout-change="handleLayoutChange"
          @chart-manage="handleChartManage"
          @chart-settings="handleChartSettings"
        />
      </div>

      <!-- 차트 그리드 영역 -->
      <div class="chart-grid-container">
        <ChartGrid
          ref="chartGridRef"
          :charts="charts"
          :selected-chart="selectedChart"
          :layout="currentLayout"
          :is-dialog-open="showSettingsDialog || showIndicatorDialog"
          @chart-select="handleChartSelect"
          @chart-close="handleChartClose"
          @chart-sync="handleChartSync"
          @chart-symbol-change="handleChartSymbolChange"
          @chart-timeframe-change="handleChartTimeframeChange"
        />
      </div>
    </div>

    <!-- 차트 설정 다이얼로그 -->
    <ChartSettingsDialog
      :is-visible="showSettingsDialog"
      :chart-manager="getSelectedChartManager()"
      @close="handleSettingsDialogClose"
      @settings-changed="handleSettingsChanged"
    />

    <!-- 차트 지표 다이얼로그 -->
    <ChartIndicatorDialog
      :is-visible="showIndicatorDialog"
      :selected-chart-id="selectedChart"
      @close="handleIndicatorDialogClose"
      @indicator-select="handleIndicatorSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { getChartCountForLayout, getNextAvailablePosition } from '@/utils/chart/ChartLayoutUtils';
import type { ChartLayout, ChartData, TradingSymbol } from '@template/types';
import { DEFAULT_FOREX_SYMBOLS, CHART_DEFAULTS } from '@template/types';
import ChartIndicatorDialog from './ChartIndicatorDialog.vue';
import ChartSettingsDialog from './ChartSettingsDialog.vue';
import { generateChartId } from '@/utils/chart/ChartUtils';
// import ChartDrawingToolbar from './ChartDrawingToolbar.vue';
import ChartTopToolbar from './ChartTopToolbar.vue';
import { ref, computed, onMounted } from 'vue';
import ChartGrid from './ChartGrid.vue';

import './MultiChartLayout.scss';

// Props 정의
interface Props {
  initialSymbols?: TradingSymbol[];
}

const props = withDefaults(defineProps<Props>(), {
  initialSymbols: () => [],
});

// Emits 정의
interface Emits {
  (e: 'chart-select', chart: ChartData): void;
  (e: 'symbol-change', symbol: TradingSymbol): void;
}

const emit = defineEmits<Emits>();

// 상태 관리
const charts = ref<ChartData[]>([]);
const selectedChart = ref<string | null>(null);
const currentLayout = ref<ChartLayout>('2x2');
const showSettingsDialog = ref(false);
const showIndicatorDialog = ref(false);

// 컴포넌트 ref
const chartGridRef = ref();

// 차트 추가
const addChart = (symbol: TradingSymbol) => {
  const newChart: ChartData = {
    id: generateChartId(),
    symbol,
    timeframe: CHART_DEFAULTS.TIMEFRAME,
    isSelected: false,
    position: getNextAvailablePositionLocal(),
  };

  charts.value.push(newChart);

  // 첫 번째 차트인 경우 선택
  if (charts.value.length === 1) {
    selectChart(newChart.id);
  }
};

// 차트 제거
const removeChart = (chartId: string) => {
  const index = charts.value.findIndex((chart) => chart.id === chartId);
  if (index === -1) return;

  charts.value.splice(index, 1);

  // 선택된 차트가 제거된 경우 다른 차트 선택
  if (selectedChart.value === chartId) {
    selectedChart.value = charts.value.length > 0 ? charts.value[0].id : null;
  }
};

// 차트 선택
const selectChart = (chartId: string) => {
  // 모든 차트 선택 해제
  charts.value.forEach((chart) => {
    chart.isSelected = false;
  });

  // 선택된 차트만 선택 상태로 변경
  const chart = charts.value.find((c) => c.id === chartId);
  if (chart) {
    chart.isSelected = true;
    selectedChart.value = chartId;
    emit('chart-select', chart);
    emit('symbol-change', chart.symbol);
  }
};

// 다음 사용 가능한 위치 계산
const getNextAvailablePositionLocal = (): { row: number; col: number } => {
  return getNextAvailablePosition(charts.value, currentLayout.value);
};

// 이벤트 핸들러
const handleChartSelect = (chartId: string) => {
  selectChart(chartId);
};

const handleChartClose = (chartId: string) => {
  removeChart(chartId);
};

const handleChartSync = (chartId: string, syncColor: string) => {
  const chart = charts.value.find((c) => c.id === chartId);
  if (chart) {
    chart.syncColor = syncColor;
  }
};

const handleTimeframeChange = (timeframe: string) => {
  console.log('[handleTimeframeChange] Timeframe changed:', timeframe);

  if (selectedChart.value) {
    const chart = charts.value.find((c) => c.id === selectedChart.value);
    if (chart) {
      chart.timeframe = timeframe;

      if (chartGridRef.value) {
        const chartManager = chartGridRef.value.getChartManager(selectedChart.value);
        if (chartManager) {
          chartManager.changeInterval(timeframe);
        } else {
          console.warn(
            '[MultiChartLayout] ChartManager not found for selected chart:',
            selectedChart.value
          );
        }
      }
    }
  } else {
    console.warn('[handleTimeframeChange] No chart selected');
  }
};

const handleChartSymbolChange = (chartId: string, symbol: any) => {
  const chart = charts.value.find((c) => c.id === chartId);
  if (chart) {
    chart.symbol = symbol;
    // 선택된 차트인 경우 심볼 change emit
    if (selectedChart.value === chartId) {
      emit('symbol-change', symbol);
    }
  }
};

const handleChartTimeframeChange = (chartId: string, timeframe: string) => {
  console.log('[handleChartTimeframeChange] Timeframe changed:', timeframe);

  const chart = charts.value.find((c) => c.id === chartId);
  if (chart) {
    console.log('[handleChartTimeframeChange] Updating chart timeframe:', chart.id, timeframe);
    chart.timeframe = timeframe;

    if (chartGridRef.value) {
      // 올바른 chartId를 사용하여 ChartManager 가져오기
      const chartManager = chartGridRef.value.getChartManager(chartId);
      if (chartManager) {
        console.log('[handleChartTimeframeChange] Applying interval to ChartManager:', timeframe);
        chartManager.changeInterval(timeframe);
      } else {
        console.warn('[handleChartTimeframeChange] ChartManager not found for:', chartId);
      }
    }
  } else {
    console.warn('[handleChartTimeframeChange] Chart not found for ID:', chartId);
  }
};

const handleIndicatorChange = (indicator: any) => {
  if (indicator === 'indicator-dialog-open') {
    showIndicatorDialog.value = true;
    return;
  }

  // TODO: 선택된 차트에 지표 적용
  // TradingViewChart 컴포넌트에서 직접 지표를 추가하도록 수정 필요
  if (selectedChart.value) {
    const chart = charts.value.find((c) => c.id === selectedChart.value);
    if (chart) {
      console.log('지표를 선택된 차트에 적용:', chart.id, indicator);
    }
  }
};

const handleIndicatorDialogClose = () => {
  showIndicatorDialog.value = false;
};

const handleIndicatorSelect = (indicator: any) => {
  console.log('선택된 지표:', indicator);
  // TODO: 선택된 차트에 지표 적용
  if (selectedChart.value) {
    const chart = charts.value.find((c) => c.id === selectedChart.value);
    if (chart) {
      console.log('지표를 선택된 차트에 적용:', chart.id, indicator);
    }
  }
};

// 레이아웃에 따른 차트 초기화
const initializeChartsForLayout = (layout: ChartLayout) => {
  // 기존 차트 모두 제거
  charts.value = [];

  // 레이아웃에 따른 차트 개수 결정
  const chartCount = getChartCountForLayoutLocal(layout);

  // initialSymbols가 있으면 사용, 없으면 기본 심볼들 사용
  const symbolsToUse =
    props.initialSymbols.length > 0 ? props.initialSymbols : DEFAULT_FOREX_SYMBOLS;

  for (let i = 0; i < chartCount; i++) {
    const symbol = symbolsToUse[i] || symbolsToUse[0];
    addChart(symbol);
  }

  // 첫 번째 차트를 선택된 차트로 설정
  if (charts.value.length > 0) {
    selectedChart.value = charts.value[0].id;
  }
};

// 레이아웃별 차트 개수 반환 (유틸리티 함수 사용)
const getChartCountForLayoutLocal = (layout: ChartLayout): number => {
  return getChartCountForLayout(layout);
};

const handleLayoutChange = (layout: ChartLayout) => {
  currentLayout.value = layout;
  // 레이아웃 변경 시 차트 초기화 및 재배치
  initializeChartsForLayout(layout);
};

const handleChartManage = () => {
  // TODO: 차트 관리 모달 표시 또는 차트 추가/제거 기능
  console.log('차트 관리 클릭');
};

// 차트 설정 다이얼로그 관련
const handleChartSettings = () => {
  console.log('차트 설정 버튼 클릭됨');
  showSettingsDialog.value = true;
};

const handleSettingsDialogClose = () => {
  console.log('설정 다이얼로그 닫기');
  showSettingsDialog.value = false;
};

const handleSettingsChanged = (settings: any) => {
  console.log('Chart settings changed:', settings);
  // 설정이 변경되면 이미 ChartManager에서 자동으로 적용됨
};

// 선택된 차트의 ChartManager 가져오기
const getSelectedChartManager = () => {
  if (!selectedChart.value) {
    return null;
  }

  // ChartGrid를 통해 ChartManager에 접근
  return chartGridRef.value?.getChartManager(selectedChart.value) || null;
};

// 컴포넌트 마운트 시 차트 초기화
onMounted(() => {
  initializeChartsForLayout('2x2');
});

// 선택된 차트 정보
const selectedChartData = computed(() => {
  return charts.value.find((chart) => chart.id === selectedChart.value) || null;
});

// 선택된 차트의 심볼 변경
const changeSelectedChartSymbol = (symbol: TradingSymbol) => {
  if (selectedChart.value) {
    const chart = charts.value.find((c) => c.id === selectedChart.value);
    if (chart) {
      chart.symbol = symbol;
      emit('symbol-change', symbol);
    }
  }
};

// 외부에서 호출 가능한 API 함수들
const addNewChart = (symbol: TradingSymbol) => addChart(symbol);
const removeChartById = (chartId: string) => removeChart(chartId);
const getSelectedChartId = () => selectedChart.value;
const getCharts = () => charts.value;

// 외부에서 호출 가능한 메서드들 expose
defineExpose({
  // 차트 관리
  addNewChart,
  removeChartById,
  changeSelectedChartSymbol,

  // 상태 조회
  getSelectedChartId,
  getCharts,
  selectedChartData,
  getSelectedChartManager,
});
</script>
