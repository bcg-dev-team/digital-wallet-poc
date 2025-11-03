# 테이블 데이터 포맷 변환 최종 정리

## 📦 최종 구조

### 타입 정의
**테이블 데이터 타입은 `@template/api/generated-types`에 정의되어 있습니다.**

```typescript
// ❌ 이렇게 하지 마세요 (중복 정의)
export interface OrderBalanceData { ... }

// ✅ 이렇게 하세요 (generated-types 사용)
import type { PositionStockData } from '@template/api';
```

### 화면 표시 변환
**`@template/types`에서 변환 유틸리티를 제공합니다.**

```typescript
import { EnumLabelMapper, TableDataMapper } from '@template/types';
```

## 🎯 주요 타입 매핑

### 주문 화면
| 화면 | Generated Type |
|------|---------------|
| 잔고 테이블 | `PositionStockData` |
| 주문 테이블 | `DetailsOrderExecution` |
| 미체결 테이블 | `DetailsPendingOrder` |
| 청산 테이블 | `DetailsCloseOutOrder` |

### 거래 화면
| 화면 | Generated Type |
|------|---------------|
| 주문체결 테이블 | `DetailsOrderExecution` |
| 청산손익 테이블 | `LiquidationDetail` |
| 결제내역 테이블 | `PaymentDetail` |

### 자산 화면
| 화면 | Generated Type |
|------|---------------|
| 포지션 테이블 | `Position`, `AssetPosition` |
| 주문 테이블 | `AssetOrder` |

## 🔄 코드 변환 (현재)

### 레거시 숫자 코드 → 화면 표시

```typescript
// 포지션: 1→LONG, 2→SHORT (영문)
EnumLabelMapper.getPositionCodeShort('1')  // 'LONG'
EnumLabelMapper.getPositionCodeShort('2')  // 'SHORT'

// 주문유형: 1→시장가, 3→지정가, 5→조건시장가, 7→조건지정가, 9→TP+SL (한글)
EnumLabelMapper.getOrderTypeLabel('1')  // '시장가'
EnumLabelMapper.getOrderTypeLabel('3')  // '지정가'
EnumLabelMapper.getOrderTypeLabel('5')  // '조건시장가'
EnumLabelMapper.getOrderTypeLabel('7')  // '조건지정가'
EnumLabelMapper.getOrderTypeLabel('9')  // 'TP+SL'

// 매매구분: 1→매수, 2→매도 (한글)
EnumLabelMapper.getSideCodeLabel('1')  // '매수'
EnumLabelMapper.getSideCodeLabel('2')  // '매도'

// 주문상태: 1→접수, 2→송신, 3→확인, 4→거부, 5→배리어, 6→지정가, 8→실패, 9→종료 (한글)
EnumLabelMapper.getOrderStatusLabel('1')  // '접수'
EnumLabelMapper.getOrderStatusLabel('2')  // '송신'
EnumLabelMapper.getOrderStatusLabel('3')  // '확인'
EnumLabelMapper.getOrderStatusLabel('4')  // '거부'

// 거래구분: 1→매입, 2→청산 (한글)
EnumLabelMapper.getOrderCodeLabel('1')  // '매입'
EnumLabelMapper.getOrderCodeLabel('2')  // '청산'
EnumLabelMapper.getTradeCodeLabel('1')  // '매입'
EnumLabelMapper.getTradeCodeLabel('2')  // '청산'

// 종목그룹: 01→외환, 02→지수, 03→상품, 04→가상화폐 (한글)
EnumLabelMapper.getStockGroupCodeLabel('01')  // '외환'
EnumLabelMapper.getStockGroupCodeLabel('02')  // '지수'
EnumLabelMapper.getStockGroupCodeLabel('03')  // '상품'
EnumLabelMapper.getStockGroupCodeLabel('04')  // '가상화폐'
```

### 향후 Enum 코드 → 화면 표시 (동일 함수)

