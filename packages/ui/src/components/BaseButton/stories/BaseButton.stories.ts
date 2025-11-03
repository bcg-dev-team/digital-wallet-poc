import type { Meta, StoryObj } from '@storybook/vue3';
import BaseButton from '../BaseButton.vue';

const meta: Meta<typeof BaseButton> = {
  title: 'Buttons/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '<a href="https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=32-244&t=Nx8blgYQ0WCWXVeQ-4" target="_blank" rel="noopener">Figma 링크</a>',
      },
    },
  },
  argTypes: {
    variant: {
      description: '버튼 스타일 (variant × color 조합으로 다양한 스타일 구현)',
      control: { type: 'select' },
      options: ['contained', 'contained-grey', 'outlined', 'light', 'chip'],
      table: {
        type: { summary: 'contained | contained-grey | outlined | light | chip' },
        defaultValue: { summary: 'contained' },
        category: 'Props',
      },
    },
    color: {
      description: '버튼 컬러',
      control: { type: 'select' },
      options: ['primary', 'red', 'blue', 'green', 'cancel', 'grey', 'white', 'black'],
      table: {
        type: { summary: 'primary | red | blue | green | cancel | grey | white | black' },
        defaultValue: { summary: 'primary' },
        category: 'Props',
      },
    },
    size: {
      description: '버튼 크기',
      control: { type: 'select' },
      options: ['lg', 'md', 'sm', 'mini'],
      table: {
        type: { summary: 'lg | md | sm | mini' },
        defaultValue: { summary: 'lg' },
        category: 'Props',
      },
    },
    pill: {
      description: 'pill 스타일 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    disabled: {
      description: '비활성화 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    leftIcon: {
      description: '좌측 아이콘 정보',
      control: { type: 'object' },
      table: {
        type: { summary: 'InnerIconProps' },
        category: 'Props',
      },
    },
    rightIcon: {
      description: '우측 아이콘 정보',
      control: { type: 'object' },
      table: {
        type: { summary: 'InnerIconProps' },
        category: 'Props',
      },
    },
    centerIcon: {
      description: '중앙 아이콘 정보 (중앙 아이콘 사용 시 label과 subLabel은 무시됩니다)',
      control: { type: 'object' },
      table: {
        type: { summary: 'InnerIconProps' },
        category: 'Props',
      },
    },
    label: {
      description: '버튼 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    subLabel: {
      description: '서브 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Base: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: '기본 버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '기본(Contained) 스타일의 Primary 버튼입니다.',
      },
    },
  },
};

// 외곽선 버튼
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'lg',
    label: '외곽선 버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '투명 배경에 테두리만 있는 Outlined 버튼입니다.',
      },
    },
  },
};

// Light 버튼 (파스텔톤 배경)
export const Light: Story = {
  args: {
    variant: 'light',
    color: 'primary',
    size: 'lg',
    label: 'Light 버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '파스텔톤 배경에 테두리가 있는 Light 버튼입니다.',
      },
    },
  },
};

// 색상별 버튼
export const Red: Story = {
  args: {
    variant: 'contained',
    color: 'red',
    size: 'lg',
    label: 'Red',
  },
};
export const Blue: Story = {
  args: {
    variant: 'contained',
    color: 'blue',
    size: 'lg',
    label: 'Blue',
  },
};
export const Green: Story = {
  args: {
    variant: 'contained',
    color: 'green',
    size: 'lg',
    label: 'Green',
  },
};
export const Cancel: Story = {
  args: {
    variant: 'contained',
    color: 'cancel',
    size: 'lg',
    label: 'Cancel',
  },
};
export const Grey: Story = {
  args: {
    variant: 'contained',
    color: 'grey',
    size: 'lg',
    label: 'Grey',
  },
};
export const Black: Story = {
  args: {
    variant: 'contained',
    color: 'black',
    size: 'lg',
    label: 'Black',
  },
  parameters: {
    docs: {
      description: {
        story: '검정색 배경에 흰색 텍스트를 가진 버튼입니다.',
      },
    },
  },
};

// 크기별 버튼
export const Large: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: 'Large',
  },
};
export const Medium: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'md',
    label: 'Medium',
  },
};
export const Small: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'sm',
    label: 'Small',
  },
};
export const Mini: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'mini',
    label: 'Mini',
  },
  parameters: {
    docs: {
      description: {
        story: '가장 작은 크기의 버튼입니다. 높이 20px, 폰트 크기 12px, font-weight 500입니다.',
      },
    },
  },
};

