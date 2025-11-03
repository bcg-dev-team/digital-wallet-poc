import { formatDate } from '../date';

/**
 * 과학적 표기법에서 소수점 자리수를 추출
 * @param value - 과학적 표기법 숫자 (1.0e-4 형식)
 * @returns 소수점 자리수
 * @example
 * getDecimalPlaces(1.0e-4) // 4
 * getDecimalPlaces(1.0e-5) // 5
 * getDecimalPlaces(1.0E-6) // 6
 * getDecimalPlaces(0.0001) // 4
 * getDecimalPlaces(0.01) // 2
 */
export function getDecimalPlaces(value: number): number {
  if (isNaN(value) || !isFinite(value) || value === 0) {
    return 5;
  }

  // 정수인 경우
  if (Number.isInteger(value)) {
    return 0;
  }

  // 문자열로 변환 (과학적 표기법 포함)
  const str = value.toString().toLowerCase();

  // 과학적 표기법인 경우 (예: 1.0e-4 또는 1.0E-4)
  if (str.includes('e')) {
    const parts = str.split('e');
    const exponent = parseInt(parts[1], 10);

    // e-4 형태면 소수점 4자리
    if (exponent < 0) {
      return Math.abs(exponent);
    }
  }

  // 일반 소수 형식인 경우 (예: 0.01)
  if (str.includes('.')) {
    return str.split('.')[1].length;
  }

  return 0;
}

/**
 * 소수점 자리수를 맞춰서 0으로 채우기
 * @param value - 포맷팅할 숫자
 * @param decimalPlaces - 원하는 소수점 자리수
 * @returns 0으로 채워진 문자열
 * @example
 * padDecimalPlaces(1.19, 5) // "1.19000"
 * padDecimalPlaces(1.1232, 5) // "1.12320"
 * padDecimalPlaces(1.23, 4) // "1.2300"
 */
export function padDecimalPlaces(value: number | string, decimalPlaces: number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num) || !isFinite(num)) {
    return '0';
  }

  return num.toFixed(decimalPlaces);
}

/**
 * AG Grid valueFormatter에서 사용할 수 있는 날짜 포맷팅 헬퍼 함수
 * Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환합니다.
 * @param value - 포맷팅할 날짜 (Date 객체, 문자열, 숫자)
 * @param formatStr - 포맷 문자열 (기본값: 'yyyy-MM-dd')
 * @returns 포맷팅된 날짜 문자열 또는 원본 값 (Date 객체가 아닌 경우)
 *
 * @example
 * ```typescript
 * // AG Grid 컬럼 정의에서 사용
 * {
 *   field: 'purchaseDate',
 *   valueFormatter: (params) => formatDateForGrid(params.value)
 * }
 * ```
 */
export function formatDateForGrid(
  value: Date | string | number | null | undefined,
  formatStr = 'yyyy-MM-dd'
): string {
  if (!value) return '';
  if (!(value instanceof Date)) {
    // 문자열이나 숫자인 경우 Date 객체로 변환 시도
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return String(value); // 유효하지 않은 날짜면 원본 반환
    }
    return formatDate(date, formatStr);
  }
  return formatDate(value, formatStr);
}

/**
 * AG Grid valueFormatter에서 사용할 수 있는 날짜-시간 포맷팅 헬퍼 함수
 * Date 객체를 'YYYY-MM-DD HH:mm:ss' 형식의 문자열로 변환합니다.
 * @param value - 포맷팅할 날짜-시간
 * @param formatStr - 포맷 문자열 (기본값: 'yyyy-MM-dd HH:mm:ss')
 * @returns 포맷팅된 날짜-시간 문자열 또는 원본 값
 *
 * @example
 * ```typescript
 * // AG Grid 컬럼 정의에서 사용
 * {
 *   field: 'createdAt',
 *   valueFormatter: (params) => formatDateTimeForGrid(params.value)
 * }
 * ```
 */
export function formatDateTimeForGrid(
  value: Date | string | number | null | undefined,
  formatStr = 'yyyy-MM-dd HH:mm:ss'
): string {
  return formatDateForGrid(value, formatStr);
}

/**
 * 날짜 문자열에서 하이픈을 제거하여 포맷팅
 * @param dateString - yyyy-mm-dd 형식의 날짜 문자열
 * @returns yyyymmdd 형식의 날짜 문자열
 * @example
 * formatDateCompact('2025-10-21') // '20251021'
 */
export function formatDateCompact(dateString: string): string {
  if (typeof dateString !== 'string') {
    console.warn('formatDateCompact: 입력값이 문자열이 아닙니다.');
    return '';
  }

  // 하이픈 제거
  const formatted = dateString.replace(/-/g, '');

  // 기본적인 유효성 검사 (8자리 숫자인지 확인)
  if (!/^\d{8}$/.test(formatted)) {
    console.warn('formatDateCompact: 올바른 날짜 형식이 아닙니다. (yyyy-mm-dd 형식을 사용하세요)');
    return dateString;
  }

  return formatted;
}