```typescript
// 같은 함수로 작동!
EnumLabelMapper.getPositionCodeShort('LONG')   // 'LONG'
EnumLabelMapper.getPositionCodeShort('SHORT')  // 'SHORT'
EnumLabelMapper.getOrderTypeLabel('MARKET')    // '시장가'
EnumLabelMapper.getSideCodeLabel('BUY')        // '매수'
EnumLabelMapper.getOrderCodeLabel('BUY_PURCHASE')  // '매입'
```

## 📂 파일 구조

```
packages/types/src/tables/
├── enum-labels.ts          # ⭐ 코드→라벨 변환 (핵심)
├── index.ts                # export 및 공통 유틸리티
├── SUMMARY.md              # 이 파일 (전체 요약)
└── usage-examples.md       # 사용 예시
```

**삭제된 파일들 (중복이었음):**
- ~~order-balance.ts~~ → `PositionStockData` 사용
- ~~order.ts~~ → `DetailsOrderExecution` 사용
- ~~pending-orders.ts~~ → `DetailsPendingOrder` 사용
- ~~close-out.ts~~ → `DetailsCloseOutOrder` 사용
- ~~order-execution.ts~~ → `DetailsOrderExecution` 사용
- ~~settlement-profit-loss.ts~~ → `LiquidationDetail` 사용
- ~~payment-history.ts~~ → `PaymentDetail` 사용
- ~~position.ts~~ → `Position` 사용
- ~~asset-order.ts~~ → `AssetOrder` 사용

## 🚀 사용 방법

### 1. 타입 import
```typescript
import type { 
  PositionStockData,
  DetailsOrderExecution,
  DetailsPendingOrder,
  Position,
  AssetOrder 
} from '@template/api';
```

### 2. 변환 유틸리티 import
```typescript
import { EnumLabelMapper, TableDataMapper } from '@template/types';
```

### 3. 화면에서 사용
```typescript
// API에서 데이터 받기
const data: PositionStockData[] = await fetchData();

// 화면 표시
data.forEach(item => {
  console.log(EnumLabelMapper.getPositionCodeShort(item.positionCd));  // 'LONG' 또는 'SHORT'
  console.log(TableDataMapper.formatCurrency(item.accountBookPrice));   // "$1,234.56"
});
```

## ✅ 적용 완료된 화면

### 주문 화면 (4개 테이블)
- ✅ OrderBalanceTable.vue
- ✅ OrderHistoryTable.vue
- ✅ PendingExecutionTable.vue
- ✅ CloseOutTable.vue

### 거래 화면 (3개 테이블)
- ✅ tableColumnDefs.ts (orderDetailColumns)
- ✅ tableColumnDefs.ts (profitAndLossDetailColumns)
- ✅ tableColumnDefs.ts (paymentDetailColumns)

### 자산 화면 (포지션 + 주문 + 구성)
- ✅ PositionTableContent.vue
- ✅ OrderTableContent.vue
- ✅ HoldPosition.vue
- ✅ AssetsComposition.vue

## 📋 백엔드 Enum 적용 후 할 일

1. ✅ 화면 코드는 변경 불필요 (이미 준비됨)
2. ⏳ `pnpm generate:api` 실행하여 타입 재생성
3. ⏳ `packages/types/src/tables/enum-labels.ts`에서 레거시 숫자 코드 제거
   - `'1'`, `'2'` (포지션)
   - `'1'`, `'3'`, `'5'`, `'7'`, `'9'` (주문유형)
   - `'1'`, `'2'` (매매구분, 거래구분)
   - `'1'`~`'9'` (주문상태)
   - `'01'`, `'02'`, `'03'`, `'04'` (종목그룹)
4. ⏳ 완료!

## 🎉 장점

- **중복 제거**: 타입 정의가 하나만 존재
- **자동 업데이트**: API 스펙 변경 시 자동 반영
- **유지보수 간편**: 변환 로직만 관리
- **타입 안전**: generated-types의 타입 보장
- **과도기 대응**: 레거시와 enum 모두 지원

