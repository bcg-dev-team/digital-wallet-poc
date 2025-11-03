/**
 * WebSocket 구독 관리 Composable
 * 주문 페이지에서 필요한 3개 채널 구독을 관리합니다.
 * - market.quote: 시장 시세 데이터
 * - market.orderbook.{symbol}: 호가 데이터
 * - private.{accountNo}: 개인 계좌 데이터
 */

import LocalStorageService from '@/services/localStorage/local-storage.service';
import LocalStorageKey from '@/services/localStorage/local-storage-key';
import type { WebSocketChannel, TradingSymbol } from '@template/types';
import { useAccountStore } from '@/stores/useAccountStore';
import { getWebSocketService } from '@/services/websocket';
import { useGlobalWebSocket } from './useGlobalWebSocket';
import { ref } from 'vue';

// 전역 구독 상태 (모든 인스턴스에서 공유)
const globalSubscribedChannels = ref<Set<WebSocketChannel>>(new Set());

export function useWebSocketSubscription() {
  const webSocketService = getWebSocketService();
  const accountStore = useAccountStore();
  const { initializeGlobalWebSocket, isConnected } = useGlobalWebSocket();

  // 전역 구독 상태 사용
  const subscribedChannels = globalSubscribedChannels;

  /**
   * 자산 화면용 WebSocket 채널 구독 업데이트
   * market.quote 채널만 구독하며, 데이터 처리는 RealWebSocketService에서 자동으로 처리됩니다.
   */
  const updateAssetWebSocketSubscriptions = async () => {
    // WebSocket 연결 상태 확인 및 필요 시 연결
    await ensureWebSocketConnection();

    const newChannels: WebSocketChannel[] = ['market.quote'];

    // 새로운 채널 구독 (이미 구독 중인 채널은 제외)
    const channelsToSubscribe = newChannels.filter(
      (channel) => !subscribedChannels.value.has(channel)
    );

    if (channelsToSubscribe.length > 0) {
      try {
        // RealWebSocketService의 subscribeToChannels() 메서드 활용
        // 데이터 처리는 RealWebSocketService의 handleMarketQuote()에서 자동으로 처리:
        // - useMarketDataStore를 통한 배치 업데이트
        // - Event Bus를 통한 전역 이벤트 발생
        webSocketService.subscribeToChannels(channelsToSubscribe);
        channelsToSubscribe.forEach((channel) => subscribedChannels.value.add(channel));
      } catch (error) {
        console.error('[useWebSocketSubscription] 자산 화면 구독 실패:', error);
      }
    }
  };

  /**
   * 주문 화면용 WebSocket 채널 구독 업데이트
   * market 채널: 로그인/계좌 상태와 무관하게 구독
   * private 채널: 로그인 상태이면서 계좌가 선택된 경우에만 구독
   */
  const updateWebSocketSubscriptions = async (selectedSymbol: TradingSymbol | null) => {
    // WebSocket 연결 상태 확인 및 필요 시 연결
    await ensureWebSocketConnection();

    const currentAccount = accountStore.selectedAccountNo;
    const wsAccessToken = accountStore.wsAccessTokenComputed;
    const isLoggedIn = !!LocalStorageService.getItem(LocalStorageKey.ACCESS_TOKEN);

    // console.log('[useWebSocketSubscription] 구독 업데이트:', {
    //   selectedSymbol: selectedSymbol?.ticker,
    //   currentAccount,
    //   hasWsToken: !!wsAccessToken,
    //   isLoggedIn,
    // });

    const newChannels: WebSocketChannel[] = ['market.quote'];

    // 선택된 심볼이 있으면 orderbook 채널 추가
    if (selectedSymbol?.ticker) {
      newChannels.push(`market.orderbook.${selectedSymbol.ticker}` as WebSocketChannel);
    }

    // private 채널은 로그인 상태이면서 계좌가 선택되고 WS 토큰이 있는 경우에만 추가
    if (isLoggedIn && currentAccount && wsAccessToken) {
      newChannels.push(`private.${currentAccount}` as WebSocketChannel);
    }

    // 기존 구독 해제
    // 새로운 채널 목록에 없는 채널만 해제
    const channelsToUnsubscribe = Array.from(subscribedChannels.value).filter(
      (channel) => !newChannels.includes(channel)
    );
    if (channelsToUnsubscribe.length > 0) {
      try {
        webSocketService.unsubscribeFromChannels(channelsToUnsubscribe);
        channelsToUnsubscribe.forEach((channel) => subscribedChannels.value.delete(channel));
      } catch (error) {
        console.error('[useWebSocketSubscription] 구독 해제 실패:', error);
      }
    }

    // 새로운 채널 구독 (이미 구독 중인 채널은 제외)
    const channelsToSubscribe = newChannels.filter(
      (channel) => !subscribedChannels.value.has(channel)
    );

    if (channelsToSubscribe.length > 0) {
      try {
        // WebSocketService의 subscribeToChannels() 메서드 활용
        // - Private 채널 토큰 체크 로직 포함
        // - 중복 구독 방지 로직 포함
        // - 데이터 처리는 WebSocketService의 전역 이벤트로 처리
        webSocketService.subscribeToChannels(channelsToSubscribe);
        channelsToSubscribe.forEach((channel) => subscribedChannels.value.add(channel));
      } catch (error) {
        console.error('[useWebSocketSubscription] 구독 실패:', error);
      }
    }
  };

  /**
   * WebSocket 연결 초기화
   */
  const initializeWebSocketConnection = async () => {
    try {
      // 시장 데이터는 useSymbolData에서 이미 초기화됨

      // WebSocket 연결
      await webSocketService.connect();
      console.log('[useWebSocketSubscription] WebSocket 서비스 연결 완료');
    } catch (error) {
      console.error('[useWebSocketSubscription] WebSocket 연결 초기화 실패:', error);
      throw error;
    }
  };

  /**
   * 전역 WebSocket 연결 상태 확인 및 필요 시 연결
   */
  const ensureWebSocketConnection = async () => {
    try {
      if (!isConnected()) {
        await initializeGlobalWebSocket();
      }
    } catch (error) {
      console.error('[useWebSocketSubscription] 전역 WebSocket 연결 확인/설정 실패:', error);
      throw error;
    }
  };

  /**
   * 모든 구독 해제 (전역 연결은 유지)
   */
  const unsubscribeAll = async () => {
    try {
      // 모든 구독 해제 (전역 WebSocket 연결은 유지)
      webSocketService.unsubscribeAll();
      subscribedChannels.value.clear();
    } catch (error) {
      console.error('[useWebSocketSubscription] 구독 해제 실패:', error);
    }
  };

  return {
    // 상태
    subscribedChannels: subscribedChannels.value,

    // 함수들
    updateWebSocketSubscriptions,
    updateAssetWebSocketSubscriptions, // 자산 화면용
    ensureWebSocketConnection, // 연결 상태 확인 및 필요 시 연결
    initializeWebSocketConnection,
    unsubscribeAll,
  };
}
