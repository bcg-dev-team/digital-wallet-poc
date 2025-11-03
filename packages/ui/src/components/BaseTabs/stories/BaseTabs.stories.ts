import {
  BaseButton,
  BaseInput,
  BaseCheckbox,
  BaseChip,
  BaseProgressBar,
  BaseIcon,
} from '../../index';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseTabs from '../BaseTabs.vue';
import { markRaw } from 'vue';

/**
 * BaseTab 컴포넌트
 *
 * Headless UI의 Tab 컴포넌트를 기반으로 한 탭 인터페이스입니다.
 * 카테고리별로 콘텐츠를 구분하여 표시할 수 있습니다.
 */
const meta: Meta<typeof BaseTabs> = {
  title: 'Tabs/BaseTabs',
  component: BaseTabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '탭 인터페이스를 제공하는 컴포넌트입니다. 카테고리별로 콘텐츠를 구분하여 표시할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // 명시적으로 컨트롤 타입 지정
    tabs: {
      control: 'object',
      description: '탭 아이템 배열',
    },
    modelValue: {
      control: { type: 'text' },
      description: '현재 선택된 탭 key',
    },
    variant: {
      control: { type: 'radio' },
      options: ['underline', 'inner'],
      description: '탭 디자인 타입',
    },
    size: {
      control: { type: 'select' },
      options: ['lg', 'md'],
      description: '탭 크기',
    },
    underline: {
      control: 'boolean',
      description: '밑줄 여부',
    },
    hasBackground: {
      control: 'boolean',
      description: '배경색 여부',
    },
    fullwidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 프로필 정보 컴포넌트
const ProfileInfoComponent = markRaw({
  components: { BaseInput, BaseButton, BaseIcon },
  template: `
    <div class="space-y-4">
      <div class="flex items-center gap-3 mb-6">
        <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <BaseIcon name="person" size="lg" />
        </div>
        <div>
          <h3 class="text-lg font-semibold">사용자 프로필</h3>
          <p class="text-sm text-gray-500">기본 정보를 관리하세요</p>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <BaseInput label="이름" placeholder="홍길동" />
        <BaseInput label="성" placeholder="김" />
      </div>
      
      <BaseInput label="이메일" placeholder="user@example.com" type="email" />
      <BaseInput label="전화번호" placeholder="010-1234-5678" />
      
      <div class="flex gap-2 pt-4">
        <BaseButton variant="contained" size="md">
          <BaseIcon name="check-sm" size="sm" />
          저장
        </BaseButton>
        <BaseButton variant="outlined" size="md">취소</BaseButton>
      </div>
    </div>
  `,
});

// 보안 설정 컴포넌트
const SecuritySettingsComponent = markRaw({
  components: { BaseCheckbox, BaseButton, BaseProgressBar, BaseChip },
  template: `
    <div class="space-y-6">
      <div class="flex items-center gap-3 mb-6">
        <BaseIcon name="settings" size="lg" />
        <div>
          <h3 class="text-lg font-semibold">보안 설정</h3>
          <p class="text-sm text-gray-500">계정 보안을 강화하세요</p>
        </div>
      </div>
      
      <div class="space-y-4">
        
        <div class="mt-4">
          <label class="text-sm font-medium mb-2 block">비밀번호 강도</label>
          <BaseProgressBar :value="75" class="mb-2" />
          <BaseChip variant="green" label="강함" />
        </div>
      </div>
      
      <div class="space-y-3">
        <h4 class="font-medium">보안 옵션</h4>
        <BaseCheckbox label="2단계 인증 활성화" />
        <BaseCheckbox label="로그인 알림 받기" />
        <BaseCheckbox label="새 기기 로그인 시 이메일 알림" />
      </div>
      
      <div class="flex gap-2 pt-4">
        <BaseButton variant="contained" size="md">
          <BaseIcon name="check-sm" size="sm" />
          보안 설정 저장
        </BaseButton>
      </div>
    </div>
  `,
});

// 활동 내역 컴포넌트
const ActivityHistoryComponent = markRaw({
  components: { BaseIcon, BaseChip },
  template: `
    <div class="space-y-4">
      <div class="flex items-center gap-3 mb-6">
        <BaseIcon name="list" size="lg" />
        <div>
          <h3 class="text-lg font-semibold">활동 내역</h3>
          <p class="text-sm text-gray-500">최근 로그인 및 활동 기록</p>
        </div>
      </div>
      
      <div class="space-y-3">
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <BaseIcon name="login" size="sm" />
            <div>
              <p class="font-medium">로그인</p>
              <p class="text-sm text-gray-500">2024-01-15 14:30 • 192.168.1.100</p>
            </div>
          </div>
          <BaseChip variant="green" label="성공" />
        </div>
        
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <BaseIcon name="settings" size="sm" />
            <div>
              <p class="font-medium">비밀번호 변경</p>
              <p class="text-sm text-gray-500">2024-01-14 09:15 • 192.168.1.100</p>
            </div>
          </div>
          <BaseChip variant="green" label="성공" />
        </div>
        
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <BaseIcon name="warning" size="sm" />
            <div>
              <p class="font-medium">로그인 시도</p>
              <p class="text-sm text-gray-500">2024-01-13 22:45 • 203.241.xxx.xxx</p>
            </div>
          </div>
          <BaseChip variant="red" label="실패" />
        </div>
        
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <BaseIcon name="edit" size="sm" />
            <div>
              <p class="font-medium">프로필 수정</p>
              <p class="text-sm text-gray-500">2024-01-12 16:20 • 192.168.1.100</p>
            </div>
          </div>
          <BaseChip variant="green" label="성공" />
        </div>
      </div>
    </div>
  `,
});

export const Default: Story = {
  args: {
    tabs: [
      {
        key: 'limit',
        label: 'Limit',
        component: markRaw({
          template: '<div class="p-4">Limit 주문 설정</div>',
        }),
      },
      {
        key: 'stop',
        label: 'Stop',
        component: markRaw({
          template: '<div class="p-4">Stop 주문 설정</div>',
        }),
      },
      {
        key: 'stop-limit',
        label: 'Stop Limit',
        component: markRaw({
          template: '<div class="p-4">Stop Limit 주문 설정</div>',
        }),
      },
      {
        key: 'profit-loss',
        label: 'Profit & Loss',
        component: markRaw({
          template: '<div class="p-4">Profit & Loss 설정</div>',
        }),
      },
    ],
    modelValue: 'limit',
    ariaLabel: '주문 타입 탭',
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본적인 탭 인터페이스를 보여줍니다. Limit, Stop, Stop Limit, Profit & Loss 카테고리가 있으며, 각각 관련 컨텐츠를 표시합니다.',
      },
    },
  },
};

