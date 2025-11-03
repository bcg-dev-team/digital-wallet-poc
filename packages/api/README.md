# @template/api

API 통신 라이브러리로, OpenAPI Generator를 사용하여 자동 생성된 API 클라이언트와 기존 서비스 클래스를 통합합니다.

## 주요 기능

- **자동 생성 API 클라이언트**: OpenAPI Generator를 사용하여 Swagger JSON에서 TypeScript 클라이언트 자동 생성
- **기존 Axios 인스턴스 통합**: 프로젝트의 기존 Axios 설정과 완벽 통합
- **Tree Shaking 지원**: 사용하지 않는 API 메서드는 번들에서 제외
- **타입 안전성**: 완전한 TypeScript 타입 지원

## 설치

```bash
pnpm add @template/api
```

## 사용법

### 1. 기본 설정

```typescript
import { createAxiosInstance } from '@template/api';
import { createGeneratedAuthService } from '@template/api';

// Axios 인스턴스 생성
const axiosInstance = createAxiosInstance(
  () => localStorage.getItem('token'), // 토큰 리졸버
  (error) => console.error('API Error:', error), // 에러 핸들러
  'https://api.example.com' // 베이스 URL
);

// 생성된 API 서비스 생성
const authService = createGeneratedAuthService(axiosInstance);
```

### 2. 인증 API 사용 (도메인별 통합 타입)

```typescript
// 도메인별로 통합된 타입 import
import { 
  AuthLoginRequest,
  ResponseDataAuthLoginResponse 
} from '@template/api'; // auth.types.ts에서 자동 export

// 로그인
const loginRequest: AuthLoginRequest = {
  email: { value: 'user@example.com' },
  password: 'password123'
};

const loginResponse = await authService.loginForApp(loginRequest);
console.log('로그인 성공:', loginResponse);
```

### 3. Tree Shaking을 위한 개별 import

```typescript
// 도메인별 타입만 import (Tree shaking 지원)
import { 
  AuthLoginRequest,           // auth.types.ts에서
  MemberApproveRequest,       // member.types.ts에서
  AccountCreateRequest        // account.types.ts에서
} from '@template/api';

// 필요한 서비스만 import
import { 
  createGeneratedAuthService,
  createGeneratedMemberService 
} from '@template/api';
```

## API 생성

### Swagger JSON 업데이트 후

```bash
# API 클라이언트 재생성
pnpm run generate:api

# 또는 API 패키지에서 직접 실행
cd packages/api
pnpm run generate:api
```

### 빌드 시 자동 생성

```bash
# 빌드 시 자동으로 API 클라이언트 생성
pnpm run build
```

## 생성된 API 구조

```
packages/api/src/
├── generated/              # OpenAPI Generator로 생성된 코드 (raw)
│   ├── apis/              # API 클라이언트들
│   │   ├── auth-api.ts
│   │   ├── member-api.ts
│   │   ├── account-api.ts
│   │   └── ... (9개 API)
│   ├── models/            # 개별 타입 정의들 (85개 파일)
│   ├── configuration.ts
│   ├── base.ts
│   └── common.ts
├── generated-types/       # 도메인별 통합 타입 (기존 패턴 준수)
│   ├── auth.types.ts      # 인증 관련 타입 (6개 통합)
│   ├── member.types.ts    # 회원 관련 타입 (12개 통합)
│   ├── account.types.ts   # 계좌 관련 타입 (9개 통합)
│   ├── trade.types.ts     # 거래 관련 타입 (14개 통합)
│   ├── stock.types.ts     # 종목 관련 타입 (12개 통합)
│   ├── asset.types.ts     # 자산 관련 타입 (10개 통합)
│   ├── terms.types.ts     # 약관 관련 타입 (6개 통합)
│   ├── watch-list.types.ts # 관심종목 관련 타입 (4개 통합)
│   └── common.types.ts    # 공통 타입 (7개 통합)
├── services/              # 서비스 래퍼
│   ├── generated-auth.service.ts
│   ├── generated-member.service.ts
│   └── ... (기존 서비스)
└── generated-api.ts       # Tree shaking을 위한 통합 export
```

## 최적화 전략

### 1. Tree Shaking

- 각 API 메서드를 개별 export하여 사용하지 않는 코드 제거
- 번들 크기 최적화로 성능 향상

### 2. 기존 인프라 활용

- 기존 Axios 인스턴스와 완벽 통합
- 토큰 관리, 에러 핸들링 등 기존 로직 재사용

### 3. 타입 안전성

- OpenAPI 스펙에서 자동 생성된 완전한 타입 지원
- 컴파일 타임 에러 검출

## 개발 가이드

### 새로운 API 추가

1. `swagger.json` 업데이트
2. `pnpm run generate:api` 실행
3. 필요시 `generated-api.ts`에 export 추가
4. 새로운 서비스 클래스 생성 (선택사항)

### 커스터마이징

- `openapi-generator-config.yaml`에서 생성 옵션 조정
- `openapi-templates/`에서 템플릿 커스터마이징 가능

## 문제 해결

### Java 설치 필요

OpenAPI Generator는 Java가 필요합니다:

```bash
# macOS
brew install openjdk@17

# 환경변수 설정
export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"
```

### 빌드 에러

```bash
# 캐시 정리
pnpm run clean

# API 재생성
pnpm run generate:api

# 다시 빌드
pnpm run build
```

## 라이선스

MIT