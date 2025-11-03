/**
 * 인증 관련 서비스
 *
 * TODO: 리팩토링 및 제거 예정
 * - @template/api의 AuthService를 직접 사용하는 방향으로 개선
 * - 현재는 임시 Logout 함수만 제공
 */

import LocalStorageService from '@/services/localStorage/local-storage.service';
import LocalStorageKey from '@/services/localStorage/local-storage-key';
import { useToastStore } from '../stores/useToastStore';
import router from '@/router';

export const Logout = () => {
  LocalStorageService.removeItem(LocalStorageKey.ACCESS_TOKEN);

  //FIXME: 임시 alert 처리
  const toastStore = useToastStore();

  const message = '세션이 만료 되었습니다. \n 다시 로그인 해주세요.';
  toastStore.addToast(message, 3000);
  console.error(message);

  router.push({ name: 'login' });
};
