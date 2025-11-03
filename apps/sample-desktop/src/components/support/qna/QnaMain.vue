<template>
  <div class="gap-size-16 pb-padding-130 flex flex-col">
    <QnaRegister v-if="type === 'register'" v-model:type="type" />
    <QnaDetail v-else-if="type === 'detail'" v-model:type="type" />
    <QnaList v-else v-model:type="type" />
  </div>
</template>
<script setup lang="ts">
import QnaRegister from '@/components/support/qna/QnaRegister.vue';
import QnaDetail from '@/components/support/qna/QnaDetail.vue';
import QnaList from '@/components/support/qna/QnaList.vue';
import { ref } from 'vue';

const type = ref<'register' | 'detail' | null>(null);
</script>
