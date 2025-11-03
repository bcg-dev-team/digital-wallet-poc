<template>
  <BaseModal
    :is-open="isOpen"
    :show-default-footer="false"
    :close-on-overlay-click="false"
    :close-on-escape="false"
    showCloseButton
    content-padding="none"
    size="md"
    title="계좌 개설"
    @close="emit('close')"
    @update:is-open="emit('update:isOpen', $event)"
  >
    <div class="flex flex-col items-center gap-9 px-12 py-10">
      <div class="flex flex-col items-center gap-4">
        <div class="flex h-[100px] w-[100px] items-center justify-center">
          <img :src="walletImage" alt="계좌 개설" class="h-full w-full object-contain" />
        </div>

        <div class="flex flex-col items-center gap-3 text-center">
          <p class="text-base font-medium leading-5 tracking-[-0.35px] text-[var(--popup-text)]">
            투자를 시작할 준비가 되셨나요?
          </p>
          <p class="text-sm font-normal leading-[18px] tracking-[-0.35px] text-[var(--popup-text)]">
            계좌 개설하고 나만의 투자 여정을 시작하세요!
          </p>
        </div>
      </div>

      <BaseButton
        label="계좌 개설하기"
        variant="contained"
        color="primary"
        size="lg"
        custom-class="w-[360px]"
        @click="emit('createAccount')"
      />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { BaseModal, BaseButton, walletImage, BaseIcon } from '@template/ui';

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: 'close'): void;
  (e: 'createAccount'): void;
  (e: 'update:isOpen', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
