<!--
  Figma 컴포넌트: CardSkeleton (카드 형태)
  카드 형태의 스켈레톤을 지원하는 컴포넌트
  피그마 디자인 토큰 기반으로 구현
-->
<script setup lang="ts">
import SkeletonIcons from './SkeletonIcons.vue';
import TextSkeleton from './TextSkeleton.vue';
import BaseSkeleton from './BaseSkeleton.vue';

/**
 * CardSkeleton - 카드 형태 스켈레톤 컴포넌트
 * @props showImage - 이미지 영역 표시 여부
 * @props showTitle - 제목 영역 표시 여부
 * @props showDescription - 설명 영역 표시 여부
 * @props showActions - 액션 버튼 영역 표시 여부
 * @figma CardSkeleton (node-id: TBD)
 */
interface Props {
  /** 이미지 영역 표시 여부 */
  showImage?: boolean;
  /** 제목 영역 표시 여부 */
  showTitle?: boolean;
  /** 설명 영역 표시 여부 */
  showDescription?: boolean;
  /** 액션 버튼 영역 표시 여부 */
  showActions?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showImage: true,
  showTitle: true,
  showDescription: true,
  showActions: true,
});
</script>

<template>
  <div class="card-skeleton">
    <!-- 이미지 영역 -->
    <div v-if="props.showImage" class="card-skeleton-image-container">
      <BaseSkeleton width="100%" height="200px" variant="rectangular" class="card-skeleton-image" />
      <!-- 이미지 아이콘 (중앙) -->
      <div class="card-skeleton-image-icon">
        <SkeletonIcons type="image" size="md" />
      </div>
    </div>

    <!-- 콘텐츠 영역 -->
    <div class="card-skeleton-content">
      <!-- 제목 -->
      <BaseSkeleton
        v-if="props.showTitle"
        width="70%"
        height="1.5rem"
        variant="text"
        class="card-skeleton-title"
      />

      <!-- 설명 -->
      <TextSkeleton
        v-if="props.showDescription"
        :lines="2"
        :last-line-width="80"
        class="card-skeleton-description"
      />

      <!-- 액션 버튼들 -->
      <div v-if="props.showActions" class="card-skeleton-actions">
        <BaseSkeleton
          width="80px"
          height="2rem"
          variant="rectangular"
          class="card-skeleton-button"
        />
        <BaseSkeleton
          width="60px"
          height="2rem"
          variant="rectangular"
          class="card-skeleton-button"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-skeleton {
  border: 1px solid var(--base-colors-neutral-neutral200);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--base-colors-common-bg-surface-default);

  .dark & {
    border-color: var(--base-colors-neutral-neutral700);
    background: var(--base-colors-common-bg-surface-dark);
  }
}

.card-skeleton-image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-skeleton-image {
  border-radius: 0;
}

.card-skeleton-image-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.card-skeleton-content {
  padding: var(--padding-padding-16);
  display: flex;
  flex-direction: column;
  gap: var(--padding-padding-12);
}

.card-skeleton-title {
  margin-bottom: var(--padding-padding-8);
}

.card-skeleton-description {
  margin-bottom: var(--padding-padding-12);
}

.card-skeleton-actions {
  display: flex;
  gap: var(--padding-padding-12);
  margin-top: auto;
}

.card-skeleton-button {
  border-radius: var(--radius-sm);
}

/* 다크 모드 대응 */
.dark .card-skeleton-image-icon svg {
  color: var(--base-colors-neutral-neutral600);
}
</style>
