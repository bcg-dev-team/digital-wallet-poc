<!--
  @fileoverview 차트 상단 툴바 컴포넌트
  @component ChartTopToolbar
  @figma 차트 상단 툴바
-->
<template>
  <div class="chart-top-toolbar">
    <div class="toolbar-container">
      <!-- 왼쪽 설정 그룹 -->
      <div class="toolbar-group">
        <!-- 차트 관리 -->
        <button class="add-symbol-button" @click="handleChartManage">
          <BaseIcon name="add-symbol" size="md" />
        </button>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 시간대 선택 -->
        <div class="timeframe-group">
          <button
            v-for="timeframe in CHART_TIMEFRAMES"
            :key="timeframe.value"
            class="timeframe-button"
            :class="{ active: selectedTimeframe === timeframe.value }"
            @click="handleTimeframeChange(timeframe.value)"
          >
            {{ timeframe.label }}
          </button>
        </div>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 지표 설정 -->
        <div class="indicator-group">
          <span class="indicator-label">지표</span>
          <button class="indicator-button" @click="handleIndicatorClick">
            <BaseIcon name="chart-indicator" size="md" />
          </button>
        </div>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 화면 템플릿 -->
        <div class="layout-group">
          <div class="layout-buttons">
            <button
              v-for="layout in CHART_LAYOUT_OPTIONS"
              :key="layout.value"
              class="layout-button"
              :class="{ active: selectedLayout === layout.value }"
              @click="handleLayoutSelect(layout.value)"
            >
              <BaseIcon :name="layout.icon" size="sm" />
            </button>
          </div>
        </div>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 워크스페이스 -->
        <div class="workspace-group">
          <span class="workspace-label">워크스페이스 3</span>
          <button class="workspace-button active" @click="handleWorkspaceClick">
            <BaseIcon name="save" size="sm" />
          </button>
        </div>

        <!-- 구분선 -->
        <div class="divider" />

        <!-- 차트 도구 -->
        <div class="chart-tools">
          <button class="tool-button" @click="handleChartEye">
            <BaseIcon name="eye" size="sm" />
          </button>
          <button class="tool-button" @click="handleChartSnapshot">
            <BaseIcon name="chart-snapshot" size="sm" />
          </button>
          <button class="tool-button" @click="handleChartSetup" title="차트 설정">
            <BaseIcon name="settings" size="sm" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChartLayout, ChartToolbarProps, ChartToolbarEmits } from '@template/types';
import { CHART_TIMEFRAMES, CHART_DEFAULTS } from '@template/types';
import { CHART_LAYOUT_OPTIONS } from '@/types/chart-layout';
import { BaseIcon } from '@template/ui';
import './ChartTopToolbar.scss';
import { computed } from 'vue';

// Props 정의
const props = defineProps<ChartToolbarProps>();

// Emits 정의
const emit = defineEmits<ChartToolbarEmits>();

// 선택된 시간대
const selectedTimeframe = computed(
  () => props.selectedChartData?.timeframe || CHART_DEFAULTS.TIMEFRAME
);

// 선택된 레이아웃
const selectedLayout = computed(() => props.currentLayout || CHART_DEFAULTS.LAYOUT);

// 이벤트 핸들러
const handleChartManage = () => {
  emit('chart-manage');
};

const handleTimeframeChange = (timeframe: string) => {
  console.log('[ChartTopToolbar] handleTimeframeChange called:', timeframe);
  console.log('[ChartTopToolbar] Current selectedTimeframe:', selectedTimeframe.value);
  console.log('[ChartTopToolbar] Emitting timeframe-change event');
  emit('timeframe-change', timeframe);
  console.log('[ChartTopToolbar] Event emitted successfully');
};

const handleIndicatorClick = () => {
  emit('indicator-change', 'indicator-dialog-open');
};

const handleLayoutSelect = (layout: ChartLayout) => {
  emit('layout-change', layout);
};

const handleWorkspaceClick = () => {
  emit('workspace-save');
};

const handleChartEye = () => {
  emit('chart-eye');
};

const handleChartSnapshot = () => {
  console.log('차트 스냅샷 클릭');
};

const handleChartSetup = () => {
  emit('chart-settings');
};
</script>
