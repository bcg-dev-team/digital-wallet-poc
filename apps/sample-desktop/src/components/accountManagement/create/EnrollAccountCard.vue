<template>
  <MainCardContent class="px-padding-24 py-padding-36 border-primary-primary800 border-2">
    <template #content>
      <div>
        <div>
          <span class="text-font-16 font-semibold">새 계좌 개설</span>
        </div>
        <div class="mt-size-16">
          <form class="gap-size-16 flex flex-col">
            <LabelContent
              class="pb-padding-16 border-bg-bg-outline border-b"
              label="계좌별명"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <BaseInput
                    size="sm"
                    type="text"
                    placeholder="10자 이내 입력"
                    v-model="state.accountAlias"
                    full
                  />
                </div>
              </template>
            </LabelContent>
            <LabelContent
              label="계좌 비밀번호"
              class="pb-padding-16 border-bg-bg-outline border-b"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <BaseInput
                    class="w-[140px]"
                    size="sm"
                    variant="password"
                    placeholder="6자리 입력"
                    v-model="state.accountPassword"
                  />
                </div>
              </template>
            </LabelContent>
            <LabelContent
              label="계좌 비밀번호 확인"
              size="custom"
              :style="'text-font-14 text-default-muted'"
            >
              <template #content>
                <div class="mt-size-4">
                  <BaseInput
                    class="w-[140px]"
                    size="sm"
                    variant="password"
                    placeholder="6자리 입력"
                    v-model="state.accountPasswordCheck"
                  />
                </div>
              </template>
            </LabelContent>

            <div>
              <div class="flex items-center justify-between gap-4">
                <BaseButton
                  variant="contained"
                  size="lg"
                  color="primary"
                  label="계좌 등록하기"
                  :disabled="
                    state.accountAlias === '' ||
                    state.accountPassword === '' ||
                    state.accountPasswordCheck === '' ||
                    state.accountPassword !== state.accountPasswordCheck
                  "
                  fullWidth
                  @click="isOpen = true"
                />
                <BaseButton
                  variant="outlined"
                  size="lg"
                  color="white"
                  label="취소"
                  fullWidth
                  @click="emit('cancel')"
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
    @confirm="handleCreateAccount"
  >
    <template #title>계좌 개설</template>
    <div class="text-font-16 flex justify-center font-medium">이대로 계좌를 개설하시겠어요?</div>
  </BaseModal>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import LabelContent from '@/components/common/LabelContent.vue';
import { BaseButton, BaseInput, BaseModal } from '@template/ui';
import { toastMessage } from '@/constant/toastMessage';
import { useToastStore } from '@/stores/useToastStore';
import { accountService } from '@/services/api';
import { reactive, ref } from 'vue';

const toastStore = useToastStore();
const state = reactive({
  accountAlias: '',
  accountPassword: '',
  accountPasswordCheck: '',
});
const emit = defineEmits<{
  (e: 'createAccount'): void;
  (e: 'cancel'): void;
}>();
const isOpen = ref(false);

const handleCreateAccount = async () => {
  const requestData = {
    accountPassword: state.accountPassword,
    accountAlias: state.accountAlias,
  };
  try {
    const res = await accountService.createAccount(requestData);

    if (res.status === 'success') {
      toastStore.addToast(toastMessage.account.account_created);
      emit('createAccount');
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
