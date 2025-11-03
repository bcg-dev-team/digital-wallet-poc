import {
  AuthLoginRequest,
  AuthRefreshTokenRequest,
  MemberSendSmsCodeRequest,
  MemberVerifySmsCodeRequest,
  ResponseDataAuthLoginResponse,
  ResponseDataObject,
  ResponseDataTokenResponse,
  ResponseDataWebsocketJwtTokenResponse,
  VerificationCodeRequest,
  VerificationRequest,
  WebsocketJwtTokenRequest,
} from '../../generated-types';
import { CustomAxiosInstance } from '../../types';

/**
 * 인증 관리 API
 * OpenAPI Generator로 생성된 타입을 사용하며, 기존 Axios 인스턴스와 통합
 */
export class AuthService {
  private axios: CustomAxiosInstance;

  constructor(axiosInstance: CustomAxiosInstance) {
    this.axios = axiosInstance;
  }

  /**
   * 웹소켓 접송용 JWT 발급
   * 웹소켓 접속시 JWT 토큰을 사용하여 접속하기 위해 사용한다.
   * @returns 웹소켓 접송용 JWT 발급 결과
   */
  getWebsocketJwtToken(request: WebsocketJwtTokenRequest) {
    return this.axios.post<ResponseDataWebsocketJwtTokenResponse>(
      `/main/v1/auths/websocket`,
      request
    );
  }

  /**
   * 웹 jwt 재발급
   * access token 만료시 refresh token 유효성 검사 이후 새로운 jwt를 재발급한다.
   * @returns 웹 jwt 재발급 결과
   */
  refreshTokenForWeb(request: AuthRefreshTokenRequest) {
    return this.axios.post<ResponseDataTokenResponse>(`/main/v1/auths/web/refresh`, request);
  }

  /**
   * 회원 웹 로그인
   * 승인된 아이디를 로그인한다. 개인회원(INDIVIDUAL)과 법인회원(CORPORATE)을 모두 지원한다.
   * @returns 회원 웹 로그인 결과
   */
  loginForWeb(request: AuthLoginRequest) {
    return this.axios.post<ResponseDataAuthLoginResponse>(`/main/v1/auths/web/login`, request);
  }

  /**
   * SMS 인증 코드 검증
   * 발송된 SMS 인증 코드를 검증한다. useType으로 용도를 구분한다.
   * @returns SMS 인증 코드 검증 결과
   */
  verifySmsVerificationCode(request: MemberVerifySmsCodeRequest) {
    return this.axios.post<ResponseDataObject>(`/main/v1/auths/sms/verify`, request);
  }

  /**
   * SMS 인증 코드 발송
   * 이름과 휴대폰 번호로 SMS 인증 코드를 발송한다. useType으로 용도를 구분한다.
   * @returns SMS 인증 코드 발송 결과
   */
  sendSmsVerificationCode(request: MemberSendSmsCodeRequest) {
    return this.axios.post<ResponseDataObject>(`/main/v1/auths/sms/send`, request);
  }

  /**
   * 회원 로그아웃
   * 사용중인 아이디를 로그아웃한다. 개인회원(INDIVIDUAL)과 법인회원(CORPORATE)을 모두 지원한다.
   * @returns 회원 로그아웃 결과
   */
  logout() {
    return this.axios.post<ResponseDataObject>(`/main/v1/auths/logout`);
  }

  /**
   * 모든 세션 로그아웃
   * 사용중인 아이디를 로그아웃한다. 개인회원(INDIVIDUAL)과 법인회원(CORPORATE)을 모두 지원한다.
   * @returns 모든 세션 로그아웃 결과
   */
  logoutAll() {
    return this.axios.post<ResponseDataObject>(`/main/v1/auths/logout-all`);
  }

  /**
   * 이메일 인증 코드 검증
   * 발송된 인증 코드를 검증한다. useType으로 용도를 구분한다.
   * @returns 이메일 인증 코드 검증 결과
   */
  verifyEmailVerificationCode(request: VerificationCodeRequest) {
    return this.axios.post<ResponseDataObject>(`/main/v1/auths/email/verify`, request);
  }

  /**
   * 이메일 인증 코드 발송
   * 회원가입 또는 비밀번호 재설정을 위한 이메일 인증 코드를 발송한다. useType으로 용도를 구분한다.
   * @returns 이메일 인증 코드 발송 결과
   */
  sendEmailVerificationCode(request: VerificationRequest) {
    return this.axios.post<ResponseDataObject>(`/main/v1/auths/email/send`, request);
  }

  /**
   * 앱 jwt 재발급
   * access token 만료시 refresh token 유효성 검사 이후 새로운 jwt를 재발급한다.
   * @returns 앱 jwt 재발급 결과
   */
  refreshTokenForApp(request: AuthRefreshTokenRequest) {
    return this.axios.post<ResponseDataTokenResponse>(`/main/v1/auths/app/refresh`, request);
  }

  /**
   * 회원 앱 로그인
   * 승인된 아이디를 로그인한다. 개인회원(INDIVIDUAL)과 법인회원(CORPORATE)을 모두 지원한다.
   * @returns 회원 앱 로그인 결과
   */
  loginForApp(request: AuthLoginRequest) {
    return this.axios.post<ResponseDataAuthLoginResponse>(`/main/v1/auths/app/login`, request);
  }
}
