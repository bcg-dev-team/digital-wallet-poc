# 실시간 데이터 동기화 아키텍처

## 개요

이 문서는 Vue3 모노레포 프로젝트에서 실시간 데이터 동기화를 위한 **통합 데이터 소스 관리 아키텍처**를 설명합니다. WebSocket과 MSW(Mock Service Worker)를 통합하여 개발 환경과 프로덕션 환경을 일관되게 관리합니다.

## 아키텍처 구조

```
 ┌───────────────────────────────────────────────────────────────┐
 │                    View Components Layer                      │
 │  ┌─────────────┐ ┌──────────────┐ ┌─────────────┐ ┌─────────┐ │
 │  │ TradingView │ │ BaseDataGrid │ │ Order Panel │ │ Symbol  │ │
 │  │    Chart    │ │  Component   │ │  Component  │ │  List   │ │
 │  └─────────────┘ └──────────────┘ └─────────────┘ └─────────┘ │
 └───────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                Composables & State Management                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐ │
│  │ useSelected │ │  useSymbol  │ │ useRealtime │ │ useSymbol  │ │
│  │   Symbol    │ │    Data     │ │   Config    │ │ Visibility │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
  ┌─────────────────────────────────────────────────────────────┐
  │                  Unified Data Source Manager                │
  │  ┌────────────────────────────────────────────────────────┐ │
  │  │              Data Source Abstraction Layer             │ │
  │  │  ┌─────────────┐ ┌─────────────┐ ┌───────────────────┐ │ │
  │  │  │  WebSocket  │ │     MSW     │ │   Configuration   │ │ │
  │  │  │   Manager   │ │   Manager   │ │      Manager      │ │ │
  │  │  └─────────────┘ └─────────────┘ └───────────────────┘ │ │
  │  └────────────────────────────────────────────────────────┘ │
  └─────────────────────────────────────────────────────────────┘
                                │
                                ▼
     ┌────────────────────────────────────────────────────────┐
     │                    Data Sources Layer                  │
     │  ┌────────────────┐ ┌─────────────┐ ┌────────────────┐ │
     │  │ Real WebSocket │ │  MSW Mock   │ │   TradingView  │ │
     │  │   Connection   │ │  WebSocket  │ │   Datafeed     │ │
     │  └────────────────┘ └─────────────┘ └────────────────┘ │
     └────────────────────────────────────────────────────────┘
```

## 1. 통합 데이터 소스 관리자 (DataSourceManager)

### 핵심 구성요소

- **`DataSourceManager`**: WebSocket과 MSW를 통합 관리하는 싱글톤 클래스
- **`WebSocketManager`**: 실제 WebSocket 연결 및 메시지 처리
- **`MockWebSocketHandler`**: MSW 기반 모킹 WebSocket 관리
- **`getDataSourceConfig`**: 환경별 데이터 소스 설정 관리

### 주요 기능

- **환경별 데이터 소스 선택**: 개발 환경(MSW) vs 프로덕션 환경(WebSocket)
- **통합 구독 관리**: 심볼별 구독 상태 및 콜백 관리
- **자동 재연결**: 연결 끊김 시 지수 백오프를 통한 재연결
- **배치 업데이트**: MSW에서 100ms 간격으로 데이터 배치 처리
- **성능 최적화**: 선택된 종목만 업데이트하는 최적화

### 사용 예시

```typescript
import { dataSourceManager } from '@/services/DataSourceManager'

// 데이터 소스 초기화
await dataSourceManager.initialize()

// 심볼 구독
const subscriptionId = dataSourceManager.subscribe('EURUSD', (data) => {
  console.log('실시간 데이터:', data)
})

// 구독 해제
dataSourceManager.unsubscribe(subscriptionId)

// 연결 상태 확인
const isConnected = dataSourceManager.isConnected()
```

## 2. Composables & State Management Layer

### 핵심 구성요소

- **`useSelectedSymbol`**: 전역 심볼 상태 및 실시간 가격 관리
- **`useSymbolData`**: 심볼 목록 및 필터링 관리
- **`useRealtimeConfig`**: 실시간 업데이트 설정 관리
- **`useSymbolVisibility`**: 화면에 보이는 심볼 관리

### 주요 기능

- **전역 심볼 상태 관리**: 선택된 심볼의 실시간 가격, 변동률, 스프레드 계산
- **가시성 기반 구독**: 화면에 보이는 심볼만 구독하여 성능 최적화
- **실시간 설정 관리**: 업데이트 간격, 데이터 소스 설정 등
- **스프레드 계산**: 심볼 타입별 차별화된 스프레드 적용
- **이벤트 기반 업데이트**: 심볼 변경 시 자동 알림

### 사용 예시

