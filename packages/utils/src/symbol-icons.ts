/**
 * 종목 아이콘 관련 유틸리티 함수
 * 런타임에 SVG를 생성하여 fallback 아이콘을 제공합니다.
 */

import { getSymbolCategory, type IconName } from '@template/types';

/**
 * 아이콘 캐시 맵
 * 생성된 아이콘을 메모리에 캐시하여 성능을 최적화합니다.
 */
const iconCache = new Map<string, string>();

/**
 * 통화 코드와 플래그 아이콘 이름 매핑
 */
const CURRENCY_FLAG_MAP = {
  USD: 'flag-us',
  EUR: 'flag-eu',
  GBP: 'flag-uk',
  JPY: 'flag-jp',
  CHF: 'flag-sui',
  CAD: 'flag-ca',
  AUD: 'flag-au',
  NZD: 'flag-nz',
  SEK: 'flag-se',
  NOK: 'flag-nr',
  TRY: 'flag-tr',
  MXN: 'flag-mx',
  ZAR: 'flag-za',
  SGD: 'flag-sg',
  HKD: 'flag-hk',
  KRW: 'flag-kr',
  CNY: 'flag-cn',
} as const;

/**
 * 지수 심볼의 국가 코드와 플래그 아이콘 매핑
 * 지수 심볼은 국가코드 + 숫자 형태 (예: AUS200, CN50, UK100, US30)
 */
const INDEX_COUNTRY_FLAG_MAP = {
  AUS: 'flag-au', // 호주
  CN: 'flag-cn', // 중국
  UK: 'flag-uk', // 영국
  US: 'flag-us', // 미국
} as const;

/**
 * 카테고리별 기본 색상 정의
 */
export const CATEGORY_COLORS = {
  forex: '#4A90E2', // 파란색 - 외환
  index: '#7ED321', // 초록색 - 지수
  commodity: '#F5A623', // 주황색 - 상품
  crypto: '#BD10E0', // 보라색 - 가상화폐
} as const;

/**
 * 종목 아이콘 생성 옵션
 */
export interface SymbolIconOptions {
  size?: number;
  borderRadius?: number;
  fontSize?: number;
  fontWeight?: string | number;
}

/**
 * 통화쌍인지 확인
 * @param stockCd 종목코드
 * @returns 통화쌍 여부
 */
function isCurrencyPair(stockCd: string): boolean {
  // 6글자이고 첫 3글자와 마지막 3글자가 모두 통화 코드인 경우
  if (stockCd.length === 6) {
    const baseCurrency = stockCd.slice(0, 3);
    const quoteCurrency = stockCd.slice(3, 6);
    return baseCurrency in CURRENCY_FLAG_MAP && quoteCurrency in CURRENCY_FLAG_MAP;
  }
  return false;
}

/**
 * 통화쌍에서 base와 quote 통화 코드 추출
 * @param stockCd 종목코드
 * @returns base와 quote 통화 코드
 */
function parseCurrencyPair(stockCd: string): { base: string; quote: string } | null {
  if (!isCurrencyPair(stockCd)) return null;

  return {
    base: stockCd.slice(0, 3),
    quote: stockCd.slice(3, 6),
  };
}

/**
 * 통화 코드별 플래그 아이콘 이름 반환
 * @param currencyCode 통화 코드
 * @returns 플래그 아이콘 이름
 */
function getCurrencyFlagIcon(currencyCode: string): string {
  return CURRENCY_FLAG_MAP[currencyCode as keyof typeof CURRENCY_FLAG_MAP] || '';
}

/**
 * 지수 심볼인지 확인
 * @param stockCd 종목코드
 * @returns 지수 심볼 여부
 */
function isIndexSymbol(stockCd: string): boolean {
  // INDEX_COUNTRY_FLAG_MAP의 키를 사용하여 동적으로 패턴 확인
  const indexPatterns = Object.keys(INDEX_COUNTRY_FLAG_MAP);
  return indexPatterns.some((pattern) => stockCd.startsWith(pattern));
}

