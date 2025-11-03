<!--
  ModalFooter 컴포넌트
  - 모달의 푸터 영역을 담당
  - 기본 액션 버튼과 커스텀 슬롯 지원
  - 액션 버튼들의 동적 구성 지원
-->
<script setup lang="ts">
// ModalAction 타입을 직접 정의하여 순환참조 방지
import type { ComponentSize, ButtonVariant, InnerIconProps } from '../../types/components';
import BaseButton from '../BaseButton/BaseButton.vue';
import type { IconName } from '../../types/icons';

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
   * 모달 액션 버튼들
   */
  actions?: ModalAction[];
  /**
   * 기본 푸터 표시 여부
   */
  showDefaultFooter?: boolean;
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
}

interface Emits {
  (e: 'cancel'): void;
  (e: 'confirm'): void;
  (e: 'action', action: ModalAction, index: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  actions: () => [],
  showDefaultFooter: true,
  cancelText: '취소',
  confirmText: '확인',
  showCancelButton: true,
  showConfirmButton: true,
  fullWidth: true,
});

const emit = defineEmits<Emits>();

const handleCancel = () => {
  emit('cancel');
};

const handleConfirm = () => {
  emit('confirm');
};

const handleActionClick = (action: ModalAction, index: number) => {
  emit('action', action, index);
};
</script>

<template>
  <footer v-if="actions.length > 0 || $slots.default || showDefaultFooter" class="modal-footer">
    <slot name="default">
      <!-- 기본 액션 버튼들 -->
      <div v-if="showDefaultFooter" class="modal-footer-actions">
        <BaseButton
          v-if="showConfirmButton"
          variant="contained"
          size="lg"
          :label="confirmText"
          :full-width="fullWidth"
          @click="handleConfirm"
        />
        <BaseButton
          v-if="showCancelButton"
          variant="contained"
          color="grey"
          size="lg"
          :label="cancelText"
          :full-width="fullWidth"
          @click="handleCancel"
        />
      </div>

      <!-- 커스텀 액션 버튼들 -->
      <div v-if="actions.length > 0" class="modal-custom-actions">
        <BaseButton
          v-for="(action, index) in actions"
          :key="index"
          :variant="action.variant || 'contained'"
          :size="action.size || 'lg'"
          :label="action.label"
          :disabled="action.disabled"
          :is-loading="action.loading"
          :left-icon="action.leftIcon"
          :right-icon="action.rightIcon"
          :full-width="fullWidth"
          @click="handleActionClick(action, index)"
        />
      </div>
    </slot>
  </footer>
</template>
