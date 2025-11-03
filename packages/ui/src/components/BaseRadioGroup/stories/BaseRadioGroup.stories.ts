import type { Meta, StoryObj } from '@storybook/vue3';
import BaseRadioGroup from '../BaseRadioGroup.vue';
import { ref, computed } from 'vue';

const meta: Meta<typeof BaseRadioGroup> = {
  title: 'Inputs/BaseRadioGroup',
  component: BaseRadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Headless UI를 기반으로 한 라디오 그룹 컴포넌트입니다. BaseTabs의 inner variant와 동일한 스타일을 적용하여 일관된 디자인을 제공합니다. v-model을 통해 선택값을 관리하며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: '라디오 옵션 목록',
    },

    label: {
      control: 'text',
      description: '라디오 그룹 라벨',
    },
    disabled: {
      control: 'boolean',
      description: '전체 비활성화 여부',
    },
    name: {
      control: 'text',
      description: '폼에서 사용할 name 속성',
    },
    by: {
      control: 'text',
      description: '객체 비교를 위한 키 또는 비교 함수',
    },
    allowedList: {
      control: 'object',
      description: '허용된 옵션 인덱스 목록 (예: [0, 3])',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 라디오 그룹
export const Default: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedValue = ref('option1');
      return { selectedValue };
    },
    template: `
      <BaseRadioGroup
        v-model="selectedValue"
        :options="[
          { value: 'option1', label: '옵션 1' },
          { value: 'option2', label: '옵션 2' },
          { value: 'option3', label: '옵션 3' },
        ]"
        label="선택하세요"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '기본적인 라디오 그룹입니다. v-model="selectedValue"로 선택값을 관리하며, ref("option1")로 초기값을 설정하여 첫 번째 옵션이 초기 선택됩니다. 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 아이콘이 있는 라디오 그룹
export const WithIcons: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedPlan = ref('startup');
      return { selectedPlan };
    },
    template: `
      <BaseRadioGroup
        v-model="selectedPlan"
        :options="[
          { value: 'startup', label: '스타트업', icon: 'plus' },
          { value: 'business', label: '비즈니스', icon: 'home' },
          { value: 'enterprise', label: '엔터프라이즈', icon: 'star' },
        ]"
        label="플랜 선택"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '각 옵션에 아이콘이 포함된 라디오 그룹입니다. v-model="selectedPlan"으로 선택값을 관리하며, ref("startup")로 초기값을 설정하여 "스타트업" 옵션이 초기 선택됩니다. 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 비활성화된 옵션이 있는 라디오 그룹
export const WithDisabledOptions: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedOption = ref('option1');
      return { selectedOption };
    },
    template: `
      <BaseRadioGroup
        v-model="selectedOption"
        :options="[
          { value: 'option1', label: '옵션 1' },
          { value: 'option2', label: '옵션 2', disabled: true },
          { value: 'option3', label: '옵션 3' },
        ]"
        label="옵션 선택"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '일부 옵션이 비활성화된 라디오 그룹입니다. v-model="selectedOption"으로 선택값을 관리하며, ref("option1")로 초기값을 설정하여 첫 번째 옵션이 초기 선택됩니다. 비활성화된 옵션은 선택할 수 없지만, 활성화된 옵션들은 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 전체 비활성화된 라디오 그룹
export const Disabled: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedOption = ref('option1');
      return { selectedOption };
    },
    template: `
      <BaseRadioGroup
        v-model="selectedOption"
        :options="[
          { value: 'option1', label: '옵션 1' },
          { value: 'option2', label: '옵션 2' },
          { value: 'option3', label: '옵션 3' },
        ]"
        label="비활성화된 그룹"
        :disabled="true"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '전체가 비활성화된 라디오 그룹입니다. v-model="selectedOption"으로 선택값을 관리하며, ref("option1")로 초기값을 설정하여 첫 번째 옵션이 초기 선택되지만, disabled prop으로 인해 모든 옵션을 선택할 수 없습니다.',
      },
    },
  },
};

