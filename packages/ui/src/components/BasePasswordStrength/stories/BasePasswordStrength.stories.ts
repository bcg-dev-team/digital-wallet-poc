import BasePasswordStrength from '../BasePasswordStrength.vue';
import type { PasswordStrengthDisplay } from '@template/types';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BasePasswordStrength> = {
  title: 'Password Strength/BasePasswordStrength',
  component: BasePasswordStrength,
  parameters: {
    docs: {
      description: {
        component:
          '비밀번호 강도를 표시하는 컴포넌트입니다. 5단계 세그먼트 진행바와 라벨을 포함합니다.',
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=2063-16180&m=dev',
    },
  },
  argTypes: {
    showLabel: {
      control: { type: 'boolean' },
      description: '라벨 표시 여부',
    },
    showDetails: {
      control: { type: 'boolean' },
      description: '상세 피드백 표시 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 사용법
export const Default: Story = {
  args: {
    strength: {
      score: 2,
      label: '보통',
      color: 'yellow',
      progressColor: 'bg-yellow-500',
      feedback: ['더 안전한 비밀번호를 위해 12자 이상을 권장합니다'],
      crackTime: '2시간',
    },
    showLabel: true,
  },
};

// 매우 약함
export const VeryWeak: Story = {
  args: {
    strength: {
      score: 0,
      label: '매우 약함',
      color: 'red',
      progressColor: 'bg-red-500',
      feedback: [
        '비밀번호를 8자 이상으로 설정하세요',
        '숫자를 포함하세요',
        '특수문자를 포함하세요',
      ],
      crackTime: '즉시',
    },
    showLabel: true,
    showDetails: true,
  },
};

// 약함
export const Weak: Story = {
  args: {
    strength: {
      score: 1,
      label: '약함',
      color: 'red',
      progressColor: 'bg-red-500',
      feedback: ['대문자를 포함하세요', '더 안전한 비밀번호를 위해 12자 이상을 권장합니다'],
      crackTime: '1분',
    },
    showLabel: true,
    showDetails: true,
  },
};

// 보통
export const Medium: Story = {
  args: {
    strength: {
      score: 2,
      label: '보통',
      color: 'yellow',
      progressColor: 'bg-yellow-500',
      feedback: ['더 안전한 비밀번호를 위해 12자 이상을 권장합니다'],
      crackTime: '2시간',
    },
    showLabel: true,
    showDetails: true,
  },
};

// 강함
export const Strong: Story = {
  args: {
    strength: {
      score: 3,
      label: '강함',
      color: 'light-green',
      progressColor: 'bg-green-400',
      feedback: [],
      crackTime: '1개월',
    },
    showLabel: true,
    showDetails: true,
  },
};

// 매우 강함
export const VeryStrong: Story = {
  args: {
    strength: {
      score: 4,
      label: '매우 강함',
      color: 'green',
      progressColor: 'bg-green-600',
      feedback: [],
      crackTime: '100년',
    },
    showLabel: true,
    showDetails: true,
  },
};

// 모든 강도 상태
export const AllStrengths: Story = {
  render: () => ({
    components: { BasePasswordStrength },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-medium mb-2">매우 약함 (0점)</h3>
          <BasePasswordStrength 
            :strength="{
              score: 0,
              label: '매우 약함',
              color: 'red',
              progressColor: 'bg-red-500',
              feedback: ['비밀번호를 8자 이상으로 설정하세요'],
              crackTime: '즉시'
            }"
            :show-label="true"
            :show-details="true"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">약함 (1점)</h3>
          <BasePasswordStrength 
            :strength="{
              score: 1,
              label: '약함',
              color: 'red',
              progressColor: 'bg-red-500',
              feedback: ['대문자를 포함하세요'],
              crackTime: '1분'
            }"
            :show-label="true"
            :show-details="true"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">보통 (2점)</h3>
          <BasePasswordStrength 
            :strength="{
              score: 2,
              label: '보통',
              color: 'yellow',
              progressColor: 'bg-yellow-500',
              feedback: ['더 안전한 비밀번호를 위해 12자 이상을 권장합니다'],
              crackTime: '2시간'
            }"
            :show-label="true"
            :show-details="true"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">강함 (3점)</h3>
          <BasePasswordStrength 
            :strength="{
              score: 3,
              label: '강함',
              color: 'light-green',
              progressColor: 'bg-green-400',
              feedback: [],
              crackTime: '1개월'
            }"
            :show-label="true"
            :show-details="true"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">매우 강함 (4점)</h3>
          <BasePasswordStrength 
            :strength="{
              score: 4,
              label: '매우 강함',
              color: 'green',
              progressColor: 'bg-green-600',
              feedback: [],
              crackTime: '100년'
            }"
            :show-label="true"
            :show-details="true"
            :show-crack-time="true"
          />
        </div>
      </div>
    `,
  }),
};

// 라벨 없음
export const WithoutLabel: Story = {
  args: {
    strength: {
      score: 2,
      label: '보통',
      color: 'yellow',
      progressColor: 'bg-yellow-500',
      feedback: ['더 안전한 비밀번호를 위해 12자 이상을 권장합니다'],
      crackTime: '2시간',
    },
    showLabel: false,
    showDetails: true,
  },
};
