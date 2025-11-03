<template>
  <div class="mx-auto w-[1920px]">
    <img :src="isDark ? privacyDarkImage : privacyLightImage" alt="privacy policy" />
  </div>
</template>
<script setup lang="ts">
import { privacyLightImage, privacyDarkImage, useTheme } from '@template/ui';

const { isDark } = useTheme();
</script>
