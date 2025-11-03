<!--
  Figma 컴포넌트: Input/Select-SM
  BaseInput을 확장한 셀렉트 박스 컴포넌트
-->
<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed } from 'vue';

/**
 * BaseInputSelect - 셀렉트 박스 컴포넌트
 *
 * @props modelValue - 선택된 값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props size - 크기 (sm, md)
 * @props disabled - 비활성화 여부
 * @props error - 에러 상태 여부
 * @props errorMessage - 에러 메시지
 * @props options - 선택 옵션들
 * @emits update:modelValue - 값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 */
interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

interface Props {
  /**
   * 선택된 값 (v-model)
   */
  modelValue?: string;
  /**
   * 스타일 선택
   */
  variant?: 'default' | 'compact' | 'compact-bold' | 'chart-window';
  /**
   * 색상
   */
  color?: 'black' | 'gray' | 'white';
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  /**
   * 크기
   * @default 'sm'
   */
  size?: 'sm' | 'md';
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 에러 상태 여부
   * @default false
   */
  error?: boolean;
  /**
   * 에러 메시지
   */
  errorMessage?: string;
  /**
   * 선택 옵션들
   */
  options?: Option[];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  variant: 'default',
  placeholder: '선택하세요',
  color: 'white',
  size: 'sm',
  disabled: false,
  error: false,
  errorMessage: '',
  options: () => [],
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'open'): void;
}>();

// 선택된 옵션 객체
const selectedOption = computed({
  get() {
    return props.options.find((opt) => opt.value === props.modelValue) || null;
  },
  set(option: Option | null) {
    if (option) {
      emit('update:modelValue', option.value);
    }
  },
});

// 버튼 클래스
const buttonClasses = computed(() => {
  const base =
    props.variant === 'compact' || props.variant === 'compact-bold'
      ? 'relative w-full min-w-0  transition-all duration-150 flex items-center justify-between tracking-[-0.35px] '
      : 'relative w-full min-w-0 rounded-md transition-all duration-150 border border-solid flex items-center justify-between tracking-[-0.35px]';
  const size =
    props.variant === 'compact-bold'
      ? 'px-[15px] h-[24px] text-[14px] font-semibold leading-[16px]'
      : props.variant === 'compact'
        ? 'px-[15px] h-[24px] text-[10px] font-meidum leading-[16px]'
        : props.variant === 'chart-window'
          ? 'px-[10px] h-[24px] text-[13px] leading-[16px] font-semibold'
          : props.size === 'sm'
            ? 'px-[15px] h-[42px] text-[14px] leading-[16px]'
            : 'px-[15px] h-[48px] text-[16px] leading-[20px]';
  const color =
    props.color === 'black'
      ? 'bg-[var(--input-color-surface-dark)] !text-[#F1F3F5] !border-[var(--input-color-border-dark)]'
      : props.color === 'gray'
        ? 'bg-[var(--chart-chart-bg-on)]'
        : 'bg-[var(--input-color-surface)]';

  let state = '';
  if (props.disabled) {
    state =
      props.variant === 'compact' ||
      props.variant === 'compact-bold' ||
      props.variant === 'chart-window'
        ? 'text-default-muted-dark cursor-not-allowed'
        : 'bg-input-bg-disabled border-input-border-disabled !text-default-muted-dark cursor-not-allowed';
  } else {
    state = 'border-input-border-static';
  }

  const textColor = selectedOption.value ? 'text-input-text-static' : 'text-input-text-placeholder';

  return `${base} ${size} ${state} ${textColor} ${color}`;
});
</script>

<template>
  <div class="w-full">
    <Listbox v-model="selectedOption" :disabled="disabled" v-slot="{ open }">
      <div class="relative w-full">
        <ListboxButton
          :class="buttonClasses"
          :style="
            disabled ? 'color: var(--font-color-default-muted-dark) !important; opacity: 1;' : ''
          "
          @focus="emit('focus', $event)"
          @blur="emit('blur', $event)"
          @click="!open && emit('open')"
        >
          <span class="truncate">{{ selectedOption?.label || placeholder }}</span>
          <BaseIcon
            v-if="variant === 'default'"
            name="arrow-down"
            :size="size === 'sm' ? 'sm' : 'md'"
            :color="disabled ? 'disabled' : 'default'"
            :className="`ml-2 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`"
          />
          <BaseIcon
            v-else
            name="arrow-down-solid"
            :size="'md'"
            :color="disabled ? 'disabled' : 'default-muted-dark'"
            :className="`ml-2 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`"
          />
        </ListboxButton>

        <ListboxOptions
          :class="[
            props.variant === 'compact-bold' || props.variant === 'compact'
              ? 'absolute z-10 mt-1 max-h-60 w-max min-w-full overflow-auto bg-[--chart-chart-bg-on] py-1 shadow-lg'
              : 'border-input-border-static absolute z-10 mt-1 max-h-60 w-max min-w-full overflow-auto rounded-md border py-1 shadow-lg',
            props.color === 'black'
              ? '!border-[var(--input-color-border-dark)] bg-[var(--input-color-surface-dark)]'
              : props.color === 'gray'
                ? 'bg-[var(--chart-chart-bg-on)]'
                : 'bg-[var(--input-color-surface)]',
          ]"
        >
          <ListboxOption
            v-for="option in options"
            :key="option.value"
            :value="option"
            :disabled="option.disabled"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                props.variant === 'compact-bold'
                  ? 'relative cursor-default select-none py-2 pl-3 pr-9 text-[14px] font-semibold leading-[16px] tracking-[-0.35px]'
                  : props.variant === 'compact'
                    ? 'relative cursor-default select-none py-2 pl-3 pr-9 text-[10px] font-medium leading-[16px] tracking-[-0.35px]'
                    : 'relative cursor-default select-none py-2 pl-3 pr-9 text-[13px] leading-[16px] tracking-[-0.35px]',
                props.color === 'black' ? '!text-[#F1F3F5]' : '',
                option.disabled
                  ? 'text-input-text-disable cursor-not-allowed opacity-50'
                  : active
                    ? props.color === 'black'
                      ? 'text-input-text-static bg-[#131313]'
                      : 'text-input-text-static bg-[var(--background-bg-surface-muted)]'
                    : 'text-input-text-static',
                selected && !option.disabled ? 'font-medium' : '',
              ]"
            >
              <span class="block truncate">{{ option.label }}</span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>
  </div>
</template>
