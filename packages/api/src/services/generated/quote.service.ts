import {
  ResponseDataResponseListCandleChartResponse,
  ResponseDataResponseListOrderBookResponse,
  ResponseDataResponseListTickChartResponse,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 시세 정보 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class QuoteService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 5단계 호가 조회
   * 종목의 5단계 호가 정보를 조회합니다.
   * @param stockCd - 조회할 종목코드
   * @returns 5단계 호가 조회 결과
   */
  getOrderBook(stockCd: string) {
    return this.axios.get<ResponseDataResponseListOrderBookResponse>(
      `/main/v1/quotes/${stockCd}/order-book`
    );
  }

  /**
   * 틱 차트 데이터 조회
   * 종목의 틱 차트 데이터를 조회합니다.
   * @param stockCd - 조회할 종목코드
   * @param request - 틱 차트 데이터 조회 요청 데이터
   * @returns 틱 차트 데이터 조회 결과
   */
  getTickChart(stockCd: string, request: { offset?: string; limit?: number }) {
    return this.axios.get<ResponseDataResponseListTickChartResponse>(
      `/main/v1/quotes/tick-chart/${stockCd}/history`,
      {
        params: request,
      }
    );
  }

  /**
   * 캔들 차트 데이터 조회
   * 종목의 캔들 차트 데이터를 조회합니다.
   * @param stockCd - 조회할 종목코드
   * @param request - 캔들 차트 데이터 조회 요청 데이터
   * @returns 캔들 차트 데이터 조회 결과
   */
  getCandleChart(stockCd: string, request: { interval?: string; offset?: string; limit?: number }) {
    return this.axios.get<ResponseDataResponseListCandleChartResponse>(
      `/main/v1/quotes/candle-chart/${stockCd}/history`,
      {
        params: request,
      }
    );
  }
}
