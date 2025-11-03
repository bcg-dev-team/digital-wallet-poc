/**
 * BaseListItem 컴포넌트 Storybook 스토리
 */
import BaseListItemAvatar from '../BaseListItemAvatar.vue';
import BaseListItemText from '../BaseListItemText.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import BaseListItem from '../BaseListItem.vue';

const meta: Meta<typeof BaseListItem> = {
  title: 'List/BaseListItem',
  component: BaseListItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `BaseListItem은 리스트 아이템 컴포넌트입니다.`,
      },
    },
  },
  args: {
    clickable: false,
    disabled: false,
    divider: false,
    selected: false,
    secondaryAction: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseListItem v-bind="args">
        <template #content>
          <BaseIcon name="home" />
          <span>기본 리스트 아이템</span>
        </template>
      </BaseListItem>
    `,
  }),
};

// 클릭 가능한 리스트 아이템
export const Clickable: Story = {
  args: {
    clickable: true,
  },
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      const handleClick = () => {
        console.log('BaseListItem clicked!');
      };
      return { args, handleClick };
    },
    template: `
      <BaseListItem v-bind="args" @click="handleClick">
        <template #content>
          <BaseIcon name="settings" />
          <span>클릭 가능한 리스트 아이템</span>
        </template>
      </BaseListItem>
    `,
  }),
};

// 구분선
export const Divider: Story = {
  args: {
    divider: true,
  },
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseListItem v-bind="args">
        <template #content>
          <BaseIcon name="notification" />
          <span>구분선이 있는 리스트 아이템</span>
        </template>
      </BaseListItem>
    `,
  }),
};

// 선택된 상태
export const Selected: Story = {
  args: {
    selected: true,
  },
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseListItem v-bind="args">
        <template #content>
          <BaseIcon name="star" />
          <span>선택된 리스트 아이템</span>
        </template>
      </BaseListItem>
    `,
  }),
};

// 비활성화
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseListItem v-bind="args">
        <template #content>
          <BaseIcon name="home" />
          <span>비활성화된 리스트 아이템</span>
        </template>
      </BaseListItem>
    `,
  }),
};

// 보조 액션이 있는 경우
export const WithSecondaryAction: Story = {
  args: {
    secondaryAction: { name: 'edit' },
  },
  render: (args) => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      const handleSecondaryActionClick = () => {
        console.log('Secondary action clicked!');
      };
      return { args, handleSecondaryActionClick };
    },
    template: `
      <BaseListItem v-bind="args" @secondaryActionClick="handleSecondaryActionClick">
        <template #content>
          <BaseIcon name="home" />
          <span>보조 액션이 있는 리스트 아이템</span>
        </template>
      </BaseListItem>
    `,
  }),
};

