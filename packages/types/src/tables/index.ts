/**
 * 테이블 데이터 타입 및 유틸리티 통합 export
 *
 * 테이블 데이터 타입은 @template/api/generated-types에서 가져옵니다.
 * 이 파일은 화면 표시를 위한 변환 유틸리티만 제공합니다.
 */

/**
 * 테이블 데이터 변환을 위한 공통 유틸리티 함수들
 */
export class TableDataMapper {
  /**
   * 숫자 안전 캐스팅 (원본이 number면 그대로 유지, null/undefined는 0으로 대체)
   */
  static toNumber(value: unknown): number {
    if (typeof value === 'number') return value;
    if (value === null || value === undefined) return 0;
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  /**
   * 문자열 안전 캐스팅 (원본이 string이면 그대로 유지, null/undefined는 빈 문자열)
   */
  static toString(value: unknown): string {
    if (typeof value === 'string') return value;
    if (value === null || value === undefined) return '';
    return String(value);
  }

  /**
   * API 응답 배열을 테이블 데이터 배열로 변환
   * @param apiDataArray - API 응답 데이터 배열
   * @param mapperFunction - 매핑 함수
   * @returns 변환된 테이블 데이터 배열
   */
  static mapArray<T, U>(apiDataArray: T[], mapperFunction: (data: T) => U): U[] {
    return apiDataArray.map(mapperFunction);
  }

  /**
   * 숫자 데이터 포맷팅
   * @param value - 숫자 값
   * @param decimals - 소수점 자릿수 (기본값: 2)
   * @returns 포맷된 문자열
   */
  static formatNumber(value: number, decimals: number = 2): string {
    return value.toFixed(decimals);
  }

  /**
   * 통화 포맷팅
   * @param value - 금액
   * @param currency - 통화 코드 (기본값: 'USD')
   * @returns 포맷된 통화 문자열
   */
  static formatCurrency(value: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(value);
  }

  /**
   * 날짜 포맷팅
   * @param dateString - 날짜 문자열
   * @param format - 포맷 타입 (기본값: 'YYYY-MM-DD')
   * @returns 포맷된 날짜 문자열
   */
  static formatDate(
    dateString: string,
    format: 'YYYY-MM-DD' | 'MM/DD/YYYY' = 'YYYY-MM-DD'
  ): string {
    const date = new Date(dateString);
    if (format === 'MM/DD/YYYY') {
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    return date.toISOString().split('T')[0];
  }

  /**
   * 천 단위 구분자 추가
   * @param value - 숫자 값
   * @returns 천 단위 구분자가 추가된 문자열
   */
  static formatNumberWithCommas(value: number): string {
    return value.toLocaleString();
  }

  /**
   * 백분율 포맷팅
   * @param value - 백분율 값 (0-100)
   * @param decimals - 소수점 자릿수 (기본값: 2)
   * @returns 포맷된 백분율 문자열
   */
  static formatPercentage(value: number, decimals: number = 2): string {
    return `${value.toFixed(decimals)}%`;
  }

  /**
   * 손익 값에 따른 색상 클래스 반환
   */
  static getProfitLossColorClass(value: number): string {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  }
}
