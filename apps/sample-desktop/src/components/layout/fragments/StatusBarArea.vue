<template>
  <div class="gap-size-24 flex items-center">
    <div>
      <!-- 로딩 중일 때 스켈레톤 UI -->
      <div class="w-[260px]" v-if="isLoadingAccounts"></div>
      <!-- 로딩 완료 후 계좌 목록이 없을 때 -->
      <div class="w-[145px]" v-else-if="accountList.length === 0">
        <BaseButton
          variant="outlined"
          label="계좌 개설하기"
          size="md"
          color="primary"
          fullWidth
          :leftIcon="{ name: 'plus', color: 'primary' }"
          @click="getAccountList"
        />
      </div>
      <!-- 계좌 목록이 있을 때 -->
      <div class="w-[260px]" v-else>
        <BaseInputSelect
          :modelValue="accountStore.selectedAccountNo"
          color="black"
          :options="accountList"
          @open="getAccountList"
          @update:modelValue="accountStore.selectAccount"
        />
      </div>
    </div>
    <div class="gap-size-48 flex items-center">
      <dl
        v-for="metric in financialMetrics"
        :key="metric.id"
        class="flex flex-col items-start gap-1"
      >
        <dt class="text-default-muted-light tracking-0 text-[12px]">{{ metric.label }}</dt>
        <dd class="tracking-3 font-semibold text-white">{{ metric.value }}</dd>
      </dl>
    </div>
    <div class="h-size-20 border-bg-divider-muted border" />
    <div class="flex items-center gap-4">
      <BaseMenu :items="menuItems" @select="handleMenuSelect">
        <template #trigger>
          <div
            class="bg-bg-bg-surface-muted flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full"
          >
            <BaseIcon name="person" color="var(--input-icon-default)" />
          </div>
        </template>
      </BaseMenu>
      <BaseIcon
        v-if="!isDark"
        name="mode-dark"
        color="white"
        class="cursor-pointer"
        @click="handleThemeToggle"
      />
      <BaseIcon
        v-else
        name="mode-light"
        color="white"
        class="cursor-pointer"
        @click="handleThemeToggle"
      />
      <BaseIcon name="notification" color="white" class="cursor-pointer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseIcon, useTheme, BaseMenu, BaseInputSelect, BaseButton } from '@template/ui';
import { getGlobalChartSettingsInstance } from '@/composables/useGlobalChartSettings';
import LocalStorageService from '@/services/localStorage/local-storage.service';
import LocalStorageKey from '@/services/localStorage/local-storage-key';
import { usePositionData } from '@/composables/usePositionData';
import { useMarginData } from '@/composables/useMarginData';
import { useAccountStore } from '@/stores/useAccountStore';
import { computed, onMounted, ref, watch } from 'vue';
import { accountService } from '@/services/api';
import { formatNumber } from '@template/utils';
import { useRouter } from 'vue-router';
interface FinancialMetric {
  id: string;
  label: string;
  value: string;
}
const { isDark, toggleTheme } = useTheme();
const globalChartSettings = getGlobalChartSettingsInstance();

// 테마 토글 시 차트 배경도 함께 업데이트
const handleThemeToggle = () => {
  toggleTheme();

  // 테마 변경 후 약간의 지연을 두고 차트 배경 업데이트
  // CSS 변수가 완전히 적용된 후 실행
  setTimeout(() => {
    globalChartSettings.updateAllChartsThemeBackground();
  }, 50);
};
const accountStore = useAccountStore();
const positionData = usePositionData();
const marginData = useMarginData();
const isLoadingAccounts = ref(false);

const accountList = computed(() =>
  [...accountStore.accountListComputed]
    .sort((a, b) => Number(a.visibleSequence) - Number(b.visibleSequence))
    .map((account) => ({
      value: account.accountNo,
      label: `${account.accountAlias}#${account.accountSequence} ${account.accountNo}`,
    }))
);

