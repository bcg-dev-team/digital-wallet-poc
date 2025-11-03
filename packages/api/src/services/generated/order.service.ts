import {
  OrderCancelRequest,
  OrderCloseOutRequest,
  OrderModifyRequest,
  OrderNewRequest,
  OrderTpslRequest,
  ResponseDataOrderCancelResponse,
  ResponseDataOrderCloseOutResponse,
  ResponseDataOrderModifyResponse,
  ResponseDataOrderNewResponse,
  ResponseDataOrderTpslResponse,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 주문 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class OrderService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 신규주문
   * 거래 > 주문 > 신규주문시 사용한다.
   * @returns 신규주문 결과
   */
  createNewOrder(request: OrderNewRequest) {
    return this.axios.post<ResponseDataOrderNewResponse>(`/main/v1/orders`, request);
  }

  /**
   * TPSL주문
   * 거래 > 주문 > TPSL주문시 사용한다.
   * @returns TPSL주문 결과
   */
  createTpslOrder(request: OrderTpslRequest) {
    return this.axios.post<ResponseDataOrderTpslResponse>(`/main/v1/orders/tpsl`, request);
  }

  /**
   * 정정주문
   * 거래 > 주문 > 정정주문시 사용한다.
   * @returns 정정주문 결과
   */
  createModifyOrder(request: OrderModifyRequest) {
    return this.axios.post<ResponseDataOrderModifyResponse>(`/main/v1/orders/modify`, request);
  }

  /**
   * 청산주문
   * 거래 > 주문 > 청산주문시 사용한다.
   * @returns 청산주문 결과
   */
  createCloseOutOrder(request: OrderCloseOutRequest) {
    return this.axios.post<ResponseDataOrderCloseOutResponse>(`/main/v1/orders/close-out`, request);
  }

  /**
   * 취소주문
   * 거래 > 주문 > 취소주문시 사용한다.
   * @returns 취소주문 결과
   */
  createCancelOrder(request: OrderCancelRequest) {
    return this.axios.post<ResponseDataOrderCancelResponse>(`/main/v1/orders/cancel`, request);
  }
}
