import LocalStorageService from '../services/localStorage/local-storage.service';
import LocalStorageKey from '../services/localStorage/local-storage-key';
import { getWebSocketService } from '@/services/websocket';
import { authService } from '@/services/api';
import { AccountInfo } from '@template/api';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAccountStore = defineStore('account', () => {
  const accountList = ref<AccountInfo[]>([]);
  const selectedAccount = ref<string | undefined>(
    LocalStorageService.getItem(LocalStorageKey.SELECTED_ACCOUNT) || undefined
  );

  // 예수금과 증거금 상태 추가
  const depositBalance = ref<number>(0); // 예수금
  const marginBalance = ref<number>(0); // 증거금

  // WebSocket private 채널용 JWT 액세스 토큰
  const wsAccessToken = ref<string | null>(null);

  /**
   * WebSocket용 JWT 액세스 토큰을 설정합니다.
   * 로그인 성공 후 호출됩니다.
   */
  const setWsAccessToken = (token: string) => {
    wsAccessToken.value = token;

    // WebSocket 서비스에 토큰 전달
    const wsService = getWebSocketService();
    wsService.setAccessToken(token);
  };

  /**
   * WebSocket용 JWT 액세스 토큰을 제거합니다.
   * 로그아웃 시 호출됩니다.
   */
  const clearWsAccessToken = () => {
    wsAccessToken.value = null;

    // WebSocket 서비스의 토큰도 제거
    const wsService = getWebSocketService();
    wsService.clearAccessToken();
  };

  /**
   * 선택된 계좌를 변경하고 localStorage에 저장합니다.
   * WebSocket JWT 토큰을 발급받아 저장합니다.
   * Private 채널 구독은 주문 페이지의 useWebSocketSubscription에서 관리합니다.
   *
   * @param accountNo - 선택할 계좌번호
   */
  const selectAccount = async (accountNo: string | undefined) => {
    // 이전 계좌와 동일하고 토큰이 이미 있으면 스킵
    if (selectedAccount.value === accountNo && wsAccessToken.value) {
      return;
    }

    // 계좌 선택
    selectedAccount.value = accountNo;
    if (accountNo) {
      LocalStorageService.setItem(LocalStorageKey.SELECTED_ACCOUNT, accountNo);

      // WebSocket JWT 토큰 발급 (private 채널 구독용)
      // 토큰이 없으면 같은 계좌라도 재발급
      try {
        const response = await authService.getWebsocketJwtToken({ accountNo });
        if (response.data?.token) {
          setWsAccessToken(response.data.token);
        } else {
          console.error('[AccountStore] JWT 토큰 발급 실패: 응답에 토큰 없음');
        }
      } catch (error) {
        console.error('[AccountStore] JWT 토큰 발급 실패:', error);
      }
    } else {
      LocalStorageService.removeItem(LocalStorageKey.SELECTED_ACCOUNT);
    }
  };

  /**
   * 계좌 목록을 설정합니다.
   * 선택된 계좌가 없으면 visibleSequence가 가장 작은 계좌를 자동 선택합니다.
   *
   * @param list - 설정할 계좌 목록
   */
  const setAccountList = (list: AccountInfo[]) => {
    accountList.value = list;

    // 선택된 계좌가 없거나 목록에 없는 경우 visibleSequence가 가장 작은 계좌 선택
    const storedAccount = LocalStorageService.getItem(LocalStorageKey.SELECTED_ACCOUNT);
    const accountExists = list.some((account) => account.accountNo === storedAccount);

    if (!storedAccount || !accountExists) {
      if (list.length > 0) {
        // visibleSequence가 가장 작은 계좌 찾기
        const sortedList = [...list].sort(
          (a, b) => Number(a.visibleSequence) - Number(b.visibleSequence)
        );
        selectAccount(sortedList[0].accountNo);
      } else {
        console.warn('[AccountStore] 계좌 목록이 비어있음');
      }
    } else {
      selectAccount(storedAccount);
    }
  };

  /**
   * 계좌 목록을 초기화하고 localStorage의 선택 계좌 정보를 제거합니다.
   */
  const resetAccountList = () => {
    accountList.value = [];
    selectedAccount.value = undefined;
    clearWsAccessToken();
    LocalStorageService.removeItem(LocalStorageKey.SELECTED_ACCOUNT);
  };

  /**
   * 예수금과 증거금을 업데이트합니다.
   * 웹소켓 체결 데이터에서 호출됩니다.
   */
  const updateBalance = (deposit: number, margin: number) => {
    depositBalance.value = deposit;
    marginBalance.value = margin;
  };

  /**
   * 예수금만 업데이트합니다.
   * 웹소켓 입출금 데이터에서 호출됩니다.
   */
  const setDepositBalance = (deposit: number) => {
    depositBalance.value = deposit;
  };

  // Computed getters for common usage patterns
  /**
   * 선택된 계좌번호
   * 계좌가 변경되면 자동으로 업데이트
   */
  const selectedAccountNo = computed(() => selectedAccount.value);

  /**
   * 선택된 계좌번호 - 문자열 기본값
   */
  const selectedAccountNoSafe = computed(() => selectedAccount.value || '');

  /**
   * 선택된 계좌번호가 있는지 확인
   */
  const hasSelectedAccount = computed(() => !!selectedAccount.value);

  /**
   * 계좌 목록
   */
  const accountListComputed = computed(() => accountList.value);

  /**
   * 예수금 (예탁자산)
   */
  const depositBalanceComputed = computed(() => depositBalance.value);

  /**
   * 증거금
   */
  const marginBalanceComputed = computed(() => marginBalance.value);

  /**
   * WebSocket용 액세스 토큰
   */
  const wsAccessTokenComputed = computed(() => wsAccessToken.value);

  return {
    // Actions
    selectAccount,
    setAccountList,
    resetAccountList,
    updateBalance,
    setDepositBalance,
    setWsAccessToken,
    clearWsAccessToken,

    // Computed getters
    selectedAccountNo,
    selectedAccountNoSafe,
    hasSelectedAccount,
    accountListComputed,
    depositBalanceComputed,
    marginBalanceComputed,
    wsAccessTokenComputed,
  };
});
