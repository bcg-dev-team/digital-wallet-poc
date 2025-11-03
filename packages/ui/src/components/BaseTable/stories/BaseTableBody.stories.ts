import type { TableHeader } from '../../../types/components';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseTableHead from '../BaseTableHead.vue';
import BaseTableCell from '../BaseTableCell.vue';
import BaseTableBody from '../BaseTableBody.vue';
import BaseTableRow from '../BaseTableRow.vue';

const meta: Meta<typeof BaseTableBody> = {
  title: 'Table/BaseTableBody',
  component: BaseTableBody,
  parameters: {
    docs: {
      description: {
        component:
          '테이블 바디 컴포넌트입니다. BaseTableRow와 BaseTableCell을 사용하여 바디를 구성하며, 선택 기능과 호버 효과를 지원합니다. 각 행은 아래쪽 border를 가지며, 마지막 행은 border가 없습니다.\n\n**Figma 링크**: [Table/Body](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-997&m=dev)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    headers: {
      control: 'object',
      description: '헤더 정보 배열',
    },
    data: {
      control: 'object',
      description: '테이블 데이터 배열',
    },
    selectable: {
      control: 'boolean',
      description: '행 선택 가능 여부',
    },
    selectedRows: {
      control: 'object',
      description: '선택된 행 ID 배열',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 헤더 데이터
const defaultHeaders: TableHeader[] = [
  { key: 'name', title: '이름', align: 'left' },
  { key: 'age', title: '나이', align: 'center' },
  { key: 'job', title: '직업', align: 'right' },
];

const userHeaders: TableHeader[] = [
  { key: 'total', title: '총 회원수(명)', align: 'center' },
  { key: 'active', title: '활성 회원수(명)', align: 'center' },
  { key: 'inactive', title: '비활성 회원수(명)', align: 'center' },
];

// 기본 데이터
const defaultData = [
  { id: 1, name: '김철수', age: 25, job: '개발자' },
  { id: 2, name: '이영희', age: 30, job: '디자이너' },
  { id: 3, name: '박민수', age: 28, job: '기획자' },
  { id: 4, name: '최지영', age: 32, job: '마케터' },
];

const userStatsData = [
  { id: 1, total: 1234, active: 987, inactive: 247 },
  { id: 2, total: 2345, active: 1890, inactive: 455 },
  { id: 3, total: 3456, active: 2789, inactive: 667 },
];

export const Default: Story = {
  args: {
    headers: defaultHeaders,
    data: defaultData,
    selectable: false,
    selectedRows: [],
  },
  parameters: {
    docs: {
      description: {
        story: '기본 테이블 바디입니다. 각 행은 아래쪽 border를 가지며, 호버 효과가 적용됩니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableBody, BaseTableHead },
    setup() {
      return { args };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead :headers="args.headers" />
          <BaseTableBody v-bind="args" @row-select="handleRowSelect" />
        </table>
      </div>
    `,
  }),
};

export const Selectable: Story = {
  args: {
    headers: defaultHeaders,
    data: defaultData,
    selectable: true,
    selectedRows: [1, 3],
  },
  parameters: {
    docs: {
      description: {
        story: '행 선택이 가능한 테이블 바디입니다. 선택된 행은 다른 배경색으로 표시됩니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableBody, BaseTableHead },
    setup() {
      const handleRowSelect = (rowId: number, selected: boolean) => {
        console.log('Row selected:', rowId, selected);
      };
      return { args, handleRowSelect };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead :headers="args.headers" />
          <BaseTableBody v-bind="args" @row-select="handleRowSelect" />
        </table>
      </div>
    `,
  }),
};

export const UserStats: Story = {
  args: {
    headers: userHeaders,
    data: userStatsData,
    selectable: false,
    selectedRows: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          '사용자 통계 데이터를 표시하는 테이블 바디입니다. 숫자 데이터가 중앙 정렬되어 표시됩니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableBody, BaseTableHead },
    setup() {
      return { args };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead :headers="args.headers" />
          <BaseTableBody v-bind="args" @row-select="handleRowSelect" />
        </table>
      </div>
    `,
  }),
};

export const EmptyData: Story = {
  args: {
    headers: defaultHeaders,
    data: [],
    selectable: false,
    selectedRows: [],
  },
  parameters: {
    docs: {
      description: {
        story: '데이터가 없는 빈 테이블 바디입니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableBody, BaseTableHead },
    setup() {
      return { args };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead :headers="args.headers" />
          <BaseTableBody v-bind="args" @row-select="handleRowSelect" />
        </table>
      </div>
    `,
  }),
};

export const WithCustomCellRenderer: Story = {
  args: {
    headers: defaultHeaders,
    data: defaultData,
    selectable: true,
    selectedRows: [1],
  },
  parameters: {
    docs: {
      description: {
        story:
          '커스텀 셀 렌더러를 사용하는 테이블 바디입니다. 각 셀의 내용을 커스터마이징할 수 있습니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableBody, BaseTableHead },
    setup() {
      const handleRowSelect = (rowId: number, selected: boolean) => {
        console.log('Row selected:', rowId, selected);
      };
      return { args, handleRowSelect };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead :headers="args.headers" />
          <BaseTableBody v-bind="args" @row-select="handleRowSelect">
            <template #body-cell="{ row, header, value }">
              <div v-if="header.key === 'name'" class="font-medium text-blue-600">
                {{ value }}
              </div>
              <div v-else-if="header.key === 'age'" class="text-sm text-gray-500">
                {{ value }}세
              </div>
              <div v-else-if="header.key === 'job'" class="text-sm text-green-600">
                {{ value }}
              </div>
              <div v-else>
                {{ value }}
              </div>
            </template>
          </BaseTableBody>
        </table>
      </div>
    `,
  }),
};
