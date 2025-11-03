import {
  ResponseDataMapTermsNameListResponseTermsByTermsName,
  ResponseDataResponseListResponseTermsByTermsName,
  ResponseDataResponseTermsList,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 약관 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class TermsService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 약관 전체 조회
   * 약관 전체를 조회합니다.
   * @returns 약관 전체 조회 결과
   */
  getAllTermsGroupedByTermsName() {
    return this.axios.get<ResponseDataMapTermsNameListResponseTermsByTermsName>(
      `/main/v1/api/v1/terms`
    );
  }

  /**
   * 약관 목록 조회
   * 약관 목록을 조회합니다.
   * @returns 약관 목록 조회 결과
   */
  getAllTermsNames() {
    return this.axios.get<ResponseDataResponseTermsList>(`/main/v1/api/v1/terms/names`);
  }

  /**
   * 약관 상세 조회
   * 약관 내용을 조회합니다.
   * @param termsName - termsName
   * @returns 약관 상세 조회 결과
   */
  getTermsByTermsName(termsName: string) {
    return this.axios.get<ResponseDataResponseListResponseTermsByTermsName>(
      `/main/v1/api/v1/terms/name/${termsName}`
    );
  }
}