```typescript
import { selectedSymbolInstance } from '@/composables/useSelectedSymbol'

// 선택된 심볼의 실시간 가격
const currentPrice = selectedSymbolInstance.currentPrice.value
const changePercent = selectedSymbolInstance.changePercent.value
const buyPrice = selectedSymbolInstance.buyPrice.value
const sellPrice = selectedSymbolInstance.sellPrice.value

// 심볼 변경
selectedSymbolInstance.setSelectedSymbol('EURUSD')

// 심볼 변경 이벤트 구독
const unsubscribe = selectedSymbolInstance.onSymbolChange((symbol) => {
  console.log('심볼 변경:', symbol)
})

// 보이는 심볼 추가/제거
selectedSymbolInstance.addVisibleSymbols('SymbolList', ['EURUSD', 'GBPUSD'])
selectedSymbolInstance.removeVisibleSymbols('SymbolList', ['EURUSD'])
```

## 3. View Components Layer

### 핵심 구성요소

- **`TradingViewChart`**: TradingView 차트 컴포넌트와 실시간 데이터 연동
- **`BaseDataGrid`**: AG-Grid 기반 고성능 데이터 그리드
- **`OrderPanel`**: 실시간 가격 기반 주문 패널
- **`SymbolList`**: 심볼 선택 및 관심종목 관리

### 주요 기능

- **실시간 차트 업데이트**: TradingView 차트에 실시간 Bar 데이터 스트리밍
- **고성능 데이터 그리드**: 가상화를 통한 대용량 데이터 처리
- **실시간 가격 표시**: 선택된 심볼의 실시간 가격 및 스프레드 표시
- **심볼 관리**: 관심종목 추가/제거 및 검색 기능
- **반응형 UI**: 다양한 화면 크기에 대응하는 반응형 레이아웃

### 사용 예시

```vue
<template>
  <div class="trading-interface">
    <!-- 실시간 차트 -->
    <TradingViewChart 
      :symbol="selectedSymbol" 
      @chart-ready="onChartReady"
    />
    
    <!-- 심볼 리스트 -->
    <SymbolList 
      @symbol-select="onSymbolSelect"
      :visible-symbols="visibleSymbols"
    />
    
    <!-- 주문 패널 -->
    <OrderPanel 
      :selected-symbol="selectedSymbol"
      :current-price="currentPrice"
      :buy-price="buyPrice"
      :sell-price="sellPrice"
    />
    
    <!-- 실시간 데이터 그리드 -->
    <BaseDataGrid 
      :column-defs="columnDefs"
      :row-data="marketData"
      :pagination="true"
    />
  </div>
</template>

<script setup lang="ts">
import { selectedSymbolInstance } from '@/composables/useSelectedSymbol'
import { useSymbolData } from '@/composables/useSymbolData'

const {
  selectedSymbol,
  currentPrice,
  buyPrice,
  sellPrice,
  marketData
} = selectedSymbolInstance

const {
  visibleSymbols,
  addVisibleSymbols,
  removeVisibleSymbols
} = useSymbolData()

// 심볼 선택 이벤트
const onSymbolSelect = (symbol: TradingSymbol) => {
  selectedSymbolInstance.setSelectedSymbol(symbol.ticker)
}

// 차트 준비 완료 이벤트
const onChartReady = () => {
  console.log('차트 준비 완료')
}
</script>
```

## 4. TradingView 차트 연동 시스템

### 핵심 구성요소

- **`TradingView Datafeed`**: TradingView 차트와 데이터 소스 연결
- **`Streaming Adapter`**: 실시간 데이터를 TradingView Bar 형식으로 변환
- **`Bar 연속성 관리`**: 시간 해상도별 Bar 생성 및 연속성 보장
- **`구독 관리`**: 심볼별 구독 상태 및 콜백 관리

### 주요 기능

- **실시간 Bar 생성**: 실시간 가격 데이터를 TradingView Bar 형식으로 변환
- **시간 해상도 지원**: 1분, 5분, 15분, 1시간, 1일 등 다양한 해상도
- **Bar 연속성 보장**: 이전 Bar의 종가를 다음 Bar의 시가로 사용
- **자동 재연결**: 연결 끊김 시 자동 재연결 및 구독 복원
- **성능 최적화**: 선택된 심볼만 업데이트하는 최적화

### 사용 예시

