/**
 * 지갑 관련 전역 상수
 */
export const AVAILABLE_USDC_AMOUNT = 1_000;
export const AVAILABLE_USDC_KRW = 1_350_000;

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("ko-KR").format(value);

export const formatCurrency = (value: number, currencySymbol = "원") =>
  `${formatNumber(value)}${currencySymbol}`;
