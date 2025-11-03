<template>
  <div>
    <div class="gap-size-24 flex flex-col">
      <div class="gap-size-4 flex flex-col">
        <span class="text-font-14 font-medium">검색 정보</span>
        <div class="bg-bg-bg-innerframe gap-size-10 p-size-16 flex flex-col rounded-md">
          <div class="flex items-center justify-between">
            <span class="text-font-14 font-normal">이름</span>
            <span class="text-font-14 font-medium">{{ userInfo?.name }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-font-14 font-normal">휴대폰번호</span>
            <span class="text-font-14 font-medium">{{ userInfo?.phoneNo }}</span>
          </div>
        </div>
      </div>
      <div class="gap-size-4 flex flex-col">
        <span class="text-font-14 font-medium">찾은 아이디(이메일주소)</span>
        <div
          v-if="userInfo?.findIdResult"
          class="bg-bg-bg-innerframe gap-size-10 p-size-16 flex flex-col rounded-md"
        >
          <div class="flex items-center justify-between">
            <span class="text-font-16 font-medium">{{ userInfo?.findIdResult }}</span>
            <div class="cursor-pointer"></div>
          </div>
        </div>
        <div v-else class="bg-bg-bg-innerframe gap-size-10 p-size-16 flex flex-col rounded-md">
          <div class="flex flex-col items-center justify-center gap-2.5">
            <span class="text-font-16 font-medium">찾으시는 아이디가 없어요</span>
            <span class="text-font-14">계속 찾지 못할 경우 고객센터로 문의해주세요</span>
          </div>
        </div>
      </div>
    </div>
    <div class="gap-size-8 mt-[33px] flex w-full items-center justify-center">
      <BaseButton
        size="lg"
        :label="userInfo?.findIdResult ? '비밀번호 재설정' : '회원가입'"
        variant="outlined"
        color="white"
        full-width
        @click="handleClick"
      />
      <BaseButton size="lg" label="로그인" variant="contained" color="primary" full-width />
    </div>
  </div>
</template>
<script setup lang="ts">
import { BaseButton, BaseIcon } from '@template/ui';
import { useRouter } from 'vue-router';

const userInfo = defineModel<{ name: string; phoneNo: string; findIdResult: string }>('userInfo', {
  default: () => ({ name: '', phoneNo: '', findIdResult: '' }),
});

const router = useRouter();

const handleClick = () => {
  if (userInfo.value.findIdResult) {
    router.push({ name: 'reset-password' });
  } else {
    router.push({ name: 'sign-up' });
  }
};
</script>
