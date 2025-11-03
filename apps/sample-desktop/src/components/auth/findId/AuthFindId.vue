<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="이름">
      <BaseInput size="md" v-model="userInfo.name" full />
    </FormField>
    <FormField label="휴대폰 번호">
      <div class="gap-size-8 flex items-center justify-between">
        <BaseInput
          size="md"
          placeholder="'-' 없이 입력"
          v-model="userInfo.phoneNo"
          :maxLength="11"
          full
          variant="tel"
        />
        <BaseButton
          size="lg"
          label="인증번호 발송"
          variant="contained"
          color="primary"
          :disabled="userInfo.name === '' || userInfo.phoneNo.length !== 11"
          @click="handleSendCertificationNumber"
        />
      </div>
    </FormField>
    <FormField label="인증번호">
      <BaseInput
        size="md"
        :disabled="disabledCertificationInput"
        :errorMessage="
          isCountdownExpired ? '입력시간이 만료됐어요. 인증번호를 다시 발송해주세요.' : ''
        "
        :maxLength="6"
        v-model="certificationNumber"
        full
      />
      <div v-if="!disabledCertificationInput" class="mt-size-4 flex items-center justify-end gap-1">
        <BaseIcon name="info" size="sm" color="var(--chips-status-pending-text)" />
        <Countdown
          ref="countdownRef"
          :duration="600"
          format="mm:ss"
          :autoStart="false"
          @finished="handleCountdownFinished"
        />
      </div>
    </FormField>
  </div>
  <div class="mt-[33px]">
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      color="primary"
      full-width
      :disabled="certificationNumber.length !== 6"
      @click="handleVerifyCertificationNumber"
    />
  </div>
</template>

<script setup lang="ts">
import FormField from '@/components/auth/common/FormField.vue';
import { BaseInput, BaseButton, BaseIcon } from '@template/ui';
import { memberService, authService } from '@/services/api';
import Countdown from '@/components/common/Countdown.vue';
import { useToastStore } from '@/stores/useToastStore';
import { formatPhoneNumber } from '@template/utils';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const toastStore = useToastStore();
const certificationNumber = ref('');
const disabledCertificationInput = ref(true);
const isCountdownExpired = ref(false);
const countdownRef = ref<InstanceType<typeof Countdown> | null>(null);

const userInfo = defineModel<{ name: string; phoneNo: string; findIdResult: string }>('userInfo', {
  default: () => ({ name: '', phoneNo: '', findIdResult: '' }),
});

const router = useRouter();

// 카운트다운 완료 처리
const handleCountdownFinished = () => {
  isCountdownExpired.value = true;
  disabledCertificationInput.value = true;
  certificationNumber.value = '';
};

// 인증번호 발송
const handleSendCertificationNumber = async () => {
  const formattedPhoneNo = formatPhoneNumber(userInfo.value.phoneNo);
  try {
    const response = await authService.sendSmsVerificationCode({
      name: userInfo.value.name,
      phoneNo: formattedPhoneNo,
      useType: 'FIND_ID',
    });
    if (response.status === 'success') {
      disabledCertificationInput.value = false;
      isCountdownExpired.value = false;
      // 카운트다운 시작
      setTimeout(() => {
        countdownRef.value?.reset();
        countdownRef.value?.start();
      }, 0);
    }
  } catch (error) {
    toastStore.addToast((error as any).response.data.detail);
  }
};

// 인증번호 검증
const handleVerifyCertificationNumber = async () => {
  const formattedPhoneNo = formatPhoneNumber(userInfo.value.phoneNo);
  try {
    const response = await authService.verifySmsVerificationCode({
      name: userInfo.value.name,
      phoneNo: formattedPhoneNo,
      verificationCode: certificationNumber.value,
      useType: 'FIND_ID',
    });
    if (response.status === 'success') {
      handleFindId();
    }
  } catch (error) {
    toastStore.addToast((error as any).response.data.detail);
  }
};

// 인증번호 검증 후, 아이디 찾기 api 호출
const handleFindId = async () => {
  const formattedPhoneNo = formatPhoneNumber(userInfo.value.phoneNo);
  try {
    const response = await memberService.findId({
      name: userInfo.value.name,
      phoneNo: formattedPhoneNo,
    });
    if (response.status === 'success') {
      userInfo.value.findIdResult = response.data?.email || '';
      router.push({ query: { step: 1 } });
    }
  } catch (error) {
    toastStore.addToast((error as any).response.data.detail);
  }
};
</script>
