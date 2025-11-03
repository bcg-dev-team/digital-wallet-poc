<template>
  <div class="mx-auto w-[1920px] px-6 py-4">
    <CardLayoutVertical gap="gap-3">
      <MainCardContent class="p-6" title="내 자산" size="lg" />
      <CardLayoutHorizontal :columns="[4, 1]" gap="gap-3">
        <MainCardContent class="p-6">
          <template #content>
            <div>
              <HoldPosition :rowData="assetData.assetsPosition.value" />
            </div>
          </template>
        </MainCardContent>
        <MainCardContent class="p-6">
          <template #content>
            <div>
              <AssetsComposition :summary="assetData.assetsPositionSummary.value" />
            </div>
          </template>
        </MainCardContent>
      </CardLayoutHorizontal>

      <MainCardContent class="p-6" size="lg">
        <template #content>
          <LabelContent label="증거금 내역" size="lg">
            <template #content>
              <BaseTabs v-model="modelValue" size="md" variant="underline" :tabs="tabs" />
            </template>
          </LabelContent>
        </template>
      </MainCardContent>
    </CardLayoutVertical>
  </div>
</template>
<script setup lang="ts">
import PositionTableContent from '@/components/assets/marginDetails/PositionTableContent.vue';
import CardLayoutHorizontal from '@/components/layout/fragments/CardLayoutHorizontal.vue';
import OrderTableContent from '@/components/assets/marginDetails/OrderTableContent.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import AssetsComposition from '@/components/assets/AssetsComposition.vue';
import { useGlobalWebSocket } from '@/composables/useGlobalWebSocket';
import LabelContent from '@/components/common/LabelContent.vue';
import HoldPosition from '@/components/assets/HoldPosition.vue';
import { computed, h, onMounted, onUnmounted, ref } from 'vue';
import { useAssetData } from '@/composables/useAssetData';
import { BaseTabs } from '@template/ui';

const modelValue = ref('position');

// 자산 데이터 관리 composable 사용
const assetData = useAssetData();

// 전역 WebSocket 관리
const { initializeGlobalWebSocket } = useGlobalWebSocket();

const tabs = [
  {
    key: 'position',
    label: '포지션',
    component: () => h(PositionTableContent, { rowData: assetData.assetsDeposit.value }),
  },
  {
    key: 'order',
    component: () => h(OrderTableContent, { rowData: assetData.assetsDepositSummary.value }),
    label: '주문',
  },
];

onMounted(async () => {
  console.log('[Assets Index] 자산 화면 초기화 시작');

  // 1. 전역 WebSocket 연결 초기화 (한 번만 실행)
  console.log('[Assets Index] 전역 WebSocket 연결 초기화 시작');
  try {
    await initializeGlobalWebSocket();
    console.log('[Assets Index] 전역 WebSocket 연결 초기화 완료');
  } catch (error) {
    console.error('[Assets Index] 전역 WebSocket 연결 초기화 실패:', error);
  }

  // 2. WebSocket 채널 구독 설정 (전역 연결에 채널만 추가)
  console.log('[Assets Index] WebSocket 채널 구독 설정 시작');
  try {
    await assetData.setupWebSocketSubscription();
    console.log('[Assets Index] WebSocket 채널 구독 설정 완료');

    // 구독 상태 확인
    const { getWebSocketService } = await import('@/services/websocket');
    const wsService = getWebSocketService();
    console.log('[Assets Index] WebSocket 연결 상태:', wsService.isConnected());
  } catch (error) {
    console.error('[Assets Index] WebSocket 채널 구독 설정 실패:', error);
  }

  // 3. 자산 데이터 로드
  console.log('[Assets Index] 자산 데이터 로드 시작');
  await assetData.loadAllData();
  console.log('[Assets Index] 자산 데이터 로드 완료');
});

onUnmounted(async () => {
  console.log('[Assets Index] 자산 화면 정리 시작');

  // WebSocket 채널 구독 정리 (연결은 유지)
  await assetData.cleanupWebSocketSubscription();
  console.log('[Assets Index] 자산 화면 정리 완료');
});
</script>
