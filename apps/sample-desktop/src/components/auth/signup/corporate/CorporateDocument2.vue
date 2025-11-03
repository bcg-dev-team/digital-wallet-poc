<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="주주 명부(영문 공증 필요)">
      <BaseFileUploadButton
        status="hover"
        @fileSelected="handleSelectedShareholderRegister"
        @remove="handleRemoveShareholderRegister"
        @fileSizeError="toastStore.addToast(toastMessage.login.file_size_exceeded)"
        @fileTypeError="toastStore.addToast(toastMessage.login.file_type_error)"
      />
    </FormField>
    <FormField label="법인대표 여권 사본">
      <BaseFileUploadButton
        status="hover"
        @fileSelected="handleSelectedCorporateRepresentativePassport"
        @remove="handleRemoveCorporateRepresentativePassport"
        @fileSizeError="toastStore.addToast(toastMessage.login.file_size_exceeded)"
        @fileTypeError="toastStore.addToast(toastMessage.login.file_type_error)"
      />
    </FormField>
    <div>
      <div class="mt-size-12 gap-size-4 flex items-center">
        <span class="text-font-16 font-semibold">법인의 대표가 2명 이상인가요?</span>
        <BaseCheckbox v-model="isChecked" />
      </div>
      <div v-if="isChecked" class="gap-size-12 mt-size-4 flex flex-col">
        <span class="text-font-14"> 모든 법인대표들의 여권 사본을 각각 제출해주세요. </span>
        <BaseFileUploadButton
          v-for="(upload, index) in additionalUploads"
          :key="upload.id"
          status="hover"
          @fileSelected="
            (files: File[]) => handleSelectedAdditionalCorporateRepresentativePassport(files, index)
          "
          @remove="(file) => handleRemoveAdditionalCorporateRepresentativePassport(file, index)"
          @fileSizeError="toastStore.addToast(toastMessage.login.file_size_exceeded)"
          @fileTypeError="toastStore.addToast(toastMessage.login.file_type_error)"
        />

        <div
          class="border-bg-bg-outline flex h-[34px] w-full cursor-pointer items-center justify-center rounded-[6px] border bg-[var(--button-disabled-background)]"
          @click="addNewUpload"
        >
          <BaseIcon name="plus" />
        </div>
      </div>
    </div>
    <div class="mt-[33px]">
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
import { BaseButton, BaseFileUploadButton, BaseCheckbox, BaseIcon } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import { useSignupStore } from '@/stores/useSignupStore';
import { toastMessage } from '@/constant/toastMessage';
import { useToastStore } from '@/stores/useToastStore';
import { memberService } from '@/services/api';
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';

const toastStore = useToastStore();
const signupStore = useSignupStore();

const state = reactive({
  shareholderRegister: null as File | null,
  corporateRepresentativePassport: null as File | null,
  additionalCorporateRepresentativePassport: [] as File[],
});

const additionalUploads = ref([{ id: 1, file: null as File | null }]);
const isSubmitDisabled = computed(() => {
  const disabled =
    !state.shareholderRegister ||
    !state.corporateRepresentativePassport ||
    (isChecked.value && !state.additionalCorporateRepresentativePassport.length);

  return disabled;
});

const router = useRouter();

const isChecked = ref<boolean>(false);

const handleSelectedShareholderRegister = (files: File[]) => {
  state.shareholderRegister = files[0] || null;
};

const handleRemoveShareholderRegister = (file: File) => {
  state.shareholderRegister = null;
};

const handleSelectedCorporateRepresentativePassport = (files: File[]) => {
  state.corporateRepresentativePassport = files[0] || null;
};

const handleRemoveCorporateRepresentativePassport = (file: File) => {
  state.corporateRepresentativePassport = null;
};

const handleSelectedAdditionalCorporateRepresentativePassport = (files: File[], index: number) => {
  additionalUploads.value[index].file = files[0] || null;
  updateAdditionalPassports();
};

const handleRemoveAdditionalCorporateRepresentativePassport = (file: File, index: number) => {
  additionalUploads.value[index].file = null;
  updateAdditionalPassports();
};

const updateAdditionalPassports = () => {
  state.additionalCorporateRepresentativePassport = additionalUploads.value
    .map((upload) => upload.file)
    .filter((file) => file !== null);
};

const addNewUpload = () => {
  const newId = Math.max(...additionalUploads.value.map((u) => u.id)) + 1;
  additionalUploads.value.push({ id: newId, file: null });
};

const handleSubmit = async () => {
  signupStore.uploadCorpAdminDocument(
    state.shareholderRegister!,
    state.corporateRepresentativePassport!,
    state.additionalCorporateRepresentativePassport
  );
  try {
    const response = await memberService.joinCorporate(signupStore.getCorporateSignupInfo);
    if (response.data && response.data.id) {
      router.push({ name: 'sign-up-complete' });
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
