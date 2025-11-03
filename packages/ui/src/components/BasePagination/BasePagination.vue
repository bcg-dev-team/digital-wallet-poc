<!-- Figma: Pagination -->
<script setup lang="ts">
import BasePaginationNumber from './BasePaginationNumber.vue';
import BasePaginationArrow from './BasePaginationArrow.vue';
import { ref, computed } from 'vue';

/**
 * 페이지네이션 컴포넌트
 *
 * @props currentPage - 현재 페이지 번호
 * @props totalPages - 전체 페이지 수
 * @props maxVisiblePages - 최대 표시할 페이지 번호 수 (기본값: 5)
 * @props showFirstLast - 첫/마지막 페이지 버튼 표시 여부
 * @emits pageChange - 페이지 변경 이벤트
 */
interface Props {
  /** 현재 페이지 번호 */
  currentPage: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 최대 표시할 페이지 번호 수 */
  maxVisiblePages?: number;
  /** 첫/마지막 페이지 버튼 표시 여부 */
  showFirstLast?: boolean;
}

interface Emits {
  (e: 'pageChange', page: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5,
  showFirstLast: false,
});

const emit = defineEmits<Emits>();

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('pageChange', page);
  }
};

const handleArrowClick = (direction: 'left' | 'right') => {
  if (direction === 'left') {
    handlePageChange(props.currentPage - 1);
  } else {
    handlePageChange(props.currentPage + 1);
  }
};

const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === props.totalPages);

const visiblePages = computed(() => {
  const pages: number[] = [];
  const halfVisible = Math.floor(props.maxVisiblePages / 2);

  let start = Math.max(1, props.currentPage - halfVisible);
  let end = Math.min(props.totalPages, start + props.maxVisiblePages - 1);

  // 끝에서 시작점 조정
  if (end - start + 1 < props.maxVisiblePages) {
    start = Math.max(1, end - props.maxVisiblePages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

// ----------------------
// Hover 상태 Local State
// ----------------------
const hoveredPage = ref<number | null>(null);

const handleMouseEnter = (page: number) => {
  if (page !== props.currentPage) {
    hoveredPage.value = page;
  }
};

const handleMouseLeave = () => {
  hoveredPage.value = null;
};

const getPageStatus = (page: number) => {
  if (page === props.currentPage) return 'selected';
  if (page === hoveredPage.value) return 'hover';
  return 'unselected';
};
</script>

<template>
  <div
    class="flex min-h-8 w-fit flex-row items-center justify-center gap-2 p-0"
    data-name="Pagination"
  >
    <!-- 첫 페이지 버튼 -->
    <BasePaginationArrow
      v-if="showFirstLast"
      direction="left"
      :disabled="isFirstPage"
      @click="handlePageChange(1)"
    />

    <!-- 이전 페이지 버튼 -->
    <BasePaginationArrow
      direction="left"
      :disabled="isFirstPage"
      @click="handleArrowClick('left')"
    />

    <!-- 페이지 번호들 -->
    <template v-for="page in visiblePages" :key="page">
      <BasePaginationNumber
        :number="page"
        :status="getPageStatus(page)"
        @click="handlePageChange(page)"
        @mouseenter="handleMouseEnter(page)"
        @mouseleave="handleMouseLeave"
      />
    </template>

    <!-- 다음 페이지 버튼 -->
    <BasePaginationArrow
      direction="right"
      :disabled="isLastPage"
      @click="handleArrowClick('right')"
    />

    <!-- 마지막 페이지 버튼 -->
    <BasePaginationArrow
      v-if="showFirstLast"
      direction="right"
      :disabled="isLastPage"
      @click="handlePageChange(totalPages)"
    />
  </div>
</template>
