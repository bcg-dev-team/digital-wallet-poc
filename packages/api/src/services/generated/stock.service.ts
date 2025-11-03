import {
  AccountStockRequest,
  OrderStockRequest,
  PositionStockRequest,
  PossessionStockRequest,
  ResponseDataAccountStockResponse,
  ResponseDataOrderStockResponse,
  ResponseDataPositionStockResponse,
  ResponseDataPossessionStockResponse,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 종목 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class StockService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 보유종목 조회
   * 종목의 보유종목을 확인할 수 있다.(홈화면)
   * @param request - 보유종목 조회 요청 데이터
   * @returns 보유종목 조회 결과
   */
  getPossessionStocks(request: PossessionStockRequest) {
    return this.axios.get<ResponseDataPossessionStockResponse>(`/main/v1/stocks/possessions`, {
      params: request,
    });
  }

  /**
   * 주문잔고 조회
   * 종목의 주문잔고를 확인할 수 있다.(홈화면)
   * @param request - 주문잔고 조회 요청 데이터
   * @returns 주문잔고 조회 결과
   */
  getPositionStocks(request: PositionStockRequest) {
    return this.axios.get<ResponseDataPositionStockResponse>(`/main/v1/stocks/positions`, {
      params: request,
    });
  }

  /**
   * 주문종목 조회
   * 종목의 MetaData 를 확인할 수 있다.(홈화면, 종목쪽 조회 등 쓰임)
   * @param request - 주문종목 조회 요청 데이터
   * @returns 주문종목 조회 결과
   */
  getOrderStocks(request: OrderStockRequest) {
    return this.axios.get<ResponseDataOrderStockResponse>(`/main/v1/stocks/orders`, {
      params: request,
    });
  }

  /**
   * 계좌종목 조회
   * 계좌에 속한 종목과 증거금율을 조회할 수 있다.
   * @param request - 계좌종목 조회 요청 데이터
   * @returns 계좌종목 조회 결과
   */
  getAccountStocks(request: AccountStockRequest) {
    return this.axios.get<ResponseDataAccountStockResponse>(`/main/v1/stocks/accounts`, {
      params: request,
    });
  }
}
