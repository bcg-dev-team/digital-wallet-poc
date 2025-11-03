<template>
  <!-- 카테고리 헤더 -->
  <div
    class="category-header mx-2 flex cursor-pointer select-none items-center justify-between rounded-[6px] py-2 pl-6 pr-4"
    @click="$emit('toggle')"
  >
    <div class="text-[14px]">{{ title }}</div>
    <BaseIcon
      name="arrow-down"
      size="sm"
      :class="`ml-2 flex-shrink-0 transition-transform duration-200 ${isOpen ? '' : 'rotate-[-90deg]'}`"
    />
  </div>

  <!-- 종목 리스트 -->
  <div
    class="category-content overflow-hidden px-2 transition-all duration-300 ease-in-out"
    :class="isOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'"
  >
    <SymbolItem
      v-for="symbol in symbols"
      :key="symbol.stockCd"
      :symbol="symbol"
      :is-selected="currentSelectedSymbol === symbol.stockCd"
      :is-favorite="isFavorite(symbol.stockCd)"
      :price-decimals="getDecimalPlaces(metadataStore.getMetadata(symbol.stockCd)?.pointUnit || 0)"
      @click="handleSymbolClick"
      @toggle-favorite="toggleFavorite"
    />
  </div>
</template>

<script setup lang="ts">
import type { SymbolDisplayData } from '@/composables/useSymbolData';
import { useMetadataStore } from '@/stores/useMetadataStore';
import { getDecimalPlaces } from '@template/utils';
import SymbolItem from './SymbolItem.vue';
import { BaseIcon } from '@template/ui';
const metadataStore = useMetadataStore();

interface Props {
  title: string;
  symbols: SymbolDisplayData[];
  isOpen: boolean;
  currentSelectedSymbol: string | null;
  isFavorite: (stockCd: string) => boolean;
}

interface Emits {
  (e: 'toggle'): void;
  (e: 'symbol-click', symbol: SymbolDisplayData): void;
  (e: 'toggle-favorite', stockCd: string): void;
}

withDefaults(defineProps<Props>(), {});
const emit = defineEmits<Emits>();

const handleSymbolClick = (symbol: SymbolDisplayData) => {
  emit('symbol-click', symbol);
};

const toggleFavorite = (stockCd: string) => {
  emit('toggle-favorite', stockCd);
};
</script>

<style scoped lang="scss">
@use '../../SymbolList.scss';
</style>
