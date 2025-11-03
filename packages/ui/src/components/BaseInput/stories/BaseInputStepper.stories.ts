import BaseInputStepper from '../BaseInputStepper.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseInputStepper> = {
  title: 'Inputs/BaseInputStepper',
  component: BaseInputStepper,
  parameters: {
    docs: {
      description: {
        component:
          '스테퍼 입력 컴포넌트입니다. 피그마의 Input/Stepper와 Input/Stepper-lined 디자인을 기반으로 구현되었으며, +/- 버튼으로 값을 조정할 수 있습니다. step prop으로 증감 단위를 조절할 수 있습니다.',
      },
    },
  },
  argTypes: {
    modelValue: {
      description: '현재 값 (v-model)',
      control: 'number',
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
      control: 'text',
    },
    size: {
      description: '크기 (sm: 32px 높이)',
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
    min: {
      description: '최소값',
      control: 'number',
    },
    max: {
      description: '최대값',
      control: 'number',
    },
    step: {
      description: '증감 단위 (기본값: 0.00001)',
      control: 'number',
    },
    // 새로 추가된 props
    variant: {
      description: "표시 형식: 'default' | 'unit' | 'range'",
      control: 'select',
      options: ['default', 'unit', 'range'],
    },
    unitLabel: {
      description: "단위 텍스트 (variant='unit'일 때 사용)",
      control: 'text',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (0.00001 단위)
export const Default: Story = {
  args: {
    modelValue: 1.17,
    placeholder: '가격을 입력하세요',
    size: 'sm',
    max: 10,
    step: 0.00001,
  },
};

// 값이 있는 상태
export const WithValue: Story = {
  args: {
    modelValue: 1.171,
    placeholder: '가격을 입력하세요',
    size: 'sm',
    min: 0,
    max: 10,
    step: 0.00001,
  },
};

// 최소값에 도달한 상태
export const AtMinimum: Story = {
  args: {
    modelValue: 0,
    placeholder: '가격을 입력하세요',
    size: 'sm',
    min: 0,
    max: 10,
    step: 0.00001,
  },
};

// 최대값에 도달한 상태
export const AtMaximum: Story = {
  args: {
    modelValue: 10,
    placeholder: '가격을 입력하세요',
    size: 'sm',
    min: 0,
    max: 10,
    step: 0.00001,
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    modelValue: 1.171,
    placeholder: '비활성화된 스테퍼',
    size: 'sm',
    disabled: true,
    min: 0,
    max: 10,
    step: 0.00001,
  },
};

// 큰 단위 스테퍼 (1씩 증가)
export const LargeStep: Story = {
  args: {
    modelValue: 5,
    placeholder: '큰 단위 스테퍼',
    size: 'sm',
    min: 0,
    max: 100,
    step: 1,
  },
};

// 소수점 스테퍼 (0.5씩 증가)
export const DecimalStep: Story = {
  args: {
    modelValue: 2.5,
    placeholder: '소수점 스테퍼',
    size: 'sm',
    min: 0,
    max: 10,
    step: 0.5,
  },
};

// 매우 작은 단위 스테퍼 (0.00001씩 증가)
export const MicroStep: Story = {
  args: {
    modelValue: 1.17,
    placeholder: '마이크로 단위 스테퍼',
    size: 'sm',
    min: 1.17,
    max: 1.172,
    step: 0.00001,
  },
};

// 중간 단위 스테퍼 (0.001씩 증가)
export const MediumStep: Story = {
  args: {
    modelValue: 1.17,
    placeholder: '중간 단위 스테퍼',
    size: 'sm',
    min: 1.17,
    max: 1.18,
    step: 0.001,
  },
};

// 음수 허용
export const NegativeAllowed: Story = {
  args: {
    modelValue: 0,
    placeholder: '음수 허용 스테퍼',
    size: 'sm',
    min: -10,
    max: 10,
    step: 1,
  },
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => ({
    components: { BaseInputStepper },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태 (0.00001 단위)</h4>
          <BaseInputStepper 
            :model-value="1.17100" 
            placeholder="기본 스테퍼" 
            size="sm" 
            :min="0" 
            :max="10" 
            :step="0.00001" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">최소값 상태</h4>
          <BaseInputStepper 
            :model-value="0" 
            placeholder="최소값 스테퍼" 
            size="sm" 
            :min="0" 
            :max="10" 
            :step="0.00001" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">최대값 상태</h4>
          <BaseInputStepper 
            :model-value="10" 
            placeholder="최대값 스테퍼" 
            size="sm" 
            :min="0" 
            :max="10" 
            :step="0.00001" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 상태</h4>
          <BaseInputStepper 
            :model-value="1.17100" 
            placeholder="비활성화된 스테퍼" 
            size="sm" 
            :disabled="true" 
            :min="0" 
            :max="10" 
            :step="0.00001" 
          />
        </div>
      </div>
    `,
  }),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => ({
    components: { BaseInputStepper },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">외환 가격 조절 (0.00001 단위)</h4>
          <BaseInputStepper 
            :model-value="1.17100" 
            placeholder="가격을 설정하세요" 
            size="sm" 
            :min="1.17000" 
            :max="1.17200" 
            :step="0.00001" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">온도 조절 (1도 단위)</h4>
          <BaseInputStepper 
            :model-value="20" 
            placeholder="온도를 설정하세요" 
            size="sm" 
            :min="16" 
            :max="30" 
            :step="1" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">볼륨 조절 (5씩 증가)</h4>
          <BaseInputStepper 
            :model-value="50" 
            placeholder="볼륨을 설정하세요" 
            size="sm" 
            :min="0" 
            :max="100" 
            :step="5" 
          />
        </div>
      </div>
    `,
  }),
};

// 다양한 단위 예시
export const DifferentSteps: Story = {
  render: () => ({
    components: { BaseInputStepper },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">0.00001씩 증가 (기본)</h4>
          <BaseInputStepper 
            :model-value="1.17100" 
            placeholder="0.00001씩 증가" 
            size="sm" 
            :min="1.17000" 
            :max="1.17200" 
            :step="0.00001" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">0.001씩 증가</h4>
          <BaseInputStepper 
            :model-value="1.170" 
            placeholder="0.001씩 증가" 
            size="sm" 
            :min="1.170" 
            :max="1.180" 
            :step="0.001" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">1씩 증가</h4>
          <BaseInputStepper 
            :model-value="5" 
            placeholder="1씩 증가" 
            size="sm" 
            :min="0" 
            :max="100" 
            :step="1" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">5씩 증가</h4>
          <BaseInputStepper 
            :model-value="25" 
            placeholder="5씩 증가" 
            size="sm" 
            :min="0" 
            :max="100" 
            :step="5" 
          />
        </div>
      </div>
    `,
  }),
};

// 외환 거래 예시
export const ForexTradingExample: Story = {
  render: () => ({
    components: { BaseInputStepper },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">EUR/USD 가격 설정</h4>
          <BaseInputStepper 
            :model-value="1.17100" 
            placeholder="EUR/USD 가격" 
            size="sm" 
            :min="1.17000" 
            :max="1.17200" 
            :step="0.00001" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">GBP/USD 가격 설정</h4>
          <BaseInputStepper 
            :model-value="1.25000" 
            placeholder="GBP/USD 가격" 
            size="sm" 
            :min="1.24000" 
            :max="1.26000" 
            :step="0.00001" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">USD/JPY 가격 설정</h4>
          <BaseInputStepper 
            :model-value="150.000" 
            placeholder="USD/JPY 가격" 
            size="sm" 
            :min="149.000" 
            :max="151.000" 
            :step="0.001" 
          />
        </div>
      </div>
    `,
  }),
};

// 단위 표시 (variant: 'unit')
export const UnitVariant: Story = {
  args: {
    modelValue: 1.5,
    placeholder: '수량',
    size: 'sm',
    step: 0.1,
    variant: 'unit',
    unitLabel: 'Lot',
  },
};

// 범위 표시 (variant: 'range')
export const RangeVariant: Story = {
  args: {
    modelValue: 100.1,
    placeholder: '상한값',
    size: 'sm',
    step: 0.1,
    variant: 'range',
  },
};

// 음수 값 허용 (기본 동작)
export const NegativeValues: Story = {
  args: {
    modelValue: -100.1,
    placeholder: '손익 값',
    size: 'sm',
    // min과 max를 지정하지 않으면 음수/양수 모두 허용
    step: 0.1,
  },
};

// 모든 variants 비교
export const AllVariants: Story = {
  render: () => ({
    components: { BaseInputStepper },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 (Default)</h4>
          <BaseInputStepper 
            :model-value="1.23456" 
            placeholder="기본 형식" 
            size="sm" 
            :step="0.00001" 
            variant="default"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">단위 표시 (Unit)</h4>
          <BaseInputStepper 
            :model-value="1.5" 
            placeholder="단위 형식" 
            size="sm" 
            :step="0.1" 
            variant="unit"
            unit-label="Lot"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">범위 표시 (Range)</h4>
          <BaseInputStepper 
            :model-value="100.1" 
            placeholder="범위 형식" 
            size="sm" 
            :step="0.1" 
            variant="range"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">음수 허용</h4>
          <BaseInputStepper 
            :model-value="-50" 
            placeholder="음수 허용" 
            size="sm" 
            :step="1" 
            variant="default"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">범위 제한 (음수 범위)</h4>
          <BaseInputStepper 
            :model-value="-5" 
            placeholder="음수 범위" 
            size="sm" 
            :min="-10"
            :max="10"
            :step="1" 
            variant="default"
          />
        </div>
      </div>
    `,
  }),
};
