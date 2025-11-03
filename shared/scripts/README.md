# shared/scripts

모노레포 빌드 및 유틸리티 스크립트들을 관리하는 디렉토리입니다.

## 📁 파일 구조

```
shared/scripts/
├── build-order.ts        # 빌드 순서 관리
├── optimize-icons.ts     # 아이콘 최적화
├── setup.ts             # 프로젝트 설정
├── tsconfig.json        # 스크립트용 TypeScript 설정
└── tsconfig.tsbuildinfo # TypeScript 빌드 정보
```

## 🔧 주요 스크립트

### build-order.ts

모노레포 패키지들의 빌드 순서를 관리하는 스크립트입니다.

#### 빌드 모드

**인터랙티브 빌드 (권장)**
```bash
# --interactive 또는 -i 플래그 사용
pnpm build         # package.json에 --interactive 포함됨
tsx shared/scripts/build-order.ts --interactive
```

**기본 빌드 (CI/CD용)**
```bash
# 모든 작업을 자동으로 수행
pnpm build:all     # package.json에 정의됨
tsx shared/scripts/build-order.ts
```

#### 인터랙티브 빌드 옵션

`pnpm build` 실행 시 다음 항목들을 선택적으로 수행할 수 있습니다:

##### 1. API 자동 생성 스킵 여부 (기본: Y)
```
API 자동 생성을 스킵하시겠습니까? (Y/n):
```
- **Y (스킵)**: OpenAPI Generator를 실행하지 않음
- **N (실행)**: `pnpm run generate:api` 실행
  - Swagger JSON에서 타입 및 서비스 자동 생성
  - **주의**: Java 17+ 필요 ([설치 가이드](../../docs/api-generation-guide.md))
- **권장**: 일반 개발 시에는 스킵, API 스펙 변경 시에만 실행

##### 2. Design Tokens 생성 스킹 여부 (기본: Y)
```
Design Tokens 생성을 스킵하시겠습니까? (Y/n):
```
- **Y (스킵)**: 토큰 생성 없이 TypeScript만 빌드
  - 조건: `packages/theme/src/tokens/tokens.json` 파일이 이미 존재
  - 없으면 자동으로 전체 빌드 수행 (경고 메시지 출력)
- **N (실행)**: style-dictionary로 토큰 전체 생성
  - Figma에서 추출한 디자인 토큰을 CSS/TS로 변환
- **권장**: 일반 빌드 시에는 스킵, 디자인 토큰 변경 시에만 실행

##### 3. 아이콘 최적화 스킵 여부 (기본: Y)
```
아이콘 최적화를 스킵하시겠습니까? (Y/n):
```
- **Y (스킵)**: SVG 아이콘 최적화를 실행하지 않음
- **N (실행)**: `pnpm run optimize-icons` 실행
  - SVGO를 사용하여 SVG 파일 크기 최적화
  - `packages/ui/src/assets/icons` 폴더의 아이콘 처리
- **권장**: 일반 빌드 시에는 스킵, 새 아이콘 추가 시에만 실행
- **참고**: 실패해도 빌드는 계속 진행됨 (경고만 출력)

##### 4. 순환참조 검사 스킵 여부 (기본: Y)
```
순환참조 검사를 스킵하시겠습니까? (Y/n):
```
- **Y (스킵)**: 순환 의존성 검사를 실행하지 않음
- **N (실행)**: 패키지 간 순환 의존성 검사
  - 순환 의존성 발견 시 빌드 중단
- **권장**: 일반 빌드 시에는 스킵, 패키지 구조 변경 시에만 실행

##### 5. 빌드할 앱 선택 (기본: sample-desktop만)
```
어떤 앱을 빌드하시겠습니까?
> 1. sample-desktop만 (기본)
  2. sample-desktop + mobile
  3. sample-desktop + mobile + desktop
  4. 모든 앱 (sample-desktop + mobile + desktop)
```
- **1 (sample-desktop만)**: 가장 빠른 빌드, 일반 개발용
- **2 (sample-desktop + mobile)**: 모바일 웹 앱 포함
- **3 (sample-all)**: 데스크톱 앱까지 포함
- **4 (all)**: 모든 웹 앱 빌드 (CI/CD용)
- **참고**: `mobile-native` 앱은 별도 빌드 필요
  - Android: `pnpm mobile:build:android`
  - iOS: `pnpm mobile:build:ios`

