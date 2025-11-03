<template>
  <BaseModal
    :is-open="isVisible"
    title="회원가입 구비서류"
    size="md"
    :close-on-overlay-click="true"
    :close-on-escape="true"
    :show-close-button="true"
    :show-default-footer="false"
    @close="emit('close')"
  >
    <div class="flex flex-col gap-4 py-1">
      <!-- 안내 문구 -->
      <p class="text-md m-0 leading-relaxed text-[var(--font-color-default)]">
        원활한 회원가입을 위해 아래 서류들을 미리 준비해주세요.
      </p>

      <!-- 구비서류 목록 -->
      <div class="flex flex-col gap-3">
        <div
          v-for="document in documentList"
          :key="document.title"
          class="border-bg-bg-outline flex gap-3 rounded-[8px] border bg-[var(--background-bg-default)] p-4"
        >
          <div class="flex items-center justify-center">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--button-blue-background)]"
            >
              <BaseIcon name="description" size="md" color="var(--input-icon-blue)" />
            </div>
          </div>

          <div class="flex flex-col justify-center">
            <div
              v-if="document.verticalDescription"
              class="text-sm font-medium leading-relaxed text-[var(--font-color-default)]"
            >
              {{ document.verticalDescription }}
            </div>
            <div
              class="flex items-center gap-0.5 text-base font-medium leading-relaxed text-[var(--font-color-default)]"
            >
              {{ document.title }}
              <span
                v-if="document.horizontalDescription"
                class="text-sm font-medium leading-relaxed text-[var(--font-color-default-muted)]"
              >
                {{ document.horizontalDescription }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="border-primary-primary800 bg-primary-primary100 p-size-8 gap-size-4 flex items-start rounded-md border"
      >
        <BaseIcon name="info" size="sm" color="var(--chips-status-pending-text)" />
        <div class="text-font-12 text-[var(--chips-status-pending-text)]">
          <p>주의사항</p>
          <p>· 모든 서류는 최근 3개월 이내 발급</p>
          <p>· 영문 서류는 공증 필요</p>
          <p>· 파일 형식: PDF 또는 JPG(10MB 이하)</p>
        </div>
      </div>
      <!-- 하단 버튼 -->
      <div class="mt-2 pt-2">
        <BaseButton
          variant="contained"
          size="lg"
          color="primary"
          label="확인했어요"
          fullWidth
          @click="handleConfirm"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { BaseModal, BaseIcon, BaseButton } from '@template/ui';
import { ref, computed } from 'vue';

interface Props {
  isVisible: boolean;
  type: 'individual' | 'corporation';
}

interface DocumentItem {
  title: string;
  horizontalDescription?: string;
  verticalDescription?: string;
}

interface Emits {
  (e: 'close'): void;
  (e: 'confirm', checkedDocuments: DocumentItem[]): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'individual',
});

const emit = defineEmits<Emits>();

const defaultDocuments: DocumentItem[] = [
  {
    title: '신분증',
    horizontalDescription: '(주민등록증 혹은 운전면허증)',
  },
  {
    title: '주민등록초본 또는 관공서 납부영수증',
    verticalDescription: '(신분증의 주소가 현 주소와 다를경우)',
  },
];

const corporateDocuments: DocumentItem[] = [
  {
    title: '사업자등록증명원',
  },
  {
    title: '법인대표초본',
    horizontalDescription: '(영문)',
  },
  {
    title: '법인명 공과금 납부서',
  },
  {
    title: '주주 명부',
    horizontalDescription: '(영문 공증 필요)',
  },
  {
    title: '법인대표 여권 사본',
  },
  {
    title: '법인대표 여권 사본',
    horizontalDescription: '(법인대표가 두명 이상일 경우)',
  },
];

const documentList = computed<DocumentItem[]>(() =>
  props.type === 'individual' ? [...defaultDocuments] : [...corporateDocuments]
);

const handleConfirm = () => {
  emit('confirm', documentList.value);
  emit('close');
};
</script>
