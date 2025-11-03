<template>
  <div>
    <div class="gap-size-12 flex items-center">
      <BaseInput
        v-for="(value, index) in inputValues"
        :key="index"
        :ref="(el) => (inputRefs[index] = el)"
        :modelValue="inputValues[index]"
        size="md"
        variant="number"
        :maxLength="maxLength"
        @update:modelValue="handleInput(index, $event)"
        @keydown="handleKeydown(index, $event)"
        @paste="handlePaste(index, $event)"
      />
    </div>
    <div class="mt-size-8 flex items-center justify-end">
      <Countdown :duration="600" format="mm:ss" @finished="handleCountdownFinished" />
    </div>
  </div>
  <div
    class="mt-size-12 border-primary-primary800 bg-primary-primary100 p-size-8 gap-size-4 flex items-start rounded-md border"
  >
    <BaseIcon name="info" size="sm" color="var(--chips-status-pending-text)" />
    <div class="text-font-12 text-[var(--chips-status-pending-text)]">
      <p>인증번호는 6자리 숫자이며, 유효기간은 10분입니다.</p>
      <p>메일이 도착하지 않았다면 스팸함을 확인해주세요.</p>
    </div>
  </div>

  <div class="gap-size-12 mt-[33px] flex items-center">
    <BaseButton
      size="lg"
      label="인증메일 재전송"
      variant="outlined"
      color="black"
      full-width
      @click="handleClickResend"
    />
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      color="primary"
      full-width
      :disabled="inputValues.some((value) => value === '')"
      @click="handleClickNext"
    />
  </div>
  <div class="mt-size-16 flex items-center justify-center">
    <span
      class="text-font-14 text-default-muted cursor-pointer font-medium underline"
      @click="router.push({ query: { step: 2 } })"
    >
      다른 이메일주소로 변경하기
    </span>
  </div>
</template>

<script lang="ts" setup>
import { BaseInput, BaseButton, BaseIcon } from '@template/ui';
import Countdown from '@/components/common/Countdown.vue';
import { useSignupStore } from '@/stores/useSignupStore';
import { toastMessage } from '@/constant/toastMessage';
import { useToastStore } from '@/stores/useToastStore';
import { authService } from '@/services/api';
import { useRouter } from 'vue-router';
import { ref, nextTick } from 'vue';

const toastStore = useToastStore();
const signupStore = useSignupStore();

const maxLength = ref(1);
const router = useRouter();

const inputValues = ref(['', '', '', '', '', '']);
const inputRefs = ref<any[]>([]);

// 입력 처리
const handleInput = async (index: number, value: string) => {
  inputValues.value[index] = value;

  // maxLength 도달 시 다음 input으로 포커스 이동
  if (value.length === maxLength.value && index < 5) {
    await nextTick();
    inputRefs.value[index + 1]?.focus();
  }
};

// 키보드 이벤트 처리 (백스페이스)
const handleKeydown = async (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !inputValues.value[index] && index > 0) {
    await nextTick();
    inputRefs.value[index - 1]?.focus();
  }
};

// 붙여넣기 이벤트 처리
const handlePaste = async (startIndex: number, event: ClipboardEvent) => {
  event.preventDefault();

  // 클립보드에서 텍스트 가져오기
  const pasteData = event.clipboardData?.getData('text') || '';
  const numbers = pasteData.replace(/[^0-9]/g, '');

  if (numbers.length === 0) return;

  // 붙여넣은 숫자를 각 칸에 배치 (최대 6자리, startIndex부터 시작)
  const maxFillCount = Math.min(numbers.length, 6, 6 - startIndex);

  for (let i = 0; i < maxFillCount; i++) {
    const targetIndex = startIndex + i;
    if (targetIndex < 6) {
      inputValues.value[targetIndex] = numbers[i];
    }
  }

  // 마지막으로 채워진 칸의 다음 칸으로 포커스 이동
  const lastFilledIndex = startIndex + maxFillCount - 1;
  if (lastFilledIndex < 5) {
    await nextTick();
    inputRefs.value[lastFilledIndex + 1]?.focus();
  }
};

// 카운트다운 이벤트 처리
const handleCountdownFinished = () => {
  toastStore.addToast(toastMessage.login.verification_expired);
};

const handleClickResend = async () => {
  try {
    const res = await authService.sendEmailVerificationCode({
      email: signupStore.userInfo.email,
      useType: 'SIGN_UP',
    });
    if (res.data) {
      toastStore.addToast(toastMessage.login.verification_email_resent);
    }
  } catch (error) {
    console.error(error);
  }
};

const handleClickNext = async () => {
  try {
    const res = await authService.verifyEmailVerificationCode({
      email: signupStore.userInfo.email,
      verificationCode: inputValues.value.join(''),
      useType: 'SIGN_UP',
    });

    if (res.status === 'success') {
      toastStore.addToast(toastMessage.login.email_verification_complete);
      router.push({ query: { step: 4 } });
    }
  } catch (error) {
    toastStore.addToast(toastMessage.login.verification_code_mismatch);
  }
};
</script>
