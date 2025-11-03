<!--
  Figma 컴포넌트: ImageSkeleton (이미지 + 텍스트)
  이미지와 텍스트 콘텐츠를 함께 표시하는 스켈레톤 컴포넌트
  Flowbite Image placeholder 예제 기반
-->
<script setup lang="ts">
import SkeletonIcons from './SkeletonIcons.vue';
import BaseSkeleton from './BaseSkeleton.vue';

/**
 * ImageSkeleton - 이미지 + 텍스트 스켈레톤 컴포넌트
 * @props showImage - 이미지 영역 표시 여부
 * @props showTitle - 제목 영역 표시 여부
 * @props showDescription - 설명 영역 표시 여부
 * @props imageHeight - 이미지 높이
 * @props imageWidth - 이미지 너비 (sm, md, lg, full)
 * @figma ImageSkeleton (node-id: TBD)
 */
interface Props {
  /** 이미지 영역 표시 여부 */
  showImage?: boolean;
  /** 제목 영역 표시 여부 */
  showTitle?: boolean;
  /** 설명 영역 표시 여부 */
  showDescription?: boolean;
  /** 이미지 높이 */
  imageHeight?: string;
  /** 이미지 너비 */
  imageWidth?: 'sm' | 'md' | 'lg' | 'full';
}

const props = withDefaults(defineProps<Props>(), {
  showImage: true,
  showTitle: true,
  showDescription: true,
  imageHeight: '200px',
  imageWidth: 'md',
});

const getImageWidth = () => {
  switch (props.imageWidth) {
    case 'sm':
      return '200px';
    case 'lg':
      return '400px';
    case 'full':
      return '100%';
    default:
      return '300px';
  }
};
</script>

<template>
  <div class="image-skeleton" role="status">
    <div class="image-skeleton-container">
      <!-- 이미지 영역 -->
      <div v-if="props.showImage" class="image-skeleton-image-container">
        <BaseSkeleton
          :width="getImageWidth()"
          :height="props.imageHeight"
          variant="rectangular"
          class="image-skeleton-image"
        />
        <!-- 이미지 아이콘 (중앙) -->
        <div class="image-skeleton-icon">
          <SkeletonIcons type="image" size="md" />
        </div>
      </div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>

<style scoped>
.image-skeleton {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .image-skeleton-container {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
  }
}

.image-skeleton-image-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.image-skeleton-image {
  border-radius: var(--radius-sm);
}

.image-skeleton-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.image-skeleton-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.image-skeleton-title {
  margin-bottom: 0.5rem;
}

.image-skeleton-description {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.image-skeleton-line {
  margin-bottom: 0.25rem;
}
</style>
