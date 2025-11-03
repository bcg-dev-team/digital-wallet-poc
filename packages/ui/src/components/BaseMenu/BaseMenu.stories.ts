/**
 * BaseMenu 컴포넌트 Storybook 스토리
 */
import BaseButton from '../BaseButton/BaseButton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseMenu from './BaseMenu.vue';

const meta: Meta<typeof BaseMenu> = {
  title: 'Menu/BaseMenu',
  component: BaseMenu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `BaseMenu는 Headless UI의 Menu 컴포넌트를 직접 사용하여 구현된 드롭다운 메뉴 컴포넌트입니다. 
        공식 예시를 기반으로 한 완전한 메뉴 구현체입니다.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 메뉴 (아이콘 없음)
export const Default: Story = {
  render: () => ({
    components: { BaseMenu, BaseButton },
    setup() {
      const menuItems = [
        {
          label: '마이페이지',
          value: 'mypage',
        },
        {
          label: '계좌 관리',
          value: 'account',
        },
        {
          label: '로그아웃',
          value: 'logout',
        },
      ];

      const handleSelect = (item: any) => {
        console.log('선택된 항목:', item);
      };

      return { menuItems, handleSelect };
    },
    template: `
      <div class="p-8">
        <BaseMenu :items="menuItems" @select="handleSelect">
          <template #trigger>
            <BaseButton
              variant="contained-grey"
              color="red"
              size="lg"
              label="메뉴"
            />
          </template>
        </BaseMenu> 
      </div>
    `,
  }),
};

// 아이콘이 있는 메뉴
export const WithIcons: Story = {
  render: () => ({
    components: { BaseMenu, BaseButton },
    setup() {
      const menuItems = [
        {
          label: '마이페이지',
          icon: 'person',
          value: 'mypage',
        },
        {
          label: '계좌 관리',
          icon: 'account-balance',
          value: 'account',
        },
        {
          label: '로그아웃',
          icon: 'logout',
          value: 'logout',
        },
      ];

      const handleSelect = (item: any) => {
        console.log('선택된 항목:', item);
      };

      return { menuItems, handleSelect };
    },
    template: `
      <div class="p-8">
        <BaseMenu :items="menuItems" :show-icons="true" @select="handleSelect">
          <template #trigger>
            <BaseButton
              variant="contained-grey"
              color="blue"
              size="lg"
              label="메뉴"
            />
          </template>
        </BaseMenu> 
      </div>
    `,
  }),
};