const financialMetrics = computed(() => [
  {
    id: 'total-assets',
    label: '자산총액',
    value:
      accountStore.depositBalanceComputed === 0 && positionData.totalProfitLoss.value === 0
        ? '-'
        : `$${formatNumber(accountStore.depositBalanceComputed + positionData.totalProfitLoss.value, 'ko-KR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, // 예탁자산 + P/L
  },
  {
    id: 'deposit-balance',
    label: '예탁자산',
    value:
      accountStore.depositBalanceComputed === 0
        ? '-'
        : `$${formatNumber(accountStore.depositBalanceComputed, 'ko-KR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, // 예수금
  },
  {
    id: 'profit-loss',
    label: 'P/L',
    value:
      positionData.totalProfitLoss.value === 0
        ? '-'
        : `$${formatNumber(positionData.totalProfitLoss.value, 'ko-KR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, // 잔고 탭의 종목별 P/L의 합계
  },
  {
    id: 'margin',
    label: '증거금',
    value:
      marginData.totalMargin.value === 0
        ? '-'
        : `$${formatNumber(marginData.totalMargin.value, 'ko-KR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, // 포지션 증거금 + 주문증거금
  },
  {
    id: 'margin-rate',
    label: '증거금율',
    value:
      marginData.totalMargin.value === 0
        ? '-'
        : `${(((accountStore.depositBalanceComputed + positionData.totalProfitLoss.value) / marginData.totalMargin.value) * 100).toFixed(2)}%`, // 자산총액 / 증거금 × 100
  },
]);

const router = useRouter();

const handleLogout = () => {
  LocalStorageService.removeItem(LocalStorageKey.ACCESS_TOKEN);
  router.push({ name: 'login' });
};

const menuItems = [
  {
    label: '마이페이지',
    value: 'mypage',
  },
  {
    label: '계좌 관리',
    value: 'account-management',
  },
  {
    label: '로그아웃',
    value: 'logout',
  },
];

const handleMenuSelect = (item: any) => {
  if (item.value === 'logout') {
    handleLogout();
  } else {
    router.push({ name: item.value });
  }
};

/**
 * 계좌 목록을 조회합니다.
 */
const getAccountList = async () => {
  // 기존 데이터가 있으면 로딩 상태를 표시하지 않음
  if (accountStore.accountListComputed.length === 0) {
    isLoadingAccounts.value = true;
  }

  try {
    const result = await accountService.getAccountInfo();
    const accountList = result.data?.accountList || [];

    // StatusBarArea에서는 계좌 목록만 업데이트
    accountStore.setAccountList(accountList);

    // 선택된 계좌가 있으면 해당 계좌의 출금가능금액으로 예수금 초기화
    if (accountStore.selectedAccountNo && accountList.length > 0) {
      const selectedAccount = accountList.find(
        (account) => account.accountNo === accountStore.selectedAccountNo
      );
      if (selectedAccount?.availableWithdrawAmount) {
        const depositAmount = parseFloat(selectedAccount.availableWithdrawAmount);
        accountStore.updateBalance(depositAmount, 0); // 예수금만 설정, 증거금은 0으로 초기화
      }
    }
  } catch (error) {
    console.error('계좌 목록 조회 실패:', error);
  } finally {
    isLoadingAccounts.value = false;
  }
};

// 계좌 변경 시 해당 계좌의 출금가능금액으로 예수금 업데이트
watch(
  () => accountStore.selectedAccountNo,
  (newAccountNo) => {
    if (newAccountNo && accountStore.accountListComputed.length > 0) {
      const selectedAccount = accountStore.accountListComputed.find(
        (account) => account.accountNo === newAccountNo
      );
      if (selectedAccount?.availableWithdrawAmount) {
        const depositAmount = parseFloat(selectedAccount.availableWithdrawAmount);
        accountStore.updateBalance(depositAmount, 0);
      }
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (accountStore.accountListComputed.length === 0) {
    getAccountList();
  }
});
</script>
