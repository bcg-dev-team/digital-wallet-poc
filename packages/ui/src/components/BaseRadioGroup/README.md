# BaseRadioGroup

라디오 버튼 그룹을 제공하는 Vue 3 컴포넌트입니다. Headless UI를 기반으로 하여 접근성과 사용성을 보장합니다.

> 📚 **참고 문서**: [Headless UI Radio Group 공식 문서](https://headlessui.com/v1/vue/radio-group)

## 기본 사용법

### 단순한 문자열 옵션

```vue
<template>
  <BaseRadioGroup
    v-model="selectedOption"
    :options="options"
    label="옵션 선택"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseRadioGroup from '@/components/BaseRadioGroup/BaseRadioGroup.vue'
import type { RadioOption } from '@/types/components'

const options: RadioOption[] = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' }
]

const selectedOption = ref('option1')
</script>
```

### 객체 옵션 (by 속성 사용)

```vue
<template>
  <BaseRadioGroup
    v-model="selectedUser"
    :options="userOptions"
    label="사용자 선택"
    by="id"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseRadioGroup from '@/components/BaseRadioGroup/BaseRadioGroup.vue'
import type { RadioOption } from '@/types/components'

interface User {
  id: string
  name: string
  email: string
}

const userOptions: RadioOption<User>[] = [
  {
    value: { id: 'user-1', name: '김철수', email: 'kim@example.com' },
    label: '김철수',
    icon: 'user'
  },
  {
    value: { id: 'user-2', name: '이영희', email: 'lee@example.com' },
    label: '이영희',
    icon: 'user'
  }
]

const selectedUser = ref<User | null>(null)
</script>
```

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `options` | `RadioOption[]` | `[]` | 라디오 옵션 목록 |
| `modelValue` | `any` | `undefined` | 현재 선택된 값 (v-model) |
| `initialValue` | `any` | `undefined` | 초기 선택값 (modelValue가 없을 때만 사용) |
| `label` | `string` | `''` | 라디오 그룹 라벨 |
| `disabled` | `boolean` | `false` | 전체 그룹 비활성화 여부 |
| `name` | `string` | `''` | 폼에서 사용할 name 속성 |
| `by` | `string \| ((a: any, b: any) => boolean)` | `undefined` | 객체 비교를 위한 키 또는 비교 함수 |

## Events

| Event | Payload | 설명 |
|-------|---------|------|
| `update:modelValue` | `value: any` | 선택된 값이 변경될 때 발생 |

## RadioOption 타입

```typescript
interface RadioOption<T = any> {
  value: T;           // 옵션의 값
  label: string;      // 옵션에 표시될 텍스트
  icon?: IconName;    // 아이콘 (선택사항)
  disabled?: boolean; // 비활성화 여부 (선택사항)
}
```

## by 속성의 중요성

### 객체 옵션 사용 시 필수

JavaScript에서 객체는 참조로 비교되기 때문에, 객체 옵션을 사용할 때는 `by` 속성이 필수입니다.

```typescript
// ❌ by 속성 없이 사용하면 올바르게 작동하지 않음
const option1 = { id: 'user-1', name: '김철수' }
const option2 = { id: 'user-1', name: '김철수' }

option1 === option2  // false (참조가 다름)

// ✅ by="id"를 사용하면 올바르게 작동
// Headless UI가 option1.id === option2.id로 비교
```

### by 속성 사용 방법

#### 문자열 키 사용 (권장)
```vue
<BaseRadioGroup
  v-model="selectedUser"
  :options="userOptions"
  by="id"  <!-- user.id를 기준으로 비교 -->
/>
```

#### 커스텀 함수 사용
```vue
<BaseRadioGroup
  v-model="selectedUser"
  :options="userOptions"
  :by="(a, b) => a.id === b.id"  <!-- 커스텀 비교 로직 -->
/>
```

## 스타일링

컴포넌트는 Tailwind CSS와 CSS 변수를 사용하여 스타일링됩니다. 주요 스타일 클래스:

- **기본 상태**: `text-[var(--button-tab-text-off)]`
- **선택된 상태**: `bg-[var(--button-tab-button-on)] text-[var(--button-tab-text-on)]`
- **호버 상태**: `hover:bg-[var(--button-tab-button-hover)] hover:text-[var(--button-tab-text-on)]`
- **비활성화 상태**: `opacity-50 cursor-not-allowed`

## 접근성

- Headless UI 기반으로 ARIA 속성 자동 적용
- 키보드 네비게이션 지원
- 스크린 리더 호환성 보장

## 예제

### 사용자 역할 선택
```vue
<template>
  <BaseRadioGroup
    v-model="selectedRole"
    :options="roleOptions"
    label="사용자 역할"
    by="id"
  />
</template>

<script setup lang="ts">
const roleOptions: RadioOption[] = [
  { value: { id: 'admin', name: '관리자' }, label: '관리자', icon: 'shield' },
  { value: { id: 'user', name: '일반 사용자' }, label: '일반 사용자', icon: 'user' },
  { value: { id: 'guest', name: '게스트' }, label: '게스트', icon: 'guest' }
]

const selectedRole = ref(null)
</script>
```

### 테마 선택
```vue
<template>
  <BaseRadioGroup
    v-model="selectedTheme"
    :options="themeOptions"
    label="테마 선택"
  />
</template>

<script setup lang="ts">
const themeOptions: RadioOption[] = [
  { value: 'light', label: '라이트', icon: 'sun' },
  { value: 'dark', label: '다크', icon: 'moon' },
  { value: 'auto', label: '자동', icon: 'auto' }
]

const selectedTheme = ref('light')
</script>
```

## 주의사항

1. **객체 옵션 사용 시**: 반드시 `by` 속성을 설정하세요
2. **타입 안전성**: TypeScript를 사용하여 옵션 타입을 명시하세요
3. **접근성**: 라벨을 제공하여 스크린 리더 사용자를 지원하세요
4. **성능**: 많은 옵션이 있는 경우 가상화를 고려하세요