import type { CloseOutSummary } from '@template/api';

export const initialProfitAndLossSummary: CloseOutSummary = {
  longAcquisitionPrice: 0, // LONG 취득금액($)
  longCloseOutPrice: 0, // LONG 청산금액($)
  longCloseOutProfitLoss: 0, // LONG 청산손익($)
  longCloseOutProfitPercent: 0, // LONG 청산수익율
  longSwapCharge: 0, // LONG 스왑수수료($)
  longExecutionCharge: 0, // LONG 체결수수료($)
  longCloseOutNetProfitLoss: 0, // LONG 청산순손익($)
  longCloseOutNetProfitPercent: 0, // LONG 청산순수익율
  shortAcquisitionPrice: 0, // SHORT 취득금액($)
  shortCloseOutPrice: 0, // SHORT 청산금액($)
  shortCloseOutProfitLoss: 0, // SHORT 청산손익($)
  shortCloseOutProfitPercent: 0, // SHORT 청산수익율
  shortSwapCharge: 0, // SHORT 스왑수수료($)
  shortExecutionCharge: 0, // SHORT 체결수수료($)
  shortCloseOutNetProfitLoss: 0, // SHORT 청산순손익($)
  shortCloseOutNetProfitPercent: 0, // SHORT 청산순수익율
  nextKey: '',
};
