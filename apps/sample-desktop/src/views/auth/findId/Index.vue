<template>
  <AuthContent
    :title="findIdTitle[step].title"
    :description="findIdTitle[step].description"
    :total-step="2"
    v-model:current-step="step"
  >
    <template #content>
      <AuthFindId v-if="step === 0" v-model:userInfo="userInfo" />
      <AuthFindIdResult v-if="step === 1" v-model:userInfo="userInfo" />
    </template>
  </AuthContent>
</template>

<script lang="ts" setup>
import AuthFindIdResult from '@/components/auth/findId/AuthFindIdResult.vue';
import type { AuthContentTitle } from '@/types/components/auth.types';
import AuthContent from '@/components/auth/common/AuthContent.vue';
import AuthFindId from '@/components/auth/findId/AuthFindId.vue';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';

const route = useRoute();
const userInfo = ref({
  name: '',
  phoneNo: '',
  findIdResult: '',
});

// TODO: 현재 페이지에서 파라미터 전달 방식으로 구현되어 있음. 추후 리팩토링 필요
const step = computed(() => {
  return parseInt(route.query.step as string) || 0;
});

const findIdTitle: AuthContentTitle[] = [
  {
    title: '아이디 찾기',
    description: '회원정보에 등록된 정보를 입력해주세요',
  },
  {
    title: '아이디 찾기 완료',
    description: '입력하신 정보와 일치하는 아이디를 찾았어요',
  },
];
</script>
