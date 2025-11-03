<template>
  <div class="gap-size-24 flex">
    <div>
      <img class="h-[80px] w-auto" :src="props.imageSrc" :alt="props.imageAlt" />
    </div>
    <div class="gap-size-8 flex flex-col">
      <div class="gap-size-8 flex items-center">
        <span class="text-font-16 font-semibold">{{ props.title }}</span>
        <div v-if="props.link" class="cursor-pointer">
          <BaseIcon name="external-link" size="md" />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseIcon } from '@template/ui';

interface Props {
  imageSrc: string;
  imageAlt: string;
  title: string;
  link?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  imageSrc: '',
  imageAlt: '',
  title: '',
  link: false,
});
</script>