```typescript
// TradingView Datafeed 설정
const datafeed: TradingViewDatafeed = {
  onReady: (callback) => {
    callback({
      exchanges: [{ value: 'FOREX', name: 'Forex', desc: 'Foreign Exchange' }],
      symbols_types: [{ name: 'forex', value: 'forex' }],
      supported_resolutions: ['1', '5', '15', '30', '60', '240', '1D'],
      supports_marks: false,
      supports_timescale_marks: false,
    })
  },

  subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID) => {
    // MSW WebSocket 스트림 구독
    subscribeOnStream(symbolInfo, resolution, onRealtimeCallback, subscriberUID)
  },

  unsubscribeBars: (subscriberUID) => {
    // 구독 해제
    unsubscribeFromStream(subscriberUID)
  }
}
```

## 5. 데이터 흐름

### 실시간 데이터 흐름

1. **데이터 소스 선택**: 환경 설정에 따라 WebSocket 또는 MSW 선택
2. **실시간 데이터 수신**: 선택된 데이터 소스에서 실시간 데이터 수신
3. **통합 데이터 소스 관리**: DataSourceManager에서 데이터 통합 처리
4. **Composable 업데이트**: useSelectedSymbol 등 composable에서 상태 업데이트
5. **컴포넌트 반응형 업데이트**: Vue의 반응형 시스템을 통한 UI 업데이트

### MSW 배치 업데이트 흐름

1. **개별 심볼 업데이트**: 각 심볼별로 200-500ms 간격으로 가격 업데이트
2. **배치 큐에 추가**: 업데이트된 데이터를 100ms 배치 큐에 추가
3. **배치 처리**: 100ms마다 큐에 쌓인 모든 업데이트를 일괄 처리
4. **전역 함수 호출**: `updateMarketDataFromStream` 전역 함수를 통해 데이터 전달
5. **시장 데이터 업데이트**: useSelectedSymbol에서 시장 데이터 상태 업데이트

### TradingView 차트 흐름

1. **차트 구독**: TradingView 차트에서 심볼 구독 요청
2. **Bar 데이터 생성**: 실시간 가격을 TradingView Bar 형식으로 변환
3. **연속성 보장**: 이전 Bar의 종가를 다음 Bar의 시가로 사용
4. **차트 업데이트**: TradingView 차트에 실시간 Bar 데이터 전달
5. **UI 동기화**: 차트와 다른 UI 컴포넌트 간 데이터 동기화

## 6. 성능 최적화

### 1. 배치 업데이트 시스템
- **MSW 배치 처리**: 100ms 간격으로 여러 심볼 업데이트를 일괄 처리
- **UI 업데이트 최적화**: 배치 단위로 UI 업데이트하여 리렌더링 최소화
- **메모리 효율성**: 큐 기반 처리로 메모리 사용량 최적화

### 2. 가시성 기반 구독
- **선택적 구독**: 화면에 보이는 심볼만 구독하여 불필요한 처리 방지
- **동적 구독 관리**: 스크롤이나 탭 변경 시 구독 상태 동적 관리
- **메모리 정리**: 보이지 않는 심볼의 구독 자동 해제

### 3. AG-Grid 최적화
- **모듈 선택적 로딩**: 필요한 AG-Grid 모듈만 로드하여 번들 크기 최적화
- **가상화**: 대용량 데이터 처리를 위한 행/컬럼 가상화
- **지연 렌더링**: 컴포넌트 마운트 후 지연된 렌더링으로 초기 로딩 최적화

### 4. TradingView 차트 최적화
- **Bar 연속성 보장**: 정확한 Bar 생성으로 차트 성능 향상
- **해상도별 최적화**: 시간 해상도별 차별화된 처리
- **메모리 관리**: 사용하지 않는 구독 자동 정리

## 7. 에러 처리 및 복구

### 1. WebSocket 연결 에러
- **자동 재연결**: 지수 백오프를 통한 자동 재연결 (최대 5회)
- **연결 상태 관리**: 연결 상태를 실시간으로 모니터링 및 표시
- **에러 분류**: DNS, SSL/TLS, 타임아웃 등 에러 유형별 처리
- **하트비트**: 연결 상태 확인을 위한 주기적 하트비트 전송

### 2. MSW 모킹 에러
- **배치 처리 실패**: 배치 업데이트 실패 시 개별 처리로 폴백
- **메모리 누수 방지**: 정기적인 구독 정리 및 메모리 관리
- **데이터 검증**: 수신된 데이터의 유효성 검증 및 오류 데이터 필터링

### 3. TradingView 차트 에러
- **Bar 연속성 오류**: 시간 역전이나 연속성 오류 시 데이터 보정
- **구독 실패**: 구독 실패 시 자동 재시도 및 에러 로깅
- **차트 초기화 실패**: 차트 초기화 실패 시 재시도 및 폴백 처리

## 8. 모니터링 및 디버깅

