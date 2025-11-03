<template>
  <MainCardContent class="px-padding-24 py-padding-36 border-bg-bg-outline border">
    <template #content>
      <div>
        <div>
          <span class="text-font-16 font-semibold">{{
            accoutInfoState ? '계좌정보 변경' : '계좌정보'
          }}</span>
        </div>
        <div class="mt-size-16">
          <form class="gap-size-16 flex flex-col">
            <LabelContent
              class="pb-padding-16 border-bg-bg-outline border-b"
              label="계좌 번호"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <span class="text-font-16 font-medium">{{ account.accountNo }}</span>
                </div>
              </template>
            </LabelContent>
            <LabelContent
              class="pb-padding-16 border-bg-bg-outline border-b"
              label="계좌별명"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <div
                    v-if="!inputState.updateAccountName"
                    class="flex items-center justify-between"
                  >
                    <span class="text-font-16 font-medium">{{ account.accountAlias }}</span>
                    <BaseButton
                      v-if="!inputState.updateAccountName && !inputState.updateAccountPassword"
                      variant="chip"
                      color="grey"
                      label="변경하기"
                      @click="inputState.updateAccountName = true"
                    />
                  </div>
                  <BaseInput
                    v-else
                    size="sm"
                    type="text"
                    placeholder="10자 이내 입력"
                    :readonly="!inputState.updateAccountName"
                    v-model="accountAlias"
                  />
                </div>
              </template>
            </LabelContent>

            <LabelContent
              :class="
                inputState.updateAccountPassword && 'pb-padding-16 border-bg-bg-outline border-b'
              "
              :label="inputState.updateAccountPassword ? '이전 비밀번호' : '계좌 비밀번호'"
              class="pb-padding-16 border-bg-bg-outline border-b"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <div
                    v-if="!inputState.updateAccountPassword"
                    class="flex items-center justify-between"
                  >
                    <span class="text-font-16 font-medium">●●●●●●</span>
                    <BaseButton
                      v-if="!inputState.updateAccountPassword && !inputState.updateAccountName"
                      variant="chip"
                      color="grey"
                      label="변경하기"
                      @click="inputState.updateAccountPassword = true"
                    />
                  </div>
                  <BaseInput
                    v-else
                    size="sm"
                    class="w-[140px]"
                    variant="number"
                    placeholder="6자 이내 입력"
                    v-model="accountPassword"
                  />
                </div>
              </template>
            </LabelContent>
            <LabelContent
              v-if="inputState.updateAccountPassword"
              label="계좌 비밀번호"
              class="pb-padding-16 border-bg-bg-outline border-b"
              size="custom"
              :style="'text-font-14 text-default-muted '"
            >
              <template #content>
                <div class="mt-size-4 flex items-center justify-between">
                  <BaseInput
                    class="w-[140px]"
                    size="sm"
                    variant="number"
                    placeholder="6자리 입력"
                    v-model="accountNewPassword"
                  />
                </div>
              </template>
            </LabelContent>
            <LabelContent
              v-if="inputState.updateAccountPassword"
              label="계좌 비밀번호 확인"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4 flex items-center justify-between">
                  <BaseInput
                    class="w-[140px]"
                    size="sm"
                    variant="number"
                    placeholder="6자리 입력"
                    v-model="accountPasswordCheck"
                  />
                </div>
              </template>
            </LabelContent>
            <LabelContent
              v-if="!accoutInfoState"
              :class="
                inputState.updateAccountPassword && 'pb-padding-16 border-bg-bg-outline border-b'
              "
              label="활성화 여부"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <div class="flex items-center justify-between">
                    <span class="text-font-16 font-medium">계좌 활성화</span>
                    <BaseSwitch v-model="isAccountActive" size="md" />
                  </div>
                </div>
              </template>
            </LabelContent>

            <div v-if="accoutInfoState">
              <div class="flex items-center justify-between gap-4">
                <BaseButton
                  variant="contained"
                  size="lg"
                  color="primary"
                  label="계좌정보 변경하기"
                  fullWidth
                  :disabled="checkDisabled"
                  @click="isOpen = true"
                />
                <BaseButton
                  variant="outlined"
                  size="lg"
                  color="white"
                  label="취소"
                  fullWidth
                  @click="
                    ((inputState.updateAccountName = false),
                    (inputState.updateAccountPassword = false))
                  "
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </template>
  </MainCardContent>
  <BaseModal
    closeOnEscape
    closeOnOverlayClick
    fullWidth
    v-model:isOpen="isOpen"
    :showBackButton="false"
    showCloseButton
    size="md"
    variant="default"
    @confirm="updateAccountInfo"
  >
    <template #title>정보 변경</template>
    <div class="text-font-16 flex justify-center font-medium">계좌정보를 변경하시겠어요?</div>
  </BaseModal>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { BaseButton, BaseInput, BaseSwitch, BaseModal } from '@template/ui';
import LabelContent from '@/components/common/LabelContent.vue';
import { accountService } from '@/services/api';
import { computed, reactive, ref } from 'vue';
import { AccountInfo } from '@template/api';

const isOpen = ref(false);
const props = defineProps<{
  account: AccountInfo;
}>();

const emit = defineEmits<{
  (e: 'updateAccountActive', value: boolean): void;
  (e: 'updateAccountName', value: string): void;
  (e: 'updateAccountPassword', value: string, value2: string): void;
}>();

const accountAlias = ref(props.account.accountAlias);
const accountPassword = ref('');
const accountNewPassword = ref('');
const accountPasswordCheck = ref('');

const isAccountActive = computed({
  get: () => props.account.visible === 'Y',
  set: (value: boolean) => {
    emit('updateAccountActive', value);
  },
});

const inputState = reactive({
  updateAccountName: false,
  updateAccountPassword: false,
});

const checkDisabled = computed(() => {
  // 계좌별명 변경
  if (inputState.updateAccountName) {
    return accountAlias.value.trim() === '';
  }

  // 비밀번호 변경
  if (inputState.updateAccountPassword) {
    const isPasswordEmpty = accountPassword.value === '' && accountPasswordCheck.value === '';
    const isPasswordMatch =
      accountNewPassword.value === accountPasswordCheck.value && accountNewPassword.value !== '';
    return !(isPasswordEmpty || isPasswordMatch);
  }
});

const updateAccountInfo = () => {
  if (inputState.updateAccountName) {
    emit('updateAccountName', accountAlias.value);
  }
  if (inputState.updateAccountPassword) {
    emit('updateAccountPassword', accountPassword.value, accountNewPassword.value);
  }
  inputState.updateAccountName = false;
  inputState.updateAccountPassword = false;
};

const accoutInfoState = computed(() => {
  return inputState.updateAccountName || inputState.updateAccountPassword;
});
</script>
