import {
  CloseOutHistoryRequest,
  CloseOutOrderHistoryRequest,
  ResponseDataCloseOutHistoryResponse,
  ResponseDataCloseOutOrderHistoryResponse,
  ResponseDataTradeHistoryResponse,
  TradeHistoryRequest,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 거래 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class TradeService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 청산 내역 조회
   * 청산 내역 탭 조회시 사용한다.
   * @param request - 청산 내역 조회 요청 데이터
   * @returns 청산 내역 조회 결과
   */
  getTradeLiquidationOrderHistory(request: CloseOutOrderHistoryRequest) {
    return this.axios.get<ResponseDataCloseOutOrderHistoryResponse>(
      `/main/v1/trades/liquidation/history`,
      {
        params: request,
      }
    );
  }

  /**
   * 주문내역 조회
   * 주문내역 탭 조회시 사용한다.
   * @param request - 주문내역 조회 요청 데이터
   * @returns 주문내역 조회 결과
   */
  getTradeHistory(request: TradeHistoryRequest) {
    return this.axios.get<ResponseDataTradeHistoryResponse>(`/main/v1/trades/history`, {
      params: request,
    });
  }

  /**
   * 청산손익 조회
   * 거래 > 거래내역 > 청산손익 조회시 사용한다.
   * @param request - 청산손익 조회 요청 데이터
   * @returns 청산손익 조회 결과
   */
  getCloseOutHistory(request: CloseOutHistoryRequest) {
    return this.axios.get<ResponseDataCloseOutHistoryResponse>(
      `/main/v1/trades/close-out/profit-loss`,
      {
        params: request,
      }
    );
  }
}
