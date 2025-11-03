<template>
  <MainCardContent class="p-padding-24 !bg-bg-bg-innerframe w-[900px] border-none">
    <template #content>
      <div>
        <div>
          <span class="text-font-16 font-semibold">{{ props.title }}</span>
        </div>
        <div class="mt-size-12 gap-size-16 gap-size-48 flex">
          <div class="gap-size-48 grid w-full grid-cols-2">
            <ul class="gap-size-16 px-size-16 flex w-full flex-col">
              <li
                v-for="item in resultList.first"
                :key="item.label"
                class="items-cneter flex w-full justify-between"
              >
                <span class="text-default-muted-dark">{{ item.label }}</span>
                <span class="font-medium">{{ item.value }}</span>
              </li>
            </ul>
            <ul class="gap-size-16 px-size-16 flex w-full flex-col">
              <li
                v-for="item in resultList.second"
                :key="item.label"
                class="items-cneter flex w-full justify-between"
              >
                <span class="text-default-muted-dark">{{ item.label }}</span>
                <span
                  class="font-medium"
                  :class="{ 'text-[var(--chips-status-pending-text)]': item.highlight }"
                  >{{ item.value }}</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </MainCardContent>
</template>

<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';

const props = defineProps<{
  title: string;
  resultList: {
    first: Array<{ label: string; value: string }>;
    second: Array<{ label: string; value: string; highlight?: boolean }>;
  };
}>();
</script>
