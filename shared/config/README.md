# shared/config

모노레포 전체에서 공통으로 사용되는 설정 파일들을 관리하는 디렉토리입니다.

## 📁 파일 구조

```
shared/config/
└── vite.common.ts        # Vite 공통 설정
```

## 🔧 주요 파일

### vite.common.ts

모노레포의 모든 Vite 프로젝트에서 공통으로 사용되는 설정을 정의합니다.

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export const createViteConfig = (options: {
  root: string
  build?: {
    lib?: boolean
    outDir?: string
  }
}) => {
  return defineConfig({
    root: options.root,
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(options.root, 'src')
      }
    },
    build: {
      outDir: options.build?.outDir || 'dist',
      lib: options.build?.lib ? {
        entry: resolve(options.root, 'src/index.ts'),
        name: 'TemplateUI',
        fileName: 'index'
      } : undefined
    },
    test: {
      globals: true,
      environment: 'jsdom'
    }
  })
}
```

## 🚀 사용법

### Vite 설정에서 사용

```typescript
// packages/ui/vite.config.ts
import { createViteConfig } from '../../shared/config/vite.common'

export default createViteConfig({
  root: __dirname,
  build: {
    lib: true,
    outDir: 'dist'
  }
})
```

```typescript
// apps/desktop/vite.config.ts
import { createViteConfig } from '../../shared/config/vite.common'

export default createViteConfig({
  root: __dirname
})
```

### 커스텀 설정 추가

```typescript
// packages/ui/vite.config.ts
import { createViteConfig } from '../../shared/config/vite.common'
import { mergeConfig } from 'vite'

const baseConfig = createViteConfig({
  root: __dirname,
  build: {
    lib: true
  }
})

const customConfig = {
  plugins: [
    // 추가 플러그인
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
}

export default mergeConfig(baseConfig, customConfig)
```

## 🛠️ 개발

### 설정 파일 추가

새로운 공통 설정이 필요한 경우:

1. `shared/config/` 디렉토리에 파일 추가
2. 타입 정의 및 기본값 설정
3. 각 패키지에서 import하여 사용

### 예시: TypeScript 공통 설정

```typescript
// shared/config/tsconfig.common.ts
export const createTsConfig = (options: {
  root: string
  include?: string[]
  exclude?: string[]
}) => {
  return {
    extends: '../../tsconfig.base.json',
    compilerOptions: {
      rootDir: options.root,
      outDir: resolve(options.root, 'dist'),
      baseUrl: options.root,
      paths: {
        '@/*': ['src/*']
      }
    },
    include: options.include || ['src/**/*'],
    exclude: options.exclude || ['node_modules', 'dist']
  }
}
```

## 📋 설정 가이드라인

### 1. 일관성 유지

- 모든 패키지에서 동일한 기본 설정 사용
- 환경별 차이점은 옵션으로 처리

### 2. 타입 안전성

- TypeScript를 활용한 설정 타입 정의
- 옵션 객체의 타입 검증

### 3. 확장성

- 기본 설정을 확장할 수 있는 구조
- 패키지별 커스터마이징 지원

### 4. 문서화

- 각 설정 파일의 목적과 사용법 명시
- 예시 코드 제공

## 🔗 관련 파일

- `tsconfig.base.json` - 루트 TypeScript 기본 설정
- `eslint.config.js` - ESLint 설정
- `package.json` - 패키지 매니저 설정

## 📝 라이센스

MIT License 