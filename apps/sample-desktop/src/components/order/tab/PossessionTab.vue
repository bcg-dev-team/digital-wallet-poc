<template>
  <div class="tab-container">
    <div
      ref="symbolListRef"
      class="symbol-list-container overflow-hidden px-2 transition-all duration-300 ease-in-out"
    >
      <SymbolItem
        v-for="symbol in displaySymbols"
        :key="symbol.stockCd"
        :symbol="symbol"
        :is-selected="currentSelectedSymbol === symbol.stockCd"
        :is-favorite="isFavorite(symbol.stockCd)"
        @click="handleSymbolClick(symbol)"
        @toggle-favorite="toggleFavorite(symbol.stockCd)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { type TradingSymbol, SYMBOL_LIST_TAB } from '@template/types';
import type { SymbolDisplayData } from '@/composables/useSymbolData';
import { useSymbolData } from '@/composables/useSymbolData';
import SymbolItem from './components/SymbolItem.vue';
import { onMounted, ref } from 'vue';

interface Emits {
  (e: 'symbol-select', symbol: TradingSymbol): void;
}

const emit = defineEmits<Emits>();

// 심볼 데이터 관리
const {
  currentSelectedSymbol,
  displaySymbols,
  activeTab,
  toggleFavorite,
  isFavorite,
  convertToTradingSymbol,
  loadPossessionSymbols,
  loadWatchlistSymbols,
} = useSymbolData();

// 보유종목 탭 활성화
activeTab.value = SYMBOL_LIST_TAB.POSSESSION;

const symbolListRef = ref<HTMLElement | null>(null);

// 메서드
const handleSymbolClick = (symbol: SymbolDisplayData) => {
  emit('symbol-select', convertToTradingSymbol(symbol));
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
  // console.log('[PossessionTab] 컴포넌트 마운트 - 데이터 로드 시작');
  // 보유종목과 관심종목 목록을 모두 로드
  await Promise.all([loadPossessionSymbols(), loadWatchlistSymbols()]);
  // console.log('[PossessionTab] 데이터 로드 완료');
});
</script>

<style scoped lang="scss">
@use '../SymbolList.scss';
</style>