// 폼에서 사용하는 라디오 그룹
export const WithForm: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedGender = ref('male');
      return { selectedGender };
    },
    template: `
      <BaseRadioGroup
        v-model="selectedGender"
        :options="[
          { value: 'male', label: '남성' },
          { value: 'female', label: '여성' },
          { value: 'other', label: '기타' },
        ]"
        label="성별"
        name="gender"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'HTML 폼에서 사용할 수 있는 라디오 그룹입니다. v-model="selectedGender"로 선택값을 관리하며, ref("male")로 초기값을 설정하여 "남성" 옵션이 초기 선택됩니다. name 속성을 통해 폼 제출 시 값이 전송되며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 숫자 값을 사용하는 라디오 그룹
export const WithNumericValues: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedQuantity = ref(1);
      return { selectedQuantity };
    },
    template: `
      <BaseRadioGroup
        v-model="selectedQuantity"
        :options="[
          { value: 1, label: '1개' },
          { value: 2, label: '2개' },
          { value: 3, label: '3개' },
          { value: 4, label: '4개' },
          { value: 5, label: '5개' },
        ]"
        label="수량 선택"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '숫자 값을 사용하는 라디오 그룹입니다. v-model="selectedQuantity"로 선택값을 관리하며, ref(1)로 초기값을 설정하여 "1개" 옵션이 초기 선택됩니다. 문자열뿐만 아니라 숫자 값도 사용할 수 있으며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 객체 값을 사용하는 라디오 그룹 (by="id")
export const WithObjectValues: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedPlan = ref({ id: 'startup', name: '스타트업', price: 10000 });
      return { selectedPlan };
    },
    template: `
      <BaseRadioGroup
        v-model="selectedPlan"
        :options="[
          { value: { id: 'startup', name: '스타트업', price: 10000 }, label: '스타트업' },
          { value: { id: 'business', name: '비즈니스', price: 20000 }, label: '비즈니스' },
          { value: { id: 'enterprise', name: '엔터프라이즈', price: 50000 }, label: '엔터프라이즈' },
        ]"
        label="플랜 선택 (by='id')"
        by="id"
      />
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '객체 값을 사용하는 라디오 그룹입니다. v-model="selectedPlan"으로 선택값을 관리하며, ref(startup 객체)로 초기값을 설정하여 "스타트업" 옵션이 초기 선택됩니다. by prop을 사용하여 객체 비교 방법을 지정할 수 있으며, 사용자가 다른 옵션을 클릭하면 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// by에 조건식을 사용하는 라디오 그룹
export const WithCustomComparison: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedUser = ref({
        id: 'user1',
        name: '김철수',
        role: 'admin',
        department: 'IT',
      });

      // 복잡한 비교 조건: role과 department가 모두 일치해야 함
      const compareUsers = (a: any, b: any) => {
        return a.role === b.role && a.department === b.department;
      };

      return { selectedUser, compareUsers };
    },
    template: `
      <div class="space-y-4">
        <BaseRadioGroup
          v-model="selectedUser"
          :options="[
            { 
              value: { id: 'user1', name: '김철수', role: 'admin', department: 'IT' }, 
              label: '김철수 (IT/관리자)' 
            },
            { 
              value: { id: 'user2', name: '이영희', role: 'admin', department: 'IT' }, 
              label: '이영희 (IT/관리자)' 
            },
            { 
              value: { id: 'user3', name: '박민수', role: 'user', department: 'IT' }, 
              label: '박민수 (IT/사용자)' 
            },
            { 
              value: { id: 'user4', name: '최지영', role: 'admin', department: 'HR' }, 
              label: '최지영 (HR/관리자)' 
            },
          ]"
          label="사용자 선택 (role + department 비교)"
          :by="compareUsers"
        />
        
        <div class="text-sm text-gray-600 space-y-2">
          <p><strong>선택된 사용자:</strong> {{ selectedUser.name }}</p>
          <p><strong>역할:</strong> {{ selectedUser.role === 'admin' ? '관리자' : '사용자' }}</p>
          <p><strong>부서:</strong> {{ selectedUser.department }}</p>
        </div>
        
        <div class="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <p><strong>비교 로직:</strong></p>
          <p>role과 department가 모두 일치하는 사용자만 같은 그룹으로 인식됩니다.</p>
          <p>예: IT 관리자끼리는 서로 선택 가능, IT 사용자는 별도 그룹</p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'by prop에 커스텀 비교 함수를 사용하는 예시입니다. role과 department가 모두 일치하는 사용자만 같은 그룹으로 인식되어 선택 가능합니다. 복잡한 객체 비교 로직을 구현할 수 있습니다.',
      },
    },
  },
};

