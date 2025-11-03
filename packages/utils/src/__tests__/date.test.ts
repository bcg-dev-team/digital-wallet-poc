import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatRelativeTime,
  isTodayDate,
  isYesterdayDate,
  isThisWeekDate,
  isThisMonthDate,
  calculateAge,
  getDateDiff,
  addDaysToDate,
  addMonthsToDate,
  addYearsToDate,
  nowInTimezone,
} from '../date';

describe('Date Utils', () => {
  describe('formatDate', () => {
    it('should format date correctly with default format', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatDate(date);
      expect(result).toBe('2024-01-15');
    });

    it('should handle string date input', () => {
      const result = formatDate('2024-01-15');
      expect(result).toBe('2024-01-15');
    });

    it('should handle custom format', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatDate(date, 'yyyy-MM-dd HH:mm', 'ko', 'UTC');
      expect(result).toBe('2024-01-15 10:30');
    });

    it('should handle different locales', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const result = formatDate(date, 'yyyy년 MM월 dd일', 'ko', 'UTC');
      expect(result).toBe('2024년 01월 15일');
    });

    it('should throw error for invalid date', () => {
      expect(() => formatDate('invalid-date')).toThrow('Invalid date');
    });
  });

  describe('formatRelativeTime', () => {
    it('should format relative time correctly', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 30 * 60 * 1000); // 30분 전
      const result = formatRelativeTime(past, 'ko');
      expect(result).toContain('분 전');
    });

    it('should handle hours ago', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2시간 전
      const result = formatRelativeTime(past, 'ko');
      expect(result).toContain('시간 전');
    });

    it('should handle days ago', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000); // 3일 전
      const result = formatRelativeTime(past, 'ko');
      expect(result).toContain('일 전');
    });

    it('should handle different locales', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 30 * 60 * 1000); // 30분 전
      const result = formatRelativeTime(past, 'en');
      expect(result).toContain('minutes ago');
    });
  });

  describe('isTodayDate', () => {
    it('should return true for today', () => {
      const today = new Date();
      expect(isTodayDate(today)).toBe(true);
    });

    it('should return false for other dates', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isTodayDate(yesterday)).toBe(false);
    });

    it('should handle string input', () => {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0];
      expect(isTodayDate(todayString)).toBe(true);
    });
  });

  describe('isYesterdayDate', () => {
    it('should return true for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isYesterdayDate(yesterday)).toBe(true);
    });

    it('should return false for other dates', () => {
      const today = new Date();
      expect(isYesterdayDate(today)).toBe(false);
    });
  });

  describe('isThisWeekDate', () => {
    it('should return true for this week', () => {
      const today = new Date();
      expect(isThisWeekDate(today)).toBe(true);
    });

    it('should return false for last week', () => {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 8);
      expect(isThisWeekDate(lastWeek)).toBe(false);
    });
  });

  describe('isThisMonthDate', () => {
    it('should return true for this month', () => {
      const today = new Date();
      expect(isThisMonthDate(today)).toBe(true);
    });

    it('should return false for last month', () => {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      expect(isThisMonthDate(lastMonth)).toBe(false);
    });
  });

  describe('calculateAge', () => {
    it('should calculate age correctly', () => {
      const birthDate = new Date('1990-01-01');
      const currentYear = new Date().getFullYear();
      const expectedAge = currentYear - 1990;
      const result = calculateAge(birthDate);
      expect(result).toBe(expectedAge);
    });

    it('should handle string input', () => {
      const result = calculateAge('1990-01-01');
      const currentYear = new Date().getFullYear();
      const expectedAge = currentYear - 1990;
      expect(result).toBe(expectedAge);
    });
  });

  describe('getDateDiff', () => {
    it('should calculate days difference', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-10');
      const result = getDateDiff(date1, date2, 'days');
      expect(result).toBe(9);
    });

    it('should calculate hours difference', () => {
      const date1 = new Date('2024-01-01T10:00:00Z');
      const date2 = new Date('2024-01-01T15:00:00Z');
      const result = getDateDiff(date1, date2, 'hours');
      expect(result).toBe(5);
    });

    it('should calculate minutes difference', () => {
      const date1 = new Date('2024-01-01T10:00:00Z');
      const date2 = new Date('2024-01-01T10:30:00Z');
      const result = getDateDiff(date1, date2, 'minutes');
      expect(result).toBe(30);
    });

    it('should use days as default unit', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-10');
      const result = getDateDiff(date1, date2);
      expect(result).toBe(9);
    });
  });

  describe('addDaysToDate', () => {
    it('should add days correctly', () => {
      const date = new Date('2024-01-01');
      const result = addDaysToDate(date, 5);
      expect(result.getDate()).toBe(6);
    });

    it('should handle negative days', () => {
      const date = new Date('2024-01-10');
      const result = addDaysToDate(date, -5);
      expect(result.getDate()).toBe(5);
    });
  });

  describe('addMonthsToDate', () => {
    it('should add months correctly', () => {
      const date = new Date('2024-01-01');
      const result = addMonthsToDate(date, 2);
      expect(result.getMonth()).toBe(2); // March (0-indexed)
    });
  });

  describe('addYearsToDate', () => {
    it('should add years correctly', () => {
      const date = new Date('2024-01-01');
      const result = addYearsToDate(date, 5);
      expect(result.getFullYear()).toBe(2029);
    });
  });

  describe('nowInTimezone', () => {
    it('should return current time in specified timezone', () => {
      const result = nowInTimezone('Asia/Seoul');
      expect(result).toBeInstanceOf(Date);
    });

    it('should handle different timezones', () => {
      const result = nowInTimezone('UTC');
      expect(result).toBeInstanceOf(Date);
    });
  });
});
