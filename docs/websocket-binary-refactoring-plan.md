# WebSocket 바이너리 메시지 리팩토링 계획

## 📋 목차
1. [현황 분석](#현황-분석)
2. [리팩토링 전략](#리팩토링-전략)
3. [구현 단계](#구현-단계)
4. [마이그레이션 가이드](#마이그레이션-가이드)
5. [성능 최적화](#성능-최적화)
6. [테스트 전략](#테스트-전략)

---

## 현황 분석

### 기존 아키텍처
```
┌─────────────┐
│  WebSocket  │
│   Server    │
└──────┬──────┘
       │ JSON 메시지
       ▼
┌─────────────────────────────┐
│  RealWebSocketService       │
│  - JSON.parse(event.data)   │
│  - handleMessage(data)      │
└──────┬──────────────────────┘
       │
       ├─→ MARKET_QUOTE
       ├─→ MARKET_ORDER_BOOK
       ├─→ ORDER_ACCEPTED
       └─→ ACCOUNT_BALANCE
```

### Protocol Buffers 메시지 타입

| 메시지 타입 | 용도 | 필드 |
|------------|------|------|
| `MarketQuote` | 시장 시세 | stockCd, bid, ask, bidSize, askSize, timestamp |
| `MarketQuoteList` | 시세 목록 | quotes[] |
| `MarketOrderBook` | 호가 데이터 | stockCd, quotes[], timestamp |
| `OrderBookCancel` | 호가 취소 | cancelType, stockCd, timestamp |
| `OrderReceived` | 주문 접수 | accountNo, orderDate, orderNo, stockCd, ... |
| `OrderRejected` | 주문 거부 | accountNo, orderDate, orderNo, ... |
| `OrderExecuted` | 주문 체결 | accountNo, orderDate, orderNo, executionPrice, ... |
| `BalanceUpdated` | 잔고 업데이트 | accountNo, stockCd, bookQuantity, ... |
| `OrderLimitQueued` | 주문 대기 | accountNo, orderDate, orderNo |

---

## 리팩토링 전략

### 설계 원칙

1. **점진적 마이그레이션**: JSON과 바이너리 동시 지원 → 바이너리로 완전 전환
2. **타입 안전성**: Protocol Buffers 타입 정의 활용
3. **성능 최적화**: 바이너리 처리로 네트워크 전송량 감소
4. **하위 호환성**: Mock 서비스도 바이너리 지원

### 새로운 아키텍처

```
┌─────────────┐
│  WebSocket  │
│   Server    │
└──────┬──────┘
       │ Binary (Protocol Buffers)
       ▼
┌──────────────────────────────────┐
│  BinaryMessageDecoder            │
│  - detectMessageType()           │
│  - decodeMarketQuote()           │
│  - decodeMarketOrderBook()       │
│  - decodeOrderReceived()         │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  RealWebSocketService            │
│  - handleBinaryMessage()         │
│  - handleMessage(decodedData)    │
└──────┬───────────────────────────┘
       │
       ├─→ MARKET_QUOTE
       ├─→ MARKET_ORDER_BOOK
       ├─→ ORDER_RECEIVED
       └─→ BALANCE_UPDATED
```

---

## 구현 단계

### Phase 1: 기반 구축 (1-2일)

#### 1.1 Protocol Buffers 설정

```bash
# 1. 의존성 설치
cd packages/types
pnpm add protobufjs long

# 2. protobuf 타입 파일 복사
mkdir -p src/proto
cp /path/to/realtime_message.d.ts src/proto/
```

**파일 구조**:
```
packages/types/src/
├── proto/
│   ├── realtime_message.d.ts    # TypeScript 타입 정의
│   └── realtime_message.js      # protobufjs 생성 파일
├── services/
│   └── websocket.ts
└── index.ts
```

#### 1.2 BinaryMessageDecoder 클래스 생성

**위치**: `packages/types/src/decoder/BinaryMessageDecoder.ts`

```typescript
import * as proto from '../proto/realtime_message';
import { Reader } from 'protobufjs';

/**
 * Protocol Buffers 바이너리 메시지 디코더
 */
export class BinaryMessageDecoder {
  /**
   * 메시지 타입 감지
   * @param data - ArrayBuffer 또는 Uint8Array
   */
  static detectMessageType(data: ArrayBuffer | Uint8Array): string {
    // 첫 바이트에서 메시지 타입 추출 (서버 구현에 따라 다름)
    const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
    
    // 예: 첫 바이트가 메시지 타입 ID
    const typeId = buffer[0];
    
    const typeMap: Record<number, string> = {
      1: 'MARKET_QUOTE',
      2: 'MARKET_QUOTE_LIST',
      3: 'MARKET_ORDER_BOOK',
      4: 'ORDER_BOOK_CANCEL',
      5: 'ORDER_RECEIVED',
      6: 'ORDER_REJECTED',
      7: 'ORDER_EXECUTED',
      8: 'BALANCE_UPDATED',
      9: 'ORDER_LIMIT_QUEUED',
    };
    
    return typeMap[typeId] || 'UNKNOWN';
  }

  /**
   * MarketQuote 디코딩
   */
  static decodeMarketQuote(data: ArrayBuffer | Uint8Array): proto.IMarketQuote {
    try {
      const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
      // 첫 바이트(타입 ID)를 제외한 나머지 데이터
      const payload = buffer.slice(1);
      
      const decoded = proto.MarketQuote.decode(payload);
      return proto.MarketQuote.toObject(decoded);
    } catch (error) {
      console.error('[BinaryMessageDecoder] MarketQuote 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * MarketQuoteList 디코딩
   */
  static decodeMarketQuoteList(data: ArrayBuffer | Uint8Array): proto.IMarketQuoteList {
    try {
      const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
      const payload = buffer.slice(1);
      
      const decoded = proto.MarketQuoteList.decode(payload);
      return proto.MarketQuoteList.toObject(decoded);
    } catch (error) {
      console.error('[BinaryMessageDecoder] MarketQuoteList 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * MarketOrderBook 디코딩
   */
  static decodeMarketOrderBook(data: ArrayBuffer | Uint8Array): proto.IMarketOrderBook {
    try {
      const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
      const payload = buffer.slice(1);
      
      const decoded = proto.MarketOrderBook.decode(payload);
      return proto.MarketOrderBook.toObject(decoded);
    } catch (error) {
      console.error('[BinaryMessageDecoder] MarketOrderBook 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * OrderReceived 디코딩
   */
  static decodeOrderReceived(data: ArrayBuffer | Uint8Array): proto.IOrderReceived {
    try {
      const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
      const payload = buffer.slice(1);
      
      const decoded = proto.OrderReceived.decode(payload);
      return proto.OrderReceived.toObject(decoded);
    } catch (error) {
      console.error('[BinaryMessageDecoder] OrderReceived 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * OrderExecuted 디코딩
   */
  static decodeOrderExecuted(data: ArrayBuffer | Uint8Array): proto.IOrderExecuted {
    try {
      const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
      const payload = buffer.slice(1);
      
      const decoded = proto.OrderExecuted.decode(payload);
      return proto.OrderExecuted.toObject(decoded);
    } catch (error) {
      console.error('[BinaryMessageDecoder] OrderExecuted 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * BalanceUpdated 디코딩
   */
  static decodeBalanceUpdated(data: ArrayBuffer | Uint8Array): proto.IBalanceUpdated {
    try {
      const buffer = data instanceof ArrayBuffer ? new Uint8Array(data) : data;
      const payload = buffer.slice(1);
      
      const decoded = proto.BalanceUpdated.decode(payload);
      return proto.BalanceUpdated.toObject(decoded);
    } catch (error) {
      console.error('[BinaryMessageDecoder] BalanceUpdated 디코딩 실패:', error);
      throw error;
    }
  }

  /**
   * 통합 디코딩 함수
   */
  static decode(data: ArrayBuffer | Uint8Array): any {
    const messageType = this.detectMessageType(data);
    
    switch (messageType) {
      case 'MARKET_QUOTE':
        return { 
          messageType, 
          data: this.decodeMarketQuote(data) 
        };
      case 'MARKET_QUOTE_LIST':
        return { 
          messageType, 
          data: this.decodeMarketQuoteList(data) 
        };
      case 'MARKET_ORDER_BOOK':
        return { 
          messageType, 
          data: this.decodeMarketOrderBook(data) 
        };
      case 'ORDER_RECEIVED':
        return { 
          messageType, 
          data: this.decodeOrderReceived(data) 
        };
      case 'ORDER_EXECUTED':
        return { 
          messageType, 
          data: this.decodeOrderExecuted(data) 
        };
      case 'BALANCE_UPDATED':
        return { 
          messageType, 
          data: this.decodeBalanceUpdated(data) 
        };
      default:
        throw new Error(`알 수 없는 메시지 타입: ${messageType}`);
    }
  }
}
```

#### 1.3 타입 정의 업데이트

**위치**: `packages/types/src/services/websocket.ts`

```typescript
// 기존 타입에 추가
export interface WebSocketBinaryMessage {
  messageType: string;
  data: any;
}

export interface WebSocketMessageFormat {
  type: 'json' | 'binary';
  data: any;
}
```

---

### Phase 2: RealWebSocketService 리팩토링 (2-3일)

#### 2.1 바이너리 메시지 처리 추가

**위치**: `apps/sample-desktop/src/services/websocket/RealWebSocketService.ts`

```typescript
import { BinaryMessageDecoder } from '@template/types/decoder/BinaryMessageDecoder';

export class RealWebSocketService implements IWebSocketService {
  // ... 기존 코드 ...
  
  /**
   * WebSocket 연결
   */
  async connect(): Promise<void> {
    // ... 기존 코드 ...
    
    this.webSocket.onmessage = (event) => {
      try {
        // 바이너리 메시지 처리
        if (event.data instanceof ArrayBuffer || event.data instanceof Blob) {
          this.handleBinaryMessage(event.data);
        } 
        // JSON 메시지 처리 (하위 호환성)
        else if (typeof event.data === 'string') {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        }
      } catch (error) {
        console.error(
          '[RealWebSocketService] 메시지 파싱 오류:',
          error,
          '원시 데이터:',
          event.data
        );
      }
    };
  }

  /**
   * 바이너리 메시지 처리
   */
  private async handleBinaryMessage(data: ArrayBuffer | Blob): Promise<void> {
    try {
      // Blob을 ArrayBuffer로 변환
      const buffer = data instanceof Blob ? await data.arrayBuffer() : data;
      
      // Protocol Buffers 디코딩
      const decoded = BinaryMessageDecoder.decode(buffer);
      
      // 디코딩된 메시지를 기존 핸들러로 전달
      this.handleDecodedMessage(decoded);
      
    } catch (error) {
      console.error('[RealWebSocketService] 바이너리 메시지 처리 오류:', error);
    }
  }

  /**
   * 디코딩된 메시지 처리
   */
  private handleDecodedMessage(decoded: any): void {
    const { messageType, data } = decoded;
    
    switch (messageType) {
      case 'MARKET_QUOTE':
        this.handleMarketQuoteFromBinary(data);
        break;
      case 'MARKET_QUOTE_LIST':
        this.handleMarketQuoteListFromBinary(data);
        break;
      case 'MARKET_ORDER_BOOK':
        this.handleMarketOrderBookFromBinary(data);
        break;
      case 'ORDER_RECEIVED':
        this.handleOrderReceivedFromBinary(data);
        break;
      case 'ORDER_EXECUTED':
        this.handleOrderExecutedFromBinary(data);
        break;
      case 'BALANCE_UPDATED':
        this.handleBalanceUpdatedFromBinary(data);
        break;
      default:
        console.warn('[RealWebSocketService] 알 수 없는 메시지 타입:', messageType);
    }
  }

  /**
   * 바이너리에서 디코딩된 MarketQuote 처리
   */
  private handleMarketQuoteFromBinary(data: proto.IMarketQuote): void {
    const { stockCd, bid, ask, bidSize, askSize, timestamp } = data;
    
    // Long 타입 처리
    const ts = typeof timestamp === 'object' && 'toNumber' in timestamp 
      ? (timestamp as any).toNumber() 
      : Number(timestamp);
    
    // 기존 handleMarketQuote 로직 재사용
    const currentPrice = (bid! + ask!) / 2;
    
    const marketDataStore = useMarketDataStore();
    marketDataStore.updateMarketDataFromStream(stockCd!, {
      close: currentPrice,
      bid: bid!,
      ask: ask!,
      high: Math.max(bid!, ask!) * 1.0001,
      low: Math.min(bid!, ask!) * 0.9999,
      timestamp: ts,
    });

    globalEventBus.emit(MARKET_EVENTS.DATA_UPDATED, {
      symbol: stockCd,
      price: currentPrice,
      bid: bid,
      ask: ask,
      timestamp: ts,
    });
  }

  /**
   * 바이너리에서 디코딩된 MarketQuoteList 처리
   */
  private handleMarketQuoteListFromBinary(data: proto.IMarketQuoteList): void {
    const { quotes } = data;
    
    if (quotes && Array.isArray(quotes)) {
      quotes.forEach(quote => {
        this.handleMarketQuoteFromBinary(quote);
      });
    }
  }

  /**
   * 바이너리에서 디코딩된 MarketOrderBook 처리
   */
  private handleMarketOrderBookFromBinary(data: proto.IMarketOrderBook): void {
    const { stockCd, quotes, timestamp } = data;
    
    // Long 타입 처리
    const ts = typeof timestamp === 'object' && 'toNumber' in timestamp 
      ? (timestamp as any).toNumber() 
      : Number(timestamp);
    
    if (quotes && Array.isArray(quotes)) {
      const orderBookData = quotes.map((quote: proto.IQuote) => ({
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
              timestamp: ts,
            },
          })
        );
      }
    }
  }

  /**
   * 바이너리에서 디코딩된 OrderReceived 처리
   */
  private handleOrderReceivedFromBinary(data: proto.IOrderReceived): void {
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
            type: 'ORDER_RECEIVED',
            data: pendingOrderData,
            accountNo: data.accountNo,
          },
        })
      );
    }
  }

  /**
   * 바이너리에서 디코딩된 OrderExecuted 처리
   */
  private handleOrderExecutedFromBinary(data: proto.IOrderExecuted): void {
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
            type: 'ORDER_EXECUTED',
            data: executionData,
            accountNo: data.accountNo,
          },
        })
      );
    }
  }

  /**
   * 바이너리에서 디코딩된 BalanceUpdated 처리
   */
  private handleBalanceUpdatedFromBinary(data: proto.IBalanceUpdated): void {
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
  }
  
  // ... 기존 코드 ...
}
```

---

### Phase 3: Mock 서비스 업데이트 (1-2일)

#### 3.1 SimpleMockWebSocketService에 바이너리 지원 추가

**위치**: `apps/sample-desktop/src/services/websocket/SimpleMockWebSocketService.ts`

```typescript
import { BinaryMessageDecoder } from '@template/types/decoder/BinaryMessageDecoder';
import * as proto from '@template/types/proto/realtime_message';

export class SimpleMockWebSocketService implements IWebSocketService {
  // ... 기존 코드 ...
  
  /**
   * Mock 바이너리 메시지 생성
   */
  private generateMockBinaryMessage(messageType: string, data: any): ArrayBuffer {
    let encoded: Uint8Array;
    
    switch (messageType) {
      case 'MARKET_QUOTE':
        const marketQuote = proto.MarketQuote.create(data);
        encoded = proto.MarketQuote.encode(marketQuote).finish();
        break;
      case 'MARKET_ORDER_BOOK':
        const orderBook = proto.MarketOrderBook.create(data);
        encoded = proto.MarketOrderBook.encode(orderBook).finish();
        break;
      default:
        throw new Error(`지원하지 않는 메시지 타입: ${messageType}`);
    }
    
    // 타입 ID를 첫 바이트에 추가
    const typeId = this.getMessageTypeId(messageType);
    const buffer = new Uint8Array(encoded.length + 1);
    buffer[0] = typeId;
    buffer.set(encoded, 1);
    
    return buffer.buffer;
  }
  
  private getMessageTypeId(messageType: string): number {
    const typeMap: Record<string, number> = {
      'MARKET_QUOTE': 1,
      'MARKET_QUOTE_LIST': 2,
      'MARKET_ORDER_BOOK': 3,
      'ORDER_BOOK_CANCEL': 4,
      'ORDER_RECEIVED': 5,
      'ORDER_REJECTED': 6,
      'ORDER_EXECUTED': 7,
      'BALANCE_UPDATED': 8,
      'ORDER_LIMIT_QUEUED': 9,
    };
    return typeMap[messageType] || 0;
  }
}
```

---

### Phase 4: 테스트 및 검증 (2-3일)

#### 4.1 단위 테스트

**위치**: `packages/types/src/decoder/__tests__/BinaryMessageDecoder.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { BinaryMessageDecoder } from '../BinaryMessageDecoder';
import * as proto from '../../proto/realtime_message';

describe('BinaryMessageDecoder', () => {
  it('MarketQuote 메시지를 올바르게 디코딩해야 함', () => {
    // Mock 데이터 생성
    const mockQuote = proto.MarketQuote.create({
      stockCd: 'EURUSD',
      bid: 1.0850,
      ask: 1.0851,
      bidSize: 1000000,
      askSize: 1000000,
      timestamp: Date.now(),
    });
    
    // 인코딩
    const encoded = proto.MarketQuote.encode(mockQuote).finish();
    
    // 타입 ID 추가
    const buffer = new Uint8Array(encoded.length + 1);
    buffer[0] = 1; // MARKET_QUOTE
    buffer.set(encoded, 1);
    
    // 디코딩
    const decoded = BinaryMessageDecoder.decode(buffer);
    
    // 검증
    expect(decoded.messageType).toBe('MARKET_QUOTE');
    expect(decoded.data.stockCd).toBe('EURUSD');
    expect(decoded.data.bid).toBe(1.0850);
    expect(decoded.data.ask).toBe(1.0851);
  });
  
  it('MarketOrderBook 메시지를 올바르게 디코딩해야 함', () => {
    // Mock 데이터 생성
    const mockOrderBook = proto.MarketOrderBook.create({
      stockCd: 'EURUSD',
      quotes: [
        { bid: 1.0850, ask: 1.0851, bidSize: 1000000, askSize: 1000000 },
        { bid: 1.0849, ask: 1.0852, bidSize: 500000, askSize: 500000 },
      ],
      timestamp: Date.now(),
    });
    
    // 인코딩
    const encoded = proto.MarketOrderBook.encode(mockOrderBook).finish();
    
    // 타입 ID 추가
    const buffer = new Uint8Array(encoded.length + 1);
    buffer[0] = 3; // MARKET_ORDER_BOOK
    buffer.set(encoded, 1);
    
    // 디코딩
    const decoded = BinaryMessageDecoder.decode(buffer);
    
    // 검증
    expect(decoded.messageType).toBe('MARKET_ORDER_BOOK');
    expect(decoded.data.stockCd).toBe('EURUSD');
    expect(decoded.data.quotes).toHaveLength(2);
  });
});
```

#### 4.2 통합 테스트

**위치**: `apps/sample-desktop/src/services/websocket/__tests__/RealWebSocketService.binary.test.ts`

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { RealWebSocketService } from '../RealWebSocketService';
import * as proto from '@template/types/proto/realtime_message';

describe('RealWebSocketService - Binary Messages', () => {
  let service: RealWebSocketService;
  let mockWebSocket: any;
  
  beforeEach(() => {
    // WebSocket Mock 설정
    mockWebSocket = {
      readyState: WebSocket.OPEN,
      send: vi.fn(),
      close: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    
    global.WebSocket = vi.fn(() => mockWebSocket) as any;
    
    service = new RealWebSocketService();
  });
  
  afterEach(() => {
    service.cleanup();
  });
  
  it('바이너리 MarketQuote 메시지를 처리해야 함', async () => {
    await service.connect();
    
    // Mock 바이너리 메시지 생성
    const mockQuote = proto.MarketQuote.create({
      stockCd: 'EURUSD',
      bid: 1.0850,
      ask: 1.0851,
      bidSize: 1000000,
      askSize: 1000000,
      timestamp: Date.now(),
    });
    
    const encoded = proto.MarketQuote.encode(mockQuote).finish();
    const buffer = new Uint8Array(encoded.length + 1);
    buffer[0] = 1;
    buffer.set(encoded, 1);
    
    // onmessage 핸들러 호출
    const messageEvent = new MessageEvent('message', {
      data: buffer.buffer,
    });
    
    mockWebSocket.onmessage(messageEvent);
    
    // 검증 (Store나 Event Bus 확인)
    // ...
  });
});
```

---

## 마이그레이션 가이드

### 개발자 체크리스트

- [ ] **Phase 1**: Protocol Buffers 설정 및 디코더 구현
- [ ] **Phase 2**: RealWebSocketService 바이너리 처리 추가
- [ ] **Phase 3**: Mock 서비스 업데이트
- [ ] **Phase 4**: 단위 테스트 작성
- [ ] **Phase 5**: 통합 테스트 작성
- [ ] **Phase 6**: 성능 측정 및 최적화
- [ ] **Phase 7**: 문서 업데이트
- [ ] **Phase 8**: 프로덕션 배포

### 호환성 전략

1. **초기 단계 (1-2주)**:
   - JSON과 바이너리 메시지 동시 지원
   - 서버에서 `Content-Type` 헤더로 메시지 타입 구분
   
2. **전환 단계 (2-4주)**:
   - 모든 클라이언트가 바이너리 메시지 처리 가능 확인
   - 서버에서 바이너리 메시지만 전송
   
3. **완료 단계 (4주 이후)**:
   - JSON 메시지 처리 코드 제거
   - 바이너리 전용으로 전환

---

## 성능 최적화

### 예상 성능 향상

| 항목 | JSON | Binary | 개선율 |
|------|------|--------|--------|
| 메시지 크기 | ~500 bytes | ~200 bytes | **60% 감소** |
| 파싱 시간 | ~2ms | ~0.5ms | **75% 감소** |
| 네트워크 대역폭 | 100KB/s | 40KB/s | **60% 감소** |
| CPU 사용률 | 15% | 8% | **47% 감소** |

### 최적화 포인트

1. **메시지 풀링**: 자주 사용되는 메시지 객체 재사용
2. **배치 처리**: 여러 메시지를 한 번에 처리
3. **Worker 스레드**: 디코딩을 별도 스레드에서 처리
4. **캐싱**: 디코딩 결과 캐싱

```typescript
// 메시지 풀링 예제
class MessagePool {
  private pool: Map<string, any[]> = new Map();
  
  acquire(messageType: string): any {
    const pool = this.pool.get(messageType) || [];
    return pool.pop() || this.create(messageType);
  }
  
  release(messageType: string, message: any): void {
    const pool = this.pool.get(messageType) || [];
    if (pool.length < 100) { // 최대 100개까지 풀링
      pool.push(message);
      this.pool.set(messageType, pool);
    }
  }
  
  private create(messageType: string): any {
    // 메시지 타입별 객체 생성
    return {};
  }
}
```

---

## 테스트 전략

### 테스트 범위

1. **단위 테스트** (85% 커버리지 목표)
   - `BinaryMessageDecoder` 모든 메서드
   - 각 메시지 타입별 인코딩/디코딩
   - 에러 케이스 처리

2. **통합 테스트**
   - RealWebSocketService와 디코더 연동
   - Mock 서비스와 디코더 연동
   - End-to-end 메시지 흐름

3. **성능 테스트**
   - 대량 메시지 처리 (1000msg/s)
   - 메모리 누수 확인
   - CPU 사용률 모니터링

4. **호환성 테스트**
   - 서버 메시지 포맷 변경 대응
   - 버전별 메시지 호환성

---

## 참고 자료

- [Protocol Buffers 공식 문서](https://protobuf.dev/)
- [protobufjs GitHub](https://github.com/protobufjs/protobuf.js)
- [WebSocket Binary Data MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 2025-10-27 | 1.0.0 | 초안 작성 | AI Assistant |

---

## 다음 단계

1. ✅ 리팩토링 계획 수립 완료
2. ✅ Protocol Buffers 파일 준비 완료
   - `packages/types/src/proto/realtime_message.d.ts`
   - `packages/types/src/proto/realtime_message.js` (ESM)
3. ✅ BinaryMessageDecoder 구현 완료
   - `packages/types/src/decoder/BinaryMessageDecoder.ts`
4. ✅ RealWebSocketService 업데이트 완료
   - 바이너리 메시지 처리 추가
   - JSON 메시지 하위 호환성 유지
5. ⬜ 테스트 코드 작성
6. ⬜ SimpleMockWebSocketService 바이너리 지원 추가
7. ⬜ 프로덕션 배포

---

## 구현 완료 사항

### ✅ Phase 1: 기반 구축 (완료)

1. **의존성 추가**:
   ```json
   {
     "dependencies": {
       "protobufjs": "^7.2.5",
       "long": "^5.2.3"
     }
   }
   ```

2. **Protocol Buffers 파일 구성**:
   ```
   packages/types/src/proto/
   ├── realtime_message.d.ts    # TypeScript 타입 정의
   └── realtime_message.js      # ESM 런타임 구현
   ```

3. **BinaryMessageDecoder 클래스 구현**:
   - 메시지 타입 코드 감지
   - 7가지 메시지 타입 디코딩 지원
   - Long 타입 자동 변환

4. **RealWebSocketService 바이너리 지원**:
   - `handleBinaryMessage()`: 바이너리/Blob 처리
   - `handleDecodedMessage()`: 타입별 라우팅
   - 각 메시지 타입별 핸들러 구현
   - JSON 메시지 하위 호환성 유지

---

**문의사항이나 추가 논의가 필요한 부분이 있으면 알려주세요!**

