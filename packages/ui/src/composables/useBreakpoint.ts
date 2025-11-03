import { ref, computed, onMounted, onUnmounted, readonly } from 'vue';

/**
 * 브레이크포인트 타입 정의
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * 브레이크포인트별 최소 너비 (px)
 */
const BREAKPOINTS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * 반응형 브레이크포인트 관리를 위한 composable
 *
 * @returns 현재 브레이크포인트와 관련 유틸리티
 */
export function useBreakpoint() {
  const width = ref(0);
  const height = ref(0);

  /**
   * 현재 브레이크포인트 계산
   */
  const currentBreakpoint = computed((): Breakpoint => {
    if (width.value >= BREAKPOINTS['2xl']) return '2xl';
    if (width.value >= BREAKPOINTS.xl) return 'xl';
    if (width.value >= BREAKPOINTS.lg) return 'lg';
    if (width.value >= BREAKPOINTS.md) return 'md';
    if (width.value >= BREAKPOINTS.sm) return 'sm';
    return 'xs';
  });

  /**
   * 특정 브레이크포인트 이상인지 확인
   * @param breakpoint - 확인할 브레이크포인트
   * @returns 해당 브레이크포인트 이상이면 true
   */
  const isAbove = (breakpoint: Breakpoint): boolean => {
    return width.value >= BREAKPOINTS[breakpoint];
  };

  /**
   * 특정 브레이크포인트 이하인지 확인
   * @param breakpoint - 확인할 브레이크포인트
   * @returns 해당 브레이크포인트 이하면 true
   */
  const isBelow = (breakpoint: Breakpoint): boolean => {
    return width.value < BREAKPOINTS[breakpoint];
  };

  /**
   * 특정 브레이크포인트 범위인지 확인
   * @param min - 최소 브레이크포인트
   * @param max - 최대 브레이크포인트
   * @returns 해당 범위에 있으면 true
   */
  const isBetween = (min: Breakpoint, max: Breakpoint): boolean => {
    return width.value >= BREAKPOINTS[min] && width.value < BREAKPOINTS[max];
  };

  /**
   * 화면 크기 업데이트
   */
  const updateSize = () => {
    if (typeof window === 'undefined') return;

    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  /**
   * 리사이즈 이벤트 핸들러
   */
  const handleResize = () => {
    updateSize();
  };

  onMounted(() => {
    updateSize();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  return {
    width: readonly(width),
    height: readonly(height),
    currentBreakpoint: readonly(currentBreakpoint),
    isAbove,
    isBelow,
    isBetween,
    BREAKPOINTS,
  };
}
