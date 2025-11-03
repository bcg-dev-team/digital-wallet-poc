<template>
  <div class="symbol-list">
    <!-- 종목 카테고리 -->
    <div class="category-container">
      <BaseRadioGroup
        v-model="activeTab"
        :options="categoryOptions"
        name="symbol-category"
        size="sm"
        variant="underline"
        fullwidth
      />
    </div>

    <!-- 검색 입력창 (현재 활성 탭 내 검색) -->
    <div class="search-container">
      <BaseInput
        v-model="searchQuery"
        placeholder="종목명, 종목코드 검색"
        size="sm"
        variant="search"
        :full="true"
      />
    </div>

    <!-- 탭별 종목 목록 (검색 필터링 자동 적용) -->
    <AllTab v-if="activeTab === 'all'" @symbol-select="selectSymbol" />
    <WatchlistTab v-if="activeTab === 'watchlist'" @symbol-select="selectSymbol" />
    <PossessionTab v-if="activeTab === 'possession'" @symbol-select="selectSymbol" />
  </div>
</template>

<script setup lang="ts">
import {
  getProfitLossClass,
  getSymbolPrice,
  getSymbolChangeFromBase,
  getChangeFromBaseClass,
} from '@template/utils';
import { SYMBOL_LIST_TAB_OPTIONS } from './types/SymbolList.types';
import { BaseRadioGroup, BaseInput, BaseIcon } from '@template/ui';
import { useSymbolData } from '@/composables/useSymbolData';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import type { TradingSymbol } from '@template/types';
import PossessionTab from './tab/PossessionTab.vue';
import WatchlistTab from './tab/WatchlistTab.vue';
import AllTab from './tab/AllTab.vue';

interface Emits {
  (e: 'symbol-select', symbol: TradingSymbol): void;
}

const emit = defineEmits<Emits>();

// 심볼 데이터 관리
const {
  activeTab,
  searchQuery,
  currentSelectedSymbol,
  marketData,
  filteredSymbols,
  selectSymbol: selectSymbolData,
  toggleFavorite,
  isFavorite,
  loadSymbols,
} = useSymbolData();

// BaseRadioGroup용 카테고리 옵션
const categoryOptions = SYMBOL_LIST_TAB_OPTIONS;

const symbolListRef = ref<HTMLElement | null>(null);

// 메서드
const selectSymbol = (symbol: TradingSymbol) => {
  selectSymbolData(symbol);
  emit('symbol-select', symbol);
};

// 가격 및 증감률 계산 함수들 (utils 함수 사용)
const getPrice = (ticker: string) => getSymbolPrice(ticker, marketData.value);
const getChange = (ticker: string) => getSymbolChangeFromBase(ticker, marketData.value);
const getChangeClass = (ticker: string) =>
  getChangeFromBaseClass(ticker, marketData.value, getProfitLossClass);

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
  await loadSymbols();
});

// 컴포넌트 언마운트 시 정리
onUnmounted(() => {
  // 가시성 로직 제거됨
});
</script>

<style scoped lang="scss">
@use './SymbolList.scss';
</style>
