import type { TableHeader, TableRow } from '../../../types/components';
import BaseCheckbox from '../../BaseCheckbox/BaseCheckbox.vue';
import TableWithPagination from '../TableWithPagination.vue';
import BaseButton from '../../BaseButton/BaseButton.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseChip from '../../BaseChips/BaseChip.vue';
import { ref } from 'vue';

const meta: Meta<typeof TableWithPagination> = {
  title: 'Table/TableWithPagination',
  component: TableWithPagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '페이지네이션이 포함된 테이블 컴포넌트입니다. BaseTable과 BasePagination을 조합하여 사용하기 편리한 고수준 컴포넌트입니다.',
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
    currentPage: {
      description: '현재 페이지 번호',
      control: { type: 'number', min: 1 },
    },
    pageSize: {
      description: '페이지당 행 수',
      control: { type: 'number', min: 1, max: 100 },
    },
    maxVisiblePages: {
      description: '최대 표시 페이지 수',
      control: { type: 'number', min: 3, max: 10 },
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

const userStatsHeaders: TableHeader[] = [
  { key: 'total', title: '총 회원수(명)', width: '150px', align: 'center' },
  { key: 'active', title: '활성 회원수(명)', width: '150px', align: 'center' },
  { key: 'inactive', title: '비활성 회원수(명)', width: '150px', align: 'center' },
  { key: 'growth', title: '성장률(%)', width: '120px', align: 'center' },
];

// 샘플 데이터 생성 함수
const generateSampleData = (count: number): TableRow[] => {
  const data: TableRow[] = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `사용자${i}`,
      email: `user${i}@example.com`,
      role: i % 3 === 0 ? '관리자' : i % 2 === 0 ? '편집자' : '사용자',
      status: i % 4 === 0 ? '비활성' : '활성',
      createdAt: `2024-01-${String((i % 28) + 1).padStart(2, '0')}`,
    });
  }
  return data;
};

// 사용자 통계 데이터 생성 함수
const generateUserStatsData = (count: number): TableRow[] => {
  const data: TableRow[] = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      total: `${Math.floor(Math.random() * 5000) + 1000}`,
      active: `${Math.floor(Math.random() * 4000) + 500}`,
      inactive: `${Math.floor(Math.random() * 1000) + 100}`,
      growth: `${(Math.random() * 20 - 5).toFixed(1)}%`,
    });
  }
  return data;
};

export const Default: Story = {
  args: {
    headers: sampleHeaders,
    data: generateSampleData(50),
    currentPage: 1,
    pageSize: 10,
    maxVisiblePages: 5,
    selectable: false,
    sortable: false,
    headerType: 'type1',
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 페이지네이션 테이블입니다. Type1 헤더와 50개의 샘플 데이터를 10개씩 페이지로 나누어 표시합니다.',
      },
    },
  },
};

export const Type1Header: Story = {
  args: {
    headers: sampleHeaders,
    data: generateSampleData(50),
    currentPage: 1,
    pageSize: 10,
    maxVisiblePages: 5,
    selectable: false,
    sortable: false,
    headerType: 'type1',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type1 헤더 스타일의 페이지네이션 테이블입니다. 작은 폰트 크기와 얇은 하단 테두리를 사용합니다.',
      },
    },
  },
};

export const Type2Header: Story = {
  args: {
    headers: userStatsHeaders,
    data: generateUserStatsData(50),
    currentPage: 1,
    pageSize: 10,
    maxVisiblePages: 5,
    selectable: false,
    sortable: false,
    headerType: 'type2',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type2 헤더 스타일의 페이지네이션 테이블입니다. 큰 폰트 크기와 더 넓은 패딩을 사용합니다.',
      },
    },
  },
};

export const Type2GrayHeader: Story = {
  args: {
    headers: userStatsHeaders,
    data: generateUserStatsData(50),
    currentPage: 1,
    pageSize: 10,
    maxVisiblePages: 5,
    selectable: false,
    sortable: false,
    headerType: 'type2',
    headerPreset: 'gray',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type2 Gray preset 헤더 스타일의 페이지네이션 테이블입니다. 기본 그레이 색상의 헤더를 사용합니다.',
      },
    },
  },
};

export const Type2BlueHeader: Story = {
  args: {
    headers: userStatsHeaders,
    data: generateUserStatsData(50),
    currentPage: 1,
    pageSize: 10,
    maxVisiblePages: 5,
    selectable: false,
    sortable: false,
    headerType: 'type2',
    headerPreset: 'blue',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type2 Blue preset 헤더 스타일의 페이지네이션 테이블입니다. 파란색 배경의 헤더를 사용합니다.',
      },
    },
  },
};

export const Type2PinkHeader: Story = {
  args: {
    headers: userStatsHeaders,
    data: generateUserStatsData(50),
    currentPage: 1,
    pageSize: 10,
    maxVisiblePages: 5,
    selectable: false,
    sortable: false,
    headerType: 'type2',
    headerPreset: 'pink',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type2 Pink preset 헤더 스타일의 페이지네이션 테이블입니다. 분홍색 배경의 헤더를 사용합니다.',
      },
    },
  },
};

