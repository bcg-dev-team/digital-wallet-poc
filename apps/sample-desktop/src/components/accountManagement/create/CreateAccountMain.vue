<template>
  <MainCardContent class="p-padding-24 border-bg-bg-outline border">
    <template #content>
      <div class="gap-size-12 flex flex-col">
        <div class="flex items-center">
          <div class="w-full">
            <span class="text-font-18 font-medium">개설된 계좌</span>
          </div>
          <div>
            <BaseButton
              variant="contained"
              size="md"
              color="primary"
              :leftIcon="{ name: 'plus', size: 'md' }"
              label="새 계좌 개설"
              @click="((showEnrollAccountCard = !showEnrollAccountCard), (selectedAccount = null))"
            ></BaseButton>
          </div>
        </div>
        <div class="gap-size-36 flex items-start">
          <div class="w-1/2">
            <template v-if="accountList.length > 0">
              <div class="mb-2 flex justify-end">
                <BaseButton
                  size="sm"
                  color="white"
                  variant="outlined"
                  :label="showAccountOrderChange ? '변경 완료' : '계좌 순서 변경'"
                  :leftIcon="{
                    name: showAccountOrderChange ? 'check-sm' : 'arrow-updown',
                    size: 'md',
                  }"
                  @click="handleAccountOrderChange"
                >
                </BaseButton>
              </div>
              <BaseList gap="12px">
                <!-- 활성화된 계좌들 (드래그 가능) -->
                <draggable
                  v-model="activeAccounts"
                  v-bind="dragOptions"
                  item-key="accountNo"
                  tag="ul"
                  @start="drag = true"
                  MODA
                  @end="onDragEnd"
                  class="account-list draggable-list flex flex-col gap-2"
                >
                  <template #item="{ element: account }">
                    <BaseListItem
                      clickable
                      :key="account.accountNo"
                      :selected="selectedAccount?.accountNo === account.accountNo"
                      :class="{
                        'draggable-item': true,
                        'flip-list-item': !drag,
                        'drag-mode-active': showAccountOrderChange,
                      }"
                      @click="((selectedAccount = account), (showEnrollAccountCard = false))"
                    >
                      <template #content>
                        <BaseListItemAvatar
                          :icon="{ name: 'card', size: 'md', color: 'var(--input-icon-white)' }"
                          size="lg"
                          variant="rounded"
                        />
                        <BaseListItemText
                          :primary="account.accountAlias"
                          :secondary="account.accountNo"
                        />

                        <div class="gap-size-12 flex items-center">
                          <div>
                            <span class="text-font-18 font-semibold"
                              >$ {{ formatNumber(account.availableWithdrawAmount) }}</span
                            >
                          </div>
                        </div>
                        <div
                          v-if="showAccountOrderChange"
                          class="drag-handle flex cursor-move items-center opacity-50 transition-opacity hover:opacity-100"
                        >
                          <BaseIcon name="grab" size="md" color="var(--font-color-muted)" />
                        </div>
                      </template>
                    </BaseListItem>
                  </template>
                </draggable>

                <div
                  v-for="account in disabledAccounts"
                  :key="account.accountNo"
                  class="account-list gap-2"
                >
                  <BaseListItem
                    clickable
                    :selected="selectedAccount?.accountNo === account.accountNo"
                    @click="selectedAccount = account"
                    :disabled="true"
                  >
                    <template #content>
                      <BaseListItemAvatar
                        :icon="{ name: 'card', size: 'md', color: 'var(--input-icon-white)' }"
                        :opacity="0.5"
                        size="lg"
                        variant="rounded"
                      />
                      <BaseListItemText
                        :primary="account.accountAlias"
                        :secondary="account.accountNo"
                      />

                      <div class="gap-size-12 flex items-center">
                        <div>
                          <span
                            class="text-font-18 font-semibold text-[var(--font-color-default-muted)]"
                            >$ {{ formatNumber(Number(account.availableWithdrawAmount)) }}</span
                          >
                        </div>
                      </div>
                    </template>
                  </BaseListItem>
                </div>
              </BaseList>
            </template>
            <template v-else>
              <div class="flex h-[590px] w-full items-center justify-center">
                <div class="text-default-muted text-font-14 text-center">
                  <p>등록된 계좌가 아직 없어요</p>
                  <p>새 계좌를 등록해보세요</p>
                </div>
              </div>
            </template>
          </div>
          <div class="gap-size-16 flex w-1/2 flex-col">
            <div class="w-full" v-if="showEnrollAccountCard">
              <EnrollAccountCard
                @createAccount="handleAccountCreated"
                @cancel="
                  ((showEnrollAccountCard = false),
                  toastStore.addToast(toastMessage.account.account_creation_cancelled))
                "
              />
            </div>
            <div class="w-full" v-if="selectedAccount">
              <AccountInfoDetail
                :key="selectedAccount.accountNo"
                :account="selectedAccount"
                @updateAccountName="updateAccountName"
                @updateAccountActive="updateAccountActive"
                @updateAccountPassword="updateAccountPassword"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </MainCardContent>
