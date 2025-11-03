import type { TableHeader, TableRow } from '../../../types/components';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseTable from '../BaseTable.vue';
import { ref } from 'vue';

const meta: Meta<typeof BaseTable> = {
  title: 'Table/BaseTable',
  component: BaseTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '완전한 테이블 컴포넌트입니다. 헤더와 바디를 포함한 테이블 기능을 제공합니다. Figma 디자인에 맞춰 구현되었으며, 다양한 기능을 지원합니다.',
      },
    },
  },
  argTypes: {
    headers: {
      description: '테이블 헤더 정보 배열',
      control: { type: 'object' },
    },
    data: {
      description: '테이블 데이터 배열',
      control: { type: 'object' },
    },
    selectable: {
      description: '행 선택 가능 여부',
      control: { type: 'boolean' },
    },
    sortable: {
      description: '정렬 가능 여부',
      control: { type: 'boolean' },
    },
    selectedRows: {
      description: '선택된 행 ID들',
      control: { type: 'object' },
    },
    headerType: {
      description: '헤더 타입',
      control: { type: 'select', options: ['type1', 'type2'] },
    },
    headerPreset: {
      description: 'Type2 헤더의 preset 색상',
      control: { type: 'select', options: ['gray', 'blue', 'pink'] },
    },
    headerCustomColor: {
      description: 'Type2 헤더의 커스텀 색상',
      control: { type: 'color' },
    },
    isLoading: {
      description: '로딩 상태 여부',
      control: { type: 'boolean' },
    },
    skeletonRows: {
      description: '스켈레톤 행 개수',
      control: { type: 'number', min: 1, max: 20 },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleHeaders: TableHeader[] = [
  { key: 'id', title: 'ID', width: '80px', align: 'center' },
  { key: 'name', title: '이름', width: '150px' },
  { key: 'email', title: '이메일', width: '200px' },
  { key: 'role', title: '역할', width: '120px' },
  { key: 'status', title: '상태', width: '100px', align: 'center' },
  { key: 'createdAt', title: '생성일', width: '120px' },
];

const sampleData: TableRow[] = [
  {
    id: 1,
    name: '김철수',
    email: 'kim@example.com',
    role: '관리자',
    status: '활성',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: '이영희',
    email: 'lee@example.com',
    role: '편집자',
    status: '활성',
    createdAt: '2024-01-16',
  },
  {
    id: 3,
    name: '박민수',
    email: 'park@example.com',
    role: '사용자',
    status: '비활성',
    createdAt: '2024-01-17',
  },
  {
    id: 4,
    name: '정수진',
    email: 'jung@example.com',
    role: '관리자',
    status: '활성',
    createdAt: '2024-01-18',
  },
  {
    id: 5,
    name: '최영수',
    email: 'choi@example.com',
    role: '편집자',
    status: '비활성',
    createdAt: '2024-01-19',
  },
];

const userStatsHeaders: TableHeader[] = [
  { key: 'total', title: '총 회원수(명)', width: '150px', align: 'center' },
  { key: 'active', title: '활성 회원수(명)', width: '150px', align: 'center' },
  { key: 'inactive', title: '비활성 회원수(명)', width: '150px', align: 'center' },
  { key: 'growth', title: '성장률(%)', width: '120px', align: 'center' },
];

const userStatsData: TableRow[] = [
  { id: 1, total: '1,234', active: '987', inactive: '247', growth: '+12.5%' },
  { id: 2, total: '2,156', active: '1,789', inactive: '367', growth: '+8.3%' },
  { id: 3, total: '3,421', active: '2,987', inactive: '434', growth: '+15.2%' },
];

export const Default: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    selectable: false,
    sortable: false,
    headerType: 'type1',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 테이블입니다. Type1 헤더와 데이터를 표시합니다.',
      },
    },
  },
};

export const Type1Header: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    selectable: false,
    sortable: false,
    headerType: 'type1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type1 헤더 스타일의 테이블입니다. 작은 폰트 크기와 얇은 하단 테두리를 사용합니다.',
      },
    },
  },
};

export const Type2Header: Story = {
  args: {
    headers: userStatsHeaders,
    data: userStatsData,
    selectable: false,
    sortable: false,
    headerType: 'type2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type2 헤더 스타일의 테이블입니다. 큰 폰트 크기와 더 넓은 패딩을 사용합니다.',
      },
    },
  },
};

export const Type2GrayHeader: Story = {
  args: {
    headers: userStatsHeaders,
    data: userStatsData,
    selectable: false,
    sortable: false,
    headerType: 'type2',
    headerPreset: 'gray',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type2 Gray preset 헤더 스타일의 테이블입니다. 기본 그레이 색상의 헤더를 사용합니다.',
      },
    },
  },
};

export const Type2BlueHeader: Story = {
  args: {
    headers: userStatsHeaders,
    data: userStatsData,
    selectable: false,
    sortable: false,
    headerType: 'type2',
    headerPreset: 'blue',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type2 Blue preset 헤더 스타일의 테이블입니다. 파란색 배경의 헤더를 사용합니다.',
      },
    },
  },
};

export const Type2PinkHeader: Story = {
  args: {
    headers: userStatsHeaders,
    data: userStatsData,
    selectable: false,
    sortable: false,
    headerType: 'type2',
    headerPreset: 'pink',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type2 Pink preset 헤더 스타일의 테이블입니다. 분홍색 배경의 헤더를 사용합니다.',
      },
    },
  },
};

