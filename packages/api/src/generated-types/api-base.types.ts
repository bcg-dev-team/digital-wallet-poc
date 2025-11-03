/**
 * API 공통 응답 타입
 * 모든 API 응답의 기본 구조
 */

/**
 * API 성공 응답
 * @template T - 응답 데이터 타입
 */
export interface ApiSuccessResponse<T> {
  /** 응답 상태 */
  status: string;
  /** 응답 코드 */
  code: number;
  /** 응답 데이터 (옵셔널) */
  data?: T;
}

/**
 * API 에러 응답
 */
export interface ApiErrorResponse {
  /** 응답 상태 */
  status: string;
  /** 응답 코드 */
  code: number;
  /** 에러 메시지 */
  message: string;
  /** 추가 에러 정보 */
  errors?: any | null;
}

/**
 * data가 없는 성공 응답 (삭제, 업데이트 등)
 */
export type ApiEmptySuccessResponse = ApiSuccessResponse<Record<string, never>>;

/**
 * 페이지네이션 응답
 * @template T - 컨텐츠 타입
 */
export interface PageResponse<T> {
  /** 컨텐츠 목록 */
  contents: T[];
  /** 총 페이지 수 */
  totalPages?: number;
  /** 총 요소 수 */
  totalElements?: number;
  /** 첫 페이지 여부 */
  isFirst: boolean;
  /** 마지막 페이지 여부 */
  isLast: boolean;
}

/**
 * ApiSuccessResponse 사용 가이드
 *
 * 1. data가 있는 응답
 *    - 조회(GET) 응답
 *    - 생성(POST) 응답 (생성된 리소스 반환)
 *    - 로그인/인증 응답
 *
 * 2. data가 없을 수 있는 응답
 *    - 업데이트(PUT/PATCH) 응답
 *    - 삭제(DELETE) 응답
 *    - 로그아웃 응답
 *
 * 3. ApiEmptySuccessResponse 사용 (data 없음 보장)
 *    - 순수 성공/실패만 반환하는 경우
 *    - 빈 객체 {} 반환하는 경우
 */
