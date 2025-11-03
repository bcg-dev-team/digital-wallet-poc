import {
  OrderExecutionHistoryRequest,
  ResponseDataOrderExecutionHistoryResponse,
  ResponseDataTradeUnExecutionHistoryResponse,
  TradeUnExecutionHistoryRequest,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 체결 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class ExecutionService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 미체결 내역 조회
   * 미체결 내역 탭 조회시 사용한다.
   * @param request - 미체결 내역 조회 요청 데이터
   * @returns 미체결 내역 조회 결과
   */
  getPendingOrderHistory(request: TradeUnExecutionHistoryRequest) {
    return this.axios.get<ResponseDataTradeUnExecutionHistoryResponse>(
      `/main/v1/execution/pending/history`,
      {
        params: request,
      }
    );
  }

  /**
   * 주문 체결 내역 조회
   * 거래 > 거래내역 > 주문체결 조회시 사용한다.
   * @param request - 주문 체결 내역 조회 요청 데이터
   * @returns 주문 체결 내역 조회 결과
   */
  getOrderExecutionHistory(request: OrderExecutionHistoryRequest) {
    return this.axios.get<ResponseDataOrderExecutionHistoryResponse>(`/main/v1/execution/history`, {
      params: request,
    });
  }
}
