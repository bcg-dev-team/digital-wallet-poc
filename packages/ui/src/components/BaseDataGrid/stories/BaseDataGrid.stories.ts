import type { Meta, StoryObj } from '@storybook/vue3';
import type { ColDef } from 'ag-grid-community';
import BaseDataGrid from '../BaseDataGrid.vue';
import { ref, computed } from 'vue';

// 테스트용 데이터 생성 함수
const generateTestData = (count: number) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `사용자 ${i}`,
      email: `user${i}@example.com`,
      department: ['개발팀', '디자인팀', '마케팅팀', '영업팀', '인사팀'][i % 5],
      position: ['주니어', '시니어', '팀장', '부장', '이사'][i % 5],
      salary: Math.floor(Math.random() * 50000000) + 30000000,
      joinDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toISOString().split('T')[0],
      status: ['활성', '비활성', '휴직'][i % 3],
    });
  }
  return data;
};

// 기본 컬럼 정의
const baseColumnDefs: ColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 80,
    pinned: 'left',
    sortable: true,
  },
  {
    field: 'name',
    headerName: '이름',
    width: 120,
    sortable: true,
    filter: true,
  },
  {
    field: 'email',
    headerName: '이메일',
    width: 200,
    sortable: true,
    filter: true,
  },
  {
    field: 'department',
    headerName: '부서',
    width: 120,
    sortable: true,
    filter: true,
  },
  {
    field: 'position',
    headerName: '직급',
    width: 100,
    sortable: true,
    filter: true,
  },
  {
    field: 'salary',
    headerName: '연봉',
    width: 120,
    sortable: true,
    valueFormatter: (params) => {
      return new Intl.NumberFormat('ko-KR').format(params.value) + '원';
    },
  },
  {
    field: 'joinDate',
    headerName: '입사일',
    width: 120,
    sortable: true,
    filter: 'agDateColumnFilter',
  },
  {
    field: 'status',
    headerName: '상태',
    width: 100,
    sortable: true,
    filter: true,
    cellRenderer: (params: any) => {
      const status = params.value;
      const color = status === '활성' ? 'green' : status === '비활성' ? 'red' : 'orange';
      return `<span style="color: ${color}; font-weight: bold;">${status}</span>`;
    },
  },
];

const meta: Meta<typeof BaseDataGrid> = {
  title: 'Data/BaseDataGrid',
  component: BaseDataGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'AG-Grid를 기반으로 한 데이터 그리드 컴포넌트입니다. 대용량 데이터를 효율적으로 표시하고 정렬, 필터링, 페이지네이션 등의 기능을 제공합니다. [Figma 링크](https://figma.com/design/example)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columnDefs: {
      control: 'object',
      description: '컬럼 정의 배열',
    },
    rowData: {
      control: 'object',
      description: '테이블 데이터 배열',
    },
    defaultColDef: {
      control: 'object',
      description: '기본 컬럼 설정',
    },
    gridOptions: {
      control: 'object',
      description: '그리드 옵션',
    },
    height: {
      control: 'text',
      description: '그리드 높이',
    },
    width: {
      control: 'text',
      description: '그리드 너비',
    },
    sortable: {
      control: 'boolean',
      description: '정렬 가능 여부',
    },
    filterable: {
      control: 'boolean',
      description: '필터링 가능 여부',
    },
    pagination: {
      control: 'boolean',
      description: '페이지네이션 사용 여부',
    },
    paginationPageSize: {
      control: 'number',
      description: '페이지당 행 수',
    },
    paginationPageSizeSelector: {
      control: 'object',
      description: '페이지 크기 선택 옵션',
    },
    suppressPaginationPanel: {
      control: 'boolean',
      description: '페이지네이션 패널 숨김 여부',
    },
    resizable: {
      control: 'boolean',
      description: '컬럼 리사이징 가능 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 그리드 (페이지네이션 없음)
export const Default: Story = {
  render: () => ({
    components: { BaseDataGrid },
    setup() {
      const rowData = ref(generateTestData(50));
      const columnDefs = ref(baseColumnDefs);

      return {
        rowData,
        columnDefs,
      };
    },
    template: `
      <div class="h-96 w-full max-w-7xl">
        <BaseDataGrid
          :columnDefs="columnDefs"
          :rowData="rowData"
          :pagination="false"
          :filterable="true"
          :sortable="true"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '기본적인 데이터 그리드입니다. 페이지네이션 없이 모든 데이터를 한 번에 표시하며, 정렬과 필터링 기능을 제공합니다.',
      },
    },
  },
};

// 페이지네이션 활성화 (기본 설정)
export const WithPagination: Story = {
  render: () => ({
    components: { BaseDataGrid },
    setup() {
      const rowData = ref(generateTestData(200));
      const columnDefs = ref(baseColumnDefs);

      return {
        rowData,
        columnDefs,
      };
    },
    template: `
      <div class="h-96 w-full max-w-7xl">
        <BaseDataGrid
          :columnDefs="columnDefs"
          :rowData="rowData"
          :pagination="true"
          :paginationPageSize="25"
          :filterable="true"
          :sortable="true"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '페이지네이션이 활성화된 데이터 그리드입니다. 페이지당 25개 행을 표시하며, 하단에 페이지네이션 컨트롤이 표시됩니다.',
      },
    },
  },
};

