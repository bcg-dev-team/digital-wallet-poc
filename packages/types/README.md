# @template/types

공통 타입 정의 패키지입니다. 모노레포 전체에서 사용되는 TypeScript 타입들을 중앙에서 관리합니다.

## 📦 설치

```bash
pnpm add @template/types
```

## 🚀 사용법

```typescript
import type { 
  TradingSymbol,
  ChartLayout,
  ChartSettings,
  PositionType,
  PasswordStrengthDisplay
} from '@template/types'

// 거래 심볼 타입
const symbol: TradingSymbol = {
  symbol: 'EURUSD',
  ticker: 'EURUSD',
  description: 'EUR / USD',
  exchange: 'FOREX',
  type: 'forex'
}

// 차트 레이아웃
const layout: ChartLayout = '2x2'

// 포지션 타입
const position: PositionType = 'LONG'
```

## 📁 파일 구조

```
src/
├── index.ts          # 메인 진입점
├── common.ts         # 공통 타입 정의 (PositionType)
├── auth.ts           # 비밀번호 강도 관련 타입
├── chart.ts          # 차트 관련 타입
└── market/
    ├── index.ts      # 마켓 타입 진입점
    └── symbol.ts     # 심볼 관련 타입
```

## 🔧 주요 타입

### 차트 관련 타입

#### ChartLayout
차트 레이아웃 타입입니다.

```typescript
type ChartLayout = '1x1' | '2x2' | '3x3' | '4x4'
```

#### ChartSettings
차트 설정 인터페이스입니다.

```typescript
interface ChartSettings {
  basic: {
    theme: 'redBlue' | 'greenRed'
    precision: string
    timezone: string
    locale?: string
  }
  symbols: {
    showSymbolName: boolean
    showChartValues: boolean
    // ... 기타 설정
  }
  scales: {
    showPriceLabels: boolean
    showGridLines: boolean
    // ... 기타 설정
  }
  trading: {
    showBuySellButtons: boolean
    instantOrderExecution: boolean
    // ... 기타 설정
  }
}
```

#### ChartData
개별 차트 데이터입니다.

```typescript
interface ChartData {
  id: string
  symbol: TradingSymbol
  timeframe: string
  isSelected: boolean
  syncColor?: string
  position: { row: number; col: number }
}
```

### 마켓 관련 타입

#### TradingSymbol
거래 심볼 인터페이스입니다.

```typescript
interface TradingSymbol {
  symbol: string
  ticker: string
  description: string
  exchange: string
  type: string
}
```

#### SymbolData
심볼 가격 데이터입니다.

```typescript
interface SymbolData {
  symbol: string
  price: number
  change: number
  changePercent: number
  volume: number
  high: number
  low: number
  open: number
  close: number
  timestamp: number
}
```

### 공통 타입

#### PositionType
포지션 타입입니다.

```typescript
type PositionType = 'LONG' | 'SHORT'
```

### 인증 관련 타입

#### PasswordStrengthDisplay
비밀번호 강도 표시 타입입니다.

```typescript
interface PasswordStrengthDisplay {
  score: 0 | 1 | 2 | 3 | 4
  label: '매우 약함' | '약함' | '보통' | '강함' | '매우 강함'
  color: 'red' | 'orange' | 'yellow' | 'light-green' | 'green'
  progressColor: string
  feedback: string[]
  crackTime: string | number
}
```

## 🛠️ 개발

### 빌드

```bash
# 타입 체크
pnpm type-check

# 빌드
pnpm build

# 개발 모드 (watch)
pnpm dev
```

## 📊 상수 데이터

### CHART_TIMEFRAMES
차트 시간대 옵션입니다.

```typescript
const CHART_TIMEFRAMES = [
  { value: '1m', label: '1m' },
  { value: '5m', label: '5m' },
  { value: '15m', label: '15m' },
  // ... 기타 시간대
]
```

### ALL_SYMBOLS
전체 거래 심볼 목록입니다.

```typescript
const ALL_SYMBOLS: TradingSymbol[]
```

### DEFAULT_FOREX_SYMBOLS
기본 외환 심볼 데이터입니다.

```typescript
const DEFAULT_FOREX_SYMBOLS: readonly TradingSymbol[]
```
