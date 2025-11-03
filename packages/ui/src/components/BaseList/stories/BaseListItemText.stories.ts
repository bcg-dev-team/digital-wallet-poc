/**
 * BaseListItemText 컴포넌트 Storybook 스토리
 */
import BaseListItemAvatar from '../BaseListItemAvatar.vue';
import BaseListItemText from '../BaseListItemText.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseListItem from '../BaseListItem.vue';

const meta: Meta<typeof BaseListItemText> = {
  title: 'List/BaseListItemText',
  component: BaseListItemText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `BaseListItemText는 리스트 아이템 내부에서 사용하는 텍스트 컴포넌트입니다.`,
      },
    },
  },
  argTypes: {
    primary: {
      description: '주요 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    secondary: {
      description: '보조 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    rightPrimary: {
      description: '오른쪽 끝 주요 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    rightSecondary: {
      description: '오른쪽 끝 보조 텍스트',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    inset: {
      description: '들여쓰기 여부 (아바타가 있을 때 사용)',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    multiline: {
      description: '여러 줄 텍스트 지원 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    noWrap: {
      description: '텍스트 줄바꿈 방지 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
  },
  args: {
    primary: '주요 텍스트',
    secondary: '보조 텍스트',
    rightPrimary: undefined,
    rightSecondary: undefined,
    inset: false,
    multiline: false,
    noWrap: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: (args) => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="min-width: 400px;">
        <BaseListItem>
          <template #content>
            <BaseListItemText v-bind="args" />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 보조 텍스트가 없는 경우
export const PrimaryOnly: Story = {
  args: {
    primary: '주요 텍스트만',
    secondary: undefined,
  },
  render: (args) => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="min-width: 400px;">
        <BaseListItem>
          <template #content>
            <BaseListItemText v-bind="args" />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 들여쓰기가 있는 경우
export const WithInset: Story = {
  args: {
    primary: '들여쓰기가 적용된 텍스트',
    secondary: '아바타와 함께 사용할 때 적합합니다',
    inset: true,
  },
  render: (args) => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="min-width: 400px;">
        <BaseListItem>
          <template #content>
            <BaseListItemText v-bind="args" />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 여러 줄 텍스트
export const Multiline: Story = {
  args: {
    primary:
      '여러 줄로 표시되는 긴 주요 텍스트입니다. 이 텍스트는 두 줄까지 표시되며, 그 이상은 생략됩니다.',
    secondary:
      '여러 줄로 표시되는 긴 보조 텍스트입니다. 이 텍스트도 두 줄까지 표시되며, 그 이상은 생략됩니다.',
    multiline: true,
  },
  render: (args) => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="min-width: 400px;">
        <BaseListItem>
          <template #content>
            <BaseListItemText v-bind="args" />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 줄바꿈 방지
export const NoWrap: Story = {
  args: {
    primary:
      '줄바꿈이 방지되는 긴 텍스트입니다. 이 텍스트는 한 줄로만 표시되며, 넘치는 부분은 생략됩니다.',
    secondary: '줄바꿈이 방지되는 긴 보조 텍스트입니다.',
    noWrap: true,
  },
  render: (args) => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="min-width: 400px;">
        <BaseListItem>
          <template #content>
            <BaseListItemText v-bind="args" />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 긴 텍스트 (기본)
export const LongText: Story = {
  args: {
    primary:
      '이것은 매우 긴 주요 텍스트입니다. 이 텍스트는 한 줄로 표시되며, 넘치는 부분은 생략됩니다.',
    secondary:
      '이것은 매우 긴 보조 텍스트입니다. 이 텍스트도 한 줄로 표시되며, 넘치는 부분은 생략됩니다.',
  },
  render: (args) => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="min-width: 400px;">
        <BaseListItem>
          <template #content>
            <BaseListItemText v-bind="args" />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 실제 사용 예시 (BaseListItem과 함께)
export const InListItem: Story = {
  render: () => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return {};
    },
    template: `
      <div style="min-width: 400px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">BaseListItem과 함께 사용하는 예시</h3>
        
        <!-- 기본 텍스트 -->
        <BaseListItem style="margin-bottom: 12px;">
          <template #content>
            <BaseListItemText 
              primary="사용자 이름"
              secondary="사용자 이메일 주소"
            />
          </template>
        </BaseListItem>
        
        <!-- 들여쓰기가 있는 텍스트 (아바타와 함께 사용할 때) -->
        <BaseListItem style="margin-bottom: 12px;">
          <template #content>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 44px; height: 44px; background-color: #e0e0e0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #666;">
                JD
              </div>
              <BaseListItemText 
                primary="John Doe"
                secondary="john.doe@example.com"
                inset
              />
            </div>
          </template>
        </BaseListItem>
        
        <!-- 여러 줄 텍스트 -->
        <BaseListItem style="margin-bottom: 12px;">
          <template #content>
            <BaseListItemText 
              primary="매우 긴 제목 텍스트입니다. 이 텍스트는 여러 줄로 표시될 수 있습니다."
              secondary="매우 긴 설명 텍스트입니다. 이 텍스트도 여러 줄로 표시될 수 있습니다."
              multiline
            />
          </template>
        </BaseListItem>
        
        <!-- 줄바꿈 방지 -->
        <BaseListItem>
          <template #content>
            <BaseListItemText 
              primary="줄바꿈이 방지되는 텍스트입니다. 이 텍스트는 한 줄로만 표시됩니다."
              secondary="보조 텍스트도 줄바꿈이 방지됩니다."
              noWrap
            />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 오른쪽 텍스트가 있는 경우
export const WithRightText: Story = {
  args: {
    primary: '사용자 이름',
    secondary: '사용자 이메일 주소',
    rightPrimary: '2024-01-15',
    rightSecondary: '활성',
  },
  render: (args) => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="min-width: 400px;">
        <BaseListItem>
          <template #content>
            <BaseListItemText v-bind="args" />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 오른쪽 주요 텍스트만 있는 경우
export const WithRightPrimaryOnly: Story = {
  args: {
    primary: '제품명',
    secondary: '제품 설명',
    rightPrimary: '$29.99',
  },
  render: (args) => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="min-width: 400px;">
        <BaseListItem>
          <template #content>
            <BaseListItemText v-bind="args" />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 오른쪽 보조 텍스트만 있는 경우
export const WithRightSecondaryOnly: Story = {
  args: {
    primary: '알림 제목',
    secondary: '알림 내용',
    rightSecondary: '방금 전',
  },
  render: (args) => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="min-width: 400px;">
        <BaseListItem>
          <template #content>
            <BaseListItemText v-bind="args" />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 오른쪽 텍스트와 들여쓰기가 함께 있는 경우
export const WithRightTextAndInset: Story = {
  args: {
    primary: '사용자 이름',
    secondary: '사용자 이메일 주소',
    rightPrimary: '2024-01-15',
    rightSecondary: '활성',
    inset: true,
  },
  render: (args) => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="min-width: 400px;">
        <BaseListItem>
          <template #content>
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 44px; height: 44px; background-color: #e0e0e0; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #666;">
                JD
              </div>
              <BaseListItemText v-bind="args" />
            </div>
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 여러 줄 텍스트와 오른쪽 텍스트
export const MultilineWithRightText: Story = {
  args: {
    primary: '매우 긴 제목 텍스트입니다. 이 텍스트는 여러 줄로 표시될 수 있습니다.',
    secondary: '매우 긴 설명 텍스트입니다. 이 텍스트도 여러 줄로 표시될 수 있습니다.',
    rightPrimary: '긴 오른쪽 텍스트',
    rightSecondary: '오른쪽 보조 텍스트',
    multiline: true,
  },
  render: (args) => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="min-width: 400px;">
        <BaseListItem>
          <template #content>
            <BaseListItemText v-bind="args" />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 슬롯을 사용한 커스텀 레이아웃
export const WithCustomSlots: Story = {
  render: () => ({
    components: { BaseListItemText, BaseListItem },
    setup() {
      return {};
    },
    template: `
      <div style="min-width: 600px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">슬롯을 사용한 커스텀 레이아웃 예시</h3>
        
        <!-- 왼쪽 슬롯만 사용 -->
        <BaseListItem style="margin-bottom: 16px;">
          <template #content>
            <BaseListItemText 
              primary="중요 알림"
              secondary="시스템 점검이 예정되어 있습니다"
            >
              <template #left>
                <div style="width: 32px; height: 32px; background-color: #ff6b6b; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">
                  !
                </div>
              </template>
            </BaseListItemText>
          </template>
        </BaseListItem>
        
        <!-- 오른쪽 슬롯만 사용 -->
        <BaseListItem style="margin-bottom: 16px;">
          <template #content>
            <BaseListItemText 
              primary="상태 표시"
              secondary="현재 시스템 상태"
            >
              <template #right>
                <div style="padding: 4px 8px; background-color: #4ecdc4; color: white; border-radius: 4px; font-size: 12px; font-weight: bold;">
                  활성
                </div>
              </template>
            </BaseListItemText>
          </template>
        </BaseListItem>
        
        <!-- 양쪽 슬롯 모두 사용 -->
        <BaseListItem style="margin-bottom: 16px;">
          <template #content>
            <BaseListItemText 
              primary="프리미엄 서비스"
              secondary="고급 기능을 사용할 수 있습니다"
            >
              <template #left>
                <div style="width: 40px; height: 40px; background-color: #f39c12; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; font-weight: bold;">
                  $
                </div>
              </template>
              <template #right>
                <div style="padding: 6px 12px; background-color: #9b59b6; color: white; border-radius: 6px; font-size: 14px; font-weight: bold;">
                  $99.99
                </div>
              </template>
            </BaseListItemText>
          </template>
        </BaseListItem>
        
        <!-- 슬롯 + 오른쪽 텍스트 props 조합 -->
        <BaseListItem style="margin-bottom: 16px;">
          <template #content>
            <BaseListItemText 
              primary="사용자 정보"
              secondary="john.doe@example.com"
              rightPrimary="2024-01-15"
              rightSecondary="활성"
            >
              <template #left>
                <div style="width: 44px; height: 44px; background-color: #3498db; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">
                  JD
                </div>
              </template>
              <template #right>
                <div style="padding: 2px 6px; background-color: #e74c3c; color: white; border-radius: 3px; font-size: 10px;">
                  VIP
                </div>
              </template>
            </BaseListItemText>
          </template>
        </BaseListItem>
        
        <!-- 복합 커스텀 레이아웃 -->
        <BaseListItem>
          <template #content>
            <BaseListItemText 
              primary="프리미엄 기능"
              secondary="고급 기능을 사용할 수 있습니다"
              multiline
            >
              <template #left>
                <div style="width: 48px; height: 48px; background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: bold;">
                  ⭐
                </div>
              </template>
              <template #right>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
                  <span style="font-size: 14px; color: #27ae60; font-weight: 600;">활성화됨</span>
                  <span style="font-size: 12px; color: #666;">2024-01-20</span>
                </div>
              </template>
            </BaseListItemText>
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// BaseListItemAvatar와 함께 사용
export const WithAvatar: Story = {
  render: () => ({
    components: { BaseListItemText, BaseListItemAvatar, BaseListItem },
    setup() {
      return {};
    },
    template: `
      <div style="min-width: 600px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">BaseListItemAvatar와 함께 사용하는 예시</h3>
        
        <!-- 기본 아바타 + 텍스트 -->
        <BaseListItem style="margin-bottom: 12px;">
          <template #content>
            <div style="display: flex; align-items: center; gap: 12px;">
              <BaseListItemAvatar fallback="JD" color="primary" />
              <BaseListItemText 
                primary="John Doe"
                secondary="john.doe@example.com"
                inset
              />
            </div>
          </template>
        </BaseListItem>
        
        <!-- 이미지 아바타 + 오른쪽 텍스트 -->
        <BaseListItem style="margin-bottom: 12px;">
          <template #content>
            <div style="display: flex; align-items: center; gap: 12px;">
              <BaseListItemAvatar 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="사용자 프로필"
                size="lg"
              />
              <BaseListItemText 
                primary="Jane Smith"
                secondary="jane.smith@example.com"
                rightPrimary="2024-01-15"
                rightSecondary="온라인"
                inset
              />
            </div>
          </template>
        </BaseListItem>
        
        <!-- 아이콘 아바타 + 여러 줄 텍스트 -->
        <BaseListItem style="margin-bottom: 12px;">
          <template #content>
            <div style="display: flex; align-items: center; gap: 12px;">
              <BaseListItemAvatar 
                :icon="{ name: 'settings', size: 'md' }"
                color="blue"
                variant="rounded"
              />
              <BaseListItemText 
                primary="시스템 설정"
                secondary="시스템 전반적인 설정을 관리합니다. 매우 긴 설명 텍스트입니다."
                inset
                multiline
              />
            </div>
          </template>
        </BaseListItem>
        
        <!-- 커스텀 색상 아바타 + 줄바꿈 방지 텍스트 -->
        <BaseListItem>
          <template #content>
            <div style="display: flex; align-items: center; gap: 12px;">
              <BaseListItemAvatar 
                fallback="AB"
                color="custom"
                backgroundColor="#ff6b6b"
                iconColor="#ffffff"
                variant="square"
              />
              <BaseListItemText 
                primary="매우 긴 사용자 이름입니다. 이 텍스트는 한 줄로만 표시됩니다."
                secondary="매우 긴 이메일 주소입니다. 이 텍스트도 한 줄로만 표시됩니다."
                inset
                :noWrap="true"
              />
            </div>
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 실제 사용 사례 시뮬레이션
export const RealWorldExamples: Story = {
  render: () => ({
    components: { BaseListItemText, BaseListItemAvatar, BaseListItem },
    setup() {
      return {};
    },
    template: `
      <div style="min-width: 600px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">실제 사용 사례 시뮬레이션</h3>
        
        <!-- 사용자 목록 -->
        <div style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="padding: 16px; background-color: #f8f9fa; border-bottom: 1px solid #e0e0e0;">
            <h4 style="margin: 0; color: #333;">사용자 목록</h4>
          </div>
          
          <BaseListItem style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
            <template #content>
                <BaseListItemAvatar fallback="JD" color="primary" />
                <BaseListItemText 
                  primary="John Doe"
                  secondary="john.doe@example.com"
                  rightPrimary="2024-01-15"
                  rightSecondary="활성"
                  inset
                />
            </template>
          </BaseListItem>
          
          <BaseListItem style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
            <template #content>
                <BaseListItemAvatar 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="사용자 프로필"
                />
                <BaseListItemText 
                  primary="Jane Smith"
                  secondary="jane.smith@example.com"
                  rightPrimary="2024-01-14"
                  rightSecondary="오프라인"
                  inset
                />
            </template>
          </BaseListItem>
          
          <BaseListItem style="padding: 12px;">
            <template #content>
                <BaseListItemAvatar 
                  :icon="{ name: 'person', size: 'md' }"
                  color="green"
                />
                <BaseListItemText 
                  primary="Alice Brown"
                  secondary="alice.brown@example.com"
                  rightPrimary="2024-01-13"
                  rightSecondary="활성"
                  inset
                />
            </template>
          </BaseListItem>
        </div>
        
        <!-- 알림 목록 -->
        <div style="border: 1px solid #e0e0e0; border-radius: 8px; margin-top: 16px; overflow: hidden;">
          <div style="padding: 16px; background-color: #fff3cd; border-bottom: 1px solid #e0e0e0;">
            <h4 style="margin: 0; color: #856404;">알림 목록</h4>
          </div>
          
          <BaseListItem style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
            <template #content>
              <BaseListItemText 
                primary="시스템 점검 알림"
                secondary="정기 시스템 점검이 예정되어 있습니다"
                rightPrimary="방금 전"
                rightSecondary="중요"
              >
                <template #left>
                  <div style="width: 32px; height: 32px; background-color: #ff6b6b; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">
                    !
                  </div>
                </template>
              </BaseListItemText>
            </template>
          </BaseListItem>
          
          <BaseListItem style="padding: 12px;">
            <template #content>
              <BaseListItemText 
                primary="업데이트 완료"
                secondary="새로운 기능이 업데이트되었습니다"
                rightPrimary="1시간 전"
                rightSecondary="정보"
              >
                <template #left>
                  <div style="width: 32px; height: 32px; background-color: #4ecdc4; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">
                    ✓
                  </div>
                </template>
              </BaseListItemText>
            </template>
          </BaseListItem>
        </div>
      </div>
    `,
  }),
};