// 커스텀 페이지 크기 선택 옵션
export const CustomPageSizeSelector: Story = {
  render: () => ({
    components: { BaseDataGrid },
    setup() {
      const rowData = ref(generateTestData(500));
      const columnDefs = ref(baseColumnDefs);

      return {
        rowData,
        columnDefs,
      };
    },
    template: `
      <div class="h-96 w-full max-w-7xl">
        <BaseDataGrid
          :columnDefs="columnDefs"
          :rowData="rowData"
          :pagination="true"
          :paginationPageSize="50"
          :paginationPageSizeSelector="[10, 25, 50, 100, 200]"
          :filterable="true"
          :sortable="true"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '커스텀 페이지 크기 선택 옵션이 있는 데이터 그리드입니다. 10, 25, 50, 100, 200개 중에서 선택할 수 있습니다.',
      },
    },
  },
};

// 페이지네이션 패널 숨김
export const HiddenPaginationPanel: Story = {
  render: () => ({
    components: { BaseDataGrid },
    setup() {
      const rowData = ref(generateTestData(100));
      const columnDefs = ref(baseColumnDefs);

      return {
        rowData,
        columnDefs,
      };
    },
    template: `
      <div class="h-96 w-full max-w-7xl">
        <BaseDataGrid
          :columnDefs="columnDefs"
          :rowData="rowData"
          :pagination="true"
          :paginationPageSize="20"
          :suppressPaginationPanel="true"
          :filterable="true"
          :sortable="true"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '페이지네이션 패널이 숨겨진 데이터 그리드입니다. 페이지네이션은 활성화되어 있지만 하단의 페이지네이션 컨트롤이 표시되지 않습니다.',
      },
    },
  },
};

// 대용량 데이터 (1000개 행)
export const LargeDataset: Story = {
  render: () => ({
    components: { BaseDataGrid },
    setup() {
      const rowData = ref(generateTestData(1000));
      const columnDefs = ref(baseColumnDefs);

      return {
        rowData,
        columnDefs,
      };
    },
    template: `
      <div class="h-96 w-full max-w-7xl">
        <BaseDataGrid
          :columnDefs="columnDefs"
          :rowData="rowData"
          :pagination="true"
          :paginationPageSize="50"
          :paginationPageSizeSelector="[25, 50, 100, 200]"
          :filterable="true"
          :sortable="true"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '대용량 데이터셋(1000개 행)을 처리하는 데이터 그리드입니다. 페이지네이션을 통해 성능을 최적화하고 사용자 경험을 향상시킵니다.',
      },
    },
  },
};

// 자동 테마 적용 (다크모드/라이트모드)
export const AutoTheme: Story = {
  render: () => ({
    components: { BaseDataGrid },
    setup() {
      const rowData = ref(generateTestData(50));
      const columnDefs = ref(baseColumnDefs);

      return {
        rowData,
        columnDefs,
      };
    },
    template: `
      <div class="space-y-4 w-full max-w-7xl">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-blue-900 mb-2">자동 테마 적용</h3>
          <p class="text-sm text-blue-800">
            BaseDataGrid는 앱의 다크모드 상태에 따라 자동으로 테마가 적용됩니다.
            앱의 테마 토글을 사용하여 다크모드/라이트모드를 전환해보세요.
          </p>
        </div>
        
        <div class="h-64 border rounded-lg w-full">
          <BaseDataGrid
            :columnDefs="columnDefs"
            :rowData="rowData"
            :pagination="true"
            :paginationPageSize="10"
            :filterable="true"
            :sortable="true"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '앱의 다크모드 상태에 따라 자동으로 테마가 적용되는 데이터 그리드입니다. 라이트모드에서는 Alpine 테마, 다크모드에서는 Alpine 다크 테마가 적용됩니다.',
      },
    },
  },
};