// 기본값이 없는 라디오 그룹 (v-model 없이)
export const WithoutInitialValue: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedValue = ref(undefined);
      return { selectedValue };
    },
    template: `
      <BaseRadioGroup
        v-model="selectedValue"
        :options="[
          { value: 'option1', label: '옵션 1' },
          { value: 'option2', label: '옵션 2' },
          { value: 'option3', label: '옵션 3' },
        ]"
        label="기본값 없음"
      />
      <p class="mt-4 text-sm text-gray-600">
        선택된 값: {{ selectedValue || '없음' }}
      </p>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '초기값이 설정되지 않은 라디오 그룹입니다. ref(undefined)로 초기값을 설정하지 않으면 아무 옵션도 선택되지 않은 상태로 시작됩니다. 사용자가 옵션을 클릭해야 선택되며, 선택 후에는 다른 옵션으로 자유롭게 변경할 수 있습니다.',
      },
    },
  },
};

// 초기값 설정 예시
export const WithInitialValue: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedValue = ref('option2'); // 초기값을 ref에 직접 설정
      return { selectedValue };
    },
    template: `
      <div class="space-y-4">
        <BaseRadioGroup
          v-model="selectedValue"
          :options="[
            { value: 'option1', label: '옵션 1' },
            { value: 'option2', label: '옵션 2' },
            { value: 'option3', label: '옵션 3' },
          ]"
          label="초기값 설정"
        />
        <p class="text-sm text-gray-600">
          선택된 값: {{ selectedValue }}
        </p>
        <p class="text-xs text-gray-500">
          ref('option2')로 초기값을 설정하여 "옵션 2"가 기본 선택됩니다.
        </p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '초기값을 설정하는 예시입니다. ref("option2")로 초기값을 설정하여 "옵션 2"가 기본 선택됩니다. defineModel을 통해 v-model이 자동으로 처리됩니다.',
      },
    },
  },
};

