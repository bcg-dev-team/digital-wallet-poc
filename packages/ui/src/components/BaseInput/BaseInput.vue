<!--
  Figma 컴포넌트: BaseInput (공통 베이스)
  모든 Input 타입의 공통 기능을 담당하는 베이스 컴포넌트
  피그마 디자인 토큰 기반으로 구현
-->
<script setup lang="ts">
import BaseProgressBar from '../BaseProgressBar/BaseProgressBar.vue';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed, ref, watch } from 'vue';

/**
 * BaseInput - 모든 Input 타입의 공통 베이스 컴포넌트
 *
 * @props modelValue - 입력값 (v-model)
 * @props placeholder - 플레이스홀더 텍스트
 * @props size - 크기 (sm, md)
 * @props variant - 입력 타입 변형 (default, search, password, password-strength, tel, number)
 * @props disabled - 비활성화 여부
 * @props error - 에러 상태 여부
 * @props errorMessage - 에러 메시지
 * @props readonly - 읽기 전용 여부
 * @props maxLength - 입력 가능한 최대 문자 수
 * @props autocomplete - 브라우저 자동완성 속성
 * @props name - input의 name 속성
 * @props formatter - 입력값 포맷팅 함수
 * @emits update:modelValue - 값 변경 시 발생
 * @emits focus - 포커스 시 발생
 * @emits blur - 블러 시 발생
 * @emits onSearch - 검색 버튼 클릭 이벤트 (variant="search"일 때 사용)
 * @slot prepend - 외부 좌측 커스텀 컨텐츠
 * @slot prepend-inner - 내부 좌측 커스텀 컨텐츠
 * @slot append-inner - 내부 우측 커스텀 컨텐츠
 * @slot append - 외부 우측 커스텀 컨텐츠
 */
interface Props {
  /**
   * 입력값 (v-model)
   */
  modelValue?: string;
  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;
  /**
   * 크기
   * @default 'md'
   */
  size?: 'sm' | 'md';
  /**
   * 입력 타입 변형
   * @default 'default'
   */
  variant?: 'default' | 'search' | 'password' | 'password-strength' | 'tel' | 'number';
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
   * 읽기 전용 여부
   * @default false
   */
  readonly?: boolean;
  /**
   * 입력 가능한 최대 문자 수
   */
  maxLength?: number;
  /**
   * 비밀번호 강도 분석 시 사용할 사용자 입력 데이터 (password-strength variant용)
   */
  userInputs?: string[];
  /**
   * autocomplete 속성 (직접 지정 시 우선 적용)
   */
  autocomplete?: string;
  /**
   * 전체 너비 사용 여부
   * @default false
   */
  full?: boolean;
  /**
   * input의 name 속성
   */
  name?: string;
  /**
   * 입력값 포맷팅 함수
   * 사용자가 입력한 값을 원하는 형태로 변환
   * @example (value) => value.replace(/[^0-9]/g, '') // 숫자만 허용
   */
  formatter?: (value: string) => string;
  /**
   * 띄어쓰기 허용 여부
   * @default false
   */
  allowSpaces?: boolean;
  /**
   * 영문 필터링 여부
   * @default undefined
   */
  filter?: 'english';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  size: 'md',
  variant: 'default',
  disabled: false,
  error: false,
  errorMessage: '',
  readonly: false,
  userInputs: () => [],
  full: false,
  formatter: undefined,
  allowSpaces: false,
  filter: undefined,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', event: FocusEvent): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'onSearch', event: MouseEvent): void;
}>();

// 내부 상태 관리
const isPasswordVisible = ref(false);
const internalValue = ref(props.modelValue || '');

const passwordStrengthResult = ref<0 | 1 | 2 | 3 | 4>(0);

const showVariantIcon = computed(
  () =>
    props.variant === 'search' ||
    props.variant === 'password' ||
    props.variant === 'password-strength'
);

// Input type 결정
const inputType = computed(() => {
  if (
    (props.variant === 'password' || props.variant === 'password-strength') &&
    !isPasswordVisible.value
  )
    return 'password';
  if (props.variant === 'tel') return 'tel';
  if (props.variant === 'number') return 'number';
  return 'text';
});

