<template>
  <AuthContent
    title="개인회원 가입"
    :description="individualDescription[step].description"
    :total-step="7"
    v-model:current-step="step"
  >
    <template #content>
      <IndividualTerms v-if="step === 0" />
      <PhoneAuth v-if="step === 1" />
      <EmailForm v-if="step === 2" />
      <EmailAuth v-if="step === 3" />
      <SetPassword v-if="step === 4" />
      <IndividualInfo v-if="step === 5" />
      <IndividualDocument v-if="step === 6" />
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import IndividualDocument from '@/components/auth/signup/individual/IndividualDocument.vue';
import IndividualTerms from '@/components/auth/signup/individual/IndividualTerms.vue';
import IndividualInfo from '@/components/auth/signup/individual/IndividualInfo.vue';
import SetPassword from '@/components/auth/signup/common/SetPassword.vue';
import PhoneAuth from '@/components/auth/signup/common/PhoneAuth.vue';
import EmailForm from '@/components/auth/signup/common/EmailForm.vue';
import EmailAuth from '@/components/auth/signup/common/EmailAuth.vue';
import type { AuthContentTitle } from '@/types/components/auth.types';
import AuthContent from '@/components/auth/common/AuthContent.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

// TODO: 현재 페이지에서 파라미터 전달 방식으로 구현되어 있음. 추후 리팩토링 필요
const step = computed(() => {
  return parseInt(route.query.step as string) || 0;
});

const individualDescription: AuthContentTitle[] = [
  {
    description: '가입 약관을 확인해주세요.',
  },
  {
    description: '서비스 이용을 위해 먼저 본인인증을 해주세요.',
  },
  {
    description: '아이디로 사용할 이메일주소를 입력해주세요.',
  },
  {
    description: `메일함에서 인증 메일을 확인해주세요. <br/> 인증번호 6자리를 입력하면 회원가입이 완료돼요.`,
  },
  {
    description: '비밀번호를 설정해주세요.',
  },
  {
    description: '정보를 입력해주세요.',
  },
  {
    description: `
        가입에 필요한 서류를 제출해주세요.<br/>
        관리자 확인 후 <span class='text-red font-medium'>승인 알림</span>을 보내드립니다.
        <p class='mt-size-12 text-font-12 text-blue'>※ 파일형식: .png, .jpg, .pdf / 파일 사이즈 300KB 미만</p>
      `,
  },
];
</script>
