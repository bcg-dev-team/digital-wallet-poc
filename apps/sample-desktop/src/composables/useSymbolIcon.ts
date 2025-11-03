/**
 * 종목 아이콘 관련 로직을 관리하는 composable
 * 통화쌍 아이콘, 지수 심볼 플래그 아이콘, 일반 심볼 아이콘을 통합적으로 처리합니다.
 */

import {
  generateSymbolIcon,
  getCurrencyPairIconInfo,
  getIndexSymbolIconInfo,
  getSymbolIconAlt,
} from '@template/utils';
import type { SymbolDisplayData } from './useSymbolData';
import { SYMBOL_CATEGORIES } from '@template/types';
import { computed } from 'vue';

/**
 * 종목 아이콘 관련 상태와 로직을 관리하는 composable
 * @param symbol 종목 데이터
 * @returns 아이콘 관련 상태와 메서드들
 */
export function useSymbolIcon(symbol: SymbolDisplayData) {
  /**
   * 통화쌍인지 확인
   */
  const isCurrencyPair = computed(() => {
    return (
      symbol.stockCd.length === 6 &&
      symbol.stockCd.slice(0, 3).match(/^[A-Z]{3}$/) &&
      symbol.stockCd.slice(3, 6).match(/^[A-Z]{3}$/)
    );
  });

  /**
   * 지수 심볼인지 확인
   */
  const isIndexSymbol = computed(() => {
    // SYMBOL_CATEGORIES.index에서 지원하는 지수 심볼인지 확인
    return SYMBOL_CATEGORIES.index.includes(symbol.stockCd as any);
  });

  /**
   * 통화쌍 아이콘 정보
   */
  const currencyPairInfo = computed(() => {
    if (!isCurrencyPair.value) {
      return { baseFlagIcon: null, quoteFlagIcon: null };
    }

    const baseCurrency = symbol.stockCd.slice(0, 3);
    const quoteCurrency = symbol.stockCd.slice(3, 6);

    return getCurrencyPairIconInfo(baseCurrency, quoteCurrency);
  });

  /**
   * 지수 심볼 아이콘 정보
   */
  const indexSymbolInfo = computed(() => {
    if (!isIndexSymbol.value) {
      return { flagIcon: null };
    }

    return getIndexSymbolIconInfo(symbol.stockCd);
  });

  /**
   * Base currency 코드
   */
  const baseCurrency = computed(() => {
    if (!isCurrencyPair.value) return '';
    return symbol.stockCd.slice(0, 3);
  });

  /**
   * Quote currency 코드
   */
  const quoteCurrency = computed(() => {
    if (!isCurrencyPair.value) return '';
    return symbol.stockCd.slice(3, 6);
  });

  /**
   * Base currency fallback 아이콘 URL
   */
  const baseFallbackIconUrl = computed(() => {
    if (!isCurrencyPair.value || currencyPairInfo.value.baseFlagIcon) return '';

    return generateSymbolIcon(baseCurrency.value, {
      size: 18,
    });
  });

  /**
   * Quote currency fallback 아이콘 URL
   */
  const quoteFallbackIconUrl = computed(() => {
    if (!isCurrencyPair.value || currencyPairInfo.value.quoteFlagIcon) return '';

    return generateSymbolIcon(quoteCurrency.value, {
      size: 18,
    });
  });

  /**
   * 아이콘 alt 텍스트
   */
  const symbolAlt = computed(() => {
    const category = symbol.metadata?.stockGroupCd;
    return getSymbolIconAlt(symbol.stockCd, category);
  });

  /**
   * 실제 사용할 아이콘 URL
   * 항상 fallback 아이콘 사용 (API에서 실제 아이콘 URL 제공하지 않음)
   */
  const actualIconUrl = computed(() => {
    return generateSymbolIcon(symbol.stockCd, {
      size: 18,
    });
  });

  return {
    // 상태
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
  };
}
