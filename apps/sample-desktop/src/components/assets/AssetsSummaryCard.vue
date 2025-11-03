<template>
  <div class="bg-bg-bg-innerframe w-[240px] rounded-md">
    <div v-if="title || $slots.title">
      <span v-if="title" class="text-md leading-xl font-semibold tracking-wide">{{
        props.title
      }}</span>
      <slot name="title" />
    </div>
    <div>
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface MainCardContentProps {
  title?: string;
}

const props = withDefaults(defineProps<MainCardContentProps>(), {
  title: '',
});
</script>