// 필터링 및 정렬 기능 강조
export const WithFilteringAndSorting: Story = {
  render: () => ({
    components: { BaseDataGrid },
    setup() {
      const rowData = ref(generateTestData(100));
      const columnDefs = ref([
        {
          field: 'id',
          headerName: 'ID',
          width: 80,
          pinned: 'left',
          sortable: true,
        },
        {
          field: 'name',
          headerName: '이름',
          width: 120,
          sortable: true,
          filter: 'agTextColumnFilter',
          filterParams: {
            filterOptions: ['contains', 'notContains', 'equals', 'notEqual'],
            defaultOption: 'contains',
          },
        },
        {
          field: 'email',
          headerName: '이메일',
          width: 200,
          sortable: true,
          filter: 'agTextColumnFilter',
        },
        {
          field: 'department',
          headerName: '부서',
          width: 120,
          sortable: true,
          filter: 'agSetColumnFilter',
          filterParams: {
            values: ['개발팀', '디자인팀', '마케팅팀', '영업팀', '인사팀'],
          },
        },
        {
          field: 'position',
          headerName: '직급',
          width: 100,
          sortable: true,
          filter: 'agSetColumnFilter',
          filterParams: {
            values: ['주니어', '시니어', '팀장', '부장', '이사'],
          },
        },
        {
          field: 'salary',
          headerName: '연봉',
          width: 120,
          sortable: true,
          filter: 'agNumberColumnFilter',
          valueFormatter: (params: any) => {
            return new Intl.NumberFormat('ko-KR').format(params.value) + '원';
          },
        },
        {
          field: 'joinDate',
          headerName: '입사일',
          width: 120,
          sortable: true,
          filter: 'agDateColumnFilter',
          filterParams: {
            comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
              const cellDate = new Date(cellValue);
              if (cellDate < filterLocalDateAtMidnight) return -1;
              if (cellDate > filterLocalDateAtMidnight) return 1;
              return 0;
            },
          },
        },
        {
          field: 'status',
          headerName: '상태',
          width: 100,
          sortable: true,
          filter: 'agSetColumnFilter',
          filterParams: {
            values: ['활성', '비활성', '휴직'],
          },
          cellRenderer: (params: any) => {
            const status = params.value;
            const color = status === '활성' ? 'green' : status === '비활성' ? 'red' : 'orange';
            return `<span style="color: ${color}; font-weight: bold;">${status}</span>`;
          },
        },
      ]);

      return {
        rowData,
        columnDefs,
      };
    },
    template: `
      <div class="space-y-4 w-full max-w-7xl">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-blue-900 mb-2">필터링 및 정렬 기능</h3>
          <ul class="text-sm text-blue-800 space-y-1">
            <li>• 컬럼 헤더를 클릭하여 정렬 (오름차순/내림차순)</li>
            <li>• 컬럼 헤더의 필터 아이콘을 클릭하여 필터링</li>
            <li>• 텍스트 컬럼: contains, equals 등 다양한 옵션</li>
            <li>• 숫자 컬럼: 범위, 비교 연산자</li>
            <li>• 날짜 컬럼: 날짜 범위 선택</li>
            <li>• 카테고리 컬럼: 다중 선택</li>
          </ul>
        </div>
        
        <div class="h-96 w-full">
          <BaseDataGrid
            :columnDefs="columnDefs"
            :rowData="rowData"
            :pagination="true"
            :paginationPageSize="20"
            :filterable="true"
            :sortable="true"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '고급 필터링 및 정렬 기능이 강화된 데이터 그리드입니다. 각 컬럼 타입에 맞는 필터 옵션을 제공하며, 다중 필터 조합이 가능합니다.',
      },
    },
  },
};

// 페이지네이션 이벤트 처리
export const WithPaginationEvents: Story = {
  render: () => ({
    components: { BaseDataGrid },
    setup() {
      const rowData = ref(generateTestData(150));
      const columnDefs = ref(baseColumnDefs);
      const currentPage = ref(1);
      const totalPages = ref(0);
      const totalRows = ref(0);
      const pageSize = ref(25);

      const onGridReady = (params: any) => {
        const api = params.api;
        totalRows.value = api.getDisplayedRowCount();
        totalPages.value = Math.ceil(totalRows.value / pageSize.value);
      };

      const onSortChanged = (event: any) => {
        console.log('정렬 변경:', event);
      };

      return {
        rowData,
        columnDefs,
        currentPage,
        totalPages,
        totalRows,
        pageSize,
        onGridReady,
        onSortChanged,
      };
    },
    template: `
      <div class="space-y-4 w-full max-w-7xl">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">페이지네이션 정보</h3>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="font-medium">총 행 수:</span> {{ totalRows }}
            </div>
            <div>
              <span class="font-medium">페이지 크기:</span> {{ pageSize }}
            </div>
            <div>
              <span class="font-medium">총 페이지 수:</span> {{ totalPages }}
            </div>
            <div>
              <span class="font-medium">현재 페이지:</span> {{ currentPage }}
            </div>
          </div>
        </div>
        
        <div class="h-96 w-full">
          <BaseDataGrid
            :columnDefs="columnDefs"
            :rowData="rowData"
            :pagination="true"
            :paginationPageSize="pageSize"
            :filterable="true"
            :sortable="true"
            @grid-ready="onGridReady"
            @sort-changed="onSortChanged"
          />
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h4 class="text-sm font-medium text-yellow-900 mb-2">이벤트 로그</h4>
          <p class="text-xs text-yellow-800">
            개발자 도구 콘솔에서 정렬 변경 이벤트를 확인할 수 있습니다.
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '페이지네이션 이벤트를 처리하는 데이터 그리드입니다. 그리드 준비 완료, 정렬 변경 등의 이벤트를 감지하고 정보를 표시합니다.',
      },
    },
  },
};

