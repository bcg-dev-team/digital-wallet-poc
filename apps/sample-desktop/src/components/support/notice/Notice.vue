<template>
  <div class="gap-size-64 flex">
    <div class="gap-size-16 flex min-w-[500px] flex-col">
      <div class="gap-size-4 flex items-center">
        <BaseInputSelect v-model="selectedAccount" :options="accountOptions" />
        <BaseInput placeholder="검색어 입력 후 Enter" size="sm" />
      </div>
      <div>
        <BaseList>
          <BaseListItem clickable selected divider>
            <template #content>
              <div class="gap-size-8 flex flex-col">
                <div class="">
                  <BaseChip
                    label="시스템작업"
                    size="md"
                    rounded="rounded-sm"
                    textColor="text-footer"
                    backgroundColor="var(--table-chip-background)"
                  />
                  <span class="ml-size-12 text-font-13 text-default-muted font-normal">
                    2025.05.26
                  </span>
                </div>
                <div>
                  <span class="text-font-15 font-medium">
                    원장 시스템 작업으로 인한 일부 업무 중단 안내(5/24)
                  </span>
                </div>
              </div>
            </template>
          </BaseListItem>
          <BaseListItem clickable divider>
            <template #content>
              <div class="gap-size-8 flex flex-col">
                <div class="">
                  <BaseChip
                    label="업무공지"
                    size="md"
                    rounded="rounded-sm"
                    textColor="text-footer"
                    backgroundColor="var(--table-chip-background)"
                  />
                  <span class="ml-size-12 text-font-13 text-default-muted font-normal">
                    2025.05.26
                  </span>
                </div>
                <div>
                  <span class="text-font-15 font-medium">
                    원장 시스템 작업으로 인한 일부 업무 중단 안내(5/24)
                  </span>
                </div>
              </div></template
            >
          </BaseListItem>
          <BaseListItem clickable divider>
            <template #content>
              <div class="gap-size-8 flex flex-col">
                <div class="">
                  <BaseChip
                    label="기타"
                    size="md"
                    rounded="rounded-sm"
                    textColor="text-footer"
                    backgroundColor="var(--table-chip-background)"
                  />
                  <span class="ml-size-12 text-font-13 text-default-muted font-normal">
                    2025.05.26
                  </span>
                </div>
                <div>
                  <span class="text-font-15 font-medium">
                    원장 시스템 작업으로 인한 일부 업무 중단 안내(5/24)
                  </span>
                </div>
              </div>
            </template>
          </BaseListItem>
          <BaseListItem clickable divider>
            <template #content>
              <div class="gap-size-8 flex flex-col">
                <div class="">
                  <BaseChip
                    label="업무공지"
                    size="md"
                    rounded="rounded-sm"
                    textColor="text-footer"
                    backgroundColor="var(--table-chip-background)"
                  />
                  <span class="ml-size-12 text-font-13 text-default-muted font-normal">
                    2025.05.26
                  </span>
                </div>
                <div>
                  <span class="text-font-15 font-medium">
                    원장 시스템 작업으로 인한 일부 업무 중단 안내(5/24)
                  </span>
                </div>
              </div>
            </template>
          </BaseListItem>
          <BaseListItem clickable divider>
            <template #content>
              <div class="gap-size-8 flex flex-col">
                <div class="">
                  <BaseChip
                    label="기타"
                    size="md"
                    rounded="rounded-sm"
                    textColor="text-footer"
                    backgroundColor="var(--table-chip-background)"
                  />
                  <span class="ml-size-12 text-font-13 text-default-muted font-normal">
                    2025.05.26
                  </span>
                </div>
                <div>
                  <span class="text-font-15 font-medium">
                    원장 시스템 작업으로 인한 일부 업무 중단 안내(5/24)
                  </span>
                </div>
              </div>
            </template>
          </BaseListItem>
          <BaseListItem clickable divider>
            <template #content>
              <div class="gap-size-8 flex flex-col">
                <div class="">
                  <BaseChip
                    label="기타"
                    size="md"
                    rounded="rounded-sm"
                    textColor="text-footer"
                    backgroundColor="var(--table-chip-background)"
                  />
                  <span class="ml-size-12 text-font-13 text-default-muted font-normal">
                    2025.05.26
                  </span>
                </div>
                <div>
                  <span class="text-font-15 font-medium">
                    원장 시스템 작업으로 인한 일부 업무 중단 안내(5/24)
                  </span>
                </div>
              </div>
            </template>
          </BaseListItem>
          <BaseListItem clickable divider>
            <template #content>
              <div class="gap-size-8 flex flex-col">
                <div class="">
                  <BaseChip
                    label="기타"
                    size="md"
                    rounded="rounded-sm"
                    textColor="text-footer"
                    backgroundColor="var(--table-chip-background)"
                  />
                  <span class="ml-size-12 text-font-13 text-default-muted font-normal">
                    2025.05.26
                  </span>
                </div>
                <div>
                  <span class="text-font-15 font-medium">
                    원장 시스템 작업으로 인한 일부 업무 중단 안내(5/24)
                  </span>
                </div>
              </div>
            </template>
          </BaseListItem>
        </BaseList>
      </div>
    </div>
    <SupportDetail
      :chip="{ label: '업무공지', variant: 'grey' }"
      :date="'2025.05.26'"
      title="신용공여종목군 및 위탁증거금률 변경 안내(현대건설 외 3종목)"
      content="내용 영역"
    />
  </div>
</template>

<script setup lang="ts">
import { BaseInput, BaseList, BaseListItem, BaseChip, BaseInputSelect } from '@template/ui';
import SupportDetail from '@/components/support/common/SupportDetail.vue';
import { ref } from 'vue';

const selectedAccount = ref('전체');
const accountOptions = [
  { value: '전체', label: '전체' },
  { value: 'account2', label: '라이브계좌#2 110-81-345151' },
  { value: 'account3', label: '데모계좌#1 110-81-345152' },
];
</script>
