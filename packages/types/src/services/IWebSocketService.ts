/**
 * WebSocket 서비스 인터페이스
 * 실시간 시세 데이터 스트리밍을 위한 WebSocket 연결 관리
 */

import type { WebSocketChannel } from './websocket';

/**
 * WebSocket 메시지 콜백 타입
 */
export type WebSocketCallback = (data: any) => void;

/**
 * WebSocket 연결 상태
 */
export type ConnectionState =
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'reconnecting'
  | 'error';

/**
 * WebSocket 서비스 인터페이스
 */
export interface IWebSocketService {
  /**
   * WebSocket 연결 상태 확인
   * @returns 연결 여부
   */
  isConnected(): boolean;

  /**
   * WebSocket 연결 상태 조회
   * @returns 현재 연결 상태
   */
  getConnectionState(): ConnectionState;

  /**
   * WebSocket용 액세스 토큰 설정
   * 로그인 성공 후 호출
   * @param token - JWT 액세스 토큰
   */
  setAccessToken(token: string): void;

  /**
   * WebSocket용 액세스 토큰 제거
   * 로그아웃 시 호출
   */
  clearAccessToken(): void;

  /**
   * WebSocket 연결
   * @returns 연결 완료 Promise
   */
  connect(): Promise<void>;

  /**
   * WebSocket 연결 해제
   * @returns 연결 해제 완료 Promise
   */
  disconnect(): Promise<void>;

  /**
   * 심볼 구독
   * @param symbol - 구독할 심볼
   * @param callback - 데이터 수신 콜백
   * @returns 구독 ID (구독 해제 시 사용)
   */
  subscribe(symbol: string, callback: WebSocketCallback): string;

  /**
   * 채널 구독 (복수)
   * @param channels - 구독할 채널 배열
   */
  subscribeToChannels(channels: WebSocketChannel[]): void;

  /**
   * 구독 해제 (ID 기반)
   * @param subscriptionId - 구독 ID
   */
  unsubscribe(subscriptionId: string): void;

  /**
   * 채널 구독 해제 (복수)
   * @param channels - 구독 해제할 채널 배열
   */
  unsubscribeFromChannels(channels: WebSocketChannel[]): void;

  /**
   * 구독 해제 (심볼 기반)
   * @param symbol - 구독 해제할 심볼
   * @param callback - 특정 콜백만 해제 (선택사항)
   */
  unsubscribeBySymbol(symbol: string, callback?: WebSocketCallback): void;

  /**
   * 구독 해제 (채널 기반)
   * @param channel - 구독 해제할 채널
   */
  unsubscribeChannel(channel: string): void;

  /**
   * 모든 구독 해제
   */
  unsubscribeAll(): void;

  /**
   * 재연결 시도
   */
  reconnect(): Promise<void>;

  /**
   * 정리 (리소스 해제)
   */
  cleanup(): void;
}
