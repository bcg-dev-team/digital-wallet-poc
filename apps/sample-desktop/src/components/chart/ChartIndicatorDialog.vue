<!--
  @fileoverview 차트 지표 다이얼로그 컴포넌트
  @component ChartIndicatorDialog
  FIXME: 기능 구현을 위한 임시 UI로, 피그마 참고하여 수정 필요
-->
<template>
  <BaseModal
    :is-open="isVisible"
    title="지표"
    size="lg"
    :close-on-overlay-click="true"
    :close-on-escape="true"
    :show-close-button="true"
    :show-default-footer="false"
    @close="handleClose"
  >
    <!-- 검색 입력 -->
    <div class="search-container">
      <div class="search-input">
        <input v-model="searchQuery" type="text" placeholder="검색" class="search-field" />
        <BaseIcon name="search" size="sm" class="search-icon" />
      </div>
    </div>

    <!-- 지표 목록 -->
    <div class="indicator-dialog">
      <div class="indicator-content">
        <!-- 카테고리별 지표 목록 -->
        <div class="indicator-categories">
          <BaseDisclosure
            v-for="category in filteredCategories"
            :key="category.id"
            :default-open="expandedCategories.includes(category.id)"
            custom
            :show-arrow="true"
            :arrow-position="30"
            class="category-section"
          >
            <template #button>
              <div class="category-header">
                <div class="category-info">
                  <span class="category-name">{{ category.name }}</span>
                </div>
              </div>
            </template>

            <template #panel>
              <div class="category-indicators">
                <button
                  v-for="indicator in category.indicators"
                  :key="indicator.id"
                  :class="['indicator-item', { selected: selectedIndicator === indicator.id }]"
                  @click="selectIndicator(indicator)"
                >
                  <div class="indicator-info">
                    <div class="indicator-name">{{ indicator.name }}</div>
                    <div class="indicator-description">{{ indicator.description }}</div>
                  </div>
                  <div v-if="selectedIndicator === indicator.id" class="indicator-check">
                    <BaseIcon name="cert" :size="16" color="#0067ef" />
                  </div>
                </button>
              </div>
            </template>
          </BaseDisclosure>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { BaseIcon, BaseModal, BaseDisclosure } from '@template/ui';
import { indicatorCategories } from '@/data/indicators';
import type { Indicator } from '@/data/indicators';
import './ChartIndicatorDialog.scss';
import { ref, computed } from 'vue';

interface Props {
  isVisible: boolean;
  selectedChartId?: string | null;
}

defineProps<Props>();

const emit = defineEmits<{
  close: [];
  indicatorSelect: [indicator: Indicator];
}>();

// 검색 쿼리
const searchQuery = ref('');

// 확장된 카테고리 목록
const expandedCategories = ref<string[]>(['trend', 'momentum', 'volatility']);

// 선택된 지표
const selectedIndicator = ref<string | null>(null);

// 필터링된 카테고리
const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return indicatorCategories;
  }

  const query = searchQuery.value.toLowerCase();
  return indicatorCategories
    .map((category) => ({
      ...category,
      indicators: category.indicators.filter(
        (indicator) =>
          indicator.name.toLowerCase().includes(query) ||
          indicator.description.toLowerCase().includes(query)
      ),
    }))
    .filter((category) => category.indicators.length > 0);
});

// 지표 선택
const selectIndicator = (indicator: Indicator) => {
  selectedIndicator.value = indicator.id;
  emit('indicatorSelect', indicator);
  handleClose();
};
// 다이얼로그 닫기
const handleClose = () => {
  selectedIndicator.value = null;
  searchQuery.value = '';
  emit('close');
};
</script>
