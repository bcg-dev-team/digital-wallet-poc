<template>
  <div class="gap-size-4 flex flex-col">
    <span class="text-font-14 font-medium">{{ props.label }}</span>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();
</script>
