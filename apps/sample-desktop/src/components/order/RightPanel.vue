<template>
  <div class="bg-bg-default flex flex-col p-4">
    <!-- 통화 페어 섹션 -->
    <div
      class="h-13 bg-bg-bg-innerframe relative mt-3 flex items-center justify-between rounded-md border border-[var(--button-blue-border)] p-4"
    >
      <div class="flex w-52 items-center gap-1">
        <BaseIcon v-if="state.isOpen" name="check-sm" size="md" color="var(--input-icon-success)" />
        <BaseIcon v-else name="pause" size="md" color="var(--input-icon-off)" />
        <div class="text-base font-semibold leading-5 tracking-[-0.35px]">
          {{ currentSymbol }}
        </div>
      </div>
    </div>

    <!-- 주문 유형 선택 -->
    <div class="mt-3">
      <BaseRadioGroup
        v-model="selectedOrderType"
        :options="orderTypeOptions"
        name="orderType"
        fullwidth
      />
    </div>

    <!-- 매도 매수 버튼 -->
    <!-- <div class="mt-2 flex gap-2">
      <BaseButton
        :variant="state.orderType === ORDER_SIDE_CD.buy ? 'light' : 'contained-grey'"
        color="red"
        class="h-full"
        @click="state.orderType = ORDER_SIDE_CD.buy as OrderSideCdType"
        fullWidth
      >
        <div>
          <div class="text-font-14 font-medium leading-5 tracking-[-0.35px]">매수</div>
          <div class="text-base font-semibold leading-5 tracking-[-0.35px]">
            {{ buyPrice.toFixed(5) }}
          </div>
        </div>
      </BaseButton>
      <BaseButton
        :variant="state.orderType === ORDER_SIDE_CD.sell ? 'light' : 'contained-grey'"
        color="blue"
        class="h-full"
        @click="state.orderType = ORDER_SIDE_CD.sell as OrderSideCdType"
        fullWidth
      >
        <div>
          <div class="text-font-14 font-medium leading-5 tracking-[-0.35px]">매도</div>
          <div class="text-base font-semibold leading-5 tracking-[-0.35px]">
            {{ sellPrice.toFixed(5) }}
          </div>
        </div>
      </BaseButton>
    </div> -->
    <div class="mt-2 flex gap-2">
      <TempBaseButton
        :variant="state.orderType === 'BUY' ? 'light' : 'contained-grey'"
        color="red"
        class="h-full"
        @click="state.orderType = 'BUY' as OrderNewRequestSideCdType"
        fullWidth
      >
        <div>
          <div class="text-font-14 font-medium leading-5 tracking-[-0.35px]">매수</div>
          <div class="text-base font-semibold leading-5 tracking-[-0.35px]">
            {{ buyPrice.toFixed(5) }}
          </div>
        </div>
      </TempBaseButton>
      <TempBaseButton
        :variant="state.orderType === 'SELL' ? 'light' : 'contained-grey'"
        color="blue"
        class="h-full"
        @click="state.orderType = 'SELL' as OrderNewRequestSideCdType"
        fullWidth
      >
        <div>
          <div class="text-font-14 font-medium leading-5 tracking-[-0.35px]">매도</div>
          <div class="text-base font-semibold leading-5 tracking-[-0.35px]">
            {{ sellPrice.toFixed(5) }}
          </div>
        </div>
      </TempBaseButton>
    </div>

    <!-- 거래 정보 섹션 -->
    <div
      class="text-color-default mt-2 flex items-center justify-center gap-2 text-center text-[11px] leading-[14px] tracking-[-0.1px]"
    >
      <span class="whitespace-nowrap">스프레드: {{ spread.toFixed(5) }}</span>
      <span>|</span>
      <span class="whitespace-nowrap">고가: {{ highPrice.toFixed(5) }}</span>
      <span>|</span>
      <span class="whitespace-nowrap">저가: {{ lowPrice.toFixed(5) }}</span>
    </div>

    <!-- 수량 및 증거금율 섹션 -->
    <div class="mt-6 flex w-full flex-col gap-3">
      <!-- 수량 입력 섹션 -->
      <div class="grid grid-cols-2 gap-3">
        <!-- 시장가: 수량만 -->
        <template v-if="selectedOrderType === 'MARKET'">
          <InputStepperLabel
            v-model:value="state.quantity"
            :min="0"
            label="수량(Lots)"
            variant="unit"
            unit-label="Lot"
            :step="0.01"
          />
        </template>

        <!-- Limit: 진입가격, 수량 -->
        <template v-else-if="selectedOrderType === 'LIMIT'">
          <InputStepperLabel
            v-model:value="state.entryPrice"
            :min="0"
            label="진입가격"
            :step="0.0001"
          />
          <InputStepperLabel
            v-model:value="state.quantity"
            :min="0"
            label="수량(Lots)"
            :step="0.01"
            variant="unit"
            unit-label="Lot"
          />
        </template>

        <!-- Stop: 배리어, 수량 -->
        <template v-else-if="selectedOrderType === 'STOP'">
          <InputStepperLabel
            v-model:value="state.barrier"
            :min="0"
            :max="100"
            label="배리어"
            :step="0.01"
          />
          <InputStepperLabel
            v-model:value="state.quantity"
            :min="0"
            label="수량(Lots)"
            :step="0.01"
            variant="unit"
            unit-label="Lot"
          />
        </template>

        <!-- Stop Limit: 배리어, 수량, 진입가격 -->
        <template v-else-if="selectedOrderType === 'LIMIT_STOP'">
          <InputStepperLabel
            v-model:value="state.barrier"
            :min="0"
            :max="100"
            label="배리어"
            :step="0.01"
          />
          <InputStepperLabel
            v-model:value="state.quantity"
            :min="0"
            label="수량(Lots)"
            :step="0.01"
            variant="unit"
            unit-label="Lot"
          />
          <InputStepperLabel
            v-model:value="state.entryPrice"
            :min="0"
            label="진입가격 Pip"
            :step="0.0001"
          />
        </template>
      </div>

      <!-- 증거금율 정보 섹션 -->
      <div class="bg-bg-bg-innerframe w-full rounded-[8px] p-3">
        <div class="flex flex-col gap-2">
          <!-- 1 Lot 값 -->
          <div class="flex w-full items-center justify-between text-[12px] leading-[16px]">
            <div class="text-default-muted-dark font-normal tracking-[-0.35px]">1 Lot 값</div>
            <div class="font-medium">${{ lotValue.toFixed(2) }}</div>
          </div>
          <!-- Pip Value -->
          <div class="flex w-full items-center justify-between text-[12px] leading-[16px]">
            <div class="text-default-muted-dark font-normal tracking-[-0.35px]">Pip Value</div>
            <div class="font-medium">${{ pipValue.toFixed(2) }}</div>
          </div>
          <!-- 최소 증거금 -->
          <div class="flex w-full items-center justify-between text-[12px] leading-[16px]">
            <div class="text-default-muted-dark font-normal tracking-[-0.35px]">최소 증거금</div>
            <div class="font-medium">${{ minimumMargin.toFixed(2) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 자동 청산 섹션 -->
    <div class="mt-6 flex w-full flex-col gap-2">
      <div
        @click="state.isAutoLiquidationOpen = !state.isAutoLiquidationOpen"
        class="flex w-full cursor-pointer items-center justify-start"
      >
        <div class="text-[15px] font-semibold leading-[20px] tracking-[-0.35px]">자동 청산</div>
        <BaseIcon
          name="arrow-up"
          size="md"
          :class="{ 'rotate-180': state.isAutoLiquidationOpen }"
          class="transition-transform duration-200"
        />
      </div>

      <!-- 자동 청산 콘텐츠 -->
      <div
        v-if="state.isAutoLiquidationOpen"
        class="flex flex-col gap-2 overflow-hidden transition-all duration-200"
      >
        <!-- Stop Loss & Take Profit 체크박스 -->
        <div class="flex items-center justify-between">
          <div class="w-[150px]">
            <BaseCheckbox v-model="state.stopLoss">
              <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px]">Stop Loss</div>
            </BaseCheckbox>
          </div>
          <div class="w-[150px]">
            <BaseCheckbox v-model="takeProfitModel">
              <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px]">
                Take Profit
              </div>
            </BaseCheckbox>
          </div>
        </div>

        <!-- Stop Loss 입력 필드들 -->
        <div class="flex flex-col gap-1">
          <!-- Stop Loss 핍 입력 -->
          <div class="flex items-center justify-between gap-1">
            <div class="flex w-[150px] items-center">
              <BaseInputStepper
                v-model="state.stopLossPip"
                :step="0.1"
                variant="default"
                :disabled="!state.stopLoss"
              />
            </div>

            <div class="w-10 text-center text-[12px] font-normal leading-[16px] tracking-[-0.35px]">
              핍
            </div>
            <div class="flex w-[150px] items-center">
              <BaseInputStepper
                v-model="state.takeProfitPip"
                :step="0.00001"
                variant="default"
                :disabled="!state.takeProfit"
              />
            </div>
          </div>

          <!-- Stop Loss & Take Profit 가격 입력 -->
          <div class="mt-1 flex items-center justify-between gap-1">
            <div class="flex w-[150px] items-center">
              <BaseInputStepper
                v-model="state.stopLossPrice"
                :min="0"
                :max="100"
                :step="0.00001"
                variant="range"
                :disabled="!state.stopLoss"
              />
            </div>

            <div class="w-10 text-center text-[12px] font-normal leading-[16px] tracking-[-0.35px]">
              가격
            </div>
            <div class="flex w-[150px] items-center">
              <BaseInputStepper
                v-model="state.takeProfitPrice"
                :min="0"
                :max="100"
                :step="0.00001"
                variant="range"
                :disabled="!state.takeProfit"
              />
            </div>
          </div>
        </div>

        <!-- Trailing Stop 체크박스 -->
        <div class="mt-2.5 flex w-[150px] items-center gap-1">
          <BaseCheckbox v-model="trailingStopModel">
            <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px]">
              Trailing Stop
            </div>
          </BaseCheckbox>
        </div>
      </div>
    </div>

    <!-- 버튼 섹션 -->
    <div class="mt-3 flex w-full flex-col gap-2.5">
      <BaseButton label="주문 실행" :disabled="!state.orderType" @click="handleExecuteOrder" />
    </div>

    <!-- 5단계 호가 섹션 -->
    <div class="mt-6 flex w-full flex-col gap-2">
      <div class="text-[15px] font-semibold leading-[20px] tracking-[-0.35px]">5단계 호가</div>

      <!-- 호가 차트 -->
      <OrderBook
        :stockCd="currentSymbol"
        :pointUnit="currentSymbolData?.metadata?.pointUnit || 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BaseRadioGroup,
  BaseButton,
  BaseIcon,
  BaseCheckbox,
  BaseInputStepper,
  TempBaseButton,
  RadioOption,
} from '@template/ui';
import { calculateLotValue, calculatePipValue, calculateMinimumMargin } from '@template/utils';
import { selectedSymbolInstance as selectedSymbol } from '@/composables/useSelectedSymbol';
import InputStepperLabel from '@/components/order/rightPanel/InputStepperLabel.vue';
import LocalStorageKey from '@/services/localStorage/local-storage-key';
import { reactive, ref, computed, onMounted, watch } from 'vue';

