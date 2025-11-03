<template>
  <Menu as="div" class="relative inline-block">
    <div>
      <MenuButton>
        <slot name="trigger" />
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="z-dropdown base-menu__items absolute left-1/2 mt-2 flex !w-[160px] w-full -translate-x-1/2 flex-col overflow-hidden rounded-md bg-[var(--background-bg-default)]"
      >
        <MenuItem
          class="base-menu__item"
          v-for="item in props.items"
          :key="item.label"
          @click="handleItemClick(item)"
        >
          <div class="base-menu__item-content">
            <BaseIcon
              v-if="props.showIcons && item.icon"
              :name="item.icon"
              size="sm"
              color="var(--font-color-default)"
            />
            <span class="base-menu__item-text">{{ item.label }}</span>
          </div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

<!-- BaseMenu - 드롭다운 메뉴 컴포넌트 -->
<script setup lang="ts">
/**
 * BaseMenu - 드롭다운 메뉴 컴포넌트
 *
 * Headless UI의 Menu 컴포넌트를 기반으로 한 드롭다운 메뉴입니다.
 * 트리거 슬롯을 통해 어떤 요소든 메뉴를 여는 버튼으로 사용할 수 있습니다.
 *
 * @props items - 메뉴 아이템 배열
 * @props showIcons - 아이콘 표시 여부
 */
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import BaseIcon from '../BaseIcon/BaseIcon.vue';

/**
 * 메뉴 아이템 타입 정의
 */
interface MenuItemType {
  /** 메뉴 아이템 라벨 */
  label: string;
  /** 아이콘 이름 (showIcons가 true일 때 사용) */
  icon?: any;
  /** 메뉴 아이템 값 (선택 시 emit될 값) */
  value?: any;
}

interface Props {
  /** 메뉴 아이템 배열 */
  items: MenuItemType[];
  /** 아이콘 표시 여부 */
  showIcons?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showIcons: false,
});

/**
 * 메뉴 아이템 선택 이벤트 emit
 */
const emit = defineEmits<{
  (e: 'select', item: MenuItemType): void;
}>();

/**
 * 메뉴 아이템 클릭 핸들러
 */
const handleItemClick = (item: MenuItemType) => {
  emit('select', item);
};
</script>
