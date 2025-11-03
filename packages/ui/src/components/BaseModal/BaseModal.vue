<!--
  BaseModal 컴포넌트 (하이브리드 접근법)
  - Headless UI Dialog 기반으로 구현
  - 헤더, 컨텐츠, 푸터를 서브 컴포넌트로 분리
  - 슬롯을 통한 완전한 커스터마이징 지원
  - 기존 기능과의 호환성 유지
  @figma Modal (node-id: 1801-17801, 1801-18102, 1801-18147)
-->
<script setup lang="ts">
import { computed, ref, watch, nextTick, useSlots, onMounted, onUnmounted } from 'vue';
// BaseModal 관련 타입들을 직접 정의하여 순환참조 방지
import { ButtonVariant, ComponentSize, InnerIconProps } from '../../types/components';
import { Dialog, DialogPanel, DialogOverlay } from '@headlessui/vue';
import ModalContent from './ModalContent.vue';
import ModalHeader from './ModalHeader.vue';
import ModalFooter from './ModalFooter.vue';

// ModalAction 타입 정의
interface ModalAction {
  label: string;
  variant?: ButtonVariant;
  size?: ComponentSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: InnerIconProps;
  rightIcon?: InnerIconProps;
}

interface Props {
  /**
   * 모달 열림 상태
   */
  isOpen: boolean;
  /**
   * 모달 제목
   */
  title?: string;
  /**
   * 모달 설명 (접근성용)
   */
  description?: string;
  /**
   * 모달 크기
   */
  size?: ComponentSize | 'xl';
  /**
   * 모달 타입
   */
  variant?: 'default' | 'confirm' | 'alert';
  /**
   * 알림 타입 (variant가 'alert'일 때만 사용)
   */
  alertVariant?: 'success' | 'info' | 'warning' | 'error';
  /**
   * 오버레이 클릭 시 닫기 여부
   */
  closeOnOverlayClick?: boolean;
  /**
   * ESC 키 클릭 시 닫기 여부
   */
  closeOnEscape?: boolean;
  /**
   * 뒤로가기 버튼 표시 여부
   */
  showBackButton?: boolean;
  /**
   * 닫기 버튼 표시 여부
   */
  showCloseButton?: boolean;
  /**
   * 기본 푸터 표시 여부
   */
  showDefaultFooter?: boolean;
  /**
   * 모달 액션 버튼들
   */
  actions?: ModalAction[];
  /**
   * 취소 버튼 텍스트
   */
  cancelText?: string;
  /**
   * 확인 버튼 텍스트
   */
  confirmText?: string;
  /**
   * 취소 버튼 표시 여부
   */
  showCancelButton?: boolean;
  /**
   * 확인 버튼 표시 여부
   */
  showConfirmButton?: boolean;
  /**
   * 버튼을 fullwidth로 표시할지 여부
   */
  fullWidth?: boolean;
  /**
   * 컨텐츠 여백 조정 (차트 설정 다이얼로그 등에서 사용)
   */
  contentPadding?: 'default' | 'compact' | 'none';
}

interface ModalEmits {
  (e: 'close'): void;
  (e: 'back'): void;
  (e: 'cancel'): void;
  (e: 'confirm'): void;
  (
    e: 'action',
    action: {
      label: string;
      variant?: ButtonVariant;
      size?: ComponentSize;
      disabled?: boolean;
      loading?: boolean;
      leftIcon?: InnerIconProps;
      rightIcon?: InnerIconProps;
    },
    index: number
  ): void;
  (e: 'update:isOpen', value: boolean): void;
}

interface Emits extends ModalEmits {}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  size: 'md',
  variant: 'default',
  closeOnOverlayClick: true,
  closeOnEscape: true,
  showBackButton: false,
  showCloseButton: true,
  showDefaultFooter: true,
  actions: () => [],
  cancelText: '취소',
  confirmText: '확인',
  showCancelButton: true,
  showConfirmButton: true,
  fullWidth: true,
  contentPadding: 'default',
});

