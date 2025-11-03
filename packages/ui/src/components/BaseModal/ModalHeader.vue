<!--
  ModalHeader 컴포넌트
  - 모달의 헤더 영역을 담당
  - 제목과 닫기 버튼을 포함
  - 슬롯을 통한 커스터마이징 지원
-->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';

interface Props {
  /**
   * 모달 제목
   */
  title?: string;
  /**
   * 뒤로가기 버튼 표시 여부
   */
  showBackButton?: boolean;
  /**
   * 닫기 버튼 표시 여부
   */
  showCloseButton?: boolean;
  /**
   * 뒤로가기 버튼 텍스트
   */
  backButtonText?: string;
  /**
   * 닫기 버튼 텍스트
   */
  closeButtonText?: string;
}

interface Emits {
  (e: 'back'): void;
  (e: 'close'): void;
}

const props = withDefaults(defineProps<Props>(), {
  showBackButton: false,
  showCloseButton: true,
  backButtonText: '뒤로가기',
  closeButtonText: '모달 닫기',
});

const emit = defineEmits<Emits>();

const handleBack = () => {
  emit('back');
};

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <header class="modal-header">
    <!-- 왼쪽: 뒤로가기 버튼 -->
    <div v-if="showBackButton" class="modal-header-left">
      <button
        type="button"
        class="modal-back-button"
        @click="handleBack"
        :aria-label="backButtonText"
      >
        <BaseIcon name="arrow-backward" size="md" />
      </button>
    </div>

    <!-- 중앙: 제목 영역 -->
    <div class="modal-header-center">
      <slot name="title">
        <h2 v-if="title" class="modal-title">{{ title }}</h2>
      </slot>
    </div>

    <!-- 오른쪽: 액션 영역 -->
    <div class="modal-header-right">
      <slot name="actions">
        <button
          v-if="showCloseButton"
          type="button"
          class="modal-close-button"
          @click="handleClose"
          :aria-label="closeButtonText"
        >
          <BaseIcon name="close" size="md" />
        </button>
      </slot>
    </div>
  </header>
</template>
