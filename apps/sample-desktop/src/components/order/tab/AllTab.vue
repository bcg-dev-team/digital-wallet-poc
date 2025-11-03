<template>
  <div class="tab-container">
    <!-- 외환 -->
    <CategorySection
      v-if="hasCategorySymbols.forex"
      title="외환"
      :symbols="displaySymbolsByCategory.forex"
      :is-open="open.forex"
      :current-selected-symbol="currentSelectedSymbol"
      :is-favorite="isFavorite"
      @toggle="open.forex = !open.forex"
      @symbol-click="handleSymbolClickFromCategory"
      @toggle-favorite="toggleFavorite"
    />

    <!-- 지수 -->
    <CategorySection
      v-if="hasCategorySymbols.index"
      title="지수"
      :symbols="displaySymbolsByCategory.index"
      :is-open="open.indices"
      :current-selected-symbol="currentSelectedSymbol"
      :is-favorite="isFavorite"
      @toggle="open.indices = !open.indices"
      @symbol-click="handleSymbolClickFromCategory"
      @toggle-favorite="toggleFavorite"
    />

    <!-- 상품 -->
    <CategorySection
      v-if="hasCategorySymbols.commodity"
      title="상품"
      :symbols="displaySymbolsByCategory.commodity"
      :is-open="open.commodities"
      :current-selected-symbol="currentSelectedSymbol"
      :is-favorite="isFavorite"
      @toggle="open.commodities = !open.commodities"
      @symbol-click="handleSymbolClickFromCategory"
      @toggle-favorite="toggleFavorite"
    />

    <!-- 가상화폐 -->
    <CategorySection
      v-if="hasCategorySymbols.crypto"
      title="가상화폐"
      :symbols="displaySymbolsByCategory.crypto"
      :is-open="open.crypto"
      :current-selected-symbol="currentSelectedSymbol"
      :is-favorite="isFavorite"
      @toggle="open.crypto = !open.crypto"
      @symbol-click="handleSymbolClickFromCategory"
      @toggle-favorite="toggleFavorite"
    />
  </div>
</template>

<script setup lang="ts">
import { type TradingSymbol, SYMBOL_LIST_TAB } from '@template/types';
import type { SymbolDisplayData } from '@/composables/useSymbolData';
import CategorySection from './components/CategorySection.vue';
import { onMounted, onUnmounted, reactive, watch } from 'vue';
import { useSymbolData } from '@/composables/useSymbolData';

interface Emits {
  (e: 'symbol-select', symbol: TradingSymbol): void;
}

const emit = defineEmits<Emits>();

// 심볼 데이터 관리
const {
  currentSelectedSymbol,
  displaySymbolsByCategory,
  hasCategorySymbols,
  activeTab,
  selectSymbol,
  toggleFavorite,
  isFavorite,
  convertToTradingSymbol,
  loadSymbols,
  loadWatchlistSymbols,
} = useSymbolData();

// 전체 종목 탭 활성화
activeTab.value = SYMBOL_LIST_TAB.ALL;

// localStorage 키
const STORAGE_KEY = 'symbol-list-category-open-state';

/**
 * localStorage에서 카테고리 상태 로드
 */
const loadCategoryState = (): Record<string, boolean> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('[AllTab] localStorage 로드 실패:', error);
  }
  // 기본값
  return {
    all: true,
    forex: false,
    indices: false,
    commodities: false,
    crypto: false,
  };
};

/**
 * localStorage에 카테고리 상태 저장
 */
const saveCategoryState = (state: Record<string, boolean>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('[AllTab] localStorage 저장 실패:', error);
  }
};

// 카테고리 열림/닫힘 상태 관리
const open = reactive(loadCategoryState());

// 카테고리 상태 변경 감지하여 localStorage에 저장
watch(
  () => ({ ...open }),
  (newState) => {
    saveCategoryState(newState);
  },
  { deep: true }
);

// 메서드
const handleSymbolClickFromCategory = (symbol: SymbolDisplayData) => {
  const tradingSymbol = convertToTradingSymbol(symbol);
  selectSymbol(tradingSymbol);
  emit('symbol-select', tradingSymbol);
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
  // console.log('[AllTab] 컴포넌트 마운트 - 데이터 로드 시작');
  // 전체 종목과 관심종목 목록을 모두 로드
  await Promise.all([loadSymbols(), loadWatchlistSymbols()]);
  // console.log('[AllTab] 데이터 로드 완료');
});
</script>

<style scoped lang="scss">
@use '../SymbolList.scss';
</style>
