import type { Meta, StoryObj } from '@storybook/vue3';
import BaseStepper from '../BaseStepper.vue';

// Props 타입 정의
type BaseStepperProps = {
  current?: number;
} & (
  | { variant: 'dot'; dotConfig: { count: number }; labelConfig?: never }
  | { variant: 'label'; labelConfig: { stepLabelList: string[] }; dotConfig?: never }
);

const meta: Meta<BaseStepperProps> = {
  title: 'Stepper/BaseStepper',
  component: BaseStepper as any,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
페이지네이션 조인 컴포넌트입니다. 점과 선으로 구성된 진행 상태를 표시합니다.

## 사용법
- \`variant="dot"\`: 점 형태의 간단한 인디케이터
- \`variant="label"\`: 라벨과 아이콘이 포함된 상세한 스테퍼

## 접근성
- ARIA 라벨이 자동으로 설정됩니다
- 현재 단계가 명확하게 표시됩니다
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['label', 'dot'],
      description: 'Stepper의 표시 방식을 설정합니다.',
      table: {
        type: { summary: "'dot' | 'label'" },
        defaultValue: { summary: "'dot'" },
      },
    },
    current: {
      control: { type: 'number', min: 0, max: 9, step: 1 },
      description: '현재 활성화된 단계의 인덱스입니다 (0부터 시작).',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    dotConfig: {
      control: { type: 'object' },
      description: 'dot variant일 때 사용하는 설정입니다.',
      table: {
        type: { summary: '{ count: number }' },
      },
      if: { arg: 'variant', eq: 'dot' },
    },
    labelConfig: {
      control: { type: 'object' },
      description: 'label variant일 때 사용하는 설정입니다.',
      table: {
        type: { summary: '{ stepLabelList: string[] }' },
      },
      if: { arg: 'variant', eq: 'label' },
    },
  },
};

export default meta;
type Story = StoryObj<BaseStepperProps>;

// 기본 라벨 스테퍼 - 첫 번째 단계
export const LabelDefault: Story = {
  name: '라벨 스테퍼 - 기본',
  args: {
    variant: 'label',
    current: 0,
    labelConfig: {
      stepLabelList: ['유형 선택', '금액 입력', '승인 완료'],
    },
  },
  parameters: {
    docs: {
      description: {
        story: '라벨 스테퍼의 기본 상태입니다. 첫 번째 단계가 활성화되어 있습니다.',
      },
    },
  },
};

// 기본 점 스테퍼
export const DotDefault: Story = {
  name: '점 스테퍼 - 기본',
  args: {
    variant: 'dot',
    current: 0,
    dotConfig: {
      count: 5,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '점 스테퍼의 기본 상태입니다. 5개의 점 중 첫 번째가 활성화되어 있습니다.',
      },
    },
  },
};
