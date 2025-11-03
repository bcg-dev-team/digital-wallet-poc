import BaseButton from '../../BaseButton/BaseButton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseAlert from '../BaseAlert.vue';

const meta: Meta<typeof BaseAlert> = {
  title: 'Alert/BaseAlert',
  component: BaseAlert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '경고/안내 메시지를 표시하는 배너 컴포넌트입니다.',
      },
    },
  },
  args: {
    variant: 'light',
    title: '',
    description: '추가 설명 텍스트입니다.',
    closable: true,
    showIcon: true,
    center: false,
  },
  argTypes: {
    variant: {
      description: '스타일 변형 (light: 연한, filled: 원색 배경, outlined: 테두리)',
      control: { type: 'select' },
      options: ['light', 'filled', 'outlined'],
      table: {
        type: { summary: 'light | filled | outlined' },
        defaultValue: { summary: 'light' },
        category: 'Props',
      },
    },
    severity: {
      description: '심각도 (선택 사항) — 아이콘/기본 색 매핑에 사용',
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error', ''],
      table: {
        type: { summary: 'success | info | warning | error | ' },
        defaultValue: { summary: '—' },
        category: 'Props',
      },
    },
    color: {
      description: '색상 계열 (선택 사항) — 지정 없으면 severity 또는 기본값 사용',
      control: { type: 'select' },
      options: ['primary', 'green', 'blue', 'yellow', 'red', ''],
      table: {
        type: { summary: 'primary | green | blue | yellow | red | ' },
        defaultValue: { summary: '—' },
        category: 'Props',
      },
    },
    title: {
      description: '제목 텍스트 (slot:title로 대체 가능)',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    description: {
      description: '본문 설명 (default slot로 대체 가능)',
      control: { type: 'text' },
      table: { category: 'Props' },
    },
    closable: {
      description: '닫기 가능 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
    },
    showIcon: {
      description: '아이콘 표시 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    center: {
      description: '콘텐츠 가운데 정렬',
      control: { type: 'boolean' },
      table: { category: 'Props' },
    },
    autoClose: {
      description: '자동 닫힘(ms)',
      control: { type: 'number' },
      table: { category: 'Behavior' },
    },
    textOverflow: {
      description: '텍스트 오버플로우 처리 방식',
      control: { type: 'select' },
      options: ['none', 'ellipsis', 'clip', 'slide'],
      table: {
        type: { summary: 'none | ellipsis | clip | slide' },
        defaultValue: { summary: 'none' },
        category: 'Text',
      },
    },
    rotate: {
      description: '슬라이드 모드 <br/> - ture: 회전 모드 <br/> - false: 회전 모드 off',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Text',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variant: Story = {
  render: (args) => ({
    components: { BaseAlert },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-3 flex-1">
        <BaseAlert v-bind="{...args, variant: 'light'}" title="light" :closable="false" />
        <BaseAlert v-bind="{...args, variant: 'filled'}" title="filled" :closable="false" />
        <BaseAlert v-bind="{...args, variant: 'outlined'}" title="outlined" :closable="false" />
      </div>
    `,
  }),
};

export const Severity: Story = {
  render: (args) => ({
    components: { BaseAlert },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-3 flex-1">
        <BaseAlert v-bind="{...args, severity: 'success'}" title="success" :closable="false" />
        <BaseAlert v-bind="{...args, severity: 'info'}" title="info" :closable="false" />
        <BaseAlert v-bind="{...args, severity: 'warning'}" title="warning" :closable="false" />
        <BaseAlert v-bind="{...args, severity: 'error'}" title="error" :closable="false" />
      </div>
    `,
  }),
};

export const Color: Story = {
  render: (args) => ({
    components: { BaseAlert },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-3 flex-1">
        <BaseAlert v-bind="{...args, color: 'primary'}" title="primary" :closable="false" />
        <BaseAlert v-bind="{...args, color: 'green'}" title="green" :closable="false" />
        <BaseAlert v-bind="{...args, color: 'blue'}" title="blue" :closable="false" />
        <BaseAlert v-bind="{...args, color: 'yellow'}" title="yellow" :closable="false" />
        <BaseAlert v-bind="{...args, color: 'red'}" title="red" :closable="false" />
      </div>
    `,
  }),
};

export const TitleToggle: Story = {
  render: (args) => ({
    components: { BaseAlert },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-3 flex-1">
        <BaseAlert v-bind="args" title="제목 있음" :closable="false" />
        <BaseAlert v-bind="{...args, title: undefined}" :closable="false" />
      </div>
    `,
  }),
};

export const Closable: Story = {
  render: (args) => ({
    components: { BaseAlert, BaseButton },
    setup() {
      return { args };
    },
    data() {
      return { open: true };
    },
    methods: {
      handleClose() {
        this.open = false;
      },
      handleOpen() {
        this.open = true;
      },
    },
    template: `
      <div class="space-y-4 flex-1">
        <BaseAlert v-if="open" v-bind="{...args, closable: true}" @close="handleClose" />
        <BaseButton v-else label="다시 열기" size="sm" @click="handleOpen" />
      </div>
    `,
  }),
};

export const Centered: Story = {
  args: { center: true, closable: false, showIcon: false },
};

export const WithIcon: Story = {
  args: { showIcon: true, closable: false },
};

export const WithSlots: Story = {
  args: { severity: 'success', showIcon: false, variant: 'filled', closable: false },
  render: (args) => ({
    components: { BaseAlert },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4 flex-1">
        <BaseAlert v-bind="args">
          <template #title>슬롯 제목</template>
          커스텀 <b>기본 슬롯</b> 콘텐츠입니다.
          <template #icon>
            <span class="inline-block h-3 w-3 rounded-sm bg-[var(--font-color-white)]" />
          </template>
        </BaseAlert>
        <BaseAlert v-bind="args" color="red" closable>
          <div class="text-font-12 font-regular">
            <span>AUDUSD 포지션 손실 주의 (마진레벨: 45%) </span>
            <span class="underline cursor-pointer"> 자세히</span>
          </div>
        </BaseAlert>
      </div>
    `,
  }),
};

export const DelayedAttributes: Story = {
  args: { autoClose: 2000 },
  parameters: {
    docs: {
      description: {
        story:
          '2초 후 자동으로 닫히는 예제입니다. 닫힌 후에는 버튼으로 다시 열 수 있습니다. 닫히는 시간을 지정하지 않으면 알림은 계속 표시됩니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseAlert, BaseButton },
    setup() {
      return { args };
    },
    data() {
      return { open: true };
    },
    methods: {
      handleClose() {
        this.open = false;
      },
      handleOpen() {
        this.open = true;
      },
    },
    template: `
      <div class="space-y-4 flex-1">
        <BaseAlert v-if="open" v-bind="{...args, closable: true}" @close="handleClose" />
        <BaseButton v-else label="다시 열기" size="sm" @click="handleOpen" />
      </div>
    `,
  }),
};

// 텍스트 오버플로우 처리 예제들
export const TextOverflowEllipsis: Story = {
  args: {
    description:
      '이것은 매우 긴 텍스트입니다. 이 텍스트는 컨테이너 너비를 넘어가므로 ellipsis(...)로 표시됩니다.',
    textOverflow: 'ellipsis',
    closable: false,
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 ellipsis(...)로 표시됩니다.',
      },
    },
  },
};

export const TextOverflowClip: Story = {
  args: {
    description:
      '이것은 매우 긴 텍스트입니다. 이 텍스트는 컨테이너 너비를 넘어가므로 영역에서 잘립니다.',
    textOverflow: 'clip',
    closable: false,
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 영역에서 잘립니다.',
      },
    },
  },
};

export const TextOverflowSlideContinuous: Story = {
  args: {
    description:
      '이것은 매우 긴 텍스트입니다. 이 텍스트는 컨테이너 너비를 넘어가므로 슬라이드 애니메이션이 적용됩니다. 끝까지 보여주면 다시 처음으로 돌아갑니다.',
    textOverflow: 'slide',
    rotate: false,
    closable: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '긴 텍스트가 슬라이드 애니메이션으로 표시됩니다. 끝까지 나오면 다시 반대로 흐르다가 처음으로 돌아가면 다시 흐르게 됩니다.',
      },
    },
  },
};

export const TextOverflowSlideRotate: Story = {
  args: {
    description:
      '이것은 매우 긴 텍스트입니다. 이 텍스트는 컨테이너 너비를 넘어가므로 슬라이드 애니메이션이 적용됩니다. 오른쪽으로 지나가서 왼쪽으로 나오는 한바퀴 도는 형태입니다.',
    textOverflow: 'slide',
    rotate: true,
    closable: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '긴 텍스트가 슬라이드 애니메이션으로 표시됩니다. 왼쪽으로 흐르다가 다 읽히면 오른쪽으로 문단 제일 앞쪽이 나오는 식입니다.',
      },
    },
  },
};

export const TextOverflowComparison: Story = {
  render: () => ({
    components: { BaseAlert },
    template: `
      <div class="space-y-4">
        <div>
          <h3 class="text-sm font-medium mb-2">None (기본)</h3>
          <BaseAlert
            description="이것은 매우 긴 텍스트입니다. 이 텍스트는 컨테이너 너비를 넘어가지만 오버플로우 처리가 적용되지 않습니다."
            text-overflow="none"
            :closable="false"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Ellipsis</h3>
          <BaseAlert
            description="이것은 매우 긴 텍스트입니다. 이 텍스트는 컨테이너 너비를 넘어가므로 ellipsis(...)로 표시됩니다."
            text-overflow="ellipsis"
            :closable="false"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Clip</h3>
          <BaseAlert
            description="이것은 매우 긴 텍스트입니다. 이 텍스트는 컨테이너 너비를 넘어가므로 영역에서 잘립니다."
            text-overflow="clip"
            :closable="false"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Slide (Continuous)</h3>
          <BaseAlert
            description="이것은 매우 긴 텍스트입니다. 이 텍스트는 컨테이너 너비를 넘어가므로 슬라이드 애니메이션이 적용됩니다. 끝까지 나오면 다시 반대로 흐르다가 처음으로 돌아가면 다시 흐르게 됩니다."
            text-overflow="slide"
            :rotate="false"
            :closable="false"
          />
        </div>
        <div>
          <h3 class="text-sm font-medium mb-2">Slide (Rotate)</h3>
          <BaseAlert
            description="이것은 매우 긴 텍스트입니다. 이 텍스트는 컨테이너 너비를 넘어가므로 슬라이드 애니메이션이 적용됩니다. 왼쪽으로 흐르다가 다 읽히면 오른쪽으로 문단 제일 앞쪽이 나오는 식입니다."
            text-overflow="slide"
            :rotate="true"
            :closable="false"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '다양한 텍스트 오버플로우 처리 방식을 비교할 수 있습니다.',
      },
    },
  },
};
