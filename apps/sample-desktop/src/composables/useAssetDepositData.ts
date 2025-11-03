/**
 * 자산 증거금 내역 데이터 관리 Composable
 * 증거금 포지션과 주문 데이터를 관리
 */

import type { AssetDepositsRequest, AssetPosition, AssetOrder } from '@template/api';
import { useAccountStore } from '@/stores/useAccountStore';
import { assetService } from '@/services/api';
import { ref, computed, watch } from 'vue';

export function useAssetDepositData() {
  const accountStore = useAccountStore();

  // 상태
  const assetsDeposit = ref<AssetPosition[]>([]);
  const assetsDepositSummary = ref<AssetOrder[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 데이터 로드
  const loadAssetDepositData = async () => {
    if (!accountStore.selectedAccountNo) {
      console.warn('계좌가 선택되지 않았습니다.');
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      const request: AssetDepositsRequest = {
        accountNo: accountStore.selectedAccountNoSafe,
        nextKey: '',
      };

      const response = await assetService.getAssetDeposits(request);

      if (response.data) {
        assetsDeposit.value = response.data.positions || [];
        assetsDepositSummary.value = response.data.summary || [];
      }
    } catch (err) {
      console.error('자산 증거금 데이터 로드 실패:', err);
      error.value =
        err instanceof Error ? err.message : '자산 증거금 데이터를 불러오는데 실패했습니다.';
    } finally {
      loading.value = false;
    }
  };

  // 데이터 새로고침
  const refreshData = () => {
    loadAssetDepositData();
  };

  // 계좌 변경 감지
  watch(
    () => accountStore.selectedAccountNo,
    (newAccount) => {
      if (newAccount) {
        loadAssetDepositData();
      }
    }
  );

  return {
    // 상태
    assetsDeposit,
    assetsDepositSummary,
    loading,
    error,

    // 액션들
    loadAssetDepositData,
    refreshData,
  };
}
