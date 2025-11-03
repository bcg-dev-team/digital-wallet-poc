/**
 * WebSocket 채널 타입 정의
 */

/**
 * WebSocket 시장 시세 채널
 */
export type WebSocketMarketQuoteChannel = 'market.quote';

/**
 * WebSocket 종목별 호가 채널
 */
export type WebSocketMarketOrderBookChannel = `market.orderbook.${string}`;

/**
 * WebSocket 개인 계좌 채널
 */
export type WebSocketPrivateAccountChannel = `private.${string}`;

/**
 * 모든 WebSocket 채널 타입
 */
export type WebSocketChannel =
  | WebSocketMarketQuoteChannel
  | WebSocketMarketOrderBookChannel
  | WebSocketPrivateAccountChannel;

/**
 * WebSocket 채널 타입 구분을 위한 유니온 타입
 */
export type WebSocketChannelType = 'market.quote' | 'market.orderbook' | 'private';

/**
 * WebSocket 채널 정보 인터페이스
 */
export interface WebSocketChannelInfo {
  type: WebSocketChannelType;
  channel: WebSocketChannel;
  symbol?: string; // market.orderbook의 경우
  accountNo?: string; // private의 경우
}

/**
 * WebSocket 구독/구독해제 메시지
 */
export interface WebSocketSubscriptionMessage {
  action: 'SUBSCRIBE' | 'UNSUBSCRIBE';
  channels: WebSocketChannel[];
  token?: string;
}

/**
 * WebSocket 채널별 데이터 타입
 */
export interface WebSocketMarketQuoteData {
  symbol: string;
  price: number;
  timestamp: number;
}

export interface WebSocketMarketOrderBookData {
  symbol: string;
  quotes: Array<{
    bid: number;
    ask: number;
    bidSize: number;
    askSize: number;
  }>;
  timestamp: string;
}

export interface WebSocketPrivateAccountData {
  accountNo: string;
  data: any; // 주문, 잔고 등 다양한 데이터
  timestamp: number;
}

/**
 * WebSocket 채널별 데이터 유니온 타입
 */
export type WebSocketChannelData =
  | WebSocketMarketQuoteData
  | WebSocketMarketOrderBookData
  | WebSocketPrivateAccountData;