#### 사용 팁

**키보드 단축키**
- `y` 또는 `n` 키: Enter 없이 바로 진행
- `숫자` 키 (1-4): 앱 선택 시 Enter 없이 바로 진행
- `Enter` 키: 기본값 선택
- `Ctrl+C`: 빌드 중단

**빌드 시나리오별 권장 설정**

| 시나리오 | API | Tokens | Icons | 순환참조 | 앱 선택 |
|---------|:---:|:------:|:-----:|:-------:|:-------:|
| 일반 개발 | Y | Y | Y | Y | 1 (sample-desktop) |
| 디자인 변경 | Y | N | N | Y | 1 |
| API 스펙 변경 | N | Y | Y | Y | 1 |
| 아이콘 추가 | Y | Y | N | Y | 1 |
| 패키지 구조 변경 | Y | Y | Y | N | 1 |
| 전체 테스트 | Y | Y | Y | Y | 4 (all) |
| CI/CD | N | N | N | N | 4 (all) |

#### 빌드 순서

의존성에 따라 다음 순서로 빌드됩니다:

```typescript
// 빌드 순서 정의
const packages = [
  'packages/types',        // 1. 타입 정의 (가장 먼저)
  'packages/theme',        // 2. 디자인 토큰 (types 의존)
  'packages/utils',        // 3. 유틸리티 (types 의존)
  'packages/mocks',        // 4. API 모킹 (types 의존)
  'packages/api',          // 5. API 클라이언트 (types, utils 의존)
  'packages/ui',           // 6. UI 컴포넌트 (types, theme 의존)
  'apps/desktop',          // 7. 데스크톱 앱
  'apps/mobile',           // 8. 모바일 앱
  'apps/sample-desktop',   // 9. 샘플 데스크톱 앱
]

// 순환 의존성 검사
const hasCircularDependency = checkCircularDependencies(packages)
if (hasCircularDependency) {
  console.error('순환 의존성이 발견되었습니다!')
  process.exit(1)
}
```

### optimize-icons.ts

SVG 아이콘들을 최적화하는 스크립트입니다.

```typescript
import { optimizeIcons } from './optimize-icons'

// 아이콘 최적화 실행
optimizeIcons({
  inputDir: 'packages/ui/src/assets/icons',
  outputDir: 'packages/ui/src/assets/icons/optimized',
  options: {
    removeViewBox: false,
    removeTitle: true,
    removeDesc: true,
    removeEmptyAttrs: true,
    removeEmptyText: true,
    removeEmptyContainers: true,
    removeHiddenElems: true,
    removeEmptyLines: true,
    removeComments: true
  }
})
```

### setup.ts

프로젝트 초기 설정을 담당하는 스크립트입니다.

```typescript
import { setup } from './setup'

// 프로젝트 설정 실행
setup({
  // Git 설정
  git: {
    ignoreCase: false,
    hooks: true
  },
  
  // 의존성 설치
  install: {
    packageManager: 'pnpm',
    workspace: true
  },
  
  // 환경 변수 설정
  env: {
    NODE_ENV: 'development',
    VITE_API_BASE_URL: 'http://localhost:3000'
  }
})
```

## 🚀 사용법

### 빌드 순서 관리

**인터랙티브 빌드 (일반 개발)**
```bash
# 프로젝트 루트에서 실행
pnpm build

# 또는 직접 실행
tsx shared/scripts/build-order.ts --interactive
```

**자동 빌드 (CI/CD)**
```bash
# 모든 작업을 자동으로 수행
pnpm build:all

# 또는 직접 실행
tsx shared/scripts/build-order.ts
```