export const Type2CustomColorHeader: Story = {
  args: {
    headers: userStatsHeaders,
    data: userStatsData,
    selectable: false,
    sortable: false,
    headerType: 'type2',
    headerCustomColor: '#8B5CF6',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type2 커스텀 색상 헤더 스타일의 테이블입니다. 보라색 커스텀 색상의 헤더를 사용합니다.',
      },
    },
  },
};

export const Selectable: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    selectable: true,
    sortable: false,
    headerType: 'type1',
  },
  render: (args) => ({
    components: { BaseTable },
    setup() {
      const selectedRows = ref<(string | number)[]>([]);

      const handleRowSelect = (rowId: string | number, selected: boolean) => {
        if (selected) {
          selectedRows.value.push(rowId);
        } else {
          selectedRows.value = selectedRows.value.filter((id) => id !== rowId);
        }
        console.log('선택된 행:', selectedRows.value);
      };

      return {
        ...args,
        selectedRows,
        handleRowSelect,
      };
    },
    template: `
      <div>
        <p class="mb-4 text-sm text-gray-600">선택된 행: {{ selectedRows.join(', ') || '없음' }}</p>
        <BaseTable
          :headers="headers"
          :data="data"
          :selectable="selectable"
          :sortable="sortable"
          :selected-rows="selectedRows"
          :header-type="headerType"
          :header-preset="headerPreset"
          :header-custom-color="headerCustomColor"
          @row-select="handleRowSelect"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '행 선택이 가능한 테이블입니다. 행을 클릭하여 선택할 수 있으며, 선택된 행은 배경색이 변경됩니다.',
      },
    },
  },
};

export const Sortable: Story = {
  args: {
    headers: sampleHeaders.map((header) => ({
      ...header,
      sortable: true,
    })),
    data: sampleData,
    selectable: false,
    sortable: true,
    headerType: 'type1',
  },
  render: (args) => ({
    components: { BaseTable },
    setup() {
      const handleSort = (key: string, direction: 'asc' | 'desc') => {
        console.log('정렬:', key, direction);
      };

      return {
        ...args,
        handleSort,
      };
    },
    template: `
      <BaseTable
        :headers="headers"
        :data="data"
        :selectable="selectable"
        :sortable="sortable"
        :header-type="headerType"
        :header-preset="headerPreset"
        :header-custom-color="headerCustomColor"
        @sort="handleSort"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '정렬이 가능한 테이블입니다. 헤더를 클릭하여 각 컬럼을 정렬할 수 있습니다.',
      },
    },
  },
};

export const WithCustomCellRenderer: Story = {
  args: {
    headers: sampleHeaders,
    data: sampleData,
    selectable: false,
    sortable: false,
    headerType: 'type1',
  },
  render: (args) => ({
    components: { BaseTable },
    setup() {
      return { args };
    },
    template: `
      <BaseTable
        :headers="args.headers"
        :data="args.data"
        :selectable="args.selectable"
        :sortable="args.sortable"
        :header-type="args.headerType"
        :header-preset="args.headerPreset"
        :header-custom-color="args.headerCustomColor"
      >
        <template #body-cell="{ row, header, value }">
          <div v-if="header.key === 'status'" class="flex items-center gap-2">
            <div 
              :class="[
                'w-2 h-2 rounded-full',
                value === '활성' ? 'bg-green-500' : 'bg-red-500'
              ]"
            />
            <span>{{ value }}</span>
          </div>
          <div v-else-if="header.key === 'role'" class="flex items-center gap-2">
            <span 
              :class="[
                'px-2 py-1 rounded text-xs font-medium',
                value === '관리자' ? 'bg-red-100 text-red-800' : 
                value === '편집자' ? 'bg-blue-100 text-blue-800' : 
                'bg-gray-100 text-gray-800'
              ]"
            >
              {{ value }}
            </span>
          </div>
          <span v-else>{{ value }}</span>
        </template>
      </BaseTable>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '커스텀 셀 렌더러를 사용한 테이블입니다. 상태 컬럼에는 색상 표시기가, 역할 컬럼에는 배지가 추가되어 있습니다.',
      },
    },
  },
};

export const EmptyTable: Story = {
  args: {
    headers: sampleHeaders,
    data: [],
    selectable: false,
    sortable: false,
    headerType: 'type1',
  },
  render: (args) => ({
    components: { BaseTable },
    setup() {
      return { args };
    },
    template: `
      <BaseTable
        :headers="args.headers"
        :data="args.data"
        :selectable="args.selectable"
        :sortable="args.sortable"
        :header-type="args.headerType"
        :header-preset="args.headerPreset"
        :header-custom-color="args.headerCustomColor"
      >
        <template #body>
          <tr>
            <td colspan="6" class="text-center py-8 text-gray-500">
              데이터가 없습니다.
            </td>
          </tr>
        </template>
      </BaseTable>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: '빈 데이터 테이블입니다. 데이터가 없을 때 표시할 내용을 커스텀할 수 있습니다.',
      },
    },
  },
};

export const Skeleton: Story = {
  args: {
    headers: sampleHeaders,
    data: [],
    selectable: false,
    sortable: false,
    headerType: 'type1',
    isLoading: true,
    skeletonRows: 5,
  },
  parameters: {
    docs: {
      description: {
        story: '스켈레톤 상태의 테이블입니다. 데이터 로딩 중에 표시됩니다.',
      },
    },
  },
};
