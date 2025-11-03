# 📦 패키지 관리 가이드

Vue 3 모노레포에서 패키지 추가, 수정, 삭제 및 의존성 관리에 대한 완전한 가이드입니다.

## 🎯 개요

이 가이드는 TypeScript composition 설정이 최적화된 모노레포 환경에서 패키지를 안전하고 효율적으로 관리하는 방법을 설명합니다.

## 📋 목차

1. [패키지 추가하기](#-패키지-추가하기)
2. [패키지 수정하기](#-패키지-수정하기)
3. [패키지 삭제하기](#-패키지-삭제하기)
4. [의존성 관리](#-의존성-관리)
5. [TypeScript 설정 관리](#-typescript-설정-관리)
6. [빌드 및 테스트](#-빌드-및-테스트)
7. [문제 해결](#-문제-해결)

## 📦 기존 패키지 정보

### **패키지별 역할**

| 패키지명 | 역할 | 주요 기능 |
|----------|------|-----------|
| `@template/types` | 타입 정의 | API 응답 타입, 컴포넌트 Props 타입 |
| `@template/utils` | 유틸리티 함수 | 날짜 포맷팅, 검증 로직, 암호화 |
| `@template/api` | API 통신 | HTTP 클라이언트, API 서비스 |
| `@template/mocks` | API 모킹 | MSW 핸들러, 모킹 데이터 |
| `@template/theme` | 디자인 시스템 | 색상, 폰트, 간격 토큰 |
| `@template/ui` | UI 컴포넌트 | 버튼, 입력 필드, 테이블 |

### **mocks 패키지 특별 사항**

`@template/mocks` 패키지는 MSW(Mock Service Worker) 기반의 API 모킹을 담당합니다:

```json
// packages/mocks/package.json
{
  "name": "@template/mocks",
  "dependencies": {
    "msw": "^2.10.5"
  },
  "peerDependencies": {
    "@template/types": "workspace:*"
  },
  "msw": {
    "workerDirectory": ["public"]
  }
}
```

**특별한 설정:**
- MSW 워커 디렉토리 설정 필요
- `@template/types`와의 peer dependency 관계
- 브라우저와 Node.js 환경 모두 지원

## ➕ 패키지 추가하기

### 1. **새 패키지 생성**

#### **1.1 디렉토리 구조 생성**
```bash
# packages/ 새패키지명 디렉토리 생성
mkdir packages/새패키지명
cd packages/새패키지명

# 기본 디렉토리 구조 생성
mkdir src
mkdir src/__tests__
mkdir dist
```

#### **1.2 package.json 생성**
```json
{
  "name": "@template/새패키지명",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "dev": "tsc -p tsconfig.json --watch",
    "test": "vitest",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    // 필요한 의존성 추가
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

#### **1.3 TypeScript 설정 파일 생성**

**tsconfig.json (개발용)**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "dist",
    "node_modules"
  ],
  "references": [
    { "path": "../types" }
  ]
}
```

**tsconfig.build.json (빌드용)**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmit": false,
    "composite": false,
    "incremental": false
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "dist",
    "node_modules",
    "src/**/*.test.ts",
    "src/**/*.spec.ts",
    "src/__tests__/**/*"
  ]
}
```

#### **1.4 기본 소스 파일 생성**

**src/index.ts**
```typescript
// 패키지의 메인 진입점
export * from './types'
export * from './utils'
// ... 다른 모듈들
```

**src/types.ts**
```typescript
// 패키지별 타입 정의
export interface PackageConfig {
  // 타입 정의
}
```

### 2. **루트 설정 업데이트**

#### **2.1 pnpm-workspace.yaml 업데이트**
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
  # 새 패키지가 자동으로 포함됨
```

#### **2.2 tsconfig.base.json 업데이트**
```json
{
  "compilerOptions": {
    "paths": {
      "@template/새패키지명": ["packages/새패키지명/dist"],
      "@template/새패키지명/*": ["packages/새패키지명/dist/*"]
    }
  }
}
```

### 3. **의존성 패키지에 참조 추가**

#### **3.1 앱에서 새 패키지 사용**
```json
// apps/desktop/tsconfig.json
{
  "references": [
    { "path": "../../packages/types" },
    { "path": "../../packages/utils" },
    { "path": "../../packages/api" },
    { "path": "../../packages/ui" },
    { "path": "../../packages/새패키지명" }  // 새 패키지 추가
  ]
}
```

#### **3.2 다른 패키지에서 새 패키지 사용**
```json
// packages/다른패키지/tsconfig.json
{
  "references": [
    { "path": "../types" },
    { "path": "../새패키지명" }  // 새 패키지 추가
  ]
}
```

### 4. **빌드 및 테스트**

```bash
# 의존성 설치
pnpm install

# 새 패키지 빌드
pnpm --filter @template/새패키지명 build

# 전체 빌드 테스트
pnpm build
```

## ✏️ 패키지 수정하기

### 1. **소스 코드 수정**

#### **1.1 타입 정의 수정**
```typescript
// packages/패키지명/src/types.ts
export interface UpdatedInterface {
  // 기존 필드
  id: string
  name: string
  
  // 새 필드 추가
  description?: string
  createdAt: Date
}
```

#### **1.2 함수 수정**
```typescript
// packages/패키지명/src/utils.ts
export function updatedFunction(param: string): string {
  // 기존 로직
  const result = processParam(param)
  
  // 새 로직 추가
  const enhanced = enhanceResult(result)
  
  return enhanced
}
```

### 2. **의존성 추가/제거**

#### **2.1 의존성 추가**
```bash
# 패키지에 의존성 추가
pnpm --filter @template/패키지명 add 라이브러리명

# 개발 의존성 추가
pnpm --filter @template/패키지명 add -D 라이브러리명
```

#### **2.2 의존성 제거**
```bash
# 패키지에서 의존성 제거
pnpm --filter @template/패키지명 remove 라이브러리명
```

### 3. **TypeScript 설정 수정**

#### **3.1 개발용 설정 수정**
```json
// packages/패키지명/tsconfig.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "jsx": "preserve",  // 새 설정 추가
    "baseUrl": "./src"  // 새 설정 추가
  }
}
```

#### **3.2 빌드용 설정 수정**
```json
// packages/패키지명/tsconfig.build.json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmit": false,
    "composite": false,
    "incremental": false,
    "emitDeclarationOnly": true  // 새 설정 추가
  }
}
```

## 🗑️ 패키지 삭제하기

### 1. **의존성 제거**

#### **1.1 다른 패키지에서 참조 제거**
```json
// packages/다른패키지/tsconfig.json
{
  "references": [
    { "path": "../types" }
    // { "path": "../삭제할패키지" } 제거
  ]
}
```

#### **1.2 앱에서 참조 제거**
```json
// apps/desktop/tsconfig.json
{
  "references": [
    { "path": "../../packages/types" },
    { "path": "../../packages/utils" },
    { "path": "../../packages/api" },
    { "path": "../../packages/ui" }
    // { "path": "../../packages/삭제할패키지" } 제거
  ]
}
```

### 2. **루트 설정에서 제거**

#### **2.1 tsconfig.base.json에서 path 제거**
```json
{
  "compilerOptions": {
    "paths": {
      "@template/types": ["packages/types/dist"],
      "@template/types/*": ["packages/types/dist/*"],
      "@template/utils": ["packages/utils/dist"],
      "@template/utils/*": ["packages/utils/dist/*"]
      // 삭제할 패키지 path 제거
    }
  }
}
```

### 3. **패키지 디렉토리 삭제**

```bash
# 패키지 디렉토리 삭제
rm -rf packages/삭제할패키지

# 의존성 정리
pnpm install
```

## 🔗 의존성 관리

### 1. **의존성 추가 규칙**

#### **1.1 패키지별 의존성 추가**
```bash
# 특정 패키지에 의존성 추가
pnpm --filter @template/패키지명 add 라이브러리명

# 개발 의존성 추가
pnpm --filter @template/패키지명 add -D 라이브러리명

# 루트에 공통 의존성 추가
pnpm add -w 라이브러리명
```

#### **1.2 의존성 버전 관리**
```json
// package.json
{
  "dependencies": {
    "라이브러리명": "^1.0.0"  // ^ 사용으로 호환 버전 허용
  },
  "devDependencies": {
    "개발라이브러리명": "~1.0.0"  // ~ 사용으로 패치 버전만 허용
  }
}
```

### 2. **의존성 업데이트**

#### **2.1 특정 패키지 업데이트**
```bash
# 특정 패키지의 의존성 업데이트
pnpm --filter @template/패키지명 update 라이브러리명

# 모든 패키지의 의존성 업데이트
pnpm update --recursive
```

#### **2.2 보안 업데이트**
```bash
# 보안 취약점 검사
pnpm audit

# 보안 업데이트 적용
pnpm audit --fix
```

### 3. **의존성 최적화**

#### **3.1 중복 의존성 제거**
```bash
# 중복 의존성 검사
pnpm list --depth=0

# 중복 제거
pnpm dedupe
```

#### **3.2 불필요한 의존성 제거**
```bash
# 사용하지 않는 의존성 검사
pnpm list --depth=0 --json | jq '.dependencies | keys'

# 수동으로 제거
pnpm --filter @template/패키지명 remove 사용하지않는라이브러리
```

## ⚙️ TypeScript 설정 관리

### 1. **개발용 vs 빌드용 설정**

#### **1.1 개발용 설정 (tsconfig.json)**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
    // composite: true (상속됨)
    // incremental: true (상속됨)
  },
  "references": [
    { "path": "../types" }
  ]
}
```

#### **1.2 빌드용 설정 (tsconfig.build.json)**
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "noEmit": false,
    "composite": false,    // 빌드 안정성을 위해 false
    "incremental": false   // 빌드 안정성을 위해 false
  }
}
```

### 2. **프로젝트 참조 관리**

#### **2.1 참조 추가**
```json
{
  "references": [
    { "path": "../types" },
    { "path": "../utils" },
    { "path": "../api" }
  ]
}
```

#### **2.2 참조 제거**
```json
{
  "references": [
    { "path": "../types" }
    // 불필요한 참조 제거
  ]
}
```

### 3. **Path Mapping 관리**

#### **3.1 tsconfig.base.json에서 관리**
```json
{
  "compilerOptions": {
    "paths": {
      "@template/types": ["packages/types/dist"],
      "@template/types/*": ["packages/types/dist/*"],
      "@template/utils": ["packages/utils/dist"],
      "@template/utils/*": ["packages/utils/dist/*"]
    }
  }
}
```

## 🏗️ 빌드 및 테스트

### 1. **개별 패키지 빌드**

```bash
# 특정 패키지 빌드
pnpm --filter @template/패키지명 build

# 특정 패키지 개발 모드
pnpm --filter @template/패키지명 dev

# 특정 패키지 타입 체크
pnpm --filter @template/패키지명 type-check
```

### 2. **전체 빌드**

```bash
# 모든 패키지 빌드
pnpm build

# 패키지만 빌드
pnpm run build:packages

# 앱만 빌드
pnpm run build:apps
```

### 3. **테스트 실행**

```bash
# 특정 패키지 테스트
pnpm --filter @template/패키지명 test

# 모든 패키지 테스트
pnpm test

# 테스트 커버리지
pnpm test --coverage
```

## 🔧 문제 해결

### 1. **빌드 실패 문제**

#### **1.1 빌드 산출물이 생성되지 않는 경우**
```bash
# 캐시 정리
rm -rf packages/패키지명/dist
rm -rf packages/패키지명/node_modules

# 의존성 재설치
pnpm install

# 빌드 재시도
pnpm --filter @template/패키지명 build
```

#### **1.2 TypeScript 설정 문제**
```bash
# TypeScript 설정 검증
npx tsc -p packages/패키지명/tsconfig.build.json --noEmit

# 설정 파일 문법 검사
npx tsc --showConfig -p packages/패키지명/tsconfig.build.json
```

### 2. **의존성 문제**

#### **2.1 순환 참조 문제**
```bash
# 순환 참조 검사
pnpm run check-circular-deps

# 참조 관계 확인
npx madge --circular packages/패키지명/src
```

#### **2.2 타입 오류 문제**
```bash
# 타입 체크 실행
pnpm --filter @template/패키지명 type-check

# 특정 파일 타입 체크
npx tsc --noEmit packages/패키지명/src/파일명.ts
```

### 3. **성능 문제**

#### **3.1 빌드 속도 개선**
```bash
# 증분 빌드 활성화 (개발용)
pnpm --filter @template/패키지명 dev

# 병렬 빌드
pnpm build --parallel
```

#### **3.2 메모리 사용량 최적화**
```bash
# Node.js 메모리 제한 설정
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
```

## 📋 체크리스트

### **새 패키지 추가 시**
- [ ] 디렉토리 구조 생성
- [ ] package.json 설정
- [ ] tsconfig.json 및 tsconfig.build.json 생성
- [ ] 루트 설정 업데이트 (tsconfig.base.json)
- [ ] 의존성 패키지에 참조 추가
- [ ] 빌드 테스트
- [ ] 타입 체크 통과

### **패키지 수정 시**
- [ ] 소스 코드 수정
- [ ] 의존성 업데이트 (필요시)
- [ ] TypeScript 설정 수정 (필요시)
- [ ] 빌드 테스트
- [ ] 타입 체크 통과
- [ ] 기존 기능 영향도 확인

### **패키지 삭제 시**
- [ ] 의존성 패키지에서 참조 제거
- [ ] 루트 설정에서 path 제거
- [ ] 패키지 디렉토리 삭제
- [ ] 의존성 정리
- [ ] 전체 빌드 테스트

## 🔗 관련 문서

- [아키텍처 가이드](./architecture.md)
- [순환 의존성 방지](./circular-dependency-prevention.md)
- [개발 환경 설정](./development-setup.md)

## 📝 참고 자료

- [TypeScript 프로젝트 참조](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [PNPM 워크스페이스](https://pnpm.io/workspaces)
- [Vue 3 모노레포 가이드](https://vuejs.org/guide/scaling-up/tooling.html#monorepo)
