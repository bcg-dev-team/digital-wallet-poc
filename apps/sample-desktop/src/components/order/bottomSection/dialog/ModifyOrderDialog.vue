<template>
  <BaseModal
    :is-open="isOpen"
    :show-default-footer="false"
    :close-on-overlay-click="false"
    :close-on-escape="false"
    :showCloseButton="true"
    content-padding="none"
    size="sm"
    title="정정"
    @close="emit('close')"
    @update:is-open="emit('update:isOpen', $event)"
  >
    <div class="px-padding-24 gap-size-24 pt-size-24 pb-size-36 flex flex-col">
      <!-- 메시지 영역 -->
      <div class="w-full">
        <div
          class="p-padding-16 gap-size-12 bg-bg-bg-innerframe border-bg-bg-outline flex w-full flex-col rounded-md border"
        >
          <div class="gap-size-10 flex items-center">
            <span class="text-font-16 font-semibold">{{ currentSymbol }}</span>
            <BaseChip
              :label="EnumLabelMapper.getPositionCodeShort(props.selectedRowData.positionCd)"
              :variant="props.selectedRowData.positionCd === 'LONG' ? 'red' : 'blue'"
              size="sm"
              rounded="rounded-sm"
            />
          </div>
          <div class="gap-column-4 grid grid-cols-2">
            <ol class="flex items-center gap-8">
              <p class="text-font-13 font-medium">주문유형</p>
              <p class="text-font-13">{{ props.selectedRowData.orderTypeCd }}</p>
            </ol>
            <ol></ol>
            <ol class="flex items-center gap-8">
              <p class="text-font-13 font-medium">주문가격</p>
              <p class="text-font-13">
                {{ props.selectedRowData.orderPrice.toFixed(5) }}
              </p>
            </ol>
            <ol class="flex items-center gap-8">
              <p class="text-font-13 font-medium">주문수량</p>
              <p class="text-font-13">{{ props.selectedRowData.orderQuantity.toFixed(1) }} Lot</p>
            </ol>
          </div>
        </div>

        <div class="mt-size-12 w-full">
          <BaseRadioGroup
            v-model="selectedCloseOutType"
            :options="closeOutTypeOptions"
            name="closeOutType"
            :allowedList="[0, 3]"
            fullwidth
          />
        </div>

        <!-- 매도 매수 버튼 -->
        <div class="mt-2 flex w-full gap-2">
          <TempBaseButton
            :variant="orderSideCd === 'BUY' ? 'light' : 'contained-grey'"
            color="red"
            class="h-full"
            :disabled="orderSideCd !== 'BUY'"
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
            :variant="orderSideCd === 'SELL' ? 'light' : 'contained-grey'"
            color="blue"
            class="h-full"
            :disabled="orderSideCd !== 'SELL'"
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
          <span class="whitespace-nowrap">스프레드: -</span>
          <span>|</span>
          <span class="whitespace-nowrap">고가: {{ highPrice.toFixed(5) }}</span>
          <span>|</span>
          <span class="whitespace-nowrap">저가: {{ lowPrice.toFixed(5) }}</span>
        </div>
      </div>

      <!-- 수량 및 증거금율 섹션 -->
      <div class="flex w-full flex-col gap-3">
        <!-- 수량 입력 섹션 -->
        <div class="grid grid-cols-2 gap-3">
          <!-- 시장가: 수량만 -->
          <template v-if="selectedCloseOutType === 'LIMIT'">
            <InputStepperLabel
              v-model:value="state.closeOutPrice"
              :min="0"
              label="정정가격"
              :step="priceStep"
            />
            <InputStepperLabel
              v-model:value="state.quantity"
              label="수량"
              variant="unit"
              unit-label="Lot"
              :step="0.01"
              disabled
            />
          </template>

          <!-- Limit: 진입가격, 수량 -->
          <template v-else-if="selectedCloseOutType === 'STOP'">
            <InputStepperLabel
              v-model:value="state.barrier"
              :min="0"
              :max="100"
              label="배리어"
              :step="priceStep"
            />
            <InputStepperLabel
              v-model:value="state.quantity"
              variant="unit"
              unit-label="Lot"
              label="수량"
              :step="0.01"
            />
          </template>

          <!-- Stop: 배리어, 수량 -->
          <template v-else-if="selectedCloseOutType === 'LIMIT_STOP'">
            <InputStepperLabel
              v-model:value="state.barrier"
              :min="0"
              :max="100"
              label="배리어"
              :step="priceStep"
            />
            <InputStepperLabel
              v-model:value="state.quantity"
              variant="unit"
              unit-label="Lot"
              label="수량"
              :step="0.01"
              disabled
            />
            <InputStepperLabel
              v-model:value="state.closeOutPricePip"
              :min="0"
              :max="100"
              label="정정가격 Pip"
              :step="0.1"
            />
          </template>

          <!-- Stop Limit: 배리어, 수량, 진입가격 -->
          <template v-else-if="selectedCloseOutType === 'TPSL'">
            <InputStepperLabel
              v-model:value="state.quantity"
              :min="0"
              :max="100"
              label="수량"
              :step="0.01"
              variant="unit"
              unit-label="Lot"
              disabled
            />
          </template>
        </div>
      </div>

      <div
        class="flex flex-col gap-2"
        v-if="
          selectedCloseOutType === 'TPSL' ||
          selectedCloseOutType === 'STOP' ||
          selectedCloseOutType === 'LIMIT'
        "
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
        <div class="flex flex-col justify-between gap-1">
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
          <div class="flex items-center justify-between gap-1">
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
        <div class="flex w-[150px] items-center gap-1">
          <BaseCheckbox v-model="trailingStopModel">
            <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px]">
              Trailing Stop
            </div>
          </BaseCheckbox>
        </div>
      </div>
      <!-- 버튼 영역 -->
      <div class="w-full">
        <BaseButton
          label="정정 실행"
          variant="contained"
          color="primary"
          size="md"
          :full-width="true"
          @click="handleConfirm"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import {
  BaseRadioGroup,
  BaseModal,
  BaseButton,
  TempBaseButton,
  BaseCheckbox,
  BaseChip,
  BaseInputStepper,
  RadioOption,
} from '@template/ui';
import {
  DetailsPendingOrder,
  EnumLabelMapper,
  OrderModifyRequestOrderTypeCdType,
  OrderModifyRequestSideCdType,
} from '@template/api';
import { selectedSymbolInstance as selectedSymbol } from '@/composables/useSelectedSymbol';
import InputStepperLabel from '@/components/order/rightPanel/InputStepperLabel.vue';
import { computed, reactive, watchEffect, ref, onMounted } from 'vue';

