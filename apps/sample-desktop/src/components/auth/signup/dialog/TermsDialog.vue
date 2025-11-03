<template>
  <BaseModal
    :is-open="isOpen"
    title="약관 상세보기"
    :show-default-footer="false"
    :close-on-overlay-click="true"
    :close-on-escape="true"
    content-padding="none"
    @close="handleClose"
    @update:is-open="$emit('update:isOpen', $event)"
  >
    <div class="flex max-h-[80vh] min-h-[600px] flex-col">
      <BaseTabs
        v-model="selectedTab"
        :tabs="tabs"
        variant="underline"
        hasBackground
        size="md"
        :fullwidth="true"
        class="flex flex-1 flex-col overflow-hidden"
      />
    </div>

    <!-- 푸터 영역 -->
    <template #footer>
      <div class="flex gap-3 py-4">
        <BaseButton
          label="닫기"
          variant="outlined"
          color="grey"
          size="sm"
          full-width
          @click="handleClose"
        />
        <BaseButton
          label="동의함"
          variant="contained"
          color="primary"
          size="sm"
          full-width
          @click="handleAgree"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { BaseModal, BaseTabs, BaseButton } from '@template/ui';
import PrivacyPolicyContent from './PrivacyPolicyContent.vue';
import ServiceTermsContent from './ServiceTermsContent.vue';
import MarketingContent from './MarketingContent.vue';
import type { TabItem } from '@template/ui';
import { ref, computed } from 'vue';

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: 'close'): void;
  (e: 'agree', value: string): void;
  (e: 'update:isOpen', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedTab = defineModel<string>('selectedTab', {});

// 탭 설정
const tabs = computed<TabItem[]>(() => [
  {
    key: 'service-terms',
    label: '서비스 이용약관',
    component: ServiceTermsContent,
  },
  {
    key: 'privacy-policy',
    label: '개인정보처리',
    component: PrivacyPolicyContent,
  },
  {
    key: 'marketing',
    label: '마케팅 수신',
    component: MarketingContent,
  },
]);

const handleClose = () => {
  emit('close');
  emit('update:isOpen', false);
};

const handleAgree = () => {
  emit('agree', selectedTab.value || 'service-terms');
  handleClose();
};
</script>
