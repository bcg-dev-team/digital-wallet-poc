<template>
  <div v-if="isReady" class="grid-container">
    <AgGridVue
      :theme="theme"
      :columnDefs="internalColumnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :gridOptions="gridOptions"
      :headerHeight="32"
      :style="gridStyle"
      @grid-ready="onGridReady"
      @sort-changed="onSortChanged"
    />
  </div>
  <div v-else class="grid-placeholder" :style="gridStyle">
    <!-- 로딩 상태나 플레이스홀더 -->
  </div>
</template>

<script setup lang="ts">
// 250k (gzipped: 70k) - cellRenderer 지원을 위한 모듈 추가
import {
  ModuleRegistry,
  CellStyleModule,
  HighlightChangesModule,
  ClientSideRowModelModule,
  ColumnAutoSizeModule,
  ClientSideRowModelApiModule,
  PaginationModule,
  EventApiModule,
  ValidationModule,
  LocaleModule,
  RowSelectionModule,
  themeAlpine,
  colorSchemeDark,
} from 'ag-grid-community';
import type { GridOptions, ColDef, DomLayoutType, ValueFormatterParams } from 'ag-grid-community';

// AG Grid 공식 한글 로케일 import
// 635.9k (gzipped: 177.4k) - 전체 모듈 (사용하지 않음)
// import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { AG_GRID_LOCALE_KR } from '@ag-grid-community/locale';
import { useThemeStore } from '@template/theme';
import { AgGridVue } from 'ag-grid-vue3';

// AG Grid 커스텀 스타일
import './stories/BaseDataGrid.scss';

const customKoreanLocale = {
  // [참고] https://github.com/ag-grid/ag-grid/blob/latest/community-modules/locale/src/ko-KR.ts
  ...AG_GRID_LOCALE_KR,
  // 문구 커스터마이징을 위해서는 이 부분을 수정해주세요.
  noRowsToShow: '내용이 없습니다',
};

// AG-Grid 모듈 등록 - cellRenderer 지원을 위한 기본 모듈
ModuleRegistry.registerModules([
  ClientSideRowModelModule, // 기본 행 모델 (필수)
  CellStyleModule,
  HighlightChangesModule,
  ColumnAutoSizeModule,
  ClientSideRowModelApiModule,
  PaginationModule,
  EventApiModule,
  LocaleModule,
  RowSelectionModule, // 행 선택 기능
  // agAnimateShowChangeCellRenderer는 내장 렌더러로 별도 모듈 불필요
]);

// via process.env.NODE_ENV
if (process.env.NODE_ENV !== 'production') {
  ModuleRegistry.registerModules([ValidationModule]);
}

/**
 * BaseDataGrid 컴포넌트 Props
 */
interface Props {
  /** 컬럼 정의 배열 */
  columnDefs: ColDef[];
  /** 테이블 데이터 배열 */
  rowData: any[];
  /** 기본 컬럼 설정 */
  defaultColDef?: Partial<ColDef>;
  /** 그리드 옵션 */
  gridOptions?: Partial<GridOptions>;
  /** 그리드 높이 (기본값: 100%) */
  height?: string | number;
  /** 그리드 너비 (기본값: 100%) */
  width?: string | number;
  /** 정렬 가능 여부 (기본값: true) */
  sortable?: boolean;
  /** 필터링 가능 여부 (기본값: false) */
  filterable?: boolean;
  /** 페이지네이션 사용 여부 (기본값: false) */
  pagination?: boolean;
  /** 페이지당 행 수 (기본값: 100) */
  paginationPageSize?: number;
  /** 페이지 크기 선택 옵션 (기본값: [25, 50, 100, 200]) */
  paginationPageSizeSelector?: number[];
  /** 페이지네이션 패널 숨김 여부 (기본값: false) */
  suppressPaginationPanel?: boolean;
  /** 컬럼 리사이징 가능 여부 (기본값: true) */
  resizable?: boolean;
  /** 컬럼 너비 커스텀 여부 (기본값: false) */
  customColumnWidths?: boolean;
  /** 행 선택 모드 (기본값: 'single') */
  rowSelection?: 'single' | 'multiple' | 'none';
  /** 행 선택 비활성화 여부 (기본값: false) */
  disableRowSelection?: boolean;
}

