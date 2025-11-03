import type { Meta, StoryObj } from '@storybook/vue3';
import BaseCheckbox from '../BaseCheckbox.vue';
import { ref, computed } from 'vue';

const meta: Meta<typeof BaseCheckbox> = {
  title: 'Inputs/BaseCheckbox',
  component: BaseCheckbox,
  parameters: {
    docs: {
      description: {
        component:
          '체크박스 컴포넌트입니다. 피그마의 Input/Checkbox 디자인을 기반으로 구현되었으며, 체크/언체크 상태와 비활성화 상태를 지원합니다.',
      },
    },
  },
  argTypes: {
    modelValue: {
      description: '체크 여부 (v-model)',
      control: 'boolean',
    },
    disabled: {
      description: '비활성화 여부',
      control: 'boolean',
    },
    indeterminate: {
      description: '부분 선택 상태 (3-state checkbox)',
      control: 'boolean',
    },
    size: {
      description: '컴포넌트 크기 (sm: 20px, md: 22px, lg: 24px)',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리 (체크 안됨)
export const Default: Story = {
  args: {
    modelValue: false,
    disabled: false,
    indeterminate: false,
  },
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      return { args };
    },
    template: `
      <BaseCheckbox v-bind="args">
        기본 체크박스
      </BaseCheckbox>
    `,
  }),
};

// 체크된 상태
export const Checked: Story = {
  args: {
    modelValue: true,
    disabled: false,
    indeterminate: false,
  },
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      return { args };
    },
    template: `
      <BaseCheckbox v-bind="args">
        체크된 체크박스
      </BaseCheckbox>
    `,
  }),
};

// 비활성화 상태 (체크 안됨)
export const DisabledUnchecked: Story = {
  args: {
    modelValue: false,
    disabled: true,
    indeterminate: false,
  },
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      return { args };
    },
    template: `
      <BaseCheckbox v-bind="args">
        비활성화된 체크박스 (체크 안됨)
      </BaseCheckbox>
    `,
  }),
};

// 비활성화 상태 (체크됨)
export const DisabledChecked: Story = {
  args: {
    modelValue: true,
    disabled: true,
    indeterminate: false,
  },
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      return { args };
    },
    template: `
      <BaseCheckbox v-bind="args">
        비활성화된 체크박스 (체크됨)
      </BaseCheckbox>
    `,
  }),
};

