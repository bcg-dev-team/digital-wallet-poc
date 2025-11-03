/**
 * 트레이딩 스프레드 계산 유틸리티
 * 심볼별 스프레드 계산 및 매수/매도 가격 산출
 */

/**
 * 심볼별 스프레드 계산
 * @param symbol - 심볼명
 * @param basePrice - 기준 가격
 * @returns 스프레드 값
 */
export function calculateSpread(symbol: string, basePrice: number): number {
  // 기본 스프레드
  let spread = 0.0001;

  // JPY 쌍은 더 큰 스프레드
  if (symbol.includes('JPY')) {
    spread = 0.01;
  }
  // 암호화폐는 비율 스프레드
  else if (symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('XRP')) {
    spread = basePrice * 0.0001;
  }
  // 귀금속은 더 큰 스프레드
  else if (symbol.includes('XAU') || symbol.includes('XAG')) {
    spread = 0.1;
  }
  // 원자재
  else if (symbol.includes('Oil')) {
    spread = 0.05;
  }
  // 주식
  else if (symbol.includes('AAPL') || symbol.includes('GOOGL') || symbol.includes('MSFT')) {
    spread = 0.01;
  }
  // 지수
  else if (symbol.includes('US30') || symbol.includes('NAS100') || symbol.includes('JPN225')) {
    spread = 1.0;
  }

  return spread;
}

/**
 * 매수 가격 계산 (Ask 가격)
 * @param symbol - 심볼명
 * @param basePrice - 기준 가격
 * @returns 매수 가격
 */
export function calculateBuyPrice(symbol: string, basePrice: number): number {
  if (basePrice === 0) return 0;

  const spread = calculateSpread(symbol, basePrice);
  return Math.round((basePrice + spread) * 100000) / 100000;
}

/**
 * 매도 가격 계산 (Bid 가격)
 * @param symbol - 심볼명
 * @param basePrice - 기준 가격
 * @returns 매도 가격
 */
export function calculateSellPrice(symbol: string, basePrice: number): number {
  if (basePrice === 0) return 0;

  const spread = calculateSpread(symbol, basePrice);
  return Math.round((basePrice - spread) * 100000) / 100000;
}

/**
 * 매수/매도 가격을 한번에 계산
 * @param symbol - 심볼명
 * @param basePrice - 기준 가격
 * @returns { buyPrice, sellPrice }
 */
export function calculateBidAskPrices(
  symbol: string,
  basePrice: number
): {
  buyPrice: number;
  sellPrice: number;
} {
  return {
    buyPrice: calculateBuyPrice(symbol, basePrice),
    sellPrice: calculateSellPrice(symbol, basePrice),
  };
}
