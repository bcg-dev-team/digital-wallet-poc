<template>
  <span :class="countdownClasses"> 남은 시간: {{ formatTime(remainingTime) }} </span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, readonly } from 'vue';

/**
 * Countdown 컴포넌트 - 카운트다운 타이머
 *
 * @props duration - 카운트다운 시간 (초 단위)
 * @props format - 시간 형식 ('mm:ss' | 'hh:mm:ss')
 * @props size - 텍스트 크기
 * @props color - 텍스트 색상
 * @emits finished - 카운트다운 완료 시 발생
 * @emits tick - 매 초마다 발생 (남은 시간 전달)
 */
interface Props {
  /**
   * 카운트다운 시간 (초 단위)
   * @default 600 (10분)
   */
  duration?: number;
  /**
   * 시간 형식
   * @default 'mm:ss'
   */
  format?: 'mm:ss' | 'hh:mm:ss';
  /**
   * 텍스트 크기
   * @default 'text-font-12'
   */
  size?: string;
  /**
   * 텍스트 색상
   * @default 'text-red'
   */
  color?: string;
  /**
   * 자동 시작 여부
   * @default true
   */
  autoStart?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 600, // 10분
  format: 'mm:ss',
  size: 'text-font-12',
  color: 'text-red',
  autoStart: true,
});

const emit = defineEmits<{
  (e: 'finished'): void;
  (e: 'tick', remainingTime: number): void;
}>();

// 상태 관리
const remainingTime = ref(props.duration);
const isRunning = ref(false);
let intervalId: NodeJS.Timeout | null = null;

// 컴포넌트 클래스 계산
const countdownClasses = computed(() => {
  return [props.size, props.color, 'tracking-3'].join(' ');
});

// 시간 포맷팅
const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (props.format === 'hh:mm:ss') {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    const totalMinutes = Math.floor(seconds / 60);
    return `${totalMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
};

// 타이머 시작
const start = () => {
  if (isRunning.value || remainingTime.value <= 0) return;

  isRunning.value = true;
  intervalId = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
      emit('tick', remainingTime.value);

      // 완료 체크
      if (remainingTime.value === 0) {
        stop();
        emit('finished');
      }
    }
  }, 1000);
};

// 타이머 정지
const stop = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  isRunning.value = false;
};

// 타이머 리셋
const reset = (newDuration?: number) => {
  stop();
  remainingTime.value = newDuration ?? props.duration;
};

// 외부에서 사용할 수 있도록 메서드 expose
defineExpose({
  start,
  stop,
  reset,
  remainingTime,
  isRunning,
});

// 생명주기
onMounted(() => {
  if (props.autoStart) {
    start();
  }
});

onUnmounted(() => {
  stop();
});
</script>
