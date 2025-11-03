/**
 * Event Bus Composable
 * 컴포넌트 간 이벤트 통신을 위한 유틸리티
 */

import { onUnmounted } from 'vue';

type EventCallback<T = any> = (data: T) => void;

class EventBus {
  private events = new Map<string, Set<EventCallback>>();

  /**
   * 이벤트 발생
   */
  emit<T = any>(event: string, data: T): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[EventBus] 이벤트 ${event} 처리 중 오류:`, error);
        }
      });
    }
  }

  /**
   * 이벤트 구독
   */
  on<T = any>(event: string, callback: EventCallback<T>): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event)!.add(callback);

    // 구독 해제 함수 반환
    return () => {
      this.off(event, callback);
    };
  }

  /**
   * 이벤트 구독 해제
   */
  off<T = any>(event: string, callback: EventCallback<T>): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.events.delete(event);
      }
    }
  }

  /**
   * 특정 이벤트의 모든 구독 해제
   */
  offAll(event: string): void {
    this.events.delete(event);
  }

  /**
   * 모든 이벤트 구독 해제
   */
  clear(): void {
    this.events.clear();
  }

  /**
   * 이벤트 구독자 수 확인
   */
  getListenerCount(event: string): number {
    return this.events.get(event)?.size || 0;
  }

  /**
   * 모든 이벤트 목록 확인
   */
  getEvents(): string[] {
    return Array.from(this.events.keys());
  }
}

// 전역 EventBus 인스턴스
const globalEventBus = new EventBus();

/**
 * Event Bus Composable
 */
export function useEventBus() {
  const subscriptions: Array<() => void> = [];

  /**
   * 이벤트 구독 (자동 정리)
   */
  const on = <T = any>(event: string, callback: EventCallback<T>): void => {
    const unsubscribe = globalEventBus.on(event, callback);
    subscriptions.push(unsubscribe);
  };

  /**
   * 이벤트 발생
   */
  const emit = <T = any>(event: string, data: T): void => {
    globalEventBus.emit(event, data);
  };

  /**
   * 컴포넌트 언마운트 시 자동으로 모든 구독 해제
   */
  onUnmounted(() => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
    subscriptions.length = 0;
  });

  return {
    on,
    emit,
  };
}

/**
 * 전역 EventBus 인스턴스 직접 접근 (필요시)
 */
export { globalEventBus };

/**
 * 이벤트 타입 정의
 */
export const MARKET_EVENTS = {
  DATA_UPDATED: 'market:data-updated',
  SYMBOL_SELECTED: 'market:symbol-selected',
  CONNECTION_STATUS_CHANGED: 'market:connection-status-changed',
} as const;

export const WEBSOCKET_EVENTS = {
  CONNECTED: 'websocket:connected',
  DISCONNECTED: 'websocket:disconnected',
  MESSAGE_RECEIVED: 'websocket:message-received',
  ERROR: 'websocket:error',
} as const;

export const ORDER_EVENTS = {
  ORDER_PLACED: 'order:placed',
  ORDER_UPDATED: 'order:updated',
  ORDER_CANCELLED: 'order:cancelled',
} as const;