// Mini 크기 다양한 예시
export const MiniWithIcon: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'mini',
    label: 'Mini',
    leftIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Mini 크기 버튼에 아이콘을 추가한 예시입니다.',
      },
    },
  },
};

export const MiniOutlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'mini',
    label: 'Mini Outlined',
  },
  parameters: {
    docs: {
      description: {
        story: 'Mini 크기의 Outlined 버튼입니다.',
      },
    },
  },
};

export const MiniVariants: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex flex-wrap gap-4">
        <BaseButton
          variant="contained"
          color="primary"
          size="mini"
          label="Contained"
        />
        <BaseButton
          variant="outlined"
          color="primary"
          size="mini"
          label="Outlined"
        />
        <BaseButton
          variant="light"
          color="primary"
          size="mini"
          label="Light"
        />
        <BaseButton
          variant="contained"
          color="red"
          size="mini"
          label="Red"
        />
        <BaseButton
          variant="contained"
          color="blue"
          size="mini"
          label="Blue"
        />
        <BaseButton
          variant="contained"
          color="green"
          size="mini"
          label="Green"
        />
        <BaseButton
          variant="contained"
          color="black"
          size="mini"
          label="Black"
        />
        <BaseButton
          variant="contained"
          color="primary"
          size="mini"
          label="Icon"
          :left-icon="{ name: 'plus' }"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Mini 크기의 다양한 variant와 색상 조합입니다.',
      },
    },
  },
};

// 크기 비교
export const SizeComparison: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="flex items-end gap-4">
        <div class="space-y-2">
          <p class="text-sm font-medium text-gray-600">Large (48px)</p>
          <BaseButton
            variant="contained"
            color="primary"
            size="lg"
            label="Large"
          />
        </div>
        <div class="space-y-2">
          <p class="text-sm font-medium text-gray-600">Medium (40px)</p>
          <BaseButton
            variant="contained"
            color="primary"
            size="md"
            label="Medium"
          />
        </div>
        <div class="space-y-2">
          <p class="text-sm font-medium text-gray-600">Small (36px)</p>
          <BaseButton
            variant="contained"
            color="primary"
            size="sm"
            label="Small"
          />
        </div>
        <div class="space-y-2">
          <p class="text-sm font-medium text-gray-600">Mini (20px)</p>
          <BaseButton
            variant="contained"
            color="primary"
            size="mini"
            label="Mini"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '모든 크기(lg, md, sm, mini)를 한눈에 비교할 수 있습니다.',
      },
    },
  },
};

// pill 스타일
export const Pill: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    pill: true,
    label: 'Pill',
  },
};

// 비활성화 버튼 (contained)
export const DisabledContained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: 'Disabled',
    disabled: true,
  },
};
// 비활성화 버튼 (outlined)
export const DisabledOutlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'lg',
    label: 'Disabled',
    disabled: true,
  },
};

// 아이콘 포함 버튼
export const LeftIcon: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: 'Left Icon',
    leftIcon: { name: 'plus' },
  },
};
export const RightIcon: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: 'Right Icon',
    rightIcon: { name: 'plus' },
  },
};
export const BothIcons: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: 'Both Icons',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
};

// fullWidth 버튼
export const FullWidth: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: 'Full Width',
    fullWidth: true,
  },
};

// 서브텍스트 포함 버튼
export const WithSubLabel: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: 'Label',
    subLabel: 'SubLabel',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
};

// 모든 속성이 복잡하게 적용된 버튼 예시
export const Complex: Story = {
  args: {
    variant: 'outlined',
    color: 'red',
    size: 'lg',
    pill: true,
    disabled: false,
    fullWidth: true,
    label: 'Label',
    subLabel: 'SubLabel',
    leftIcon: { name: 'plus' },
    rightIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '모든 주요 속성이 조합된 복잡한 버튼 예시입니다.',
      },
    },
  },
};

