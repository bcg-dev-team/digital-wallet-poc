/**
 * UI 패키지 공통 컴포넌트 타입 정의
 *
 * 분리 기준:
 * 1. 도메인 공통성: 여러 컴포넌트에서 실제로 사용되는 타입
 * 2. 복잡성: 3개 이상 + 의미적으로 복잡한 타입
 * 3. 유지보수성: 변경 가능성이 높은 타입
 */

import type { IconName } from './icons';
import type { Component } from 'vue';

/**
 * [사용법]
 * - 일부 사이즈들만 쓰고 싶은 경우: Extract를 사용
 *   e.g. type ButtonSize = Extract<ComponentSize, 'lg' | 'sm'>;
 *
 * - 확장 사이즈를 함께 쓰고 싶은 경우: 유니온으로 결합
 *   e.g. type IconButtonSize = ComponentSize | ExtendedSize;
 *
 * - 특정 컴포넌트 전용 별칭으로 정의
 *   e.g. type TabsSize = Extract<ComponentSize, 'md' | 'lg'>;
 */

/**
 * UI 컴포넌트 기본 사이즈 타입
 * - lg: large (48px)
 * - md: medium (40px)
 * - sm: small (32px)
 */
export type ComponentSize = 'lg' | 'md' | 'sm';

/**
 * 확장 사이즈 타입 (필요시 확장)
 * - xl: extra large
 * - xxl: extra extra large
 * - xs: extra small
 * - xxs: extra extra small
 */
export type ExtendedSize = 'xl' | 'xxl' | 'xs' | 'xxs';

// 공통 타입들 (여러 컴포넌트에서 사용)
export type TextAlign = 'left' | 'center' | 'right';

// IconName re-export
export type { IconName };

// BaseButton
export type ButtonVariant = 'contained' | 'outlined';

/**
 * 내부에서 Icon을 사용하는 컴포넌트들의 공통 아이콘 props 타입
 * BaseIcon 컴포넌트의 Props와 일치합니다.
 */
export interface InnerIconProps {
  name: IconName;
  size?: ComponentSize | number;
  color?: string;
}

// BaseTable
export interface TableHeader {
  key: string;
  title: string;
  width?: string;
  align?: TextAlign;
  sortable?: boolean;
}
export interface TableRow {
  id: string | number;
  [key: string]: any;
}

// BaseTabs
/**
 * BaseTabs 컴포넌트에서 사용하는 탭 아이템 인터페이스
 */
export interface TabItem {
  key: string; // 시멘틱한 고유 식별자
  label: string; // 탭에 표시될 텍스트
  component?: Component; // 탭 패널에 표시될 컴포넌트
  icon?: IconName; // 아이콘 (선택사항)
  disabled?: boolean; // 비활성화 여부 (선택사항)
}

/**
 * BaseTabs 컴포넌트에서 사용하는 탭 스타일 variant 타입
 */
export type TabVariant = 'underline' | 'inner';

/**
 * BaseTabs 전용 사이즈 타입 별칭
 * - 현재 BaseTabs에서는 lg, md 두 사이즈만 사용합니다.
 */
export type TabsSize = Extract<ComponentSize, 'lg' | 'md'>;

/**
 * BaseSwitch 전용 사이즈 타입 별칭
 * - 현재 BaseSwitch에서는 sm, md 두 사이즈만 사용합니다.
 */
export type SwitchSize = Extract<ComponentSize, 'sm' | 'md'>;

// BaseChip
export type ChipVariant = 'grey' | 'red' | 'green' | 'blue' | 'yellow' | 'purple';

// BaseChip 확장 타입
export interface ChipData {
  label: string;
  variant: ChipVariant;
  icon?: string;
}

// BaseRadioGroup
/**
 * BaseRadioGroup 컴포넌트에서 사용하는 라디오 옵션 인터페이스
 */
export interface RadioOption<T = any> {
  value: T; // 옵션의 값
  label: string; // 옵션에 표시될 텍스트
  icon?: IconName; // 아이콘 (선택사항)
  disabled?: boolean; // 비활성화 여부 (선택사항)
}

// BaseModal 관련 타입들은 BaseModal 컴포넌트에서 직접 정의하여 순환참조 방지

/**
 * Modal 컴포넌트 Props
 */
export interface ModalProps {
  /**
   * 모달 열림 상태
   */
  isOpen: boolean;
  /**
   * 모달 제목
   */
  title?: string;
  /**
   * 모달 설명 (접근성용)
   */
  description?: string;
  /**
   * 모달 크기
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * 모달 타입
   */
  variant?: 'default' | 'confirm' | 'alert';
  /**
   * 알림 타입 (variant가 'alert'일 때만 사용)
   */
  alertVariant?: 'success' | 'info' | 'warning' | 'error';
  /**
   * 오버레이 클릭 시 닫기 여부
   */
  closeOnOverlayClick?: boolean;
  /**
   * ESC 키 클릭 시 닫기 여부
   */
  closeOnEscape?: boolean;
  /**
   * 뒤로가기 버튼 표시 여부
   */
  showBackButton?: boolean;
  /**
   * 닫기 버튼 표시 여부
   */
  showCloseButton?: boolean;
  /**
   * 기본 푸터 표시 여부
   */
  showDefaultFooter?: boolean;
  /**
   * 모달 액션 버튼들
   */
  actions?: Array<{
    label: string;
    variant?: ButtonVariant;
    size?: ComponentSize;
    disabled?: boolean;
    loading?: boolean;
    leftIcon?: InnerIconProps;
    rightIcon?: InnerIconProps;
  }>;
  /**
   * 취소 버튼 텍스트
   */
  cancelText?: string;
  /**
   * 확인 버튼 텍스트
   */
  confirmText?: string;
  /**
   * 취소 버튼 표시 여부
   */
  showCancelButton?: boolean;
  /**
   * 확인 버튼 표시 여부
   */
  showConfirmButton?: boolean;
  /**
   * 버튼을 fullwidth로 표시할지 여부
   */
  fullWidth?: boolean;
}

