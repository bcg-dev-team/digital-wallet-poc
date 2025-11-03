<template>
  <div class="gap-size-24 flex">
    <MainCardContent
      class="p-padding-24 w-[424px] border border-[var(--button-red-border)] !bg-[var(--button-red-background)]"
    >
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">입금정보</span>
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
            <LabelContent label="대표 트레이딩 계좌번호" size="sm">
              <template #content>
                <div class="mt-size-4">
                  <BaseInputSelect v-model="selectedAccount" :options="accountOptions" />
                </div>
              </template>
            </LabelContent>
            <LabelContent label="트레이딩계좌 비밀번호" size="sm">
              <template #content>
                <div class="mt-size-4">
                  <BaseInput class="w-[140px]" placeholder="6자리" size="sm" variant="password" />
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
    <MainCardContent class="p-padding-24 !bg-bg-bg-innerframe w-[424px] border-none">
      <template #content>
        <div>
          <div>
            <span class="text-font-16 font-semibold">송금내역서 첨부</span>
          </div>
          <div
            class="mt-size-12 bg-bg-bg-default p-padding-16 border-bg-bg-outline gap-size-10 flex flex-col items-center justify-center rounded-[10px] border-2 border-dashed"
          >
            <div class="p-padding-16 bg-bg-bg-surface rounded-full">
              <BaseIcon name="upload" size="md" />
            </div>
            <div class="gap-size-4 flex flex-col text-center">
              <span class="text-font-14 font-semibold">파일을 선택하거나 드래그하세요</span>
              <span class="text-font-12 text-default-muted-dark"
                >JPG, PNG, PDF 파일만 업로드 가능 (최대 10MB)</span
              >
            </div>
          </div>
          <div
            class="gap-size-4 border-primary-primary800 bg-primary-primary100 p-padding-8 mt-size-16 flex rounded-md border"
          >
            <div>
              <BaseIcon name="warning2" size="sm" color="var(--chips-status-pending-text)" />
            </div>
            <div class="text-[var(--chips-status-pending-text)]">
              <span class="text-font-14 font-semibold">송금내역서업로드 안내</span>
              <ul class="text-font-12 list-inside list-disc">
                <li>인터넷뱅킹 또는 은행 앱에서 송금 완료 화면을 캡쳐해주세요</li>
                <li>입금 금액, 계좌번호, 날짜가 명확히 보이는 파일을 업로드해주세요</li>
                <li>파일 크기는 10MB 이하로 업로드해주세요</li>
              </ul>
            </div>
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

const selectedAccount = ref('');

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

const accountOptions = [
  { value: 'account1', label: '라이브계좌#1 110-81-345150' },
  { value: 'account2', label: '라이브계좌#2 110-81-345151' },
  { value: 'account3', label: '데모계좌#1 110-81-345152' },
];

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
