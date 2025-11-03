/**
 * 심볼 리스트 탭 타입
 */
export type SymbolListTabType = 'all' | 'watchlist' | 'possession';

/**
 * 심볼 리스트 탭 상수
 */
export const SYMBOL_LIST_TAB = {
  ALL: 'all' as const,
  WATCHLIST: 'watchlist' as const,
  POSSESSION: 'possession' as const,
} as const;
