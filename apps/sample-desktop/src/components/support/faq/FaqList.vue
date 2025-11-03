<template>
  <div class="mb-size-8 text-font-14">
    총 <span class="text-red font-medium">{{ props.faqList.length }}</span> 건
  </div>
  <div
    class="itmes-center text-font-12 flex border-b-2 border-[var(--table-type1-header-underline)] bg-[var(--table-type2-header-bg)] font-medium"
  >
    <div class="py-size-8 w-[140px] text-center">
      <span>번호</span>
    </div>
    <div class="py-size-8 w-[160px] text-center">
      <span>카테고리</span>
    </div>
    <div class="py-size-8 w-full text-center">
      <span>질문</span>
    </div>
  </div>
  <BaseDisclosure
    v-for="(item, index) in props.faqList"
    :key="item.no"
    custom
    :show-arrow="true"
    :arrow-position="30"
    :default-open="item.autoOpen"
  >
    <template #button>
      <div
        class="text-font-14 flex items-center border-b border-[var(--table-type2-body-border-mid)]"
      >
        <div class="py-size-12 w-[140px] text-center">
          <span>{{ props.faqList.length - index }}</span>
        </div>
        <div class="py-size-12 w-[160px] text-center">
          <span>{{ getCategoryLabel(item.category) }}</span>
        </div>
        <div class="py-size-12 pl-size-10 w-full">
          <span class="font-medium">Q. {{ item.question }}</span>
        </div>
      </div>
    </template>
    <template #panel>
      <div
        class="py-padding-36 pl-padding-48 border-b border-[var(--table-type2-body-border-mid)] bg-[var(--table-bg-inner)]"
      >
        <div class="gap-size-8 flex items-start">
          <span class="text-font-14">A.</span>
          <div class="text-font-14 flex-1" v-html="item.answer" />
        </div>
      </div>
    </template>
  </BaseDisclosure>
</template>
<script setup lang="ts">
import { FAQ_CATEGORY_LABELS } from '@/components/support/constants/category.constants';
import { BaseDisclosure } from '@template/ui';
import type { FaqList } from './Faq.vue';

const props = defineProps<{
  faqList: FaqList[];
}>();

/**
 * 카테고리 코드를 표시명으로 변환하는 함수
 * @param category - 카테고리 코드
 * @returns 표시명 (없으면 원본 코드 반환)
 */
const getCategoryLabel = (category: string): string => {
  return FAQ_CATEGORY_LABELS[category as keyof typeof FAQ_CATEGORY_LABELS] || category;
};
</script>
