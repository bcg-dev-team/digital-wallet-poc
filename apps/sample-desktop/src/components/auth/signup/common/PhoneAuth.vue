<template>
  <div class="gap-size-12">
    <BaseButton
      v-if="!status"
      size="lg"
      label="휴대폰 본인인증"
      variant="light"
      color="red"
      @click="status = true"
      full-width
    />
    <BaseButton
      v-else
      size="lg"
      label="인증완료"
      variant="light"
      color="green"
      full-width
      :rightIcon="{ name: 'check-circle', color: 'currentColor' }"
    />
  </div>
  <div class="mt-[33px] flex flex-col">
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      color="primary"
      full-width
      :disabled="!status"
      @click="handleClickNext"
    />
  </div>
</template>
<script lang="ts" setup>
import { useSignupStore } from '@/stores/useSignupStore';
import { BaseButton } from '@template/ui';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const status = ref<boolean>(false);
const signupStore = useSignupStore();

const generatePhoneNumber = (): string => {
  const timestamp = Date.now().toString();
  const lastEightDigits = timestamp.slice(-8);
  const middlePart = lastEightDigits.slice(0, 4);
  const lastPart = lastEightDigits.slice(4);

  return `010-${middlePart}-${lastPart}`;
};

const mockUserInfo = {
  ci: Date.now().toString(),
  name: '홍길동',
  phoneNo: generatePhoneNumber(),
  birth: '1990-01-01',
};

const handleClickNext = () => {
  signupStore.updateUserInfo(mockUserInfo);
  router.push({ query: { step: 2 } });
};
</script>
