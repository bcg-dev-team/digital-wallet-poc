# 테이블 데이터 변환 사용 예시

## 기본 개념

**테이블 데이터 타입**: `@template/api/generated-types`에서 import
**화면 표시 변환**: `@template/types`의 유틸리티 사용

## 1. 기본 사용법

### Enum 라벨 변환
```typescript
import { EnumLabelMapper } from '@template/types';

// 포지션 구분
EnumLabelMapper.getPositionCodeLabel('0')     // '롱'
EnumLabelMapper.getPositionCodeLabel('LONG')  // '롱'
EnumLabelMapper.getPositionCodeShort('0')     // 'L'
EnumLabelMapper.getPositionCodeShort('LONG')  // 'L'

// 주문 유형
EnumLabelMapper.getOrderTypeLabel('1')        // '시장가'
EnumLabelMapper.getOrderTypeLabel('MARKET')   // '시장가'

// 매매 구분
EnumLabelMapper.getSideCodeLabel('1')         // '매수'
EnumLabelMapper.getSideCodeLabel('BUY')       // '매수'

// 주문 상태
EnumLabelMapper.getOrderStatusLabel('3')      // '확인'
EnumLabelMapper.getOrderStatusLabel('CONFIRMED')  // '확인'

// 색상 클래스
EnumLabelMapper.getOrderStatusColorClass('3')      // 'text-green-600'
EnumLabelMapper.getPositionColorClass('0')         // 'text-blue-600'
```

### 데이터 포맷팅
```typescript
import { TableDataMapper } from '@template/types';

// 숫자 포맷팅
TableDataMapper.formatNumber(1234.567, 2)           // "1234.57"
TableDataMapper.formatNumberWithCommas(1234567)    // "1,234,567"
TableDataMapper.formatCurrency(1234.56, 'USD')     // "$1,234.56"
TableDataMapper.formatPercentage(12.34, 1)         // "12.3%"

// 손익 색상
TableDataMapper.getProfitLossColorClass(100)       // 'text-green-600'
TableDataMapper.getProfitLossColorClass(-50)       // 'text-red-600'
TableDataMapper.getProfitLossColorClass(0)         // 'text-gray-600'
```

## 2. Vue 컴포넌트에서 사용

### 기본 패턴
```vue
<template>
  <div class="order-table">
    <div 
      v-for="order in displayOrders" 
      :key="order.orderNo"
      class="order-row"
    >
      <span class="stock-code">{{ order.stockCd }}</span>
      <span :class="order.positionColorClass">
        {{ order.positionLabel }}
      </span>
      <span :class="order.statusColorClass">
        {{ order.statusLabel }}
      </span>
      <span :class="order.profitLossColorClass">
        {{ order.formattedProfitLoss }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { EnumLabelMapper, TableDataMapper } from '@template/types';
import type { DetailsOrderExecution } from '@template/api';

const props = defineProps<{
  orders: DetailsOrderExecution[];
}>();

const displayOrders = computed(() => 
  props.orders.map(order => ({
    ...order,
    positionLabel: EnumLabelMapper.getPositionCodeShort(order.positionCd),
    statusLabel: EnumLabelMapper.getOrderStatusLabel(order.orderStatusCd),
    orderTypeLabel: EnumLabelMapper.getOrderTypeLabel(order.orderTypeCd),
    sideLabel: EnumLabelMapper.getSideCodeLabel(order.sideCd),
    
    positionColorClass: EnumLabelMapper.getPositionColorClass(order.positionCd),
    statusColorClass: EnumLabelMapper.getOrderStatusColorClass(order.orderStatusCd),
    profitLossColorClass: TableDataMapper.getProfitLossColorClass(0), // 손익 값 넣기
    
    formattedQuantity: TableDataMapper.formatNumberWithCommas(order.orderQuantity),
    formattedPrice: TableDataMapper.formatCurrency(order.orderPrice),
    formattedProfitLoss: TableDataMapper.formatCurrency(0), // 손익 값 넣기
  }))
);
</script>
```

## 3. AG Grid에서 사용

### 컬럼 정의
```typescript
import type { ColDef } from 'ag-grid-community';
import { EnumLabelMapper, TableDataMapper } from '@template/types';
import { predefinedStyles, getProfitLossStyle } from '@template/utils';

const columnDefs: ColDef[] = [
  {
    headerName: 'L / S',
    field: 'positionCd',
    width: 80,
    cellStyle: predefinedStyles.center,
    valueFormatter: (params: any) => EnumLabelMapper.getPositionCodeShort(params.value),
  },
  {
    headerName: '유형',
    field: 'orderTypeCd',
    width: 100,
    cellStyle: predefinedStyles.center,
    valueFormatter: (params: any) => EnumLabelMapper.getOrderTypeLabel(params.value),
  },
  {
    headerName: '구분',
    field: 'sideCd',
    width: 80,
    cellStyle: predefinedStyles.center,
    valueFormatter: (params: any) => EnumLabelMapper.getSideCodeLabel(params.value),
  },
  {
    headerName: '상태',
    field: 'orderStatusCd',
    width: 80,
    cellStyle: predefinedStyles.center,
    valueFormatter: (params: any) => EnumLabelMapper.getOrderStatusLabel(params.value),
    // 색상도 적용하려면 cellStyle을 함수로
    cellStyle: (params: any) => ({
      textAlign: 'center',
      // EnumLabelMapper의 색상 클래스를 직접 사용할 수는 없으므로
      // getProfitLossStyle 같은 유틸 함수 사용
    }),
  },
  {
    headerName: '수량',
    field: 'orderQuantity',
    width: 100,
    cellStyle: predefinedStyles.right,
    valueFormatter: (params: any) => TableDataMapper.formatNumberWithCommas(params.value),
  },
  {
    headerName: '가격',
    field: 'orderPrice',
    width: 100,
    cellStyle: predefinedStyles.right,
    valueFormatter: (params: any) => params.value.toLocaleString(),
  },
];
```

