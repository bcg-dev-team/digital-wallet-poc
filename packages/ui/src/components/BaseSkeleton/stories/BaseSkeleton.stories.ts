import {
  BaseSkeleton,
  TextSkeleton,
  CardSkeleton,
  ImageSkeleton,
  ListSkeleton,
  IconSkeleton,
} from '../index';
import type { Meta, StoryObj } from '@storybook/vue3';
import TextSkeletonDirect from '../TextSkeleton.vue';

const meta: Meta<typeof BaseSkeleton> = {
  title: 'Skeleton/BaseSkeleton',
  component: BaseSkeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '스켈레톤 로딩 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스켈레톤
export const Default: Story = {
  args: {
    width: '200px',
    height: '16px',
    variant: 'text',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 텍스트 스켈레톤입니다. 텍스트 라인을 시뮬레이션합니다.',
      },
    },
  },
};

// 원형 스켈레톤
export const Circular: Story = {
  args: {
    width: '60px',
    height: '60px',
    variant: 'circular',
  },
  parameters: {
    docs: {
      description: {
        story: '원형 스켈레톤입니다. 프로필 이미지나 아이콘을 시뮬레이션합니다.',
      },
    },
  },
};

// 직사각형 스켈레톤
export const Rectangular: Story = {
  args: {
    width: '300px',
    height: '100px',
    variant: 'rectangular',
  },
  parameters: {
    docs: {
      description: {
        story: '직사각형 스켈레톤입니다. 카드나 이미지를 시뮬레이션합니다.',
      },
    },
  },
};

// 텍스트 스켈레톤
export const Text: Story = {
  render: () => ({
    components: { TextSkeletonDirect },
    template:
      '<div style="width: 300px;"><TextSkeletonDirect :lines="3" :last-line-width="60" /></div>',
  }),
  parameters: {
    docs: {
      description: {
        story: '여러 라인의 텍스트 스켈레톤입니다.',
      },
    },
  },
};

// 텍스트 스켈레톤 (기본 버전)
export const TextBasic: Story = {
  render: () => ({
    components: { TextSkeleton },
    template: '<div style="width: 300px;"><TextSkeleton :lines="1" :last-line-width="80" /></div>',
  }),
  parameters: {
    docs: {
      description: {
        story: '기본 텍스트 스켈레톤입니다.',
      },
    },
  },
};

// 아이콘 스켈레톤 (기본)
export const Icon: Story = {
  render: () => ({
    components: { IconSkeleton },
    template: '<IconSkeleton size="md" variant="circular" />',
  }),
  parameters: {
    docs: {
      description: {
        story: '기본 아이콘 스켈레톤입니다.',
      },
    },
  },
};

// 아이콘 스켈레톤 (다양한 크기)
export const IconSizes: Story = {
  render: () => ({
    components: { IconSkeleton },
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <IconSkeleton size="sm" />
        <IconSkeleton size="md" />
        <IconSkeleton size="lg" />
        <IconSkeleton size="xl" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 아이콘 스켈레톤입니다.',
      },
    },
  },
};

// 아이콘 스켈레톤 (텍스트 포함)
export const IconWithText: Story = {
  render: () => ({
    components: { IconSkeleton },
    template: `
      <div style="display: flex; gap: 2rem; align-items: center;">
        <IconSkeleton size="md" :show-text="true" text="Loading icon..." />
        <IconSkeleton size="lg" :show-text="true" text="Processing..." />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '텍스트가 포함된 아이콘 스켈레톤입니다.',
      },
    },
  },
};

// 이미지 스켈레톤
export const Image: Story = {
  render: () => ({
    components: { ImageSkeleton },
    template:
      '<div style="width: 400px;"><ImageSkeleton :show-image="true" :show-title="true" :show-description="true" /></div>',
  }),
  parameters: {
    docs: {
      description: {
        story: '이미지와 텍스트를 포함한 스켈레톤입니다.',
      },
    },
  },
};

// 리스트 스켈레톤 (기본)
export const List: Story = {
  render: () => ({
    components: { ListSkeleton },
    template:
      '<div style="width: 400px;"><ListSkeleton :items="3" :show-avatar="true" :show-subtitle="true" :show-action="true" /></div>',
  }),
  parameters: {
    docs: {
      description: {
        story: '기본 리스트 스켈레톤입니다.',
      },
    },
  },
};

// 리스트 스켈레톤 (테두리)
export const ListBordered: Story = {
  render: () => ({
    components: { ListSkeleton },
    template:
      '<div style="width: 400px;"><ListSkeleton :items="4" :show-avatar="true" :show-subtitle="true" :show-action="true" variant="bordered" /></div>',
  }),
  parameters: {
    docs: {
      description: {
        story: '테두리가 있는 리스트 스켈레톤입니다.',
      },
    },
  },
};

// 카드 스켈레톤
export const Card: Story = {
  render: () => ({
    components: { CardSkeleton },
    template:
      '<div style="width: 300px;"><CardSkeleton :show-image="true" :show-title="true" :show-description="true" :show-actions="true" /></div>',
  }),
  parameters: {
    docs: {
      description: {
        story: '카드 형태의 스켈레톤입니다.',
      },
    },
  },
};

// 카드 스켈레톤 (이미지 없음)
export const CardWithoutImage: Story = {
  render: () => ({
    components: { CardSkeleton },
    template:
      '<div style="width: 300px;"><CardSkeleton :show-image="false" :show-title="true" :show-description="true" :show-actions="true" /></div>',
  }),
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 카드 스켈레톤입니다.',
      },
    },
  },
};
