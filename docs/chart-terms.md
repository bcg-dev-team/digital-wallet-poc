# 차트 용어 사전 (Chart Terms)

차트 개발에서 사용되는 핵심 용어들과 개념을 정리합니다.

## 📝 핵심 용어들

### 1. **Timeframe (시간대)**
- **정의**: 사용자가 차트에서 보는 시간 간격
- **사용 위치**: UI 컴포넌트, 사용자 인터페이스
- **예시**: `"1m"`, `"5m"`, `"1h"`, `"1d"`, `"1w"`
- **코드 예시**:
```typescript
const handleTimeframeChange = (timeframe: string) => {
  emit('timeframe-change', timeframe);  // 1m, 5m, 1h, 1d
};
```

### 2. **Interval (간격)**
- **정의**: API 호출 시 사용하는 데이터 요청 간격
- **사용 위치**: TradingView API, 외부 데이터 API
- **예시**: `"1"`, `"5"`, `"60"`, `"1D"`
- **코드 예시**:
```typescript
await chartManager.initializeChart({
  symbol: props.symbol,
  interval: '1',  // 1분 간격
});
```

### 3. **Resolution (해상도)**
- **정의**: TradingView 라이브러리 내부에서 사용하는 시간 단위
- **사용 위치**: TradingView 차트 렌더링, 바 데이터 처리
- **예시**: `"1"`, `"5"`, `"D"`, `"W"`
- **코드 예시**:
```typescript
function getBarStartTime(timestamp: number, resolution: string): number {
  // resolution을 사용해 Bar 시작 시간 계산
}
```

### 4. **Symbol (심볼)**
- **정의**: 거래되는 금융 상품의 고유 식별자
- **구성**: 기본 자산 + 견적 통화 (예: EUR/USD)
- **예시**: `"EURUSD"`, `"BTCUSD"`, `"AAPL"`
- **코드 예시**:
```typescript
interface TradingSymbol {
  ticker: string;        // "EURUSD"
  description: string;   // "Euro / US Dollar"
  category: string;      // "Forex"
}
```

### 5. **ChartData (차트 데이터)**
- **정의**: 개별 차트의 모든 정보를 담은 데이터 구조
- **포함 요소**: ID, 심볼, 시간대, 선택 상태, 위치 등
- **코드 예시**:
```typescript
interface ChartData {
  id: string;
  symbol: TradingSymbol;
  timeframe: string;
  isSelected: boolean;
  position: number;
}
```

### 6. **ChartLayout (차트 레이아웃)**
- **정의**: 여러 차트를 배치하는 그리드 레이아웃
- **타입**: `'1x1' | '2x2' | '3x3' | '4x4'`
- **용도**: 화면에 표시할 차트 개수 결정
- **코드 예시**:
```typescript
const layout: ChartLayout = '2x2';  // 2x2 그리드
const chartCount = getChartCountForLayout(layout);  // 4개 차트
```

### 7. **ChartManager (차트 매니저)**
- **정의**: TradingView 차트 인스턴스를 관리하는 클래스
- **역할**: 차트 초기화, 데이터 업데이트, 설정 관리
- **사용 위치**: TradingViewChart 컴포넌트 내부
- **코드 예시**:
```typescript
const chartManager = new ChartManager();
await chartManager.initializeChart({
  symbol: 'EURUSD',
  interval: '1'
});
```

### 8. **Sync Color (동기화 색상)**
- **정의**: 여러 차트 간의 연관성을 나타내는 색상
- **용도**: 차트 그룹핑, 시각적 구분
- **예시**: `"#2962FF"`, `"#FF6B6B"`, `"#4ECDC4"`
- **코드 예시**:
```typescript
const SYNC_COLORS = [
  { value: '#2962FF', label: 'A' },
  { value: '#FF6B6B', label: 'B' },
  { value: '#4ECDC4', label: 'C' }
];
```

## 🎯 용어 사용 요약

| **용도** | **사용 용어** | **예시** | **사용 위치** |
|---------|------------|---------|-------------|
| **UI 표시** | `timeframe` | "1m", "5m", "1h", "1d" | ChartTopToolbar, ChartWindow |
| **API 호출** | `interval` | "1", "5", "60", "1D" | ChartManager, API 서비스 |
| **라이브러리** | `resolution` | "1", "5", "D", "W" | TradingView 내부 |
| **데이터 식별** | `symbol` | "EURUSD", "BTCUSD" | 모든 차트 관련 컴포넌트 |
| **레이아웃** | `layout` | "2x2", "3x3" | MultiChartLayout |
| **관리** | `chartManager` | ChartManager 인스턴스 | TradingViewChart |

## 🔄 용어 변환

### Timeframe → Interval 변환
```typescript
function timeframeToInterval(timeframe: string): string {
  const mapping: Record<string, string> = {
    '1m': '1',
    '5m': '5',
    '15m': '15',
    '30m': '30',
    '1h': '60',
    '4h': '240',
    '1d': '1D',
    '1w': '1W'
  };
  return mapping[timeframe] || '1';
}
```

### Interval → Resolution 변환
```typescript
function intervalToResolution(interval: string): string {
  // TradingView는 interval과 resolution이 동일한 형식 사용
  return interval;
}
```
