import {
  AccountCreateRequest,
  AccountDepositsWithdrawalsInfoRequest,
  AccountInfoUpdateRequest,
  AccountUpdatePwdRequest,
  DepositRequest,
  ResponseDataAccountAvailableWithdrawalAmountResponse,
  ResponseDataAccountCreateResponse,
  ResponseDataAccountDepositsWithdrawalsInfoResponse,
  ResponseDataAccountInfoResponse,
  ResponseDataString,
  ResponseDataUnit,
  WithdrawalRequest,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 계좌 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class AccountService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 계좌 정보 조회
   * 회원의 계좌 정보를 조회한다.
   * @returns 계좌 정보 조회 결과
   */
  getAccountInfo() {
    return this.axios.get<ResponseDataAccountInfoResponse>(`/main/v1/accounts/info`);
  }

  /**
   * 계좌 정보 변경
   * 계좌 정보(별칭, 표시여부, 표시순번)를 변경한다.
   * @returns 계좌 정보 변경 결과
   */
  updateAccountInfo(request: AccountInfoUpdateRequest) {
    return this.axios.put<ResponseDataString>(`/main/v1/accounts/info`, request);
  }

  /**
   * 계좌 비밀번호 변경
   * 개설한 계좌의 비밀번호를 변경한다.
   * @returns 계좌 비밀번호 변경 결과
   */
  updatePassword(request: AccountUpdatePwdRequest) {
    return this.axios.put<ResponseDataString>(`/main/v1/accounts/change-pw`, request);
  }

  /**
   * 출금신청
   * 계좌에서 출금을 신청한다.
   * @returns 출금신청 결과
   */
  requestWithdrawal(request: WithdrawalRequest) {
    return this.axios.post<ResponseDataUnit>(`/main/v1/accounts/withdrawal`, request);
  }

  /**
   * 입금신청
   * 계좌에 입금을 신청한다.
   * @returns 입금신청 결과
   */
  requestDeposit(request: DepositRequest) {
    const formData = new FormData();

    // 파일 필드들
    formData.append('transferReceipt', request.transferReceipt);

    return this.axios.post<ResponseDataUnit>(`/main/v1/accounts/deposit`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * 계좌 개설
   * 회원가입 후 계좌를 개설한다. 기존 계좌의 존재여부와 상관없이 원장서버로 요청을 보낸다.
   * @returns 계좌 개설 결과
   */
  createAccount(request: AccountCreateRequest) {
    return this.axios.post<ResponseDataAccountCreateResponse>(`/main/v1/accounts/create`, request);
  }

  /**
   * 출납신청 조회
   * 회원의 계좌 출납신청 정보를 조회한다.
   * @param request - 출납신청 조회 요청 데이터
   * @returns 출납신청 조회 결과
   */
  getDepositsWithdrawalsInfo(request: AccountDepositsWithdrawalsInfoRequest) {
    return this.axios.get<ResponseDataAccountDepositsWithdrawalsInfoResponse>(
      `/main/v1/accounts/deposits-withdrawals/info`,
      {
        params: request,
      }
    );
  }

  /**
   * 예수금/출금가능금액 조회
   * 계좌의 예수금/출금가능금액을 조회한다.
   * @returns 예수금/출금가능금액 조회 결과
   */
  getAvailableAmount() {
    return this.axios.get<ResponseDataAccountAvailableWithdrawalAmountResponse>(
      `/main/v1/accounts/available/amount`
    );
  }
}
