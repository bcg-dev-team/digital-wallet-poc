import BaseRadioGroup from '../../BaseRadioGroup/BaseRadioGroup.vue';
import BaseSwitch from '../../BaseSwitch/BaseSwitch.vue';
import BaseButton from '../../BaseButton/BaseButton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import BaseBadge from '../BaseBadge.vue';
import { ref } from 'vue';

const meta: Meta<typeof BaseBadge> = {
  title: 'Badge/BaseBadge',
  component: BaseBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Material UI와 Element Plus를 참고한 배지 컴포넌트입니다. 숫자, 텍스트, 점 형태의 배지를 지원하며 겹침 여부와 위치를 조절할 수 있습니다.',
      },
    },
  },
  argTypes: {
    value: {
      description: '배지에 표시할 값 (숫자 또는 문자열)',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Props',
      },
    },
    max: {
      description: '최대값 (숫자일 때만 적용)',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '99' },
        category: 'Props',
      },
    },
    variant: {
      description: '배지 스타일',
      control: { type: 'select' },
      options: ['dot', 'standard', 'square'],
      table: {
        type: { summary: 'dot | standard | square' },
        defaultValue: { summary: 'standard' },
        category: 'Props',
      },
    },
    color: {
      description: '배지 색상',
      control: { type: 'select' },
      options: ['grey', 'red', 'green', 'blue', 'yellow', 'purple'],
      table: {
        type: { summary: 'grey | red | green | blue | yellow | purple' },
        defaultValue: { summary: 'blue' },
        category: 'Props',
      },
    },
    showZero: {
      description: '0일 때도 표시할지 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    hidden: {
      description: '배지 숨김 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    overlap: {
      description: '배지 겹침 여부',
      control: { type: 'select' },
      options: ['overlap', 'no-overlap'],
      table: {
        type: { summary: 'overlap | no-overlap' },
        defaultValue: { summary: 'overlap' },
        category: 'Props',
      },
    },
    anchorOrigin: {
      description: '배지 위치 (overlap일 때만 적용)',
      control: { type: 'object' },
      table: {
        type: {
          summary: '{ vertical: "top" | "middle" | "bottom", horizontal: "left" | "right" }',
        },
        defaultValue: { summary: '{ vertical: "top", horizontal: "right" }' },
        category: 'Props',
      },
    },
  },
  args: {
    value: 0,
    max: 99,
    variant: 'standard',
    color: 'blue',
    showZero: false,
    hidden: false,
    overlap: 'overlap',
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
  },
};

export default meta;
type Story = StoryObj<typeof BaseBadge>;

