import type { Meta, StoryObj } from '@storybook/vue3';
import BaseDisclosure from './BaseDisclosure.vue';

const meta: Meta<typeof BaseDisclosure> = {
  title: 'Disclosure/BaseDisclosure',
  component: BaseDisclosure,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '토글 컴포넌트입니다. <br/> 기본 스타일과 커스텀 스타일을 모두 지원합니다.',
      },
    },
  },
  decorators: [
    (story) => ({
      template: '<div class="w-[600px] mx-auto"><story /></div>',
    }),
  ],
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      description: '기본적으로 열려있는지 여부',
    },
    buttonText: {
      control: 'text',
      description: '버튼에 표시될 텍스트 (기본 모드)',
    },
    panelContent: {
      control: 'text',
      description: '패널에 표시될 내용 (기본 모드)',
    },
    custom: {
      control: 'boolean',
      description: '커스텀 스타일 사용 여부',
    },
    color: {
      control: 'select',
      options: ['red', 'blue', 'gray', 'purple'],
      description: '버튼 색상 테마',
    },
    showArrow: {
      control: 'boolean',
      description: '커스텀 모드에서 화살표 표시 여부',
    },
    arrowPosition: {
      control: 'number',
      description: '커스텀 모드에서 화살표 오른쪽 위치 (px)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BaseDisclosure>;

/**
 * 기본 스타일의 Disclosure 컴포넌트
 */
export const Default: Story = {
  args: {
    buttonText: '환불 정책이 어떻게 되나요?',
    panelContent: '구매 후 90일 이내에 이메일로 연락주시면 무조건 전액 환불해드립니다.',
  },
};

/**
 * 기본적으로 열려있는 상태의 Disclosure
 */
export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    buttonText: '기술 지원을 제공하나요?',
    panelContent: '네, 24시간 기술 지원을 제공합니다.',
  },
};

/**
 * 빨간색 테마의 Disclosure
 */
export const Red: Story = {
  args: {
    color: 'red',
    buttonText: '빨간색 테마 예시',
    panelContent: '이 Disclosure는 빨간색 테마가 적용되었습니다.',
  },
};

/**
 * 파란색 테마의 Disclosure
 */
export const Blue: Story = {
  args: {
    color: 'blue',
    buttonText: '파란색 테마 예시',
    panelContent: '이 Disclosure는 파란색 테마가 적용되었습니다.',
  },
};

/**
 * 보라색 테마의 Disclosure
 */
export const Purple: Story = {
  args: {
    color: 'purple',
    buttonText: '보라색 테마 예시',
    panelContent: '이 Disclosure는 보라색 테마가 적용되었습니다.',
  },
};

/**
 * 커스텀 스타일의 Disclosure 컴포넌트 (화살표 없음)
 */
export const CustomNoArrow: Story = {
  args: {
    custom: true,
    showArrow: false,
  },
  render: () => ({
    components: { BaseDisclosure },
    template: `
      <BaseDisclosure :custom="true" :show-arrow="false">
        <template #button>
          <button class="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            커스텀 스타일 버튼 (화살표 없음)
          </button>
        </template>
        <template #panel>
          <div class="p-4 bg-green-50 border-t border-green-200">
            이 패널은 화살표 없이 완전히 커스터마이징된 스타일입니다.
          </div>
        </template>
      </BaseDisclosure>
    `,
  }),
};

/**
 * 화살표 위치 조절 예시
 */
export const CustomArrowPosition: Story = {
  args: {
    custom: true,
    showArrow: true,
    arrowPosition: 30,
  },
  render: () => ({
    components: { BaseDisclosure },
    template: `
      <div class="space-y-4">
        <BaseDisclosure custom :show-arrow="true" :arrow-position="8">
          <template #button>
            <div class="flex items-center w-full space-x-4 py-size-12 border-b border-[var(--table-type2-body-border)]">
              <span class="text-sm font-medium text-gray-500 w-20">위치</span>
              <span class="text-sm text-gray-900 flex-1">화살표 위치: 8px</span>
            </div>
          </template>
          <template #panel>
            <div class="px-4 py-3 bg-[var(--table-bg-inner)] border-b border-[var(--table-type2-body-border)]">
              <div class="flex items-start space-x-4 pl-size-16">
                <span class="text-sm font-medium text-gray-500 w-8">A.</span>
                <div class="text-sm text-gray-700 flex-1">
                  화살표가 오른쪽에서 8px 떨어진 위치에 있습니다.
                </div>
              </div>
            </div>
          </template>
        </BaseDisclosure>

        <BaseDisclosure custom :show-arrow="true" :arrow-position="30">
          <template #button>
            <div class="flex items-center w-full space-x-4 py-size-12 border-b border-[var(--table-type2-body-border)]">
              <span class="text-sm font-medium text-gray-500 w-20">위치</span>
              <span class="text-sm text-gray-900 flex-1">화살표 위치: 30px</span>
            </div>
          </template>
          <template #panel>
            <div class="px-4 py-3 bg-[var(--table-bg-inner)] border-b border-[var(--table-type2-body-border)]">
              <div class="flex items-start space-x-4 pl-size-16">
                <span class="text-sm font-medium text-gray-500 w-8">A.</span>
                <div class="text-sm text-gray-700 flex-1">
                  화살표가 오른쪽에서 30px 떨어진 위치에 있습니다.
                </div>
              </div>
            </div>
          </template>
        </BaseDisclosure>

        <BaseDisclosure custom :show-arrow="true" :arrow-position="50">
          <template #button>
            <div class="flex items-center w-full space-x-4 py-size-12 border-b border-[var(--table-type2-body-border)]">
              <span class="text-sm font-medium text-gray-500 w-20">위치</span>
              <span class="text-sm text-gray-900 flex-1">화살표 위치: 50px</span>
            </div>
          </template>
          <template #panel>
            <div class="px-4 py-3 bg-[var(--table-bg-inner)] border-b border-[var(--table-type2-body-border)]">
              <div class="flex items-start space-x-4 pl-size-16">
                <span class="text-sm font-medium text-gray-500 w-8">A.</span>
                <div class="text-sm text-gray-700 flex-1">
                  화살표가 오른쪽에서 50px 떨어진 위치에 있습니다.
                </div>
              </div>
            </div>
          </template>
        </BaseDisclosure>
      </div>
    `,
  }),
};