// 아바타와 함께 사용
export const WithAvatar: Story = {
  render: () => ({
    components: { BaseListItem, BaseListItemAvatar },
    setup() {
      return {};
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">아바타와 함께 사용하는 예시</h3>
        
        <!-- 기본 아바타 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar fallback="JD" />
            <span>John Doe</span>
          </template>
        </BaseListItem>
        
        <!-- 이미지 아바타 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="사용자 프로필"
            />
            <span>Jane Smith</span>
          </template>
        </BaseListItem>
        
        <!-- 직접 아이콘 지정 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar 
              :icon="{ name: 'settings', size: 'md' }"
              size="md"
              variant="rounded"
            />
            <span>설정 메뉴</span>
          </template>
        </BaseListItem>
        
        <!-- 큰 아바타 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar size="lg" fallback="AB" />
            <span>Alice Brown</span>
          </template>
        </BaseListItem>
        
        <!-- 둥근 모서리 아바타 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar variant="rounded" fallback="CD" />
            <span>Charlie Davis</span>
          </template>
        </BaseListItem>
        
        <!-- 사각형 아바타 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar variant="square" fallback="EF" />
            <span>Eve Franklin</span>
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 모든 상태 조합
export const AllStates: Story = {
  render: () => ({
    components: { BaseListItem, BaseIcon },
    setup() {
      const handleClick = (itemName: string) => {
        console.log(`${itemName} clicked!`);
      };
      const handleSecondaryActionClick = (action: string) => {
        console.log(`${action} action clicked!`);
      };
      return { handleClick, handleSecondaryActionClick };
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">모든 상태 조합 예시</h3>
        
        <!-- 기본 상태 -->
        <BaseListItem>
          <template #content>
            <BaseIcon name="home" />
            <span>기본 상태</span>
          </template>
        </BaseListItem>
        
        <!-- 클릭 가능한 상태 -->
        <BaseListItem :clickable="true" @click="handleClick('클릭 가능한')">
          <template #content>
            <BaseIcon name="settings" />
            <span>클릭 가능한 상태</span>
          </template>
        </BaseListItem>
        
        <!-- 구분선 포함 -->
        <BaseListItem :divider="true">
          <template #content>
            <BaseIcon name="notification" />
            <span>구분선이 있는 상태</span>
          </template>
        </BaseListItem>
        
        <!-- 선택된 상태 -->
        <BaseListItem :selected="true">
          <template #content>
            <BaseIcon name="star" />
            <span>선택된 상태</span>
          </template>
        </BaseListItem>
        
         <!-- 비활성화된 상태 -->
         <BaseListItem :disabled="true">
           <template #content>
             <BaseIcon name="home" />
             <span>비활성화된 상태</span>
           </template>
         </BaseListItem>
         
         <!-- 보조 액션이 있는 상태 -->
         <BaseListItem :secondary-action="{ name: 'edit' }" @secondaryActionClick="handleSecondaryActionClick('편집')">
           <template #content>
             <BaseIcon name="home" />
             <span>보조 액션이 있는 상태</span>
           </template>
         </BaseListItem>
         
         <!-- 복합 상태: 비활성화 + 보조 액션 -->
         <BaseListItem 
           :disabled="true" 
           :secondary-action="{ name: 'trash' }" 
           @secondaryActionClick="handleSecondaryActionClick('삭제')"
         >
           <template #content>
             <BaseIcon name="home" />
             <span>비활성화 + 보조 액션</span>
           </template>
         </BaseListItem>
         
         <!-- 복합 상태: 클릭 가능 + 보조 액션 -->
         <BaseListItem 
           :clickable="true" 
           :secondary-action="{ name: 'star' }" 
           @click="handleClick('클릭 가능 + 보조 액션')"
           @secondaryActionClick="handleSecondaryActionClick('즐겨찾기')"
         >
           <template #content>
             <BaseIcon name="heart" />
             <span>클릭 가능 + 보조 액션</span>
           </template>
         </BaseListItem>
      </div>
    `,
  }),
};

// 아바타와 텍스트 조합 + 슬롯 사용
export const WithAvatarTextAndSlots: Story = {
  render: () => ({
    components: { BaseListItem, BaseListItemAvatar, BaseListItemText },
    setup() {
      return {};
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">아바타, 텍스트, 슬롯 조합 예시</h3>
        
        <!-- 기본 아바타 + 텍스트 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar fallback="JD" color="primary" />
            <BaseListItemText 
              primary="John Doe"
              secondary="john.doe@example.com"
              inset
            />
          </template>
        </BaseListItem>
        
        <!-- 이미지 아바타 + 오른쪽 텍스트 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="사용자 프로필"
            />
            <BaseListItemText 
              primary="Jane Smith"
              secondary="jane.smith@example.com"
              rightPrimary="2024-01-15"
              rightSecondary="온라인"
              inset
            />
          </template>
        </BaseListItem>
        
        <!-- 아이콘 아바타 + 여러 줄 텍스트 -->
        <BaseListItem>
          <template #content>
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
          </template>
        </BaseListItem>
        
        <!-- 클릭 가능 + 보조 액션 -->
        <BaseListItem :clickable="true" :secondary-action="{ name: 'edit' }">
          <template #content>
            <BaseListItemAvatar fallback="AB" color="green" variant="square" />
            <BaseListItemText 
              primary="Alice Brown"
              secondary="alice.brown@example.com"
              inset
            />
          </template>
        </BaseListItem>
      </div>
    `,
  }),
};

// 슬롯과 props 조합 사용
export const SlotPropsCombination: Story = {
  render: () => ({
    components: { BaseListItem, BaseListItemAvatar, BaseListItemText },
    setup() {
      return {};
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <h3 style="margin-bottom: 16px; color: #333;">슬롯과 Props 조합 사용 예시</h3>
        
        <!-- 왼쪽 슬롯만 + 기본 텍스트 -->
        <BaseListItem>
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
        
        <!-- 기본 텍스트 + 오른쪽 슬롯만 -->
        <BaseListItem>
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
        
        <!-- 슬롯 + 오른쪽 텍스트 props -->
        <BaseListItem>
          <template #content>
            <BaseListItemText 
              primary="사용자 정보"
              secondary="john.doe@example.com"
              rightPrimary="2024-01-15"
              rightSecondary="활성"
            >
              <template #left>
                <BaseListItemAvatar fallback="JD" color="primary" />
              </template>
            </BaseListItemText>
          </template>
        </BaseListItem>
        
        <!-- 복합 커스텀 레이아웃 -->
        <BaseListItem :clickable="true">
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
