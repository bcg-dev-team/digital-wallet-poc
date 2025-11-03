/**
 * 증거금 데이터를 관리하는 컴포저블
 * 자산 화면의 포지션 테이블과 주문 테이블 데이터를 사용하여 증거금을 계산
 */

import { ref, computed, watch } from 'vue';
import { useAccountStore } from '@/stores/useAccountStore';
import { assetService } from '@/services/api';
import type { AssetPosition, AssetOrder, Position } from '@template/api';

export function useMarginData() {
  const accountStore = useAccountStore();
  
  // 로컬 상태
  const loading = ref(false);
  const error = ref<string | null>(null);
  
  // 자산 데이터
  const positions = ref<AssetPosition[]>([]);
  const orders = ref<AssetOrder[]>([]);
  
  // 계산된 증거금
  const totalMargin = computed(() => {
    // 포지션 테이블의 증거금 합계
    const positionMargin = positions.value.reduce((total, position) => {
      return total + (position.depositPrice || 0);
    }, 0);
    
    // 주문 테이블의 주문증거금 합계
    const orderMargin = orders.value.reduce((total, order) => {
      return total + (order.orderDepositPrice || 0);
    }, 0);
    
    return positionMargin + orderMargin;
  });
  
  /**
   * 자산 데이터를 API에서 가져오는 함수
   */
  const loadMarginData = async () => {
    if (!accountStore.selectedAccountNo) {
      error.value = '계좌가 선택되지 않았습니다.';
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      // 증거금 데이터 가져오기 (포지션 + 주문)
      const depositRequest = {
        accountNo: accountStore.selectedAccountNo,
        nextKey: '',
      };
      const depositResponse = await assetService.getAssetDeposits(depositRequest);
      
      if (depositResponse.data) {
        // 포지션 테이블 데이터 (AssetPosition[])
        positions.value = depositResponse.data.positions || [];
        // 주문 테이블 데이터 (AssetOrder[])
        orders.value = depositResponse.data.summary || [];
      }

      console.log('[useMarginData] 증거금 데이터 로드 완료:', {
        positionMargin: positions.value.reduce((total, p) => total + (p.depositPrice || 0), 0),
        orderMargin: orders.value.reduce((total, o) => total + (o.orderDepositPrice || 0), 0),
        totalMargin: totalMargin.value
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '증거금 데이터를 불러오는데 실패했습니다.';
      error.value = errorMessage;
      console.error('증거금 데이터 로드 실패:', err);
    } finally {
      loading.value = false;
    }
  };

  /**
   * 데이터 새로고침
   */
  const refreshData = () => {
    loadMarginData();
  };

  /**
   * 에러 상태 초기화
   */
  const clearError = () => {
    error.value = null;
  };

  // 계좌 변경 감지
  watch(
    () => accountStore.selectedAccountNo,
    (newAccount) => {
      if (newAccount) {
        loadMarginData();
      } else {
        // 계좌가 선택되지 않으면 데이터 초기화
        positions.value = [];
        orders.value = [];
      }
    },
    { immediate: true }
  );

  return {
    // 상태
    positions,
    orders,
    loading,
    error,
    
    // 계산된 속성
    totalMargin,
    
    // 액션
    loadMarginData,
    refreshData,
    clearError,
  };
}
