<!--
  Figma 컴포넌트: Bar-Password (node-id=2063-16180)
  비밀번호 강도 표시를 위한 연속적 진행바 컴포넌트
  + 다중 세그먼트 진행바 기능 추가
-->
<template>
  <div class="base-progress-bar" :class="[`base-progress-bar--${variant}`]">
    <!-- 일반 진행바 (단일 값) -->
    <div v-if="variant !== 'stacked'" class="base-progress-bar__track" :class="trackColorClass">
      <div
        class="base-progress-bar__fill"
        :class="progressColorClass"
        :style="{
          width: `${progressPercentage}%`,
          borderRadius: props.variant === 'performance' ? '999px 0 0 999px' : '999px',
        }"
      />
    </div>

    <!-- 스택형 진행바 (다중 세그먼트) -->
    <div
      v-else
      class="base-progress-bar__track base-progress-bar__track--stacked"
      :class="trackColorClass"
    >
      <div
        v-for="(segment, index) in normalizedSegments"
        :key="index"
        class="base-progress-bar__segment"
        :class="segment.colorClass"
        :style="{
          width: `${segment.percentage}%`,
          borderRadius: getSegmentBorderRadius(index, normalizedSegments.length),
        }"
      >
        <span v-if="segment.showLabel" class="base-progress-bar__segment-label">
          {{ segment.label || `${segment.percentage.toFixed(1)}%` }}
        </span>
      </div>
    </div>

    <!-- 라벨 (선택사항) -->
    <div
      v-if="showLabel && variant !== 'stacked'"
      class="base-progress-bar__label"
      :class="[`base-progress-bar__label--${variant}`, labelColorClass]"
    >
      {{ label }}
    </div>

    <!-- 스택형 범례 (선택사항) -->
    <div v-if="variant === 'stacked' && showLegend" class="base-progress-bar__legend">
      <div
        v-for="(segment, index) in normalizedSegments"
        :key="index"
        class="base-progress-bar__legend-item"
      >
        <span class="base-progress-bar__legend-color" :class="segment.colorClass" />
        <span class="base-progress-bar__legend-label">
          {{ segment.label || `항목 ${index + 1}` }}
        </span>
        <span class="base-progress-bar__legend-value">
          {{ segment.value }} ({{ segment.percentage.toFixed(1) }}%)
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * 스택형 진행바의 세그먼트 정의
 */
export interface ProgressSegment {
  /** 세그먼트 값 */
  value: number;
  /** 세그먼트 라벨 */
  label?: string;
  /** 세그먼트 색상 클래스 */
  colorClass?: string;
  /** 세그먼트 내부에 라벨 표시 여부 */
  showLabel?: boolean;
}

interface Props {
  /** 진행률 (0-100) */
  value?: number;
  /** 최대값 */
  max?: number;
  /** 진행바 변형 */
  variant?: 'default' | 'password-strength' | 'performance' | 'stacked';
  /** 라벨 표시 여부 */
  showLabel?: boolean;
  /** 커스텀 라벨 */
  label?: string;
  /** 비밀번호 강도 점수 (0-4) */
  strengthScore?: 0 | 1 | 2 | 3 | 4;
  /** 트랙 색상 클래스 */
  trackColorClass?: string;
  /** 채우기 색상 클래스 (기본 variant용) */
  fillColorClass?: string;
  /** 스택형 진행바 세그먼트 배열 */
  segments?: ProgressSegment[];
  /** 스택형 진행바 범례 표시 여부 */
  showLegend?: boolean;
  /** 세그먼트 간 간격 표시 여부 */
  showGap?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  variant: 'default',
  showLabel: false,
  trackColorClass: 'bg-bg-bg-surface',
  fillColorClass: 'bg-blue-blue800-deep',
  segments: () => [],
  showLegend: false,
  showGap: false,
});

// 진행률 계산
const progressPercentage = computed(() => {
  if (props.variant === 'password-strength') {
    // 비밀번호 강도: 0-4 → 20%-100%
    const score = props.strengthScore || 0;
    return (score + 1) * 20; // 20%, 40%, 60%, 80%, 100%
  }

  // 일반 진행바: value/max 기반
  return Math.min(Math.max((props.value / props.max) * 100, 0), 100);
});

// 진행바 색상 클래스 계산
const progressColorClass = computed(() => {
  if (props.variant === 'password-strength') {
    const score = props.strengthScore || 0;
    const colorClasses = [
      'bg-red-red800', // 0: 매우 약함
      'bg-[#FF9500]', // 1: 약함
      'bg-primary-primary800', // 2: 보통
      'bg-[#7ED428]', // 3: 강함
      'bg-green-green800', // 4: 매우 강함
    ];
    return colorClasses[score];
  }

  return props.fillColorClass;
});

// 라벨 색상 클래스 계산
const labelColorClass = computed(() => {
  if (props.variant === 'password-strength') {
    const score = props.strengthScore || 0;
    const colorClasses = [
      'text-red', // 0: 매우 약함
      'text-[#FF9500]', // 1: 약함
      'text-primary', // 2: 보통
      'text-[#7ED428]', // 3: 강함
      'text-green', // 4: 매우 강함
    ];
    return colorClasses[score];
  }

  return 'text-default';
});

// 라벨 텍스트 계산
const label = computed(() => {
  if (props.label) return props.label;

  if (props.variant === 'password-strength') {
    const labels = ['매우 약함', '약함', '보통', '강함', '매우 강함'];
    return labels[props.strengthScore || 0] || labels[0];
  } else if (props.variant === 'performance') {
    return;
  }

  return `${Math.round(progressPercentage.value)}%`;
});

// 기본 색상 팔레트
const DEFAULT_COLOR_CLASSES = [
  'bg-blue-blue800-deep',
  'bg-primary-primary800',
  'bg-green-green800',
  'bg-[#FF9500]',
  'bg-red-red800',
  'bg-[#7ED428]',
  'bg-purple-purple800',
  'bg-yellow-yellow800',
];

/**
 * 스택형 진행바의 정규화된 세그먼트 계산
 * - 비율 계산
 * - 기본 색상 적용
 */
const normalizedSegments = computed(() => {
  if (props.variant !== 'stacked' || !props.segments || props.segments.length === 0) {
    return [];
  }

  // 전체 합계 계산
  const total = props.segments.reduce((sum, segment) => sum + segment.value, 0);

  if (total === 0) return [];

  // 각 세그먼트의 비율과 색상 계산
  return props.segments.map((segment, index) => ({
    ...segment,
    percentage: (segment.value / total) * 100,
    colorClass: segment.colorClass || DEFAULT_COLOR_CLASSES[index % DEFAULT_COLOR_CLASSES.length],
  }));
});

/**
 * 세그먼트의 border-radius 계산
 * @param index 세그먼트 인덱스
 * @param totalSegments 전체 세그먼트 수
 */
const getSegmentBorderRadius = (index: number, totalSegments: number): string => {
  if (totalSegments === 1) {
    return '6px'; // 단일 세그먼트는 완전한 둥근 모서리
  }

  if (index === 0) {
    return '6px 0 0 6px'; // 첫 번째: 왼쪽만 둥글게
  }

  if (index === totalSegments - 1) {
    return '0 6px 6px 0'; // 마지막: 오른쪽만 둥글게
  }

  return '0'; // 중간 세그먼트: 둥글지 않게
};
</script>

<style scoped lang="scss" src="./BaseProgressBar.scss"></style>
