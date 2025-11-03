<template>
  <div class="mx-auto w-[1920px]">
    <img :src="isDark ? investDarkImage : investLightImage" alt="investment warning" />
  </div>
</template>
<script setup lang="ts">
import { investLightImage, investDarkImage, useTheme } from '@template/ui';
const { isDark } = useTheme();
</script>
