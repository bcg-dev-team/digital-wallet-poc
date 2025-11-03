<!--
  Figma 컴포넌트: Button/File-Upload (node-id: 116-2609)
  https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=116-2609&t=agLJQOgDvtXTjTYA-4
-->
<script setup lang="ts">
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { ref, computed } from 'vue';

/**
 * 파일 업로드 버튼 컴포넌트
 * 파일 선택 시에는 버튼으로, 파일 선택 후에는 파일명과 제거 버튼으로 UI가 대체됩니다.
 *
 * @props label - 버튼 텍스트
 * @props status - 버튼 상태 (default, hover)
 * @props disabled - 비활성화 여부
 * @props showIcon - 아이콘 표시 여부
 * @props multiple - 다중 파일 선택 여부
 * @props accept - 허용할 파일 타입
 * @emits click - 버튼 클릭 시
 * @emits change - 파일 선택 시
 * @emits remove - 파일 제거 시
 * @emits file-selected - 파일 선택/제거 시 현재 파일 목록
 * @emits file-size-error - 파일 크기 초과 시
 * @emits file-type-error - 허용되지 않는 파일 형식 시
 */
interface Props {
  /**
   * 버튼 텍스트
   * @default '파일선택'
   */
  label?: string;
  /**
   * 버튼 상태
   * @default 'default'
   */
  status?: 'default' | 'hover';
  /**
   * 비활성화 여부
   * @default false
   */
  disabled?: boolean;
  /**
   * 아이콘 표시 여부
   * @default true
   */
  showIcon?: boolean;
  /**
   * 다중 파일 선택 여부
   * @default false
   */
  multiple?: boolean;
  /**
   * 허용할 파일 타입
   */
  accept?: string;
  /**
   * 최대 파일 크기 (바이트)
   * @default 10485760 (10MB)
   */
  maxFileSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  label: '파일선택',
  status: 'default',
  disabled: false,
  showIcon: true,
  multiple: false,
  accept: '.png,.jpg,.jpeg,.pdf',
  maxFileSize: 10 * 1024 * 1024, // 10MB
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
  (e: 'change', files: FileList | null): void;
  (e: 'remove', file: File): void;
  (e: 'file-selected', files: File[]): void;
  (e: 'file-size-error', file: File, maxSize: number): void;
  (e: 'file-type-error', file: File, allowedTypes: string[]): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const selectedFiles = ref<File[]>([]);

// 정적 색상은 Tailwind arbitrary value로 처리
const staticClasses = computed(() => {
  const classes = [
    'relative w-full flex items-center rounded-sm border transition-colors duration-150',
    'bg-[#f3f4f6]', // 기본 배경색
    'border-bg-bg-outline', // 기본 테두리 색상
    'text-input-text-static', // 기본 텍스트 색상
  ];

  if (props.disabled) {
    classes.push('cursor-not-allowed opacity-60');
  } else {
    classes.push('hover:bg-bg-surface');
  }

  return classes.join(' ');
});

// 동적 스타일 (조건부 변경이 필요한 경우만)
const dynamicStyle = computed(() => {
  if (props.disabled) {
    return {
      backgroundColor: 'var(--button-disabled-background)',
      borderColor: 'var(--button-disabled-border)',
      color: 'var(--button-disabled-text)',
    };
  }

  if (props.status === 'hover') {
    return {
      backgroundColor: 'var(--base-colors-common-bg-surface-default)',
    };
  }

  return {};
});

// 파일 선택 후 UI 상태
const hasSelectedFiles = computed(() => selectedFiles.value.length > 0);

function handleClick(e: MouseEvent) {
  if (!props.disabled) {
    inputRef.value?.click();
    emit('click', e);
  }
}

function handleChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (files) {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const allowedTypes = ['png', 'jpg', 'jpeg', 'pdf'];

    // 파일 유효성 체크
    for (const file of fileArray) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

      // 파일 형식 체크
      if (!allowedTypes.includes(fileExtension)) {
        emit('file-type-error', file, allowedTypes);
        continue;
      }

      // 파일 크기 체크
      if (file.size > props.maxFileSize) {
        emit('file-size-error', file, props.maxFileSize);
        continue;
      }

      validFiles.push(file);
    }

    selectedFiles.value = validFiles;
    emit('change', files);
    emit('file-selected', selectedFiles.value);
  }
}

// 파일 제거
function removeFile(file: File) {
  const index = selectedFiles.value.findIndex((f) => f.name === file.name && f.size === file.size);
  if (index > -1) {
    selectedFiles.value.splice(index, 1);

    emit('remove', file);
    emit('file-selected', []);
  }
}
</script>

<template>
  <div>
    <!-- 파일 선택 버튼 (파일이 선택되지 않았을 때만 표시) -->
    <button
      v-if="!hasSelectedFiles"
      type="button"
      :class="staticClasses"
      :style="dynamicStyle"
      :disabled="props.disabled"
      @click="handleClick"
    >
      <input
        ref="inputRef"
        type="file"
        class="sr-only"
        :disabled="props.disabled"
        :multiple="multiple"
        :accept="accept"
        @change="handleChange"
      />
      <span class="flex w-full flex-row items-center justify-center gap-1 px-6 py-2">
        <span class="text-sm font-normal">{{ label }}</span>
        <BaseIcon
          v-if="showIcon"
          name="plus"
          size="md"
          :color="props.disabled ? 'primary' : 'current'"
        />
      </span>
    </button>

    <!-- 선택된 파일 UI (파일이 선택되었을 때만 표시) -->
    <div v-else>
      <div
        v-for="(file, index) in selectedFiles"
        :key="`${file.name}-${index}`"
        class="flex w-full items-center justify-between rounded-sm border border-gray-200 bg-gray-50 px-4 py-[8px]"
      >
        <span class="text-blue truncate text-sm underline underline-offset-1">{{ file.name }}</span>
        <button
          type="button"
          @click="removeFile(file)"
          class="ml-2 flex-shrink-0 text-gray-400 transition-colors duration-150 hover:text-red-500"
          title="파일 제거"
        >
          <BaseIcon name="close" size="sm" />
        </button>
      </div>
    </div>
  </div>
</template>