/**
 * 숫자의 소수점 자리수를 기반으로 step 값을 계산하는 함수
 * @param value - 숫자 값 (예: 1.00230)
 * @returns step 값 (예: 0.00001)
 */
const getStepFromValue = (value: number): number => {
  const valueStr = value.toString();
  const decimalIndex = valueStr.indexOf('.');

  if (decimalIndex === -1) {
    return 1; // 정수인 경우
  }

  const decimalPlaces = valueStr.length - decimalIndex - 1;
  return Math.pow(10, -decimalPlaces);
};

interface Props {
  selectedRowData: DetailsPendingOrder;
}

export interface ModifyOrderDialogData {
  orderTypeCd: OrderModifyRequestOrderTypeCdType;
  orderQuantity: number;
  orderPrice: number;
  barrierPrice: number;
  profitRealizationYn?: string;
  lossCutYn?: string;
  lossTrackingYn?: string;
  profitRealizationBarrierPrice?: number;
  lossCutBarrierPrice?: number;
}

const props = defineProps<Props>();

const isOpen = defineModel<boolean>('isOpen', {
  default: false,
});

// 선택된 심볼의 실시간 가격 사용
const buyPrice = computed(() => {
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

// 선택된 심볼 정보
const currentSymbol = computed(() => {
  return selectedSymbol.selectedSymbol.value;
});

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

const orderSideCd = computed(() => {
  return props.selectedRowData.positionCd === 'LONG' ? 'BUY' : 'SELL';
});

const state = reactive({
  quantity: props.selectedRowData.orderQuantity,
  closeOutPrice: props.selectedRowData.orderPrice,
  barrier: props.selectedRowData.barrierPrice || 0,
  closeOutPricePip: 0,

  stopLoss: false,
  takeProfit: false,
  trailingStop: false,
  stopLossPip: -100.1,
  stopLossPrice: 0,
  takeProfitPip: 100.1,
  takeProfitPrice: 0,
});

// props 변경 시 state 업데이트
watchEffect(() => {
  state.quantity = props.selectedRowData.orderQuantity;
  state.closeOutPrice = props.selectedRowData.orderPrice;
  state.barrier = props.selectedRowData.barrierPrice || 0;
});

// 동적 step 계산
const priceStep = computed(() => getStepFromValue(props.selectedRowData.orderPrice));

interface Emits {
  (e: 'close'): void;
  (e: 'confirm', data: ModifyOrderDialogData): void;
  (e: 'update:isOpen', value: boolean): void;
}

const emit = defineEmits<Emits>();

const selectedCloseOutType = defineModel<OrderModifyRequestOrderTypeCdType>('orderTypeCd', {
  default: 'LIMIT',
});

const closeOutTypeOptions: RadioOption<OrderModifyRequestOrderTypeCdType>[] = [
  { value: 'LIMIT', label: '지정가' },
  { value: 'STOP', label: '조건시장가' },
  { value: 'LIMIT_STOP', label: '조건지정가' },
  { value: 'TPSL', label: 'Profit&Loss' },
];

const handleConfirm = () => {
  // 청산 주문인지 확인
  const isCloseOutOrder = props.selectedRowData.orderCd === 'CLOSE_OUT';

  const data: ModifyOrderDialogData = {
    orderTypeCd: selectedCloseOutType.value,
    orderQuantity: state.quantity || 0,
    orderPrice: state.closeOutPrice || 0,
    barrierPrice: state.barrier || 0,
    // 청산 주문이 아닌 경우에만 optional 필드 포함
    ...(isCloseOutOrder
      ? {}
      : {
          profitRealizationYn: state.takeProfit ? 'Y' : 'N',
          lossCutYn: state.stopLoss ? 'Y' : 'N',
          lossTrackingYn: state.trailingStop ? 'Y' : 'N',
          profitRealizationBarrierPrice: state.takeProfitPrice || 0,
          lossCutBarrierPrice: state.stopLossPrice || 0,
        }),
  };
  emit('confirm', data);
};
</script>
