/**
 * BaseList 컴포넌트 Storybook 스토리
 */
import BaseListItemAvatar from '../BaseListItemAvatar.vue';
import BaseListItemText from '../BaseListItemText.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseIcon from '../../BaseIcon/BaseIcon.vue';
import BaseListItem from '../BaseListItem.vue';
import BaseList from '../BaseList.vue';

const meta: Meta<typeof BaseList> = {
  title: 'List/BaseList',
  component: BaseList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `BaseList는 접근성과 기능성을 고려한 리스트 컨테이너 컴포넌트입니다.`,
      },
    },
  },
  args: {
    subheader: '',
    gap: '0px',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 리스트
export const Default: Story = {
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem>
          <template #content>
            <BaseIcon name="person" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 클릭 가능한 리스트
export const Clickable: Story = {
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem :clickable="true">
          <template #content>
            <BaseIcon name="person" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem :clickable="true">
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem :clickable="true">
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 보조 액션이 있는 리스트
export const WithSecondaryActions: Story = {
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem :secondary-action="{ name: 'edit' }">
          <template #content>
            <BaseIcon name="person" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem :secondary-action="{ name: 'trash' }">
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem :secondary-action="{ name: 'trending-up' }">
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 커스텀 간격
export const WithGap: Story = {
  args: {
    gap: '16px',
  },
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem>
          <template #content>
            <BaseIcon name="person" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 서브헤더 포함
export const WithSubheader: Story = {
  args: {
    subheader: '시스템 관리 메뉴',
  },
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem>
          <template #content>
            <BaseIcon name="person" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem>
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 완전한 설정 예시
export const Complete: Story = {
  args: {
    subheader: '완전한 설정 예시',
    gap: '12px',
  },
  render: (args) => ({
    components: { BaseList, BaseListItem, BaseIcon },
    setup() {
      return { args };
    },
    template: `
      <BaseList v-bind="args">
        <BaseListItem :clickable="true" :secondary-action="{ name: 'edit' }">
          <template #content>
            <BaseIcon name="person" />
            <span>사용자 관리</span>
          </template>
        </BaseListItem>
        <BaseListItem :clickable="true" :secondary-action="{ name: 'trash' }">
          <template #content>
            <BaseIcon name="settings" />
            <span>시스템 설정</span>
          </template>
        </BaseListItem>
        <BaseListItem :clickable="true" :secondary-action="{ name: 'trending-up' }">
          <template #content>
            <BaseIcon name="chart" />
            <span>통계 대시보드</span>
          </template>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 복합 컴포넌트 조합 예시
export const WithComplexComponents: Story = {
  render: () => ({
    components: { BaseList, BaseListItem, BaseListItemAvatar, BaseListItemText, BaseIcon },
    setup() {
      return {};
    },
    template: `
      <BaseList subheader="복합 컴포넌트 조합 예시" gap="8px">
        <!-- 아바타 + 텍스트 + 보조 액션 -->
        <BaseListItem :clickable="true" :secondary-action="{ name: 'edit' }">
          <template #content>
            <BaseListItemAvatar fallback="JD" color="primary" />
            <BaseListItemText 
              primary="John Doe"
              secondary="john.doe@example.com"
              inset
            />
          </template>
        </BaseListItem>
        
        <!-- 아이콘 + 텍스트 + 오른쪽 텍스트 -->
        <BaseListItem :clickable="true">
          <template #content>
            <BaseIcon name="notification" />
            <BaseListItemText 
              primary="시스템 알림"
              secondary="새로운 업데이트가 있습니다"
              rightPrimary="방금 전"
              rightSecondary="중요"
            />
          </template>
        </BaseListItem>
        
        <!-- 커스텀 슬롯 사용 -->
        <BaseListItem :clickable="true">
          <template #content>
            <BaseListItemAvatar 
              :icon="{ name: 'settings', size: 'md' }"
              color="blue"
            />
            <BaseListItemText 
              primary="설정 메뉴"
              secondary="시스템 설정을 관리합니다"
            />
          </template>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 다양한 아바타와 텍스트 조합
export const AvatarTextCombinations: Story = {
  render: () => ({
    components: { BaseList, BaseListItem, BaseListItemAvatar, BaseListItemText },
    setup() {
      return {};
    },
    template: `
      <BaseList subheader="아바타와 텍스트 조합 예시" gap="12px">
        <!-- 이미지 아바타 + 기본 텍스트 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="사용자 프로필"
              size="lg"
            />
            <BaseListItemText 
              primary="Jane Smith"
              secondary="jane.smith@example.com"
              inset
            />
          </template>
        </BaseListItem>
        
        <!-- 아이콘 아바타 + 오른쪽 텍스트 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar 
              :icon="{ name: 'home', size: 'md' }"
              color="green"
              variant="rounded"
            />
            <BaseListItemText 
              primary="홈 대시보드"
              secondary="메인 화면입니다"
              rightPrimary="2024-01-20"
              inset
            />
          </template>
        </BaseListItem>
        
        <!-- 텍스트 폴백 아바타 + 여러 줄 텍스트 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar 
              fallback="AB"
              color="purple"
              variant="square"
              size="md"
            />
            <BaseListItemText 
              primary="매우 긴 사용자 이름입니다. 이 텍스트는 여러 줄로 표시될 수 있습니다."
              secondary="매우 긴 이메일 주소입니다. 이 텍스트도 여러 줄로 표시될 수 있습니다."
              inset
              multiline
            />
          </template>
        </BaseListItem>
      </BaseList>
    `,
  }),
};

// 슬롯을 활용한 커스텀 레이아웃
export const CustomSlotLayouts: Story = {
  render: () => ({
    components: { BaseList, BaseListItem, BaseListItemAvatar, BaseListItemText },
    setup() {
      return {};
    },
    template: `
      <BaseList subheader="슬롯을 활용한 커스텀 레이아웃" gap="16px">
        <!-- 왼쪽 슬롯 + 아바타 + 텍스트 -->
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
        
        <!-- 아바타 + 텍스트 + 오른쪽 슬롯 -->
        <BaseListItem>
          <template #content>
            <BaseListItemAvatar fallback="JD" color="primary" />
            <BaseListItemText 
              primary="John Doe"
              secondary="john.doe@example.com"
              inset
            >
              <template #right>
                <div style="padding: 2px 6px; background-color: #e74c3c; color: white; border-radius: 3px; font-size: 10px;">
                  VIP
                </div>
              </template>
            </BaseListItemText>
          </template>
        </BaseListItem>
        
        <!-- 양쪽 슬롯 모두 사용 -->
        <BaseListItem>
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
      </BaseList>
    `,
  }),
};
