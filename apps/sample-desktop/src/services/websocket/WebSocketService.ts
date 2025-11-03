/**
 * WebSocket 서비스 구현체
 * WebSocket 서버와 연동하여 채널 구독 기능 제공
 */

import type {
  IWebSocketService,
  WebSocketCallback,
  ConnectionState,
  WebSocketChannel,
  WebSocketChannelType,
  WebSocketChannelInfo,
  WebSocketSubscriptionMessage,
  WebSocketMarketOrderBookChannel,
  WebSocketPrivateAccountChannel,
  IMarketQuote,
  IMarketQuoteList,
  IMarketOrderBook,
  IOrderReceived,
  IOrderRejected,
  IOrderExecuted,
  IBalanceUpdated,
  IDepositUpdated,
} from '@template/types';
import { globalEventBus, MARKET_EVENTS } from '@/composables/useEventBus';
import { useMarketDataStore } from '@/stores/useMarketDataStore';
import { useAccountStore } from '@/stores/useAccountStore';
import { BinaryMessageDecoder } from '@template/types';
import { WEBSOCKET_CONFIG } from './index';

/**
 * WebSocket 서비스 클래스
 */
export class WebSocketService implements IWebSocketService {
  private connectionState: ConnectionState = 'disconnected';
  private subscriptions: Map<string, WebSocketCallback> = new Map();
  private webSocket: WebSocket | null = null;
  private subscribedChannels: Set<WebSocketChannel> = new Set();
  private accessToken: string | null = null;

  /**
   * WebSocket 채널 정보 파싱
   */
  private parseChannelInfo(channel: WebSocketChannel): WebSocketChannelInfo {
    if (channel === 'market.quote') {
      return { type: 'market.quote', channel };
    } else if (channel.startsWith('market.orderbook.')) {
      const symbol = channel.replace('market.orderbook.', '');
      return { type: 'market.orderbook', channel, symbol };
    } else if (channel.startsWith('private.')) {
      const accountNo = channel.replace('private.', '');
      return { type: 'private', channel, accountNo };
    }
    throw new Error(`알 수 없는 WebSocket 채널 타입: ${channel}`);
  }

  /**
   * WebSocket 채널 타입 확인
   */
  private getChannelType(channel: WebSocketChannel): WebSocketChannelType {
    return this.parseChannelInfo(channel).type;
  }

  /**
   * WebSocket 채널 생성 헬퍼
   */
  private createMarketOrderBookChannel(symbol: string): WebSocketChannel {
    return `market.orderbook.${symbol}` as WebSocketMarketOrderBookChannel;
  }

  private createPrivateAccountChannel(accountNo: string): WebSocketChannel {
    return `private.${accountNo}` as WebSocketPrivateAccountChannel;
  }

  /**
   * WebSocket 연결 상태 확인
   */
  isConnected(): boolean {
    return this.connectionState === 'connected' && this.webSocket?.readyState === WebSocket.OPEN;
  }

  /**
   * WebSocket 연결 상태 조회
   */
  getConnectionState(): ConnectionState {
    return this.connectionState;
  }

  /**
   * 액세스 토큰 설정 - 로그인 성공 후 호출
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * 액세스 토큰 제거 - 로그아웃 시 호출
   */
  clearAccessToken(): void {
    this.accessToken = null;
  }

  /**
   * WebSocket 연결
   */
  async connect(): Promise<void> {
    if (this.isConnected()) {
      return;
    }

    this.connectionState = 'connecting';

    return new Promise((resolve, reject) => {
      try {
        this.webSocket = new WebSocket(WEBSOCKET_CONFIG.url);

        this.webSocket.onopen = () => {
          this.connectionState = 'connected';
          resolve();
        };

        this.webSocket.onclose = () => {
          this.connectionState = 'disconnected';
          this.subscribedChannels.clear();
        };

        this.webSocket.onerror = (error) => {
          this.connectionState = 'error';
          console.error('[WebSocketService] WebSocket 오류:', error);
          reject(error);
        };

        this.webSocket.onmessage = async (event) => {
          try {
            // 바이너리 메시지 처리
            if (event.data instanceof ArrayBuffer || event.data instanceof Blob) {
              await this.handleBinaryMessage(event.data);
            }
            // JSON 메시지 처리 (하위 호환성)
            else if (typeof event.data === 'string') {
              const data = JSON.parse(event.data);

              this.handleMessage(data);
            }
          } catch (error) {
            console.error(
              '[WebSocketService] 메시지 파싱 오류:',
              error,
              '원시 데이터:',
              event.data
            );
          }
        };

        // 타임아웃 설정
        setTimeout(() => {
          if (this.connectionState === 'connecting') {
            this.connectionState = 'error';
            reject(new Error('WebSocket 연결 타임아웃'));
          }
        }, 10000); // 10초 타임아웃
      } catch (error) {
        this.connectionState = 'error';
        reject(error);
      }
    });
  }