// 이벤트 필터링을 위한 라디오 그룹
export const EventFilter: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      // 이벤트 목록 데이터
      const events = ref([
        {
          id: 1,
          title: 'Vue.js 컨퍼런스 2024',
          status: 'ongoing',
          date: '2024-12-15',
          attendees: 150,
        },
        { id: 2, title: 'React 워크샵', status: 'ongoing', date: '2024-12-20', attendees: 80 },
        {
          id: 3,
          title: 'TypeScript 마스터클래스',
          status: 'ended',
          date: '2024-11-30',
          attendees: 120,
        },
        { id: 4, title: 'Node.js 해커톤', status: 'ended', date: '2024-11-15', attendees: 200 },
        { id: 5, title: 'AI 개발자 밋업', status: 'upcoming', date: '2025-01-10', attendees: 60 },
        { id: 6, title: 'DevOps 컨퍼런스', status: 'upcoming', date: '2025-01-25', attendees: 100 },
      ]);

      // 필터 옵션
      const filterOptions = ref([
        { value: 'all', label: '전체' },
        { value: 'ongoing', label: '진행 중' },
        { value: 'ended', label: '종료' },
        { value: 'upcoming', label: '예정' },
      ]);

      // 선택된 필터
      const selectedFilter = ref('all');

      // 필터링된 이벤트 목록
      const filteredEvents = computed(() => {
        if (selectedFilter.value === 'all') {
          return events.value;
        }
        return events.value.filter((event) => event.status === selectedFilter.value);
      });

      // 이벤트 상태에 따른 배지 스타일
      const getStatusBadgeClass = (status: string) => {
        switch (status) {
          case 'ongoing':
            return 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full';
          case 'ended':
            return 'bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full';
          case 'upcoming':
            return 'bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full';
          default:
            return 'bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full';
        }
      };

      // 이벤트 상태에 따른 한글 라벨
      const getStatusLabel = (status: string) => {
        switch (status) {
          case 'ongoing':
            return '진행 중';
          case 'ended':
            return '종료';
          case 'upcoming':
            return '예정';
          default:
            return status;
        }
      };

      return {
        events,
        filterOptions,
        selectedFilter,
        filteredEvents,
        getStatusBadgeClass,
        getStatusLabel,
      };
    },
    template: `
      <div class="space-y-6 max-w-4xl">
        <!-- 필터 섹션 -->
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">이벤트 필터</h3>
          <BaseRadioGroup
            v-model="selectedFilter"
            :options="filterOptions"
            label="이벤트 상태별 필터링"
          />
          <p class="text-sm text-gray-600 mt-2">
            선택된 필터: <strong>{{ selectedFilter === 'all' ? '전체' : getStatusLabel(selectedFilter) }}</strong>
          </p>
        </div>

        <!-- 이벤트 목록 -->
        <div class="bg-white rounded-lg border border-gray-200">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">
              이벤트 목록 
              <span class="text-sm font-normal text-gray-500">
                ({{ filteredEvents.length }}개)
              </span>
            </h3>
          </div>
          
          <div class="divide-y divide-gray-200">
            <div
              v-for="event in filteredEvents"
              :key="event.id"
              class="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex-1">
                  <h4 class="text-base font-medium text-gray-900">{{ event.title }}</h4>
                  <div class="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>📅 {{ event.date }}</span>
                    <span>👥 {{ event.attendees }}명</span>
                    <span :class="getStatusBadgeClass(event.status)">
                      {{ getStatusLabel(event.status) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 이벤트가 없을 때 -->
            <div
              v-if="filteredEvents.length === 0"
              class="px-6 py-12 text-center text-gray-500"
            >
              <p>해당 조건의 이벤트가 없습니다.</p>
            </div>
          </div>
        </div>

        <!-- 디버그 정보 -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="text-sm font-medium text-gray-700 mb-2">디버그 정보</h4>
          <div class="text-xs text-gray-600 space-y-1">
            <p>선택된 필터: {{ selectedFilter }}</p>
            <p>전체 이벤트 수: {{ events.length }}</p>
            <p>필터링된 이벤트 수: {{ filteredEvents.length }}</p>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          '이벤트 필터링을 위한 라디오 그룹 예시입니다. "전체", "진행 중", "종료", "예정" 중 선택하여 이벤트 목록을 필터링할 수 있습니다. 선택된 필터에 따라 실시간으로 이벤트 목록이 업데이트되며, 각 이벤트의 상태, 날짜, 참가자 수를 확인할 수 있습니다.',
      },
    },
  },
};

// allowedList를 사용하는 라디오 그룹
export const WithAllowedList: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedValue = ref('option1');
      const allowedList = ref([0, 3]); // 0번과 3번 인덱스만 허용
      return { selectedValue, allowedList };
    },
    template: `
      <div class="space-y-4">
        <BaseRadioGroup
          v-model="selectedValue"
          :options="[
            { value: 'option1', label: '옵션 1' },
            { value: 'option2', label: '옵션 2' },
            { value: 'option3', label: '옵션 3' },
            { value: 'option4', label: '옵션 4' },
            { value: 'option5', label: '옵션 5' },
          ]"
          label="allowedList 예시"
          :allowed-list="allowedList"
        />
        <div class="text-sm text-gray-600 space-y-2">
          <p><strong>선택된 값:</strong> {{ selectedValue }}</p>
          <p><strong>허용된 인덱스:</strong> [0, 3]</p>
          <p class="text-xs text-gray-500">
            ※ 0번(옵션 1)과 3번(옵션 4)만 활성화되고, 나머지는 비활성화됩니다.
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'allowedList prop을 사용하여 특정 인덱스의 옵션만 활성화하는 예시입니다. [0, 3]으로 설정하면 0번과 3번 인덱스의 옵션만 선택 가능하고, 나머지는 비활성화됩니다. 이 기능은 사용자 권한이나 특정 조건에 따라 옵션을 제한해야 할 때 유용합니다.',
      },
    },
  },
};