import type {
  OrderNewRequest,
  OrderNewRequestOrderTypeCdType,
  OrderNewRequestSideCdType,
} from '@template/api';
import { useSymbolData } from '@/composables/useSymbolData';
import { useAccountStore } from '@/stores/useAccountStore';
import { useToastStore } from '@/stores/useToastStore';
import { orderService } from '@/services/api';
import OrderBook from './OrderBook.vue';

interface Props {
  selectedSymbol?: string;
}

const toastStore = useToastStore();

withDefaults(defineProps<Props>(), {
  selectedSymbol: 'EURUSD',
});

const accountStore = useAccountStore();

// 선택된 심볼 정보
const currentSymbol = computed(() => {
  return selectedSymbol.selectedSymbol.value;
});

// 종목 데이터 가져오기
const { getSymbolByCode, symbolMetadata, loadAllSymbols } = useSymbolData();

// 로컬스토리지에서 자동청산 아코디언 상태 복원
const loadAutoLiquidationAccordionState = () => {
  const savedState = localStorage.getItem(LocalStorageKey.AUTO_LIQUIDATION_ACCORDION_OPEN);
  if (savedState !== null) {
    state.isAutoLiquidationOpen = JSON.parse(savedState);
  }
};

// 자동청산 아코디언 상태를 로컬스토리지에 저장
const saveAutoLiquidationAccordionState = (isOpen: boolean) => {
  localStorage.setItem(LocalStorageKey.AUTO_LIQUIDATION_ACCORDION_OPEN, JSON.stringify(isOpen));
};

