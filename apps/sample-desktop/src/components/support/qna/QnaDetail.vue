<template>
  <div class="gap-size-48 flex flex-col">
    <div>
      <div>
        <span class="text-font-20 font-semibold">문의 내용</span>
      </div>
      <div class="mt-size-8">
        <div class="grid grid-cols-2 border-t border-[var(--table-type2-body-border)]">
          <TableLabel title="제목">
            <BaseChip class="mr-size-10" label="답변완료" variant="red" size="md" />
            출금신청이 잘 됐는지 문의드립니다!
          </TableLabel>
          <TableLabel title="작성일시">2025.05.25 09:15:46</TableLabel>
        </div>
        <div class="border-t border-[var(--table-type2-body-border)]">
          <TableLabel title="카테고리">출금/이체</TableLabel>
        </div>
        <div class="border-t border-[var(--table-type2-body-border)]">
          <TableLabel title="내용">
            <div class="min-h-size-200 p-size-24">
              출금신청이 잘 되었는지 모르겠어서 문의드립니다.<br />
              신청 이름: 김주석<br />
              신한은행 110-81-2301410
            </div>
          </TableLabel>
        </div>
        <div class="border-b border-t border-[var(--table-type2-body-border)]">
          <TableLabel title="첨부파일">
            <Anchor @click="() => console.log('첨부파일 클릭!')">
              20250601_Screenshot_14.00.01.jpg
            </Anchor>
          </TableLabel>
        </div>
      </div>
    </div>
    <div>
      <div>
        <span class="text-font-20 font-semibold">관리자 답변</span>
      </div>
      <div class="mt-size-8">
        <div class="grid grid-cols-2 border-t border-[var(--table-type2-body-border)]">
          <TableLabel title="제목"> 답변 드립니다. </TableLabel>
          <TableLabel title="작성일시">2025.05.25 09:15:46</TableLabel>
        </div>
        <div class="border-t border-[var(--table-type2-body-border)]">
          <TableLabel title="카테고리">출금/이체</TableLabel>
        </div>
        <div class="border-t border-[var(--table-type2-body-border)]">
          <TableLabel title="내용">
            <div class="min-h-size-200 p-size-24"></div>
          </TableLabel>
        </div>
        <div class="border-b border-t border-[var(--table-type2-body-border)]">
          <TableLabel title="첨부파일">
            <Anchor @click="() => console.log('첨부파일 클릭!')"> </Anchor>
          </TableLabel>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-size-24 flex justify-center">
    <BaseButton label="확인" size="lg" @click="type = null" />
  </div>
</template>
<script setup lang="ts">
import TableLabel from '@/components/support/qna/common/TableLabel.vue';
import Anchor from '@/components/common/Anchor.vue';
import { BaseButton, BaseChip } from '@template/ui';

const type = defineModel<null | 'register' | 'detail'>('type', { required: true });
</script>