export const WithIcons: Story = {
  args: {
    tabs: [
      {
        key: 'account',
        label: '계좌개설',
        icon: 'card',
        component: markRaw({
          template: '<div class="p-4">계좌개설 관련 정보</div>',
        }),
      },
      {
        key: 'transfer',
        label: '출금/이체/입금',
        icon: 'send',
        component: markRaw({
          template: '<div class="p-4">출금/이체/입금 관련 정보</div>',
        }),
      },
      {
        key: 'history',
        label: '입출금내역',
        icon: 'description',
        component: markRaw({
          template: '<div class="p-4">입출금내역 조회</div>',
        }),
      },
    ],
    modelValue: 'account',
    variant: 'underline',
    size: 'lg',
    underline: true,
    ariaLabel: '고객지원 탭',
  },
  parameters: {
    docs: {
      description: {
        story:
          '아이콘이 포함된 탭 인터페이스입니다. 각 탭에 관련 아이콘이 표시되어 사용자가 더 쉽게 구분할 수 있습니다.',
      },
    },
  },
};

export const InnerVariant: Story = {
  args: {
    tabs: [
      {
        key: 'all',
        label: '전체',
        component: markRaw({
          template: '<div class="p-4">전체 목록</div>',
        }),
      },
      {
        key: 'in-progress',
        label: '진행중',
        component: markRaw({
          template: '<div class="p-4">진행중인 항목</div>',
        }),
      },
      {
        key: 'completed',
        label: '완료',
        component: markRaw({
          template: '<div class="p-4">완료된 항목</div>',
        }),
      },
    ],
    modelValue: 'all',
    variant: 'inner',
    size: 'md',
    ariaLabel: '상태별 필터 탭',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Inner variant 스타일의 탭입니다. 알약 형태의 디자인으로 필터링이나 상태 구분에 적합합니다.',
      },
    },
  },
};