/**
 * FAQ 스타일의 커스텀 Disclosure 컴포넌트
 */
export const Custom: Story = {
  args: {
    custom: true,
    showArrow: true,
  },
  render: () => ({
    components: { BaseDisclosure },
    template: `
        <BaseDisclosure 
          custom
          :show-arrow="true"
        >
          <template #button>
            <div class="flex items-center w-full space-x-4 py-size-12 border-b border-[var(--table-type2-body-border)]">
              <span class="text-sm font-medium text-gray-500 w-20">계좌관리</span>
              <span class="text-sm text-gray-900 flex-1">Q. 거래할 수 있는 해외선물에는 어떤 종목들이 있나요?</span>
            </div>
          </template>
          <template #panel>
            <div class="px-4 py-3 bg-[var(--table-bg-inner)] border-b border-[var(--table-type2-body-border)]">
              <div class="flex items-start space-x-4 pl-size-16 ">
                <span class="text-sm font-medium text-gray-500 w-8">A.</span>
                <div class="text-sm text-gray-700 flex-1">
                  해외선물 거래 가능 종목은 다음과 같습니다: S&P500, 나스닥, 다우존스, 러셀2000, VIX, 금, 은, 구리, 원유, 천연가스 등 다양한 상품을 거래할 수 있습니다.
                </div>
              </div>
            </div>
          </template>
        </BaseDisclosure>

        <BaseDisclosure 
          :custom="true" 
          :show-arrow="true"
          :default-open="true"
        >
          <template #button>
            <div class="flex items-center w-full space-x-4 py-size-12 border-b border-[var(--table-type2-body-border)]">
              <span class="text-sm font-medium text-gray-500 w-20">회원정보</span>
              <span class="text-sm text-gray-900 flex-1">Q. 해외선물은 어떤 통화로 거래하게 되나요?</span>
            </div>
          </template>
          <template #panel>
            <div class="px-4 py-3 bg-[var(--table-bg-inner)] border-b border-[var(--table-type2-body-border)]">
              <div class="flex items-start space-x-4 pl-size-16 ">
                <span class="text-sm font-medium text-gray-500 w-8">A.</span>
                <div class="text-sm text-gray-700 flex-1">
                  해외선물은 종목에 따라 표시되는 화폐가 달라지게 됩니다. 해당 종목이 상장되어 있는 국가의 통화나 현물 시장이 있는 국가의 통화로 표시되기 때문에, 원화를 예치한 경우 해당 통화로 환전이 이루어지게 됩니다. 따라서 투자 종목의 등락에 따른 위험뿐만 아니라, 환율 변동에 따른 위험 역시 존재하게 됩니다.
                </div>
              </div>
            </div>
          </template>
        </BaseDisclosure>

        <BaseDisclosure 
          :custom="true" 
          :show-arrow="true"
        >
          <template #button>
            <div class="flex items-center w-full space-x-4 py-size-12 border-b border-[var(--table-type2-body-border)]">
              <span class="text-sm font-medium text-gray-500 w-20">회원정보</span>
              <span class="text-sm text-gray-900 flex-1">Q. MODA/신한은행 연계계좌의 연계출금 및 이체가 가능한가요?</span>
            </div>
          </template>
          <template #panel>
            <div class="px-4 py-3 bg-[var(--table-bg-inner)] border-b border-[var(--table-type2-body-border)]">
              <div class="flex items-start space-x-4 pl-size-16 ">
                <span class="text-sm font-medium text-gray-500 w-8">A.</span>
                <div class="text-sm text-gray-700 flex-1">
                  네, MODA와 신한은행 연계계좌를 통해 연계출금 및 이체가 가능합니다. 자세한 이용 방법은 고객센터로 문의해 주시기 바랍니다.
                </div>
              </div>
            </div>
          </template>
        </BaseDisclosure>
    `,
  }),
};