</template>
<script setup lang="ts">
import {
  BaseButton,
  BaseList,
  BaseListItem,
  BaseListItemAvatar,
  BaseListItemText,
  BaseIcon,
} from '@template/ui';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { ref, onMounted, onActivated, computed, watch } from 'vue';
import { useAccountStore } from '@/stores/useAccountStore';
import EnrollAccountCard from './EnrollAccountCard.vue';
import AccountInfoDetail from './AccountInfoDetail.vue';
import { toastMessage } from '@/constant/toastMessage';
import { useToastStore } from '@/stores/useToastStore';
import { useUserStore } from '@/stores/useUserStore';
import { accountService } from '@/services/api';
import { formatNumber } from '@template/utils';
import { AccountInfo } from '@template/api';
import draggable from 'vuedraggable';

const toastStore = useToastStore();
const userStore = useUserStore();
const accountStore = useAccountStore();

// 스토어의 계좌 리스트를 사용
const accountList = computed(() => accountStore.accountListComputed);

const selectedAccount = ref<AccountInfo | null>(null);

const showEnrollAccountCard = ref(false);
const showAccountOrderChange = ref(false);
const drag = ref(false);

const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: !showAccountOrderChange.value, // showAccountOrderChange가 false면 드래그 비활성화
    ghostClass: 'ghost',
  };
});

// 활성화된 계좌를 위한 별도의 ref
const activeAccounts = ref<AccountInfo[]>([]);

// 활성화된 계좌와 비활성화된 계좌를 분리하는 computed
const disabledAccounts = computed(() =>
  accountList.value
    .filter((account) => account.visible === 'N')
    .sort((a, b) => parseInt(a.visibleSequence) - parseInt(b.visibleSequence))
);

// activeAccounts를 업데이트하는 함수
const updateActiveAccounts = () => {
  activeAccounts.value = accountList.value
    .filter((account) => account.visible === 'Y')
    .sort((a, b) => parseInt(a.visibleSequence) - parseInt(b.visibleSequence));
};

// accountList 변경을 감지하여 activeAccounts 업데이트
watch(
  accountList,
  () => {
    updateActiveAccounts();
  },
  { immediate: true }
);

/**
 * 드래그 앤 드롭 완료 시 호출되는 함수
 * visibleSequence를 새로운 순서에 맞게 업데이트합니다.
 */
const onDragEnd = async () => {
  drag.value = false;

  const disabledList = accountList.value.filter((acc) => acc.visible === 'N');

  const updatedActiveAccounts = activeAccounts.value.map((account, index) => ({
    ...account,
    visibleSequence: (index + 1).toString(),
  }));

  const updatedDisabledAccounts = disabledList.map((account, index) => ({
    ...account,
    visibleSequence: (updatedActiveAccounts.length + index + 1).toString(),
  }));

  const updatedAccountList = [...updatedActiveAccounts, ...updatedDisabledAccounts];

  // 스토어 업데이트
  accountStore.setAccountList(updatedAccountList);
};

const getAccountInfo = async () => {
  try {
    const res = await accountService.getAccountInfo();
    if (res.data && res.data.accountList) {
      // 스토어에 계좌 리스트 업데이트
      accountStore.setAccountList(res.data.accountList);
    }
  } catch (error) {
    console.error('계좌 정보 조회 실패:', error);
  }
};

const updateAccountActive = async (isActive: boolean) => {
  if (selectedAccount.value) {
    selectedAccount.value.visible = isActive ? 'Y' : 'N';

    // 스토어의 계좌 리스트도 업데이트
    const updatedAccountList = accountList.value.map((account) =>
      account.accountNo === selectedAccount.value!.accountNo
        ? { ...account, visible: isActive ? 'Y' : 'N' }
        : account
    );
    accountStore.setAccountList(updatedAccountList);

    // 계좌 정보 변경 요청(활성화 상태)
    updateAccountInfo();
  }
};

