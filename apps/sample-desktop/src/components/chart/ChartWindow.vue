<!--
  각 차트를 표시하는 개별 윈도우 컴포넌트
-->
<template>
  <div
    class="chart-window"
    :class="{
      selected: isSelected,
      unselected: !isSelected,
    }"
    @click="handleSelect"
  >
    <!-- 차트 헤더 -->
    <div class="chart-header">
      <!-- 왼쪽 영역 -->
      <div class="header-left">
        <!-- 동기화 색상 표시 -->
        <div
          v-if="chart.syncColor"
          class="sync-color-badge"
          :style="{ backgroundColor: chart.syncColor }"
        >
          {{ getSyncColorLabel(chart.syncColor) }}
        </div>

        <!-- 심볼 드롭다운 -->
        <div class="symbol-info">
          <BaseInputSelect
            variant="chart-window"
            color="gray"
            :model-value="selectedSymbol"
            @update:model-value="handleSymbolChange"
            :options="symbolOptions"
            size="sm"
            placeholder="심볼 선택"
            :disabled="!isSelected"
          />
        </div>

        <!-- 시간대 드롭다운 -->
        <div class="timeframe-info">
          <BaseInputSelect
            variant="compact"
            color="gray"
            :model-value="selectedTimeframe"
            @update:model-value="handleTimeframeChange"
            :options="timeframeOptions"
            size="sm"
            placeholder="시간대 선택"
            :disabled="!isSelected"
          />
        </div>
      </div>

      <!-- 오른쪽 영역 -->
      <div class="header-right">
        <button class="header-button" @click.stop="handleExternalLink">
          <BaseIcon name="external-link" size="sm" />
        </button>
        <button class="header-button" @click.stop="handleClose">
          <BaseIcon name="close" size="sm" />
        </button>
      </div>
    </div>

    <!-- 차트 영역 -->
    <div class="chart-content">
      <TradingViewChart
        ref="tradingViewChartRef"
        :symbol="chart.symbol.ticker"
        :timeframe="chart.timeframe"
        :height="chartHeight"
        :chart-id="chart.id"
        :key="`chart-${chart.id}-${chart.symbol.ticker}`"
      />
    </div>

    <!-- 차트 하단 컨트롤 -->
    <!-- TODO: 임시 구현으로, 기능 검토 및 구현 필요-->
    <div class="chart-controls">
      <!-- <div class="controls-left">
        <button class="control-button" @click.stop="handlePrevious">
          <BaseIcon
            name="arrow-left-solid"
            size="md"
            color="var(--base-colors-neutral-neutral500)"
          />
        </button>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: '50%' }" />
        </div>
      </div>
      <button class="control-button" @click.stop="handleNext">
        <BaseIcon
          name="arrow-right-solid"
          size="md"
          color="var(--base-colors-neutral-neutral500)"
        />
      </button> -->
    </div>

    <!-- TODO: 동기화 색상 선택 패널 (선택된 차트에만 표시) -->
    <!-- <div v-if="isSelected" class="sync-panel">
      <div class="sync-panel-content">
        <div class="sync-title">심볼 동기화</div>
        <div class="sync-colors">
          <button
            v-for="color in syncColors"
            :key="color.value"
            class="sync-color-button"
            :class="{ active: chart.syncColor === color.value }"
            :style="{ backgroundColor: color.value }"
            @click.stop="handleSyncColorSelect(color.value)"
          >
            {{ color.label }}
          </button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { CHART_TIMEFRAMES, ALL_SYMBOLS, SYNC_COLORS } from '@template/types';
import type { ChartWindowProps, ChartWindowEmits } from '@template/types';
import { BaseIcon, BaseInputSelect } from '@template/ui';
import TradingViewChart from './TradingViewChart.vue';
import { computed, ref } from 'vue';
import './ChartWindow.scss';

// Props 정의
const props = defineProps<ChartWindowProps>();

// Emits 정의
const emit = defineEmits<ChartWindowEmits>();

// 선택된 심볼과 시간대
const selectedSymbol = computed(() => props.chart.symbol.ticker);
const selectedTimeframe = computed(() => props.chart.timeframe);

// 사용자 입력 처리 함수
const handleSymbolChange = (value: string) => {
  const symbol = ALL_SYMBOLS.find((s) => s.ticker === value);
  if (symbol) {
    emit('symbol-change', symbol);
  }
};

const handleTimeframeChange = (value: string) => {
  emit('timeframe-change', value);
};

// 심볼 옵션 배열 생성
const symbolOptions = computed(() =>
  ALL_SYMBOLS.map((symbol) => ({
    value: symbol.ticker,
    label: `${symbol.ticker} - ${symbol.description}`,
  }))
);

// 시간대 옵션 배열 생성
const timeframeOptions = computed(() =>
  CHART_TIMEFRAMES.map((timeframe) => ({
    value: timeframe.value,
    label: timeframe.label,
  }))
);

// 차트 높이 계산 (헤더와 컨트롤 제외)
const chartHeight = computed(() => {
  // 컨테이너 높이에서 헤더(40px)와 컨트롤(40px)을 제외한 높이
  return 320; // 400px - 40px(헤더) - 40px(컨트롤) = 320px
});

// 동기화 색상 라벨 가져오기
const getSyncColorLabel = (color: string): string => {
  const colorOption = SYNC_COLORS.find((c) => c.value === color);
  return colorOption?.label || 'A';
};

// 이벤트 핸들러
const handleSelect = () => {
  if (!props.isSelected) {
    emit('select');
  }
};

const handleClose = () => {
  emit('close');
};

const handleSyncColorSelect = (color: string) => {
  emit('sync', color);
};

const handleExternalLink = () => {
  emit('external-link');
};

const handlePrevious = () => {
  emit('previous');
};

const handleNext = () => {
  emit('next');
};

// TradingViewChart 컴포넌트 ref
const tradingViewChartRef = ref();

// 외부에서 ChartManager에 접근할 수 있도록 노출
defineExpose({
  getChartManager: () => {
    return tradingViewChartRef.value?.chartManager || null;
  },
});
</script>