// 기본 배지 (Material UI 스타일)
export const BasicBadge: Story = {
  args: {
    value: 4,
    max: 99,
    variant: 'standard',
    color: 'blue',
    showZero: false,
    hidden: false,
    overlap: 'overlap',
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
  },
  render: (args) => ({
    components: { BaseBadge, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-4 items-center">
        <BaseBadge v-bind="args">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
      </div>
    `,
  }),
};

// 색상별 배지 (Material UI 스타일)
export const Colors: Story = {
  render: (args) => ({
    components: { BaseBadge, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-10 items-center">
        <BaseBadge :value="4" color="blue">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
        <BaseBadge :value="4" color="grey">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
        <BaseBadge :value="4" color="green">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
        <BaseBadge :value="4" color="yellow">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
        <BaseBadge :value="4" color="red">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
        <BaseBadge :value="4" color="purple">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
      </div>
    `,
  }),
};

// 최대값 설정
export const MaxValue: Story = {
  render: (args) => ({
    components: { BaseBadge, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-10 items-center">
        <BaseBadge :value="100" color="grey">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
        <BaseBadge :value="1000" :max="999" color="grey">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
      </div>
    `,
  }),
};

// 배지 가시성
export const BadgeVisibility: Story = {
  render: (args) => ({
    components: { BaseBadge, BaseIcon, BaseSwitch, BaseButton },
    setup() {
      const showBadge = ref(true);
      const showZero = ref(false);
      const count = ref(10);

      return { args, showBadge, showZero, count };
    },
    template: `        
      <div class="flex gap-10 items-center">
        <div class="flex flex-col items-center gap-4">
          <label class="flex items-center gap-2">
            <span class="text-sm">Show Badge</span>
          </label>
          <BaseBadge :value="10" :hidden="!showBadge" color="grey">
            <BaseIcon name="notification" size="md" />
          </BaseBadge>
          <BaseSwitch v-model="showBadge" />
        </div>
        <div class="flex flex-col items-center gap-4">
          <label class="flex items-center gap-2">
            <span class="text-sm">Show Zero</span>
          </label>
          <BaseBadge :value="0" :show-zero="showZero" color="grey">
            <BaseIcon name="notification" size="md" />
          </BaseBadge>
          <BaseSwitch v-model="showZero" />
        </div>
        <div class="flex flex-col items-center gap-4">
          <label class="flex items-center gap-2">
            <span class="text-sm">Show Zero</span>
          </label>
          <BaseBadge :value="count" :show-zero="showZero" color="grey">
            <BaseIcon name="notification" size="md" />
          </BaseBadge>
          <div class="flex gap-2">
            <BaseButton size="sm" label="-" variant="outline" @click="count = Math.max(0, Number(count) - 1)"/>
            <span class="min-w-[24px] text-center text-sm">{{ count }}</span>
            <BaseButton size="sm" label="+" variant="outline" @click="count = Number(count) + 1"/>
          </div>
        </div>
      </div>
    `,
  }),
};

// 점 배지
export const DotBadge: Story = {
  render: (args) => ({
    components: { BaseBadge, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-10 items-center">
        <BaseBadge variant="dot" color="grey" >
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
        <BaseBadge variant="dot" color="blue">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
        <BaseBadge variant="dot" color="green">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
        <BaseBadge variant="dot" color="yellow">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
        <BaseBadge variant="dot" color="red">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
        <BaseBadge variant="dot" color="purple">
          <BaseIcon name="notification" size="md" />
        </BaseBadge>
      </div>
    `,
  }),
};

// 배지 겹침
export const BadgeOverlap: Story = {
  render: (args) => ({
    components: { BaseBadge, BaseIcon, BaseButton, BaseSwitch },
    setup() {
      const overlap = ref<'overlap' | 'no-overlap'>('overlap');
      return { args, overlap };
    },
    template: `
      <div class="space-y-6">
        <div class="space-y-12">
          <div>
            <h3 class="text-lg font-semibold mb-4">Overlap Badge</h3>
            <div class="flex items-center gap-2">
              <BaseSwitch v-model="overlap" />
              <span class="text-sm">Overlap</span>
            </div>
          </div>          <div class="flex gap-10">
            <BaseBadge :value="4" color="red" :overlap="overlap?'overlap':'no-overlap'">
              <BaseIcon name="notification" size="md" />
            </BaseBadge>
            <BaseBadge variant="dot" color="red" :overlap="overlap?'overlap':'no-overlap'">
              <BaseIcon name="notification" size="md" />
            </BaseBadge>
          </div>
        </div>
      </div>
    `,
  }),
};

// 배지 정렬
export const BadgeAlignment: Story = {
  render: (args) => ({
    components: { BaseBadge, BaseIcon, BaseRadioGroup },
    setup() {
      const vertical = ref<'top' | 'bottom'>('top');
      const horizontal = ref<'left' | 'right'>('right');

      const verticalOptions = [
        { value: 'top', label: 'Top' },
        { value: 'middle', label: 'Middle' },
        { value: 'bottom', label: 'Bottom' },
      ];

      const horizontalOptions = [
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
      ];

      return { args, vertical, horizontal, verticalOptions, horizontalOptions };
    },
    template: `
      <div class="space-y-6">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Badge Alignment</h3>
          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Vertical</label>
              <BaseRadioGroup
                v-model="vertical"
                :options="verticalOptions"
                size="sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Horizontal</label>
              <BaseRadioGroup
                v-model="horizontal"
                :options="horizontalOptions"
                size="sm"
              />
            </div>
          </div>
        </div>
        
        <div class="flex justify-center items-center min-h-[200px]">
          <div class="relative">
            <BaseBadge
              :value="112"
              color="red"
              :anchor-origin="{ vertical, horizontal }"
            >
              <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <BaseIcon name="notification" size="md" />
              </div>
            </BaseBadge>
          </div>
        </div>
      </div>
    `,
  }),
};

// Square 배지 (항상 middle-right no-overlap)
export const SquareBadge: Story = {
  render: (args) => ({
    components: { BaseBadge, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <div class="flex gap-10 items-center">
        <BaseBadge :value="2" variant="square" color="grey">
          <span class="text-lg">잔고</span>
        </BaseBadge>
        <BaseBadge :value="12" variant="square" color="red">
          <span class="text-lg">알림</span>
        </BaseBadge>
      </div>
    `,
  }),
};
