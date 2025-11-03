<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import BaseIcon from '../BaseIcon/BaseIcon.vue';
import { computed } from 'vue';

/**
 * BaseDisclosure 컴포넌트의 Props 타입 정의
 */
interface Props {
  /** 기본적으로 열려있는지 여부 */
  defaultOpen?: boolean;
  /** 버튼에 표시될 텍스트 */
  buttonText?: string;
  /** 패널에 표시될 내용 */
  panelContent?: string;
  /** 커스텀 스타일 사용 여부 */
  custom?: boolean;
  /** 버튼 색상 테마 */
  color?: 'red' | 'blue' | 'gray' | 'purple';
  /** 커스텀 모드에서 화살표 표시 여부 */
  showArrow?: boolean;
  /** 커스텀 모드에서 화살표 오른쪽 위치 (px) */
  arrowPosition?: number;
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
  buttonText: '',
  panelContent: '',
  custom: false,
  color: 'gray',
  showArrow: true,
  arrowPosition: 16,
});

/**
 * 색상별 버튼 스타일 클래스
 */
const colorClasses = {
  red: {
    button: 'bg-red-100 text-red-900 hover:bg-red-200 focus-visible:ring-red-500',
    icon: 'text-red-500',
  },
  blue: {
    button: 'bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500',
    icon: 'text-blue-500',
  },
  gray: {
    button: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
    icon: 'text-gray-500',
  },
  purple: {
    button: 'bg-purple-100 text-purple-900 hover:bg-purple-200 focus-visible:ring-purple-500',
    icon: 'text-purple-500',
  },
};

/**
 * 기본 버튼 스타일 클래스를 계산하는 computed
 */
const defaultButtonClasses = computed(() => {
  const baseClasses =
    'flex items-center w-full justify-between rounded-md px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75';
  const colorClass = colorClasses[props.color];
  return `${baseClasses} ${colorClass.button}`;
});

/**
 * 아이콘 색상 클래스를 계산하는 computed
 */
const iconColorClass = computed(() => {
  return colorClasses[props.color].icon;
});

/**
 * 화살표 위치 스타일을 계산하는 computed
 */
const arrowPositionStyle = computed(() => {
  return {
    right: `${props.arrowPosition}px`,
  };
});

/**
 * 기본 패널 스타일 클래스
 */
const defaultPanelClasses = 'px-4 pb-2 pt-4 text-sm text-gray-500 w-full';
</script>

<template>
  <Disclosure
    :default-open="props.defaultOpen"
    as="div"
    class="block w-full min-w-0"
    v-slot="{ open }"
  >
    <!-- 커스텀 모드: slot 사용 -->
    <template v-if="custom">
      <DisclosureButton as="div" class="relative block w-full min-w-0">
        <slot name="button" />
        <div
          v-if="showArrow"
          class="absolute top-1/2 flex-shrink-0 -translate-y-1/2 transform"
          :style="arrowPositionStyle"
        >
          <BaseIcon name="arrow-down" :className="`h-5 w-5 ${!open ? 'hidden' : 'block'}`" />
          <BaseIcon name="arrow-up" :className="`h-5 w-5 ${open ? 'hidden' : 'block'}`" />
        </div>
      </DisclosureButton>

      <DisclosurePanel as="div" class="block w-full min-w-0">
        <slot name="panel" />
      </DisclosurePanel>
    </template>

    <!-- 기본 모드: 기본 스타일 제공 -->
    <template v-else>
      <DisclosureButton :class="defaultButtonClasses" as="div">
        <span class="min-w-0 flex-1">{{ buttonText }}</span>
        <BaseIcon name="arrow-down" :className="`h-5 w-5 ${!open ? 'hidden' : 'block'}`" />
        <BaseIcon name="arrow-up" :className="`h-5 w-5 ${open ? 'hidden' : 'block'}`" />
      </DisclosureButton>

      <DisclosurePanel :class="defaultPanelClasses" as="div">
        {{ panelContent }}
      </DisclosurePanel>
    </template>
  </Disclosure>
</template>
