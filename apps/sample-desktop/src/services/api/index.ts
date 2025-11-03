import {
  AuthService,
  AccountService,
  MemberService,
  TradeService,
  StockService,
  TermsService,
  WatchListService,
  PaymentService,
  ExecutionService,
  OrderService,
  QuoteService,
  AssetService,
} from '@template/api';
import api from '@/modules/axios';

// Generated API 서비스 인스턴스
export const authService = new AuthService(api);
export const accountService = new AccountService(api);
export const memberService = new MemberService(api);
export const tradeService = new TradeService(api);
export const executionService = new ExecutionService(api);
export const stockService = new StockService(api);
export const termsService = new TermsService(api);
export const watchlistService = new WatchListService(api);
export const paymentService = new PaymentService(api);
export const orderService = new OrderService(api);
export const quoteService = new QuoteService(api);
export const assetService = new AssetService(api);
