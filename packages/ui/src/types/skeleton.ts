/**
 * 스켈레톤 컴포넌트 공통 타입 정의
 */

// 스켈레톤 기본 Props
export interface BaseSkeletonProps {
  width?: string;
  height?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  class?: string;
}

// 로딩 상태 Props
export interface LoadingProps {
  isLoading?: boolean;
}
