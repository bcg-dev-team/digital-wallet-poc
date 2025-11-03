<!--
  Figma 컴포넌트: ListSkeleton (리스트 형태)
  리스트 아이템들을 표시하는 스켈레톤 컴포넌트
  Flowbite List placeholder 예제 기반
-->
<script setup lang="ts">
import IconSkeleton from './IconSkeleton.vue';
import BaseSkeleton from './BaseSkeleton.vue';

/**
 * ListSkeleton - 리스트 스켈레톤 컴포넌트
 * @props items - 리스트 아이템 수
 * @props showAvatar - 아바타 표시 여부
 * @props showSubtitle - 부제목 표시 여부
 * @props showAction - 액션 버튼 표시 여부
 * @props variant - 리스트 스타일 (default, bordered, card)
 * @figma ListSkeleton (node-id: TBD)
 */
interface Props {
  /** 리스트 아이템 수 */
  items?: number;
  /** 아바타 표시 여부 */
  showAvatar?: boolean;
  /** 부제목 표시 여부 */
  showSubtitle?: boolean;
  /** 액션 버튼 표시 여부 */
  showAction?: boolean;
  /** 리스트 스타일 */
  variant?: 'default' | 'bordered' | 'card';
}

const props = withDefaults(defineProps<Props>(), {
  items: 5,
  showAvatar: true,
  showSubtitle: true,
  showAction: true,
  variant: 'default',
});

const itemArray = Array.from({ length: props.items }, (_, i) => i);
</script>

<template>
  <div class="list-skeleton" role="status">
    <div :class="['list-skeleton-container', `list-skeleton-${props.variant}`]">
      <div
        v-for="(item, index) in itemArray"
        :key="`list-item-${index}`"
        :class="[
          'list-skeleton-item',
          {
            'list-skeleton-item-bordered':
              props.variant === 'bordered' && index < itemArray.length - 1,
          },
        ]"
      >
        <div class="list-skeleton-item-content">
          <!-- 아바타 (IconSkeleton 사용) -->
          <IconSkeleton v-if="props.showAvatar" size="md" class="list-skeleton-avatar" />

          <!-- 텍스트 콘텐츠 -->
          <div class="list-skeleton-text">
            <!-- 제목 -->
            <BaseSkeleton width="120px" height="16px" variant="text" class="list-skeleton-title" />

            <!-- 부제목 -->
            <BaseSkeleton
              v-if="props.showSubtitle"
              width="80px"
              height="12px"
              variant="text"
              class="list-skeleton-subtitle"
            />
          </div>
        </div>

        <!-- 액션 버튼 -->
        <BaseSkeleton
          v-if="props.showAction"
          width="60px"
          height="16px"
          variant="text"
          class="list-skeleton-action"
        />
      </div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<style scoped>
.list-skeleton {
  display: flex;
  flex-direction: column;
}

.list-skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Default variant */
.list-skeleton-default {
  gap: 1.5rem;
}

/* Bordered variant */
.list-skeleton-bordered {
  border: 1px solid var(--base-colors-neutral-neutral200);
  border-radius: var(--radius-sm);
  overflow: hidden;

  .dark & {
    border-color: var(--base-colors-neutral-neutral700);
  }
}

.list-skeleton-item-bordered {
  border-bottom: 1px solid var(--base-colors-neutral-neutral200);

  .dark & {
    border-bottom-color: var(--base-colors-neutral-neutral700);
  }
}

/* Card variant */
.list-skeleton-card {
  gap: 1rem;
}

.list-skeleton-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  gap: 1.25rem;
}

.list-skeleton-item-content {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex: 1;
}

.list-skeleton-avatar {
  flex-shrink: 0;
}

.list-skeleton-text {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.list-skeleton-title {
  margin-bottom: 0.5rem;
}

.list-skeleton-subtitle {
  margin-bottom: 0;
}

.list-skeleton-action {
  flex-shrink: 0;
}
</style>
