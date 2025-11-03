# AG Grid & Trading 유틸리티 가이드

## 개요

`@template/utils` 패키지는 AG Grid와 Trading 관련 유틸리티 함수들을 제공합니다.

- **AG Grid 유틸리티**: `aggrid/` - 데이터 그리드 포맷팅 및 스타일링
- **Trading 유틸리티**: `trading/` - 외환/주식 거래 계산 및 포맷팅

## 설치

```bash
pnpm add @template/utils
```

## 목차

- [AG Grid 유틸리티](#ag-grid-유틸리티)
  - [Formatter (`aggrid/formatter`)](#formatter-aggridformatter)
  - [Style (`aggrid/style`)](#style-aggridstyle)
- [Trading 유틸리티](#trading-유틸리티)
  - [Lot & Pip 계산기 (`trading/lot-pip-calculator`)](#lot--pip-계산기-tradinglot-pip-calculator)
  - [가격 변동 계산기 (`trading/priceChange`)](#가격-변동-계산기-tradingpricechange)
  - [스프레드 계산기 (`trading/spread`)](#스프레드-계산기-tradingspread)
- [통합 사용 예시](#통합-사용-예시)
- [타입 정의](#타입-정의)
- [성능 최적화](#성능-최적화)

---

## AG Grid 유틸리티

### Formatter (`aggrid/formatter`)

AG Grid의 `valueFormatter`에서 사용할 수 있는 포맷팅 함수들입니다.

#### 소수점 처리

##### `getDecimalPlaces(value: number): number`

과학적 표기법이나 일반 숫자에서 소수점 자리수를 자동으로 추출합니다.

```typescript
import { getDecimalPlaces } from '@template/utils/aggrid/formatter';

// 과학적 표기법
getDecimalPlaces(1.0e-4); // 4
getDecimalPlaces(1.0e-5); // 5

// 일반 소수
getDecimalPlaces(0.0001); // 4
getDecimalPlaces(0.01); // 2

// 정수
getDecimalPlaces(100); // 0

// 특수 케이스
getDecimalPlaces(0); // 5 (기본값)
getDecimalPlaces(NaN); // 5 (기본값)
```

**사용 사례:**
- 심볼별로 다른 소수점 자리수를 가진 가격 데이터 표시
- 동적으로 소수점 자리수를 결정해야 하는 경우

##### `padDecimalPlaces(value: number | string, decimalPlaces: number): string`

지정한 소수점 자리수에 맞춰 0을 채워줍니다.

```typescript
import { padDecimalPlaces } from '@template/utils/aggrid/formatter';

padDecimalPlaces(1.19, 5); // "1.19000"
padDecimalPlaces(1.1232, 5); // "1.12320"
padDecimalPlaces(1.23, 4); // "1.2300"
```

**AG Grid 컬럼 정의:**
```typescript
{
  field: 'price',
  headerName: '가격',
  valueFormatter: (params) => {
    const decimalPlaces = getDecimalPlaces(params.data.pipUnit);
    return padDecimalPlaces(params.value, decimalPlaces);
  }
}
```

#### 날짜 포맷팅

##### `formatDateForGrid(value, formatStr?): string`

날짜를 AG Grid에서 표시하기 적합한 형식으로 변환합니다.

```typescript
import { formatDateForGrid } from '@template/utils/aggrid/formatter';

// 기본 포맷 (yyyy-MM-dd)
{
  field: 'purchaseDate',
  headerName: '구매일',
  valueFormatter: (params) => formatDateForGrid(params.value)
}

// 커스텀 포맷
{
  field: 'purchaseDate',
  headerName: '구매일',
  valueFormatter: (params) => formatDateForGrid(params.value, 'yyyy/MM/dd')
}
```

##### `formatDateTimeForGrid(value, formatStr?): string`

날짜와 시간을 함께 표시합니다.

```typescript
import { formatDateTimeForGrid } from '@template/utils/aggrid/formatter';

{
  field: 'createdAt',
  headerName: '생성일시',
  valueFormatter: (params) => formatDateTimeForGrid(params.value)
  // 출력: 'YYYY-MM-DD HH:mm:ss'
}
```

##### `formatDateCompact(dateString: string): string`

날짜 문자열에서 하이픈을 제거하여 압축된 형식으로 변환합니다.

```typescript
import { formatDateCompact } from '@template/utils/aggrid/formatter';

formatDateCompact('2025-10-21'); // '20251021'

// API 요청 시 사용
const dateParam = formatDateCompact(selectedDate);
```

### Style (`aggrid/style`)

수익/손실 값에 따라 색상을 자동으로 적용하는 함수들입니다.

#### 색상 함수

##### `getProfitLossClass(value: number): string`

수익/손실 값에 따른 CSS 클래스명을 반환합니다.

```typescript
import { getProfitLossClass } from '@template/utils/aggrid/style';

getProfitLossClass(100); // 'positive'
getProfitLossClass(-50); // 'negative'
getProfitLossClass(0); // 'neutral'
```

##### `getProfitLossStyle(value: number, textAlign?): object`

수익/손실 값에 따른 스타일 객체를 반환합니다.

```typescript
import { getProfitLossStyle } from '@template/utils/aggrid/style';

// AG Grid 컬럼 정의
{
  field: 'profit',
  headerName: '손익',
  cellStyle: (params) => getProfitLossStyle(params.value, 'right'),
  valueFormatter: (params) => params.value.toFixed(2)
}

// 반환값:
// 양수: { textAlign: 'right', color: 'var(--font-color-buy)' }
// 음수: { textAlign: 'right', color: 'var(--font-color-sell)' }
// 0: { textAlign: 'right', color: 'var(--font-color-default)' }
```

##### `getProfitLossColor(value: number): string`

수익/손실 값에 따른 색상만 반환합니다.

```typescript
import { getProfitLossColor } from '@template/utils/aggrid/style';

const color = getProfitLossColor(params.value);
// 'var(--font-color-buy)' | 'var(--font-color-sell)' | 'var(--font-color-default)'
```

#### 미리 정의된 스타일

```typescript
import { predefinedStyles } from '@template/utils/aggrid/style';

// 텍스트 정렬
predefinedStyles.center; // { textAlign: 'center' }
predefinedStyles.right; // { textAlign: 'right' }
predefinedStyles.left; // { textAlign: 'left' }

// 수익/손실 스타일
predefinedStyles.profit; // { textAlign: 'right', color: 'var(--font-color-buy)' }
predefinedStyles.loss; // { textAlign: 'right', color: 'var(--font-color-sell)' }
predefinedStyles.neutral; // { textAlign: 'right', color: 'var(--font-color-default)' }
```

#### AG Grid 컬럼 정의 종합 예시

```typescript
import { 
  formatDateTimeForGrid, 
  padDecimalPlaces, 
  getDecimalPlaces 
} from '@template/utils/aggrid/formatter';
import { getProfitLossStyle } from '@template/utils/aggrid/style';

const columnDefs = [
  {
    field: 'symbol',
    headerName: '심볼',
    width: 100,
  },
  {
    field: 'price',
    headerName: '가격',
    width: 120,
    valueFormatter: (params) => {
      const decimals = getDecimalPlaces(params.data.pipUnit || 0.0001);
      return padDecimalPlaces(params.value, decimals);
    },
    cellStyle: { textAlign: 'right' },
  },
  {
    field: 'profit',
    headerName: '손익',
    width: 120,
    valueFormatter: (params) => params.value.toFixed(2),
    cellStyle: (params) => getProfitLossStyle(params.value),
  },
  {
    field: 'createdAt',
    headerName: '생성일시',
    width: 180,
    valueFormatter: (params) => formatDateTimeForGrid(params.value),
  },
];
```

---

## Trading 유틸리티

### Lot & Pip 계산기 (`trading/lot-pip-calculator`)

외환 거래에서 Lot 크기와 Pip 가치를 계산하는 함수들입니다.

#### 주요 계산 함수

##### `calculateLotValue(currentPrice: number, metadata: SymbolMetaData): number`

1Lot의 실제 가치를 계산합니다.

```typescript
import { calculateLotValue } from '@template/utils/trading/lot-pip-calculator';

const lotValue = calculateLotValue(currentPrice, symbolMetadata);
// 반환: 1Lot의 실제 가치 (기준통화 기준)
```

**계산 로직:**
1. Lot 승수 적용 (`lotMultiple`)
2. 현재가에 Price 승수 적용 (`priceMultiplier`)
3. 1Lot의 실제 가치: `lotSize × adjustedPrice`

##### `calculatePipValue(metadata: SymbolMetaData, currentPrice: number): number`

1 Pip 변화 시 손익 값을 계산합니다.

```typescript
import { calculatePipValue } from '@template/utils/trading/lot-pip-calculator';

const pipValue = calculatePipValue(symbolMetadata, currentPrice);
// 반환: 1 Pip의 가치
```

**계산 로직:**
```
pipValue = pipUnit × lotMultiple × priceMultiplier × currentPrice
```

##### `calculateTotalValue(currentPrice, lotSize, metadata): number`

총 거래 가치를 계산합니다.

```typescript
import { calculateTotalValue } from '@template/utils/trading/lot-pip-calculator';

const totalValue = calculateTotalValue(currentPrice, lotSize, symbolMetadata);
// 반환: 수량 × 1Lot 가치
```

##### `calculateMargin(currentPrice, lotSize, metadata): number`

필요한 증거금을 계산합니다.

```typescript
import { calculateMargin } from '@template/utils/trading/lot-pip-calculator';

const margin = calculateMargin(currentPrice, lotSize, symbolMetadata);
// 반환: 필요한 증거금 (증거금율 적용)
```

**계산 로직:**
- `isMarginUsage`가 false인 경우 0 반환
- 그 외: `totalValue × (marginRate / 100)`

##### `calculateMinimumMargin(marginRate, lotValue): number`

최소 증거금을 계산합니다.

```typescript
import { calculateMinimumMargin } from '@template/utils/trading/lot-pip-calculator';

const minMargin = calculateMinimumMargin(marginRate, lotValue);
// 반환: (marginRate / 100) × lotValue
```

##### `calculateSpreadCost(symbol, lotSize, metadata): number`

스프레드 비용을 계산합니다.

```typescript
import { calculateSpreadCost } from '@template/utils/trading/lot-pip-calculator';

const spreadCost = calculateSpreadCost(symbol, lotSize, symbolMetadata);
```

#### 포맷팅 함수

##### `formatLotPrice(value: number, decimals?: number): string`

가격을 로케일 형식으로 포맷팅합니다.

```typescript
import { formatLotPrice } from '@template/utils/trading/lot-pip-calculator';

formatLotPrice(1234.56, 2); // "1,234.56"
formatLotPrice(1234.567, 3); // "1,234.567"
```

##### `formatLotCurrency(value, currency?, decimals?): string`

통화 형식으로 포맷팅합니다.

```typescript
import { formatLotCurrency } from '@template/utils/trading/lot-pip-calculator';

formatLotCurrency(1234.56); // "$1,234.56"
formatLotCurrency(1234.56, 'EUR', 2); // "€1,234.56"
formatLotCurrency(1234.56, 'KRW', 0); // "₩1,235"
```

#### 실전 예시

```typescript
import {
  calculateLotValue,
  calculatePipValue,
  calculateMargin,
  formatLotCurrency,
} from '@template/utils/trading/lot-pip-calculator';

// Vue 컴포넌트에서 사용
const calculateOrderDetails = (symbol: string, lotSize: number) => {
  const metadata = getSymbolMetadata(symbol);
  const currentPrice = getCurrentPrice(symbol);

  const lotValue = calculateLotValue(currentPrice, metadata);
  const pipValue = calculatePipValue(metadata, currentPrice);
  const margin = calculateMargin(currentPrice, lotSize, metadata);

  return {
    lotValue: formatLotCurrency(lotValue, metadata.standardCurrencyCd),
    pipValue: formatLotCurrency(pipValue, metadata.standardCurrencyCd),
    margin: formatLotCurrency(margin, metadata.standardCurrencyCd),
  };
};
```

### 가격 변동 계산기 (`trading/priceChange`)

등락률과 등락폭을 계산하고 포맷팅하는 함수들입니다.

#### 계산 함수

##### `calculateChangeRate(currentPrice, closePrice): number`

등락률을 백분율로 계산합니다.

```typescript
import { calculateChangeRate } from '@template/utils/trading/priceChange';

const changeRate = calculateChangeRate(105, 100); // 5.0 (5% 상승)
const changeRate2 = calculateChangeRate(95, 100); // -5.0 (5% 하락)
```

**계산 로직:**
```
등락률 = ((현재가 - 전일종가) / 전일종가) × 100
```

##### `calculateChangeAmount(currentPrice, closePrice): number`

등락폭을 계산합니다.

```typescript
import { calculateChangeAmount } from '@template/utils/trading/priceChange';

const changeAmount = calculateChangeAmount(105, 100); // 5
const changeAmount2 = calculateChangeAmount(95, 100); // -5
```

##### `calculatePriceChange(currentPrice, closePrice): object`

등락폭, 등락률, 방향을 한번에 계산합니다.

```typescript
import { calculatePriceChange } from '@template/utils/trading/priceChange';

const result = calculatePriceChange(105, 100);
// {
//   changeAmount: 5,
//   changeRate: 5.0,
//   direction: 'up'
// }

const result2 = calculatePriceChange(95, 100);
// {
//   changeAmount: -5,
//   changeRate: -5.0,
//   direction: 'down'
// }

const result3 = calculatePriceChange(100, 100);
// {
//   changeAmount: 0,
//   changeRate: 0,
//   direction: 'unchanged'
// }
```

#### 포맷팅 함수

##### `formatChangeRate(changeRate, decimalPlaces?): string`

등락률을 보기 좋게 포맷팅합니다.

```typescript
import { formatChangeRate } from '@template/utils/trading/priceChange';

formatChangeRate(5.23); // "+5.23%"
formatChangeRate(-2.45); // "-2.45%"
formatChangeRate(0.00); // "0.00%"
formatChangeRate(5.234, 3); // "+5.234%"
```

##### `formatChangeAmount(changeAmount, decimalPlaces?): string`

등락폭을 보기 좋게 포맷팅합니다.

```typescript
import { formatChangeAmount } from '@template/utils/trading/priceChange';

formatChangeAmount(1.50); // "+1.50"
formatChangeAmount(-0.75); // "-0.75"
formatChangeAmount(0.00); // "0.00"
formatChangeAmount(1.234, 3); // "+1.234"
```

#### 실전 예시

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { 
  calculatePriceChange, 
  formatChangeRate, 
  formatChangeAmount 
} from '@template/utils/trading/priceChange';
import { getProfitLossColor } from '@template/utils/aggrid/style';

interface Props {
  currentPrice: number;
  closePrice: number;
}

const props = defineProps<Props>();

const priceChange = computed(() => 
  calculatePriceChange(props.currentPrice, props.closePrice)
);

const formattedChangeRate = computed(() => 
  formatChangeRate(priceChange.value.changeRate)
);

const formattedChangeAmount = computed(() => 
  formatChangeAmount(priceChange.value.changeAmount)
);

const changeColor = computed(() => 
  getProfitLossColor(priceChange.value.changeAmount)
);
</script>

<template>
  <div class="price-change">
    <span class="current-price">{{ currentPrice }}</span>
    <span 
      class="change-info" 
      :style="{ color: changeColor }"
    >
      {{ formattedChangeAmount }} ({{ formattedChangeRate }})
    </span>
  </div>
</template>
```

### 스프레드 계산기 (`trading/spread`)

심볼별 스프레드를 계산하고 매수/매도 가격을 산출합니다.

#### 주요 함수

##### `calculateSpread(symbol, basePrice): number`

심볼별 스프레드를 계산합니다.

```typescript
import { calculateSpread } from '@template/utils/trading/spread';

calculateSpread('EURUSD', 1.1000); // 0.0001 (1 pip)
calculateSpread('USDJPY', 110.00); // 0.01 (1 pip)
calculateSpread('BTCUSD', 50000); // 5.0 (0.01%)
calculateSpread('XAUUSD', 1800); // 0.1
calculateSpread('Oil', 75.00); // 0.05
calculateSpread('AAPL', 150.00); // 0.01
calculateSpread('US30', 35000); // 1.0
```

**스프레드 규칙:**
- **외환 (일반)**: 0.0001 (1 pip)
- **JPY 쌍**: 0.01 (1 pip)
- **암호화폐**: 기준가의 0.01% (비율 스프레드)
- **귀금속 (금/은)**: 0.1
- **원자재 (Oil)**: 0.05
- **주식**: 0.01
- **지수**: 1.0

##### `calculateBuyPrice(symbol, basePrice): number`

매수 가격(Ask 가격)을 계산합니다.

```typescript
import { calculateBuyPrice } from '@template/utils/trading/spread';

const buyPrice = calculateBuyPrice('EURUSD', 1.1000); // 1.10010
```

**계산 로직:**
```
매수가 = 기준가 + 스프레드
```

##### `calculateSellPrice(symbol, basePrice): number`

매도 가격(Bid 가격)을 계산합니다.

```typescript
import { calculateSellPrice } from '@template/utils/trading/spread';

const sellPrice = calculateSellPrice('EURUSD', 1.1000); // 1.09990
```

**계산 로직:**
```
매도가 = 기준가 - 스프레드
```

##### `calculateBidAskPrices(symbol, basePrice): object`

매수/매도 가격을 한번에 계산합니다.

```typescript
import { calculateBidAskPrices } from '@template/utils/trading/spread';

const prices = calculateBidAskPrices('EURUSD', 1.1000);
// {
//   buyPrice: 1.10010,  // Ask
//   sellPrice: 1.09990   // Bid
// }
```

#### 실전 예시

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { calculateBidAskPrices } from '@template/utils/trading/spread';
import { padDecimalPlaces, getDecimalPlaces } from '@template/utils/aggrid/formatter';

interface Props {
  symbol: string;
  basePrice: number;
  pipUnit?: number;
}

const props = withDefaults(defineProps<Props>(), {
  pipUnit: 0.0001,
});

const prices = computed(() => 
  calculateBidAskPrices(props.symbol, props.basePrice)
);

const decimalPlaces = computed(() => 
  getDecimalPlaces(props.pipUnit)
);

const formattedBuyPrice = computed(() => 
  padDecimalPlaces(prices.value.buyPrice, decimalPlaces.value)
);

const formattedSellPrice = computed(() => 
  padDecimalPlaces(prices.value.sellPrice, decimalPlaces.value)
);
</script>

<template>
  <div class="price-panel">
    <div class="buy-price">
      <span class="label">매수</span>
      <span class="price buy">{{ formattedBuyPrice }}</span>
    </div>
    <div class="sell-price">
      <span class="label">매도</span>
      <span class="price sell">{{ formattedSellPrice }}</span>
    </div>
  </div>
</template>

<style scoped>
.price.buy {
  color: var(--font-color-buy);
}

.price.sell {
  color: var(--font-color-sell);
}
</style>
```

---

## 통합 사용 예시

### AG Grid에서 Trading 데이터 표시

```typescript
import { 
  formatDateTimeForGrid, 
  padDecimalPlaces, 
  getDecimalPlaces 
} from '@template/utils/aggrid/formatter';
import { getProfitLossStyle } from '@template/utils/aggrid/style';
import { 
  calculateChangeRate, 
  formatChangeRate 
} from '@template/utils/trading/priceChange';
import { calculateBidAskPrices } from '@template/utils/trading/spread';

const columnDefs = [
  {
    field: 'symbol',
    headerName: '심볼',
    width: 100,
  },
  {
    field: 'currentPrice',
    headerName: '현재가',
    width: 120,
    valueGetter: (params) => {
      const prices = calculateBidAskPrices(params.data.symbol, params.data.basePrice);
      return prices.sellPrice; // Bid 가격 사용
    },
    valueFormatter: (params) => {
      const decimals = getDecimalPlaces(params.data.pipUnit);
      return padDecimalPlaces(params.value, decimals);
    },
    cellStyle: { textAlign: 'right' },
  },
  {
    field: 'changeRate',
    headerName: '등락률',
    width: 100,
    valueGetter: (params) => {
      return calculateChangeRate(params.data.currentPrice, params.data.closePrice);
    },
    valueFormatter: (params) => formatChangeRate(params.value),
    cellStyle: (params) => getProfitLossStyle(params.value),
  },
  {
    field: 'profit',
    headerName: '손익',
    width: 120,
    valueFormatter: (params) => params.value.toFixed(2),
    cellStyle: (params) => getProfitLossStyle(params.value),
  },
  {
    field: 'updatedAt',
    headerName: '업데이트 시간',
    width: 180,
    valueFormatter: (params) => formatDateTimeForGrid(params.value, 'yyyy-MM-dd HH:mm:ss'),
  },
];
```

### 주문 계산 컴포저블

```typescript
// composables/useOrderCalculator.ts
import { computed, ref, Ref } from 'vue';
import {
  calculateLotValue,
  calculatePipValue,
  calculateMargin,
  calculateTotalValue,
  formatLotCurrency,
  type SymbolMetaData,
} from '@template/utils/trading/lot-pip-calculator';
import { calculateBidAskPrices } from '@template/utils/trading/spread';

export function useOrderCalculator(
  symbol: Ref<string>,
  lotSize: Ref<number>,
  metadata: Ref<SymbolMetaData>
) {
  const basePrice = ref(0);

  // Bid/Ask 가격 계산
  const prices = computed(() => 
    calculateBidAskPrices(symbol.value, basePrice.value)
  );

  // 1Lot 값
  const lotValue = computed(() => 
    calculateLotValue(prices.value.sellPrice, metadata.value)
  );

  // 1 Pip 값
  const pipValue = computed(() => 
    calculatePipValue(metadata.value, prices.value.sellPrice)
  );

  // 총 거래 가치
  const totalValue = computed(() => 
    calculateTotalValue(prices.value.sellPrice, lotSize.value, metadata.value)
  );

  // 필요 증거금
  const margin = computed(() => 
    calculateMargin(prices.value.sellPrice, lotSize.value, metadata.value)
  );

  // 포맷팅된 값들
  const formatted = computed(() => ({
    lotValue: formatLotCurrency(lotValue.value, metadata.value.standardCurrencyCd),
    pipValue: formatLotCurrency(pipValue.value, metadata.value.standardCurrencyCd),
    totalValue: formatLotCurrency(totalValue.value, metadata.value.standardCurrencyCd),
    margin: formatLotCurrency(margin.value, metadata.value.standardCurrencyCd),
  }));

  return {
    basePrice,
    prices,
    lotValue,
    pipValue,
    totalValue,
    margin,
    formatted,
  };
}
```

---

## 타입 정의

### SymbolMetaData 인터페이스

```typescript
export interface SymbolMetaData {
  /** 종목코드 */
  stockCd: string;
  /** 기준통화코드 */
  standardCurrencyCd: string;
  /** 거래통화코드 */
  tradeCurrencyCd: string;
  /** Lot승수 */
  lotMultiple: number;
  /** Price승수 */
  priceMultiplier: number;
  /** Point단위 */
  pointUnit: number;
  /** Pip단위 */
  pipUnit: number;
  /** 종목그룹코드 */
  stockGroupCd: string;
  /** 심볼그룹코드 */
  symbolGroupCd: string;
  /** 증거금율사용여부 */
  isMarginUsage: boolean;
  /** 증거금율(%) */
  marginRate: number;
  /** 스프레드사용여부 */
  isSpreadUsage: boolean;
  /** 매수스프레드 */
  buySpread: number;
  /** 매도스프레드 */
  sellSpread: number;
  /** 전일종가 */
  closePrice: number;
}
```

---

## 성능 최적화

### 1. 메모이제이션

자주 계산되는 값들은 `computed`를 사용하여 캐싱하세요.

```typescript
const lotValue = computed(() => 
  calculateLotValue(currentPrice.value, metadata.value)
);
```

### 2. 조건부 계산

필요한 경우에만 계산을 수행하세요.

```typescript
const margin = computed(() => {
  if (!metadata.value.isMarginUsage) return 0;
  return calculateMargin(currentPrice.value, lotSize.value, metadata.value);
});
```

### 3. 배치 계산

여러 값을 한번에 계산해야 하는 경우 함수를 조합하세요.

```typescript
const orderDetails = computed(() => {
  const prices = calculateBidAskPrices(symbol.value, basePrice.value);
  const lotVal = calculateLotValue(prices.sellPrice, metadata.value);
  const pipVal = calculatePipValue(metadata.value, prices.sellPrice);
  const marg = calculateMargin(prices.sellPrice, lotSize.value, metadata.value);

  return { prices, lotVal, pipVal, marg };
});
```

## 추가 리소스

- [AG Grid Documentation](https://www.ag-grid.com/documentation/)
- [date-fns Documentation](https://date-fns.org/docs/)
- Trading Formulas: 내부 문서 참조
