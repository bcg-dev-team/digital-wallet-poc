# 🔄 순환참조 방지 메커니즘

## 📋 현재 의존성 구조

### **허용된 의존성 방향**

```
@template/types (기반)
    ↓
@template/utils (types만 의존)
    ↓
@template/api (types, utils 의존)
    ↓
@template/ui (types만 의존)
    ↓
apps/* (모든 패키지 사용)
```

### **금지된 의존성**

- ❌ `types` → `utils`, `api`, `ui`
- ❌ `utils` → `api`, `ui`
- ❌ `api` → `ui`
- ❌ `ui` → `api`, `utils`

## 🛡️ 순환참조 방지 장치

### **1. TypeScript Paths 매핑**

```json
// tsconfig.base.json
{
  "paths": {
    "@template/types": ["packages/types/dist"],
    "@template/utils": ["packages/utils/src"],
    "@template/api": ["packages/api/src"],
    "@template/ui": ["packages/ui/src"]
  }
}
```

### **2. Package.json 의존성 제어**

```json
// packages/api/package.json
{
  "dependencies": {
    "@template/types": "workspace:*",
    "@template/utils": "workspace:*"
  }
}

// packages/ui/package.json
{
  "dependencies": {
    "@template/types": "workspace:*"
  }
}
```

### **3. 빌드 시 External 설정**

```typescript
// packages/ui/vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['vue', '@template/types'],
    },
  },
});
```

## 🔍 순환참조 감지 방법

### **1. ESLint 규칙**

```javascript
// eslint.config.js
{
  rules: {
    'import/no-cycle': 'error',
    'import/no-self-import': 'error'
  }
}
```

### **2. TypeScript 컴파일러 체크**

```bash
# 각 패키지에서 타입 체크
pnpm -r run type-check
```

### **3. 의존성 분석 도구**

```bash
# 의존성 트리 확인
pnpm list --depth=10

# 순환참조 감지
npx madge --circular packages/
```

## 📋 개발 가이드라인

### **새로운 패키지 추가 시**

1. **의존성 방향 확인**: 상위 레이어만 의존 가능
2. **Package.json 설정**: 필요한 패키지만 dependencies에 추가
3. **TypeScript paths**: tsconfig.base.json에 경로 추가
4. **빌드 설정**: external 설정으로 순환참조 방지

### **Import 규칙**

```typescript
// ✅ 올바른 import
import type { User } from '@template/types';
import { formatDate } from '@template/utils';
import { ApiClient } from '@template/api';
import { BaseButton } from '@template/ui';

// ❌ 금지된 import (순환참조)
// packages/ui에서 packages/api import
// packages/api에서 packages/ui import
```

### **공통 타입 공유**

```typescript
// packages/types/src/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

// 다른 패키지에서 사용
import type { User } from '@template/types';
```

## 🚨 순환참조 발생 시나리오

### **시나리오 1: UI ↔ API 순환참조**

```typescript
// ❌ 잘못된 구조
// packages/ui/src/components/UserCard.vue
import { userApi } from '@template/api'; // 순환참조!

// packages/api/src/services/userService.ts
import { BaseButton } from '@template/ui'; // 순환참조!
```

**해결책**: UI 컴포넌트는 API를 직접 호출하지 않고, props/emits로 데이터를 받음

### **시나리오 2: Utils ↔ API 순환참조**

```typescript
// ❌ 잘못된 구조
// packages/utils/src/validation.ts
import { ApiClient } from '@template/api'; // 순환참조!

// packages/api/src/client/ApiClient.ts
import { validateEmail } from '@template/utils'; // 순환참조!
```

**해결책**: API 클라이언트는 utils의 순수 함수만 사용, utils는 API에 의존하지 않음

## 🔧 순환참조 해결 패턴

### **1. 인터페이스 분리**

```typescript
// packages/types/src/api.ts
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// packages/api/src/client/ApiClient.ts
import type { ApiResponse } from '@template/types';
```

### **2. 이벤트 기반 통신**

```typescript
// packages/ui/src/components/UserList.vue
const emit = defineEmits<{
  'user-selected': [user: User];
  'user-deleted': [userId: string];
}>();

// apps/desktop/src/views/UsersView.vue
<UserList
  @user-selected="handleUserSelect"
  @user-deleted="handleUserDelete"
/>
```

### **3. 의존성 주입**

```typescript
// shared/config/api.ts
export const createApiClient = (config: ApiConfig) => {
  return new ApiClient(config);
};

// apps/desktop/src/main.ts
import { createApiClient } from '@shared/config/api';
const apiClient = createApiClient({ baseURL: '/api' });
```

## 📊 의존성 체크리스트

- [ ] 새로운 패키지 추가 시 의존성 방향 확인
- [ ] Package.json dependencies 최소화
- [ ] TypeScript paths 올바르게 설정
- [ ] 빌드 시 external 설정 확인
- [ ] ESLint 순환참조 규칙 활성화
- [ ] 정기적인 의존성 분석 실행

## 🎯 베스트 프랙티스

1. **단방향 의존성**: 항상 하위에서 상위로만 의존
2. **인터페이스 우선**: 구현보다 인터페이스를 먼저 정의
3. **의존성 최소화**: 필요한 패키지만 의존
4. **정기 점검**: 빌드 시 순환참조 자동 감지
5. **문서화**: 의존성 구조를 명확히 문서화
