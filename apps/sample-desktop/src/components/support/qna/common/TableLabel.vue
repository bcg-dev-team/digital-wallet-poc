<template>
  <div class="flex">
    <div class="py-size-18 flex w-[130px] items-center bg-[var(--table-type2-header-bg)] pl-[15px]">
      <span class="text-font-13 font-medium">{{ props.title }}</span>
    </div>
    <div class="text-font-14 flex flex-grow items-center px-[15px]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>
