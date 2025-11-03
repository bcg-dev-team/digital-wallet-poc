import type { Meta, StoryObj } from '@storybook/vue3';
import BaseTableCell from '../BaseTableCell.vue';
import BaseTableRow from '../BaseTableRow.vue';

const meta: Meta<typeof BaseTableCell> = {
  title: 'Table/BaseTableCell',
  component: BaseTableCell,
  parameters: {
    docs: {
      description: {
        component:
          '테이블 셀 컴포넌트입니다. header, body, footer 타입을 지원하며, BaseTableRow와 함께 사용됩니다.\n\n**Figma 링크**: [Table/Body-Input](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-1059&m=dev), [Table/Body-Input-bg](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=82-1019&m=dev), [Table/Body-Type2](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=82-941&m=dev)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: '셀 내용',
    },
    type: {
      control: 'select',
      options: ['header', 'body', 'footer'],
      description: '셀 타입',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '텍스트 정렬',
    },
    width: {
      control: 'text',
      description: '셀 너비',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderCell: Story = {
  args: {
    content: '헤더 셀',
    type: 'header',
    align: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: '헤더 타입의 테이블 셀입니다. 굵은 폰트와 호버 효과를 가집니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableCell, BaseTableRow },
    setup() {
      return { args };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <thead>
            <BaseTableRow type="header">
              <BaseTableCell v-bind="args" />
            </BaseTableRow>
          </thead>
        </table>
      </div>
    `,
  }),
};

export const BodyCell: Story = {
  args: {
    content: '바디 셀',
    type: 'body',
    align: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: '바디 타입의 테이블 셀입니다. 일반적인 데이터 셀입니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableCell, BaseTableRow },
    setup() {
      return { args };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <tbody>
            <BaseTableRow type="body">
              <BaseTableCell v-bind="args" />
            </BaseTableRow>
          </tbody>
        </table>
      </div>
    `,
  }),
};

export const FooterCell: Story = {
  args: {
    content: '푸터 셀',
    type: 'footer',
    align: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: '푸터 타입의 테이블 셀입니다. 요약 정보 등을 표시합니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableCell, BaseTableRow },
    setup() {
      return { args };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <tfoot>
            <BaseTableRow type="footer">
              <BaseTableCell v-bind="args" />
            </BaseTableRow>
          </tfoot>
        </table>
      </div>
    `,
  }),
};

export const CenterAligned: Story = {
  args: {
    content: '중앙 정렬',
    type: 'body',
    align: 'center',
  },
  parameters: {
    docs: {
      description: {
        story: '중앙 정렬된 테이블 셀입니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableCell, BaseTableRow },
    setup() {
      return { args };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <tbody>
            <BaseTableRow type="body">
              <BaseTableCell v-bind="args" />
            </BaseTableRow>
          </tbody>
        </table>
      </div>
    `,
  }),
};

export const RightAligned: Story = {
  args: {
    content: '우측 정렬',
    type: 'body',
    align: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: '우측 정렬된 테이블 셀입니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableCell, BaseTableRow },
    setup() {
      return { args };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <tbody>
            <BaseTableRow type="body">
              <BaseTableCell v-bind="args" />
            </BaseTableRow>
          </tbody>
        </table>
      </div>
    `,
  }),
};

export const WithCustomWidth: Story = {
  args: {
    content: '고정 너비 셀',
    type: 'body',
    align: 'left',
    width: '200px',
  },
  parameters: {
    docs: {
      description: {
        story: '고정 너비를 가진 테이블 셀입니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableCell, BaseTableRow },
    setup() {
      return { args };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <tbody>
            <BaseTableRow type="body">
              <BaseTableCell v-bind="args" />
            </BaseTableRow>
          </tbody>
        </table>
      </div>
    `,
  }),
};

export const WithSlot: Story = {
  args: {
    content: '슬롯이 있는 셀',
    type: 'body',
    align: 'left',
  },
  render: (args) => ({
    components: { BaseTableCell, BaseTableRow },
    setup() {
      return { args };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <tbody>
            <BaseTableRow type="body">
              <BaseTableCell v-bind="args">
                <template #default>
                  <button class="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
                    버튼
                  </button>
                </template>
              </BaseTableCell>
            </BaseTableRow>
          </tbody>
        </table>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '슬롯을 사용하여 추가 콘텐츠를 포함한 테이블 셀입니다.',
      },
    },
  },
};