/**
 * BaseDataGrid 컴포넌트 Emits
 */
interface Emits {
  /** 그리드 준비 완료 시 발생 */
  (e: 'grid-ready', params: { api: any }): void;
  /** 정렬 변경 시 발생 */
  (e: 'sort-changed', event: any): void;
}

const props = withDefaults(defineProps<Props>(), {
  defaultColDef: () => ({}),
  gridOptions: () => ({}),
  height: '100%',
  width: '100%',
  sortable: true,
  filterable: false,
  pagination: false,
  paginationPageSize: 100,
  paginationPageSizeSelector: () => [25, 50, 100, 200],
  suppressPaginationPanel: false,
  resizable: true,
  customColumnWidths: false,
  rowSelection: 'single',
  disableRowSelection: false,
});

const emit = defineEmits<Emits>();

// 테마 스토어 사용
const themeStore = useThemeStore();

// 선택된 테마 (앱의 다크모드 상태에 따라 자동 적용)
const theme = computed(() => {
  // 앱의 다크모드 상태에 따라 자동으로 테마 선택
  return themeStore.isDark ? themeAlpine.withPart(colorSchemeDark) : themeAlpine;
});

const isReady = ref(false);

// 컴포넌트 마운트 후 지연된 렌더링
onMounted(() => {
  // 상위 컴포넌트들의 레이아웃이 완료될 때까지 대기
  nextTick(() => {
    setTimeout(() => {
      isReady.value = true;
    }, 0);
  });
});

// 그리드 스타일 계산
const gridStyle = computed(() => {
  const height = typeof props.height === 'number' ? `${props.height}px` : props.height;
  const width = typeof props.width === 'number' ? `${props.width}px` : props.width;

  return {
    height,
    width,
  };
});

// 기본 컬럼 설정
const defaultColDef = computed(() => ({
  resizable: props.resizable,
  filter: props.filterable,
  floatingFilter: props.filterable,
  suppressMenu: !props.filterable,
  sortable: props.sortable,

  // 컬럼 너비 최적화 (v31+ 권장 방식)
  minWidth: 50, // 최소 너비 설정
  maxWidth: undefined, // 최대 너비 제한 해제
  flex: props.customColumnWidths ? undefined : 1, // 유연한 너비 분배 (자동으로 컨테이너 너비에 맞춤)
  autoHeaderHeight: true, // 헤더 높이 자동 조정

  // 공통 값 포맷팅: null 또는 0 인 경우 '-' 표시 (개별 컬럼 valueFormatter가 있으면 해당 값이 우선)
  valueFormatter: (params: ValueFormatterParams) => {
    const value = (params as any).value;
    return value === 0 || value === null ? '-' : value;
  },

  ...props.defaultColDef,
}));

// 개별 컬럼의 valueFormatter가 존재해도 0/null일 때는 '-'가 우선 적용되도록 래핑
const internalColumnDefs = computed<ColDef[]>(() => {
  const wrapFormatter = (originalFormatter: any) => {
    return (params: ValueFormatterParams) => {
      const value = (params as any).value;
      if (value === 0 || value === null) return '-';
      if (!originalFormatter) return value;
      if (typeof originalFormatter === 'function') {
        return originalFormatter(params as any);
      }
      return value;
    };
  };

  return props.columnDefs.map((col) => {
    const wrappedCol = {
      ...col,
      valueFormatter: wrapFormatter(col.valueFormatter),
    } as ColDef;

    // children이 있는 경우 중첩된 컬럼들도 래핑
    if ((col as any).children && Array.isArray((col as any).children)) {
      (wrappedCol as any).children = (col as any).children.map((childCol: any) => ({
        ...childCol,
        valueFormatter: wrapFormatter(childCol.valueFormatter),
      }));
    }

    return wrappedCol;
  });
});

