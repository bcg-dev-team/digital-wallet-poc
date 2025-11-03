<template>
  <div class="flex flex-col gap-1">
    <div class="text-[14px] font-medium leading-[18px] tracking-[-0.35px]">{{ props.label }}</div>
    <BaseInputStepper
      v-model="value"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :variant="props.variant"
      :disabled="props.disabled"
      :unit-label="props.unitLabel"
    />
  </div>
</template>

<script setup lang="ts">
import { BaseInputStepper } from '@template/ui';

const value = defineModel<number>('value');

const props = withDefaults(
  defineProps<{
    label: string;
    variant?: 'default' | 'unit' | 'range';
    step: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    unitLabel?: string;
  }>(),
  {
    disabled: false,
    variant: 'default',
  }
);
</script>
