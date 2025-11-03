<template>
  <div class="gap-size-16 flex flex-col">
    <FormField label="이름(한글)">
      <BaseInput size="md" disabled v-model="signupStore.userInfo.name" full />
    </FormField>
    <FormField label="휴대폰번호">
      <BaseInput size="md" disabled v-model="signupStore.userInfo.phoneNo" full />
    </FormField>
    <FormField label="생년월일">
      <BaseInput size="md" disabled v-model="signupStore.userInfo.birth" full />
    </FormField>
    <FormField label="법인명">
      <BaseInput size="md" placeholder="법인명을 입력하세요" v-model="state.companyName" full />
    </FormField>
    <FormField label="사업자등록번호">
      <BaseInput
        size="md"
        variant="number"
        placeholder="숫자만 입력하세요"
        v-model="state.businessRegistrationNumber"
        full
      />
    </FormField>
    <FormField label="법인등록번호">
      <BaseInput
        size="md"
        variant="number"
        placeholder="숫자만 입력하세요"
        v-model="state.businessNumber"
        full
      />
    </FormField>
    <div class="gap-size-8 flex items-center">
      <FormField label="법인대표 이름(영문)">
        <BaseInput
          size="md"
          placeholder="예) GILDONG"
          v-model="state.representativeFirstName"
          full
          :formatter="convertUpperCase"
          filter="english"
        />
      </FormField>
      <FormField label="법인대표 성(영문)">
        <BaseInput
          size="md"
          placeholder="예) HONG"
          v-model="state.representativeLastName"
          full
          :formatter="convertUpperCase"
          filter="english"
        />
      </FormField>
    </div>
    <FormField label="법인대표 생년월일">
      <div class="gap-size-8 flex flex-col">
        <BaseInputCalendar v-model="state.representativeBirth" size="md" full />
      </div>
    </FormField>
    <FormField label="법인주소">
      <div class="gap-size-8 flex flex-col">
        <BaseInput
          size="md"
          placeholder="주소 검색"
          v-model="state.address"
          variant="search"
          @onSearch="openDaumPostcode"
          @click="openDaumPostcode"
          readonly
          full
        />
        <BaseInput size="md" placeholder="상세주소" v-model="state.detailAddress" allowSpaces />
      </div>
    </FormField>
    <FormField label="법인주소(영문)">
      <div class="gap-size-8 flex flex-col">
        <BaseInput
          size="md"
          placeholder="주소 검색"
          v-model="state.addressEn"
          @click="openDaumPostcode"
          variant="search"
          disabled
          full
        />
        <BaseInput
          size="md"
          placeholder="상세주소(영문)"
          v-model="state.detailAddressEn"
          full
          allowSpaces
        />
      </div>
    </FormField>
  </div>
  <div class="mt-[33px] w-[360px]">
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      color="primary"
      full-width
      @click="handleSubmit"
      :disabled="
        !state.companyName ||
        !state.businessNumber ||
        !state.representativeLastName ||
        !state.representativeFirstName ||
        !state.representativeBirth ||
        !state.address ||
        !state.detailAddress ||
        !state.addressEn ||
        !state.detailAddressEn
      "
    />
  </div>
</template>
<script lang="ts" setup>
import { BaseButton, BaseInput, BaseInputCalendar } from '@template/ui';
import FormField from '@/components/auth/common/FormField.vue';
import { useSignupStore } from '@/stores/useSignupStore';
import { convertUpperCase } from '@template/utils';
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const signupStore = useSignupStore();

const state = reactive({
  companyName: '',
  businessNumber: '',
  businessRegistrationNumber: '',
  representativeLastName: '',
  representativeFirstName: '',
  representativeBirth: '',
  address: '',
  detailAddress: '',
  addressEn: '',
  detailAddressEn: '',
  zipCode: '',
});

// 다음 우편번호 API 스크립트 로드
onMounted(() => {
  const script = document.createElement('script');
  script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  document.head.appendChild(script);
});

// 주소 검색 열기 (새 창 방식)
const openDaumPostcode = () => {
  if (!window.daum?.Postcode) return;

  new window.daum.Postcode({
    oncomplete: (data: any) => {
      state.address = data.address;
      state.addressEn = data.addressEnglish;
      state.zipCode = data.zonecode;
    },
    onclose: () => {
      // 새 창이 닫힐 때의 처리 (필요시)
    },
    width: '100%',
    height: '100%',
  }).open();
};

const handleSubmit = () => {
  signupStore.updateCorporate({
    companyName: state.companyName,
    businessRegistrationNumber: state.businessRegistrationNumber,
    businessNumber: state.businessNumber,
    representativeLastName: state.representativeLastName,
    representativeFirstName: state.representativeFirstName,
    representativeBirth: state.representativeBirth,
    address: state.address,
    detailAddress: state.detailAddress,
    addressEn: state.addressEn,
    detailAddressEn: state.detailAddressEn,
    zipCode: state.zipCode,

    // TODO: 이부분 타입 때문에 이렇게 해야하는데 리팩토링 고민해보기
    businessRegistration: null,
    corporateRepresentative: null,
    billPaymentCorporate: null,
    shareholderRegister: null,
    corporateRepresentativePassport: null,
    additionalCorporateRepresentativePassport: null,
  });
  router.push({ query: { step: 6 } });
};
</script>
