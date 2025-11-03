<template>
  <div class="gap-size-24 flex">
    <MainCardContent
      class="p-padding-24 !bg-bg-bg-innerframe border-bg-bg-outline w-[424px] border"
    >
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">선택된 계좌</span>
          </div>
          <div class="mt-size-12 gap-size-16 flex flex-col">
            <BaseInputSelect
              :modelValue="accountStore.selectedAccountNo"
              :options="accountList"
              @update:modelValue="accountStore.selectAccount"
            />
            <LabelContent label="계좌 비밀번호(6자리)" size="sm">
              <template #content>
                <div class="mt-size-4">
                  <BaseInput class="w-[140px]" size="sm" placeholder="6자리" variant="password" />
                </div>
              </template>
            </LabelContent>
          </div>
        </div>
      </template>
    </MainCardContent>
    <MainCardContent class="p-padding-24 border-bg-bg-outline w-[424px] border">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">출금 금액</span>
          </div>
          <div class="mt-size-12 gap-size-16 flex flex-col">
            <BaseInput v-model="withdrawalAmount" placeholder="" full />
            <div class="gap-size-8 grid grid-cols-4">
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="100"
                variant="contained"
                size="md"
                @click="setWithdrawalAmount(100)"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="500"
                variant="contained"
                size="md"
                color="grey"
                @click="setWithdrawalAmount(500)"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="1,000"
                variant="contained"
                size="md"
                color="grey"
                @click="setWithdrawalAmount(1000)"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="1,500"
                variant="contained"
                size="md"
                color="grey"
                @click="setWithdrawalAmount(1500)"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="2,000"
                variant="contained"
                size="md"
                color="grey"
                @click="setWithdrawalAmount(2000)"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="5,000"
                variant="contained"
                size="md"
                color="grey"
                @click="setWithdrawalAmount(5000)"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="10,000"
                variant="contained"
                size="md"
                color="grey"
                @click="setWithdrawalAmount(10000)"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="15,000"
                variant="contained"
                size="md"
                color="grey"
                @click="setWithdrawalAmount(15000)"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="25%"
                variant="contained"
                size="md"
                color="grey"
                @click="setWithdrawalPercentage(25)"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="50%"
                variant="contained"
                size="md"
                color="grey"
                @click="setWithdrawalPercentage(50)"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="75%"
                variant="contained"
                size="md"
                color="grey"
                @click="setWithdrawalPercentage(75)"
              />
              <BaseButton
                class="text-default !bg-bg-bg-innerframe !text-default h-[44px]"
                label="전액"
                variant="contained"
                size="md"
                color="grey"
                @click="setWithdrawalPercentage(100)"
              />
            </div>
          </div>
        </div>
      </template>
    </MainCardContent>
    <MainCardContent class="p-padding-24 !bg-primary-primary100 w-[424px] border-none">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">선택된 계좌</span>
          </div>
          <div class="mt-size-12 gap-size-16 flex flex-col">
            <LabelContent label="입금은행" size="sm">
              <template #content>
                <div class="mt-size-4">
                  <BaseInputSelect
                    :modelValue="selectedBank"
                    :options="bankList"
                    @update:modelValue="setSelectedBank"
                  />
                </div>
              </template>
            </LabelContent>
            <LabelContent label="입금 계좌번호" size="sm">
              <template #content>
                <div class="mt-size-4">
                  <BaseInput
                    placeholder="계좌번호를 입력하세요 (예: 123-456-789012)"
                    size="sm"
                    full
                  />
                </div>
              </template>
            </LabelContent>
          </div>
        </div>
      </template>
    </MainCardContent>
  </div>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseButton, BaseInput, BaseInputSelect } from '@template/ui';
import LabelContent from '@/components/common/LabelContent.vue';
import { useAccountStore } from '@/stores/useAccountStore';
import { formatNumber } from '@template/utils';
import { computed, ref } from 'vue';

const accountStore = useAccountStore();
const selectedBank = ref('');
const accountList = computed(() =>
  [...accountStore.accountListComputed]
    .sort((a, b) => Number(a.visibleSequence) - Number(b.visibleSequence))
    .map((account) => ({
      value: account.accountNo,
      label: `${account.accountAlias}#${account.accountSequence} ${account.accountNo}`,
    }))
);

// 출금 금액 (숫자로 저장)
const withdrawalAmountValue = ref(0);

// 출금 금액 표시용 (세자리 콤마 포맷)
const withdrawalAmount = computed(() => {
  return withdrawalAmountValue.value > 0 ? formatNumber(withdrawalAmountValue.value) : '';
});

// 선택된 계좌 정보
const selectedAccountInfo = computed(() => {
  return accountStore.accountListComputed.find(
    (account) => account.accountNo === accountStore.selectedAccountNo
  );
});

// 출금 가능 금액 (선택된 계좌의 availableWithdrawAmount)
const availableAmount = computed(() => {
  return selectedAccountInfo.value?.availableWithdrawAmount || 0;
});

// 고정 금액 설정
const setWithdrawalAmount = (amount: number) => {
  withdrawalAmountValue.value = amount;
};

// 퍼센트 기반 금액 설정
const setWithdrawalPercentage = (percentage: number) => {
  const amount = ((availableAmount.value as number) * percentage) / 100;
  withdrawalAmountValue.value = Math.floor(amount);
};

const setSelectedBank = (bank: string) => {
  selectedBank.value = bank;
};

const bankList = [
  {
    label: '국민 은행',
    value: '국민 은행',
  },
  {
    label: '신한 은행',
    value: '신한 은행',
  },
  {
    label: '우리 은행',
    value: '우리 은행',
  },
];
</script>
