# 🔄 Swagger API 변경사항 분석 리포트

**분석 기간**: HEAD~1 → HEAD  
**생성 시간**: 2025-10-31T04:29:50.612Z

## 📊 변경사항 요약

- **추가된 API**: 2개
- **제거된 API**: 0개  
- **변경된 API**: 1개
- **변경없는 API**: 50개

## ➕ 추가된 API (2개)

| Operation ID | Method | Path | Summary | Tags |
|-------------|--------|------|---------|------|
| `requestWithdrawal` | POST | `/accounts/withdrawal` | 출금신청 | Account |
| `requestDeposit` | POST | `/accounts/deposit` | 입금신청 | Account |

## 🔄 변경된 API (1개)

### `getDepositsWithdrawalsInfo`

- **method**: `POST` → `GET`
- **parameters**: `` → `request(query)`

## 📋 스키마 변경사항

### ➕ 추가된 스키마
- `CustomProblemDetail`
- `WithdrawalRequest`
- `ResponseDataUnit`
- `Unit`
- `DepositRequest`

## 🔗 API 매핑 테이블

| 기존 API | 변경된 API | 변경 내용 |
|---------|-----------|----------|
| `getDepositsWithdrawalsInfo` | `getDepositsWithdrawalsInfo` | method: POST → GET, parameters:  → request(query) |

---
*이 리포트는 `scripts/analyze-swagger-changes.mjs` 스크립트로 자동 생성되었습니다.*
