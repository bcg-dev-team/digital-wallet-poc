<template>
  <div class="gap-size-24 flex flex-col justify-center">
    <div class="bg-bg-bg-innerframe py-padding-36 border-bg-bg-outline rounded-[10px] border">
      <div class="gap-size-10 flex flex-col">
        <div class="gap-size-8 flex items-center justify-center">
          <div class="w-[160px]">
            <BaseInputSelect v-model="selectedAccount" :options="accountOptions" size="md" />
          </div>
          <div class="w-[360px]">
            <BaseInput
              v-model="searchKeyword"
              size="md"
              variant="search"
              placeholder="검색어를 입력하세요."
              @onSearch="onSearch"
            />
          </div>
        </div>
        <div class="gap-size-24 flex items-center justify-center">
          <div>
            <span class="text-font-14 font-medium">추천 검색어:</span>
          </div>
          <div class="gap-size-24 flex items-center">
            <a
              class="text-font-14 text-default-muted underline"
              v-for="item in searchList"
              :key="item.value"
              :href="item.value"
              >{{ item.label }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div>
      <FaqList :faqList="showFaqList" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { FAQ_CATEGORY_LABELS } from '@/components/support/constants/category.constants';
import { BaseInput, BaseInputSelect } from '@template/ui';
import { ref, onMounted } from 'vue';
import FaqList from './FaqList.vue';

export type FaqList = {
  no: string;
  category: string;
  question: string;
  answer: string;
  autoOpen: boolean;
};

const searchList = [
  {
    label: '회원정보',
    value: '',
  },
  {
    label: '내정보 변경',
    value: '',
  },
  {
    label: '계좌관리',
    value: '',
  },
  {
    label: '거래',
    value: '',
  },
];

const selectedAccount = ref('all');
const searchKeyword = ref('');
const accountOptions = [
  { label: '전체', value: 'all' },
  ...Object.entries(FAQ_CATEGORY_LABELS).map(([key, label]) => ({
    label,
    value: key,
  })),
];

const showFaqList = ref<FaqList[]>([]);

const faqList: FaqList[] = [
  {
    no: '3',
    category: 'userInfo',
    question: 'MODA/신한은행 연계계좌의 연계출금 및 이체가 가능한가요?',
    answer:
      '네, MODA와 신한은행 연계계좌를 통해 연계출금 및 이체가 가능합니다. 자세한 이용 방법은 고객센터로 문의해 주시기 바랍니다.',
    autoOpen: false,
  },
  {
    no: '2',
    category: 'userInfo',
    question: '해외선물은 어떤 통화로 거래하게 되나요?',
    answer:
      '해외선물은 종목에 따라 표시되는 화폐가 달라지게 됩니다. <br/>' +
      '해당 종목이 상장되어 있는 국가의 통화나 현물 시장이 있는 국가의 통화로 표시되기 때문에, 원화를 예치한 경우 해당 통화로 환전이 이루어지게 됩니다. <br/>' +
      '따라서 투자 종목의 등락에 따른 위험뿐만 아니라, 환율 변동에 따른 위험 역시 존재하게 됩니다.',
    autoOpen: true,
  },
  {
    no: '1',
    category: 'accountManagement',
    question: '거래할 수 있는 해외선물에는 어떤 종목들이 있나요?',
    answer:
      '해외선물 거래 가능 종목은 다음과 같습니다: S&P500, 나스닥, 다우존스, 러셀2000, VIX, 금, 은, 구리, 원유, 천연가스 등 다양한 상품을 거래할 수 있습니다.',
    autoOpen: false,
  },
];

const onSearch = () => {
  let filteredList = faqList;

  // 카테고리 필터링 (all이 아니면 해당 카테고리만)
  if (selectedAccount.value !== 'all') {
    filteredList = filteredList.filter((item) => item.category === selectedAccount.value);
  }

  // 검색어 필터링 (검색어가 있으면 질문과 답변에서 검색)
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase();
    filteredList = filteredList.filter(
      (item) =>
        item.question.toLowerCase().includes(keyword) || item.answer.toLowerCase().includes(keyword)
    );
  }

  // 내림차순 정렬 (1번이 가장 아래로)
  showFaqList.value = filteredList.sort((a, b) => parseInt(b.no) - parseInt(a.no));
};

onMounted(() => {
  onSearch();
});
</script>
