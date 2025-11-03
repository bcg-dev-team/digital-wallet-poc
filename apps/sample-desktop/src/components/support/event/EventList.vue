<template>
  <BaseList gap="16px">
    <BaseListItem clickable selected v-for="item in props.list" :key="item.image">
      <template #content>
        <img
          :src="item.image"
          alt="event-list"
          class="w-full"
          :class="{ grayscale: !item.active }"
        />
      </template>
    </BaseListItem>
  </BaseList>
</template>

<script setup lang="ts">
import { BaseList, BaseListItem } from '@template/ui';

const props = defineProps<{
  list: {
    image: string;
    active: boolean;
  }[];
}>();
</script>

<style scoped lang="scss">
:deep(.list-item) {
  padding: 0;
  overflow: hidden;
  border-radius: 16px;

  // 이미지가 전체 영역을 차지하도록 설정
  .list-item__content {
    padding: 0;
    margin: 0;

    img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
    }
  }

  // 선택된 상태
  &.list-item--selected {
    background-color: none !important;

    &:hover {
      background-color: none !important;
    }
  }
  // 클릭 가능한 스타일
  &.list-item--clickable {
    cursor: pointer;
    user-select: none;

    &:hover {
      opacity: 0.8 !important;
      background-color: none !important;
    }

    &:active {
      opacity: 0.5 !important;
      background-color: none !important;
    }

    &:focus {
      outline: none !important;
    }
  }
}
</style>