**실행 예시**
```bash
$ pnpm build

🚀 모노레포 빌드 시작...

📋 빌드 옵션을 선택하세요:
   (Enter 키를 누르면 기본값이 선택됩니다)

API 자동 생성을 스킵하시겠습니까? (Y/n): y
⏭️  API 자동 생성 스킵됨

Design Tokens 생성을 스킵하시겠습니까? (Y/n): y
⏭️  Design Tokens 생성 스킵됨

아이콘 최적화를 스킵하시겠습니까? (Y/n): y
⏭️  아이콘 최적화 스킵됨

순환참조 검사를 스킵하시겠습니까? (Y/n): y
⏭️  순환참조 검사 스킵됨

어떤 앱을 빌드하시겠습니까?
> 1. sample-desktop만 (기본)
  2. sample-desktop + mobile
  3. sample-desktop + mobile + desktop
  4. 모든 앱 (sample-desktop + mobile + desktop)
1

⚠️  참고: mobile-native 앱은 별도로 빌드해야 합니다.
   실행: pnpm mobile:build:android 또는 pnpm mobile:build:ios

✅ 빌드 옵션 설정 완료!

💡 빌드 대상 패키지: packages/types, packages/theme, packages/utils, ...

🔄 빌드 시작: packages/types
✅ 빌드 완료: packages/types

🔄 빌드 시작: packages/theme
...
```

### 아이콘 최적화

```bash
# 아이콘 최적화 실행
pnpm tsx shared/scripts/optimize-icons.ts

# 특정 디렉토리만 최적화
pnpm tsx shared/scripts/optimize-icons.ts --input=./icons --output=./optimized
```

### 프로젝트 설정

```bash
# 프로젝트 초기 설정
pnpm tsx shared/scripts/setup.ts

# 개발 환경 설정
pnpm tsx shared/scripts/setup.ts --env=development
```

## 🛠️ 개발

### 새 스크립트 추가

1. `shared/scripts/` 디렉토리에 TypeScript 파일 생성
2. 필요한 의존성 설치
3. `package.json`에 스크립트 명령어 추가

### 예시: 새 스크립트

```typescript
// shared/scripts/generate-docs.ts
import { generateDocs } from './generate-docs'

const main = async () => {
  try {
    await generateDocs({
      input: 'packages/ui/src/components',
      output: 'docs/components',
      template: 'storybook'
    })
    console.log('문서 생성 완료!')
  } catch (error) {
    console.error('문서 생성 실패:', error)
    process.exit(1)
  }
}

main()
```

### package.json에 스크립트 추가

```json
{
  "scripts": {
    "build:order": "tsx shared/scripts/build-order.ts",
    "optimize:icons": "tsx shared/scripts/optimize-icons.ts",
    "setup": "tsx shared/scripts/setup.ts",
    "generate:docs": "tsx shared/scripts/generate-docs.ts"
  }
}
```

## 📋 스크립트 가이드라인

### 1. 에러 처리

```typescript
const main = async () => {
  try {
    // 스크립트 로직
  } catch (error) {
    console.error('스크립트 실행 실패:', error)
    process.exit(1)
  }
}
```

### 2. 로깅

```typescript
import { logger } from './utils/logger'

logger.info('스크립트 시작')
logger.success('작업 완료')
logger.warn('경고 메시지')
logger.error('에러 메시지')
```

### 3. 설정 파일

```typescript
// config.ts
export interface ScriptConfig {
  input?: string
  output?: string
  options?: Record<string, unknown>
}

export const defaultConfig: ScriptConfig = {
  input: './src',
  output: './dist',
  options: {}
}
```

### 4. CLI 옵션

```typescript
import { parseArgs } from 'node:util'

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    input: { type: 'string' },
    output: { type: 'string' },
    verbose: { type: 'boolean' }
  }
})

console.log('입력 디렉토리:', values.input)
console.log('출력 디렉토리:', values.output)
```

## 🔗 관련 파일

- `package.json` - 스크립트 명령어 정의
- `tsconfig.json` - TypeScript 설정
- `eslint.config.js` - 코드 품질 검사

## 📝 라이센스

MIT License 