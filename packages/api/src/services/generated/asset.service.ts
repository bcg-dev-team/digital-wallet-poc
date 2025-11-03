import {
  AssetDepositsRequest,
  AssetPositionsRequest,
  ResponseDataAssetDepositsResponse,
  ResponseDataAssetPositionsResponse,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 자산 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class AssetService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 보유 포지션 조회
   * 회원의 보유한 포지션 리스트를 조회한다.
   * @param request - 보유 포지션 조회 요청 데이터
   * @returns 보유 포지션 조회 결과
   */
  getAssetPositions(request: AssetPositionsRequest) {
    return this.axios.get<ResponseDataAssetPositionsResponse>(`/main/v1/assets/positions`, {
      params: request,
    });
  }

  /**
   * 증거금 내역 조회
   * 회원의 보유한 증거금 리스트를 조회한다.
   * @param request - 증거금 내역 조회 요청 데이터
   * @returns 증거금 내역 조회 결과
   */
  getAssetDeposits(request: AssetDepositsRequest) {
    return this.axios.get<ResponseDataAssetDepositsResponse>(`/main/v1/assets/deposits`, {
      params: request,
    });
  }
}
