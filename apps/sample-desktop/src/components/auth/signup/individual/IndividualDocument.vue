<template>
  <div class="flex flex-col gap-[33px]">
    <FormField label="신분증 (주민등록증 또는 운전면허증)*">
      <BaseFileUploadButton
        status="hover"
        @fileSelected="handleFileSelected"
        @remove="handleFileRemove"
        @fileSizeError="toastStore.addToast(toastMessage.login.file_size_exceeded)"
        @fileTypeError="toastStore.addToast(toastMessage.login.file_type_error)"
      />
    </FormField>
    <div>
      <div class="mt-size-12 gap-size-4 flex items-center">
        <span class="text-font-16 font-semibold">신분증의 주소가 현 주소와 다른가요?</span>
        <BaseCheckbox v-model="isChecked" />
      </div>
      <div v-if="isChecked" class="gap-size-12 mt-size-4 flex flex-col">
        <span class="text-font-14">
          <span class="font-medium">주민등록 초본(영문)</span> 또는
          <span class="font-medium">관공서 납부영수증</span>을 제출해주세요.
        </span>
        <BaseFileUploadButton
          status="hover"
          @fileSelected="handleAdditionalFileSelected"
          @remove="handleAdditionalFileRemove"
          @fileSizeError="toastStore.addToast(toastMessage.login.file_size_exceeded)"
          @fileTypeError="toastStore.addToast(toastMessage.login.file_type_error)"
        />
      </div>
    </div>
    <div class="">
      <BaseButton
        size="lg"
        label="제출하기"
        variant="contained"
        color="primary"
        full-width
        @click="handleSubmit"
        :disabled="isSubmitDisabled"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { BaseButton, BaseFileUploadButton, BaseCheckbox } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import { useSignupStore } from '@/stores/useSignupStore';
import { toastMessage } from '@/constant/toastMessage';
import { useToastStore } from '@/stores/useToastStore';
import { memberService } from '@/services/api';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const toastStore = useToastStore();
const signupStore = useSignupStore();
const router = useRouter();

const isChecked = ref<boolean>(false);

const idCard = ref<File | null>(null);
const additionalIdDocument = ref<File | null>(null);

const isSubmitDisabled = computed(() => {
  const disabled = !idCard.value || (isChecked.value && !additionalIdDocument.value);

  return disabled;
});

const handleFileSelected = (files: File[]) => {
  idCard.value = files[0] || null;
};

const handleFileRemove = (file: File) => {
  idCard.value = null;
};

const handleAdditionalFileSelected = (files: File[]) => {
  additionalIdDocument.value = files[0] || null;
};

const handleAdditionalFileRemove = (file: File) => {
  additionalIdDocument.value = null;
};

const handleSubmit = async () => {
  signupStore.uploadIndividualDocument(idCard.value!, additionalIdDocument.value);
  console.log(signupStore.getIndividualSignupInfo);

  // TODO: 회원가입 api 주석 해제
  try {
    const response = await memberService.joinIndividual(signupStore.getIndividualSignupInfo);
    if (response.data && response.data.id) {
      router.push({ name: 'sign-up-complete' });
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
