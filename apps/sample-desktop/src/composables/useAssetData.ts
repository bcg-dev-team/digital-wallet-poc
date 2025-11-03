/**
 * 자산 관련 모든 데이터를 통합 관리하는 메인 컴포저블
 * 자산 포지션, 자산 요약, 증거금 내역 데이터를 하나의 인터페이스로 제공
 * 자산 페이지 진입 시점에 모든 데이터를 한 번에 로드하고 관리
 */

import { useAssetPositionData, type AssetSummaryWithQuantity } from './useAssetPositionData';
import { useWebSocketSubscription } from './useWebSocketSubscription';
import { useAssetDepositData } from './useAssetDepositData';
import { useAccountStore } from '@/stores/useAccountStore';
import { computed } from 'vue';

export function useAssetData() {
  const accountStore = useAccountStore();

  // 각 데이터 타입별 컴포저블 인스턴스
  const assetPositionData = useAssetPositionData();
  const assetDepositData = useAssetDepositData();

  // WebSocket 구독 관리
  const { updateAssetWebSocketSubscriptions } = useWebSocketSubscription();

  // 통합 상태
  const selectedAccount = computed(() => accountStore.selectedAccountNo);
  const isLoading = computed(
    () => assetPositionData.loading.value || assetDepositData.loading.value
  );

  const hasError = computed(() => assetPositionData.error.value || assetDepositData.error.value);

  // 통합 액션들
  const loadAllData = async () => {
    // 모든 데이터를 병렬로 로드
    await Promise.all([
      assetPositionData.loadAssetPositionData(),
      assetDepositData.loadAssetDepositData(),
    ]);
  };

  const refreshAllData = () => {
    assetPositionData.refreshData();
    assetDepositData.refreshData();
  };

  // WebSocket 구독 관리 액션들 (채널만 구독/해제)
  const setupWebSocketSubscription = async () => {
    console.log('[useAssetData] WebSocket 채널 구독 설정 시작');
    await updateAssetWebSocketSubscriptions(); // 자산 화면용 시세 구독
    console.log('[useAssetData] WebSocket 채널 구독 설정 완료');
  };

  const cleanupWebSocketSubscription = async () => {
    console.log('[useAssetData] WebSocket 채널 구독 정리 시작');
    // 자산 화면에서는 시세 구독을 해제하지 않고 유지
    // (다른 화면에서도 시세 데이터가 필요할 수 있음)
    console.log('[useAssetData] WebSocket 채널 구독 정리 완료 (시세 구독 유지)');
  };

  return {
    // 상태
    selectedAccount,
    isLoading,
    hasError,

    // 자산 포지션 데이터
    assetsPosition: assetPositionData.assetsPosition,
    assetsPositionSummary: assetPositionData.assetsPositionSummary,
    positionLoading: assetPositionData.loading,
    positionError: assetPositionData.error,

    // 증거금 내역 데이터
    assetsDeposit: assetDepositData.assetsDeposit,
    assetsDepositSummary: assetDepositData.assetsDepositSummary,
    depositLoading: assetDepositData.loading,
    depositError: assetDepositData.error,

    // 액션들
    loadAllData,
    refreshAllData,
    loadAssetPositionData: assetPositionData.loadAssetPositionData,
    loadAssetDepositData: assetDepositData.loadAssetDepositData,

    // WebSocket 구독 관리
    setupWebSocketSubscription,
    cleanupWebSocketSubscription,
  };
}
