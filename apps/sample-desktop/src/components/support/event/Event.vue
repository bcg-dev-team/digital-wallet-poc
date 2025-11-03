<template>
  <div class="gap-size-64 flex">
    <div class="gap-size-16 flex min-w-[500px] flex-col">
      <div class="gap-size-4 flex w-[180px] items-center">
        <BaseRadioGroup v-model="selectedValue" :options="options" />
      </div>
      <div class="w-[500px]">
        <EventList :list="selectedEventList" />
      </div>
    </div>
    <SupportDetail
      :chip="{ label: '이벤트', variant: 'grey' }"
      date="2025.05.01 ~ 2025.05.31"
      title="2025 해외선물옵션 환전우대 이벤트!"
      content="(이벤트 이미지 출력)"
    />
  </div>
</template>

<script setup lang="ts">
import SupportDetail from '@/components/support/common/SupportDetail.vue';
import EventList from '@/components/support/event/EventList.vue';
import EventTempImg from '@/assets/image/temp/event-temp.png';
import { BaseRadioGroup } from '@template/ui';
import { ref, computed } from 'vue';

const selectedValue = ref('inProgress');

const options = [
  {
    value: 'inProgress',
    label: '진행중',
  },
  {
    value: 'end',
    label: '종료',
  },
  {
    value: 'all',
    label: '전체',
  },
];

const eventList = [
  {
    image: EventTempImg,
    active: true,
  },
  {
    image: EventTempImg,
    active: false,
  },

  {
    image: EventTempImg,
    active: false,
  },
  {
    image: EventTempImg,
    active: true,
  },
];

const selectedEventList = computed(() => {
  if (selectedValue.value === 'inProgress') {
    return eventList.filter((item) => item.active);
  } else if (selectedValue.value === 'end') {
    return eventList.filter((item) => !item.active);
  } else {
    return eventList;
  }
});
</script>
