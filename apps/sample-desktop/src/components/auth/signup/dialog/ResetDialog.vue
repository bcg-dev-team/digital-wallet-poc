<template>
  <BaseModal
    :is-open="isOpen"
    :show-default-footer="false"
    :close-on-overlay-click="false"
    :close-on-escape="false"
    showCloseButton
    content-padding="none"
    size="sm"
    title="회원가입"
    @close="emit('close')"
    @update:is-open="emit('update:isOpen', $event)"
  >
    <div class="flex flex-col items-center gap-[30px] px-[50px] py-10">
      <!-- 메시지 영역 -->
      <div class="flex flex-col items-center gap-3 text-center">
        <p class="text-base font-medium leading-5 tracking-[-0.35px] text-[var(--popup-text)]">
          회원가입 취소
        </p>
        <p class="text-sm font-normal leading-[18px] tracking-[-0.35px] text-[var(--popup-text)]">
          입력한 정보들이 모두 초기화됩니다
        </p>
      </div>

      <!-- 버튼 영역 -->
      <div class="flex w-full items-center justify-center gap-[10px]">
        <BaseButton
          label="확인"
          variant="contained"
          color="primary"
          size="sm"
          custom-class="w-20 h-10"
          @click="emit('confirm')"
        />
        <BaseButton
          label="취소"
          variant="outlined"
          color="grey"
          size="sm"
          custom-class="w-20 h-10"
          @click="emit('cancel')"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { BaseModal, BaseButton } from '@template/ui';

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: 'close'): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
  (e: 'update:isOpen', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
</script>
