import type { TableHeader } from '../../../types/components';
import type { Meta, StoryObj } from '@storybook/vue3';
import BaseTableHead from '../BaseTableHead.vue';
import BaseTableBody from '../BaseTableBody.vue';

const meta: Meta<typeof BaseTableHead> = {
  title: 'Table/BaseTableHead',
  component: BaseTableHead,
  parameters: {
    docs: {
      description: {
        component:
          '테이블 헤더 컴포넌트입니다. BaseTableRow와 BaseTableCell을 사용하여 헤더를 구성하며, Type1과 Type2 스타일을 지원합니다. Type2에서는 preset 색상과 커스텀 색상을 사용할 수 있습니다.\n\n**Figma 링크**: [Table/Header](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=74-997&m=dev), [Table/Header-Type2](https://www.figma.com/design/5OJPsmnkEgZZnkHtNbk1wK/-MODA--Draft-250514-?node-id=82-940&m=dev)',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    headers: {
      control: 'object',
      description: '헤더 정보 배열',
    },
    type: {
      control: 'select',
      options: ['type1', 'type2'],
      description: '헤더 타입',
    },
    preset: {
      control: 'select',
      options: ['gray', 'blue', 'pink'],
      description: 'Type2 헤더의 preset 색상',
    },
    customColor: {
      control: 'color',
      description: 'Type2 헤더의 커스텀 색상',
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
];

const userStatsData = [{ id: 1, total: 1234, active: 987, inactive: 247 }];

export const Type1: Story = {
  args: {
    headers: defaultHeaders,
    type: 'type1',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type1 스타일의 테이블 헤더입니다. 작은 폰트 크기와 얇은 하단 테두리를 사용합니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableHead, BaseTableBody },
    setup() {
      return { args, defaultData };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead v-bind="args" @sort="handleSort" />
          <BaseTableBody :headers="args.headers" :data="defaultData" />
        </table>
      </div>
    `,
  }),
};

export const Type2: Story = {
  args: {
    headers: userHeaders,
    type: 'type2',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type2 스타일의 테이블 헤더입니다. 큰 폰트 크기와 더 넓은 패딩을 사용합니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableHead, BaseTableBody },
    setup() {
      return { args, userStatsData };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead v-bind="args" @sort="handleSort" />
          <BaseTableBody :headers="args.headers" :data="userStatsData" />
        </table>
      </div>
    `,
  }),
};

export const Type2Gray: Story = {
  args: {
    headers: userHeaders,
    type: 'type2',
    preset: 'gray',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type2 Gray preset 스타일의 테이블 헤더입니다. 기본 그레이 색상의 헤더 스타일을 제공합니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableHead, BaseTableBody },
    setup() {
      return { args, userStatsData };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead v-bind="args" @sort="handleSort" />
          <BaseTableBody :headers="args.headers" :data="userStatsData" />
        </table>
      </div>
    `,
  }),
};

export const Type2Blue: Story = {
  args: {
    headers: userHeaders,
    type: 'type2',
    preset: 'blue',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type2 Blue preset 스타일의 테이블 헤더입니다. 파란색 배경의 헤더 스타일을 제공합니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableHead, BaseTableBody },
    setup() {
      return { args, userStatsData };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead v-bind="args" @sort="handleSort" />
          <BaseTableBody :headers="args.headers" :data="userStatsData" />
        </table>
      </div>
    `,
  }),
};

export const Type2Pink: Story = {
  args: {
    headers: userHeaders,
    type: 'type2',
    preset: 'pink',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Type2 Pink preset 스타일의 테이블 헤더입니다. 분홍색 배경의 헤더 스타일을 제공합니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableHead, BaseTableBody },
    setup() {
      return { args, userStatsData };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead v-bind="args" @sort="handleSort" />
          <BaseTableBody :headers="args.headers" :data="userStatsData" />
        </table>
      </div>
    `,
  }),
};

export const Type2CustomPurple: Story = {
  args: {
    headers: userHeaders,
    type: 'type2',
    customColor: '#8B5CF6',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type2 커스텀 색상 헤더입니다. 보라색 커스텀 색상의 헤더 스타일을 제공합니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableHead, BaseTableBody },
    setup() {
      return { args, userStatsData };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead v-bind="args" @sort="handleSort" />
          <BaseTableBody :headers="args.headers" :data="userStatsData" />
        </table>
      </div>
    `,
  }),
};

export const Type2CustomGreen: Story = {
  args: {
    headers: userHeaders,
    type: 'type2',
    customColor: '#10B981',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type2 커스텀 색상 헤더입니다. 초록색 커스텀 색상의 헤더 스타일을 제공합니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableHead, BaseTableBody },
    setup() {
      return { args, userStatsData };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead v-bind="args" @sort="handleSort" />
          <BaseTableBody :headers="args.headers" :data="userStatsData" />
        </table>
      </div>
    `,
  }),
};

export const Type2CustomOrange: Story = {
  args: {
    headers: userHeaders,
    type: 'type2',
    customColor: '#F59E0B',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type2 커스텀 색상 헤더입니다. 주황색 커스텀 색상의 헤더 스타일을 제공합니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableHead, BaseTableBody },
    setup() {
      return { args, userStatsData };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead v-bind="args" @sort="handleSort" />
          <BaseTableBody :headers="args.headers" :data="userStatsData" />
        </table>
      </div>
    `,
  }),
};

export const Type2CustomTeal: Story = {
  args: {
    headers: userHeaders,
    type: 'type2',
    customColor: '#14B8A6',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type2 커스텀 색상 헤더입니다. 청록색 커스텀 색상의 헤더 스타일을 제공합니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableHead, BaseTableBody },
    setup() {
      return { args, userStatsData };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead v-bind="args" @sort="handleSort" />
          <BaseTableBody :headers="args.headers" :data="userStatsData" />
        </table>
      </div>
    `,
  }),
};

export const WithSorting: Story = {
  args: {
    headers: defaultHeaders,
    type: 'type1',
  },
  parameters: {
    docs: {
      description: {
        story: '정렬 기능이 포함된 헤더입니다. 헤더를 클릭하면 정렬 이벤트가 발생합니다.',
      },
    },
  },
  render: (args) => ({
    components: { BaseTableHead, BaseTableBody },
    setup() {
      const handleSort = (key: string) => {
        console.log('Sort by:', key);
      };
      return { args, handleSort, defaultData };
    },
    template: `
      <div class="table-container">
        <table class="table">
          <BaseTableHead v-bind="args" @sort="handleSort" />
          <BaseTableBody :headers="args.headers" :data="defaultData" />
        </table>
      </div>
    `,
  }),
};
