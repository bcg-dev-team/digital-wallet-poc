/**
 * 심볼 구독 관리 Composable (단순화)
 * 모든 종목에 대해 실시간 데이터를 받아서 처리
 */

import { getWebSocketService } from '@/services/websocket';
import { ref, readonly } from 'vue';

export function useSymbolSubscriptionManager() {
  const wsService = getWebSocketService();

  // WebSocket 구독 (심볼별 구독 ID 저장)
  const activeWebSocketSubscriptions = ref<Map<string, string>>(new Map());

  /**
   * 모든 구독 해제
   */
  const unsubscribeAllSymbols = (): void => {
    console.log('🔄 모든 구독 해제 시작');

    // 🚀 모든 WebSocket 구독을 일괄 해제
    const subscriptionIds = Array.from(activeWebSocketSubscriptions.value.values());
    subscriptionIds.forEach((subscriptionId) => {
      wsService.unsubscribe(subscriptionId);
    });

    const count = activeWebSocketSubscriptions.value.size;
    activeWebSocketSubscriptions.value.clear();

    console.log(`✅ 모든 구독 해제 완료: ${count}개 종목`);
  };

  return {
    // 상태 (읽기 전용)
    activeWebSocketSubscriptions: readonly(activeWebSocketSubscriptions),

    // 함수들
    unsubscribeAllSymbols,
  };
}