/**
 * 지수 심볼에서 국가 코드 추출
 * @param stockCd 종목코드
 * @returns 국가 코드 또는 null
 */
function extractIndexCountryCode(stockCd: string): string | null {
  if (!isIndexSymbol(stockCd)) return null;

  // INDEX_COUNTRY_FLAG_MAP의 키를 사용하여 동적으로 국가 코드 추출
  const indexPatterns = Object.keys(INDEX_COUNTRY_FLAG_MAP);
  for (const pattern of indexPatterns) {
    if (stockCd.startsWith(pattern)) {
      return pattern;
    }
  }

  return null;
}

/**
 * 지수 심볼의 국가 플래그 아이콘 이름 반환
 * @param stockCd 종목코드
 * @returns 플래그 아이콘 이름 또는 null
 */
function getIndexCountryFlagIcon(stockCd: string): string | null {
  const countryCode = extractIndexCountryCode(stockCd);
  if (!countryCode) return null;

  return INDEX_COUNTRY_FLAG_MAP[countryCode as keyof typeof INDEX_COUNTRY_FLAG_MAP] || null;
}

/**
 * 통화쌍 아이콘 정보 반환
 * BaseIcon을 사용하기 위한 메타데이터를 반환합니다.
 * @param baseCurrency base 통화 코드
 * @param quoteCurrency quote 통화 코드
 * @returns 통화쌍 아이콘 정보
 */
export function getCurrencyPairIconInfo(
  baseCurrency: string,
  quoteCurrency: string
): { baseFlagIcon: IconName | null; quoteFlagIcon: IconName | null } {
  const baseFlagIcon = getCurrencyFlagIcon(baseCurrency);
  const quoteFlagIcon = getCurrencyFlagIcon(quoteCurrency);

  return {
    baseFlagIcon: baseFlagIcon as IconName | null,
    quoteFlagIcon: quoteFlagIcon as IconName | null,
  };
}

/**
 * 지수 심볼 아이콘 정보 반환
 * 지수 심볼의 국가 플래그 아이콘 정보를 반환합니다.
 * @param stockCd 종목코드
 * @returns 지수 심볼 아이콘 정보
 */
export function getIndexSymbolIconInfo(stockCd: string): { flagIcon: IconName | null } {
  const flagIcon = getIndexCountryFlagIcon(stockCd);

  return {
    flagIcon: flagIcon as IconName | null,
  };
}

/**
 * 텍스트 기반 원형 아이콘 생성
 * @param text 표시할 텍스트
 * @param options 아이콘 생성 옵션
 * @returns SVG Data URL
 */
