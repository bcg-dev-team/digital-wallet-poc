/**
 * WebSocket 서비스 싱글톤
 * WebSocket 연결을 전역에서 하나의 인스턴스로 관리
 */

import { WebSocketService } from './WebSocketService';
import type { IWebSocketService } from '@template/types';

let webSocketServiceInstance: IWebSocketService | null = null;

/**
 * WebSocket 서비스 인스턴스 가져오기
 * 첫 호출 시에 인스턴스를 생성하고, 이후 호출에서는 동일한 인스턴스 반환
 */
export function getWebSocketService(): IWebSocketService {
  if (!webSocketServiceInstance) {
    webSocketServiceInstance = new WebSocketService();
  }
  return webSocketServiceInstance;
}

/**
 * WebSocket 서비스 인스턴스 초기화
 * 주로 테스트에서 사용
 */
export function resetWebSocketService(): void {
  if (webSocketServiceInstance) {
    webSocketServiceInstance.disconnect();
  }
  webSocketServiceInstance = null;
}

/**
 * 커스텀 WebSocket 서비스 주입
 * 테스트에서 Mock 서비스를 주입할 때 사용
 */
export function injectWebSocketService(service: IWebSocketService): void {
  webSocketServiceInstance = service;
}

/**
 * WebSocket 서버 설정
 */
export const WEBSOCKET_CONFIG = {
  // 1. 상대 경로
  url: '/ws',

  // 2. 팀장님 개인 PC
  // url: 'ws://192.168.0.91:9999/ws',

  reconnectAttempts: 5,
  /**
   * 재연결 지연 시간 (ms)
   */
  reconnectDelay: 1000, // 1s
  /**
   * 하트비트 간격 (ms)
   */
  heartbeatInterval: 30000, // 30s
} as const;

