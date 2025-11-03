import type { Meta, StoryObj } from '@storybook/vue3';
import BaseChip from '../BaseChip.vue';

const meta: Meta<typeof BaseChip> = {
  title: 'Chips/BaseChip',
  component: BaseChip,
  parameters: {
    docs: {
      description: {
        component:
          '하이브리드 방식의 칩 컴포넌트입니다. 기본 variant와 커스텀 색상을 모두 지원하며, backgroundColor만 입력 시 기본 색상 규칙이 적용됩니다. 피그마 디자인 토큰을 기반으로 구현되었으며, 접근성 기능(ARIA 속성, 키보드 네비게이션, 포커스 표시기)을 포함합니다.',
      },
    },
  },
  argTypes: {
    label: {
      description: '칩 텍스트',
      control: 'text',
    },
    variant: {
      description: '기본 스타일 변형',
      control: 'select',
      options: ['grey', 'red', 'green', 'blue', 'yellow', 'purple'],
    },
    size: {
      description: '칩 크기',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      description: '테두리 둥글기',
      control: 'select',
      options: ['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-full'],
    },
    fontWeight: {
      description: '폰트 굵기',
      control: 'select',
      options: ['font-normal', 'font-medium', 'font-semibold', 'font-bold'],
    },
    backgroundColor: {
      description: '커스텀 배경색 (CSS 변수 또는 HEX)',
      control: 'text',
    },
    textColor: {
      description: '커스텀 텍스트색 (CSS 변수 또는 HEX)',
      control: 'text',
    },
    borderColor: {
      description: '커스텀 테두리색 (CSS 변수 또는 HEX)',
      control: 'text',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 variant 스토리들
export const Default: Story = {
  args: {
    label: '기본 칩',
    variant: 'grey',
    size: 'md',
  },
};

// 커스텀 색상 칩
export const CustomColors: Story = {
  args: {
    label: '커스텀 색상',
    backgroundColor: 'var(--trade-short-bg)',
    size: 'md',
  },
};

// 다양한 크기
export const Sizes: Story = {
  render: () => ({
    components: { BaseChip },
    template: `
      <div class="space-y-4">
        <BaseChip label="Small" size="sm" variant="blue" />
        <BaseChip label="Medium" size="md" variant="blue" />
        <BaseChip label="Large" size="lg" variant="blue" />
      </div>
    `,
  }),
};

// 다양한 variant
export const Variants: Story = {
  render: () => ({
    components: { BaseChip },
    template: `
      <div class="space-x-2">
        <BaseChip label="Grey" variant="grey" />
        <BaseChip label="Red" variant="red" />
        <BaseChip label="Green" variant="green" />
        <BaseChip label="Blue" variant="blue" />
        <BaseChip label="Yellow" variant="yellow" />
        <BaseChip label="Purple" variant="purple" />
      </div>
    `,
  }),
};
