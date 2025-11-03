/**
 * Simple WebSocket 모킹 서비스
 * 간단한 테스트를 위한 모킹 데이터 제공
 * 기존 RealWebSocketService와 동일한 인터페이스를 제공하여 투명하게 교체 가능
 */

import type {
  IWebSocketService,
  WebSocketCallback,
  ConnectionState,
  WebSocketChannel,
  WebSocketChannelType,
  WebSocketChannelInfo,
  WebSocketSubscriptionMessage,
  WebSocketMarketQuoteData,
  WebSocketMarketOrderBookData,
  WebSocketPrivateAccountData,
  WebSocketMarketOrderBookChannel,
  WebSocketPrivateAccountChannel,
} from '@template/types';
import { globalEventBus, MARKET_EVENTS, WEBSOCKET_EVENTS } from '@/composables/useEventBus';
import { useMarketDataStore } from '@/stores/useMarketDataStore';

/**
 * Simple WebSocket 모킹 서비스 클래스
 * 실제 WebSocket 연결 없이 시뮬레이션된 데이터를 제공
 */
export class SimpleMockWebSocketService implements IWebSocketService {
  private connectionState: ConnectionState = 'disconnected';
  private subscriptions: Map<string, WebSocketCallback> = new Map();
  private subscribedChannels: Set<WebSocketChannel> = new Set();
  private mockDataIntervals: Map<string, NodeJS.Timeout> = new Map();
  private isConnectedFlag = false;

  // 모킹용 기본 데이터 - EURUSD만 사용
  private readonly mockSymbols = ['EURUSD'];
  private readonly basePrice = 1.1; // EURUSD 기본 가격

  /**
   * WebSocket 연결 상태 확인
   */
  isConnected(): boolean {
    return this.isConnectedFlag;
  }

  /**
   * WebSocket 연결 상태 조회
   */
  getConnectionState(): ConnectionState {
    return this.connectionState;
  }

  /**
   * WebSocket용 액세스 토큰 설정 - 로그인 성공 후 호출
   * Mock에서는 실제 사용하지 않음
   */
  setAccessToken(token: string): void {}

  /**
   * WebSocket용 액세스 토큰 제거 - 로그아웃 시 호출
   * Mock에서는 실제 사용하지 않음
   */
  clearAccessToken(): void {}

  /**
   * WebSocket 연결 (모킹)
   */
  async connect(): Promise<void> {
    if (this.isConnected()) {
      // console.log('[SimpleMockWebSocketService] 이미 연결됨');
      return;
    }

    this.connectionState = 'connecting';
    // console.log('[SimpleMockWebSocketService] 심플 모킹 WebSocket 연결 시작');

    // 연결 시뮬레이션 (짧은 지연)
    await new Promise((resolve) => setTimeout(resolve, 100));

    this.connectionState = 'connected';
    this.isConnectedFlag = true;
    // console.log('[SimpleMockWebSocketService] 심플 모킹 WebSocket 연결 완료');
  }

  /**
   * WebSocket 연결 해제
   */
  async disconnect(): Promise<void> {
    this.connectionState = 'disconnected';
    this.isConnectedFlag = false;

    // 모든 모킹 인터벌 정리
    this.mockDataIntervals.forEach((interval) => {
      clearInterval(interval);
    });
    this.mockDataIntervals.clear();

    this.subscriptions.clear();
    this.subscribedChannels.clear();
    // console.log('[SimpleMockWebSocketService] 심플 모킹 WebSocket 연결 해제 완료');
  }

