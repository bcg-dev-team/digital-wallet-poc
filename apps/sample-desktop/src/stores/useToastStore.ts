import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

interface ToastProps {
  id: string;
  message: string;
  duration?: number;
  show?: boolean;
}

/**
 * 토스트 메시지 관리 스토어
 * 여러 토스트 메시지를 동시에 표시하고 독립적으로 관리하기 위한 상태 관리
 */
export const useToastStore = defineStore('toast', () => {
  /**
   * 활성화된 토스트 메시지 목록 (내부 상태)
   */
  const activeToasts = reactive<ToastProps[]>([]);

  /**
   * 토스트 ID 카운터
   */
  let toastCounter = 0;

  /**
   * 현재 표시할 토스트 메시지 목록 (읽기 전용)
   */
  const toasts = computed(() => activeToasts);

  /**
   * 토스트 메시지를 목록에 추가
   * @param message - 표시할 메시지
   * @param duration - 표시 지속 시간 (기본값: 1200ms)
   */
  const addToast = (message: string, duration: number = 1200): void => {
    const id = `toast-${++toastCounter}`;

    activeToasts.push({
      id,
      message,
      duration,
      show: true,
    });
  };

  /**
   * 특정 토스트 메시지를 목록에서 제거
   * @param id - 제거할 토스트의 ID
   */
  const removeToast = (id: string): void => {
    const index = activeToasts.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      activeToasts.splice(index, 1);
    }
  };

  /**
   * 모든 토스트 메시지 초기화
   */
  const clearAllToasts = (): void => {
    activeToasts.splice(0, activeToasts.length);
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
  };
});
