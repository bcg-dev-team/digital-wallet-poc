import BaseButton from '../../BaseButton/BaseButton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseModal from '../BaseModal.vue';

const meta: Meta<typeof BaseModal> = {
  title: 'Modal/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '기본 모달 컴포넌트입니다. 헤더, 컨텐츠, 푸터 영역을 포함하며 다양한 스타일과 기능을 지원합니다.',
      },
    },
  },
  argTypes: {
    isOpen: {
      description: '모달 열림/닫힘 상태',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    title: {
      description: '모달 제목',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    description: {
      description: '모달 설명',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        category: 'Props',
      },
    },
    variant: {
      description: '모달 스타일 변형',
      control: { type: 'select' },
      options: ['default', 'alert'],
      table: {
        type: { summary: 'default | alert' },
        defaultValue: { summary: 'default' },
        category: 'Props',
      },
    },
    size: {
      description: '모달 크기',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      table: {
        type: { summary: 'sm | md | lg | xl' },
        defaultValue: { summary: 'md' },
        category: 'Props',
      },
    },
    closeOnOverlayClick: {
      description: '오버레이 클릭 시 모달 닫기 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
    },
    closeOnEscape: {
      description: 'ESC 키 입력 시 모달 닫기 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
    },
    showCloseButton: {
      description: '닫기 버튼 표시 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
    },
    showBackButton: {
      description: '뒤로가기 버튼 표시 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
    },
    fullWidth: {
      description: '버튼을 fullwidth로 표시할지 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
    },
  },
  args: {
    isOpen: false,
    title: '모달 제목',
    description: '모달 설명입니다.',
    variant: 'default',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
    showBackButton: false,
    fullWidth: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 모달 스토리
 * 가장 기본적인 모달 형태를 보여줍니다.
 */
export const Default: Story = {
  args: {
    isOpen: false,
    title: '기본 모달',
    description: '이것은 기본 모달입니다.',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <BaseButton 
          label="기본 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event" />
      </div>
    `,
  }),
};

/**
 * 기본 Footer가 있는 모달
 * 기본 제공되는 취소/확인 버튼을 사용합니다.
 */
export const WithDefaultFooter: Story = {
  args: {
    isOpen: false,
    title: '기본 Footer 모달',
    description: '기본 제공되는 취소/확인 버튼을 사용합니다.',
    showDefaultFooter: true,
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <BaseButton 
          label="기본 Footer 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event" />
      </div>
    `,
  }),
};

/**
 * Large 크기 모달
 * 더 큰 크기의 모달을 보여줍니다.
 */
export const Large: Story = {
  args: {
    isOpen: false,
    title: 'Large 모달',
    description: '더 큰 크기의 모달입니다.',
    size: 'lg',
    showDefaultFooter: true,
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <BaseButton 
          label="Large 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <div>
            <p>이것은 Large 크기의 모달입니다. 더 많은 컨텐츠를 표시할 수 있습니다.</p>
            <p>긴 텍스트나 복잡한 폼 요소들을 포함할 수 있습니다.</p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};

/**
 * Alert 스타일 모달
 * 경고나 알림을 위한 모달입니다.
 */
export const Alert: Story = {
  args: {
    isOpen: false,
    title: '경고',
    description: '이 작업을 계속 진행하시겠습니까?',
    variant: 'alert',
    size: 'sm',
    showDefaultFooter: true,
    confirmText: '계속',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <BaseButton 
          label="Alert 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <div style="text-align: center;">
            <p style="color: #d32f2f; font-weight: 500;">⚠️ 주의: 이 작업은 되돌릴 수 없습니다.</p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};

/**
 * Back Button이 있는 모달
 * 뒤로가기 기능이 있는 모달입니다.
 */
export const WithBackButton: Story = {
  args: {
    isOpen: false,
    title: '단계별 설정',
    description: '두 번째 단계입니다.',
    showBackButton: true,
    showDefaultFooter: true,
    cancelText: '이전',
    confirmText: '다음',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <BaseButton 
          label="Back Button 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <div>
            <p>현재 단계: 2/3</p>
            <p>이전 단계로 돌아가거나 다음 단계로 진행할 수 있습니다.</p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};

/**
 * 커스텀 헤더 액션이 있는 모달
 * 헤더에 추가 액션 버튼이 있는 모달입니다.
 */
export const WithCustomHeaderActions: Story = {
  args: {
    isOpen: false,
    title: '문서 편집',
    description: '문서를 편집하고 있습니다.',
    showDefaultFooter: true,
    confirmText: '완료',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <BaseButton 
          label="커스텀 헤더 액션 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <template #actions>
            <div style="display: flex; gap: 8px;">
              <button 
                type="button" 
                style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
                @click="alert('저장되었습니다')"
              >
                저장
              </button>
              <button 
                type="button" 
                style="padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; background: white; cursor: pointer; font-size: 12px;"
                @click="alert('미리보기가 열렸습니다')"
              >
                미리보기
              </button>
            </div>
          </template>
          <div>
            <p>문서 편집 모드입니다. 헤더에 추가 액션 버튼들이 표시됩니다.</p>
            <textarea 
              style="width: 100%; height: 100px; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"
              placeholder="여기에 텍스트를 입력하세요..."
            ></textarea>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};

/**
 * 커스텀 제목 슬롯을 사용하는 모달
 * 제목 영역을 완전히 커스터마이징할 수 있습니다.
 */
export const WithCustomTitleSlot: Story = {
  args: {
    isOpen: false,
    description: '커스텀 제목을 사용하는 모달입니다.',
    showDefaultFooter: true,
    confirmText: '확인',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      const slotControls = {
        customTitle: true,
        titleIcon: '🚀',
        titleColor: '#1976d2',
      };
      return { args, slotControls };
    },
    template: `
      <div>
        <BaseButton 
          label="커스텀 제목 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <template #title v-if="slotControls.customTitle">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 24px;">{{ slotControls.titleIcon }}</span>
              <div>
                <h2 style="margin: 0; color: slotControls.titleColor; font-size: 20px;">프로젝트 시작</h2>
                <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">새로운 프로젝트를 생성합니다</p>
              </div>
            </div>
          </template>
          <div>
            <p>이 모달은 제목 영역을 완전히 커스터마이징한 예시입니다.</p>
            <p>아이콘, 색상, 레이아웃 등을 자유롭게 구성할 수 있습니다.</p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};

/**
 * 제목과 액션 슬롯을 모두 사용하는 모달
 * 헤더 영역을 완전히 커스터마이징할 수 있습니다.
 */
export const WithCustomTitleAndActions: Story = {
  args: {
    isOpen: false,
    description: '제목과 액션을 모두 커스터마이징한 모달입니다.',
    showDefaultFooter: true,
    confirmText: '완료',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      const slotControls = {
        customTitle: true,
        customActions: true,
        titleIcon: '👤',
        titleColor: '#333',
        actionButtons: [
          { label: '미리보기', action: 'preview' },
          { label: '공유', action: 'share' },
          { label: '내보내기', action: 'export' },
        ],
      };

      const handleAction = (label: string) => {
        console.log(`${label} 기능이 실행되었습니다`);
        // Storybook 환경에서는 alert 대신 console.log 사용
      };

      return { args, slotControls, handleAction };
    },
    template: `
      <div>
        <BaseButton 
          label="커스텀 제목+액션 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <template #title v-if="slotControls.customTitle">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 32px; height: 32px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                A
              </div>
              <div>
                <h2 style="margin: 0; color: slotControls.titleColor; font-size: 18px;">사용자 프로필</h2>
                <p style="margin: 2px 0 0 0; color: #666; font-size: 12px;">프로필 정보를 편집합니다</p>
              </div>
            </div>
          </template>
          <template #actions v-if="slotControls.customActions">
            <div style="display: flex; gap: 6px;">
              <button 
                v-for="button in slotControls.actionButtons"
                :key="button.action"
                type="button" 
                style="padding: 4px 8px; border: 1px solid #ddd; border-radius: 4px; background: #f8f9fa; cursor: pointer; font-size: 11px; color: #666;"
                @click="handleAction(button.label)"
              >
                {{ button.label }}
              </button>
            </div>
          </template>
          <div>
            <p>이 모달은 제목과 액션 영역을 모두 커스터마이징한 예시입니다.</p>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin-top: 16px;">
              <h4 style="margin: 0 0 12px 0;">프로필 정보</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div>
                  <label style="font-size: 12px; color: #666;">이름</label>
                  <input type="text" placeholder="이름 입력" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-top: 4px;">
                </div>
                <div>
                  <label style="font-size: 12px; color: #666;">이메일</label>
                  <input type="email" placeholder="이메일 입력" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-top: 4px;">
                </div>
              </div>
            </div>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};

/**
 * XL 크기 모달
 * 가장 큰 크기의 모달을 보여줍니다.
 */
export const ExtraLarge: Story = {
  args: {
    isOpen: false,
    title: '대시보드 설정',
    description: '대시보드의 레이아웃과 위젯을 구성합니다.',
    size: 'xl',
    showDefaultFooter: true,
    cancelText: '기본값으로 복원',
    confirmText: '적용',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <BaseButton 
          label="XL 모달 열기"
          @click="args.isOpen = true"
        />
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <div>
            <h3 style="margin-bottom: 16px;">레이아웃 구성</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div>
                <h4>왼쪽 패널</h4>
                <p>차트와 그래프를 배치할 수 있습니다.</p>
                <div style="height: 120px; border: 2px dashed #ccc; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                  차트 영역
                </div>
              </div>
              <div>
                <h4>오른쪽 패널</h4>
                <p>통계와 요약 정보를 표시합니다.</p>
                <div style="height: 120px; border: 2px dashed #ccc; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #666;">
                  통계 영역
                </div>
              </div>
            </div>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};

/**
 * closeOnEscape 옵션 테스트 모달
 * ESC 키 입력 시 모달 닫기 동작을 테스트합니다.
 */
export const CloseOnEscapeTest: Story = {
  args: {
    isOpen: false,
    title: 'ESC 키 테스트',
    description: 'ESC 키를 눌러보세요. closeOnEscape 옵션에 따라 동작이 달라집니다.',
    closeOnEscape: true,
    showDefaultFooter: true,
    confirmText: '확인',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <BaseButton 
            label="ESC 테스트 모달 열기"
            @click="args.isOpen = true"
          />
          <div style="margin-top: 8px; font-size: 14px; color: #666;">
            <strong>테스트 방법:</strong><br>
            1. 모달을 열고 ESC 키를 눌러보세요<br>
            2. closeOnEscape 옵션을 true/false로 변경해보세요<br>
            3. 동작 차이를 확인하세요
          </div>
        </div>
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <div style="text-align: center; padding: 20px;">
            <h3 style="color: #1976d2; margin-bottom: 16px;">ESC 키 테스트</h3>
            <p>현재 <strong>closeOnEscape: {{ args.closeOnEscape }}</strong></p>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p><strong>테스트 결과:</strong></p>
              <ul style="text-align: left; display: inline-block;">
                <li>ESC 키 누름 → 모달 닫힘: {{ args.closeOnEscape ? '예상됨' : '예상 안됨' }}</li>
                <li>오버레이 클릭 → 모달 닫힘: {{ args.closeOnOverlayClick ? '예상됨' : '예상 안됨' }}</li>
              </ul>
            </div>
            <p style="color: #666; font-size: 14px;">
              Storybook Controls에서 closeOnEscape 값을 변경하여 테스트해보세요.
            </p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};

/**
 * closeOnOverlayClick 옵션 테스트 모달
 * 오버레이 클릭 시 모달 닫기 동작을 테스트합니다.
 */
export const CloseOnOverlayClickTest: Story = {
  args: {
    isOpen: false,
    title: '오버레이 클릭 테스트',
    description:
      '모달 외부 영역을 클릭해보세요. closeOnOverlayClick 옵션에 따라 동작이 달라집니다.',
    closeOnOverlayClick: true,
    showDefaultFooter: true,
    confirmText: '확인',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <BaseButton 
            label="오버레이 클릭 테스트 모달 열기"
            @click="args.isOpen = true"
          />
          <div style="margin-top: 8px; font-size: 14px; color: #666;">
            <strong>테스트 방법:</strong><br>
            1. 모달을 열고 모달 외부 영역을 클릭해보세요<br>
            2. closeOnOverlayClick 옵션을 true/false로 변경해보세요<br>
            3. 동작 차이를 확인하세요
          </div>
        </div>
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <div style="text-align: center; padding: 20px;">
            <h3 style="color: #d32f2f; margin-bottom: 16px;">오버레이 클릭 테스트</h3>
            <p>현재 <strong>closeOnOverlayClick: {{ args.closeOnOverlayClick }}</strong></p>
            <div style="background: #fff3e0; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #ff9800;">
              <p><strong>테스트 결과:</strong></p>
              <ul style="text-align: left; display: inline-block;">
                <li>오버레이 클릭 → 모달 닫힘: {{ args.closeOnOverlayClick ? '예상됨' : '예상 안됨' }}</li>
                <li>ESC 키 누름 → 모달 닫힘: {{ args.closeOnEscape ? '예상됨' : '예상 안됨' }}</li>
              </ul>
            </div>
            <p style="color: #666; font-size: 14px;">
              Storybook Controls에서 closeOnOverlayClick 값을 변경하여 테스트해보세요.
            </p>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};

/**
 * 모든 닫기 옵션 테스트 모달
 * closeOnEscape와 closeOnOverlayClick을 모두 테스트합니다.
 */
export const AllCloseOptionsTest: Story = {
  args: {
    isOpen: false,
    title: '모든 닫기 옵션 테스트',
    description: 'ESC 키와 오버레이 클릭을 모두 테스트해보세요.',
    closeOnEscape: true,
    closeOnOverlayClick: true,
    showDefaultFooter: true,
    confirmText: '확인',
  },
  render: (args) => ({
    components: { BaseModal, BaseButton },
    setup() {
      return { args };
    },
    template: `
      <div>
        <div style="margin-bottom: 16px;">
          <BaseButton 
            label="전체 테스트 모달 열기"
            @click="args.isOpen = true"
          />
          <div style="margin-top: 8px; font-size: 14px; color: #666;">
            <strong>테스트 방법:</strong><br>
            1. 모달을 열고 ESC 키를 눌러보세요<br>
            2. 모달 외부 영역을 클릭해보세요<br>
            3. 두 옵션을 모두 false로 설정해보세요<br>
            4. 동작 차이를 확인하세요
          </div>
        </div>
        <BaseModal v-bind="args" @update:isOpen="args.isOpen = $event">
          <div style="text-align: center; padding: 20px;">
            <h3 style="color: #388e3c; margin-bottom: 16px;">전체 닫기 옵션 테스트</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
              <div style="background: #e8f5e8; padding: 16px; border-radius: 8px; border: 1px solid #4caf50;">
                <h4 style="margin: 0 0 8px 0; color: #2e7d32;">ESC 키</h4>
                <p style="margin: 0; font-size: 18px; font-weight: bold;">
                  {{ args.closeOnEscape ? '✅ 활성화' : '❌ 비활성화' }}
                </p>
              </div>
              <div style="background: #e3f2fd; padding: 16px; border-radius: 8px; border: 1px solid #2196f3;">
                <h4 style="margin: 0 0 8px 0; color: #1976d2;">오버레이 클릭</h4>
                <p style="margin: 0; font-size: 18px; font-weight: bold;">
                  {{ args.closeOnOverlayClick ? '✅ 활성화' : '❌ 비활성화' }}
                </p>
              </div>
            </div>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px;">
              <p><strong>현재 설정:</strong></p>
              <ul style="text-align: left; display: inline-block;">
                <li>closeOnEscape: <code>{{ args.closeOnEscape }}</code></li>
                <li>closeOnOverlayClick: <code>{{ args.closeOnOverlayClick }}</code></li>
              </ul>
              <p style="margin-top: 12px; color: #666; font-size: 14px;">
                Storybook Controls에서 두 옵션을 모두 false로 설정하면 모달이 닫히지 않습니다.
              </p>
            </div>
          </div>
        </BaseModal>
      </div>
    `,
  }),
};
