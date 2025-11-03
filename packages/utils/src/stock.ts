/**
 * 종목 데이터 처리 유틸리티
 */

import { calculatePriceChange } from './trading/priceChange';

/**
 * 종목 메타데이터 인터페이스 (API 응답 기반)
 */
export interface StockMetaData {
  stockCd: string;
  standardCurrencyCd: string;
  tradeCurrencyCd: string;
  lotMultiple: number;
  priceMultiplier: number;
  pointUnit: number;
  pipUnit: number;
  stockGroupCd: string;
  symbolGroupCd: string;
  isMarginUsage: boolean;
  marginRate: number;
  isSpreadUsage: boolean;
  buySpread: number;
  sellSpread: number;
  closePrice: number;
  monTradeStartTime: string;
  monTradeEndTime: string;
  tueTradeStartTime: string;
  tueTradeEndTime: string;
  wedTradeStartTime: string;
  wedTradeEndTime: string;
  thuTradeStartTime: string;
  thuTradeEndTime: string;
  friTradeStartTime: string;
  friTradeEndTime: string;
  satTradeStartTime: string;
  satTradeEndTime: string;
  sunTradeStartTime: string;
  sunTradeEndTime: string;
}

/**
 * 종목 가격 정보 (등락률 포함)
 */
export interface StockWithPrice extends StockMetaData {
  /** 현재가 */
  currentPrice: number;
  /** 등락폭 */
  changeAmount: number;
  /** 등락률 (%) */
  changeRate: number;
  /** 등락 방향 */
  direction: 'up' | 'down' | 'unchanged';
}

/**
 * API 응답 데이터를 StockWithPrice 배열로 변환
 * @param details - API 응답 종목 상세 배열
 * @param currentPrices - 종목별 현재가 맵
 * @returns StockWithPrice 배열
 */
export function transformStockData(
  details: StockMetaData[],
  currentPrices: Record<string, string>
): StockWithPrice[] {
  return details.map((detail) => {
    const currentPriceStr = currentPrices[detail.stockCd] || '0';
    const currentPrice = parseFloat(currentPriceStr);

    const { changeAmount, changeRate, direction } = calculatePriceChange(
      currentPrice,
      detail.closePrice
    );

    return {
      ...detail,
      currentPrice,
      changeAmount,
      changeRate,
      direction,
    };
  });
}

/**
 * 종목 데이터 필터링
 * @param stocks - 종목 배열
 * @param searchQuery - 검색어
 * @returns 필터링된 종목 배열
 */
export function filterStocks(stocks: StockWithPrice[], searchQuery: string): StockWithPrice[] {
  if (!searchQuery || searchQuery.trim() === '') {
    return stocks;
  }

  const query = searchQuery.toLowerCase();
  return stocks.filter((stock) => stock.stockCd.toLowerCase().includes(query));
}

/**
 * 종목 데이터 정렬
 * @param stocks - 종목 배열
 * @param sortBy - 정렬 기준
 * @param sortOrder - 정렬 순서
 * @returns 정렬된 종목 배열
 */
export function sortStocks(
  stocks: StockWithPrice[],
  sortBy: 'stockCd' | 'changeRate' | 'currentPrice' = 'stockCd',
  sortOrder: 'asc' | 'desc' = 'asc'
): StockWithPrice[] {
  const sorted = [...stocks].sort((a, b) => {
    let compareValue = 0;

    switch (sortBy) {
      case 'stockCd':
        compareValue = a.stockCd.localeCompare(b.stockCd);
        break;
      case 'changeRate':
        compareValue = a.changeRate - b.changeRate;
        break;
      case 'currentPrice':
        compareValue = a.currentPrice - b.currentPrice;
        break;
    }

    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  return sorted;
}

/**
 * 종목 그룹별로 데이터 분류
 * @param stocks - 종목 배열
 * @returns 종목 그룹별 맵
 */
export function groupStocksByCategory(stocks: StockWithPrice[]): Record<string, StockWithPrice[]> {
  const grouped: Record<string, StockWithPrice[]> = {
    ALL: stocks,
    FOREIGN: [],
    INDEX: [],
    COMMODITY: [],
    CRYPTO: [],
  };

  stocks.forEach((stock) => {
    const category = getStockCategoryByCode(stock.stockGroupCd);
    if (grouped[category]) {
      grouped[category].push(stock);
    }
  });

  return grouped;
}

/**
 * 종목 그룹 코드로 카테고리 결정
 */
function getStockCategoryByCode(stockGroupCd: string): string {
  const map: Record<string, string> = {
    '01': 'FOREIGN',
    '02': 'INDEX',
    '03': 'COMMODITY',
    '04': 'CRYPTO',
  };
  return map[stockGroupCd] || 'ALL';
}
