import { ref, onUnmounted, Ref } from 'vue';

/**
 * 디바운스 관리를 위한 composable
 *
 * @param delay - 디바운스 지연 시간 (ms)
 * @returns 디바운스된 값과 관련 메서드들
 */
export function useDebounce<T>(delay: number = 300): {
  debouncedValue: Ref<T | undefined>;
  isDebouncing: Ref<boolean>;
  debounce: (value: T, callback?: (value: T) => void) => void;
  cancel: () => void;
  flush: (value: T, callback?: (value: T) => void) => void;
} {
  const debouncedValue = ref<T | undefined>(undefined);
  const isDebouncing = ref(false);
  let timeoutId: NodeJS.Timeout | null = null;

  /**
   * 디바운스 실행
   * @param value - 디바운스할 값
   * @param callback - 디바운스 완료 후 실행할 콜백
   */
  const debounce = (value: T, callback?: (value: T) => void) => {
    isDebouncing.value = true;

    // 기존 타이머 클리어
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 새로운 타이머 설정
    timeoutId = setTimeout(() => {
      debouncedValue.value = value;
      isDebouncing.value = false;

      if (callback) {
        callback(value);
      }
    }, delay);
  };

  /**
   * 디바운스 취소
   */
  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    isDebouncing.value = false;
  };

  /**
   * 즉시 실행 (디바운스 없이)
   * @param value - 즉시 실행할 값
   * @param callback - 실행할 콜백
   */
  const flush = (value: T, callback?: (value: T) => void) => {
    cancel();
    debouncedValue.value = value;

    if (callback) {
      callback(value);
    }
  };

  // 컴포넌트 언마운트 시 타이머 정리
  onUnmounted(() => {
    cancel();
  });

  return {
    debouncedValue: debouncedValue as Ref<T | undefined>,
    isDebouncing,
    debounce,
    cancel,
    flush,
  };
}
