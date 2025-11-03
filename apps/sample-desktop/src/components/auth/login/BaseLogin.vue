<template>
  <form @submit.prevent="handleLogin" name="login" class="gap-size-16 mt-4 flex flex-col">
    <div class="bg-bg-bg-innerframe flex h-[46px] items-center justify-center">
      <!-- 실거래, 모의거래 RadioGroup -->
      <!-- [FIXME]: BaseRadioGroup 컴포넌트로 대체될 영역-->
      <RadioGroup v-model="model" class="space-y-2">
        <div :class="containerClasses">
          <RadioGroupOption
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            as="template"
            v-slot="{ checked, active, disabled: optionDisabled }"
          >
            <button
              :class="getRadioOptionClasses(checked, active, optionDisabled)"
              :disabled="optionDisabled"
              type="button"
            >
              <!-- 라디오 버튼 원형 인디케이터 -->
              <div
                :class="[
                  'h-4 w-4 rounded-full border-2 transition-colors duration-200',
                  checked ? 'border-yellow-400 bg-transparent' : 'border-gray-300 bg-transparent',
                ]"
              >
                <!-- 선택된 상태일 때 내부 원 -->
                <div v-if="checked" class="m-0.5 h-2 w-2 rounded-full bg-yellow-400"></div>
              </div>
              <!-- 옵션 라벨 -->
              <span class="text-sm">{{ option.label }}</span>
            </button>
          </RadioGroupOption>
        </div>
      </RadioGroup>
    </div>
    <FormField label="이메일주소(ID)">
      <BaseInput
        size="md"
        name="email"
        placeholder="example@email.com"
        v-model="email"
        autocomplete="email"
        :full="true"
      />
    </FormField>
    <FormField label="비밀번호">
      <BaseInput
        size="md"
        name="password"
        variant="password"
        placeholder="영문+숫자, 8~16자리 이상"
        v-model="password"
        autocomplete="current-password"
        :full="true"
      />
    </FormField>
    <div class="flex items-center justify-between">
      <div>
        <BaseCheckbox v-model="isChecked">
          <span class="text-font-13">아이디 저장</span>
        </BaseCheckbox>
      </div>
      <div class="gap-size-12 flex items-center">
        <Anchor size="sm" to="find-id">아이디 찾기</Anchor>
        <span class="text-font-12 text-default-muted">|</span>
        <Anchor size="sm" to="reset-password">비밀번호 재설정</Anchor>
      </div>
    </div>
    <div class="mt-[33px]">
      <BaseButton
        size="lg"
        label="로그인"
        variant="contained"
        color="primary"
        full-width
        type="submit"
      />
    </div>
  </form>
  <div class="mt-6 flex justify-center">
    <Anchor size="sm" to="sign-up">가입하기</Anchor>
  </div>

  <ApprovalPendingDialog
    v-model:is-open="isApprovalPendingDialogOpen"
    @confirm="isApprovalPendingDialogOpen = false"
  />
  <CreateAccountDialog
    v-model:is-open="isCreateAccountDialogOpen"
    @close="router.push({ name: 'home' })"
    @createAccount="router.push({ name: 'account-management' })"
  />
</template>

<script lang="ts" setup>
import LocalStorageService from '@/services/localStorage/local-storage.service';

import type { AuthLoginResponseMemberType as MemberType } from '@template/api';
import LocalStorageKey from '@/services/localStorage/local-storage-key';
import ApprovalPendingDialog from './dialog/ApprovalPendingDialog.vue';
import CreateAccountDialog from './dialog/CreateAccountDialog.vue';
import { BaseInput, BaseButton, BaseCheckbox } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
import { useAccountStore } from '@/stores/useAccountStore';
import { toastMessage } from '@/constant/toastMessage';
import { useToastStore } from '@/stores/useToastStore';
import { ref, computed, onMounted, watch } from 'vue';
import Anchor from '@/components/common/Anchor.vue';
import { authService } from '@/services/api';
import { useRouter } from 'vue-router';

const toastStore = useToastStore();
const accountStore = useAccountStore();
const router = useRouter();
const isApprovalPendingDialogOpen = ref(false);
const isCreateAccountDialogOpen = ref(false);

interface Props {
  selectedTabKey: MemberType;
}

const email = ref('');
const password = ref('');

const props = defineProps<Props>();

const options = [
  { value: 'live', label: '실거래' },
  { value: 'demo', label: '모의거래' },
];

const containerClasses = computed(() => {
  return `flex gap-x-6 items-center justify-center`;
});

const model = ref('live');

const getRadioOptionClasses = (
  checked: boolean,
  active: boolean = false,
  disabled: boolean = false
): string => {
  const baseClasses = `flex items-center gap-x-2 cursor-pointer transition-colors duration-200`;

  // 비활성화 상태
  if (disabled) {
    return [baseClasses, 'opacity-50 cursor-not-allowed'].join(' ');
  }

  // 기본 상태 (라디오 버튼 스타일)
  return baseClasses;
};

const isChecked = ref<boolean>(false);

/**
 * 컴포넌트 마운트 시 저장된 이메일과 체크박스 상태 복원
 */
onMounted(() => {
  const savedEmail = LocalStorageService.getItem(LocalStorageKey.SAVED_EMAIL);
  if (savedEmail) {
    email.value = savedEmail;
    isChecked.value = true;
  }
});

/**
 * 아이디 저장 체크박스 변경 감지
 * 체크 해제 시 저장된 이메일 삭제
 */
watch(isChecked, (newValue) => {
  if (!newValue) {
    LocalStorageService.removeItem(LocalStorageKey.SAVED_EMAIL);
  }
});

const handleLogin = async () => {
  try {
    const response = await authService.loginForWeb({
      email: email.value,
      password: password.value,
    });
    if (response.data && response.data.tokenInfo) {
      LocalStorageService.setItem(
        LocalStorageKey.ACCESS_TOKEN,
        response.data.tokenInfo.accessToken
      );

      // 아이디 저장이 체크되어 있으면 이메일 저장
      if (isChecked.value) {
        LocalStorageService.setItem(LocalStorageKey.SAVED_EMAIL, email.value);
      }

      console.log(response.data.tokenInfo.accessToken);

      if (response.data.accountList.length === 0) {
        isCreateAccountDialogOpen.value = true;
      } else {
        accountStore.setAccountList(response.data.accountList);

        router.push({ name: 'home' });
      }
    }
  } catch (error) {
    console.error(error);
    toastStore.addToast((error as any).response.data.detail);
  }
};
</script>
