import { SymbolListTabType, SYMBOL_LIST_TAB } from '@template/types';
import { RadioOption } from '@template/ui';

// 타입과 상수를 재export
export type { SymbolListTabType };
export { SYMBOL_LIST_TAB };

/**
 * 심볼 리스트 탭 라디오 옵션
 */
export interface SymbolListTabOption extends RadioOption {
  value: SymbolListTabType;
  label: string;
}

/**
 * 심볼 리스트 탭 옵션 배열
 */
export const SYMBOL_LIST_TAB_OPTIONS: SymbolListTabOption[] = [
  {
    value: SYMBOL_LIST_TAB.ALL,
    label: '전체',
  },
  {
    value: SYMBOL_LIST_TAB.WATCHLIST,
    label: '관심',
  },
  {
    value: SYMBOL_LIST_TAB.POSSESSION,
    label: '보유',
  },
];