// Variant 비교 스토리
export const VariantComparison: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div class="space-y-8">
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Contained</h3>
          <div class="flex flex-wrap gap-4">
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Primary</p>
              <BaseButton
                variant="contained"
                color="primary"
                size="lg"
                label="Primary"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Red</p>
              <BaseButton
                variant="contained"
                color="red"
                size="lg"
                label="Red"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Blue</p>
              <BaseButton
                variant="contained"
                color="blue"
                size="lg"
                label="Blue"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Green</p>
              <BaseButton
                variant="contained"
                color="green"
                size="lg"
                label="Green"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Cancel</p>
              <BaseButton
                variant="contained"
                color="cancel"
                size="lg"
                label="Cancel"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Grey</p>
              <BaseButton
                variant="contained"
                color="grey"
                size="lg"
                label="Grey"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Black</p>
              <BaseButton
                variant="contained"
                color="black"
                size="lg"
                label="Black"
              />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Contained Grey (회색 배경 + 색상 텍스트)</h3>
          <div class="flex flex-wrap gap-4">
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Primary</p>
              <BaseButton
                variant="contained-grey"
                color="primary"
                size="lg"
                label="Primary"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Red</p>
              <BaseButton
                variant="contained-grey"
                color="red"
                size="lg"
                label="Red"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Blue</p>
              <BaseButton
                variant="contained-grey"
                color="blue"
                size="lg"
                label="Blue"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Green</p>
              <BaseButton
                variant="contained-grey"
                color="green"
                size="lg"
                label="Green"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Cancel</p>
              <BaseButton
                variant="contained-grey"
                color="cancel"
                size="lg"
                label="Cancel"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Grey</p>
              <BaseButton
                variant="contained-grey"
                color="grey"
                size="lg"
                label="Grey"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Black</p>
              <BaseButton
                variant="contained-grey"
                color="black"
                size="lg"
                label="Black"
              />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Outlined (테두리만, 배경 투명)</h3>
          <div class="flex flex-wrap gap-4">
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Primary</p>
              <BaseButton
                variant="outlined"
                color="primary"
                size="lg"
                label="Primary"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Red</p>
              <BaseButton
                variant="outlined"
                color="red"
                size="lg"
                label="Red"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Blue</p>
              <BaseButton
                variant="outlined"
                color="blue"
                size="lg"
                label="Blue"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Green</p>
              <BaseButton
                variant="outlined"
                color="green"
                size="lg"
                label="Green"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Cancel</p>
              <BaseButton
                variant="outlined"
                color="cancel"
                size="lg"
                label="Cancel"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Black</p>
              <BaseButton
                variant="outlined"
                color="black"
                size="lg"
                label="Black"
              />
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Light (파스텔톤 배경 + 테두리)</h3>
          <div class="flex flex-wrap gap-4">
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Primary</p>
              <BaseButton
                variant="light"
                color="primary"
                size="lg"
                label="Primary"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Red</p>
              <BaseButton
                variant="light"
                color="red"
                size="lg"
                label="Red"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Blue</p>
              <BaseButton
                variant="light"
                color="blue"
                size="lg"
                label="Blue"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Green</p>
              <BaseButton
                variant="light"
                color="green"
                size="lg"
                label="Green"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Cancel</p>
              <BaseButton
                variant="light"
                color="cancel"
                size="lg"
                label="Cancel"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Grey</p>
              <BaseButton
                variant="light"
                color="grey"
                size="lg"
                label="Grey"
              />
            </div>
            <div class="space-y-2">
              <p class="text-sm font-medium text-gray-600">Black</p>
              <BaseButton
                variant="light"
                color="black"
                size="lg"
                label="Black"
              />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '모든 variant(contained, contained-grey, outlined)를 색상별로 비교할 수 있습니다. 각 variant의 스타일 차이를 확인하세요.',
      },
    },
  },
};

// 접근성 테스트: aria-label 커스텀
export const AriaLabelCustom: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: '실제 버튼 텍스트',
    // aria-label은 label로 자동 부여됨
  },
  parameters: {
    docs: {
      description: {
        story: 'label이 aria-label로 자동 부여되는지 확인하세요.',
      },
    },
  },
};

// 접근성 테스트: href prop으로 <a role="button">
export const AsLinkButton: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: '링크 버튼',
    href: 'https://blockchainglobal.co.kr/',
  },
  parameters: {
    docs: {
      description: {
        story: 'href prop이 있으면 <a role="button">으로 렌더링됩니다. 키보드/마우스 접근성 확인.',
      },
    },
  },
};

// 접근성 테스트: disabled + href (비활성화 링크 버튼)
export const DisabledLinkButton: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: '비활성화 링크 버튼',
    href: 'https://blockchainglobal.co.kr/',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'disabled + href 조합에서 aria-disabled, tabindex=-1, 클릭/키보드 이벤트 차단 확인.',
      },
    },
  },
};