  /**
   * 채널 구독
   */
  subscribe(channel: WebSocketChannel, callback: WebSocketCallback): string {
    const subscriptionId = `${channel}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // console.log(
    //   `[SimpleMockWebSocketService] 심플 모킹 구독 시작: ${channel} ID: ${subscriptionId}`
    // );

    this.subscriptions.set(subscriptionId, callback);

    // 모킹 데이터 전송 시작
    if (this.isConnected()) {
      this.subscribeToChannels([channel]);
    }

    return subscriptionId;
  }

  /**
   * 채널 구독 (내부)
   */
  subscribeToChannels(channels: WebSocketChannel[]): void {
    if (!this.isConnected()) {
      console.warn('[SimpleMockWebSocketService] WebSocket 연결 없음 - 채널 구독 실패');
      return;
    }
    if (channels.length === 0) {
      return;
    }

    // console.log('[SimpleMockWebSocketService] 채널 구독 요청:', newChannels);

    // 구독된 채널 목록에 추가
    channels.forEach((channel) => {
      this.subscribedChannels.add(channel);
      this.startMockDataForChannel(channel);
    });
  }

  /**
   * 채널별 모킹 데이터 전송 시작
   */
  private startMockDataForChannel(channel: WebSocketChannel): void {
    if (channel === 'market.quote') {
      this.startMarketQuoteMock();
    } else if (channel.startsWith('market.orderbook.')) {
      const symbol = channel.replace('market.orderbook.', '');
      this.startOrderBookMock(symbol);
    } else if (channel.startsWith('private.')) {
      // const accountNo = channel.replace('private.', '');
      // this.startPrivateDataMock(accountNo);
    }
  }

  /**
   * 시세 데이터 모킹 - EURUSD만 0.2초마다 변화
   */
  private startMarketQuoteMock(): void {
    const intervalId = setInterval(() => {
      const symbol = 'EURUSD';

      // 가격 변동 시뮬레이션 (±0.1% 범위)
      const variation = (Math.random() - 0.5) * 0.002; // ±0.1%
      const newPrice = this.basePrice * (1 + variation);
      const bid = Math.round(newPrice * 0.9999 * 100000) / 100000; // 소수점 5자리
      const ask = Math.round(newPrice * 1.0001 * 100000) / 100000; // 소수점 5자리

      const mockData = {
        messageType: 'MARKET_QUOTE',
        stockCd: symbol,
        bid: bid,
        ask: ask,
        timestamp: Date.now(),
      };

      this.handleMarketQuote(mockData);
    }, 500); // 0.5초 간격

    this.mockDataIntervals.set('market.quote', intervalId);
  }

  /**
   * 호가창 데이터 모킹 - EURUSD만
   */
  private startOrderBookMock(symbol: string): void {
    // EURUSD가 아니면 모킹하지 않음
    if (symbol !== 'EURUSD') {
      return;
    }

    // 이전 호가 데이터 저장 (수량 변화량 제한용)
    let previousQuotes: Array<{ bidSize: number; askSize: number }> = [];

    const intervalId = setInterval(() => {
      const quotes = [];

      // 시세 변동률 (±0.02% 범위)
      const marketVariation = (Math.random() - 0.5) * 0.0004; // ±0.02%
      const currentMarketPrice = this.basePrice * (1 + marketVariation);

      // 호가 데이터 생성 (5단계)
      for (let i = 0; i < 5; i++) {
        // 1호가 스프레드 (일반적으로 1-3 pips)
        const spread = 0.0001 + Math.random() * 0.0002; // 1-3 pips

        // 호가별 스프레드 확장 (호가가 멀수록 스프레드 증가)
        const levelSpread = spread * (1 + i * 0.5);

        // 1호가 기준 가격 계산
        const bidPrice = Math.round((currentMarketPrice - levelSpread / 2) * 100000) / 100000;
        const askPrice = Math.round((currentMarketPrice + levelSpread / 2) * 100000) / 100000;

        // 수량 계산 (1호가가 가장 많고, 호가가 멀수록 감소)
        const baseSize = 1000;
        const sizeDecay = Math.pow(0.7, i); // 각 호가마다 30% 감소
        const sizeVariation = 0.8 + Math.random() * 0.4; // ±20% 변동

        // 이전 수량과 비교하여 급변 방지 (±30% 이내)
        let bidSize = Math.floor(baseSize * sizeDecay * sizeVariation);
        let askSize = Math.floor(baseSize * sizeDecay * sizeVariation);

        if (previousQuotes[i]) {
          const maxChange = previousQuotes[i].bidSize * 0.3; // 최대 30% 변화
          const bidChange = bidSize - previousQuotes[i].bidSize;
          if (Math.abs(bidChange) > maxChange) {
            bidSize = previousQuotes[i].bidSize + (bidChange > 0 ? maxChange : -maxChange);
          }

          const askChange = askSize - previousQuotes[i].askSize;
          if (Math.abs(askChange) > maxChange) {
            askSize = previousQuotes[i].askSize + (askChange > 0 ? maxChange : -maxChange);
          }
        }

        quotes.push({
          bid: bidPrice,
          ask: askPrice,
          bidSize: Math.max(50, Math.floor(bidSize)), // 최소 50
          askSize: Math.max(50, Math.floor(askSize)), // 최소 50
        });
      }

      // 다음 업데이트를 위해 현재 수량 저장
      previousQuotes = quotes.map((q) => ({ bidSize: q.bidSize, askSize: q.askSize }));

      const mockData = {
        messageType: 'MARKET_ORDER_BOOK',
        stockCd: symbol,
        quotes: quotes,
        timestamp: Date.now(),
      };

      this.handleMarketOrderBook(mockData);
    }, 500); // 0.5초 간격

    this.mockDataIntervals.set(`market.orderbook.${symbol}`, intervalId);
  }

  /**
   * 개인 계좌 데이터 모킹
   */
  // private startPrivateDataMock(accountNo: string): void {
  //   const intervalId = setInterval(() => {
  //     const mockData = {
  //       accountNo: accountNo,
  //       balance: Math.random() * 100000,
  //       equity: Math.random() * 100000,
  //       margin: Math.random() * 10000,
  //       timestamp: Date.now(),
  //     };

  //     // 개인 계좌 데이터는 현재 특별한 처리가 없으므로 콘솔에만 출력
  //     console.log('[SimpleMockWebSocketService] 개인 계좌 데이터:', mockData);
  //   }, 5000); // 5초 간격

  //   this.mockDataIntervals.set(`private.${accountNo}`, intervalId);
  // }

  /**
   * 채널 구독 해제
   */
  unsubscribeFromChannels(channels: WebSocketChannel[]): void {
    if (!this.isConnected()) {
      console.warn('[SimpleMockWebSocketService] WebSocket 연결 없음 - 채널 구독 해제 실패');
      return;
    }

    const channelsToUnsubscribe = channels.filter((channel) =>
      this.subscribedChannels.has(channel)
    );
    if (channelsToUnsubscribe.length === 0) {
      return;
    }

    // console.log('[SimpleMockWebSocketService] 채널 구독 해제 요청:', channelsToUnsubscribe);

    // 구독된 채널 목록에서 제거 및 모킹 중지
    channelsToUnsubscribe.forEach((channel) => {
      this.subscribedChannels.delete(channel);
      this.stopMockDataForChannel(channel);
    });
  }

  /**
   * 채널별 모킹 데이터 전송 중지
   */
  private stopMockDataForChannel(channel: WebSocketChannel): void {
    const intervalId = this.mockDataIntervals.get(channel);
    if (intervalId) {
      clearInterval(intervalId);
      this.mockDataIntervals.delete(channel);
      // console.log(`[SimpleMockWebSocketService] ${channel} 모킹 데이터 전송 중지`);
    }
  }

  /**
   * 구독 해제
   */
  unsubscribe(channelOrId: string): void {
    // ID로 구독 해제 시도
    const callback = this.subscriptions.get(channelOrId);
    if (callback) {
      this.subscriptions.delete(channelOrId);
      return;
    }

    // 채널명으로 구독 해제 시도
    const keysToDelete: string[] = [];
    this.subscriptions.forEach((cb, key) => {
      if (key.startsWith(channelOrId + '_')) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => {
      this.subscriptions.delete(key);
    });

    // 모킹 데이터 전송 중지
    if (this.isConnected() && keysToDelete.length > 0) {
      this.unsubscribeFromChannels([channelOrId as WebSocketChannel]);
    }
  }

  /**
   * 개별 채널 구독 해제 (내부 메서드)
   */
  private unsubscribeChannelInternal(channel: WebSocketChannel): void {
    if (!this.isConnected()) {
      console.warn('[SimpleMockWebSocketService] WebSocket 연결 없음 - 채널 구독 해제 실패');
      return;
    }

    if (!this.subscribedChannels.has(channel)) {
      return;
    }

    // console.log(`[SimpleMockWebSocketService] 개별 채널 구독 해제: ${channel}`);

    // 구독된 채널 목록에서 제거
    this.subscribedChannels.delete(channel);
    this.stopMockDataForChannel(channel);

    // 해당 채널의 콜백들도 제거
    const keysToDelete: string[] = [];
    this.subscriptions.forEach((cb, key) => {
      if (key.startsWith(channel + '_')) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach((key) => this.subscriptions.delete(key));
  }

  /**
   * 심볼 기반 구독 해제
   */
  unsubscribeBySymbol(symbol: string, callback?: WebSocketCallback): void {
    const keysToDelete: string[] = [];

    this.subscriptions.forEach((cb, key) => {
      if (key.startsWith(symbol + '_') && (!callback || cb === callback)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach((key) => {
      this.subscriptions.delete(key);
    });

    // 모킹 데이터 전송 중지
    if (this.isConnected() && keysToDelete.length > 0) {
      this.unsubscribeFromChannels([`market.orderbook.${symbol}` as WebSocketChannel]);
    }
  }

  /**
   * 채널 기반 구독 해제 (string 타입)
   */
  unsubscribeChannel(channel: string): void {
    this.unsubscribeChannelInternal(channel as WebSocketChannel);
  }

  /**
   * 모든 구독 해제
   */
  unsubscribeAll(): void {
    if (!this.isConnected()) {
      console.warn('[SimpleMockWebSocketService] WebSocket 연결 없음 - 전체 구독 해제 실패');
      return;
    }

    const channels = Array.from(this.subscribedChannels);
    if (channels.length === 0) {
      return;
    }

    // console.log('[SimpleMockWebSocketService] 전체 채널 구독 해제:', channels);

    // 모든 모킹 인터벌 정리
    this.mockDataIntervals.forEach((interval) => {
      clearInterval(interval);
    });
    this.mockDataIntervals.clear();

    // 모든 구독 해제
    this.subscriptions.clear();
    this.subscribedChannels.clear();
  }

  /**
   * 재연결 시도
   */
  async reconnect(): Promise<void> {
    // console.log('[SimpleMockWebSocketService] 심플 모킹 WebSocket 재연결 시도');
    await this.disconnect();
    await this.connect();
  }

  /**
   * 정리 (리소스 해제)
   */
  cleanup(): void {
    this.disconnect();
  }

  /**
   * MARKET_QUOTE 메시지 처리 (RealWebSocketService와 동일)
   */
  private handleMarketQuote(data: any): void {
    const { stockCd, bid, ask, timestamp } = data;

    // bid와 ask의 중간값을 현재가로 사용
    const currentPrice = (bid + ask) / 2;

    try {
      // 고가/저가 계산 (bid/ask 기반으로 임시 계산)
      const high = Math.max(bid, ask) * 1.0001; // 약간의 여유분 추가
      const low = Math.min(bid, ask) * 0.9999; // 약간의 여유분 추가

      // Pinia Store를 통한 시장 데이터 업데이트 (배치 처리)
      const marketDataStore = useMarketDataStore();
      marketDataStore.updateMarketDataFromStream(stockCd, {
        close: currentPrice,
        price: currentPrice,
        bid: bid,
        ask: ask,
        high: high,
        low: low,
        timestamp: timestamp,
      });

      // Event Bus를 통한 이벤트 발생
      globalEventBus.emit(MARKET_EVENTS.DATA_UPDATED, {
        symbol: stockCd,
        price: currentPrice,
        bid: bid,
        ask: ask,
        high: high,
        low: low,
        timestamp: timestamp,
      });

      // console.log(`[SimpleMockWebSocketService] ${stockCd} 시세 업데이트 완료 (모킹)`);
    } catch (error) {
      console.error('[SimpleMockWebSocketService] MARKET_QUOTE 업데이트 오류:', error);
    }
  }

  /**
   * MARKET_ORDER_BOOK 메시지 처리 (RealWebSocketService와 동일)
   */
  private handleMarketOrderBook(data: any): void {
    const { stockCd, quotes, timestamp } = data;

    if (quotes && Array.isArray(quotes)) {
      // 호가 데이터를 OrderBookResponse 형태로 변환
      const orderBookData = quotes.map((quote: any) => ({
        bid: quote.bid.toString(),
        ask: quote.ask.toString(),
        bidSize: quote.bidSize.toString(),
        askSize: quote.askSize.toString(),
      }));

      // 호가창 데이터를 구독자들에게 전달
      const orderBookChannel = `orderbook_${stockCd}`;
      this.subscriptions.forEach((callback, subscriptionId) => {
        if (subscriptionId.includes(orderBookChannel) || subscriptionId.includes(stockCd)) {
          try {
            callback({
              orderBook: orderBookData,
              timestamp: timestamp,
              stockCd: stockCd,
            });
          } catch (error) {
            console.error('[SimpleMockWebSocketService] ORDER_BOOK 업데이트 오류:', error);
          }
        }
      });

      // 전역 이벤트로 호가 데이터 전달 (OrderBook 컴포넌트에서 사용)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('orderBookUpdate', {
            detail: {
              stockCd: stockCd,
              orderBook: orderBookData,
              timestamp: timestamp,
            },
          })
        );
      }

      // console.log(
      //   `[SimpleMockWebSocketService] ${stockCd} 호가 데이터 처리 완료 (모킹):`,
      //   orderBookData
      // );
    }
  }
}