const emit = defineEmits<Emits>();

// 모달 컨테이너 ref
const modalContainer = ref<HTMLElement>();

// 모달 크기 클래스 계산
const modalSizeClass = computed(() => `modal-size-${props.size}`);

// 모달 타입 클래스 계산
const modalVariantClass = computed(() => `modal-variant-${props.variant}`);

// 슬롯 존재 여부 확인
const hasHeaderSlot = computed(() => !!useSlots().header);
const hasFooterSlot = computed(() => !!useSlots().footer);

// ESC 키가 눌렸는지 추적
const isEscapePressed = ref(false);

// 모달이 열릴 때 포커스 설정
watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen && modalContainer.value) {
      await nextTick();
      // 모달이 열릴 때 모달 컨테이너에 포커스
      modalContainer.value.focus();
    }
  }
);

// 이벤트 핸들러들
const handleClose = () => {
  emit('close');
  emit('update:isOpen', false);
};

// Headless UI의 close 이벤트를 조건부로 처리
const handleDialogClose = () => {
  // ESC 키로 인한 close인지 확인
  if (isEscapePressed.value) {
    // ESC 키로 인한 close
    if (props.closeOnEscape) {
      handleClose();
    }
    isEscapePressed.value = false;
  } else {
    // 오버레이 클릭으로 인한 close
    if (props.closeOnOverlayClick) {
      handleClose();
    }
  }
};

// ESC 키 핸들러 - 전역 이벤트 리스너 사용
const handleGlobalKeydown = (event: KeyboardEvent) => {
  if (props.isOpen && event.key === 'Escape') {
    isEscapePressed.value = true;
    // Headless UI가 자동으로 @close 이벤트를 발생시킴
  }
};

// 전역 이벤트 리스너 등록/해제
onMounted(() => {
  document.addEventListener('keydown', handleGlobalKeydown, true);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleGlobalKeydown, true);
});

const handleBack = () => {
  emit('back');
};

const handleCancel = () => {
  emit('cancel');
  handleClose();
};

const handleConfirm = () => {
  emit('confirm');
  handleClose();
};

const handleAction = (action: any, index: number) => {
  emit('action', action, index);
};
</script>

<template>
  <Dialog :open="isOpen" @close="handleDialogClose" class="modal-dialog">
    <!-- Headless UI의 DialogOverlay 사용 - 기본 동작 활용 -->
    <DialogOverlay class="modal-overlay" />

    <!-- 모달 컨테이너 -->
    <div class="modal-container-wrapper">
      <DialogPanel
        ref="modalContainer"
        :class="['modal-container', modalSizeClass, modalVariantClass]"
        tabindex="-1"
      >
        <!-- 헤더 영역 -->
        <ModalHeader
          v-if="hasHeaderSlot || title || showCloseButton || showBackButton"
          :title="title"
          :show-back-button="showBackButton"
          :show-close-button="showCloseButton"
          @back="handleBack"
          @close="handleClose"
        >
          <template #title>
            <slot name="title" />
          </template>
          <template #actions>
            <slot name="actions" />
          </template>
        </ModalHeader>

        <!-- 컨텐츠 영역 -->
        <ModalContent
          :description="description"
          :alert-variant="alertVariant"
          :show-alert-icon="variant === 'alert'"
          :content-padding="contentPadding"
        >
          <slot />
        </ModalContent>

        <!-- 푸터 영역 -->
        <ModalFooter
          v-if="hasFooterSlot || actions.length > 0 || showDefaultFooter"
          :actions="actions"
          :show-default-footer="showDefaultFooter"
          :cancel-text="cancelText"
          :confirm-text="confirmText"
          :show-cancel-button="showCancelButton"
          :show-confirm-button="showConfirmButton"
          :full-width="fullWidth"
          @cancel="handleCancel"
          @confirm="handleConfirm"
          @action="handleAction"
        >
          <template #default>
            <slot name="footer" />
          </template>
        </ModalFooter>
      </DialogPanel>
    </div>
  </Dialog>
</template>