// BaseIcon 공통 클래스
const iconClasses =
  'text-input-text-static hover:text-input-text-hover cursor-pointer select-none rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1';

const sizeClasses = computed(() => {
  return props.size === 'sm'
    ? 'px-[15px] py-[13px] text-[13px] leading-[16px]'
    : 'px-[15px] py-[13px] text-[16px] leading-[20px]';
});

const containerClasses = computed(() => {
  const widthClass = props.full ? 'w-full' : '';
  const base = `relative ${widthClass} rounded-md transition-all duration-150 flex bg-[var(--input-color-surface)] border border-solid`;

  if (props.disabled) {
    return `${base} bg-input-bg-disabled border-input-border-disabled text-input-text-disable cursor-not-allowed`;
  }

  if (props.error) {
    return `${base} border-input-border-error focus-within:border-input-border-error focus-within:shadow-[0_0_0_1px_var(--input-color-border-error)]`;
  }

  return `${base} border-input-border-static focus-within:border-input-border-focus focus-within:shadow-[0_0_0_1px_var(--input-color-border-focus)] hover:border-input-border-focus`;
});

const inputClasses = computed(() => {
  const base = `w-full bg-transparent border-0 outline-none tracking-[-0.35px] ${sizeClasses.value}`;
  const padding = showVariantIcon.value ? 'pr-[45px]' : '';

  const textStyles = props.disabled
    ? 'text-input-text-disable cursor-not-allowed placeholder:text-input-text-disable'
    : 'text-input-text-static placeholder:text-input-text-placeholder placeholder:font-normal placeholder:tracking-[-0.35px]';

  return `${base} ${padding} ${textStyles}`;
});

const prependInnerClasses = computed(() => {
  const textSize =
    props.size === 'sm' ? 'text-[13px] leading-[16px]' : 'text-[16px] leading-[20px]';
  return `flex items-center pl-[15px] text-input-text-static font-normal tracking-[-0.35px] ${textSize}`;
});

const appendInnerClasses = computed(() => {
  return 'absolute right-0 top-0 h-full flex items-center pr-[15px] gap-1';
});

// Autocomplete 값 결정 (props.autocomplete가 있으면 우선 사용)
const autocompleteValue = computed(() => {
  // 직접 지정된 autocomplete 값이 있으면 우선 사용
  if (props.autocomplete !== undefined) {
    return props.autocomplete;
  }

  // variant 기반 자동 설정
  if (props.variant === 'password' || props.variant === 'password-strength') {
    return 'new-password';
  }
  if (props.variant === 'search') {
    return 'off';
  }
  return undefined;
});

// 키 입력 방지 핸들러
const handleKeydown = (event: KeyboardEvent) => {
  // allowSpaces가 false일 때만 스페이스바 입력 방지
  if (event.key === ' ' && !props.allowSpaces) {
    event.preventDefault();
  }
};

// Input 입력 이벤트 핸들러
const handleInput = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  // 띄어쓰기 허용 여부 확인
  if (!props.allowSpaces) {
    value = value.replace(/\s/g, '');
    target.value = value;
  }

  // tel variant인 경우 숫자만 허용
  if (props.variant === 'tel') {
    value = value.replace(/[^0-9]/g, '');
    target.value = value;
  }

  // maxLength 제한 (number type에서도 동작하도록)
  if (props.maxLength && value.length > props.maxLength) {
    value = value.slice(0, props.maxLength);
    target.value = value;
  }

  // 영문 필터링
  if (props.filter === 'english') {
    value = value.replace(/[^a-zA-Z]/g, '');
    target.value = value;
  }

  // 입력값 포맷팅 적용
  if (props.formatter) {
    value = props.formatter(value);
  }

  internalValue.value = value;
  emit('update:modelValue', value);

  // password-strength variant일 때만 분석 실행
  if (props.variant === 'password-strength') {
    if (!value) {
      passwordStrengthResult.value = 0;
    } else {
      try {
        // @ts-ignore
        const { analyzePasswordStrength } = await import('@template/utils');
        const result = await analyzePasswordStrength(value, props.userInputs);
        passwordStrengthResult.value = Math.max(0, Math.min(4, result.score)) as 0 | 1 | 2 | 3 | 4;
      } catch (error) {
        console.warn('Password strength analysis failed:', error);
        passwordStrengthResult.value = 0;
      }
    }
  }
};

