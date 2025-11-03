<template>
  <div
    :data-ticker="symbol.stockCd"
    class="symbol-item"
    :class="[
      { selected: isSelected },
      { 'flash-up': flashState === 'up' },
      { 'flash-down': flashState === 'down' },
    ]"
    role="button"
    tabindex="0"
    @click="$emit('click', symbol)"
    @keydown.enter="$emit('click', symbol)"
    @keydown.space.prevent="$emit('click', symbol)"
  >
    <div class="symbol-content">
      <div class="symbol-info">
        <SymbolIcon :symbol="symbol" />
        <div class="symbol-name" :title="symbol.stockCd">{{ symbol.stockCd }}</div>
      </div>
      <div class="symbol-values">
        <div class="price-info">
          <div class="price">{{ formattedPrice }}</div>
          <div class="change" :style="{ color: priceColor }">
            {{ formattedChangeRate }}
          </div>
        </div>
        <button class="favorite-button" @click.stop="$emit('toggle-favorite', symbol.stockCd)">
          <BaseIcon
            name="heart-thin"
            size="sm"
            :color="isFavorite ? 'var(--font-color-red)' : 'var(--input-icon-favorite-before)'"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProfitLossColor, formatChangeRate } from '@template/utils';
import type { SymbolDisplayData } from '@/composables/useSymbolData';
import { computed, ref, watch } from 'vue';
import SymbolIcon from './SymbolIcon.vue';
import { BaseIcon } from '@template/ui';

interface Props {
  symbol: SymbolDisplayData;
  isSelected: boolean;
  isFavorite: boolean;
  priceDecimals?: number;
}

interface Emits {
  (e: 'click', symbol: SymbolDisplayData): void;
  (e: 'toggle-favorite', stockCd: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  priceDecimals: 5,
});

const emit = defineEmits<Emits>();

// 플래시 효과를 위한 상태
const flashState = ref<'' | 'up' | 'down'>('');
const previousPrice = ref(props.symbol.currentPrice);

// 가격 변화 감지
watch(
  () => props.symbol.currentPrice,
  (newPrice, oldPrice) => {
    if (newPrice === 0 || oldPrice === 0) return; // 초기값 무시
    if (newPrice === oldPrice) return; // 변화 없음

    if (newPrice > previousPrice.value) {
      flashState.value = 'up';
    } else if (newPrice < previousPrice.value) {
      flashState.value = 'down';
    }

    previousPrice.value = newPrice;

    // 300ms 후 플래시 효과 제거
    setTimeout(() => {
      flashState.value = '';
    }, 300);
  }
);

/**
 * 포맷팅된 가격
 * 0이면 '-' 표시
 */
const formattedPrice = computed(() => {
  if (props.symbol.currentPrice === 0) return '-';
  return props.symbol.currentPrice.toFixed(props.priceDecimals);
});

/**
 * 포맷팅된 등락률
 * 현재가가 0이면 '-' 표시
 */
const formattedChangeRate = computed(() => {
  if (props.symbol.currentPrice === 0) return '-';
  return formatChangeRate(props.symbol.changeRate, 2);
});

/**
 * 가격 색상
 * 현재가가 0이면 기본 색상
 */
const priceColor = computed(() => {
  if (props.symbol.currentPrice === 0) return 'var(--font-color-tertiary)';
  return getProfitLossColor(props.symbol.changeRate);
});
</script>

<style scoped lang="scss">
@use '../../SymbolList.scss';

.symbol-item {
  transition: background-color 0.3s ease-out;

  &.flash-up {
    background-color: rgba(246, 51, 56, 0.1);
  }

  &.flash-down {
    background-color: rgba(0, 103, 239, 0.1);
  }
}

.market-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
  font-size: 11px;
  line-height: 1.2;

  .change-amount {
    font-weight: 500;
  }

  .volume-info {
    color: var(--font-color-secondary);
  }
}
</style>
