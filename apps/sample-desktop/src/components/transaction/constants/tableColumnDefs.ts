import {
  formatDateForGrid,
  formatNumber,
  getDecimalPlaces,
  getProfitLossStyle,
  padDecimalPlaces,
} from '@template/utils';
import { EnumLabelMapper, POSITION_CODE_ENUM } from '@template/api';
import { useMetadataStore } from '@/stores/useMetadataStore';
import type { ColDef } from 'ag-grid-community';
import { BaseChip } from '@template/ui';
import { h, render } from 'vue';
const metadataStore = useMetadataStore();
/**
 * 주문 상세 내역 테이블 컬럼 정의
 */
export const orderDetailColumns: ColDef[] = [
  {
    headerName: '주문일자',
    field: 'orderDate',
    width: 120,
    cellStyle: { textAlign: 'center' },
    filter: false,
    valueFormatter: (params: any) => formatDateForGrid(params.value),
  },
  {
    headerName: '주문번호',
    field: 'orderNo',
    width: 120,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '체결일자',
    field: 'executionDate',
    cellStyle: { textAlign: 'center' },
    valueFormatter: (params: any) => formatDateForGrid(params.value),
  },
  {
    headerName: '체결번호',
    field: 'executionNo',
    width: 120,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '종목코드',
    field: 'stockCd',
    width: 100,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: 'L / S',
    field: 'positionCd',
    width: 90,
    cellStyle: { textAlign: 'center' },
    cellRenderer: (params: any) => {
      const container = document.createElement('div');
      const vnode = h(BaseChip, {
        variant: params.value === 'LONG' ? 'red' : 'blue',
        size: 'sm',
        label: EnumLabelMapper.getPositionCodeShort(params.value),
      });
      render(vnode, container);
      return container;
    },
  },
  {
    headerName: '유형',
    field: 'orderTypeCd',
    width: 140,
    cellStyle: { textAlign: 'center' },
    valueFormatter: (params: any) => EnumLabelMapper.getOrderTypeLabel(params.value),
  },
  {
    headerName: '구분',
    field: 'sideCd',
    width: 60,
    cellStyle: { textAlign: 'center' },
    valueFormatter: (params: any) => EnumLabelMapper.getSideCodeLabel(params.value),
  },
  {
    headerName: '주문수량',
    field: 'orderQuantity',
    width: 80,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => {
      return padDecimalPlaces(params.value, 2);
    },
  },
  {
    headerName: '배리어가격',
    field: 'barrierPrice',
    width: 140,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => {
      const metadata = metadataStore.getMetadata(params.data.stockCd);
      return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
    },
  },
  {
    headerName: '주문가격',
    field: 'orderPrice',
    width: 140,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => {
      const metadata = metadataStore.getMetadata(params.data.stockCd);
      return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
    },
  },
  {
    headerName: '이익실현배리어가격',
    field: 'profitRealizationBarrierPrice',
    width: 140,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '손실제한배리어가격',
    field: 'lossCutBarrierPrice',
    width: 140,
    cellStyle: { textAlign: 'right' },
  },
  {
    headerName: '체결수량',
    field: 'executionQuantity',
    width: 80,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => {
      return padDecimalPlaces(params.value, 2);
    },
  },
  {
    headerName: '체결가격',
    field: 'executionPrice',
    width: 140,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => {
      const metadata = metadataStore.getMetadata(params.data.stockCd);
      return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
    },
  },
  {
    headerName: '주문잔량',
    field: 'orderBalance',
    width: 140,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => {
      return padDecimalPlaces(params.value, 2);
    },
  },
  // {
  //   headerName: '주문상태코드',
  //   field: 'orderStatusCd',
  //   cellStyle: { textAlign: 'center' },
  //   valueFormatter: (params: any) => EnumLabelMapper.getOrderStatusLabel(params.value),
  // },
  // {
  //   headerName: '접수일시',
  //   field: 'receptionDate',
  //   cellStyle: { textAlign: 'center' },
  //   valueFormatter: (params: any) => formatDateForGrid(params.value),
  // },
  // {
  //   headerName: '거부사유명',
  //   field: 'rejectReason',
  //   cellStyle: { textAlign: 'center' },
  // },
];

/**
 * 주문 요약 테이블 컬럼 정의
 */
