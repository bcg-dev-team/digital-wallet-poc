<template>
  <MainCardContent class="px-padding-36 py-padding-64 border-bg-bg-outline border">
    <template #content>
      <div class="gap-size-64 flex flex-col justify-center">
        <div class="flex items-center justify-center">
          <BaseStepper :labelConfig="steps" :current="step" variant="label" />
        </div>
        <div class="gap-size-36 flex flex-col items-center justify-center">
          <template v-if="step === 0">
            <SelectService @menuClick="handleMenuClick" />
          </template>
          <template v-if="step === 1">
            <ServiceInputForm :menuState="menuState" @stepChange="handleStepChange" />
          </template>
          <template v-if="step === 2">
            <ServiceComplete :menuState="menuState" />
          </template>
        </div>
      </div>
    </template>
  </MainCardContent>
</template>

<script setup lang="ts">
import ServiceInputForm from '@/components/accountManagement/service/content/ServiceInputForm.vue';
import ServiceComplete from '@/components/accountManagement/service/content/ServiceComplete.vue';
import SelectService from '@/components/accountManagement/service/content/SelectService.vue';
import type { TransferMenuState } from '@/components/accountManagement/accountManagement';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseStepper } from '@template/ui';
import { ref } from 'vue';

const step = ref(0);
const menuState = ref<TransferMenuState | null>(null);

const steps = {
  stepLabelList: ['유형 선택', '금액 입력', '승인 완료'],
};

/**
 * 메뉴 클릭 시 상태 변경 처리
 */
const handleMenuClick = (menu: string) => {
  menuState.value = menu as TransferMenuState;
  step.value = 1;
};

const handleStepChange = (newStep: number) => {
  step.value = newStep;
};
</script>
