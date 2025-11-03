import { parseFullSymbol } from '@template/utils';

/**
 * WebSocket 연결 상태 타입
 */
type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

/**
 * TradingView Bar 데이터 인터페이스
 */
export interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

/**
 * 구독 정보 인터페이스
 */
interface Subscription {
  symbol: string;
  resolution: string;
  lastBar: Bar | null;
  callback: (bar: Bar) => void;
}

/**
 * 심볼 정보 인터페이스
 */
interface SymbolInfo {
  full_name?: string;
  name?: string;
}

/**
 * 연결 상태 정보 인터페이스
 */
export interface ConnectionStatus {
  state: ConnectionState;
  connected: boolean;
  reconnectAttempts: number;
  maxReconnectAttempts: number;
  connectionDuration: number;
}

/**
 * 구독 상태 정보 인터페이스
 */
export interface SubscriptionStatus {
  connected: boolean;
  connectionState: ConnectionState;
  connectionDuration: number;
  reconnectAttempts: number;
  subscriptions: Array<{
    uid: string;
    symbol: string;
    resolution: string;
    lastBar: Bar | null;
  }>;
  symbolCounts: Record<string, number>;
  totalSubscriptions: number;
}

// 연결 상태 추적을 위한 변수들
let connectionStartTime: number | null = null;
let connectionState: ConnectionState = 'disconnected';

// 단순화된 구독 구조: 각 구독을 독립적으로 관리
const subscriptions = new Map<string, Subscription>(); // key: subscriberUID, value: { symbol, resolution, lastBar, callback }

/**
 * Event Bus를 통한 실시간 데이터 처리 설정
 * 웹소켓 데이터를 TradingView 차트에 피딩
 */
function setupEventBusIntegration(): void {
  console.log('[TradingView Streaming] Event Bus 통합 설정');

  // Event Bus를 통한 시장 데이터 업데이트 감지
  if (typeof window !== 'undefined') {
    // 동적 import로 Event Bus 사용
    import('@/composables/useEventBus').then(({ globalEventBus, MARKET_EVENTS }) => {
      globalEventBus.on(MARKET_EVENTS.DATA_UPDATED, (data: any) => {
        // TradingView 차트용 Bar 데이터 생성
        const realtimeBar: Bar = {
          time: data.timestamp || Date.now(),
          open: data.price || 0,
          high: data.price || 0,
          low: data.price || 0,
          close: data.price || 0,
          volume: data.volume || 0,
        };

        // TradingView 차트 업데이트
        updateBarsForSymbol(data.symbol, realtimeBar);

        // console.log(`[TradingView Streaming] ${data.symbol} 차트 업데이트:`, {
        //   time: new Date(realtimeBar.time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        //   price: realtimeBar.close,
        //   volume: realtimeBar.volume,
        // });
      });
    });
  }
}

/**
 * WebSocket 연결 초기화
 * Event Bus 통합만 설정
 */
function initializeSocket(): void {
  // Event Bus 통합 설정
  setupEventBusIntegration();
}

/**
 * 심볼별 모든 구독 Bar 업데이트
 * @param symbol - 심볼명
 * @param realtimeBar - 실시간 Bar 데이터
 */
export function updateBarsForSymbol(symbol: string, realtimeBar: Bar): void {
  let matchedCount = 0;
  const resolutionGroups = new Map<string, Bar[]>();

  // 해당 심볼의 모든 구독 찾기
  subscriptions.forEach((subscription, subscriberUID) => {
    if (subscription.symbol === symbol) {
      matchedCount++;

      const updatedBar = createOrUpdateBar(
        realtimeBar,
        subscription.lastBar,
        subscription.resolution
      );

      // 구독의 lastBar 업데이트
      subscription.lastBar = updatedBar;

      // resolution별로 Bar 수집 (연속성 검증용)
      if (!resolutionGroups.has(subscription.resolution)) {
        resolutionGroups.set(subscription.resolution, []);
      }
      resolutionGroups.get(subscription.resolution)!.push(updatedBar);

      // 콜백 호출
      try {
        subscription.callback(updatedBar);
      } catch (error) {
        console.error(`[MSW WebSocket] 구독 ${subscriberUID} 콜백 오류:`, error);
      }
    }
  });

  // 각 resolution별로 Bar 연속성 검증
  resolutionGroups.forEach((bars, resolution) => {
    if (bars.length > 1) {
      validateBarContinuity(bars, resolution);
    }
  });

  // console.log(
  //   `[updateBarsForSymbol] 완료: ${symbol} - ${matchedCount}개 구독, ${resolutionGroups.size}개 resolution`
  // );
}