export const Type2CustomColorHeader: Story = {
  args: {
    headers: userStatsHeaders,
    data: generateUserStatsData(50),
    currentPage: 1,
    pageSize: 10,
    maxVisiblePages: 5,
    selectable: false,
    sortable: false,
    headerType: 'type2',
    headerCustomColor: '#8B5CF6',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type2 커스텀 색상 헤더 스타일의 페이지네이션 테이블입니다. 보라색 커스텀 색상의 헤더를 사용합니다.',
      },
    },
  },
};

export const Selectable: Story = {
  args: {
    headers: sampleHeaders,
    data: generateSampleData(50),
    currentPage: 1,
    pageSize: 10,
    maxVisiblePages: 5,
    selectable: true,
    sortable: false,
    headerType: 'type1',
  },
  render: (args) => ({
    components: { TableWithPagination },
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
        <TableWithPagination
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
          '행 선택이 가능한 페이지네이션 테이블입니다. 행을 클릭하여 선택할 수 있으며, 선택된 행은 배경색이 변경됩니다.',
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
    data: generateSampleData(50),
    currentPage: 1,
    pageSize: 10,
    maxVisiblePages: 5,
    selectable: false,
    sortable: true,
    headerType: 'type1',
  },
  render: (args) => ({
    components: { TableWithPagination },
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
      <TableWithPagination
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
        story:
          '정렬이 가능한 페이지네이션 테이블입니다. 헤더를 클릭하여 각 컬럼을 정렬할 수 있습니다.',
      },
    },
  },
};

// 복합 컴포넌트가 활용된 테이블 스토리
export const ComplexComponentsTable: Story = {
  args: {
    headers: [
      { key: 'select', title: '', width: '50px' },
      { key: 'id', title: 'ID', width: '80px' },
      { key: 'name', title: '이름', width: '150px' },
      { key: 'email', title: '이메일', width: '200px' },
      { key: 'role', title: '역할', width: '120px' },
      { key: 'status', title: '상태', width: '120px' },
      { key: 'priority', title: '우선순위', width: '100px' },
      { key: 'actions', title: '작업', width: '150px' },
    ],
    data: [
      {
        id: 1,
        name: '김철수',
        email: 'kim@example.com',
        role: '관리자',
        status: '활성',
        priority: '높음',
        select: false,
      },
      {
        id: 2,
        name: '이영희',
        email: 'lee@example.com',
        role: '편집자',
        status: '활성',
        priority: '보통',
        select: false,
      },
      {
        id: 3,
        name: '박민수',
        email: 'park@example.com',
        role: '사용자',
        status: '비활성',
        priority: '낮음',
        select: false,
      },
    ],
    currentPage: 1,
    pageSize: 10,
    maxVisiblePages: 5,
    selectable: false,
    sortable: false,
    headerType: 'type1',
  },
  render: (args) => ({
    components: { TableWithPagination, BaseCheckbox, BaseChip, BaseButton },
    setup() {
      const selectedRows = ref<(string | number)[]>([]);

      const handleRowSelect = (rowId: string | number, selected: boolean) => {
        if (selected) {
          selectedRows.value.push(rowId);
        } else {
          selectedRows.value = selectedRows.value.filter((id) => id !== rowId);
        }
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
        <TableWithPagination
          :headers="headers"
          :data="data"
          :selectable="selectable"
          :sortable="sortable"
          :selected-rows="selectedRows"
          :header-type="headerType"
          :header-preset="headerPreset"
          :header-custom-color="headerCustomColor"
          @row-select="handleRowSelect"
        >
          <template #body-cell="{ row, header, value }">
            <!-- 체크박스 컬럼 -->
            <div v-if="header.key === 'select'" class="flex justify-center">
              <BaseCheckbox 
                :model-value="selectedRows.includes(row.id)"
                @update:model-value="(checked) => handleRowSelect(row.id, checked)"
              />
            </div>
            
            <!-- 상태 컬럼 -->
            <div v-else-if="header.key === 'status'" class="flex justify-center">
              <BaseChip 
                :variant="value === '활성' ? 'success' : 'error'"
                :size="'sm'"
              >
                {{ value }}
              </BaseChip>
            </div>
            
            <!-- 우선순위 컬럼 -->
            <div v-else-if="header.key === 'priority'" class="flex justify-center">
              <BaseChip 
                :variant="value === '높음' ? 'error' : value === '보통' ? 'warning' : 'success'"
                :size="'sm'"
              >
                {{ value }}
              </BaseChip>
            </div>
            
            <!-- 작업 컬럼 -->
            <div v-else-if="header.key === 'actions'" class="flex gap-2 justify-center">
              <BaseButton 
                variant="btn-primary-solid" 
                size="sm"
                @click="console.log('편집:', row.id)"
              >
                편집
              </BaseButton>
              <BaseButton 
                variant="btn-cancel-solid" 
                size="sm"
                @click="console.log('삭제:', row.id)"
              >
                삭제
              </BaseButton>
            </div>
            
            <!-- 기본 컬럼 -->
            <span v-else>{{ value }}</span>
          </template>
        </TableWithPagination>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '다양한 UI 컴포넌트가 활용된 복합 테이블입니다. BaseCheckbox, BaseChip, BaseButton 등이 셀 내에서 사용됩니다.',
      },
    },
  },
};
