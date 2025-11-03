<!--
  다중 차트를 그리드 형태로 배치하는 컴포넌트
-->
<template>
  <div class="chart-grid" :class="gridLayoutClass">
    <ChartWindow
      v-for="chart in sortedCharts"
      :key="chart.id"
      :ref="(el: any) => setChartWindowRef(chart.id, el)"
      :chart="chart"
      :is-selected="chart.id === selectedChart"
      :timeframe="chart.timeframe"
      @select="() => handleChartSelect(chart.id)"
      @close="() => handleChartClose(chart.id)"
      @sync="(syncColor: string) => handleChartSync(chart.id, syncColor)"
      @symbol-change="(symbol: any) => handleChartSymbolChange(chart.id, symbol)"
      @timeframe-change="(timeframe: string) => handleChartTimeframeChange(chart.id, timeframe)"
    />
  </div>
</template>

<script setup lang="ts">
import { getGridLayoutClass, sortChartsByPosition } from '@/utils/chart/ChartLayoutUtils';
import type { ChartGridProps, ChartComponentEmits } from '@template/types';
import ChartWindow from './ChartWindow.vue';
import { computed, ref } from 'vue';
import './ChartGrid.scss';

// Props 정의 (공통 타입 사용)
const props = defineProps<ChartGridProps>();

// Emits 정의 (공통 타입 사용)
const emit = defineEmits<ChartComponentEmits>();

// ChartWindow 컴포넌트 ref 관리
const chartWindowRefs = ref<Map<string, any>>(new Map());

const setChartWindowRef = (chartId: string, el: any) => {
  if (el) {
    chartWindowRefs.value.set(chartId, el);
  } else {
    chartWindowRefs.value.delete(chartId);
  }
};

// 그리드 레이아웃 클래스 계산 (유틸리티 함수 사용)
const gridLayoutClass = computed(() => {
  return getGridLayoutClass(props.layout);
});

// 위치별로 정렬된 차트 목록 (유틸리티 함수 사용)
const sortedCharts = computed(() => {
  return sortChartsByPosition(props.charts);
});

// 이벤트 핸들러
const handleChartSelect = (chartId: string) => {
  emit('chart-select', chartId);
};

const handleChartClose = (chartId: string) => {
  emit('chart-close', chartId);
};

const handleChartSync = (chartId: string, syncColor: string) => {
  emit('chart-sync', chartId, syncColor);
};

const handleChartSymbolChange = (chartId: string, symbol: any) => {
  emit('chart-symbol-change', chartId, symbol);
};

const handleChartTimeframeChange = (chartId: string, timeframe: string) => {
  emit('chart-timeframe-change', chartId, timeframe);
};

// ChartWindow ref 접근을 위한 메서드 노출
defineExpose({
  getChartWindowRef: (chartId: string) => {
    return chartWindowRefs.value.get(chartId) || null;
  },
  getChartManager: (chartId: string) => {
    const chartWindow = chartWindowRefs.value.get(chartId);
    return chartWindow?.getChartManager?.() || null;
  },
});
</script>
