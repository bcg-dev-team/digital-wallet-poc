<template>
  <div class="gap-size-24 gap-size-16 flex">
    <MainCardContent
      class="border-bg-bg-outline h-[689px] w-[300px] flex-shrink-0 border p-6"
      title="검색 및 필터"
      size="sm"
    >
      <template #content>
        <div class="gap-size-16 flex flex-col">
          <LabelContent label="선택 계좌" size="custom" class="text-font-13">
            <template #content>
              <BaseInput size="sm" type="text" placeholder="계좌를 선택해주세요" />
            </template>
          </LabelContent>
          <LabelContent label="선택 계좌" size="custom" class="text-font-13">
            <template #content>
              <BaseInput size="sm" type="text" placeholder="계좌를 선택해주세요" />
            </template>
          </LabelContent>
          <LabelContent label="선택 계좌" size="custom" class="text-font-13">
            <template #content>
              <BaseInput size="sm" type="text" placeholder="계좌를 선택해주세요" />
            </template>
          </LabelContent>
        </div>
        <div class="mt-size-24">
          <BaseButton
            variant="outlined"
            :leftIcon="{ name: 'refresh', size: 'md', color: 'var(--input-icon-off-dark)' }"
            size="md"
            color="white"
            label="필터 초기화"
            fullWidth
          />
        </div>
      </template>
    </MainCardContent>
    <MainCardContent
      class="border-bg-bg-outline w-full border p-6"
      title="거래내역"
      size="sm"
    ></MainCardContent>
  </div>
</template>
<script setup lang="ts">
import MainCardContent from '@/components/common/cards/MainCardContent.vue';
import LabelContent from '@/components/common/LabelContent.vue';
import { BaseButton, BaseInput } from '@template/ui';
</script>