export const WithDisabledTabs: Story = {
  args: {
    tabs: [
      {
        key: 'active',
        label: '활성 탭',
        component: markRaw({
          template: '<div class="p-4">이 탭은 활성화되어 있습니다.</div>',
        }),
      },
      {
        key: 'disabled',
        label: '비활성 탭',
        disabled: true,
        component: markRaw({
          template: '<div class="p-4">이 탭은 비활성화되어 있습니다.</div>',
        }),
      },
      {
        key: 'another-active',
        label: '다른 활성 탭',
        component: markRaw({
          template: '<div class="p-4">이 탭도 활성화되어 있습니다.</div>',
        }),
      },
    ],
    modelValue: 'active',
    variant: 'underline',
    size: 'lg',
    ariaLabel: '활성/비활성 탭 예시',
  },
  parameters: {
    docs: {
      description: {
        story:
          '비활성화된 탭이 포함된 예시입니다. disabled 속성이 true인 탭은 클릭할 수 없고 시각적으로도 구분됩니다.',
      },
    },
  },
};

export const UserProfileManagement: Story = {
  args: {
    tabs: [
      {
        key: 'profile',
        label: '프로필 정보',
        icon: 'person',
        component: ProfileInfoComponent,
      },
      {
        key: 'security',
        label: '보안 설정',
        icon: 'settings',
        component: SecuritySettingsComponent,
      },
      {
        key: 'activity',
        label: '활동 내역',
        icon: 'list',
        component: ActivityHistoryComponent,
      },
    ],
    modelValue: 'profile',
    variant: 'underline',
    size: 'lg',
    underline: true,
    ariaLabel: '사용자 관리 탭',
  },
  parameters: {
    docs: {
      description: {
        story:
          'UI 패키지 내 컴포넌트들을 활용한 실용적인 사용자 프로필 관리 페이지 예시입니다. BaseInput, BaseButton, BaseTable, BaseChip 등 다양한 컴포넌트가 탭 콘텐츠로 사용됩니다.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    tabs: [
      {
        key: 'recent',
        label: 'Recent',
        component: markRaw({
          template: `
            <div class="p-4">
              <ul class="space-y-3">
                <li class="p-3 bg-gray-50 rounded-lg">
                  <h3 class="font-medium">Does drinking coffee make you smarter?</h3>
                  <p class="text-sm text-gray-500 mt-1">5h ago • 5 comments • 2 shares</p>
                </li>
                <li class="p-3 bg-gray-50 rounded-lg">
                  <h3 class="font-medium">So you've bought coffee... now what?</h3>
                  <p class="text-sm text-gray-500 mt-1">2h ago • 3 comments • 2 shares</p>
                </li>
              </ul>
            </div>
          `,
        }),
      },
      {
        key: 'popular',
        label: 'Popular',
        component: markRaw({
          template: `
            <div class="p-4">
              <ul class="space-y-3">
                <li class="p-3 bg-gray-50 rounded-lg">
                  <h3 class="font-medium">Is tech making coffee better or worse?</h3>
                  <p class="text-sm text-gray-500 mt-1">Jan 7 • 29 comments • 16 shares</p>
                </li>
                <li class="p-3 bg-gray-50 rounded-lg">
                  <h3 class="font-medium">The most innovative things happening in coffee</h3>
                  <p class="text-sm text-gray-500 mt-1">Mar 19 • 24 comments • 12 shares</p>
                </li>
              </ul>
            </div>
          `,
        }),
      },
      {
        key: 'trending',
        label: 'Trending',
        component: markRaw({
          template: `
            <div class="p-4">
              <ul class="space-y-3">
                <li class="p-3 bg-gray-50 rounded-lg">
                  <h3 class="font-medium">Ask Me Anything: 10 answers to your questions about coffee</h3>
                  <p class="text-sm text-gray-500 mt-1">2d ago • 9 comments • 5 shares</p>
                </li>
                <li class="p-3 bg-gray-50 rounded-lg">
                  <h3 class="font-medium">The worst advice we've ever heard about coffee</h3>
                  <p class="text-sm text-gray-500 mt-1">4d ago • 1 comment • 2 shares</p>
                </li>
              </ul>
            </div>
          `,
        }),
      },
    ],
    modelValue: 'recent',
    variant: 'underline',
    size: 'lg',
    fullwidth: true,
    ariaLabel: '전체 너비 탭',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'fullwidth prop이 true로 설정된 탭입니다. Headless UI 공식 예제와 같은 방식으로 각 탭 버튼이 전체 너비를 균등하게 사용합니다.',
      },
    },
  },
};