// 접근성 테스트: 키보드 내비게이션 안내
export const KeyboardNavigation: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    label: 'Tab/Enter/Space로 테스트',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tab으로 포커스, Enter/Space로 클릭 이벤트가 정상 동작하는지 확인하세요.',
      },
    },
  },
};

// Figma 디자인 기반 커스텀 색상 버튼
export const CustomGreen: Story = {
  args: {
    variant: 'contained',
    size: 'md',
    label: '인증완료',
    rightIcon: { name: 'check-circle', color: 'currentColor' },
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
      <BaseButton
        v-bind="args"
        :style="{
          backgroundColor: 'var(--base-colors-green-green050)',
          color: 'var(--base-colors-green-green800)',
          borderColor: 'var(--base-colors-green-green800)'
        }"
        class="btn-no-events"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Figma 디자인 기반의 인증완료 버튼입니다. 연한 초록색 배경에 진한 초록색 텍스트와 테두리를 가지며, 이벤트가 비활성화되어 있습니다.',
      },
    },
  },
};

// 커스텀 단색 버튼
export const CustomSolid: Story = {
  args: {
    variant: 'contained',
    size: 'lg',
    label: '커스텀 단색 버튼',
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      const customStyles = {
        backgroundColor: '#ff6b6b',
        color: '#ffffff',
        borderColor: '#ff6b6b',
        transition: 'all 0.2s ease',
      };

      const handleMouseEnter = (event: Event) => {
        const target = event.target as HTMLElement;
        if (target) {
          target.style.backgroundColor = '#e55a5a';
          target.style.borderColor = '#e55a5a';
        }
      };

      const handleMouseLeave = (event: Event) => {
        const target = event.target as HTMLElement;
        if (target) {
          target.style.backgroundColor = '#ff6b6b';
          target.style.borderColor = '#ff6b6b';
        }
      };

      return { args, customStyles, handleMouseEnter, handleMouseLeave };
    },
    template: `
      <div>
        <BaseButton
          v-bind="args"
          :style="customStyles"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '단색 배경을 사용한 커스텀 버튼입니다. 호버 시 색상이 어두워집니다.',
      },
    },
  },
};

// 커스텀 그라데이션 버튼
export const CustomGradient: Story = {
  args: {
    variant: 'contained',
    size: 'lg',
    label: '그라데이션 버튼',
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      const customStyles = {
        background: 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)',
        color: '#ffffff',
        borderColor: 'transparent',
        transition: 'all 0.2s ease',
      };

      const handleMouseEnter = (event: Event) => {
        const target = event.target as HTMLElement;
        if (target) {
          target.style.background = 'linear-gradient(135deg, #9bb0ff 0%, #2e1f85 100%)';
        }
      };

      const handleMouseLeave = (event: Event) => {
        const target = event.target as HTMLElement;
        if (target) {
          target.style.background = 'linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%)';
        }
      };

      return { args, customStyles, handleMouseEnter, handleMouseLeave };
    },
    template: `
      <div>
        <BaseButton
          v-bind="args"
          :style="customStyles"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '그라데이션 배경을 사용한 커스텀 버튼입니다. 호버 시 그라데이션이 어두워집니다.',
      },
    },
  },
};

// 중앙 아이콘만 있는 버튼들
export const CenterIcon: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    centerIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '중앙에 아이콘만 있는 기본 버튼입니다. label과 subLabel은 무시됩니다.',
      },
    },
  },
};

export const CenterIconOutlined: Story = {
  args: {
    variant: 'outlined',
    color: 'primary',
    size: 'lg',
    centerIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '중앙에 아이콘만 있는 outlined 스타일 버튼입니다.',
      },
    },
  },
};

export const CenterIconPill: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'lg',
    pill: true,
    centerIcon: { name: 'plus' },
  },
  parameters: {
    docs: {
      description: {
        story: '중앙에 아이콘만 있는 pill 스타일 버튼입니다.',
      },
    },
  },
};

export const CenterIconCustomColor: Story = {
  args: {
    variant: 'contained',
    size: 'lg',
    centerIcon: { name: 'star' },
  },
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args };
    },
    template: `
      <BaseButton
        v-bind="args"
        :style="{
          backgroundColor: '#FFD700',
          color: '#ff0000',
          borderColor: '#FFD700'
        }"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '커스텀 색상을 사용한 중앙 아이콘 버튼입니다. 별표 아이콘과 노란색 배경을 사용합니다. 아이콘은 currentColor로 설정되어 검은색으로 표시됩니다.',
      },
    },
  },
};
