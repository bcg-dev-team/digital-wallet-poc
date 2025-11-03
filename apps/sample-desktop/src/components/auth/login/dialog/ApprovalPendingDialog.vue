<template>
  <BaseModal
    :is-open="isOpen"
    :show-default-footer="false"
    :close-on-overlay-click="false"
    :close-on-escape="false"
    :show-close-button="false"
    content-padding="none"
    size="md"
    @update:is-open="emit('update:isOpen', $event)"
  >
    <div class="flex flex-col items-center gap-6 p-12">
      <div class="flex h-[150px] w-[150px] items-center justify-center">
        <img :src="checkConfettiImage" alt="가입 승인 대기" class="h-full w-full object-contain" />
      </div>

      <div class="flex w-full flex-col items-center gap-12">
        <div class="flex w-full flex-col items-center gap-6 text-center">
          <h2
            class="text-2xl font-semibold leading-[30px] tracking-[-0.35px] text-[var(--popup-text)]"
          >
            가입 승인 대기중
          </h2>
          <div class="text-base font-normal leading-6 text-[var(--popup-text)]">
            <p class="mb-0">가입 승인 대기중입니다.</p>
            <p>관리자 확인 후 이메일로 승인 알림을 보내드릴게요!</p>
          </div>
        </div>

        <BaseButton
          label="확인"
          variant="contained"
          color="primary"
          size="lg"
          custom-class="w-[360px]"
          @click="emit('confirm')"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { BaseModal, BaseButton, checkConfettiImage } from '@template/ui';

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: 'confirm'): void;
  (e: 'update:isOpen', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
