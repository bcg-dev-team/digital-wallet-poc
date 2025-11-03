<template>
  <div class="gap-size-12 flex items-center justify-center">
    <!-- TODO: RadioGroup 컴포넌트로 변경 검토 -->
    <BaseButton
      class="h-[80px]"
      variant="light"
      :color="type === 'individual' ? 'primary' : 'white'"
      label="개인회원"
      full-width
      @click="type = 'individual'"
    />
    <BaseButton
      class="h-[80px]"
      variant="light"
      :color="type === 'corporation' ? 'primary' : 'white'"
      label="법인회원"
      full-width
      @click="type = 'corporation'"
    />
  </div>
  <div class="mt-[33px] w-[360px]">
    <BaseButton
      size="lg"
      label="다음"
      variant="contained"
      :disabled="!type"
      full-width
      @click="isVisible = true"
    />
  </div>
  <div class="mt-6 flex justify-center">
    <Anchor size="sm" to="login">이미 아이디가 있어요</Anchor>
  </div>
  <RequiredDocumentsDialog
    :is-visible="isVisible"
    :type="type!"
    @close="isVisible = false"
    @confirm="handleConfirm"
  />
</template>

<script lang="ts" setup>
import RequiredDocumentsDialog from '@/components/auth/signup/dialog/RequiredDocumentsDialog.vue';
import Anchor from '@/components/common/Anchor.vue';
import { BaseButton } from '@template/ui';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const type = ref<'individual' | 'corporation' | null>(null);
const isVisible = ref(false);

const handleConfirm = () => {
  if (type.value === 'individual') {
    router.push({ name: 'individual-sign-up' });
  } else if (type.value === 'corporation') {
    router.push({ name: 'corporate-sign-up' });
  }
};
</script>
