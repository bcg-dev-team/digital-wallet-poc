/**
 * 백엔드 Enum 코드를 화면 표시용으로 변환하는 유틸리티
 *
 * 2025-10-27: 백엔드 enum 적용 완료
 * - SideCd: LONG → BUY, SHORT → SELL, RE_SHORT → SELL_TO_CLOSE, RE_LONG → BUY_TO_COVER
 * - OrderCd: BUY_PURCHASE/SELL_PURCHASE → PURCHASE/CLOSE_OUT
 * - 레거시 숫자 코드('1', '2' 등) 제거
 */

import type {
  OrderExecutionHistoryRequestOrderCdType,
  OrderNewRequestOrderTypeCdType,
  OrderNewRequestSideCdType,
  OrderStockRequestStockGroupCdType,
  PaymentDetailPositionCdType,
  PaymentDetailTradeCdType,
} from './generated-types';

/**
 * 주문 구분 코드 라벨
 */
export const ORDER_CODE_LABELS: Record<OrderExecutionHistoryRequestOrderCdType, string> = {
  TOTAL: '전체',
  PURCHASE: '매입',
  CLOSE_OUT: '청산',
};

/**
 * 주문 상태 코드 라벨
 * TODO: 백엔드에서 enum 타입 정의 후 타입 지정
 */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  RECEIVED: '접수',
  SENT: '송신',
  CONFIRMED: '확인',
  REJECTED: '거부',
  BARRIER: '배리어',
  LIMIT_PRICE: '지정가',
  FAILED: '실패',
  CLOSED: '종료',
};

/**
 * 주문 유형 코드 변환
 */
export const ORDER_TYPE_LABELS: Record<OrderNewRequestOrderTypeCdType, string> = {
  MARKET: '시장가',
  LIMIT: '지정가',
  STOP: '조건시장가',
  LIMIT_STOP: '조건지정가',
  TPSL: 'TP+SL',
};

/**
 * 주문 버전 코드 라벨
 */
export const ORDER_VERSION_LABELS: Record<string, string> = {
  // 백엔드 enum (향후 적용 예정)
  ORIGINAL: '원주문',
  MODIFY: '정정',
  CANCEL: '취소',
};

/**
 * 매매 구분 코드 변환
 * ✅ 2025-10-27 enum 변경: LONG→BUY, SHORT→SELL, RE_SHORT→SELL_TO_CLOSE, RE_LONG→BUY_TO_COVER
 */
export const SIDE_CODE_LABELS: Record<OrderNewRequestSideCdType, string> = {
  BUY: '매수',
  SELL_TO_CLOSE: '전매',
  SELL: '매도',
  BUY_TO_COVER: '환매',
};

/**
 * 종목 그룹 코드 변환
 */
export const STOCK_GROUP_CODE_LABELS: Record<OrderStockRequestStockGroupCdType, string> = {
  ALL: '전체',
  FOREIGN: '외환',
  INDEX: '지수',
  COMMODITY: '상품',
  CRYPTO: '가상화폐',
};

/**
 * 거래 구분 코드 라벨 (결제내역 테이블용)
 */
export const TRADE_CODE_LABELS: Record<PaymentDetailTradeCdType, string> = {
  BUY_PURCHASE: '매입',
  CLOSE_OUT: '청산',
  DEPOSIT: '입금',
  WITHDRAWAL: '출금',
  DESCRIPTION_DEPOSIT: '적요입금',
  DESCRIPTION_WITHDRAWAL: '적요출금',
};

/**
 * 포지션 구분 코드 Enum 형태 변환
 */
export const POSITION_CODE_ENUM: Record<PaymentDetailPositionCdType, string> = {
  LONG: 'LONG',
  SHORT: 'SHORT',
  TOTAL: 'TOTAL',
};

/**
 * 주문 상태 색상 클래스
 * TODO: 백엔드에서 enum 타입 정의 후 타입 지정
 */
export const ORDER_STATUS_COLOR_CLASS: Record<string, string> = {
  RECEIVED: 'text-blue-600',
  SENT: 'text-yellow-600',
  CONFIRMED: 'text-green-600',
  REJECTED: 'text-red-600',
  BARRIER: 'text-orange-600',
  LIMIT_PRICE: 'text-purple-600',
  FAILED: 'text-red-500',
  CLOSED: 'text-gray-600',
};

/**
 * 포지션 구분 색상 클래스
 */
export const POSITION_COLOR_CLASS: Record<PaymentDetailPositionCdType, string> = {
  LONG: 'text-blue-600',
  SHORT: 'text-red-600',
  TOTAL: 'text-gray-600',
};

/**
 * Enum 라벨 변환 유틸리티 클래스
 */
export class EnumLabelMapper {
  /**
   * 주문 구분 코드를 한국어로 변환
   */
  static getOrderCodeLabel(code: OrderExecutionHistoryRequestOrderCdType): string {
    return ORDER_CODE_LABELS[code] || code;
  }

  /**
   * 주문 상태 코드를 한국어로 변환
   */
  static getOrderStatusLabel(code: string): string {
    return ORDER_STATUS_LABELS[code] || code;
  }

  /**
   * 주문 유형 코드를 한국어로 변환
   */
  static getOrderTypeLabel(code: OrderNewRequestOrderTypeCdType): string {
    return ORDER_TYPE_LABELS[code] || code;
  }

  /**
   * 주문 버전 코드를 한국어로 변환
   */
  static getOrderVersionLabel(code: string): string {
    return ORDER_VERSION_LABELS[code] || code;
  }

  /**
   * 매매 구분 코드를 한국어로 변환
   */
  static getSideCodeLabel(code: OrderNewRequestSideCdType): string {
    return SIDE_CODE_LABELS[code] || code;
  }

  /**
   * 종목 그룹 코드를 한국어로 변환
   */
  static getStockGroupCodeLabel(code: OrderStockRequestStockGroupCdType): string {
    return STOCK_GROUP_CODE_LABELS[code] || code;
  }

  /**
   * 거래 구분 코드를 한국어로 변환
   */
  static getTradeCodeLabel(code: PaymentDetailTradeCdType): string {
    return TRADE_CODE_LABELS[code] || code;
  }

  /**
   * 포지션 구분 코드를 LONG/SHORT 형태로 변환
   */
  static getPositionCodeShort(code: PaymentDetailPositionCdType): string {
    return POSITION_CODE_ENUM[code] || code;
  }

  /**
   * 주문 상태에 따른 색상 클래스 반환
   */
  static getOrderStatusColorClass(code: string): string {
    return ORDER_STATUS_COLOR_CLASS[code] || 'text-gray-600';
  }

  /**
   * 포지션 구분에 따른 색상 클래스 반환
   */
  static getPositionColorClass(code: PaymentDetailPositionCdType): string {
    return POSITION_COLOR_CLASS[code] || 'text-gray-600';
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