// 키보드 접근성 이벤트 핸들러
const handleSearchKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    emit('onSearch', event as any);
  }
};

const handlePasswordKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    isPasswordVisible.value = !isPasswordVisible.value;
  }
};

watch(
  () => props.modelValue,
  (newValue) => {
    internalValue.value = newValue || '';
  }
);

// input 요소 참조
const inputRef = ref<HTMLInputElement | null>(null);

// 외부에서 포커스할 수 있도록 메서드 expose
defineExpose({
  focus: () => {
    inputRef.value?.focus();
  },
});
</script>

<template>
  <div :class="props.full ? 'flex w-full flex-col' : 'flex flex-col'">
    <div :class="props.full ? 'flex w-full items-center gap-2' : 'flex items-center gap-2'">
      <!-- 외부 좌측 prepend -->
      <div v-if="$slots.prepend" class="flex-shrink-0">
        <slot name="prepend" />
      </div>

      <!-- 입력 컨테이너 -->
      <div :class="[containerClasses, props.full ? 'flex-1' : '']">
        <!-- 내부 좌측 prepend-inner -->
        <div v-if="$slots['prepend-inner']" :class="prependInnerClasses">
          <slot name="prepend-inner" />
        </div>

        <!-- 입력 필드 -->
        <div class="relative flex-1">
          <input
            ref="inputRef"
            :value="internalValue"
            :type="inputType"
            :name="name"
            :placeholder="placeholder"
            :disabled="props.disabled"
            :readonly="readonly"
            :maxlength="maxLength"
            :autocomplete="autocompleteValue"
            :class="inputClasses"
            @keydown.stop="handleSearchKeydown"
            @input="handleInput"
            @keydown="handleKeydown"
            @focus="emit('focus', $event)"
            @blur="emit('blur', $event)"
          />

          <!-- Variant 아이콘 -->
          <div v-if="showVariantIcon" :class="appendInnerClasses">
            <BaseIcon
              v-if="variant === 'search'"
              name="search"
              :size="size === 'sm' ? 'sm' : 'md'"
              :class="iconClasses"
              tabindex="0"
              role="button"
              aria-label="검색 실행"
              @click.stop="emit('onSearch', $event)"
              @keydown.stop="handleSearchKeydown"
              @mousedown.prevent
            />
            <BaseIcon
              v-if="variant === 'password' || variant === 'password-strength'"
              :name="isPasswordVisible ? 'eye' : 'eye-close'"
              :size="size === 'sm' ? 'sm' : 'md'"
              :class="iconClasses"
              tabindex="0"
              role="button"
              :aria-label="isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 표시'"
              @click.stop="isPasswordVisible = !isPasswordVisible"
              @keydown.stop="handlePasswordKeydown"
              @mousedown.prevent
            />
          </div>
        </div>

        <!-- 내부 우측 append-inner -->
        <div
          v-if="$slots['append-inner']"
          :class="appendInnerClasses.replace('gap-1', 'z-10 gap-1')"
        >
          <slot name="append-inner" />
        </div>
      </div>

      <!-- 외부 우측 append -->
      <div v-if="$slots.append" class="flex-shrink-0">
        <slot name="append" />
      </div>
    </div>

    <!-- 에러 메시지 -->
    <div
      v-if="props.error && errorMessage"
      class="text-input-border-error mt-1 text-[12px] font-medium"
    >
      {{ errorMessage }}
    </div>

    <!-- 비밀번호 강도 진행바 -->
    <BaseProgressBar
      v-if="variant === 'password-strength' && internalValue.length > 0"
      class="mt-1"
      :strength-score="passwordStrengthResult"
      variant="password-strength"
      :show-label="true"
    />
  </div>
</template>

<style scoped>
/* BaseInput type=number일 경우 우측 스핀버튼 제거 style */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
