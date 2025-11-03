import {
  ResponseDataBalanceResponseDto,
  ResponseDataOrderResponseDto,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * presentation-controller 관련 API 서비스
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class PresentationControllerService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * undefined
   * @param request - undefined 요청 데이터
   * @returns undefined 결과
   */
  getOrders(request: string) {
    return this.axios.get<ResponseDataOrderResponseDto>(`/main/v1/v1/presentation/orders`, {
      params: request,
    });
  }

  /**
   * undefined
   * @param request - undefined 요청 데이터
   * @returns undefined 결과
   */
  getBalance(request: string) {
    return this.axios.get<ResponseDataBalanceResponseDto>(`/main/v1/v1/presentation/balance`, {
      params: request,
    });
  }
}
