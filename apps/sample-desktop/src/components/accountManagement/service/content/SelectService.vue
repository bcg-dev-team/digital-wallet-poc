<template>
  <div class="gap-size-8 flex flex-col items-center justify-center">
    <span class="text-font-24 font-semibold">유형 선택</span>
    <span class="text-font-14 text-default-muted-dark">
      입금과 출금, 이체 중 원하는 입출금 유형을 선택해주세요
    </span>
  </div>
  <div class="gap-size-24 flex">
    <TransferMenuButton
      v-for="menu in menuList"
      :key="menu.key"
      :title="menu.title"
      :description="menu.description"
      :icon="menu.icon"
      :info="menu.info"
      :color="menu.color"
      @click="handleMenuClick(menu.key)"
    />
  </div>
</template>

<script setup lang="ts">
import type {
  TransferMenuItem,
  TransferMenuState,
} from '@/components/accountManagement/accountManagement';
import TransferMenuButton from '@/components/accountManagement/service/fragments/TransferMenuButton.vue';

interface TransferMenuWithKey extends TransferMenuItem {
  key: TransferMenuState;
}

const menuList: TransferMenuWithKey[] = [
  {
    key: 'withdraw',
    title: '출금신청하기',
    description: '등록된 계좌에서 현금으로<br />출금하실 수 있어요',
    icon: 'trade',
    info: [
      { icon: 'time', text: '처리시간: 1~3 영업일' },
      { icon: 'withdraw', text: '수수료: $0.50' },
      { icon: 'check-sm', text: '최소금액: $10.00' },
    ],
    color: 'blue',
  },
  {
    key: 'transfer',
    title: '이체하기',
    description: '내 다른 계좌로 금액을<br />옮기실 수 있어요',
    icon: 'trade',
    info: [
      { icon: 'time', text: '처리시간: 즉시' },
      { icon: 'withdraw', text: '수수료: 무료' },
      { icon: 'check-sm', text: '최소금액: $1.00' },
    ],
    color: 'green',
  },
  {
    key: 'deposit',
    title: '입금하기',
    description: '내 다른 계좌로 금액을<br />옮기실 수 있어요',
    icon: 'trade',
    info: [
      { icon: 'time', text: '처리시간: 1~3 영업일' },
      { icon: 'withdraw', text: '수수료: 무료' },
      { icon: 'check-sm', text: '최소금액: $10.00' },
    ],
    color: 'red',
  },
];

const emit = defineEmits<{
  (e: 'menuClick', menu: string): void;
}>();

/**
 * 메뉴 클릭 시 이벤트 발생
 */
const handleMenuClick = (key: string) => {
  emit('menuClick', key);
};
</script>