// allowedList를 동적으로 변경하는 예시
export const DynamicAllowedList: Story = {
  render: () => ({
    components: { BaseRadioGroup },
    setup() {
      const selectedValue = ref('option1');
      const allowedList = ref([0, 1, 2]); // 초기값: 0, 1, 2번 인덱스 허용

      const toggleIndex = (index: number) => {
        const currentList = [...allowedList.value];
        const indexPosition = currentList.indexOf(index);

        if (indexPosition > -1) {
          // 인덱스가 이미 허용 목록에 있으면 제거
          currentList.splice(indexPosition, 1);
        } else {
          // 인덱스가 허용 목록에 없으면 추가
          currentList.push(index);
          currentList.sort((a, b) => a - b);
        }

        allowedList.value = currentList;
      };

      const isAllowed = (index: number) => {
        return allowedList.value.includes(index);
      };

      return { selectedValue, allowedList, toggleIndex, isAllowed };
    },
    template: `
      <div class="space-y-6 max-w-2xl">
        <div class="bg-white p-6 rounded-lg border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">동적 allowedList 제어</h3>
          <BaseRadioGroup
            v-model="selectedValue"
            :options="[
              { value: 'option1', label: '옵션 1' },
              { value: 'option2', label: '옵션 2' },
              { value: 'option3', label: '옵션 3' },
              { value: 'option4', label: '옵션 4' },
              { value: 'option5', label: '옵션 5' },
            ]"
            label="선택하세요"
            :allowed-list="allowedList"
          />
          
          <div class="mt-4 p-4 bg-gray-50 rounded-lg">
            <p class="text-sm font-medium text-gray-700 mb-3">허용 인덱스 제어:</p>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="index in 5"
                :key="index"
                @click="toggleIndex(index - 1)"
                :class="[
                  'px-3 py-1 rounded text-sm font-medium transition-colors',
                  isAllowed(index - 1)
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                ]"
              >
                {{ index - 1 }}번 {{ isAllowed(index - 1) ? '✓' : '✗' }}
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-3">
              버튼을 클릭하여 해당 인덱스의 허용 여부를 변경할 수 있습니다.
            </p>
          </div>
          
          <div class="mt-4 text-sm text-gray-600 space-y-1">
            <p><strong>선택된 값:</strong> {{ selectedValue }}</p>
            <p><strong>허용된 인덱스:</strong> [{{ allowedList.join(', ') }}]</p>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'allowedList를 동적으로 변경하는 예시입니다. 버튼을 클릭하여 각 인덱스의 허용 여부를 변경할 수 있으며, 실시간으로 라디오 그룹의 활성화 상태가 업데이트됩니다. 이 예시는 권한 변경이나 조건에 따른 옵션 제어 시나리오를 보여줍니다.',
      },
    },
  },
};
