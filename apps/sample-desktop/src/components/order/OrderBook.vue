<template>
  <div class="flex flex-col items-center gap-1">
    <!-- 1~5호가 -->
    <div v-for="(item, index) in orderBookData" :key="index" class="flex h-6 w-full gap-1">
      <!-- 왼쪽: ASK (매도, 빨간색) -->
      <div class="flex h-6 w-full items-center justify-between text-xs">
        <div class="relative z-10">{{ item.askSize }}</div>
        <div class="relative">
          <div class="relative z-10 mr-[9px]">
            {{ padDecimalPlaces(Number(item.ask), decimalPlaces) }}
          </div>
          <div
            class="bg-bg-bg-dom-ask absolute right-0 top-1/2 h-6 -translate-y-1/2 rounded"
            :style="{ width: getAskWidth(item.askSize) }"
          ></div>
        </div>
      </div>

      <!-- 오른쪽: BID (매수, 파란색) -->
      <div class="flex w-full items-center justify-between text-xs">
        <div class="relative">
          <div class="relative z-10 ml-[9px]">
            {{ padDecimalPlaces(Number(item.bid), decimalPlaces) }}
          </div>
          <div
            class="bg-bg-bg-dom-bid absolute left-0 top-1/2 h-6 -translate-y-1/2 rounded"
            :style="{ width: getBidWidth(item.bidSize) }"
          ></div>
        </div>
        <div class="relative z-10">{{ item.bidSize }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDecimalPlaces, padDecimalPlaces } from '@template/utils';
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import type { OrderBookResponse } from '@template/api';
import { quoteService } from '@/services/api';

const props = defineProps<{
  stockCd: string;
  pointUnit: number;
}>();