/**
 * Resolution별 Bar 생성/업데이트 (연속성 보장)
 * @param realtimeBar - 실시간 Bar 데이터
 * @param lastBar - 마지막 Bar 데이터
 * @param resolution - 시간 해상도
 * @returns 업데이트된 Bar 데이터
 */
function createOrUpdateBar(realtimeBar: Bar, lastBar: Bar | null, resolution: string): Bar {
  // 정확한 Bar 시작 시간 계산
  const currentBarStart = getBarStartTime(realtimeBar.time, resolution);

  if (!lastBar) {
    // 첫 번째 Bar 생성: 히스토리 데이터가 없는 경우
    const newBar: Bar = {
      time: currentBarStart * 1000,
      open: realtimeBar.close, // 첫 번째 Bar는 실시간 가격을 시가로 사용
      high: realtimeBar.close,
      low: realtimeBar.close,
      close: realtimeBar.close,
      volume: realtimeBar.volume,
    };

    console.log(
      `[${resolution}] 첫 번째 Bar 생성 (히스토리 없음):`,
      new Date(currentBarStart * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      `가격: ${realtimeBar.close}`
    );
    return newBar;
  }

  // 이전 Bar의 시작 시간 계산
  const lastBarStart = getBarStartTime(lastBar.time, resolution);

  if (currentBarStart > lastBarStart) {
    // 새로운 Bar 생성: 이전 Bar와 정확히 연결
    const openPrice = lastBar.close; // 🎯 핵심: 이전 Bar의 종가를 시가로 사용
    const closePrice = realtimeBar.close;

    const newBar: Bar = {
      time: currentBarStart * 1000,
      open: openPrice, // 🎯 이전 Bar의 종가
      high: Math.max(openPrice, closePrice), // 🎯 open과 close 중 높은 값
      low: Math.min(openPrice, closePrice), // 🎯 open과 close 중 낮은 값
      close: closePrice, // 🎯 실시간 가격
      volume: realtimeBar.volume || 0,
    };

    // console.log(`[${resolution}] 새로운 Bar 생성:`, {
    //   이전Bar: new Date(lastBarStart * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    //   새Bar: new Date(currentBarStart * 1000).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    //   시간차: `${(currentBarStart - lastBarStart) / 60}분`,
    //   이전종가: openPrice,
    //   새시가: openPrice,
    //   새종가: closePrice,
    //   갭: openPrice === closePrice ? '없음' : `${Math.abs(openPrice - closePrice).toFixed(2)}`,
    // });

    return newBar;
  } else if (currentBarStart === lastBarStart) {
    // 같은 Bar 내에서 업데이트: OHLC만 업데이트, 시간은 그대로
    const updatedBar: Bar = {
      ...lastBar,
      high: Math.max(lastBar.high, realtimeBar.high || realtimeBar.close),
      low: Math.min(lastBar.low, realtimeBar.low || realtimeBar.close),
      close: realtimeBar.close,
      volume: lastBar.volume + (realtimeBar.volume || 0),
    };

    return updatedBar;
  } else {
    // 시간이 뒤처진 경우 (네트워크 지연 등): 기존 Bar 유지
    console.warn(`[${resolution}] 시간 역전 감지:`, {
      현재시간: new Date(realtimeBar.time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      Bar시간: new Date(lastBar.time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      차이: `${(lastBar.time - realtimeBar.time) / 1000}초`,
    });

    return lastBar;
  }
}

/**
 * 정확한 Bar 시작 시간 계산
 * @param timestamp - Unix timestamp (밀리초)
 * @param resolution - 시간 해상도 문자열
 * @returns Bar 시작 시간 (초 단위)
 */
function getBarStartTime(timestamp: number, resolution: string): number {
  const timeInSeconds = Math.floor(timestamp / 1000);
  let interval: number;

  switch (resolution) {
    case '1':
      interval = 60;
      break; // 1분
    case '5':
      interval = 5 * 60;
      break; // 5분
    case '15':
      interval = 15 * 60;
      break; // 15분
    case '30':
      interval = 30 * 60;
      break; // 30분
    case '60':
      interval = 60 * 60;
      break; // 1시간
    case '240':
      interval = 4 * 60 * 60;
      break; // 4시간
    case '1D':
      interval = 24 * 60 * 60;
      break; // 1일
    case '1W':
      interval = 7 * 24 * 60 * 60;
      break; // 1주
    case '1M':
      interval = 30 * 24 * 60 * 60;
      break; // 1개월
    default:
      interval = 60;
  }

  // 정확한 Bar 시작 시간 계산 (interval의 배수로 맞춤)
  return Math.floor(timeInSeconds / interval) * interval;
}

/**
 * 시간 간격 계산 (초 단위)
 * @param resolution - 시간 해상도 문자열
 * @returns 초 단위 시간 간격
 */
function getTimeInterval(resolution: string): number {
  switch (resolution) {
    case '1':
      return 60;
    case '5':
      return 5 * 60;
    case '15':
      return 15 * 60;
    case '30':
      return 30 * 60;
    case '60':
      return 60 * 60;
    case '240':
      return 4 * 60 * 60;
    case '1D':
      return 24 * 60 * 60;
    case '1W':
      return 7 * 24 * 60 * 60;
    case '1M':
      return 30 * 24 * 60 * 60;
    default:
      return 24 * 60 * 60; // 기본값: 1일
  }
}

/**
 * Bar 연속성 검증 (디버깅용)
 * @param bars - Bar 배열
 * @param resolution - 시간 해상도
 * @returns 연속성 검증 결과
 */
function validateBarContinuity(bars: Bar[], resolution: string): boolean {
  if (bars.length < 2) return true;

  const interval = getTimeInterval(resolution);

  for (let i = 1; i < bars.length; i++) {
    const prevBar = bars[i - 1];
    const currentBar = bars[i];

    const expectedTime = prevBar.time + interval * 1000;
    const timeDiff = Math.abs(currentBar.time - expectedTime);

    if (timeDiff > 1000) {
      // 1초 오차 허용
      console.error(`[${resolution}] Bar 연속성 오류:`, {
        prevBar: new Date(prevBar.time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        currentBar: new Date(currentBar.time).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        expected: new Date(expectedTime).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
        차이: `${timeDiff / 1000}초`,
      });
      return false;
    }
  }

  console.log(`[${resolution}] Bar 연속성 검증 통과: ${bars.length}개 Bar`);
  return true;
}

// 소켓 초기화 (모듈 로드 시)
initializeSocket();

/**
 * 현재 구독 상태 확인 (디버깅용)
 * @returns 구독 상태 정보
 */
export function getSubscriptionStatus(): SubscriptionStatus {
  const symbolCounts = new Map<string, number>();
  subscriptions.forEach((subscription) => {
    const count = symbolCounts.get(subscription.symbol) || 0;
    symbolCounts.set(subscription.symbol, count + 1);
  });

  return {
    connected: true, // WebSocket 모드에서는 항상 연결된 것으로 간주
    connectionState: connectionState,
    connectionDuration: connectionStartTime ? Date.now() - connectionStartTime : 0,
    reconnectAttempts: 0,
    subscriptions: Array.from(subscriptions.entries()).map(([uid, sub]) => ({
      uid,
      symbol: sub.symbol,
      resolution: sub.resolution,
      lastBar: sub.lastBar,
    })),
    symbolCounts: Object.fromEntries(symbolCounts),
    totalSubscriptions: subscriptions.size,
  };
}

/**
 * 실시간 데이터 구독 함수
 * @param symbolInfo - 심볼 정보
 * @param resolution - 시간 해상도
 * @param onRealtimeCallback - 실시간 데이터 콜백
 * @param subscriberUID - 구독자 고유 ID
 * @param onResetCacheNeededCallback - 캐시 리셋 콜백 (사용 안함)
 * @param lastDailyBar - 마지막 일봉 데이터
 */
export function subscribeOnStream(
  symbolInfo: SymbolInfo,
  resolution: string,
  onRealtimeCallback: (bar: Bar) => void,
  subscriberUID: string,
  onResetCacheNeededCallback?: () => void,
  lastDailyBar?: Bar
): void {
  const symbolName = symbolInfo.full_name || symbolInfo.name || '';

  console.log('[subscribeOnStream] 호출:', {
    symbolInfo: symbolName,
    resolution,
    subscriberUID,
  });

  // 심볼 파싱 (MSW 버전)
  const parsedSymbol = parseFullSymbol(symbolName);
  if (!parsedSymbol) {
    console.error('[subscribeOnStream] 심볼 파싱 실패:', symbolName);
    return;
  }

  const symbol = `${parsedSymbol.fromSymbol}${parsedSymbol.toSymbol}`;

  // 기본 가격 설정
  const currentTime = Math.floor(Date.now() / 1000);
  const defaultPrice = parsedSymbol.fromSymbol === 'ETH' ? 2800 : 50000; // ETH는 2800, BTC는 50000

  // WebSocket 구독 상태 확인 (구독 추가 전에 확인)
  const symbolSubscribed = Array.from(subscriptions.values()).some((sub) => sub.symbol === symbol);

  const subscription: Subscription = {
    symbol,
    resolution,
    lastBar: lastDailyBar || {
      time: currentTime * 1000,
      open: defaultPrice,
      high: defaultPrice,
      low: defaultPrice,
      close: defaultPrice,
      volume: 1000,
    },
    callback: onRealtimeCallback,
  };

  subscriptions.set(subscriberUID, subscription);

  // WebSocket 모드에서는 실제 구독은 WebSocketService에서 처리됨
  if (!symbolSubscribed) {
    console.log('[subscribeOnStream] 새로운 심볼 구독:', symbol);
  } else {
    console.log('[subscribeOnStream] 이미 구독된 심볼:', symbol);
  }
}

/**
 * 구독 해제 함수
 * @param subscriberUID - 구독자 고유 ID
 */
export function unsubscribeFromStream(subscriberUID: string): void {
  console.log('[unsubscribeFromStream] 호출:', subscriberUID);

  const subscription = subscriptions.get(subscriberUID);
  if (!subscription) {
    console.log('[unsubscribeFromStream] 구독을 찾을 수 없음:', subscriberUID);
    return;
  }

  // 구독 제거
  subscriptions.delete(subscriberUID);

  // 해당 심볼의 다른 구독이 있는지 확인
  const symbolSubscribed = Array.from(subscriptions.values()).some(
    (sub) => sub.symbol === subscription.symbol
  );

  if (!symbolSubscribed) {
    // WebSocket 모드에서는 실제 구독 해제는 WebSocketService에서 처리됨
    console.log('[unsubscribeFromStream] 심볼 구독 해제:', subscription.symbol);
  }
}

/**
 * WebSocket 연결 상태 확인
 * @returns 연결 상태 (항상 true)
 */
export function isConnected(): boolean {
  return true; // WebSocket 모드에서는 항상 연결된 것으로 간주
}

/**
 * 완전한 정리 함수 (페이지 언로드 시 호출)
 */
export function cleanup(): void {
  console.log('[완전 정리] 시작');

  // 구독 상태 정리
  subscriptions.clear();

  // 상태 초기화
  connectionStartTime = null;
  connectionState = 'disconnected';

  console.log('[완전 정리] 완료');
}

/**
 * 연결 상태 정보 가져오기
 * @returns 연결 상태 정보
 */
export function getConnectionState(): ConnectionStatus {
  return {
    state: connectionState,
    connected: true,
    reconnectAttempts: 0,
    maxReconnectAttempts: 0,
    connectionDuration: connectionStartTime ? Date.now() - connectionStartTime : 0,
  };
}
