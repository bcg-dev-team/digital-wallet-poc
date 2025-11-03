<template>
  <div
    class="p-padding-36 border-bg-bg-outline flex w-[320px] cursor-pointer flex-col items-center justify-center rounded-[10px] border"
    @click="emit('click')"
  >
    <div :class="colorClasses[props.color] + ' p-padding-16 rounded-[10px]'">
      <BaseIcon :name="props.icon" size="md" color="white" />
    </div>
    <div class="mt-size-24 gap-size-12 flex flex-col text-center">
      <span class="text-font-18 font-semibold">{{ props.title }}</span>
      <span class="text-font-14" v-html="props.description"></span>
    </div>
    <div
      class="p-padding-16 bg-bg-bg-innerframe mt-size-24 gap-size-12 flex w-full flex-col rounded-md"
    >
      <div
        class="gap-size-4 text-default-muted-dark flex items-center"
        v-for="(info, index) in props.info"
        :key="index"
      >
        <BaseIcon :name="info.icon" size="sm" color="gray" />
        <span class="text-font-13">{{ info.text }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TransferMenuItem } from '@/components/accountManagement/accountManagement';
import { BaseIcon } from '@template/ui';
import { computed } from 'vue';

const props = defineProps<TransferMenuItem>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const colorClasses = computed(() => ({
  blue: 'bg-gradient-to-br-blue',
  green: 'bg-gradient-to-br-green',
  red: 'bg-gradient-to-br-red',
}));
</script>
