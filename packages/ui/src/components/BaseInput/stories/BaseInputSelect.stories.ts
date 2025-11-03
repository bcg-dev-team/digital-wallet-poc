import type { Meta, StoryObj } from '@storybook/vue3';
import BaseInputSelect from '../BaseInputSelect.vue';
import { ref } from 'vue';

const meta: Meta<typeof BaseInputSelect> = {
  title: 'Inputs/BaseInputSelect',
  component: BaseInputSelect,
  parameters: {
    docs: {
      description: {
        component:
          'Headless UI 기반 셀렉트 박스 컴포넌트입니다. 피그마의 Input/Select-SM 디자인을 기반으로 구현되었으며, 접근성과 사용자 경험을 고려한 인터랙션을 제공합니다.',
      },
    },
  },
  argTypes: {
    modelValue: {
      description: '선택된 값 (v-model)',
      control: 'text',
    },
    variant: {
      description: '스타일 선택',
      control: 'select',
      options: ['default', 'compact', 'compact-bold'],
    },
    color: {
      description: '색상',
      control: 'select',
      options: ['black', 'gray', 'white'],
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
    options: {
      description: '선택 옵션들 (disabled 속성 지원)',
      control: 'object',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 옵션 데이터
const defaultOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
];

// 비활성화 옵션이 포함된 데이터
const optionsWithDisabled = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2 (비활성화)', disabled: true },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4 (비활성화)', disabled: true },
];

// 기본 스토리
export const Default: Story = {
  args: {
    variant: 'default',
    placeholder: '옵션을 선택하세요',
    size: 'sm',
    disabled: false,
    color: 'white',
    options: defaultOptions,
  },
  render: (args) => ({
    components: { BaseInputSelect },
    setup() {
      const selectedValue = ref('');
      return { selectedValue, args };
    },
    template: `
      <div>
        <BaseInputSelect 
          v-model="selectedValue"
          :variant="args.variant"
          :placeholder="args.placeholder"
          :size="args.size"
          :disabled="args.disabled"
          :color="args.color"
          :options="args.options"
        />
      </div>
    `,
  }),
};

// Variant 비교
export const VariantComparison: Story = {
  render: () => ({
    components: { BaseInputSelect },
    setup() {
      const value1 = ref('');
      const value2 = ref('');
      const value3 = ref('');
      return { value1, value2, value3, defaultOptions };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Default Variant</h4>
          <BaseInputSelect 
            v-model="value1"
            placeholder="Default 스타일"
            size="sm"
            :options="defaultOptions"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Compact Variant</h4>
          <BaseInputSelect 
            v-model="value2"
            variant="compact"
            placeholder="Compact 스타일"
            size="sm"
            :options="defaultOptions"
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">Compact Bold Variant</h4>
          <BaseInputSelect 
            v-model="value3"
            variant="compact-bold"
            placeholder="Compact Bold 스타일"
            size="sm"
            :options="defaultOptions"
          />
        </div>
      </div>
    `,
  }),
};

// 값이 선택된 상태
export const WithValue: Story = {
  render: () => ({
    components: { BaseInputSelect },
    setup() {
      const selectedValue = ref('option2');
      return { selectedValue, defaultOptions };
    },
    template: `
      <div>
        <BaseInputSelect 
          v-model="selectedValue"
          placeholder="옵션을 선택하세요"
          size="sm"
          :options="defaultOptions"
        />
        <p style="margin-top: 8px; font-size: 14px; color: #666;">
          선택된 값: {{ selectedValue || '없음' }}
        </p>
      </div>
    `,
  }),
};

// 비활성화 상태
export const Disabled: Story = {
  render: () => ({
    components: { BaseInputSelect },
    setup() {
      const selectedValue = ref('option1');
      return { selectedValue, defaultOptions };
    },
    template: `
      <BaseInputSelect 
        v-model="selectedValue"
        placeholder="비활성화된 셀렉트"
        size="sm"
        :disabled="true"
        :options="defaultOptions"
      />
    `,
  }),
};

// 비활성화된 옵션이 있는 상태
export const WithDisabledOptions: Story = {
  render: () => ({
    components: { BaseInputSelect },
    setup() {
      const selectedValue = ref('');
      return { selectedValue, optionsWithDisabled };
    },
    template: `
      <div>
        <BaseInputSelect 
          v-model="selectedValue"
          placeholder="일부 옵션이 비활성화된 셀렉트"
          size="sm"
          :options="optionsWithDisabled"
        />
        <p style="margin-top: 8px; font-size: 14px; color: #666;">
          선택된 값: {{ selectedValue || '없음' }}
        </p>
      </div>
    `,
  }),
};

// 긴 옵션 텍스트
export const LongOptions: Story = {
  render: () => ({
    components: { BaseInputSelect },
    setup() {
      const selectedValue = ref('');
      const longOptions = [
        { value: 'long1', label: '매우 긴 옵션 텍스트 1번입니다' },
        { value: 'long2', label: '매우 긴 옵션 텍스트 2번입니다' },
        { value: 'long3', label: '매우 긴 옵션 텍스트 3번입니다' },
      ];
      return { selectedValue, longOptions };
    },
    template: `
      <div>
        <BaseInputSelect 
          v-model="selectedValue"
          placeholder="긴 옵션 텍스트가 있는 셀렉트"
          size="sm"
          :options="longOptions"
        />
        <p style="margin-top: 8px; font-size: 14px; color: #666;">
          선택된 값: {{ selectedValue || '없음' }}
        </p>
      </div>
    `,
  }),
};

// 많은 옵션들
export const ManyOptions: Story = {
  render: () => ({
    components: { BaseInputSelect },
    setup() {
      const selectedValue = ref('');
      const manyOptions = [
        { value: '1', label: '옵션 1' },
        { value: '2', label: '옵션 2' },
        { value: '3', label: '옵션 3' },
        { value: '4', label: '옵션 4' },
        { value: '5', label: '옵션 5' },
        { value: '6', label: '옵션 6' },
        { value: '7', label: '옵션 7' },
        { value: '8', label: '옵션 8' },
        { value: '9', label: '옵션 9' },
        { value: '10', label: '옵션 10' },
      ];
      return { selectedValue, manyOptions };
    },
    template: `
      <div>
        <BaseInputSelect 
          v-model="selectedValue"
          placeholder="많은 옵션이 있는 셀렉트"
          size="sm"
          :options="manyOptions"
        />
        <p style="margin-top: 8px; font-size: 14px; color: #666;">
          선택된 값: {{ selectedValue || '없음' }}
        </p>
      </div>
    `,
  }),
};

// 모든 상태 비교
export const AllStates: Story = {
  render: () => ({
    components: { BaseInputSelect },
    setup() {
      const options = [
        { value: 'option1', label: '옵션 1' },
        { value: 'option2', label: '옵션 2' },
        { value: 'option3', label: '옵션 3' },
      ];

      const optionsWithDisabled = [
        { value: 'option1', label: '옵션 1' },
        { value: 'option2', label: '옵션 2 (비활성화)', disabled: true },
        { value: 'option3', label: '옵션 3' },
      ];

      const value1 = ref('');
      const value2 = ref('option2');
      const value3 = ref('option1');
      const value4 = ref('');

      return { options, optionsWithDisabled, value1, value2, value3, value4 };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태</h4>
          <BaseInputSelect 
            v-model="value1"
            placeholder="기본 셀렉트" 
            size="sm" 
            :options="options" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">값이 선택된 상태</h4>
          <BaseInputSelect 
            v-model="value2"
            placeholder="선택된 셀렉트" 
            size="sm" 
            :options="options" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">전체 비활성화 상태</h4>
          <BaseInputSelect 
            v-model="value3"
            placeholder="비활성화된 셀렉트" 
            size="sm" 
            :disabled="true" 
            :options="options" 
          />
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">일부 옵션 비활성화</h4>
          <BaseInputSelect 
            v-model="value4"
            placeholder="일부 옵션이 비활성화된 셀렉트" 
            size="sm" 
            :options="optionsWithDisabled" 
          />
        </div>
      </div>
    `,
  }),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => ({
    components: { BaseInputSelect },
    setup() {
      const countryOptions = [
        { value: 'kr', label: '대한민국' },
        { value: 'us', label: '미국' },
        { value: 'jp', label: '일본' },
        { value: 'cn', label: '중국' },
        { value: 'uk', label: '영국' },
      ];

      const categoryOptions = [
        { value: 'electronics', label: '전자제품' },
        { value: 'clothing', label: '의류' },
        { value: 'books', label: '도서' },
        { value: 'sports', label: '스포츠용품' },
      ];

      const selectedCountry = ref('');
      const selectedCategory = ref('');

      return { countryOptions, categoryOptions, selectedCountry, selectedCategory };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">국가 선택</h4>
          <BaseInputSelect 
            v-model="selectedCountry"
            placeholder="국가를 선택하세요" 
            size="sm" 
            :options="countryOptions" 
          />
          <p style="margin-top: 8px; font-size: 14px; color: #666;">
            선택된 국가: {{ selectedCountry || '없음' }}
          </p>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">카테고리 선택</h4>
          <BaseInputSelect 
            v-model="selectedCategory"
            placeholder="카테고리를 선택하세요" 
            size="sm" 
            :options="categoryOptions" 
          />
          <p style="margin-top: 8px; font-size: 14px; color: #666;">
            선택된 카테고리: {{ selectedCategory || '없음' }}
          </p>
        </div>
      </div>
    `,
  }),
};