// 그리드 옵션
const gridOptions = computed(() => ({
  // 기본 UI 설정
  animateRows: true,
  enableCellTextSelection: true,
  suppressCellFocus: true, // 셀 클릭 시 포커스 테두리 제거
  suppressContextMenu: true, // 우클릭 메뉴 제거
  suppressMenuHide: true, // 유효하지 않은 속성 제거

  // 행 선택 설정 (체크박스 없이 행 클릭으로 선택)
  ...(props.disableRowSelection
    ? {}
    : {
        rowSelection: (props.rowSelection === 'single'
          ? 'single'
          : props.rowSelection === 'multiple'
            ? 'multiple'
            : undefined) as 'single' | 'multiple' | undefined,
        suppressRowClickSelection: false, // 행 클릭으로 선택 허용
      }),

  // 페이지네이션 설정
  pagination: props.pagination,
  paginationPageSize: props.paginationPageSize,
  paginationPageSizeSelector: props.paginationPageSizeSelector,
  suppressPaginationPanel: props.suppressPaginationPanel,

  // 레이아웃 설정
  domLayout: 'normal' as DomLayoutType,
  suppressHorizontalScroll: false,
  suppressScrollOnNewData: false, // 새 데이터 로드 시 스크롤 유지

  // AG Grid 커스텀 한글 로케일 적용
  localeText: customKoreanLocale,

  // v31+ 권장 설정
  suppressColumnVirtualisation: false, // 컬럼 가상화 활성화
  suppressRowVirtualisation: false, // 행 가상화 활성화
  enableBrowserTooltips: true, // 브라우저 툴팁 활성화

  // 실시간 데이터 업데이트 최적화 설정
  suppressAnimationFrame: true, // 애니메이션 프레임 억제
  suppressBrowserResizeObserver: true, // 브라우저 리사이즈 옵저버 억제

  // 기본 성능 설정
  suppressLoadingOverlay: false, // 로딩 오버레이 활성화
  suppressNoRowsOverlay: false, // 빈 행 오버레이 활성화

  // 컬럼 이동 및 리사이징 설정
  suppressColumnMoveAnimation: true, // 컬럼 이동 애니메이션 비활성화
  suppressMovableColumns: true, // 컬럼 이동 기능 비활성화

  // 성능 최적화: 행 ID 추적을 위한 getRowId 함수
  getRowId: (params: any) => {
    // 데이터에 고유 ID가 있는 경우 사용
    if (params.data && params.data.id) {
      return params.data.id;
    }
    // 고유 ID가 없는 경우 인덱스 기반으로 생성
    const rowIndex = params.node?.rowIndex ?? Math.random().toString(36).substr(2, 9);
    return `row-${rowIndex}`;
  },

  ...props.gridOptions,
}));

// 그리드 API 참조
const gridApi = ref<any | null>(null);

// 그리드 준비 완료 이벤트
const onGridReady = (params: any) => {
  gridApi.value = params.api;

  // 컬럼 너비 최적화 (v31+ 안전한 방식)
  setTimeout(() => {
    try {
      // 기본 sizeColumnsToFit 사용 (가장 안전한 방법)
      params.api.sizeColumnsToFit();
    } catch (error) {
      console.warn('sizeColumnsToFit 호출 실패:', error);
      // API가 사용 불가능한 경우 무시
    }
  }, 100);

  // 윈도우 리사이즈 이벤트 리스너 추가
  const handleResize = () => {
    setTimeout(() => {
      try {
        params.api.sizeColumnsToFit();
      } catch (error) {
        console.warn('리사이즈 시 sizeColumnsToFit 호출 실패:', error);
      }
    });
  };

  window.addEventListener('resize', handleResize);

  // 컴포넌트 언마운트 시 이벤트 리스너 제거를 위해 저장
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });

  // Grid API만 전달 (Column API는 deprecated)
  emit('grid-ready', { api: params.api });
};

// 정렬 변경 이벤트
const onSortChanged = (event: any) => {
  emit('sort-changed', event);
};

// 그리드 API 노출 (ref를 통해 접근 가능)
defineExpose({
  gridApi,
});
</script>

<style scoped>
.grid-container {
  height: 100%;
  width: 100%;
  position: relative;
}

/* AG-Grid domLayout: 'normal' 모드에서 높이 문제 해결 */
.grid-container :deep(.ag-root-wrapper) {
  height: 100% !important;
}

.grid-container :deep(.ag-layout-normal) {
  height: 100% !important;
}

.grid-container :deep(.ag-viewport) {
  min-height: 200px !important;
}

.grid-container :deep(.ag-center-cols-viewport) {
  min-height: 200px !important;
}
</style>