function generateTextBasedIcon(text: string, options: SymbolIconOptions = {}): string {
  const {
    size = 18,
    borderRadius = size / 2, // 완전한 원형
    fontSize = Math.max(8, size * 0.4),
    fontWeight = '600',
  } = options;

  // 카테고리 확인
  const category = getSymbolCategory(text);

  // 색상 선택
  const bgColor = getCategoryColor(category);

  // 텍스트 생성 (종목코드의 앞 2글자)
  const displayText = text.slice(0, 2).toUpperCase();

  // SVG 생성
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${bgColor}"/>
<text x="50%" y="50%" dy="0.35em" text-anchor="middle" fill="#ffffff" font-size="${fontSize}" font-family="system-ui, -apple-system, sans-serif" font-weight="${fontWeight}">${displayText}</text>
</svg>`;

  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
}

/**
 * 캐시 키 생성
 * @param stockCd 종목코드
 * @param options 아이콘 생성 옵션
 * @returns 캐시 키
 */
function generateCacheKey(stockCd: string, options: SymbolIconOptions): string {
  const {
    size = 18,
    borderRadius = size / 2,
    fontSize = Math.max(8, size * 0.4),
    fontWeight = '600',
  } = options;

  return `${stockCd}-${size}-${borderRadius}-${fontSize}-${fontWeight}`;
}

/**
 * 종목별 fallback 아이콘을 SVG Data URL로 생성
 * 캐싱을 통해 성능을 최적화합니다.
 * @param stockCd 종목코드
 * @param options 아이콘 생성 옵션
 * @returns SVG Data URL
 */
export function generateSymbolIcon(stockCd: string, options: SymbolIconOptions = {}): string {
  const cacheKey = generateCacheKey(stockCd, options);

  // 캐시에서 확인
  if (iconCache.has(cacheKey)) {
    return iconCache.get(cacheKey)!;
  }

  let dataUrl: string;

  // 통화쌍인지 확인
  const currencyPair = parseCurrencyPair(stockCd);

  if (currencyPair) {
    // 통화쌍인 경우: 텍스트 기반 원형 아이콘 생성 (BaseIcon은 컴포넌트에서 처리)
    dataUrl = generateTextBasedIcon(stockCd, options);
  } else {
    // 일반 심볼인 경우: 텍스트 기반 원형 아이콘 생성
    dataUrl = generateTextBasedIcon(stockCd, options);
  }

  // 캐시에 저장
  iconCache.set(cacheKey, dataUrl);

  return dataUrl;
}

/**
 * 종목 아이콘 URL을 반환하는 함수
 * 커스텀 아이콘이 있으면 우선 사용, 없으면 fallback 생성
 * @param stockCd 종목코드
 * @param customIconUrl 커스텀 아이콘 URL (옵셔널)
 * @param options 아이콘 생성 옵션
 * @returns 아이콘 URL
 */
export function getSymbolIconUrl(
  stockCd: string,
  customIconUrl?: string,
  options: SymbolIconOptions = {}
): string {
  // 커스텀 아이콘이 있으면 우선 사용
  if (customIconUrl) {
    return customIconUrl;
  }

  // fallback 아이콘 생성
  return generateSymbolIcon(stockCd, options);
}

/**
 * 종목 아이콘의 alt 텍스트 생성
 * @param stockCd 종목코드
 * @param category 카테고리 (옵셔널)
 * @returns alt 텍스트
 */
export function getSymbolIconAlt(stockCd: string, category?: string): string {
  const categoryText = category ? ` (${category})` : '';
  return `${stockCd} 아이콘${categoryText}`;
}

/**
 * 카테고리별 아이콘 색상을 반환
 * @param category 카테고리
 * @returns 색상 코드
 */
export function getCategoryColor(category?: string): string {
  return CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || '#999999';
}

/**
 * 아이콘 로딩 실패 시 fallback 처리
 * @param stockCd 종목코드
 * @param options 아이콘 생성 옵션
 * @returns fallback 아이콘 URL
 */
export function getFallbackIconUrl(stockCd: string, options: SymbolIconOptions = {}): string {
  return generateSymbolIcon(stockCd, options);
}

/**
 * 아이콘 URL 유효성 검사
 * @param url 아이콘 URL
 * @returns 유효한 URL인지 여부
 */
export function isValidIconUrl(url: string): boolean {
  if (!url) return false;

  // data URL 또는 http/https URL인지 확인
  return (
    url.startsWith('data:') ||
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('/')
  );
}

/**
 * 아이콘 캐시 초기화
 * 메모리 사용량을 줄이기 위해 필요시 호출
 */
export function clearIconCache(): void {
  iconCache.clear();
}

/**
 * 특정 종목의 아이콘 캐시 제거
 * @param stockCd 종목코드
 */
export function clearIconCacheForSymbol(stockCd: string): void {
  const keysToDelete: string[] = [];

  for (const key of iconCache.keys()) {
    if (key.startsWith(stockCd)) {
      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach((key) => iconCache.delete(key));
}

/**
 * 캐시 통계 정보 반환
 * @returns 캐시 상태 정보
 */
export function getIconCacheStats(): { size: number; keys: string[] } {
  return {
    size: iconCache.size,
    keys: Array.from(iconCache.keys()),
  };
}
