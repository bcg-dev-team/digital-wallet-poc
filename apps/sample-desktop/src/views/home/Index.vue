<template>
  <div class="mx-auto mt-[22px] w-[1920px]">
    <div class="p-4">
      <!-- <CardLayoutVertical class="gap-3">
        <MainCardContent class="px-4 py-6"></MainCardContent>
        <CardLayoutHorizontal class="grid-cols-3 gap-3">
          <MainCardContent class="col-span-1 px-4 py-6" title="상위등락률">
            <template #title-right> :버튼: </template>
          </MainCardContent>
          <MainCardContent class="col-span-1 px-4 py-6" title="주요글로벌인덱스">
            <template #title-right> :버튼: </template>
          </MainCardContent>
          <MainCardContent class="col-span-1 px-4 py-6" title="해외뉴스">
            <template #title-right> :버튼: </template>
          </MainCardContent>
        </CardLayoutHorizontal>
        <MainCardContent
          class="px-4 py-6"
          title="쉽게 읽는 투자정보"
          :isLink="true"
        ></MainCardContent>
      </CardLayoutVertical> -->
      <img :src="isDark ? homeDarkImage : homeLightImage" alt="home" />
    </div>
  </div>
</template>
<script setup lang="ts">
import CardLayoutHorizontal from '@/components/layout/fragments/CardLayoutHorizontal.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { homeLightImage, homeDarkImage, useTheme } from '@template/ui';

const { isDark } = useTheme();
</script>
