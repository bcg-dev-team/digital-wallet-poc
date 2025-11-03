<!--
  @fileoverview 차트 드로잉 툴바 컴포넌트
  @component ChartDrawingToolbar
  @figma 차트 드로잉 툴바
  TODO: 툴바 구현을 위한 공식 API가 제공되지 않아 기획 검토 필요
-->
<template>
  <div class="chart-drawing-toolbar">
    <!-- 차트 추가 버튼 -->
    <!-- <div class="toolbar-section">
      <button class="toolbar-button active" @click="handleAddChart" title="차트 추가">
        <BaseIcon name="cert" size="lg" />
      </button>
    </div> -->

    <!-- 구분선 -->
    <div class="toolbar-divider" />

    <!-- 차트 도구들 -->
    <div class="toolbar-section">
      <!-- <button class="toolbar-button" @click="handleChartEye" title="차트 보기 설정">
        <BaseIcon name="eye" size="lg" />
      </button> -->

      <button class="toolbar-button" @click="handleChartSetup" title="차트 설정">
        <BaseIcon name="settings" size="lg" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChartDrawingToolbarEmits } from '@template/types';
import { BaseIcon } from '@template/ui';
import './ChartDrawingToolbar.scss';

// Emits 정의
const emit = defineEmits<ChartDrawingToolbarEmits>();

// 이벤트 핸들러
const handleAddChart = () => {
  emit('add-chart');
};

const handleChartEye = () => {
  emit('chart-eye');
};

const handleChartSetup = () => {
  emit('chart-setup');
};
</script>