// 컴포넌트 마운트 시 데이터 로드 확인
onMounted(async () => {
  // 로컬스토리지에서 아코디언 상태 복원
  loadAutoLiquidationAccordionState();

  watch(
    () => state.isAutoLiquidationOpen,
    (newValue) => {
      saveAutoLiquidationAccordionState(newValue);
    }
  );

  // symbolMetadata가 비어있으면 데이터 로드
  if (symbolMetadata.value.size === 0) {
    console.log('[RightPanel] symbolMetadata 비어있음, 데이터 로드 시작');
    await loadAllSymbols();
  }
});

// 현재 선택된 종목의 데이터
const currentSymbolData = computed(() => {
  // console.log('currentSymbolData', currentSymbol.value);
  const data = getSymbolByCode(currentSymbol.value);
  // console.log('getSymbolByCode result:', data);
  return data;
});

const lotValue = computed(() => {
  if (!currentSymbolData.value?.metadata) return 0;
  return calculateLotValue(currentSymbolData.value.currentPrice, currentSymbolData.value.metadata);
});

const pipValue = computed(() => {
  if (!currentSymbolData.value?.metadata) return 0;
  return calculatePipValue(currentSymbolData.value.metadata, currentSymbolData.value.currentPrice);
});

const minimumMargin = computed(() => {
  if (!currentSymbolData.value?.metadata || !lotValue.value) return 0;
  return calculateMinimumMargin(currentSymbolData.value.metadata.marginRate, lotValue.value);
});

