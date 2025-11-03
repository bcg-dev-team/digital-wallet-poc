<template>
  <AuthContent title="회원가입" description="개인회원과 법인회원 중 선택해주세요.">
    <template #content>
      <SignUpIntro />
    </template>
  </AuthContent>
</template>
<script lang="ts" setup>
import SignUpIntro from '@/components/auth/signup/SignUpIntro.vue';
import AuthContent from '@/components/auth/common/AuthContent.vue';
</script>
