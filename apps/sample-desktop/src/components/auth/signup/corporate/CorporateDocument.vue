<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="사업자등록증명원">
      <BaseFileUploadButton
        status="hover"
        @fileSelected="handleSelectedBusinessRegistration"
        @remove="handleRemoveBusinessRegistration"
        @fileSizeError="toastStore.addToast(toastMessage.login.file_size_exceeded)"
        @fileTypeError="toastStore.addToast(toastMessage.login.file_type_error)"
      />
    </FormField>
    <FormField label="법인대표초본(영문)">
      <BaseFileUploadButton
        status="hover"
        @fileSelected="handleSelectedCorporateRepresentative"
        @remove="handleRemoveCorporateRepresentative"
        @fileSizeError="toastStore.addToast(toastMessage.login.file_size_exceeded)"
        @fileTypeError="toastStore.addToast(toastMessage.login.file_type_error)"
      />
    </FormField>
    <FormField label="법인명 공과금 납부서">
      <BaseFileUploadButton
        status="hover"
        @fileSelected="handleSelectedBillPaymentCorporate"
        @remove="handleRemoveBillPaymentCorporate"
        @fileSizeError="toastStore.addToast(toastMessage.login.file_size_exceeded)"
        @fileTypeError="toastStore.addToast(toastMessage.login.file_type_error)"
      />
    </FormField>

    <div class="mt-[33px]">
      <BaseButton
        size="lg"
        label="다음"
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
import { BaseButton, BaseFileUploadButton } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import { useSignupStore } from '@/stores/useSignupStore';
import { toastMessage } from '@/constant/toastMessage';
import { useToastStore } from '@/stores/useToastStore';
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toastStore = useToastStore();
const signupStore = useSignupStore();

const isSubmitDisabled = computed(() => {
  return (
    !state.businessRegistration || !state.corporateRepresentative || !state.billPaymentCorporate
  );
});

const state = reactive({
  businessRegistration: null as File | null,
  corporateRepresentative: null as File | null,
  billPaymentCorporate: null as File | null,
});

const handleSelectedBusinessRegistration = (files: File[]) => {
  state.businessRegistration = files[0] || null;
};

const handleRemoveBusinessRegistration = (file: File) => {
  state.businessRegistration = null;
};

const handleSelectedCorporateRepresentative = (files: File[]) => {
  state.corporateRepresentative = files[0] || null;
};

const handleRemoveCorporateRepresentative = (file: File) => {
  state.corporateRepresentative = null;
};

const handleSelectedBillPaymentCorporate = (files: File[]) => {
  state.billPaymentCorporate = files[0] || null;
};

const handleRemoveBillPaymentCorporate = (file: File) => {
  state.billPaymentCorporate = null;
};

const handleSubmit = () => {
  signupStore.uploadCorpInfoDocument(
    state.businessRegistration!,
    state.corporateRepresentative!,
    state.billPaymentCorporate!
  );
  router.push({ query: { step: 7 } });
};
</script>
