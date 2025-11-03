/**
 * Lot과 Pip 계산 유틸리티 함수들
 * 외환 거래에서 Lot 크기와 Pip 가치를 계산하는 함수들
 */

/**
 * 심볼 메타데이터 인터페이스 (로컬 정의)
 */
export interface SymbolMetaData {
  /** 종목코드 */
  stockCd: string;
  /** (H) 기준통화코드 */
  standardCurrencyCd: string;
  /** (H) 거래통화코드 */
  tradeCurrencyCd: string;
  /** (H) Lot승수 */
  lotMultiple: number;
  /** (H) Price승수 */
  priceMultiplier: number;
  /** (H) Point단위 */
  pointUnit: number;
  /** (H) Pip단위 */
  pipUnit: number;
  /** (H) 종목그룹코드 */
  stockGroupCd: string;
  /** (H) 심볼그룹코드 */
  symbolGroupCd: string;
  /** (H) 증거금율사용여부 */
  isMarginUsage: boolean;
  /** (H) 증거금율(%) */
  marginRate: number;
  /** (H) 스프레드사용여부 */
  isSpreadUsage: boolean;
  /** (H) 매수스프레드 */
  buySpread: number;
  /** (H) 매도스프레드 */
  sellSpread: number;
  /** (H) 전일종가 */
  closePrice: number;
}

/**
 * 1Lot 값 계산
 * @param currentPrice - 기준통화 시세의 매도가
 * @param metadata - 심볼 메타데이터
 * @returns 1Lot의 실제 가치 (기준통화 기준)
 */
export const calculateLotValue = (currentPrice: number, metadata: SymbolMetaData): number => {
  // 1. Lot 승수 적용
  const lotSize = metadata.lotMultiple;

  // 2. 현재가에 Price 승수 적용
  const adjustedPrice = currentPrice * metadata.priceMultiplier;

  // 3. 1Lot의 실제 가치 계산
  const lotValue = lotSize * adjustedPrice;

  return lotValue;
};

/**
 * Pip 값 계산 (1 Pip 변화 시 손익)
 * @param metadata - 심볼 메타데이터
 * @param currentPrice - 거래통화 시세의 매도가
 * @returns 1 Pip의 가치
 */
export const calculatePipValue = (metadata: SymbolMetaData, currentPrice: number): number => {
  // 1. 1 Pip의 가치 계산
  const pipValue =
    metadata.pipUnit * metadata.lotMultiple * metadata.priceMultiplier * currentPrice;

  return pipValue;
};

/**
 * 총 거래 가치 계산 (수량 × 1Lot 가치)
 * @param symbol - 종목코드
 * @param currentPrice - 현재가
 * @param lotSize - 거래 수량 (Lots)
 * @param metadata - 심볼 메타데이터
 * @returns 총 거래 가치
 */
export const calculateTotalValue = (
  currentPrice: number,
  lotSize: number,
  metadata: SymbolMetaData
): number => {
  const lotValue = calculateLotValue(currentPrice, metadata);
  return lotValue * lotSize;
};

/**
 * 증거금 계산 (마진 요구사항)
 * @param symbol - 종목코드
 * @param currentPrice - 현재가
 * @param lotSize - 거래 수량 (Lots)
 * @param metadata - 심볼 메타데이터
 * @returns 필요한 증거금
 */
export const calculateMargin = (
  currentPrice: number,
  lotSize: number,
  metadata: SymbolMetaData
): number => {
  if (!metadata.isMarginUsage) {
    return 0;
  }

  const totalValue = calculateTotalValue(currentPrice, lotSize, metadata);
  return totalValue * (metadata.marginRate / 100);
};

/**
 * 최소 증거금 계산
 * @param metadata - 심볼 메타데이터
 * @param lotValue - 1Lot 값
 * @returns 최소 증거금
 */
export const calculateMinimumMargin = (marginRate: number, lotValue: number): number => {
  return (marginRate / 100) * lotValue;
};

/**
 * 스프레드 비용 계산
 * @param symbol - 종목코드
 * @param lotSize - 거래 수량 (Lots)
 * @param metadata - 심볼 메타데이터
 * @returns 스프레드 비용
 */
export const calculateSpreadCost = (
  symbol: string,
  lotSize: number,
  metadata: SymbolMetaData
): number => {
  if (!metadata.isSpreadUsage) {
    return 0;
  }

  const baseLotSize = 100000;
  const actualLotSize = baseLotSize * metadata.lotMultiple * lotSize;

  // 매수/매도 스프레드의 평균값 사용
  const averageSpread = (metadata.buySpread + metadata.sellSpread) / 2;

  return actualLotSize * averageSpread;
};

/**
 * 포맷된 가격 문자열 생성 (Lot/Pip 전용)
 * @param value - 가격 값
 * @param decimals - 소수점 자릿수 (기본값: 2)
 * @returns 포맷된 가격 문자열
 */
export const formatLotPrice = (value: number, decimals: number = 2): string => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * 포맷된 통화 문자열 생성 (Lot/Pip 전용)
 * @param value - 금액
 * @param currency - 통화 코드 (기본값: 'USD')
 * @param decimals - 소수점 자릿수 (기본값: 2)
 * @returns 포맷된 통화 문자열
 */
export const formatLotCurrency = (
  value: number,
  currency: string = 'USD',
  decimals: number = 2
): string => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
