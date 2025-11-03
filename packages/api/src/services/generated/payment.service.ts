import { PaymentHistoryRequest, ResponseDataPaymentHistoryResponse } from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 결제 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class PaymentService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 결제내역 조회
   * 거래 > 거래내역 > 결제내역 조회시 사용한다.
   * @param request - 결제내역 조회 요청 데이터
   * @returns 결제내역 조회 결과
   */
  getPaymentHistory(request: PaymentHistoryRequest) {
    return this.axios.get<ResponseDataPaymentHistoryResponse>(`/main/v1/payments/history`, {
      params: request,
    });
  }
}