## 4. API 서비스에서 사용

```typescript
import type { PositionStockData } from '@template/api';
import { stockService } from '@/services/api';

class OrderService {
  async getOrderBalance(accountNo: string): Promise<PositionStockData[]> {
    const request = {
      accountNo,
      stockCd: '',
      nextKey: '',
    };
    
    const response = await stockService.getPositionStocks(request);
    
    // generated-types를 그대로 반환
    return response.data?.symbols || [];
  }
}

// 화면에서 사용
const orderBalance = await orderService.getOrderBalance('123456');

// 화면 표시용으로 변환
const displayData = orderBalance.map(item => ({
  ...item,
  positionLabel: EnumLabelMapper.getPositionCodeShort(item.positionCd),
  formattedPrice: TableDataMapper.formatCurrency(item.accountBookPrice),
}));
```

## 5. 검색/필터링

```typescript
import type { DetailsOrderExecution } from '@template/api';

class OrderFilter {
  // 포지션으로 필터링
  static filterByPosition(
    orders: DetailsOrderExecution[], 
    positionCode: string  // '0', '1' 또는 'LONG', 'SHORT'
  ): DetailsOrderExecution[] {
    return orders.filter(order => order.positionCd === positionCode);
  }

  // 주문 상태로 필터링
  static filterByStatus(
    orders: DetailsOrderExecution[], 
    statusCode: string  // '1', '3' 또는 'RECEIVED', 'CONFIRMED'
  ): DetailsOrderExecution[] {
    return orders.filter(order => order.orderStatusCd === statusCode);
  }

  // 종목으로 검색
  static searchByStock(
    orders: DetailsOrderExecution[], 
    searchTerm: string
  ): DetailsOrderExecution[] {
    return orders.filter(order => 
      order.stockCd.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

// 사용 예시
const longOrders = OrderFilter.filterByPosition(orders, '0');  // 현재
const confirmedOrders = OrderFilter.filterByStatus(orders, '3');  // 현재
```

## 6. 통계 계산

```typescript
import type { PositionStockData } from '@template/api';

class PositionStatistics {
  static calculateTotalProfitLoss(positions: PositionStockData[]): number {
    return positions.reduce((total, pos) => total + pos.assessmentProfitLoss, 0);
  }

  static getPositionCount(positions: PositionStockData[]): { long: number; short: number } {
    return positions.reduce(
      (counts, pos) => {
        if (pos.positionCd === '0' || pos.positionCd === 'LONG') {
          counts.long++;
        } else {
          counts.short++;
        }
        return counts;
      },
      { long: 0, short: 0 }
    );
  }

  static getTopPerformers(
    positions: PositionStockData[], 
    limit: number = 5
  ): PositionStockData[] {
    return [...positions]
      .sort((a, b) => b.assessmentProfitLoss - a.assessmentProfitLoss)
      .slice(0, limit);
  }
}
```

## 7. 실전 예제

### 주문 잔고 테이블
```vue
<template>
  <BaseDataGrid
    :columnDefs="columnDefs"
    :rowData="rowData"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { BaseDataGrid, type ColDef } from '@template/ui';
import { EnumLabelMapper } from '@template/types';
import { predefinedStyles } from '@template/utils';
import type { PositionStockData } from '@template/api';
import { stockService } from '@/services/api';

const rowData = ref<PositionStockData[]>([]);

const columnDefs: ColDef[] = [
  {
    headerName: '종목코드',
    field: 'stockCd',
    width: 120,
    cellStyle: predefinedStyles.center,
  },
  {
    headerName: 'L / S',
    field: 'positionCd',
    width: 80,
    cellStyle: predefinedStyles.center,
    valueFormatter: (params: any) => EnumLabelMapper.getPositionCodeShort(params.value),
  },
  {
    headerName: '수량',
    field: 'accountBookQuantity',
    width: 100,
    cellStyle: predefinedStyles.right,
    valueFormatter: (params: any) => params.value.toLocaleString(),
  },
];

onMounted(async () => {
  const response = await stockService.getPositionStocks({
    accountNo: '123456',
    stockCd: '',
    nextKey: '',
  });
  
  if (response.data) {
    rowData.value = response.data.symbols;
  }
});
</script>
```

## 정리

### 핵심 포인트
1. **타입은 generated-types에서 import**
2. **화면 표시는 EnumLabelMapper 사용**
3. **포맷팅은 TableDataMapper 사용**
4. **백엔드 enum 변경 시 화면 코드 변경 불필요**

### 장점
- ✅ 타입 중복 없음
- ✅ API 스펙 변경 시 자동 반영
- ✅ 레거시와 enum 코드 모두 지원
- ✅ 유지보수 간편