### 1. 연결 상태 모니터링
```typescript
import { dataSourceManager } from '@/services/DataSourceManager'
import { selectedSymbolInstance } from '@/composables/useSelectedSymbol'

// 연결 상태 확인
const isConnected = dataSourceManager.isConnected()
const connectionStatus = selectedSymbolInstance.connectionStatus.value

console.log('데이터 소스 연결 상태:', isConnected)
console.log('연결 상태:', connectionStatus)
```

### 2. 구독 상태 모니터링
```typescript
import { getSubscriptionStatus } from '@/adapters/tradingview/streaming'

// TradingView 구독 상태 확인
const subscriptionStatus = getSubscriptionStatus()
console.log('구독 상태:', {
  connected: subscriptionStatus.connected,
  totalSubscriptions: subscriptionStatus.totalSubscriptions,
  symbolCounts: subscriptionStatus.symbolCounts
})
```

### 3. 실시간 설정 모니터링
```typescript
import { useRealtimeConfig } from '@/composables/useRealtimeConfig'

const realtimeConfig = useRealtimeConfig()
const config = realtimeConfig.getConfig()

console.log('실시간 설정:', {
  marketInterval: config.market.interval,
  useWebSocket: config.dataSource.useWebSocket,
  updateCounts: realtimeConfig.getUpdateCounts()
})
```

### 4. 성능 모니터링
```typescript
// MSW 배치 업데이트 모니터링
if (typeof window !== 'undefined' && (window as any).mockWebSocketManager) {
  const mockManager = (window as any).mockWebSocketManager
  console.log('MSW 상태:', {
    subscriptions: mockManager.subscriptions.size,
    intervals: mockManager.intervals.size,
    updateQueue: mockManager.updateQueue.size
  })
}
```

## 9. 확장성 및 유지보수

### 1. 새로운 데이터 소스 추가
- **DataSourceManager 확장**: 새로운 데이터 소스 타입 추가
- **설정 기반 선택**: 환경 설정을 통한 데이터 소스 선택
- **인터페이스 표준화**: 일관된 구독/해제 인터페이스 제공

### 2. 새로운 심볼 타입 지원
- **타입 정의 확장**: `packages/types/src/market/symbol.ts`에 새로운 심볼 타입 추가
- **스프레드 계산 로직**: 심볼 타입별 차별화된 스프레드 계산
- **UI 컴포넌트 확장**: 새로운 심볼 타입에 맞는 UI 컴포넌트 추가

### 3. 성능 최적화 확장
- **배치 크기 조정**: 환경에 따른 배치 업데이트 간격 조정
- **메모리 관리**: 대용량 데이터 처리를 위한 메모리 관리 전략
- **캐싱 전략**: 자주 사용되는 데이터의 캐싱 전략

## 10. 보안 고려사항

### 1. WebSocket 보안
- **WSS 사용**: 프로덕션 환경에서 암호화된 WebSocket 연결 사용
- **인증 토큰**: WebSocket 연결 시 인증 토큰 검증
- **메시지 검증**: 수신된 메시지의 유효성 검증

### 2. 데이터 검증
- **타입 안전성**: TypeScript를 통한 컴파일 타임 타입 검증
- **런타임 검증**: 수신된 데이터의 런타임 검증
- **악의적 데이터 차단**: 잘못된 형식의 데이터 필터링

### 3. 환경별 보안
- **개발 환경**: MSW를 통한 안전한 모킹 데이터 사용
- **프로덕션 환경**: 실제 WebSocket 연결의 보안 강화
- **설정 분리**: 환경별 보안 설정 분리

## 11. 결론

이 **통합 데이터 소스 관리 아키텍처**는 실시간 데이터 동기화를 위한 확장 가능하고 유지보수가 용이한 구조를 제공합니다. 

### 주요 장점

1. **환경 통합**: 개발(MSW)과 프로덕션(WebSocket) 환경을 일관되게 관리
2. **성능 최적화**: 배치 업데이트와 가시성 기반 구독으로 성능 최적화
3. **확장성**: 새로운 데이터 소스나 심볼 타입을 쉽게 추가 가능
4. **유지보수성**: 명확한 책임 분리와 모듈화된 구조
5. **디버깅**: 포괄적인 모니터링 및 디버깅 도구 제공

### 핵심 설계 원칙

- **단일 책임 원칙**: 각 모듈이 하나의 명확한 책임을 가짐
- **의존성 역전**: 고수준 모듈이 저수준 모듈에 의존하지 않음
- **개방-폐쇄 원칙**: 확장에는 열려있고 수정에는 닫혀있음
- **인터페이스 분리**: 클라이언트가 사용하지 않는 인터페이스에 의존하지 않음

이 아키텍처를 통해 실시간 트레이딩 시스템의 핵심 요구사항인 **실시간성**, **정확성**, **성능**, **확장성**을 모두 만족할 수 있습니다.

