/**
 * 전역 WebSocket 연결 관리 Composable
 * 애플리케이션 전체에서 하나의 WebSocket 연결만 유지
 * 각 화면에서는 채널 구독/해제만 관리
 */

import { getWebSocketService } from '@/services/websocket';
import { ref, readonly, onUnmounted } from 'vue';
import { useSymbolData } from './useSymbolData';

// 전역 상태
const isGlobalWebSocketInitialized = ref(false);
const globalWebSocketService = getWebSocketService();

export function useGlobalWebSocket() {
  /**
   * 전역 WebSocket 연결 초기화 (한 번만 실행)
   */
  const initializeGlobalWebSocket = async () => {
    if (isGlobalWebSocketInitialized.value) {
      return;
    }

    try {
      // Mock 데이터 로드
      const { loadAllSymbols } = useSymbolData();
      await loadAllSymbols();

      // WebSocket 연결
      await globalWebSocketService.connect();

      isGlobalWebSocketInitialized.value = true;
    } catch (error) {
      console.error('[useGlobalWebSocket] 전역 WebSocket 연결 실패:', error);
      throw error;
    }
  };

  /**
   * WebSocket 연결 상태 확인
   */
  const isConnected = () => {
    return globalWebSocketService.isConnected();
  };

  /**
   * 전역 WebSocket 연결 해제 (앱 종료 시에만)
   */
  const disconnectGlobalWebSocket = async () => {
    if (!isGlobalWebSocketInitialized.value) {
      return;
    }

    try {
      console.log('[useGlobalWebSocket] 전역 WebSocket 연결 해제 시작');
      await globalWebSocketService.disconnect();
      isGlobalWebSocketInitialized.value = false;
      console.log('[useGlobalWebSocket] 전역 WebSocket 연결 해제 완료');
    } catch (error) {
      console.error('[useGlobalWebSocket] 전역 WebSocket 연결 해제 실패:', error);
    }
  };

  return {
    // 상태
    isGlobalWebSocketInitialized: readonly(isGlobalWebSocketInitialized),

    // 함수들
    initializeGlobalWebSocket,
    isConnected,
    disconnectGlobalWebSocket,
    getWebSocketService: () => globalWebSocketService,
  };
}