const pipUnit = computed(() => {
  if (!currentSymbolData.value?.metadata) return 0.00001;
  return currentSymbolData.value.metadata.pipUnit;
});

const state = reactive({
  isOpen: true, // 장운영여부
  loadEntryPrice: false, // 진입가격 로드 여부

  orderType: 'BUY',

  quantity: 1, //주문 입력 데이터 - 수량
  entryPrice: 0, //주문 입력 데이터 - 진입가격
  barrier: 0, //주문 입력 데이터 - 배리어

  isAutoLiquidationOpen: true, // 자동 청산 토글 상태 (기본값: 펼침)
  stopLoss: false, //stopLoss 체크 박스 상태
  takeProfit: false, //takeProfit 체크 박스 상태
  trailingStop: false, //trailingStop 체크 박스 상태

  // Stop Loss & Take Profit 데이터
  stopLossPip: -100.1, //stopLoss 핍 입력 데이터
  stopLossPrice: 0, //stopLoss 가격 입력 데이터
  takeProfitPip: 100.1, //takeProfit 핍 입력 데이터
  takeProfitPrice: 0, //takeProfit 가격 입력 데이터
});

// 선택된 심볼의 실시간 가격 사용
const buyPrice = computed(() => {
  if (!state.loadEntryPrice && selectedSymbol.buyPrice.value) {
    state.entryPrice = selectedSymbol.buyPrice.value;
    state.loadEntryPrice = true;
  }
  return selectedSymbol.buyPrice.value;
});

const sellPrice = computed(() => {
  return selectedSymbol.sellPrice.value;
});

const currentPrice = computed(() => {
  return selectedSymbol.currentPrice.value;
});

// 고가/저가
const highPrice = computed(() => {
  return selectedSymbol.highPrice.value;
});

const lowPrice = computed(() => {
  return selectedSymbol.lowPrice.value;
});

// 스프레드 계산 (매도 가격 - 매수 가격)
const spread = computed(() => {
  return sellPrice.value - buyPrice.value;
});

const selectedOrderType = defineModel<OrderNewRequestOrderTypeCdType>('orderType', {
  default: 'MARKET',
});

const orderTypeOptions: RadioOption<OrderNewRequestOrderTypeCdType>[] = [
  {
    value: 'MARKET',
    label: '시장가',
  },
  {
    value: 'LIMIT',
    label: '지정가',
  },
  {
    value: 'STOP',
    label: '조건시장가',
  },
  {
    value: 'LIMIT_STOP',
    label: '조건지정가',
  },
];

// Take Profit과 Trailing Stop 상호 배타적 동작을 위한 computed
const takeProfitModel = computed({
  get: () => state.takeProfit,
  set: (value: boolean) => {
    state.takeProfit = value;
    if (value) {
      state.trailingStop = false;
    }
  },
});

const trailingStopModel = computed({
  get: () => state.trailingStop,
  set: (value: boolean) => {
    state.trailingStop = value;
    if (value) {
      state.takeProfit = false;
    }
  },
});

const handleExecuteOrder = async () => {
  try {
    const request: OrderNewRequest = {
      accountNo: accountStore.selectedAccountNoSafe,
      accountPassword: '123456',
      stockCd: currentSymbol.value,
      orderTypeCd: selectedOrderType.value,
      sideCd: state.orderType as OrderNewRequestSideCdType,
      orderQuantity: state.quantity,
      barrierPrice: state.barrier,
      orderPrice: state.entryPrice,
      profitRealizationYn: state.takeProfit ? 'Y' : 'N',
      profitRealizationBarrierPrice: 0,
      lossCutYn: state.stopLoss ? 'Y' : 'N',
      lossCutBarrierPrice: 0,
      lossTrackingYn: state.trailingStop ? 'Y' : 'N',
    };

    const response = await orderService.createNewOrder(request);

    if (response.status === 'success') {
      toastStore.addToast('주문이 실행되었습니다.');
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
