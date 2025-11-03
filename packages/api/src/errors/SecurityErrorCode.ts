import type { ErrorCode } from '../types/errorcode.types';

export const SecurityErrorCode: Record<string, ErrorCode> = {
  INVALID_CREDENTIALS: {
    status: 401,
    code: 'S0001',
    detail: '이메일 또는 비밀번호가 올바르지 않습니다.',
  },
  TOKEN_PAIR_MISMATCH: {
    status: 401,
    code: 'S0002',
    detail: '토큰 쌍이 일치하지 않습니다.',
  },
  // JWT Token related errors
  UNAUTHORIZED: {
    status: 401,
    code: 'S0003',
    detail: '인증이 필요합니다.',
  },
  TOKEN_VALIDATION_FAILED: {
    status: 401,
    code: 'S0004',
    detail: '토큰 검증에 실패했습니다.',
  },
  ACCESS_TOKEN_STILL_VALID: {
    status: 401,
    code: 'S0005',
    detail: '액세스 토큰이 아직 유효합니다.',
  },
  INVALID_ACCESS_TOKEN: {
    status: 401,
    code: 'S0006',
    detail: '유효하지 않은 액세스 토큰입니다.',
  },
  TOKEN_NOT_FOUND: {
    status: 401,
    code: 'S0007',
    detail: '인증 토큰을 찾을 수 없습니다.',
  },
};