const updateAccountName = (newAlias: string) => {
  if (selectedAccount.value) {
    selectedAccount.value.accountAlias = newAlias;

    // 스토어의 계좌 리스트도 업데이트
    const updatedAccountList = accountList.value.map((account) =>
      account.accountNo === selectedAccount.value!.accountNo
        ? { ...account, accountAlias: newAlias }
        : account
    );
    accountStore.setAccountList(updatedAccountList);

    // 계좌 정보 변경 요청(별칭)
    updateAccountInfo();
  }
};

const updateAccountPassword = async (oldPassword: string, newPassword: string) => {
  // TODO: 계좌 비밀번호 변경 요청
  try {
    if (selectedAccount.value) {
      await accountService.updatePassword({
        accountNo: selectedAccount.value.accountNo,
        beforeAccountPassword: oldPassword,
        afterAccountPassword: newPassword,
      });
    }
  } catch (error) {
    console.error('계좌 비밀번호 변경 실패:', error);
  }
};

// 계좌 정보 변경 요청(별칭, 활성화 상태, 계좌 순서)
const updateAccountInfo = async () => {
  try {
    const updateInfos = accountList.value.map((account) => ({
      accountNo: account.accountNo,
      accountAlias: account.accountAlias,
      visible: account.visible,
    }));

    await accountService.updateAccountInfo({
      accountInfos: updateInfos,
    });

    // 서버 업데이트 후 스토어도 동기화
    accountStore.setAccountList(accountList.value);
    toastStore.addToast(toastMessage.account.info_change_complete);
  } catch (error) {
    console.error('계좌 순서 저장 실패:', error);
  }
};

const handleAccountCreated = () => {
  showEnrollAccountCard.value = false;
  // 새 계좌 생성 후 최신 데이터로 업데이트
  getAccountInfo();
};

const handleAccountOrderChange = () => {
  showAccountOrderChange.value = !showAccountOrderChange.value;
  if (!showAccountOrderChange.value) {
    // 서버에 변경된 순서 저장
    updateAccountInfo();
  }
};

// 컴포넌트 마운트 시 API 호출
onMounted(() => {
  getAccountInfo();
});

// 탭 이동 시 최신 데이터로 업데이트 (다른 클라이언트 변경사항 반영)
onActivated(() => {
  getAccountInfo();
});
</script>

<style scoped lang="scss">
.account-list {
  .draggable-list {
    width: 100%;
    > * {
      transition:
        transform 0.3s ease,
        opacity 0.3s ease;
    }
  }

  .list-item {
    border-radius: 10px;
    border: solid 0.5px var(--background-bg-outline);
    transition: all 0.2s ease;

    // 선택된 상태
    &.list-item--selected {
      background: none;
      box-shadow: inset 0 0 0 2px var(--base-colors-primary-primary800);
    }

    // 비활성화
    &.list-item--disabled {
      opacity: 1 !important;
      color: var(--font-color-default) !important;

      &:hover {
        background-color: var(--background-bg-default) !important;
      }

      // BaseListItemText의 비활성화 상태 스타일 오버라이드
      :deep(.list-item-text__primary) {
        color: var(--font-color-default-muted) !important;
      }
    }

    &.list-item--clickable {
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: var(--background-bg-surface);
      }

      &:active {
        background-color: var(--background-bg-outline);
      }

      &:focus {
        outline: none;
        outline-offset: 2px;
      }
    }

    // 드래그 모드 활성화 시 hover 효과 비활성화
    &.drag-mode-active.list-item--clickable {
      &:hover {
        background-color: transparent !important;
      }

      &:active {
        background-color: transparent !important;
      }
    }

    .list-item-avatar {
      border: none !important;
      background: linear-gradient(135deg, #ffcc00, #ff8400) !important;
    }

    // 비활성화 상태일 때 아바타 배경색 변경
    &.list-item--disabled {
      :deep(.list-item-avatar) {
        background: var(--background-bg-surface-muted) !important;
      }
    }
  }
}

.draggable-item {
  transition: transform 0.5s ease;
}

.draggable-item:not(.flip-list-item) {
  transition: transform 0s;
}
</style>
