import {
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  differenceInYears,
  addDays,
  addMonths,
  addYears,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { formatInTimeZone, toZonedTime, getTimezoneOffset } from 'date-fns-tz';
import type { Locale as DateFnsLocale } from 'date-fns';
import { ko, enUS, ja, zhCN } from 'date-fns/locale';

/**
 * 날짜 유틸리티 함수들
 * date-fns와 date-fns-tz를 기반으로 한 날짜 처리 유틸리티입니다.
 */

/** 로케일 매핑 */
const localeMap: Record<string, DateFnsLocale> = {
  ko,
  en: enUS,
  ja,
  zh: zhCN,
};

/**
 * 날짜를 지정된 형식으로 포맷팅합니다.
 * @param date - 포맷팅할 날짜
 * @param formatStr - 포맷 문자열 (기본값: 'yyyy-MM-dd')
 * @param locale - 로케일 (기본값: 'ko')
 * @param timeZone - 시간대 (기본값: 'Asia/Seoul')
 * @returns 포맷팅된 날짜 문자열
 * @throws {Error} 유효하지 않은 날짜인 경우
 *
 * @example
 * ```typescript
 * formatDate(new Date(), 'yyyy년 MM월 dd일'); // "2024년 01월 15일"
 * formatDate('2024-01-15', 'yyyy/MM/dd', 'en'); // "2024/01/15"
 * ```
 */
export function formatDate(
  date: Date | string | number,
  formatStr = 'yyyy-MM-dd',
  locale: string = 'ko',
  timeZone = 'Asia/Seoul'
): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  return formatInTimeZone(d, timeZone, formatStr, {
    locale: localeMap[locale],
  });
}

/**
 * 상대적 시간을 표시합니다 (예: "3분 전", "1시간 전").
 * @param date - 기준 날짜
 * @param locale - 로케일 (기본값: 'ko')
 * @returns 상대적 시간 문자열
 * @throws {Error} 유효하지 않은 날짜인 경우
 *
 * @example
 * ```typescript
 * formatRelativeTime(new Date(Date.now() - 60000)); // "1분 전"
 * formatRelativeTime('2024-01-01'); // "15일 전"
 * ```
 */
export function formatRelativeTime(date: Date | string | number, locale: string = 'ko'): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  return formatDistanceToNow(d, {
    addSuffix: true,
    locale: localeMap[locale],
  });
}

/**
 * 날짜가 오늘인지 확인합니다.
 * @param date - 확인할 날짜
 * @returns 오늘인지 여부
 */
export function isTodayDate(date: Date | string | number): boolean {
  const d = new Date(date);
  return isToday(d);
}

/**
 * 날짜가 어제인지 확인합니다.
 * @param date - 확인할 날짜
 * @returns 어제인지 여부
 */
export function isYesterdayDate(date: Date | string | number): boolean {
  const d = new Date(date);
  return isYesterday(d);
}

/**
 * 날짜가 이번 주인지 확인합니다.
 * @param date - 확인할 날짜
 * @returns 이번 주인지 여부
 */
export function isThisWeekDate(date: Date | string | number): boolean {
  const d = new Date(date);
  return isThisWeek(d);
}

/**
 * 날짜가 이번 달인지 확인합니다.
 * @param date - 확인할 날짜
 * @returns 이번 달인지 여부
 */
export function isThisMonthDate(date: Date | string | number): boolean {
  const d = new Date(date);
  return isThisMonth(d);
}

/**
 * 두 날짜 사이의 모든 날짜를 배열로 반환합니다.
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @returns 날짜 배열
 *
 * @example
 * ```typescript
 * const dates = getDateRange('2024-01-01', '2024-01-05');
 * // [2024-01-01, 2024-01-02, 2024-01-03, 2024-01-04, 2024-01-05]
 * ```
 */
export function getDateRange(
  startDate: Date | string | number,
  endDate: Date | string | number
): Date[] {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return eachDayOfInterval({ start, end });
}

/**
 * 지정된 날짜가 속한 월의 첫 번째 날과 마지막 날을 반환합니다.
 * @param date - 기준 날짜
 * @returns 월의 시작일과 종료일
 *
 * @example
 * ```typescript
 * const { start, end } = getMonthBoundaries('2024-01-15');
 * // start: 2024-01-01, end: 2024-01-31
 * ```
 */
