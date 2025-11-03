# Overlay Layer 아키텍처

## 핵심 아이디어

플로팅 UI 요소(모달, 토스트)를 일관되게 관리하기 위한 전용 레이어입니다.

**HeadlessUI 포털을 미리 배치하여 모든 플로팅 요소를 하나의 레이어에서 관리**

```html
<body>
  <div id="app"></div>
  
  <!-- 플로팅 요소 전용 레이어 -->
  <div id="overlay-root" data-overlay-root>
    <!-- HeadlessUI가 사용할 포털을 미리 배치 -->
    <div id="headlessui-portal-root"></div>
  </div>
</body>
```

### 장점

- ✅ JavaScript 코드 불필요
- ✅ HeadlessUI가 자동으로 올바른 위치에 렌더링
- ✅ 모든 플로팅 요소가 형제 요소로 z-index 비교 용이

## Z-Index 구조

```css
/* packages/theme/src/styles/__tokens-*.css - Figma에서 관리 */
--z-index-modal: 1300;
--z-index-toast: 1400;
--z-index-tooltip: 1500;
--z-index-max: 9999;
```

**포털 레이어**: `z-index: var(--z-index-max)` - 최상위 배치  
**내부 요소**: Modal(1300) < Toast(1400) < Tooltip(1500)

## 사용 방법

### 일반 컴포넌트 (Toast 등)

```vue
<Teleport to="#overlay-root">
  <div class="z-toast">...</div>
</Teleport>
```

### HeadlessUI 컴포넌트 (Modal 등)

```vue
<Dialog :open="isOpen">
  <DialogPanel>...</DialogPanel>
</Dialog>
```

- Teleport 불필요
- HeadlessUI가 자동으로 `#headlessui-portal-root` 찾아서 렌더링

## 설정 방법

### 1. HTML 추가

```html
<body>
  <div id="app"></div>
  <div id="overlay-root" data-overlay-root>
    <div id="headlessui-portal-root"></div>
  </div>
</body>
```

### 2. CSS 추가

```css
#overlay-root {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: var(--z-index-max);
}

#overlay-root > * {
  pointer-events: auto;
}
```

### 3. Teleport 타겟 변경

```vue
<!-- Before -->
<Teleport to="body">

<!-- After -->
<Teleport to="#overlay-root">
```

HeadlessUI 컴포넌트는 수정 불필요

## 주의사항

`headlessui-portal-root`는 반드시 `overlay-root` **내부**에 있어야 합니다.

```html
<!-- ✅ 올바름 -->
<div id="overlay-root">
  <div id="headlessui-portal-root"></div>
</div>

<!-- ❌ 잘못됨 -->
<div id="overlay-root"></div>
<div id="headlessui-portal-root"></div>
```

