<template>
  <LabelContent :label="props.title" size="md">
    <template #content>
      <div class="gap-size-4 flex items-center">
        <div class="w-[140px]">
          <BaseInputCalendar
            class="input-calendar"
            v-model="orderStartDate"
            disabled
            @change="handleDateChange"
            size="sm"
          />
        </div>
        ~
        <div class="w-[140px]">
          <BaseInputCalendar v-model="orderEndDate" disabled @change="handleDateChange" size="sm" />
        </div>
        <div>
          <BaseRadioGroup
            v-model="selectedPeriod"
            size="md"
            :options="periodOptions"
            @update:model-value="handlePeriodChange"
          />
        </div>
      </div>
    </template>
  </LabelContent>
</template>

<script setup lang="ts">
import { useTradeSearchStore } from '@/stores/useTradeSearchStore';
import { BaseRadioGroup, BaseInputCalendar } from '@template/ui';
import LabelContent from '@/components/common/LabelContent.vue';
import { ref, computed, onMounted } from 'vue';
import { format, subDays } from 'date-fns';

interface Props {
  /**
   * 초기 선택된 기간 타입
   */
  title: string;
  initialPeriod?: 'today' | 'weeks' | 'months';
}

interface Emits {
  /**
   * 기간 변경 시 발생하는 이벤트
   * @param startDate - 시작 날짜 (YYYY-MM-DD)
   * @param endDate - 종료 날짜 (YYYY-MM-DD)
   * @param periodType - 선택된 기간 타입
   */
  (
    e: 'period-change',
    startDate: string,
    endDate: string,
    periodType: 'today' | 'weeks' | 'months'
  ): void;
}

const props = withDefaults(defineProps<Props>(), {
  initialPeriod: 'today',
});

const emit = defineEmits<Emits>();

const tradeSearchStore = useTradeSearchStore();

/**
 * 기간 선택 옵션들
 */
const periodOptions = [
  { value: 'today', label: '오늘' },
  { value: 'weeks', label: '일주일' },
  { value: 'months', label: '30일' },
];

const selectedPeriod = ref(tradeSearchStore.selectedPeriod || props.initialPeriod);
const orderStartDate = ref(tradeSearchStore.orderStartDate);
const orderEndDate = ref(tradeSearchStore.orderEndDate);

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
const getTodayString = () => {
  return format(new Date(), 'yyyy-MM-dd');
};

/**
 * 지정된 일수 전 날짜를 YYYY-MM-DD 형식으로 반환
 * @param days - 몇 일 전인지
 * @returns YYYY-MM-DD 형식의 날짜 문자열
 */
const getDaysAgoString = (days: number) => {
  return format(subDays(new Date(), days), 'yyyy-MM-dd');
};

/**
 * 기간 타입에 따른 날짜 범위 계산
 */
const dateRange = computed(() => {
  const today = getTodayString();

  switch (selectedPeriod.value) {
    case 'today':
      return { start: today, end: today };
    case 'weeks':
      return { start: getDaysAgoString(6), end: today };
    case 'months':
      return { start: getDaysAgoString(29), end: today };
    default:
      return { start: today, end: today };
  }
});

/**
 * 기간 타입 변경 시 날짜 범위 업데이트 및 이벤트 발생
 */
const handlePeriodChange = () => {
  const { start, end } = dateRange.value;
  orderStartDate.value = start;
  orderEndDate.value = end;
  tradeSearchStore.selectedPeriod = selectedPeriod.value;
  emit('period-change', start, end, selectedPeriod.value);
};

const handleDateChange = () => {
  emit('period-change', orderStartDate.value, orderEndDate.value, selectedPeriod.value);
};

// 컴포넌트 마운트 시 초기 날짜 설정
onMounted(() => {
  // store에 값이 없을 때만 초기값 설정
  if (!tradeSearchStore.orderStartDate || !tradeSearchStore.orderEndDate) {
    handlePeriodChange();
  }
});
</script>
