import { createAxiosInstance, SecurityErrorCode, type AxiosError } from '@template/api';
import LocalStorageService from '@/services/localStorage/local-storage.service';
import LocalStorageKey from '@/services/localStorage/local-storage-key';
import { useToastStore } from '@/stores/useToastStore';
import { Logout } from '@/services/auth.service';
import { authService } from '@/services/api';

const tokenResolver = () => LocalStorageService.getItem(LocalStorageKey.ACCESS_TOKEN) || undefined;

/**
 * 토스트 메시지 표시 헬퍼 함수
 * @param message - 표시할 메시지
 *
 * FIXME: 임시 처리로, 추후 개선 필요
 * - 에러 타입별 토스트 스타일 분리 (error, warning, info)
 * - 서버에서 받은 에러 메시지를 그대로 표시하도록 개선
 * - 중복 에러 메시지 방지 로직 추가
 */
const showToast = (message: string) => {
  const toastStore = useToastStore();
  toastStore.addToast(message, 3000); // 에러 메시지는 3초간 표시
};

/**
 * 토큰 갱신 및 요청 재시도 처리
 * @param error - Axios 에러 객체
 * @returns 재시도 요청 결과 또는 에러
 */
const handleTokenRefresh = async (error: AxiosError): Promise<any> => {
  const expiredAccessToken = tokenResolver();

  // 토큰이 없으면 로그아웃
  if (!expiredAccessToken) {
    console.error('액세스 토큰이 없습니다.');
    Logout();
    return Promise.reject(error);
  }

  try {
    const result = await authService.refreshTokenForWeb({ expiredAccessToken });

    // 토큰 갱신 실패 시 로그아웃 (응답이 없거나 data가 없으면 실패)
    if (!result.data || !result.data.accessToken) {
      console.error('토큰 갱신 실패:', result);
      Logout();
      return Promise.reject(error);
    }

    // 새 토큰 저장
    LocalStorageService.setItem(LocalStorageKey.ACCESS_TOKEN, result.data.accessToken);
    console.log('토큰 갱신 성공. 새 토큰이 저장되었습니다.');

    // 원래 요청 설정이 있으면 재시도
    if (error.config) {
      return api.request(error.config);
    }

    // 요청 설정이 없어도 토큰은 갱신되었으므로 로그아웃하지 않고 에러만 반환
    console.warn('토큰은 갱신되었으나 원래 요청을 재시도할 수 없습니다.');
    return Promise.reject(error);
  } catch (refreshError) {
    console.error('토큰 갱신 요청 실패:', refreshError);
    Logout();
    return Promise.reject(error);
  }
};

/**
 * Axios 에러 핸들러
 * @param error - Axios 에러 객체
 *
 * FIXME: 임시 처리로, 추후 개선 필요
 * - 에러 응답의 message 필드를 우선적으로 표시
 * - 에러 코드별 다국어 메시지 매핑
 * - 재시도 가능한 에러에 대한 재시도 로직
 * - 네트워크 에러 시 오프라인 모드 전환
 */
const errorHandler = async (error: AxiosError): Promise<any> => {
  if (error.response) {
    const responseData = error.response.data as { code?: string; [key: string]: any };
    // 서버에서 에러 응답을 받은 경우 (상태 코드 포함)
    switch (error.response.status) {
      case 400:
        // Bad Request 처리
        // FIXME: 서버에서 전달한 구체적인 에러 메시지 표시 필요
        showToast('잘못된 요청입니다.');
        console.error('[Axios] 400 Bad Request:', responseData);
        break;
      case 401:
        if (responseData.code === SecurityErrorCode.TOKEN_VALIDATION_FAILED.code) {
          return handleTokenRefresh(error);
        }
        // FIXME: 401 에러의 다양한 케이스 처리 필요 (세션 만료, 권한 없음 등)
        break;
      case 403:
        // Forbidden 처리
        // FIXME: 권한별 상세 메시지 필요 (읽기 권한, 쓰기 권한 등)
        showToast('접근 권한이 없습니다.');
        console.error('[Axios] 403 Forbidden:', responseData);
        break;
      case 404:
        // Not Found 처리
        // FIXME: API 엔드포인트 오류인지, 리소스 부재인지 구분 필요
        showToast('요청한 리소스를 찾을 수 없습니다.');
        console.error('[Axios] 404 Not Found:', responseData);
        break;
      case 500:
        // Internal Server Error 처리
        // FIXME: 서버 에러 시 자동 재시도 또는 에러 리포트 전송 고려
        showToast('서버 오류가 발생했습니다.');
        console.error('[Axios] 500 Internal Server Error:', responseData);
        break;
      default:
        // FIXME: 다른 상태 코드(502, 503, 504 등)에 대한 처리 추가 필요
        showToast('알 수 없는 에러가 발생했습니다.');
        console.error('[Axios] 기타 에러:', error.response.status, responseData);
    }
  } else if (error.request) {
    // 요청이 전송되었지만 응답을 받지 못한 경우 (네트워크 문제 등)
    // FIXME: 네트워크 끊김 감지 및 재연결 로직 필요
    showToast('서버와 연결할 수 없습니다.');
    console.error('[Axios] 네트워크 에러 - 응답 없음:', error.request);
  } else {
    // 요청 설정 중 에러가 발생한 경우
    // FIXME: 클라이언트 측 설정 오류에 대한 상세 로깅 필요
    showToast('요청 처리 중 오류가 발생했습니다.');
    console.error('[Axios] 요청 설정 에러:', error.message);
  }
  return Promise.reject(error); // 에러를 다시 reject하여 호출한 곳에서 처리할 수 있도록 함
};

const api = createAxiosInstance(tokenResolver, errorHandler);

export default api;