/**
 * Modal 컴포넌트 Emits
 */
export interface ModalEmits {
  (e: 'close'): void;
  (e: 'back'): void;
  (e: 'cancel'): void;
  (e: 'confirm'): void;
  (
    e: 'action',
    action: {
      label: string;
      variant?: ButtonVariant;
      size?: ComponentSize;
      disabled?: boolean;
      loading?: boolean;
      leftIcon?: InnerIconProps;
      rightIcon?: InnerIconProps;
    },
    index: number
  ): void;
  (e: 'update:isOpen', value: boolean): void;
}

/**
 * ModalHeader 컴포넌트 Props
 */
export interface ModalHeaderProps {
  /**
   * 모달 제목
   */
  title?: string;
  /**
   * 뒤로가기 버튼 표시 여부
   */
  showBackButton?: boolean;
  /**
   * 닫기 버튼 표시 여부
   */
  showCloseButton?: boolean;
}

/**
 * ModalHeader 컴포넌트 Emits
 */
export interface ModalHeaderEmits {
  (e: 'back'): void;
  (e: 'close'): void;
}

/**
 * ModalContent 컴포넌트 Props
 */
export interface ModalContentProps {
  /**
   * 모달 설명 (접근성용)
   */
  description?: string;
  /**
   * 알림 타입 (alert variant용)
   */
  alertVariant?: 'success' | 'info' | 'warning' | 'error';
  /**
   * 알림 아이콘 표시 여부
   */
  showAlertIcon?: boolean;
}

/**
 * ModalContent 컴포넌트 Emits
 */
export interface ModalContentEmits {
  (e: 'content-click'): void;
}

/**
 * ModalFooter 컴포넌트 Props
 */
export interface ModalFooterProps {
  /**
   * 모달 액션 버튼들
   */
  actions?: Array<{
    label: string;
    variant?: ButtonVariant;
    size?: ComponentSize;
    disabled?: boolean;
    loading?: boolean;
    leftIcon?: InnerIconProps;
    rightIcon?: InnerIconProps;
  }>;
  /**
   * 기본 푸터 표시 여부
   */
  showDefaultFooter?: boolean;
  /**
   * 취소 버튼 텍스트
   */
  cancelText?: string;
  /**
   * 확인 버튼 텍스트
   */
  confirmText?: string;
  /**
   * 취소 버튼 표시 여부
   */
  showCancelButton?: boolean;
  /**
   * 확인 버튼 표시 여부
   */
  showConfirmButton?: boolean;
  /**
   * 버튼을 fullwidth로 표시할지 여부
   */
  fullWidth?: boolean;
}

/**
 * ModalFooter 컴포넌트 Emits
 */
export interface ModalFooterEmits {
  (e: 'cancel'): void;
  (e: 'confirm'): void;
  (
    e: 'action',
    action: {
      label: string;
      variant?: ButtonVariant;
      size?: ComponentSize;
      disabled?: boolean;
      loading?: boolean;
      leftIcon?: InnerIconProps;
      rightIcon?: InnerIconProps;
    },
    index: number
  ): void;
}

/**
 * Modal 슬롯 타입
 */
export interface ModalSlots {
  /**
   * 기본 컨텐츠
   */
  default(): any[];
  /**
   * 헤더 영역
   */
  header(): any[];
  /**
   * 푸터 영역
   */
  footer(): any[];
  /**
   * 제목 영역
   */
  title(): any[];
  /**
   * 액션 영역
   */
  actions(): any[];
}
// BaseSkeleton
export interface SkeletonProps {
  width?: string;
  height?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'shimmer';
  className?: string;
}

// 로딩 상태를 포함하는 컴포넌트 공통 타입
export interface LoadingComponentProps {
  isLoading?: boolean;
}

// 테이블 스켈레톤 전용 타입
export interface TableSkeletonProps extends LoadingComponentProps {
  skeletonRows?: number;
}

// 카드 스켈레톤 전용 타입
export interface CardSkeletonProps extends LoadingComponentProps {
  skeleton?: {
    showImage?: boolean;
    showTitle?: boolean;
    showDescription?: boolean;
    showActions?: boolean;
  };
}

// BaseBadge
export type BadgeColor = 'grey' | 'red' | 'green' | 'blue' | 'yellow' | 'purple';
export type BadgeVariant = 'dot' | 'standard' | 'square';
export type BadgeOverlap = 'overlap' | 'no-overlap';
export type BadgeVertical = 'top' | 'middle' | 'bottom';
export type BadgeHorizontal = 'left' | 'right';

export interface BadgeAnchorOrigin {
  vertical: BadgeVertical;
  horizontal: BadgeHorizontal;
}

export interface BadgeProps {
  value?: string | number;
  max?: number;
  variant?: BadgeVariant;
  color?: BadgeColor;
  showZero?: boolean;
  hidden?: boolean;
  overlap?: BadgeOverlap;
  anchorOrigin?: BadgeAnchorOrigin;
}
