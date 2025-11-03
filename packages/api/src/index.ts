/**
 * 필요한 경우 앱 레벨에서 타입을 확장하세요:
 * type MyRequest = GeneratedRequest & { file: File };
 */

// API 관련 기능들을 export
export * from './services';
export * from './plugin/axios';
export * from './errors';

// 자동 생성된 타입들 (기본으로 사용 권장)
export * from './generated-types';

// Enum 라벨 매핑
export * from './enum-labels';

// 공통 타입들만 직접 export (충돌 없음)
export * from './types/axios';
export * from './types/errorcode.types';
