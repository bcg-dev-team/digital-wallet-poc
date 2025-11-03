<!-- BaseList - 리스트 컨테이너 컴포넌트 -->
<script setup lang="ts">
/**
 * BaseList - 리스트 컨테이너 컴포넌트
 *
 * 이 컴포넌트는 BaseListItem들을 자식으로 받아서 리스트를 구성합니다.
 * 단독으로 사용할 수 없으며, 반드시 BaseListItem들을 포함해야 합니다.
 *
 * @props subheader - 서브헤더 텍스트

 * @props gap - 리스트 아이템 간격 (CSS gap 값)
 */
import { computed } from 'vue';

interface Props {
  /** 서브헤더 텍스트 */
  subheader?: string;
  /** 리스트 아이템 간격 (CSS gap 값) */
  gap?: string;
}

const props = withDefaults(defineProps<Props>(), {
  gap: '0px',
});

/**
 * 리스트 클래스 계산
 */
const listClasses = computed(() => {
  const classes = ['base-list'];

  return classes.join(' ');
});

/**
 * 리스트 스타일 계산
 */
const listStyles = computed(() => {
  return {
    '--list-gap': props.gap,
  };
});
</script>

<template>
  <ul :class="listClasses" :style="listStyles" role="list">
    <!-- 서브헤더 -->
    <div v-if="subheader" class="base-list__subheader" role="heading" aria-level="3">
      {{ subheader }}
    </div>

    <!-- 리스트 아이템들 -->
    <div class="base-list__items">
      <slot />
    </div>
  </ul>
</template>
