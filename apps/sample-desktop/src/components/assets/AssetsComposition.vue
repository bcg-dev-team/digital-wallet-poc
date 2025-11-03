<template>
  <LabelContent label="자산 구성" size="lg">
    <template #content>
      <div class="mt-size-48 gap-size-48 flex flex-col">
        <!-- 상단 스택형 진행바 -->
        <BaseProgressBar v-if="segments.length" variant="stacked" :segments="segments" />

        <!-- 자산 리스트 -->
        <div class="flex flex-col">
          <div
            v-for="(item, index) in displaySummary"
            :key="item.stockCd"
            class="flex items-start justify-between gap-3 py-3"
          >
            <!-- 좌측: 심볼/이름/배지/퍼센트 -->
            <div class="flex min-w-0 items-center gap-3">
              <span :class="['mt-1 h-3 w-3 flex-shrink-0 rounded-full', palette[index]]" />
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="truncate text-[14px] font-medium">{{ item.stockCd }}</span>
                  <BaseChip
                    :label="EnumLabelMapper.getPositionCodeShort(item.positionCd)"
                    :variant="item.positionCd === 'LONG' ? 'red' : 'blue'"
                    size="sm"
                    rounded="rounded-sm"
                  />
                </div>
                <div class="text-default-muted text-[12px]">{{ item.ratePercent.toFixed(1) }}%</div>
              </div>
            </div>

            <!-- 우측: 금액/변동률 -->
            <div class="text-right">
              <div class="text-[14px] font-semibold">
                ${{ (item.currentPrice * item.accountBookQuantity).toFixed(2) }}
              </div>
              <div
                class="text-[12px]"
                :class="item.reLongExecutionPrice >= 0 ? 'text-red' : 'text-blue'"
              >
                {{ item.reLongExecutionPrice >= 0 ? '+' : ''
                }}{{ item.reLongExecutionPrice.toFixed(1) }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </LabelContent>
</template>
<script setup lang="ts">
import LabelContent from '@/components/common/LabelContent.vue';
import { BaseProgressBar, BaseChip } from '@template/ui';
import type { ProgressSegment } from '@template/ui';
import type { AssetSummary } from '@template/api';
import { EnumLabelMapper } from '@template/api';
import { computed } from 'vue';

/**
 * AssetSummary에 accountBookQuantity를 추가한 확장 타입
 */
interface AssetSummaryWithQuantity extends AssetSummary {
  accountBookQuantity: number;
}

const props = defineProps<{ summary: AssetSummaryWithQuantity[] }>();

const palette = computed<string[]>(() => [
  'bg-[var(--font-color-purple)]',
  'bg-[var(--font-color-green)]',
  'bg-bg-primary',
  'bg-[var(--font-color-red)]',
]);

const displaySummary = computed(() => props.summary.slice(0, 4));

// 상단 스택형 진행바 세그먼트 계산 (percent 값을 그대로 사용)
const segments = computed<ProgressSegment[]>(() =>
  displaySummary.value.map((it, idx) => ({
    value: it.ratePercent,
    label: it.stockCd,
    colorClass: palette.value[idx],
  }))
);
</script>