export const orderSummaryColumns: ColDef[] = [
  {
    headerName: '통화',
    field: 'tradeCurrencyCd',
    width: 140,
    cellStyle: { textAlign: 'center', fontWeight: 'bold' },
    headerClass: 'summary-header',
    rowDrag: false,
  },
  {
    headerName: '매수',
    headerClass: 'buy-header',
    children: [
      {
        headerName: '매입수량',
        field: 'longExecutionQuantity',
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
        width: 150,
        valueFormatter: (params: any) =>
          formatNumber(params.value, 'ko-KR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        headerName: '매입금액',
        field: 'longExecutionPrice',
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
        width: 200,
        valueFormatter: (params: any) =>
          formatNumber(params.value, 'ko-KR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        headerName: '청산수량',
        field: 'reShortExecutionQuantity',
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
        width: 150,
        valueFormatter: (params: any) =>
          formatNumber(params.value, 'ko-KR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        headerName: '청산금액',
        field: 'reShortExecutionPrice',
        cellStyle: { textAlign: 'right' },
        headerClass: 'buy-header',
        width: 200,
        valueFormatter: (params: any) =>
          formatNumber(params.value, 'ko-KR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
    ],
  } as any,
  {
    headerName: '매도',
    headerClass: 'sell-header',
    children: [
      {
        headerName: '매입수량',
        field: 'shortExecutionQuantity',
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
        valueFormatter: (params: any) =>
          formatNumber(params.value, 'ko-KR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        headerName: '매입금액',
        field: 'shortExecutionPrice',
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
        valueFormatter: (params: any) =>
          formatNumber(params.value, 'ko-KR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        headerName: '청산수량',
        field: 'reLongExecutionQuantity',
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
        valueFormatter: (params: any) =>
          formatNumber(params.value, 'ko-KR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        headerName: '청산금액',
        field: 'reLongExecutionPrice',
        cellStyle: { textAlign: 'right' },
        headerClass: 'sell-header',
        valueFormatter: (params: any) =>
          formatNumber(params.value, 'ko-KR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
    ],
  } as any,
];

/**
 * 거래내역 청산손익 요약 테이블 컬럼 정의
 */
export const profitAndLossSummaryColumns: ColDef[] = [
  {
    headerName: '구분',
    field: 'type',
    width: 120,
    cellStyle: (params: any) => {
      return {
        backgroundColor:
          params.value === POSITION_CODE_ENUM.LONG ? 'var(--table-bg-red)' : 'var(--table-bg-blue)',
      };
    },
  },
  {
    headerName: '매입금액($)',
    field: 'acquisitionPrice',
    cellStyle: { textAlign: 'right' },
    width: 120,
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    headerName: '청산금액($)',
    field: 'liquidationPrice',
    cellStyle: { textAlign: 'right' },
    width: 120,
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    headerName: '청산손익($)',
    field: 'liquidationProfitLoss',
    width: 120,
    cellStyle: (params: any) => {
      return getProfitLossStyle(params.value, 'right');
    },
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    headerName: '수익률(%)',
    field: 'liquidationProfitPercent',
    width: 120,
    cellStyle: (params: any) => {
      return getProfitLossStyle(params.value, 'right');
    },
    valueFormatter: (params: any) => {
      const formatted = padDecimalPlaces(params.value, 2);
      return params.value > 0 ? `+${formatted}` : formatted;
    },
  },
  {
    headerName: '수수료($)',
    field: 'executionCharge',
    cellStyle: { textAlign: 'right' },
    width: 120,
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    headerName: '스왑($)',
    field: 'swapCharge',
    cellStyle: { textAlign: 'right' },
    width: 120,
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    headerName: '순손익($)',
    field: 'liquidationNetProfitLoss',
    cellStyle: (params: any) => {
      return getProfitLossStyle(params.value, 'right');
    },
    width: 120,
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    headerName: '순수익률(%)',
    field: 'liquidationNetProfitPercent',
    width: 120,
    cellStyle: (params: any) => {
      return getProfitLossStyle(params.value, 'right');
    },
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
];

/**
 * 거래내역 청산손익 상세 테이블 컬럼 정의
 */
export const profitAndLossDetailColumns: ColDef[] = [
  {
    headerName: '청산일자',
    field: 'closeOutDate',
    width: 120,
    cellStyle: { textAlign: 'center' },
    valueFormatter: (params: any) => formatDateForGrid(params.value),
  },
  {
    headerName: '종목코드',
    field: 'symbolCd',
    width: 100,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '구분',
    field: 'orderCd',
    width: 100,
    cellStyle: { textAlign: 'center' },
    valueFormatter: (params: any) => EnumLabelMapper.getOrderCodeLabel(params.value),
  },
  {
    headerName: '매입가격',
    field: 'purchasePrice',
    width: 240,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => {
      const metadata = metadataStore.getMetadata(params.data.stockCd);
      return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
    },
  },
  {
    headerName: '청산가격',
    field: 'closeOutPrice',
    width: 240,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => {
      const metadata = metadataStore.getMetadata(params.data.stockCd);
      return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
    },
  },
  {
    headerName: '청산수량',
    field: 'closeOutQuantity',
    width: 90,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    headerName: '청산손익($)',
    field: 'closeOutProfitLoss',
    width: 240,
    cellStyle: (params: any) => {
      return getProfitLossStyle(params.value, 'right');
    },
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    headerName: '스왑수수료($)',
    field: 'swapCharge',
    width: 240,
    cellStyle: (params: any) => {
      return getProfitLossStyle(params.value, 'right');
    },
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    headerName: '체결수수료($)',
    field: 'tradeCharge',
    width: 240,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    headerName: '청산순손익($)',
    field: 'closeOutNetProfitLoss',
    width: 240,
    cellStyle: (params: any) => {
      return getProfitLossStyle(params.value, 'right');
    },
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  // {
  //   headerName: '매입일시',
  //   field: 'purchaseDateTime',
  //   width: 120,
  // },
  // {
  //   headerName: '청산일시',
  //   field: 'liquidationDateTime',
  //   width: 120,
  // },
];

/**
 * 거래내역 결제내역 상세 테이블 컬럼 정의
 */
export const paymentDetailColumns: ColDef[] = [
  {
    headerName: '결제일자',
    field: 'paymentDate',
    width: 140,
    cellStyle: { textAlign: 'center' },
    valueFormatter: (params: any) => formatDateForGrid(params.value),
  },
  {
    headerName: '종목코드',
    field: 'symbolCd',
    width: 120,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '적요명',
    field: 'description',
    width: 160,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '통화',
    field: 'tradeCurrencyCd',
    width: 80,
    cellStyle: { textAlign: 'center' },
  },
  {
    headerName: '구분',
    field: 'positionCd',
    width: 85,
    cellStyle: { textAlign: 'center' },
    cellRenderer: (params: any) => {
      const container = document.createElement('div');
      const vnode = h(BaseChip, {
        variant: params.value === POSITION_CODE_ENUM.LONG ? 'red' : 'blue',
        size: 'sm',
        label: EnumLabelMapper.getPositionCodeShort(params.value),
      });
      render(vnode, container);
      return container;
    },
  },
  {
    headerName: '유형',
    field: 'tradeCd',
    width: 140,
    cellStyle: { textAlign: 'center' },
    valueFormatter: (params: any) => EnumLabelMapper.getTradeCodeLabel(params.value),
  },
  {
    headerName: '체결수량',
    field: 'executionQuantity',
    width: 100,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => padDecimalPlaces(params.value, 2),
  },
  {
    headerName: '체결가격',
    field: 'executionPrice',
    width: 175,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => {
      const metadata = metadataStore.getMetadata(params.data.symbolCd);
      return padDecimalPlaces(params.value, getDecimalPlaces(metadata?.pointUnit || 0));
    },
  },
  {
    headerName: '체결금액',
    field: 'executionAmount',
    width: 175,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) => formatNumber(params.value),
  },
  {
    headerName: '결제금액($)',
    field: 'paymentAmount',
    width: 175,
    cellStyle: { textAlign: 'right' },
    valueFormatter: (params: any) =>
      formatNumber(params.value, 'ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
  },
  {
    headerName: '잔고수량',
    children: [
      {
        headerName: '이전',
        field: 'beforeBookQuantity',
        width: 100,
        cellStyle: { textAlign: 'right', backgroundColor: 'var(--table-type1-body-bg-row)' },
        valueFormatter: (params: any) => padDecimalPlaces(params.value, 2),
      },
      {
        headerName: '이후',
        field: 'afterBookQuantity',
        width: 100,
        cellStyle: { textAlign: 'right' },
        valueFormatter: (params: any) => padDecimalPlaces(params.value, 2),
      },
    ],
  } as any,
  {
    headerName: '예수금($)',
    children: [
      {
        headerName: '이전',
        field: 'beforeDeposit',
        width: 140,
        cellStyle: { textAlign: 'right', backgroundColor: 'var(--table-type1-body-bg-row)' },
        valueFormatter: (params: any) =>
          formatNumber(params.value, 'ko-KR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
      {
        headerName: '이후',
        field: 'afterDeposit',
        width: 140,
        cellStyle: { textAlign: 'right' },
        valueFormatter: (params: any) =>
          formatNumber(params.value, 'ko-KR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
    ],
  } as any,
];
