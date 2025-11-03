import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateUrl,
  validateRequired,
  emailSchema,
  passwordSchema,
  phoneSchema,
  urlSchema,
  loginSchema,
  registerSchema,
  userProfileSchema,
  koreanSSNSchema,
  creditCardSchema,
} from '../validation';

describe('Validation Functions (Legacy Compatibility)', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.kr')).toBe(true);
      expect(validateEmail('test+tag@example.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const result = validatePassword('Test123!@#');
      expect(result.isValid).toBe(true);
      expect(result.score).toBe(5);
      expect(result.feedback).toEqual([]);
    });

    it('should reject weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.isValid).toBe(false);
      expect(result.score).toBe(0);
      expect(result.feedback.length).toBeGreaterThan(0);
    });

    it('should provide specific feedback for missing requirements', () => {
      const result = validatePassword('password');
      expect(result.feedback).toContain('대문자를 포함해야 합니다');
      expect(result.feedback).toContain('숫자를 포함해야 합니다');
      expect(result.feedback).toContain('특수문자를 포함해야 합니다');
    });
  });

  describe('validatePhone', () => {
    it('should validate Korean phone numbers', () => {
      expect(validatePhone('010-1234-5678')).toBe(true);
      expect(validatePhone('02-1234-5678')).toBe(true);
      expect(validatePhone('+82-10-1234-5678')).toBe(true);
      expect(validatePhone('01012345678')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(validatePhone('123-456-789')).toBe(false);
      expect(validatePhone('invalid')).toBe(false);
      expect(validatePhone('')).toBe(false);
    });
  });

  describe('validateUrl', () => {
    it('should validate correct URLs', () => {
      expect(validateUrl('https://example.com')).toBe(true);
      expect(validateUrl('http://localhost:3000')).toBe(true);
      expect(validateUrl('https://api.example.co.kr/v1')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(validateUrl('not-a-url')).toBe(false);
      expect(validateUrl('ftp://')).toBe(false);
      expect(validateUrl('')).toBe(false);
    });
  });

  describe('validateRequired', () => {
    it('should validate required values', () => {
      expect(validateRequired('test')).toBe(true);
      expect(validateRequired(' ')).toBe(false);
      expect(validateRequired('')).toBe(false);
      expect(validateRequired(null)).toBe(false);
      expect(validateRequired(undefined)).toBe(false);
    });
  });
});

