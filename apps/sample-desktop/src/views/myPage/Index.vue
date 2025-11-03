<template>
  <div class="mx-auto mt-[22px] w-[1440px]">
    <!-- <CardLayoutHorizontal :columns="[330, 680, 382]" gap="gap-6">
      <CardLayoutVertical gap="gap-3">
        <MainCardContent class="row-span-1">
          <template #content>
            <UserInfo />
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-2">
          <template #content>
            <UserAssetsInfo />
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-2 p-6">
          <template #content>
            <div class="my-[220px]">빠른실행</div>
          </template>
        </MainCardContent>
      </CardLayoutVertical>
      <CardLayoutVertical gap="gap-3">
        <MainCardContent class="row-span-2 p-6">
          <template #content>
            <div class="my-[220px]">개요|활동내역</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1 p-6">
          <template #content>
            <div class="my-[180px]">현재 포지션</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1 p-6">
          <template #content>
            <div class="my-[180px]">시장 뉴스</div>
          </template>
        </MainCardContent>
      </CardLayoutVertical>
      <CardLayoutVertical gap="gap-3">
        <MainCardContent class="row-span-1 p-6">
          <template #content>
            <div class="my-[100px]">공지사항</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1 p-6">
          <template #content>
            <div class="my-[100px]">자주 묻는 질문</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1 p-6">
          <template #content>
            <div class="my-[80px]">이번주 성과</div>
          </template>
        </MainCardContent>
        <MainCardContent class="row-span-1">
          <template #content>
            <div class="flex flex-col items-center justify-center gap-6 bg-[#19323f] p-6">
              <div class="rounded-md bg-[#eaecee33] p-3 text-white">:헤드셋 아이콘:</div>
              <div class="flex flex-col items-center justify-center gap-2 text-white">
                <span class="text-xl font-bold">도움이 필요하세요?</span>
                <span class="text-md font-medium">24시간 고객지원팀이 언제든 도와드립니다.</span>
              </div>
              <div class="flex w-full flex-col items-center justify-center gap-3">
                <div
                  class="flex h-[42px] w-full items-center justify-center rounded-sm bg-white px-5 py-[6px]"
                >
                  <span class="text-md font-medium">채팅 상담 버튼 영역</span>
                </div>
                <div
                  class="flex h-[42px] w-full items-center justify-center rounded-sm bg-white px-5 py-[6px]"
                >
                  <span class="text-md font-medium">전화 상담 버튼 영역</span>
                </div>
              </div>
            </div>
          </template>
        </MainCardContent>
      </CardLayoutVertical>
    </CardLayoutHorizontal> -->

    <img :src="isDark ? mypageDarkImage : mypageLightImage" alt="mypage" />
  </div>
</template>

<script setup lang="ts">
import CardLayoutHorizontal from '@/components/layout/fragments/CardLayoutHorizontal.vue';
import CardLayoutVertical from '@/components/layout/fragments/CardLayoutVertical.vue';
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import { mypageLightImage, mypageDarkImage, useTheme } from '@template/ui';
import UserAssetsInfo from '@/components/mypage/UserAssetsInfo.vue';
import UserInfo from '@/components/mypage/UserInfo.vue';

const { isDark } = useTheme();
</script>