// 반응형 그리드
export const ResponsiveGrid: Story = {
  render: () => ({
    components: { BaseDataGrid },
    setup() {
      const rowData = ref(generateTestData(100));
      const columnDefs = ref([
        {
          field: 'id',
          headerName: 'ID',
          width: 80,
          pinned: 'left',
          sortable: true,
        },
        {
          field: 'name',
          headerName: '이름',
          width: 120,
          sortable: true,
          filter: true,
        },
        {
          field: 'email',
          headerName: '이메일',
          width: 200,
          sortable: true,
          filter: true,
        },
        {
          field: 'department',
          headerName: '부서',
          width: 120,
          sortable: true,
          filter: true,
        },
        {
          field: 'position',
          headerName: '직급',
          width: 100,
          sortable: true,
          filter: true,
        },
        {
          field: 'salary',
          headerName: '연봉',
          width: 120,
          sortable: true,
          valueFormatter: (params: any) => {
            return new Intl.NumberFormat('ko-KR').format(params.value) + '원';
          },
        },
        {
          field: 'joinDate',
          headerName: '입사일',
          width: 120,
          sortable: true,
          filter: 'agDateColumnFilter',
        },
        {
          field: 'status',
          headerName: '상태',
          width: 100,
          sortable: true,
          filter: true,
          cellRenderer: (params: any) => {
            const status = params.value;
            const color = status === '활성' ? 'green' : status === '비활성' ? 'red' : 'orange';
            return `<span style="color: ${color}; font-weight: bold;">${status}</span>`;
          },
        },
      ]);

      return {
        rowData,
        columnDefs,
      };
    },
    template: `
      <div class="space-y-4">
        <div class="bg-green-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-green-900 mb-2">반응형 그리드</h3>
          <p class="text-sm text-green-800">
            브라우저 창 크기를 조절하여 그리드의 반응형 동작을 확인해보세요.
            컬럼 너비가 자동으로 조정되고 가로 스크롤이 나타납니다.
          </p>
        </div>
        
        <div class="h-96 w-full max-w-7xl">
          <BaseDataGrid
            :columnDefs="columnDefs"
            :rowData="rowData"
            :pagination="true"
            :paginationPageSize="20"
            :filterable="true"
            :sortable="true"
            :resizable="true"
            height="100%"
            width="100%"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '반응형으로 동작하는 데이터 그리드입니다. 브라우저 창 크기에 따라 컬럼 너비가 자동으로 조정되며, 가로 스크롤을 통해 모든 컬럼을 확인할 수 있습니다.',
      },
    },
  },
};
