<script setup lang="ts">
interface Props {
  /**
   * 선택된 날짜 (v-model)
   */
  modelValue?: string;
  /**
   * 플레이스홀더 텍스트
   * @default 'YYYY-MM-DD'
   */
  placeholder?: string;
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 비활성화할 날짜를 결정하는 함수
   */
  disabledDate?: (date: Date) => boolean;
  /**
   * 크기
   * @default 'sm'
   * sm: 42px
   * md: 48px
   */
  size?: 'sm' | 'md';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  placeholder: 'YYYY-MM-DD',
  disabled: false,
  disabledDate: undefined,
  size: 'sm',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
  (e: 'change', value: string | null): void;
}>();

const handleDateChange = (value: string | null) => {
  emit('update:modelValue', value);
  emit('change', value);
};
</script>

<template>
  <el-date-picker
    :model-value="props.modelValue"
    type="date"
    :placeholder="props.placeholder"
    class="input-date"
    :class="`el-input--${props.size}`"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
    :disabled="props.disabled"
    :disabled-date="props.disabledDate"
    @update:model-value="handleDateChange"
    :editable="false"
    :clearable="false"
  />
</template>

<style>
.el-date-editor.el-input.input-date {
  width: 100%;
  &.el-input--md {
    height: 48px !important;

    .el-input__inner {
      font-size: 16px;
    }

    .el-input__wrapper .el-input__suffix::after {
      width: 24px;
      height: 24px;
    }
  }

  &.el-input--sm {
    height: 42px !important;

    .el-input__inner {
      font-size: 13px;
    }

    .el-input__wrapper .el-input__suffix::after {
      width: 20px;
      height: 20px;
    }
  }

  .el-input__wrapper {
    border-radius: 6px !important;
    border: 1px solid var(--input-color-border-static) !important;
    background-color: var(--input-color-surface) !important;
    box-shadow: none !important;

    &.is-focus {
      box-shadow: 0 0 0 1px var(--input-color-border-focus) inset !important;
    }

    &:hover {
      box-shadow: none !important;
      border: 1px solid var(--input-color-border-static) !important;
    }

    .el-input__prefix {
      display: none;
    }

    .el-input__inner {
      padding-left: 4px;
      padding-right: 40px;
      border: none !important;
      color: var(--input-color-text-static) !important;
    }

    .el-input__suffix {
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;

      &::after {
        content: '';
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        background-image: url('../../assets/icons/calendar.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;

        /* 테마 시스템과 연동한 아이콘 색상 설정 */
        background-image: none;
        background-color: var(--input-icon-default);
        mask: url('../../assets/icons/calendar.svg') no-repeat center;
        mask-size: contain;
        -webkit-mask: url('../../assets/icons/calendar.svg') no-repeat center;
        -webkit-mask-size: contain;
      }
    }
  }

  /* disabled 상태 스타일 */
  &.is-disabled {
    .el-input__wrapper {
      background-color: var(--input-color-bg-disabled) !important;

      .el-input__inner {
        color: var(--input-color-text-disable) !important;
      }

      .el-input__suffix {
        &::after {
          background-color: var(--input-color-text-disable) !important;
        }
      }
    }
  }
}
</style>
