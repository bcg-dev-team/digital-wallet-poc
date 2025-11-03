<template>
  <div class="mx-auto w-[1440px] py-4">
    <MainCardContent class="p-6" title="고객지원" size="lg">
      <template #content>
        <div>
          <BaseTabs
            variant="underline"
            size="lg"
            :tabs="tabs"
            v-model="selectedTab"
            @update:model-value="handleTabChange"
          />
        </div>
      </template>
    </MainCardContent>
  </div>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import UserGuide from '@/components/support/guide/UserGuide.vue';
import Notice from '@/components/support/notice/Notice.vue';
import Event from '@/components/support/event/Event.vue';
import QnA from '@/components/support/qna/QnaMain.vue';
import Faq from '@/components/support/faq/Faq.vue';
import { BaseTabs } from '@template/ui';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

type Tab = 'notice' | 'event' | 'qna' | 'faq' | 'guide';

const router = useRouter();
const selectedTab = ref<Tab>((router.currentRoute.value.params.supportTab as Tab) || 'notice');

const tabs = [
  {
    key: 'notice',
    label: '공지사항',
    component: Notice,
  },
  {
    key: 'event',
    label: '이벤트',
    component: Event,
  },
  {
    key: 'qna',
    label: '1:1 문의',
    component: QnA,
  },
  {
    key: 'faq',
    label: '자주 묻는 질문',
    component: Faq,
  },
  {
    key: 'guide',
    label: '이용가이드',
    component: UserGuide,
  },
];

const handleTabChange = (tab: string) => {
  router.push({ name: 'support', params: { supportTab: tab } });
};
</script>
