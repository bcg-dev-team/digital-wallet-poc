<template>
  <div class="gap-size-8 flex flex-col items-center justify-center">
    <span class="text-font-24 font-semibold">{{ title.main }}이 완료되었습니다.</span>
    <span class="text-font-14 text-default-muted-dark">영업일 기준 1~3일 소요될 수 있습니다.</span>
  </div>
  <div class="gap-size-24 flex flex-col">
    <AccountServiceResult :title="title.result" :result-list="resultList" />
    <div class="flex justify-center">
      <BaseButton
        class="w-[240px] bg-[var(--trade-correct-background-solid)] text-[var(--button-red-solid-text)]"
        label="거래내역 보러가기"
        variant="contained"
        size="lg"
        color="green"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import AccountServiceResult from '@/components/accountManagement/service/fragments/AccountServiceResult.vue';
import type { TransferMenuState } from '@/components/accountManagement/accountManagement';
import { computed, onMounted, ref } from 'vue';
import { BaseButton } from '@template/ui';

const result = ref<{
  accountNum: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  accountType: string;
  accountStatus: string;
  accountBalance: string;
} | null>(null);

onMounted(async () => {
  await new Promise((resolve) =>
    setTimeout(() => {
      result.value = {
        accountNum: '123123123123',
        accountName: '홍길동',
        bankName: '국민은행',
        bankCode: '010',
        accountType: '일반',
        accountStatus: '활성',
        accountBalance: '1000000',
      };
      resolve(true);
    }, 1000)
  );
});

const props = defineProps<{
  menuState?: TransferMenuState | null;
}>();

const title = computed<{ main: string; result: string }>(() => {
  let title = { main: '', result: '' };

  if (props.menuState === 'withdraw') {
    title = { main: '출금신청', result: '출금신청 상세' };
  } else if (props.menuState === 'transfer') {
    title = { main: '이체신청', result: '이체요청 상세' };
  } else if (props.menuState === 'deposit') {
    title = { main: '입금정보 입력', result: '입금정보 입력 상세' };
  }

  return title;
});

const resultList = computed<{
  first: Array<{ label: string; value: string }>;
  second: Array<{ label: string; value: string; highlight?: boolean }>;
}>(() => {
  if (props.menuState === 'withdraw') {
    return {
      first: [
        { label: '거래번호', value: '' },
        { label: '출금계좌', value: '' },
        { label: '신청시간', value: '' },
        { label: '예상상 처리시간', value: '' },
      ],
      second: [
        { label: '출금 금액', value: '' },
        { label: '수수료', value: '' },
        { label: '총 출금액', value: '', highlight: true },
        { label: '출금 후 잔 액', value: '' },
      ],
    };
  } else if (props.menuState === 'transfer') {
    return {
      first: [
        { label: '거래번호', value: '' },
        { label: '출금계좌', value: '' },
        { label: '이제받을 계좌', value: '' },
        { label: '신청시간', value: '' },
        { label: '예상상 처리시간', value: '' },
      ],
      second: [
        { label: '이체 금액', value: '' },
        { label: '수수료', value: '' },
        { label: '총 이체금액', value: '', highlight: true },
        { label: '이체 후 잔 액', value: '' },
      ],
    };
  } else if (props.menuState === 'deposit') {
    return {
      first: [
        { label: '거래번호', value: '' },
        { label: '입금 계좌번호', value: '' },
        { label: '대표 트레이딩 계좌번호', value: '' },
        { label: '예상 처리시간', value: '' },
      ],
      second: [
        { label: '입금액', value: '' },
        { label: '수수료', value: '' },
        { label: '총 입금액', value: '', highlight: true },
        { label: '입금 후 잔액', value: '' },
      ],
    };
  }
  return {
    first: [],
    second: [],
  };
});
</script>
