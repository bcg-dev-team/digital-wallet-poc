import type { Meta, StoryObj } from '@storybook/vue3';
import BaseProgressBar from '../BaseProgressBar.vue';

const meta: Meta<typeof BaseProgressBar> = {
  title: 'Progress Bar/BaseProgressBar',
  component: BaseProgressBar,
  parameters: {
    docs: {
      description: {
        component:
          '진행률을 표시하는 컴포넌트입니다. 일반 진행바와 비밀번호 강도 표시를 지원합니다.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=2063-16180&m=dev',
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: '진행률 (0-100)',
    },
    max: {
      control: { type: 'number' },
      description: '최대값',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'password-strength', 'performance'],
      description: '진행바 변형',
    },
    showLabel: {
      control: { type: 'boolean' },
      description: '라벨 표시 여부',
    },
    label: {
      control: { type: 'text' },
      description: '커스텀 라벨',
    },
    strengthScore: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4],
      description: '비밀번호 강도 점수 (0-4)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 진행바
export const Default: Story = {
  args: {
    value: 50,
    max: 100,
    showLabel: true,
  },
};

// 비밀번호 강도 진행바
export const PasswordStrength: Story = {
  args: {
    variant: 'password-strength',
    strengthScore: 2,
    showLabel: true,
  },
};

// 모든 비밀번호 강도 상태
export const AllPasswordStrengths: Story = {
  render: () => ({
    components: { BaseProgressBar },
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="text-sm font-medium mb-2">매우 약함 (0점) - 20%</h3>
          <BaseProgressBar variant="password-strength" :strength-score="0" :show-label="true" />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">약함 (1점) - 40%</h3>
          <BaseProgressBar variant="password-strength" :strength-score="1" :show-label="true" />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">보통 (2점) - 60%</h3>
          <BaseProgressBar variant="password-strength" :strength-score="2" :show-label="true" />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">강함 (3점) - 80%</h3>
          <BaseProgressBar variant="password-strength" :strength-score="3" :show-label="true" />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">매우 강함 (4점) - 100%</h3>
          <BaseProgressBar variant="password-strength" :strength-score="4" :show-label="true" />
        </div>
      </div>
    `,
  }),
};

// 라벨 없음
export const WithoutLabel: Story = {
  args: {
    value: 75,
    max: 100,
    showLabel: false,
  },
};

// 커스텀 라벨
export const CustomLabel: Story = {
  args: {
    value: 80,
    max: 100,
    showLabel: true,
    label: '업로드 진행률',
  },
};

// 비밀번호 강도 커스텀 라벨
export const PasswordStrengthCustomLabel: Story = {
  args: {
    variant: 'password-strength',
    strengthScore: 3,
    showLabel: true,
    label: '보안 수준',
  },
};

// 성과 진행바
export const Performance: Story = {
  args: {
    variant: 'performance',
    value: 80,
    max: 100,
    showLabel: false,
    label: '성과',
    fillColorClass: 'bg-blue-blue800-deep',
    trackColorClass: 'bg-red-red800',
  },
};