  /**
   * WebSocket 연결 해제
   */
  async disconnect(): Promise<void> {
    if (this.webSocket) {
      this.webSocket.close();
      this.webSocket = null;
    }
    this.connectionState = 'disconnected';
    this.subscriptions.clear();
  }

  /**
   * 채널 구독 (채널명 직접 지정)
   */
  subscribe(channel: WebSocketChannel, callback: WebSocketCallback): string {
    const subscriptionId = `${channel}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    this.subscriptions.set(subscriptionId, callback);

    // WebSocket으로 구독 메시지 전송
    if (this.isConnected()) {
      this.subscribeToChannels([channel]);
    }

    return subscriptionId;
  }

  /**
   * 채널 구독
   */
  subscribeToChannels(channels: WebSocketChannel[]): void {
    if (!this.isConnected()) {
      console.warn('[WebSocketService] WebSocket 연결 없음 - 채널 구독 실패');
      return;
    }

    // private 채널은 토큰이 필요하지만, market 채널은 토큰 없이도 구독 가능
    const privateChannels = channels.filter((channel) => channel.startsWith('private.'));
    const marketChannels = channels.filter((channel) => !channel.startsWith('private.'));

    if (privateChannels.length > 0 && !this.accessToken) {
      console.warn('[WebSocketService] private 채널 구독을 위해 로그인 토큰이 필요합니다');
      // private 채널만 제외하고 market 채널은 구독 진행
      channels = marketChannels;
    }

    // 모든 채널 구독 허용
    const filteredChannels = channels;
    const newChannels = filteredChannels.filter((channel) => !this.subscribedChannels.has(channel));

    if (newChannels.length === 0) {
      return;
    }

    const message: WebSocketSubscriptionMessage = {
      action: 'SUBSCRIBE',
      channels: newChannels,
      ...(this.accessToken && { token: `Bearer ${this.accessToken}` }),
    };

    this.webSocket!.send(JSON.stringify(message));

    // 구독된 채널 목록에 추가
    newChannels.forEach((channel) => {
      this.subscribedChannels.add(channel);
    });
  }

  /**
   * 채널 구독 해제
   */
  unsubscribeFromChannels(channels: WebSocketChannel[]): void {
    if (!this.isConnected()) {
      console.warn('[WebSocketService] WebSocket 연결 없음 - 채널 구독 해제 실패');
      return;
    }

    const channelsToUnsubscribe = channels.filter((channel) =>
      this.subscribedChannels.has(channel)
    );
    if (channelsToUnsubscribe.length === 0) {
      console.log('[WebSocketService] 구독되지 않은 채널들입니다.');
      return;
    }

    const message: WebSocketSubscriptionMessage = {
      action: 'UNSUBSCRIBE',
      channels: channelsToUnsubscribe,
      ...(this.accessToken && { token: `Bearer ${this.accessToken}` }),
    };

    this.webSocket!.send(JSON.stringify(message));
    console.log('[WebSocketService] 채널 구독 해제 요청:', message);

    // 구독된 채널 목록에서 제거
    channelsToUnsubscribe.forEach((channel) => this.subscribedChannels.delete(channel));
  }

  /**
   * 구독 해제 (채널명 또는 ID 기반)
   */
  unsubscribe(channelOrId: string): void {
    // ID로 구독 해제 시도
    const callback = this.subscriptions.get(channelOrId);
    if (callback) {
      this.subscriptions.delete(channelOrId);
      // console.log(`[WebSocketService] 구독 해제: ${channelOrId}`);
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

    // WebSocket으로 구독 해제 메시지 전송
    if (this.isConnected() && keysToDelete.length > 0) {
      this.unsubscribeFromChannels([channelOrId as WebSocketChannel]);
    }
  }

  /**
   * 개별 채널 구독 해제 (예제 방식)
   */
  unsubscribeChannel(channel: WebSocketChannel): void {
    if (!this.isConnected()) {
      console.warn('[WebSocketService] WebSocket 연결 없음 - 채널 구독 해제 실패');
      return;
    }

    if (!this.subscribedChannels.has(channel)) {
      return;
    }

    const message: WebSocketSubscriptionMessage = {
      action: 'UNSUBSCRIBE',
      channels: [channel],
      ...(this.accessToken && { token: `Bearer ${this.accessToken}` }),
    };

    this.webSocket!.send(JSON.stringify(message));
    // console.log(`[WebSocketService] 개별 채널 구독 해제: ${channel}`, message);

    // 구독된 채널 목록에서 제거
    this.subscribedChannels.delete(channel);

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
   * 구독 해제 (심볼 기반)
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
      // console.log(`[WebSocketService] WebSocket 구독 해제: ${symbol} ID: ${key}`);
    });

    // WebSocket으로 구독 해제 메시지 전송
    if (this.isConnected() && keysToDelete.length > 0) {
      this.unsubscribeFromChannels([`market.orderbook.${symbol}` as WebSocketChannel]);
    }
  }

  /**
   * 모든 구독 해제 (예제 방식)
   */
  unsubscribeAll(): void {
    if (!this.isConnected()) {
      console.warn('[WebSocketService] WebSocket 연결 없음 - 전체 구독 해제 실패');
      return;
    }

    const channels = Array.from(this.subscribedChannels);
    if (channels.length === 0) {
      console.log('[WebSocketService] 구독 중인 채널이 없습니다.');
      return;
    }

    const message: WebSocketSubscriptionMessage = {
      action: 'UNSUBSCRIBE',
      channels: channels,
      ...(this.accessToken && { token: `Bearer ${this.accessToken}` }),
    };

    this.webSocket!.send(JSON.stringify(message));
    console.log('[WebSocketService] 전체 채널 구독 해제:', message);

    // 모든 구독 해제
    this.subscriptions.clear();
    this.subscribedChannels.clear();
  }

  /**
   * 재연결 시도
   */
  async reconnect(): Promise<void> {
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
   * 메시지 처리
   */
  private handleMessage(data: any): void {
    // private 채널 관련 메시지만 로그 출력
    if (data.channel && data.channel.startsWith('private.')) {
      console.log('[WebSocketService] Private 메시지 처리:', data);
    }

    // 구독 응답 처리
    if (data.action === 'SUBSCRIBE' && data.status) {
      console.log('[WebSocketService] 구독 응답 수신:', data);
      return;
    }

    // 메시지 타입별 처리 (MARKET_QUOTE 등)
    if (data.messageType) {
      this.handleMessageByType(data);
      return;
    }

    // 채널별 메시지 처리
    if (data.channel) {
      this.handleChannelMessage(data);
    } else {
      // 기존 구독된 콜백들에게 메시지 전달 (호환성 유지)
      this.subscriptions.forEach((callback, subscriptionId) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[WebSocketService] 콜백 실행 오류 (${subscriptionId}):`, error);
        }
      });
    }
  }

  /**
   * 채널별 메시지 처리
   */
  private handleChannelMessage(data: any): void {
    const { channel, data: messageData } = data;

    if (channel.startsWith('market.orderbook.')) {
      // 호가창 데이터 처리
      const symbol = channel.replace('market.orderbook.', '');
      this.handleOrderbookData(symbol, messageData);
    } else if (channel === 'market.quote') {
      // 시세 데이터 처리
      this.handleQuoteData(messageData);
    } else if (channel.startsWith('private.')) {
      // 개인 계좌 데이터 처리
      console.log('[WebSocketService] Private 채널 메시지 수신:', { channel, messageData });
      this.handlePrivateData(messageData);
    } else {
      console.log('[WebSocketService] 알 수 없는 채널:', channel);
    }
  }

  /**
   * 메시지 타입별 처리
   */
  private handleMessageByType(data: any): void {
    if (data.messageType === 'MARKET_QUOTE') {
      this.handleMarketQuote(data);
    } else if (data.messageType === 'MARKET_ORDER_BOOK') {
      this.handleMarketOrderBook(data);
    } else if (
      data.messageType === 'ORDER_ACCEPTED' ||
      data.messageType === 'ORDER_EXECUTION' ||
      data.messageType === 'ACCOUNT_BALANCE'
    ) {
      // Private 메시지 타입 처리
      this.handlePrivateData(data);
    }
  }

  /**
   * MARKET_QUOTE 메시지 처리
   */
  private handleMarketQuote(data: any): void {
    const { stockCd, bid, ask, timestamp } = data;

    // console.log(`[WebSocketService] ${stockCd} MARKET_QUOTE 수신:`, {
    //   bid,
    //   ask,
    //   timestamp,
    // });

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

      // console.log(`[WebSocketService] ${stockCd} 시세 업데이트 완료 (Pinia + Event Bus)`);
    } catch (error) {
      console.error('[WebSocketService] MARKET_QUOTE 업데이트 오류:', error);
    }
  }

  /**
   * MARKET_ORDER_BOOK 메시지 처리
   */
  private handleMarketOrderBook(data: any): void {
    // console.log('[WebSocketService] MARKET_ORDER_BOOK 데이터 수신:', data);

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
            console.error('[WebSocketService] ORDER_BOOK 업데이트 오류:', error);
          }
        }
      });

      // 전역 이벤트로 호가 데이터 전달 (OrderBook 컴포넌트에서 사용)
      if (typeof window !== 'undefined') {
        // console.log(`[WebSocketService] ${stockCd} 전역 이벤트 발생:`, {
        //   stockCd: stockCd,
        //   orderBookLength: orderBookData.length,
        //   timestamp: timestamp,
        // });

        window.dispatchEvent(
          new CustomEvent('orderBookUpdate', {
            detail: {
              stockCd: stockCd,
              orderBook: orderBookData,
              timestamp: timestamp,
            },
          })
        );

        // console.log(`[WebSocketService] ${stockCd} 전역 이벤트 전송 완료`);
      }

      // console.log(`[WebSocketService] ${stockCd} 호가 데이터 처리 완료:`, orderBookData);
    }
  }

  /**
   * 호가창 데이터 처리
   */
  private handleOrderbookData(symbol: string, data: any): void {
    // console.log(`[WebSocketService] 호가창 데이터 수신 (${symbol}):`, data);

    // 해당 심볼을 구독하는 콜백들에게 데이터 전달
    this.subscriptions.forEach((callback, subscriptionId) => {
      if (subscriptionId.startsWith(symbol + '_')) {
        try {
          callback(data);
        } catch (error) {
          console.error(`[WebSocketService] 호가창 콜백 실행 오류 (${subscriptionId}):`, error);
        }
      }
    });
  }

  /**
   * 시세 데이터 처리
   */
  private handleQuoteData(data: any): void {
    // console.log('[WebSocketService] 시세 데이터 수신:', data);

    // 전역 시세 업데이트 함수 호출
    if (typeof window !== 'undefined' && (window as any).updateMarketDataFromStream) {
      try {
        (window as any).updateMarketDataFromStream(data.symbol, data);
      } catch (error) {
        console.error('[WebSocketService] 시세 업데이트 오류:', error);
      }
    }
  }

  /**
   * 개인 계좌 데이터 처리
   */
  private handlePrivateData(data: any): void {
    try {
      if (data.messageType) {
        switch (data.messageType) {
          case 'ORDER_ACCEPTED':
            // 주문 승인 처리
            this.handleOrderAccepted(data);
            break;
          case 'ORDER_EXECUTION':
            // 주문 체결 처리
            this.handleOrderExecution(data);
            break;
          case 'ACCOUNT_BALANCE':
            // 계좌 잔고 처리
            this.handleAccountBalance(data);
            break;
          default:
            console.log('[WebSocketService] 알 수 없는 private 메시지 타입:', data.messageType);
        }
      } else {
        console.log('[WebSocketService] 일반 private 데이터:', data);
      }
    } catch (error) {
      console.error('[WebSocketService] private 데이터 처리 오류:', error);
    }
  }

  /**
   * 주문 승인 처리
   */
  private handleOrderAccepted(data: any): void {
    console.log('[WebSocketService] 주문 승인:', data);

    try {
      // 미체결 주문 목록에 추가할 데이터 구조
      const pendingOrderData = {
        orderDate: data.orderDate,
        orderNo: data.orderNo,
        stockCd: data.stockCd,
        positionCd: data.positionCd,
        orderTypeCd: data.orderTypeCd,
        sideCd: data.sideCd,
        orderQuantity: data.orderQuantity,
        barrierPrice: data.barrierPrice,
        orderPrice: data.orderPrice,
        profitRealizationBarrierPrice: data.profitRealizationBarrierPrice,
        lossCutBarrierPrice: data.lossCutBarrierPrice,
        orderBalance: data.orderBalance,
        orderStatusCd: data.orderStatusCd,
        receptionDate: data.receptionDate,
        isProfitExecution: '',
        isLossLimits: '',
        isLossTracing: '',
      };

      // 전역 이벤트로 미체결 주문 추가 알림
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('orderAccepted', {
            detail: {
              type: 'ORDER_ACCEPTED',
              data: pendingOrderData,
              accountNo: data.accountNo,
            },
          })
        );
      }

      // console.log('[WebSocketService] 주문 승인 처리 완료:', pendingOrderData);
    } catch (error) {
      console.error('[WebSocketService] 주문 승인 처리 오류:', error);
    }
  }

  /**
   * 주문 체결 처리
   */
  private handleOrderExecution(data: any): void {
    // console.log('[WebSocketService] 주문 체결:', data);

    try {
      const executionData = {
        orderDate: data.orderDate,
        orderNo: data.orderNo,
        executionQuantity: data.executionQuantity,
        executionPrice: data.executionPrice,
        deposit: data.deposit,
        totalMargin: data.totalMargin,
        accountNo: data.accountNo,
      };

      // 계좌 잔고 업데이트 (예수금과 증거금)
      this.updateAccountBalance(data.deposit, data.totalMargin);

      // 전역 이벤트로 체결 정보 알림
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('orderExecution', {
            detail: {
              type: 'ORDER_EXECUTION',
              data: executionData,
              accountNo: data.accountNo,
            },
          })
        );
      }

      // console.log('[WebSocketService] 주문 체결 처리 완료:', executionData);
    } catch (error) {
      console.error('[WebSocketService] 주문 체결 처리 오류:', error);
    }
  }

  /**
   * 계좌 잔고 업데이트 (예수금과 증거금)
   */
  private updateAccountBalance(deposit: number, totalMargin: number): void {
    try {
      const accountStore = useAccountStore();
      accountStore.updateBalance(deposit, totalMargin);
      console.log('[WebSocketService] 계좌 잔고 업데이트:', { deposit, totalMargin });
    } catch (error) {
      console.error('[WebSocketService] 계좌 잔고 업데이트 오류:', error);
    }
  }

  /**
   * 계좌 잔고 처리
   */
  private handleAccountBalance(data: any): void {
    try {
      const balanceData = {
        orderDate: data.orderDate,
        orderNo: data.orderNo,
        stockCd: data.stockCd,
        tradeCurrencyCd: data.tradeCurrencyCd,
        positionCd: data.positionCd,
        purchaseDate: data.purchaseDate,
        accountBookQuantity: data.bookQuantity,
        liquidationPossibleQuantity: data.liquidationPossibleQuantity,
        accountBookPrice: data.bookPrice,
        currentPrice: data.currentPrice,
        assessmentProfitLoss: data.evaluationProfitLoss,
        stockGroupCd: data.stockGroupCd,
        positionNo: data.balanceNo,
      };

      // 전역 이벤트로 잔고 정보 알림
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('accountBalance', {
            detail: {
              type: 'ACCOUNT_BALANCE',
              data: balanceData,
              accountNo: data.accountNo,
            },
          })
        );
      }
    } catch (error) {
      console.error('[WebSocketService] 계좌 잔고 처리 오류:', error);
    }
  }

  /**
   * 바이너리 메시지 처리
   */
  private async handleBinaryMessage(data: ArrayBuffer | Blob): Promise<void> {
    try {
      // BinaryMessageDecoder로 디코딩
      // - Blob, ArrayBuffer 모두 처리
      const decoded =
        data instanceof Blob
          ? await BinaryMessageDecoder.decodeBlob(data)
          : BinaryMessageDecoder.decode(data);

      // console.log('[WebSocketService] 바이너리 메시지 디코딩:', {
      //   messageType: decoded.messageType,
      //   typeCode: decoded.typeCode,
      // });

      // 디코딩된 메시지를 타입별로 처리
      this.handleDecodedMessage(decoded);
    } catch (error) {
      console.error('[WebSocketService] 바이너리 메시지 처리 오류:', error);
    }
  }

  /**
   * 디코딩된 메시지 타입별 처리
   */
  private handleDecodedMessage(decoded: any): void {
    const { messageType, data } = decoded;

    switch (messageType) {
      case 'MARKET_QUOTE_LIST':
        this.handleMarketQuoteListFromBinary(data);
        break;
      case 'MARKET_ORDER_BOOK':
        this.handleMarketOrderBookFromBinary(data);
        break;
      case 'MARKET_ORDER_BOOK_CANCEL':
        this.handleOrderBookCancelFromBinary(data);
        break;
      case 'ORDER_ACCEPTED':
        this.handleOrderReceivedFromBinary(data);
        break;
      case 'ORDER_REJECTED':
        this.handleOrderRejectedFromBinary(data);
        break;
      case 'ORDER_EXECUTED':
        this.handleOrderExecutedFromBinary(data);
        break;
      case 'ACCOUNT_BALANCE_UPDATE':
        this.handleBalanceUpdatedFromBinary(data);
        break;
      case 'DEPOSIT_UPDATED':
        this.handleDepositUpdatedFromBinary(data);
        break;
      default:
        console.warn('[WebSocketService] 알 수 없는 메시지 타입:', messageType);
    }
  }

  /**
   * 바이너리 MarketQuoteList 처리
   */
  private handleMarketQuoteListFromBinary(data: IMarketQuoteList): void {
    const { quotes } = data;

    if (quotes && Array.isArray(quotes)) {
      // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      // console.log('[WebSocketService] MarketQuoteList 바이너리 디코딩 성공!');
      // console.log('  총 개수:', quotes.length);
      quotes.forEach((quote, index) => {
        // console.log(`  [${index}]`, {
        //   종목코드: quote.stockCd,
        //   매수호가: quote.bid,
        //   매도호가: quote.ask,
        //   매수잔량: quote.bidSize,
        //   매도잔량: quote.askSize,
        //   타임스탬프: quote.timestamp,
        // });
        this.handleMarketQuoteFromBinary(quote);
      });
      // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }
  }

  /**
   * 바이너리 MarketQuote 처리
   */
  private handleMarketQuoteFromBinary(quote: IMarketQuote): void {
    const { stockCd, bid, ask, bidSize, askSize, timestamp } = quote;

    if (!stockCd || bid === null || bid === undefined || ask === null || ask === undefined) {
      return;
    }

    // 중간가 계산 (null 체크 후 사용)
    const currentPrice = (bid + ask) / 2;

    try {
      // 고가/저가 계산
      const high = Math.max(bid, ask) * 1.0001;
      const low = Math.min(bid, ask) * 0.9999;

      // Pinia Store를 통한 시장 데이터 업데이트
      const marketDataStore = useMarketDataStore();
      marketDataStore.updateMarketDataFromStream(stockCd, {
        close: currentPrice,
        bid: bid,
        ask: ask,
        high: high,
        low: low,
        timestamp: timestamp as number,
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
    } catch (error) {
      console.error('[WebSocketService] MarketQuote 바이너리 처리 오류:', error);
    }
  }

  /**
   * 바이너리 MarketOrderBook 처리
   */
  private handleMarketOrderBookFromBinary(data: IMarketOrderBook): void {
    const { stockCd, quotes, timestamp } = data;

    if (!stockCd || !quotes || !Array.isArray(quotes)) {
      return;
    }

    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    // console.log('[WebSocketService] MarketOrderBook 바이너리 디코딩 성공!');
    // console.log('  종목코드:', stockCd);
    // console.log('  호가 개수:', quotes.length);
    // console.log('  타임스탬프:', timestamp);
    // console.log('  호가 정보:');
    // quotes.forEach((quote, index) => {
    //   console.log(`    [단계 ${index + 1}]`, {
    //     매수호가: quote.bid,
    //     매도호가: quote.ask,
    //     매수잔량: quote.bidSize,
    //     매도잔량: quote.askSize,
    //   });
    // });
    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // 호가 데이터 변환
    const orderBookData = quotes.map((quote) => ({
      bid: quote.bid!.toString(),
      ask: quote.ask!.toString(),
      bidSize: quote.bidSize!.toString(),
      askSize: quote.askSize!.toString(),
    }));

    // 전역 이벤트로 호가 데이터 전달
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
  }

  /**
   * 바이너리 OrderBookCancel 처리
   */
  private handleOrderBookCancelFromBinary(data: any): void {
    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    // console.log('[WebSocketService] OrderBookCancel 바이너리 디코딩 성공!');
    // console.log('  취소타입:', data.cancelType);
    // console.log('  종목코드:', data.stockCd);
    // console.log('  타임스탬프:', data.timestamp);
    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    // TODO: 호가 취소 처리 로직 구현
  }

  /**
   * 바이너리 OrderReceived 처리 (주문 접수)
   */
  private handleOrderReceivedFromBinary(data: IOrderReceived): void {
    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    // console.log('[WebSocketService] OrderReceived (주문 접수) 바이너리 디코딩 성공!');
    // console.log('  계좌번호:', data.accountNo);
    // console.log('  주문일자:', data.orderDate);
    // console.log('  주문번호:', data.orderNo);
    // console.log('  종목코드:', data.stockCd);
    // console.log('  주문수량:', data.orderQuantity);
    // console.log('  주문가격:', data.orderPrice);
    // console.log('  주문잔량:', data.orderBalance);
    // console.log('  주문상태:', data.orderStatusCd);
    // console.log('  포지션구분:', data.positionCd, '(1:LONG, 2:SHORT)');
    // console.log('  매매구분:', data.sideCd, '(1:매수, 2:매도)');
    // console.log(
    //   '  주문유형:',
    //   data.orderTypeCd,
    //   '(1:시장가, 3:지정가, 5:조건시장가, 7:조건지정가, 9:TP+SL)'
    // );
    // console.log('  증거금총액:', data.totalMargin);
    // console.log('  접수일시:', data.receptionDate);
    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
      const pendingOrderData = {
        orderDate: data.orderDate!,
        orderNo: data.orderNo!,
        stockCd: data.stockCd!,
        positionCd: data.positionCd!,
        orderTypeCd: data.orderTypeCd!,
        sideCd: data.sideCd!,
        orderQuantity: data.orderQuantity!,
        barrierPrice: data.barrierPrice!,
        orderPrice: data.orderPrice!,
        profitRealizationBarrierPrice: data.profitRealizationBarrierPrice!,
        lossCutBarrierPrice: data.lossCutBarrierPrice!,
        orderBalance: data.orderBalance!,
        orderStatusCd: data.orderStatusCd!,
        receptionDate: data.receptionDate!,
        isProfitExecution: data.isProfitExecution || '',
        isLossLimits: data.isLossLimits || '',
        isLossTracing: data.isLossTracing || '',
      };

      // 전역 이벤트 발생
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('orderAccepted', {
            detail: {
              type: 'ORDER_ACCEPTED',
              data: pendingOrderData,
              accountNo: data.accountNo,
            },
          })
        );
      }
    } catch (error) {
      console.error('[WebSocketService] OrderReceived 바이너리 처리 오류:', error);
    }
  }

  /**
   * 바이너리 OrderRejected 처리 (주문 거부)
   */
  private handleOrderRejectedFromBinary(data: IOrderRejected): void {
    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    // console.log('[WebSocketService] OrderRejected (주문 거부) 바이너리 디코딩 성공!');
    // console.log('  계좌번호:', data.accountNo);
    // console.log('  주문일자:', data.orderDate);
    // console.log('  주문번호:', data.orderNo);
    // console.log('  종목코드:', data.stockCd);
    // console.log('  거부수량:', data.rejectQuantity);
    // console.log('  포지션구분:', data.positionCd, '(1:LONG, 2:SHORT)');
    // console.log('  매매구분:', data.sideCd, '(1:매수, 2:매도)');
    // console.log('  매입일자:', data.purchaseDate);
    // console.log('  잔고번호:', data.balanceNo);
    // console.log('  증거금총액:', data.totalMargin);
    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    // TODO: 주문 거부 처리 로직 구현
  }

  /**
   * 바이너리 OrderExecuted 처리 (주문 체결)
   */
  private handleOrderExecutedFromBinary(data: IOrderExecuted): void {
    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    // console.log('[WebSocketService] OrderExecuted (주문 체결) 바이너리 디코딩 성공!');
    // console.log('  계좌번호:', data.accountNo);
    // console.log('  주문일자:', data.orderDate);
    // console.log('  주문번호:', data.orderNo);
    // console.log('  체결수량:', data.executionQuantity);
    // console.log('  체결가격:', data.executionPrice);
    // console.log('  예수금:', data.deposit);
    // console.log('  증거금총액:', data.totalMargin);
    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
      const executionData = {
        orderDate: data.orderDate!,
        orderNo: data.orderNo!,
        executionQuantity: data.executionQuantity!,
        executionPrice: data.executionPrice!,
        deposit: data.deposit!,
        totalMargin: data.totalMargin!,
        accountNo: data.accountNo!,
      };

      // 계좌 잔고 업데이트
      this.updateAccountBalance(data.deposit!, data.totalMargin!);

      // 전역 이벤트 발생
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('orderExecution', {
            detail: {
              type: 'ORDER_EXECUTION',
              data: executionData,
              accountNo: data.accountNo,
            },
          })
        );
      }
    } catch (error) {
      console.error('[WebSocketService] OrderExecuted 바이너리 처리 오류:', error);
    }
  }

  /**
   * 바이너리 BalanceUpdated 처리 (잔고 업데이트)
   */
  private handleBalanceUpdatedFromBinary(data: IBalanceUpdated): void {
    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    // console.log('[WebSocketService] BalanceUpdated (잔고 수정) 바이너리 디코딩 성공!');
    // console.log('  계좌번호:', data.accountNo);
    // console.log('  주문일자:', data.orderDate);
    // console.log('  주문번호:', data.orderNo);
    // console.log('  종목코드:', data.stockCd);
    // console.log('  거래통화:', data.tradeCurrencyCd);
    // console.log('  포지션구분:', data.positionCd, '(1:LONG, 2:SHORT)');
    // console.log('  매입일자:', data.purchaseDate);
    // console.log('  장부수량:', data.bookQuantity);
    // console.log('  청산가능수량:', data.liquidationPossibleQuantity);
    // console.log('  장부가격:', data.bookPrice);
    // console.log('  현재가:', data.currentPrice);
    // console.log('  평가손익:', data.evaluationProfitLoss);
    // console.log('  종목그룹:', data.stockGroupCd, '(01:외환, 02:지수, 03:상품, 04:가상화폐)');
    // console.log('  잔고번호:', data.balanceNo);
    // console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    try {
      const balanceData = {
        orderDate: data.orderDate!,
        orderNo: data.orderNo!,
        stockCd: data.stockCd!,
        tradeCurrencyCd: data.tradeCurrencyCd!,
        positionCd: data.positionCd!,
        purchaseDate: data.purchaseDate!,
        accountBookQuantity: data.bookQuantity!,
        liquidationPossibleQuantity: data.liquidationPossibleQuantity!,
        accountBookPrice: data.bookPrice!,
        currentPrice: data.currentPrice!,
        assessmentProfitLoss: data.evaluationProfitLoss!,
        stockGroupCd: data.stockGroupCd!,
        positionNo: data.balanceNo!,
      };

      // 전역 이벤트 발생
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('accountBalance', {
            detail: {
              type: 'BALANCE_UPDATED',
              data: balanceData,
              accountNo: data.accountNo,
            },
          })
        );
      }
    } catch (error) {
      console.error('[WebSocketService] BalanceUpdated 바이너리 처리 오류:', error);
    }
  }

  /**
   * 바이너리 DepositUpdated 처리 (예수금 업데이트)
   */
  private handleDepositUpdatedFromBinary(data: IDepositUpdated): void {
    console.log('[RealWebSocketService] DepositUpdated (예수금 변경) 바이너리 디코딩 성공!');
    console.log('  계좌번호:', data.accountNo);
    console.log('  예수금:', data.depositAmount);

    try {
      // AccountStore에 예수금 업데이트
      const accountStore = useAccountStore();
      if (accountStore.selectedAccountNo === data.accountNo) {
        // depositAmount를 depositBalance로 설정
        accountStore.setDepositBalance(data.depositAmount!);
      }

      // 전역 이벤트 발생
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('depositUpdated', {
            detail: {
              type: 'DEPOSIT_UPDATED',
              data: {
                accountNo: data.accountNo,
                depositAmount: data.depositAmount,
              },
              accountNo: data.accountNo,
            },
          })
        );
      }
    } catch (error) {
      console.error('[RealWebSocketService] DepositUpdated 바이너리 처리 오류:', error);
    }
  }
}
