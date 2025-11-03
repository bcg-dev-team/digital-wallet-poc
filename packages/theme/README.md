# @template/theme

Headless UI + Tailwind CSS 기반 디자인 토큰/테마 패키지입니다. Figma와 연동되어 디자인 시스템을 체계적으로 관리합니다.

## 📦 설치

```bash
pnpm add @template/theme
```

## 🚀 사용법

### 기본 사용법

```typescript
import { useTheme } from '@template/theme'
import '@template/theme/styles/tokens-light.css'
import '@template/theme/styles/tokens-dark.css'

// Vue 컴포넌트에서 사용
const { theme, toggleTheme } = useTheme()

// 테마 변경
toggleTheme() // light ↔ dark
```

### CSS 변수 사용

```css
/* CSS에서 디자인 토큰 사용 */
.button {
  background-color: var(--color-primary-500);
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}
```

### Tailwind CSS 사용

```html
<!-- Tailwind CSS 클래스로 사용 -->
<button class="bg-primary-500 text-text-primary rounded-md px-4 py-2 text-sm font-medium">
  버튼
</button>
```

## 📁 파일 구조

```
src/
├── index.ts              # 메인 진입점
├── store.ts              # Pinia 스토어
├── composables.ts        # Vue 컴포저블
├── utils/                # 유틸리티 함수
│   └── index.ts
├── tokens/               # 디자인 토큰
│   └── __tokens.json     # Figma에서 생성된 토큰
├── styles/               # CSS 스타일
│   ├── __tokens-light.css
│   └── __tokens-dark.css
└── presets/              # Tailwind 프리셋
```

## 🔧 주요 기능

### 테마 관리

```typescript
import { useTheme } from '@template/theme'

const { 
  theme,           // 현재 테마 ('light' | 'dark')
  isDark,          // 다크 모드 여부
  toggleTheme,     // 테마 토글 함수
  setTheme         // 특정 테마 설정 함수
} = useTheme()

// 테마 변경
setTheme('dark')

// 테마 토글
toggleTheme()
```

### 디자인 토큰 접근

```typescript
import { getToken, getTokens } from '@template/theme'

// 특정 토큰 값 가져오기
const primaryColor = getToken('color.primary.500')
const spacing = getToken('spacing.4')

// 모든 토큰 가져오기
const allTokens = getTokens()
```

### CSS 변수 사용

```css
/* 색상 */
--color-primary-500: #3b82f6;
--color-secondary-500: #6b7280;
--color-success-500: #10b981;
--color-warning-500: #f59e0b;
--color-error-500: #ef4444;

/* 타이포그래피 */
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;

/* 간격 */
--spacing-1: 0.25rem;
--spacing-2: 0.5rem;
--spacing-4: 1rem;
--spacing-8: 2rem;

/* 둥근 모서리 */
--radius-sm: 0.125rem;
--radius-md: 0.375rem;
--radius-lg: 0.5rem;
--radius-full: 9999px;
```

## 🎨 디자인 시스템

### 색상 팔레트

```typescript
// 라이트 테마 색상
const lightColors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    900: '#1e3a8a'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    900: '#111827'
  }
}

// 다크 테마 색상
const darkColors = {
  primary: {
    50: '#1e3a8a',
    100: '#1e40af',
    500: '#3b82f6',
    900: '#eff6ff'
  },
  gray: {
    50: '#111827',
    100: '#1f2937',
    500: '#9ca3af',
    900: '#f9fafb'
  }
}
```

### 타이포그래피

```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace']
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem'
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  }
}
```

### 간격 시스템

```typescript
const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  4: '1rem',
  8: '2rem',
  16: '4rem',
  32: '8rem'
}
```

## 🔗 Figma 연동

### Tokens Studio for Figma

이 패키지는 Figma의 "Tokens Studio for Figma" 플러그인과 연동됩니다.

1. **Figma에서 토큰 정의**: Tokens Studio 플러그인을 사용하여 디자인 토큰을 정의
2. **JSON 내보내기**: 토큰을 JSON 형식으로 내보내기
3. **자동 변환**: Style Dictionary를 통해 CSS 변수와 Tailwind 설정으로 자동 변환

### 토큰 업데이트

```bash
# Figma에서 토큰 업데이트 후
pnpm build:tokens

# 또는 전체 빌드
pnpm build
```

## 🛠️ 개발

### 빌드

```bash
# 토큰 빌드
pnpm build:tokens

# 전체 빌드
pnpm build

# 개발 모드 (watch)
pnpm dev
```

### Tailwind 설정

```javascript
// tailwind.config.js
import { generateTailwindConfig } from '@template/theme'

export default generateTailwindConfig({
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // 커스텀 설정 추가
    }
  }
})
```

## 📦 내보내기

### 메인 내보내기

```typescript
export { useTheme } from './composables'
export { themeStore } from './store'
export { getToken, getTokens } from './utils'
```

### CSS 내보내기

```typescript
// 라이트 테마 CSS
import '@template/theme/styles/tokens-light.css'

// 다크 테마 CSS
import '@template/theme/styles/tokens-dark.css'
```

### 스토어 내보내기

```typescript
import { themeStore } from '@template/theme/store'

// Pinia 스토어 직접 사용
const store = themeStore()
```

## 🔗 의존성

- **의존성**: `@template/types`, `change-case`
- **피어 의존성**: `pinia`, `vue`
- **개발 의존성**: `style-dictionary`, `sd-tailwindcss-transformer`

## 📝 라이센스

MIT License 