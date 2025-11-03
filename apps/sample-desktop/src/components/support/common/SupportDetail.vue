<template>
  <div
    class="bg-bg-bg-innerframe border-bg-bg-outline px-padding-48 py-padding-24 min-h-[794px] w-full rounded-[10px] border"
  >
    <div class="py-padding-16 gap-size-12 border-bg-bg-outline flex flex-col border-b">
      <div class="gap-size-12 flex items-center">
        <BaseChip :label="props.chip.label" size="md" :variant="props.chip.variant" />
        <span class="text-font-13 text-default-muted">{{ props.date }}</span>
      </div>
      <div>
        <span class="text-font-18 font-medium">{{ props.title }}</span>
      </div>
    </div>
    <div class="py-padding-36" v-html="props.content"></div>
  </div>
</template>
<script setup lang="ts">
import type { ChipVariant } from '@template/ui';
import { BaseChip } from '@template/ui';

const props = defineProps<{
  chip: { label: string; variant: ChipVariant };
  date: string;
  title: string;
  content: string;
}>();
</script>
