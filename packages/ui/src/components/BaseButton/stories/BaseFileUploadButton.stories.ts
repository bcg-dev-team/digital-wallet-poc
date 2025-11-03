import BaseFileUploadButton from '../BaseFileUploadButton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseFileUploadButton> = {
  title: 'Buttons/BaseFileUploadButton',
  component: BaseFileUploadButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Figma 링크: [Button/File-Upload](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=116-2609&t=agLJQOgDvtXTjTYA-4)',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof BaseFileUploadButton>;

export const Default: Story = {
  args: {
    label: '파일선택',
    status: 'default',
    disabled: false,
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: '기본(Default) 상태의 파일 업로드 버튼 예시입니다.',
      },
    },
  },
};

export const Hover: Story = {
  args: {
    label: '파일선택',
    status: 'hover',
    disabled: false,
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: '마우스 오버(Hover) 상태의 파일 업로드 버튼 예시입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: '파일선택',
    status: 'default',
    disabled: true,
    showIcon: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화(Disabled) 상태의 파일 업로드 버튼 예시입니다.',
      },
    },
  },
};
