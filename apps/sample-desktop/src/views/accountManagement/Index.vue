<template>
  <div class="mx-auto w-[1440px] py-4">
    <MainCardContent class="p-6" title="계좌관리" size="lg">
      <template #content>
        <BaseTabs
          v-model="modelValue"
          size="lg"
          variant="underline"
          :tabs="tabs"
          @click="handleTabClick"
        />
      </template>
    </MainCardContent>
  </div>
</template>

<script setup lang="ts">
import AccountServiceMain from '@/components/accountManagement/service/AccountServiceMain.vue';
import CreateAccountMain from '@/components/accountManagement/create/CreateAccountMain.vue';
import HistoryMain from '@/components/accountManagement/history/HistoryMain.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseTabs } from '@template/ui';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

type Tab = 'create' | 'service' | 'history';

const router = useRouter();
const modelValue = ref<Tab>(
  (router.currentRoute.value.params.accountManagementTab as Tab) || 'create'
);

const tabs = [
  {
    key: 'create',
    label: '계좌개설',
    icon: 'card',
    component: CreateAccountMain,
  },
  {
    key: 'service',
    label: '출금/이체/입금',
    icon: 'send',
    component: AccountServiceMain,
  },
  {
    key: 'history',
    label: '입출금내역',
    icon: 'description',
    component: HistoryMain,
  },
];

const handleTabClick = () => {
  router.push({
    name: 'account-management',
    params: { accountManagementTab: modelValue.value },
  });
};
</script>