export function getMonthBoundaries(date: Date | string | number): { start: Date; end: Date } {
  const d = new Date(date);

  return {
    start: startOfMonth(d),
    end: endOfMonth(d),
  };
}

/**
 * 생년월일로부터 현재 나이를 계산합니다.
 * @param birthDate - 생년월일
 * @returns 나이
 *
 * @example
 * ```typescript
 * const age = calculateAge('1990-05-15'); // 33
 * ```
 */
export function calculateAge(birthDate: Date | string | number): number {
  const birth = new Date(birthDate);
  const today = new Date();

  return differenceInYears(today, birth);
}

/**
 * 날짜를 한 시간대에서 다른 시간대로 변환합니다.
 * @param date - 변환할 날짜
 * @param fromTimezone - 원본 시간대
 * @param toTimezone - 대상 시간대
 * @returns 변환된 날짜
 *
 * @example
 * ```typescript
 * const seoulTime = convertTimezone('2024-01-15T10:00:00Z', 'UTC', 'Asia/Seoul');
 * ```
 */
export function convertTimezone(
  date: Date | string | number,
  fromTimezone: string,
  toTimezone: string
): Date {
  const d = new Date(date);

  // fromTimezone에서 toTimezone으로 직접 변환
  return toZonedTime(d, toTimezone);
}

/**
 * 두 날짜 간의 차이를 지정된 단위로 계산합니다.
 * @param date1 - 첫 번째 날짜
 * @param date2 - 두 번째 날짜
 * @param unit - 차이 단위 (기본값: 'days')
 * @returns 차이 값
 *
 * @example
 * ```typescript
 * const daysDiff = getDateDiff('2024-01-01', '2024-01-15'); // 14
 * const hoursDiff = getDateDiff('2024-01-01T10:00:00', '2024-01-01T15:00:00', 'hours'); // 5
 * ```
 */
export function getDateDiff(
  date1: Date | string | number,
  date2: Date | string | number,
  unit: 'days' | 'hours' | 'minutes' | 'seconds' = 'days'
): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  switch (unit) {
    case 'days':
      return differenceInDays(d2, d1);
    case 'hours':
      return differenceInHours(d2, d1);
    case 'minutes':
      return differenceInMinutes(d2, d1);
    case 'seconds':
      return differenceInSeconds(d2, d1);
    default:
      return differenceInDays(d2, d1);
  }
}

/**
 * 날짜에 지정된 일수를 추가합니다.
 * @param date - 기준 날짜
 * @param days - 추가할 일수
 * @returns 새로운 날짜
 */
export function addDaysToDate(date: Date | string | number, days: number): Date {
  const d = new Date(date);
  return addDays(d, days);
}

/**
 * 날짜에 지정된 개월수를 추가합니다.
 * @param date - 기준 날짜
 * @param months - 추가할 개월수
 * @returns 새로운 날짜
 */
export function addMonthsToDate(date: Date | string | number, months: number): Date {
  const d = new Date(date);
  return addMonths(d, months);
}

/**
 * 날짜에 지정된 년수를 추가합니다.
 * @param date - 기준 날짜
 * @param years - 추가할 년수
 * @returns 새로운 날짜
 */
export function addYearsToDate(date: Date | string | number, years: number): Date {
  const d = new Date(date);
  return addYears(d, years);
}

/**
 * 현재 시간을 지정된 시간대에서 가져옵니다.
 * @param timeZone - 시간대 (기본값: 'Asia/Seoul')
 * @returns 현재 시간
 */
export function nowInTimezone(timeZone = 'Asia/Seoul'): Date {
  return toZonedTime(new Date(), timeZone);
}

/**
 * 지정된 시간대의 오프셋을 분 단위로 가져옵니다.
 * @param timezone - 시간대
 * @returns 오프셋 (분)
 *
 * @example
 * ```typescript
 * const offset = getTimezoneOffsetInMinutes('Asia/Seoul'); // 540 (UTC+9)
 * ```
 */
export function getTimezoneOffsetInMinutes(timezone: string): number {
  return getTimezoneOffset(timezone);
}