describe('Zod Schemas', () => {
  describe('emailSchema', () => {
    it('should parse valid emails', () => {
      expect(() => emailSchema.parse('test@example.com')).not.toThrow();
      expect(() => emailSchema.parse('user.name@domain.co.kr')).not.toThrow();
      expect(() => emailSchema.parse('test+tag@example.org')).not.toThrow();
    });

    it('should throw for invalid emails', () => {
      expect(() => emailSchema.parse('invalid')).toThrow();
      expect(() => emailSchema.parse('test@')).toThrow();
      expect(() => emailSchema.parse('@example.com')).toThrow();
      expect(() => emailSchema.parse('')).toThrow();
    });
  });

  describe('passwordSchema', () => {
    it('should parse valid passwords', () => {
      expect(() => passwordSchema.parse('Test123!@#')).not.toThrow();
      expect(() => passwordSchema.parse('MyPass1!')).not.toThrow();
    });

    it('should throw for invalid passwords', () => {
      expect(() => passwordSchema.parse('weak')).toThrow();
      expect(() => passwordSchema.parse('password')).toThrow();
      expect(() => passwordSchema.parse('PASSWORD')).toThrow();
      expect(() => passwordSchema.parse('Password')).toThrow();
      expect(() => passwordSchema.parse('Password123')).toThrow();
      expect(() => passwordSchema.parse('')).toThrow();
    });
  });

  describe('phoneSchema', () => {
    it('should parse valid phone numbers', () => {
      expect(() => phoneSchema.parse('010-1234-5678')).not.toThrow();
      expect(() => phoneSchema.parse('02-1234-5678')).not.toThrow();
      expect(() => phoneSchema.parse('+82-10-1234-5678')).not.toThrow();
      expect(() => phoneSchema.parse('01012345678')).not.toThrow();
    });

    it('should throw for invalid phone numbers', () => {
      expect(() => phoneSchema.parse('123-456-789')).toThrow();
      expect(() => phoneSchema.parse('invalid')).toThrow();
      expect(() => phoneSchema.parse('')).toThrow();
    });
  });

  describe('urlSchema', () => {
    it('should parse valid URLs', () => {
      expect(() => urlSchema.parse('https://example.com')).not.toThrow();
      expect(() => urlSchema.parse('http://localhost:3000')).not.toThrow();
      expect(() => urlSchema.parse('https://api.example.co.kr/v1')).not.toThrow();
    });

    it('should throw for invalid URLs', () => {
      expect(() => urlSchema.parse('not-a-url')).toThrow();
      expect(() => urlSchema.parse('ftp://')).toThrow();
      expect(() => urlSchema.parse('')).toThrow();
    });
  });

  describe('loginSchema', () => {
    it('should parse valid login data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'password123',
      };
      expect(() => loginSchema.parse(validData)).not.toThrow();
    });

    it('should throw for invalid login data', () => {
      const invalidData = {
        email: 'invalid-email',
        password: '',
      };
      expect(() => loginSchema.parse(invalidData)).toThrow();
    });
  });

  describe('registerSchema', () => {
    it('should parse valid register data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'Test123!@#',
        confirmPassword: 'Test123!@#',
        firstName: 'John',
        lastName: 'Doe',
      };
      expect(() => registerSchema.parse(validData)).not.toThrow();
    });

    it('should throw when passwords do not match', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'Test123!@#',
        confirmPassword: 'Different123!@#',
        firstName: 'John',
        lastName: 'Doe',
      };
      expect(() => registerSchema.parse(invalidData)).toThrow('비밀번호가 일치하지 않습니다');
    });
  });

  describe('userProfileSchema', () => {
    it('should parse valid profile data', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        phone: '010-1234-5678',
        bio: '안녕하세요!',
      };
      expect(() => userProfileSchema.parse(validData)).not.toThrow();
    });

    it('should parse valid profile data without optional fields', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
      };
      expect(() => userProfileSchema.parse(validData)).not.toThrow();
    });

    it('should throw for invalid profile data', () => {
      const invalidData = {
        firstName: '',
        lastName: 'Doe',
        email: 'invalid-email',
      };
      expect(() => userProfileSchema.parse(invalidData)).toThrow();
    });
  });

  describe('koreanSSNSchema', () => {
    it('should parse valid SSN format', () => {
      // 실제 유효한 주민등록번호는 테스트에서 사용하지 않음
      // 형식만 테스트
      expect(() => koreanSSNSchema.parse('123456-1234567')).not.toThrow();
    });

    it('should throw for invalid SSN format', () => {
      expect(() => koreanSSNSchema.parse('123456-123456')).toThrow();
      expect(() => koreanSSNSchema.parse('1234561234567')).toThrow();
      expect(() => koreanSSNSchema.parse('')).toThrow();
    });
  });

  describe('creditCardSchema', () => {
    it('should parse valid credit card number format', () => {
      // 실제 유효한 카드 번호는 테스트에서 사용하지 않음
      // 형식만 테스트
      expect(() => creditCardSchema.parse('1234567890123456')).not.toThrow();
    });

    it('should throw for invalid credit card format', () => {
      expect(() => creditCardSchema.parse('123456789012345')).toThrow();
      expect(() => creditCardSchema.parse('12345678901234567890')).toThrow();
      expect(() => creditCardSchema.parse('123456789012345a')).toThrow();
      expect(() => creditCardSchema.parse('')).toThrow();
    });
  });
});

describe('Schema Transformations', () => {
  describe('phoneSchema transformation', () => {
    it('should transform phone numbers by removing hyphens and spaces', () => {
      const result = phoneSchema.parse('010-1234-5678');
      expect(result).toBe('01012345678');
    });

    it('should transform phone numbers with spaces', () => {
      const result = phoneSchema.parse('010 1234 5678');
      expect(result).toBe('01012345678');
    });
  });
});