// 부분 선택 상태 (indeterminate) - 실제 사용 예시
export const Indeterminate: Story = {
  render: () => ({
    components: { BaseCheckbox },
    setup() {
      // 하위 체크박스들의 상태
      const child1 = ref(false);
      const child2 = ref(true);
      const child3 = ref(false);

      // 부모 체크박스의 상태 계산
      const parentChecked = computed(() => child1.value && child2.value && child3.value);
      const parentIndeterminate = computed(() => {
        const hasChecked = child1.value || child2.value || child3.value;
        const allChecked = child1.value && child2.value && child3.value;
        return hasChecked && !allChecked;
      });

      // 부모 체크박스 클릭 시 모든 하위 체크박스를 토글
      const handleParentClick = () => {
        const newValue = !parentChecked.value;
        child1.value = newValue;
        child2.value = newValue;
        child3.value = newValue;
      };

      return {
        child1,
        child2,
        child3,
        parentChecked,
        parentIndeterminate,
        handleParentClick,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">부모 체크박스 (전체 선택/해제)</h4>
          <BaseCheckbox 
            :model-value="parentChecked" 
            :indeterminate="parentIndeterminate"
            @update:model-value="handleParentClick"
          >
            모든 항목 선택
          </BaseCheckbox>
        </div>
        
        <div style="margin-left: 24px;">
          <h4 style="margin-bottom: 8px; color: #131313;">하위 항목들</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <BaseCheckbox v-model="child1">
              항목 1
            </BaseCheckbox>
            <BaseCheckbox v-model="child2">
              항목 2
            </BaseCheckbox>
            <BaseCheckbox v-model="child3">
              항목 3
            </BaseCheckbox>
          </div>
        </div>
      </div>
    `,
  }),
};

// 모든 상태 비교
export const AllStates: Story = {
  parameters: {
    controls: { exclude: ['visible'] },
  },
  render: () => ({
    components: { BaseCheckbox },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">기본 상태 (체크 안됨)</h4>
          <BaseCheckbox :model-value="false" :disabled="false" :indeterminate="false">
            기본 체크박스
          </BaseCheckbox>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">체크된 상태</h4>
          <BaseCheckbox :model-value="true" :disabled="false" :indeterminate="false">
            체크된 체크박스
          </BaseCheckbox>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">부분 선택 상태</h4>
          <BaseCheckbox :model-value="true" :disabled="false" :indeterminate="true">
            부분 선택 체크박스
          </BaseCheckbox>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 (체크 안됨)</h4>
          <BaseCheckbox :model-value="false" :disabled="true" :indeterminate="false">
            비활성화된 체크박스
          </BaseCheckbox>
        </div>
        
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">비활성화 (체크됨)</h4>
          <BaseCheckbox :model-value="true" :disabled="true" :indeterminate="false">
            비활성화된 체크박스
          </BaseCheckbox>
        </div>
      </div>
    `,
  }),
};

// 사이즈 비교
export const AllSizes: Story = {
  render: () => ({
    components: { BaseCheckbox },
    setup() {
      const sizeSm = ref(false);
      const sizeMd = ref(true);
      const sizeLg = ref(true);
      return { sizeSm, sizeMd, sizeLg };
    },
    template: `
      <div style="display: flex; flex-direction: row; gap: 24px; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <h4 style="margin-bottom: 8px; color: #131313;">sm (20px)</h4>
          <BaseCheckbox v-model="sizeSm" size="sm">
            작은 사이즈 체크박스
          </BaseCheckbox>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <h4 style="margin-bottom: 8px; color: #131313;">md (22px)</h4>
          <BaseCheckbox v-model="sizeMd" size="md">
            기본 사이즈 체크박스
          </BaseCheckbox>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <h4 style="margin-bottom: 8px; color: #131313;">lg (24px)</h4>
          <BaseCheckbox v-model="sizeLg" size="lg">
            큰 사이즈 체크박스
          </BaseCheckbox>
        </div>
      </div>
    `,
  }),
};

// 실제 사용 예시
export const UsageExample: Story = {
  render: () => ({
    components: { BaseCheckbox },
    setup() {
      // 개인정보 수집 동의 섹션 (부모-자식 구조)
      const allConsent = ref(false);
      const consentRequired = ref(false);
      const consentOptional = ref(true);
      const marketing = ref(false);

      // 개인정보 수집 동의의 intermediate 상태 계산
      const consentIndeterminate = computed(() => {
        const hasChecked = consentRequired.value || consentOptional.value || marketing.value;
        const allChecked = consentRequired.value && consentOptional.value && marketing.value;
        return hasChecked && !allChecked;
      });

      const consentChecked = computed(() => {
        return consentRequired.value && consentOptional.value && marketing.value;
      });

      // 전체 개인정보 수집 동의 토글
      const toggleAllConsent = () => {
        const newValue = !consentChecked.value;
        consentRequired.value = newValue;
        consentOptional.value = newValue;
        marketing.value = newValue;
      };

      // 설정 옵션 섹션
      const emailNotif = ref(true);
      const pushNotif = ref(false);
      const smsNotif = ref(false);

      return {
        allConsent,
        consentRequired,
        consentOptional,
        marketing,
        consentIndeterminate,
        consentChecked,
        toggleAllConsent,
        emailNotif,
        pushNotif,
        smsNotif,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 12px; color: #131313;">설정 옵션</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <BaseCheckbox v-model="emailNotif">
              이메일 알림 받기
            </BaseCheckbox>
            <BaseCheckbox v-model="pushNotif">
              푸시 알림 받기
            </BaseCheckbox>
            <BaseCheckbox v-model="smsNotif" :disabled="true">
              SMS 알림 받기 (서비스 종료)
            </BaseCheckbox>
          </div>
        </div>
        
        <div>
          <h4 style="margin-bottom: 12px; color: #131313;">개인정보 수집 동의</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <BaseCheckbox 
              :model-value="consentChecked" 
              :indeterminate="consentIndeterminate"
              @update:model-value="toggleAllConsent"
            >
              모든 개인정보 수집 및 이용에 동의합니다
            </BaseCheckbox>
            <div style="margin-left: 24px; display: flex; flex-direction: column; gap: 6px;">
              <BaseCheckbox v-model="consentRequired">
                필수 개인정보 수집 및 이용에 동의합니다
              </BaseCheckbox>
              <BaseCheckbox v-model="consentOptional">
                선택 개인정보 수집 및 이용에 동의합니다
              </BaseCheckbox>
              <BaseCheckbox v-model="marketing">
                마케팅 정보 수신에 동의합니다
              </BaseCheckbox>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

// 접근성 테스트
export const Accessibility: Story = {
  render: () => ({
    components: { BaseCheckbox },
    setup() {
      // 기본 체크박스들
      const first = ref(false);
      const second = ref(true);
      const third = ref(false);

      // Intermediate 상태를 보여주는 체크박스 그룹
      const allItems = ref(false);
      const item1 = ref(false);
      const item2 = ref(true);
      const item3 = ref(false);

      // Intermediate 상태 계산
      const itemsIndeterminate = computed(() => {
        const hasChecked = item1.value || item2.value || item3.value;
        const allChecked = item1.value && item2.value && item3.value;
        return hasChecked && !allChecked;
      });

      const itemsChecked = computed(() => {
        return item1.value && item2.value && item3.value;
      });

      // 전체 항목 토글
      const toggleAllItems = () => {
        const newValue = !itemsChecked.value;
        item1.value = newValue;
        item2.value = newValue;
        item3.value = newValue;
      };

      return {
        first,
        second,
        third,
        allItems,
        item1,
        item2,
        item3,
        itemsIndeterminate,
        itemsChecked,
        toggleAllItems,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <div>
          <h4 style="margin-bottom: 8px; color: #131313;">키보드 접근성</h4>
          <p style="margin-bottom: 12px; color: #666; font-size: 14px;">
            Tab 키로 포커스를 이동하고, Enter 또는 Space 키로 체크/언체크할 수 있습니다.
          </p>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <BaseCheckbox v-model="first">
              첫 번째 체크박스
            </BaseCheckbox>
            <BaseCheckbox v-model="second">
              두 번째 체크박스
            </BaseCheckbox>
            <BaseCheckbox v-model="third">
              세 번째 체크박스
            </BaseCheckbox>
          </div>
        </div>

        <div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <BaseCheckbox 
              :model-value="itemsChecked" 
              :indeterminate="itemsIndeterminate"
              @update:model-value="toggleAllItems"
            >
              모든 항목 선택
            </BaseCheckbox>
            <div style="margin-left: 24px; display: flex; flex-direction: column; gap: 6px;">
              <BaseCheckbox v-model="item1">
                항목 1
              </BaseCheckbox>
              <BaseCheckbox v-model="item2">
                항목 2
              </BaseCheckbox>
              <BaseCheckbox v-model="item3">
                항목 3
              </BaseCheckbox>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};
