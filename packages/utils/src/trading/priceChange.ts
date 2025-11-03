/**
 * 등락률 계산 유틸리티
 */

/**
 * 등락률을 계산합니다
 * @param currentPrice - 현재가
 * @param closePrice - 전일 종가
 * @returns 등락률 (백분율)
 */
export function calculateChangeRate(currentPrice: number, closePrice: number): number {
  if (closePrice === 0) return 0;
  return ((currentPrice - closePrice) / closePrice) * 100;
}

/**
 * 등락폭을 계산합니다
 * @param currentPrice - 현재가
 * @param closePrice - 전일 종가
 * @returns 등락폭
 */
export function calculateChangeAmount(currentPrice: number, closePrice: number): number {
  return currentPrice - closePrice;
}

/**
 * 가격 변동 정보를 계산합니다
 * @param currentPrice - 현재가
 * @param closePrice - 전일 종가
 * @returns 등락폭, 등락률, 방향 정보
 */
export function calculatePriceChange(
  currentPrice: number,
  closePrice: number
): {
  changeAmount: number;
  changeRate: number;
  direction: 'up' | 'down' | 'unchanged';
} {
  const changeAmount = calculateChangeAmount(currentPrice, closePrice);
  const changeRate = calculateChangeRate(currentPrice, closePrice);

  let direction: 'up' | 'down' | 'unchanged' = 'unchanged';
  if (changeAmount > 0) direction = 'up';
  else if (changeAmount < 0) direction = 'down';

  return {
    changeAmount,
    changeRate,
    direction,
  };
}

/**
 * 등락률을 포맷팅합니다
 * @param changeRate - 등락률
 * @param decimalPlaces - 소수점 자릿수 (기본: 2)
 * @returns 포맷팅된 문자열 (예: "+2.50%", "-1.23%", "0.00%")
 */
export function formatChangeRate(changeRate: number, decimalPlaces: number = 2): string {
  const formatted = changeRate.toFixed(decimalPlaces);

  // 소수점 둘째 자리까지 표시했을 때 0.00이면 기호 없이 표시
  if (formatted === '0.00') {
    return `0.00%`;
  }

  const sign = changeRate > 0 ? '+' : '';
  return `${sign}${formatted}%`;
}

/**
 * 등락폭을 포맷팅합니다
 * @param changeAmount - 등락폭
 * @param decimalPlaces - 소수점 자릿수 (기본: 2)
 * @returns 포맷팅된 문자열 (예: "+1.50", "-0.75", "0.00")
 */
export function formatChangeAmount(changeAmount: number, decimalPlaces: number = 2): string {
  const formatted = changeAmount.toFixed(decimalPlaces);

  // 소수점 둘째 자리까지 표시했을 때 0.00이면 기호 없이 표시
  if (formatted === '0.00') {
    return `0.00`;
  }

  const sign = changeAmount > 0 ? '+' : '';
  return `${sign}${formatted}`;
}
