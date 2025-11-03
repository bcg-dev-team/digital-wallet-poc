/**
 * 자산 포지션 데이터 관리 Composable
 * 보유 포지션과 자산 요약 데이터를 관리
 */

import type { AssetPositionsRequest, Position, AssetSummary } from '@template/api';

/**
 * AssetSummary에 accountBookQuantity를 추가한 확장 타입
 */
export interface AssetSummaryWithQuantity extends AssetSummary {
  accountBookQuantity: number;
}
import { useAccountStore } from '@/stores/useAccountStore';
import { assetService } from '@/services/api';
import { ref, computed, watch } from 'vue';

export function useAssetPositionData() {
  const accountStore = useAccountStore();

  // 상태
  const assetsPosition = ref<Position[]>([]);
  const assetsPositionSummary = ref<AssetSummaryWithQuantity[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 데이터 로드
  const loadAssetPositionData = async () => {
    if (!accountStore.selectedAccountNo) {
      console.warn('계좌가 선택되지 않았습니다.');
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      const request: AssetPositionsRequest = {
        accountNo: accountStore.selectedAccountNoSafe,
        nextKey: '',
      };

      const response = await assetService.getAssetPositions(request);

      if (response.data) {
        const { positions, summary } = response.data;
        assetsPosition.value = positions || [];

        // summary에 positions의 accountBookQuantity 추가
        assetsPositionSummary.value = (summary || []).map((summaryItem) => {
          // positions에서 stockCd와 positionCd가 일치하는 항목 찾기
          const matchingPosition = positions?.find(
            (pos) =>
              pos.stockCd === summaryItem.stockCd && pos.positionCd === summaryItem.positionCd
          );

          return {
            ...summaryItem,
            accountBookQuantity: matchingPosition?.accountBookQuantity || 0,
          };
        });
      }
    } catch (err) {
      console.error('자산 포지션 데이터 로드 실패:', err);
      error.value =
        err instanceof Error ? err.message : '자산 포지션 데이터를 불러오는데 실패했습니다.';
    } finally {
      loading.value = false;
    }
  };

  // 데이터 새로고침
  const refreshData = () => {
    loadAssetPositionData();
  };

  // 계좌 변경 감지
  watch(
    () => accountStore.selectedAccountNo,
    (newAccount) => {
      if (newAccount) {
        loadAssetPositionData();
      }
    }
  );

  return {
    // 상태
    assetsPosition,
    assetsPositionSummary,
    loading,
    error,

    // 액션들
    loadAssetPositionData,
    refreshData,
  };
}
