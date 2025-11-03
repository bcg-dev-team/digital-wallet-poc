<!--
  SymbolIcon 컴포넌트
  종목 아이콘을 렌더링하는 전용 컴포넌트
  통화쌍, 지수 심볼, 일반 심볼을 구분하여 적절한 아이콘을 표시합니다.
-->
<template>
  <div class="symbol-icon">
    <!-- 통화쌍인 경우 BaseIcon 사용 -->
    <div v-if="isCurrencyPair" class="currency-pair-icons">
      <!-- 좌측 플래그 (base currency) -->
      <BaseIcon
        v-if="currencyPairInfo.baseFlagIcon"
        :name="currencyPairInfo.baseFlagIcon as any"
        :size="18"
        class="base-flag-icon"
      />
      <!-- 좌측 fallback 아이콘 (base currency에 플래그가 없는 경우) -->
      <img
        v-else-if="baseFallbackIconUrl"
        :src="baseFallbackIconUrl"
        :alt="`${baseCurrency} 아이콘`"
        class="base-fallback-icon"
      />
      <!-- 우측 플래그 (quote currency) -->
      <BaseIcon
        v-if="currencyPairInfo.quoteFlagIcon"
        :name="currencyPairInfo.quoteFlagIcon as any"
        :size="18"
        class="quote-flag-icon"
      />
      <!-- 우측 fallback 아이콘 (quote currency에 플래그가 없는 경우) -->
      <img
        v-else-if="quoteFallbackIconUrl"
        :src="quoteFallbackIconUrl"
        :alt="`${quoteCurrency} 아이콘`"
        class="quote-fallback-icon"
      />
    </div>
    <!-- 지수 심볼인 경우 국가 플래그 아이콘 사용 -->
    <div v-else-if="isIndexSymbol" class="index-symbol-icon">
      <!-- 국가 플래그 아이콘 -->
      <BaseIcon
        v-if="indexSymbolInfo.flagIcon"
        :name="indexSymbolInfo.flagIcon as any"
        :size="18"
        class="index-flag-icon"
      />
      <!-- fallback 아이콘 (플래그가 없는 경우) -->
      <img
        v-else
        :src="actualIconUrl"
        :alt="symbolAlt"
        class="index-fallback-icon"
        loading="lazy"
        decoding="async"
      />
    </div>
    <!-- 일반 심볼인 경우 생성된 아이콘 사용 -->
    <img
      v-else
      :src="actualIconUrl"
      :alt="symbolAlt"
      class="symbol-icon-image"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>

<script setup lang="ts">
import type { SymbolDisplayData } from '@/composables/useSymbolData';
import { useSymbolIcon } from '@/composables/useSymbolIcon';
import { BaseIcon } from '@template/ui';

interface Props {
  symbol: SymbolDisplayData;
}

const props = defineProps<Props>();

// 종목 아이콘 관련 로직
const {
  isCurrencyPair,
  isIndexSymbol,
  currencyPairInfo,
  indexSymbolInfo,
  baseCurrency,
  quoteCurrency,
  baseFallbackIconUrl,
  quoteFallbackIconUrl,
  symbolAlt,
  actualIconUrl,
} = useSymbolIcon(props.symbol);
</script>

<style scoped lang="scss">
@use '../../SymbolList.scss';
</style>
