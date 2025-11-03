/// <reference types="vite/client" />

import type { Meta, StoryObj } from '@storybook/vue3';
import type { IconName } from '../../../types/icons';
import BaseIcon from '../BaseIcon.vue';

/**
 * BaseIcon 컴포넌트
 *
 * vite-svg-loader를 활용하여 SVG 아이콘을 Vue 컴포넌트로 렌더링합니다.
 *
 * Figma 링크: [Icon 컴포넌트](https://figma.com/design/...)
 */
const meta: Meta<typeof BaseIcon> = {
  title: 'Icons/BaseIcon',
  component: BaseIcon,
  parameters: {
    docs: {
      description: {
        component: `BaseIcon 컴포넌트는 SVG 아이콘을 Vue 컴포넌트로 렌더링하는 범용 아이콘 컴포넌트입니다.`,
      },
    },
  },
  argTypes: {
    name: {
      description: '아이콘 이름',
      control: { type: 'select' },
      options: [
        'arrow-forward',
        'arrow-backward',
        'arrow-up',
        'arrow-down',
        'arrow-close',
        'arrow-open',
        'arrow-drawer',
        'arrow-right-thin',
        'arrow-updown',
        'arrow-forward-sm',
        'arrow-backward-sm',
        'heart',
        'heart-thin',
        'star',
        'plus',
        'minus',
        'plus-minus',
        'edit',
        'trash',
        'refresh',
        'search',
        'eye',
        'fullscreen',
        'external-link',
        'icn-delete',
        'home',
        'settings',
        'person',
        'login',
        'logout',
        'mypage',
        'order',
        'trade',
        'support',
        'mode-dark',
        'mode-light',
        'asset',
        'calendar',
        'chart',
        'email',
        'time',
        'cert',
        'check-circle',
        'comm',
        'account-balance',
        'flag-au',
        'flag-ca',
        'flag-cn',
        'flag-eu',
        'flag-hk',
        'flag-jp',
        'flag-kr',
        'flag-mx',
        'flag-nr',
        'flag-nz',
        'flag-se',
        'flag-sg',
        'flag-sui',
        'flag-tr',
        'flag-uk',
        'flag-us',
        'flag-za',
      ] as IconName[],
    },
    size: {
      description: '아이콘 크기',
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      description: '아이콘 색상',
      control: { type: 'color' },
    },
    class: {
      description: '추가 CSS 클래스',
      control: { type: 'text' },
    },
    isLoading: {
      description: '로딩 상태',
      control: { type: 'boolean' },
    },
  },
  args: {
    name: 'arrow-forward',
    size: 'md',
    color: '#000000',
    isLoading: false,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 아이콘
 */
export const Default: Story = {
  args: {
    name: 'heart',
    size: 'md',
    color: '#222222',
  },
};

// 아이콘 이름 자동 추출 (Vite 환경)
const iconModules = import.meta.glob('../../../assets/icons/**/*.svg', { eager: true });
const iconNames = Object.keys(iconModules)
  .map((path) => {
    const match = path.match(/([^/]+)\.svg$/);
    return match ? match[1] : null;
  })
  .filter(Boolean)
  .sort();

/**
 * 다양한 크기의 아이콘
 */
export const Sizes: Story = {
  render: () => ({
    components: { BaseIcon },
    data() {
      return {
        sizes: [
          { size: 'xs', label: 'xs' },
          { size: 'sm', label: 'sm' },
          { size: 'md', label: 'md' },
          { size: 'lg', label: 'lg' },
          { size: 'xl', label: 'xl' },
          { size: 32, label: '32px' },
        ],
        iconNames,
      };
    },
    template: `
      <div class="flex items-center gap-4">
        <div 
          v-for="(item, index) in sizes" 
          :key="item.label"
          class="flex flex-col items-center gap-2"
        >
          <BaseIcon :name="iconNames[index % iconNames.length]" :size="item.size" :color="'#222222'" />
          <span class="text-xs text-gray-600">{{ item.label }}</span>
        </div>
      </div>
    `,
  }),
};

/**
 * 다양한 색상의 아이콘 (자동 타입 감지)
 */
export const Colors: Story = {
  render: () => ({
    components: { BaseIcon },
    data() {
      return {
        colorItems: [
          { icon: 'heart', color: '#ef4444', label: 'Red (fill)' },
          { icon: 'star', color: '#3b82f6', label: 'Blue (stroke)' },
          { icon: 'plus', color: '#10b981', label: 'Green (fill)' },
          { icon: 'eye', color: '#f59e0b', label: 'Yellow (stroke)' },
          { icon: 'edit', color: '#8b5cf6', label: 'Purple (fill)' },
          { icon: 'trade', color: '#6b7280', label: 'Gray (stroke)' },
        ],
      };
    },
    template: `
      <div class="flex items-center gap-4">
        <div 
          v-for="item in colorItems" 
          :key="item.icon"
          class="flex flex-col items-center gap-2"
        >
          <BaseIcon :name="item.icon" size="lg" :color="item.color" />
          <span class="text-xs text-gray-600">{{ item.label }}</span>
        </div>
      </div>
    `,
  }),
};

/**
 * 로딩 상태 아이콘
 */
export const Loading: Story = {
  render: () => ({
    components: { BaseIcon },
    data() {
      return {
        sizes: [
          { size: 'xs', label: 'xs' },
          { size: 'sm', label: 'sm' },
          { size: 'md', label: 'md' },
          { size: 'lg', label: 'lg' },
          { size: 'xl', label: 'xl' },
        ],
        iconNames,
      };
    },
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">로딩 상태 (isLoading: true)</h3>
          <div class="flex items-center gap-4">
            <div 
              v-for="(item, index) in sizes" 
              :key="item.label"
              class="flex flex-col items-center gap-2"
            >
              <BaseIcon 
                :name="iconNames[index % iconNames.length]" 
                :size="item.size" 
                :is-loading="true" 
              />
              <span class="text-xs text-gray-600">{{ item.label }}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-3">정상 상태 (isLoading: false)</h3>
          <div class="flex items-center gap-4">
            <div 
              v-for="(item, index) in sizes" 
              :key="item.label"
              class="flex flex-col items-center gap-2"
            >
              <BaseIcon 
                :name="iconNames[index % iconNames.length]" 
                :size="item.size" 
                :is-loading="false" 
              />
              <span class="text-xs text-gray-600">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '아이콘의 로딩 상태를 보여줍니다. isLoading이 true일 때는 IconSkeleton이 표시됩니다.',
      },
    },
  },
};

/**
 * Fill vs Stroke 타입 비교
 */
export const FillVsStroke: Story = {
  render: () => ({
    components: { BaseIcon },
    data() {
      return {
        categories: [
          {
            title: 'Fill 타입',
            items: [
              { icon: 'heart', color: '#ef4444', label: 'heart' },
              { icon: 'plus', color: '#3b82f6', label: 'plus' },
              { icon: 'edit', color: '#10b981', label: 'edit' },
              { icon: 'home', color: '#f59e0b', label: 'home' },
            ],
          },
          {
            title: 'Stroke 타입',
            items: [
              { icon: 'star', color: '#ef4444', label: 'star' },
              { icon: 'eye', color: '#3b82f6', label: 'eye' },
              { icon: 'trade', color: '#10b981', label: 'trade' },
              { icon: 'arrow-up', color: '#f59e0b', label: 'arrow-up' },
            ],
          },
          {
            title: 'Flag 타입 (원본 색상 유지)',
            items: [
              { icon: 'flag-kr', label: 'flag-kr' },
              { icon: 'flag-us', label: 'flag-us' },
              { icon: 'flag-jp', label: 'flag-jp' },
              { icon: 'flag-au', label: 'flag-au' },
            ],
          },
        ],
      };
    },
    template: `
      <div class="space-y-8">
        <div v-for="category in categories" :key="category.title">
          <h3 class="text-lg font-semibold mb-4 text-gray-800">{{ category.title }}</h3>
          <div class="flex items-center gap-4">
            <div 
              v-for="item in category.items" 
              :key="item.icon"
              class="flex flex-col items-center gap-2"
            >
              <BaseIcon 
                :name="item.icon" 
                size="lg" 
                :color="item.color"
              />
              <span class="text-xs text-gray-600">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

/**
 * 모든 아이콘 목록
 */
export const AllIcons: Story = {
  render: () => ({
    components: { BaseIcon },
    data() {
      return {
        iconNames,
      };
    },
    template: `
      <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4">
        <div 
          v-for="iconName in iconNames" 
          :key="iconName"
          class="flex flex-col items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200 justify-center"
        >
          <BaseIcon :name="iconName" size="md" :color="'#222222'" />
          <span class="text-xs text-gray-600 text-center truncate w-full px-1" :title="iconName">{{ iconName }}</span>
        </div>
      </div>
    `,
  }),
};
