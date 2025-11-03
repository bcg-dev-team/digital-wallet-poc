<template>
  <div class="mx-auto w-[1920px] px-6 py-4">
    <CardLayoutVertical gap="gap-3">
      <MainCardContent class="p-6" title="거래내역" size="lg">
        <template #content>
          <div class="flex items-end gap-2">
            <BaseTabs v-model="modelValue" size="lg" variant="underline" :tabs="tabs" />
            <div class="mb-[1px]">
              <BaseButton variant="contained" label="조회하기" size="md" @click="handleSearch" />
            </div>
          </div>
        </template>
      </MainCardContent>

      <MainCardContent class="p-6" size="lg">
        <template #content>
          <OrderTableContent
            v-if="modelValue === 'order'"
            :summaryData="orderSummaryData"
            :detailData="orderDetailData"
            @loadInitialData="handleSearch"
          />
          <ClearTableContent
            v-if="modelValue === 'clear'"
            :summaryData="profitAndLossSummaryData"
            :detailData="profitAndLossDetailData"
            @loadInitialData="handleSearch"
          />
          <HistoryTableContent
            v-if="modelValue === 'history'"
            :detailData="paymentHistoryDetailData"
            @loadInitialData="handleSearch"
          />
        </template>
      </MainCardContent>
    </CardLayoutVertical>
  </div>
</template>

<script setup lang="ts">
import type {
  SummaryOrderExecution,
  CloseOutHistoryRequest,
  DetailsOrderExecution,
  PaymentDetail,
  OrderExecutionHistoryRequest,
  PaymentHistoryRequest,
  CloseOutSummary,
  CloseOutDetail,
} from '@template/api';
import { initialProfitAndLossSummary } from '@/components/transaction/constants/initialData';
import HistoryTableContent from '@/components/transaction/history/HistoryTableContent.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import HistorySearchBox from '@/components/transaction/history/HistorySearchBox.vue';
import OrderTableContent from '@/components/transaction/order/OrderTableContent.vue';
import ClearTableContent from '@/components/transaction/clear/ClearTableContent.vue';
import { tradeService, executionService, paymentService } from '@/services/api';
import OrderSearchBox from '@/components/transaction/order/OrderSearchBox.vue';
import ClearSearchBox from '@/components/transaction/clear/ClearSearchBox.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { useTradeSearchStore } from '@/stores/useTradeSearchStore';
import { useAccountStore } from '@/stores/useAccountStore';
import { computed, ref, watch, onUnmounted } from 'vue';
import { BaseTabs, BaseButton } from '@template/ui';
import { useRouter, useRoute } from 'vue-router';

type Tab = 'order' | 'clear' | 'history';

const router = useRouter();
const route = useRoute();
const modelValue = computed<Tab>({
  get: () => (route.params.transactionTab as Tab) || 'order',
  set: (val: Tab) => {
    if ((route.params.transactionTab as Tab | undefined) !== val) {
      router.push({ name: 'transaction', params: { transactionTab: val } });
    }
  },
});

const tabs = [
  {
    key: 'order',
    label: '주문체결',
    component: OrderSearchBox,
  },
  {
    key: 'clear',
    label: '청산손익',
    component: ClearSearchBox,
  },
  {
    key: 'history',
    label: '결제내역',
    component: HistorySearchBox,
  },
];

const tradeSearchStore = useTradeSearchStore();
const accountStore = useAccountStore();
const orderSummaryData = ref<SummaryOrderExecution[]>([]);
const orderDetailData = ref<DetailsOrderExecution[]>([]);
const profitAndLossSummaryData = ref<CloseOutSummary>(initialProfitAndLossSummary);
const profitAndLossDetailData = ref<CloseOutDetail[]>([]);
const paymentHistoryDetailData = ref<PaymentDetail[]>([]);

const handleSearch = async () => {
  try {
    if (modelValue.value === 'order') {
      const queryParams: OrderExecutionHistoryRequest = {
        accountNo: accountStore.selectedAccountNoSafe,
        positionCd: tradeSearchStore.positionCd as any, // enum 타입 변환
        orderCd: tradeSearchStore.orderCd as any, // enum 타입 변환
        orderStartDate: tradeSearchStore.orderStartDate,
        orderEndDate: tradeSearchStore.orderEndDate,
        nextKey: '', // number -> string
      };

      const response = await executionService.getOrderExecutionHistory(queryParams);

      if (response?.data) {
        orderSummaryData.value = response.data.summary || [];
        orderDetailData.value = response.data.details || [];
      }
    } else if (modelValue.value === 'clear') {
      const queryParams: CloseOutHistoryRequest = {
        accountNo: accountStore.selectedAccountNoSafe,
        orderStartDate: tradeSearchStore.orderStartDate,
        orderEndDate: tradeSearchStore.orderEndDate,
        nextKey: '', // number -> string
      };

      const response = await tradeService.getCloseOutHistory(queryParams);

      if (response?.data) {
        profitAndLossSummaryData.value = response.data.summary;
        profitAndLossDetailData.value = response.data.details;
      }
    } else if (modelValue.value === 'history') {
      const queryParams: PaymentHistoryRequest = {
        accountNo: accountStore.selectedAccountNoSafe,
        orderStartDate: tradeSearchStore.orderStartDate,
        orderEndDate: tradeSearchStore.orderEndDate,
        nextKey: '', // number -> string
      };

      const response = await paymentService.getPaymentHistory(queryParams);

      if (response?.data) {
        paymentHistoryDetailData.value = response.data.details || [];
      }
    }
  } catch (error) {
    console.error('거래 내역 조회 중 오류 발생:', error);
  }
};

// selectedAccount가 변경될 때만 데이터 재조회
watch(
  () => accountStore.selectedAccountNo,
  (newAccount) => {
    if (newAccount) {
      handleSearch();
    }
  }
);

// 페이지를 벗어날 때 검색 조건 초기화
onUnmounted(() => {
  tradeSearchStore.reset();
});
</script>

<style scoped>
:deep([role='tabpanel']) {
  padding: 0px !important;
}
</style>