// 호가 데이터 상태
const orderBookData = ref<OrderBookResponse[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

// 소수점 자리수 계산
const decimalPlaces = computed(() => {
  return getDecimalPlaces(props.pointUnit);
});

// BID 최대값 계산
const maxBidSize = computed(() => {
  if (orderBookData.value.length === 0) return 1;
  const max = Math.max(...orderBookData.value.map((item) => Number(item.bidSize)));
  // console.log(`[OrderBook] maxBidSize 계산: ${max}`);
  return max;
});

// ASK 최대값 계산
const maxAskSize = computed(() => {
  if (orderBookData.value.length === 0) return 1;
  const max = Math.max(...orderBookData.value.map((item) => Number(item.askSize)));
  // console.log(`[OrderBook] maxAskSize 계산: ${max}`);
  return max;
});

// 가격 포맷팅
// const formatPrice = (price: string | number): string => {
//   const num = typeof price === 'string' ? parseFloat(price) : price;
//   const result = num.toFixed(5);
//   // console.log(`[OrderBook] formatPrice: ${price} → ${result}`);
//   return result;
// };

// 수량 포맷팅
// const formatNumber = (num: string | number): string => {
//   const value = typeof num === 'string' ? parseFloat(num) : num;
//   const result = value.toLocaleString();
//   // console.log(`[OrderBook] formatNumber: ${num} → ${result}`);
//   return result;
// };

// BID 비율 계산 (최대 너비: 150px)
const getBidWidth = (bidSize: string) => {
  const ratio = Number(bidSize) / maxBidSize.value;
  return `${Math.max(ratio * 150, 2)}px`; // 최소 2px 보장
};

// ASK 비율 계산 (최대 너비: 150px)
const getAskWidth = (askSize: string) => {
  const ratio = Number(askSize) / maxAskSize.value;
  return `${Math.max(ratio * 150, 2)}px`; // 최소 2px 보장
};

/**
 * 초기 호가 데이터 로드
 */
const loadOrderBook = async () => {
  if (!props.stockCd) return;

  loading.value = true;
  error.value = null;

  try {
    const response = await quoteService.getOrderBook(props.stockCd);

    if (response.data?.contents) {
      orderBookData.value = response.data.contents;
      // console.log(
      //   `[OrderBook] ${props.stockCd} 초기 호가 데이터 로드 완료:`,
      //   orderBookData.value.length,
      //   '개'
      // );
    }
  } catch (err: any) {
    error.value = err.message || '호가 데이터 로드 실패';
    console.error(`[OrderBook] ${props.stockCd} 호가 데이터 로드 실패:`, err);
  } finally {
    loading.value = false;
  }
};

/**
 * 전역 이벤트 리스너 등록 (WebSocketService에서 발생하는 이벤트 수신)
 * 현재 선택된 종목(stockCd)에 대해서만 호가 데이터 처리
 */
const handleOrderBookUpdate = (event: CustomEvent) => {
  const { stockCd, orderBook } = event.detail;

  // 현재 선택된 종목에 대해서만 처리
  if (stockCd === props.stockCd) {
    // console.log(`[OrderBook] ${props.stockCd} 호가 데이터 수신:`, orderBook.length, '개');
    updateOrderBookData({ orderBook });
  }
  // 다른 종목 데이터는 무시 (로그 없음)
};

/**
 * WebSocket 데이터로 호가 업데이트 (현재 선택된 종목만)
 */
const updateOrderBookData = (data: any) => {
  if (!data) {
    console.warn(`[OrderBook] ${props.stockCd} 데이터가 없음`);
    return;
  }

  // 호가 데이터 구조 처리
  let orderBook: OrderBookResponse[] = [];

  if (data.orderBook && Array.isArray(data.orderBook)) {
    orderBook = data.orderBook;
  } else if (data.contents && Array.isArray(data.contents)) {
    orderBook = data.contents;
  } else if (Array.isArray(data)) {
    orderBook = data;
  } else {
    console.warn(`[OrderBook] ${props.stockCd} 알 수 없는 호가 데이터 구조:`, data);
    return;
  }

  // Vue 반응성을 위해 완전히 새로운 객체들로 강제 업데이트
  orderBookData.value = orderBook.map((item) => ({
    bid: item.bid,
    ask: item.ask,
    bidSize: item.bidSize,
    askSize: item.askSize,
  }));

  // console.log(
  //   `[OrderBook] ${props.stockCd} 호가 데이터 업데이트 완료:`,
  //   orderBookData.value.length,
  //   '개'
  // );
};

/**
 * Mock WebSocket 데이터 시뮬레이션 (개발 환경용) - 더 이상 사용하지 않음
 * WebSocket에서 MARKET_ORDER_BOOK 메시지를 받아서 처리
 */
// const simulateWebSocketData = () => {
//   const updateInterval = setInterval(() => {
//     if (!props.stockCd) {
//       clearInterval(updateInterval);
//       return;
//     }
//
//     // Mock 호가 데이터 생성
//     const mockOrderBook: OrderBookResponse[] = Array.from({ length: 5 }, (_, index) => ({
//       bid: (1.79 + index * 0.00001 + Math.random() * 0.00001).toFixed(5),
//       ask: (1.7901 + index * 0.00001 + Math.random() * 0.00001).toFixed(5),
//       bidSize: Math.floor(Math.random() * 1000000 + 100000).toString(),
//       askSize: Math.floor(Math.random() * 1000000 + 100000).toString(),
//     }));
//
//     updateOrderBookData({ orderBook: mockOrderBook });
//   }, 300); // 1초마다 업데이트
//
//   // 컴포넌트 언마운트 시 인터벌 정리
//   onUnmounted(() => {
//     clearInterval(updateInterval);
//   });
// };

/**
 * 전역 이벤트 리스너 제거
 */
const removeEventListener = () => {
  try {
    window.removeEventListener('orderBookUpdate', handleOrderBookUpdate as EventListener);
    // console.log(`[OrderBook] ${props.stockCd} 이벤트 리스너 제거 완료`);
  } catch (error) {
    console.error(`[OrderBook] ${props.stockCd} 이벤트 리스너 제거 실패:`, error);
  }
};

// 종목코드 변경 감지
watch(
  () => props.stockCd,
  async (newStockCd, oldStockCd) => {
    if (newStockCd !== oldStockCd) {
      if (newStockCd) {
        await loadOrderBook();
      }
    }
  }
);

onMounted(async () => {
  // 전역 이벤트 리스너 등록
  window.addEventListener('orderBookUpdate', handleOrderBookUpdate as EventListener);

  if (props.stockCd) {
    await loadOrderBook();
  }
});

onUnmounted(() => {
  removeEventListener();
});
</script>
