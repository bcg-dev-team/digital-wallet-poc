# 🔄 Swagger API 변경사항 분석 리포트

**분석 기간**: 1f78a590 → c24d51df  
**생성 시간**: 2025-10-15T09:10:31.180Z

## 📊 변경사항 요약

- **추가된 API**: 9개
- **제거된 API**: 2개  
- **변경된 API**: 2개
- **변경없는 API**: 32개

## ➕ 추가된 API (9개)

| Operation ID | Method | Path | Summary | Tags |
|-------------|--------|------|---------|------|
| `createNewOrder` | POST | `/orders` | 신규주문 | Order |
| `createLiquidationOrder` | POST | `/orders/liquidation` | 청산주문 | Order |
| `getTradeLiquidationOrderHistory` | GET | `/trades/liquidation/history` | 청산 내역 조회 | Trade |
| `getTradeHistory` | GET | `/trades/history` | 주문내역 조회 | Trade |
| `getCloseOutHistory` | GET | `/trades/close-out/profit-loss` | 청산손익 조회 | Trade |
| `getTickChart` | GET | `/quotes/tick-chart/{stockCd}/history` | 틱 차트 데이터 조회 | Quote |
| `getCandleChart` | GET | `/quotes/candle-chart/{stockCd}/history` | 캔들 차트 데이터 조회 | Quote |
| `getPendingOrderHistory` | GET | `/execution/pending/history` | 미체결 내역 조회 | Execution |
| `getOrderExecutionHistory` | GET | `/execution/history` | 주문 체결 내역 조회 | Execution |

## ➖ 제거된 API (2개)

| Operation ID | Method | Path | Summary | Tags |
|-------------|--------|------|---------|------|
| `getTradeOrdersHistory` | GET | `/trades` | 주문 체결 내역 조회 | Trade |
| `getLiquidationHistory` | GET | `/trades/liquidation/profit-loss` | 청산손익 조회 | Trade |

## 🔄 변경된 API (2개)

### `getOrderBook`

- **path**: `/quote/{stockCode}/order-book` → `/quotes/{stockCd}/order-book`
- **parameters**: `stockCode(path)` → `stockCd(path)`

### `getPaymentHistory`

- **path**: `/trades/payments` → `/payments/history`
- **tags**: `Trade` → `Payment`

## 🏷️ 태그 변경사항

### ➕ 추가된 태그
- `Execution`
- `Order`
- `Payment`

## 📋 스키마 변경사항

### ➕ 추가된 스키마
- `OrderNewRequest`
- `OrderNewResponse`
- `ResponseDataOrderNewResponse`
- `OrderLiquidationRequest`
- `OrderLiquidationResponse`
- `ResponseDataOrderLiquidationResponse`
- `CloseOutOrderHistoryRequest`
- `CloseOutOrderHistoryResponse`
- `DetailsCloseOutOrder`
- `ResponseDataCloseOutOrderHistoryResponse`
- `TradeHistoryRequest`
- `ResponseDataTradeHistoryResponse`
- `TradeHistoryResponse`
- `CloseOutHistoryRequest`
- `CloseOutDetail`
- `CloseOutHistoryResponse`
- `CloseOutSummary`
- `ResponseDataCloseOutHistoryResponse`
- `ResponseDataResponseListTickChartResponse`
- `ResponseListTickChartResponse`
- `TickChartResponse`
- `CandleChartResponse`
- `ResponseDataResponseListCandleChartResponse`
- `ResponseListCandleChartResponse`
- `TradeUnExecutionHistoryRequest`
- `DetailsPendingOrder`
- `ResponseDataTradeUnExecutionHistoryResponse`
- `TradeUnExecutionHistoryResponse`

### ➖ 제거된 스키마
- `LiquidationHistoryRequest`
- `LiquidationDetail`
- `LiquidationHistoryResponse`
- `LiquidationSummary`
- `ResponseDataLiquidationHistoryResponse`

## 🔗 API 매핑 테이블

| 기존 API | 변경된 API | 변경 내용 |
|---------|-----------|----------|
| `getOrderBook` | `getOrderBook` | path: /quote/{stockCode}/order-book → /quotes/{stockCd}/order-book, parameters: stockCode(path) → stockCd(path) |
| `getPaymentHistory` | `getPaymentHistory` | path: /trades/payments → /payments/history, tags: Trade → Payment |

## ❌ 제거된 API 목록

| Operation ID | Method | Path | Summary |
|-------------|--------|------|---------|
| `getTradeOrdersHistory` | GET | `/trades` | 주문 체결 내역 조회 |
| `getLiquidationHistory` | GET | `/trades/liquidation/profit-loss` | 청산손익 조회 |

---
*이 리포트는 `scripts/analyze-swagger-changes.mjs` 스크립트로 자동 생성되었습니다.*
