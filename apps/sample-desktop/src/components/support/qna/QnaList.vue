<template>
  <div class="gap-size-16 flex flex-col">
    <BaseTable
      :headers="headers"
      :data="data"
      :selectable="selectable"
      :sortable="sortable"
      @sort="handleSort"
      @rowSelect="handleRowSelect"
    />
    <div class="flex justify-end">
      <BaseButton label="1:1 문의하기" size="sm" variant="contained" @click="type = 'register'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableHeader, TableRow } from '@template/ui';
import { BaseButton, BaseTable } from '@template/ui';

const type = defineModel<null | 'register' | 'detail'>('type', { required: true });

const headers: TableHeader[] = [
  { key: 'no', title: '번호', width: '100px', align: 'center' },
  { key: 'category', title: '카테고리', width: '160px', align: 'center' },
  { key: 'title', title: '제목', align: 'center' },
  { key: 'createAt', title: '작성일시', width: '200px', align: 'center' },
  { key: 'answerAt', title: '답변일시', width: '200px', align: 'center' },
  { key: 'state', title: '답변상태', width: '200px', align: 'center' },
];

const data: TableRow[] = [
  {
    id: 1,
    no: '1',
    category: '출금',
    title: '20,000',
    createAt: '2025-05-22 14:02:10',
    answerAt: '2025-05-22 14:02:15',
    state: '답변대기',
  },
  {
    id: 2,
    no: '2',
    category: '출금',
    title: '20,000',
    createAt: '2025-05-13 13:30:57',
    answerAt: '2025-05-15 13:30:57',
    state: '답변완료',
  },
];

const selectable = true;
const sortable = true;

const handleSort = (key: string, direction: 'asc' | 'desc') => {
  console.log(`Sorting by ${key} in ${direction} direction`);
};

const handleRowSelect = () => {
  type.value = 'detail';
};
</script>
