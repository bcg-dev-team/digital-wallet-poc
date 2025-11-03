# 디자인 토큰 변경사항

> Commit: cea2fa35da6222550a90236965703ed05d76421c  
> Date: 2025-10-21 18:48:08  
> Author: bcg-ygpark

## 📊 변경 요약

- **추가된 토큰**: 15개 (Light 모드 7개, Dark 모드 7개, 공통 1개)
- **수정된 토큰**: 35개
- **삭제된 토큰**: 1개
- **이름 변경된 토큰**: 4개

---

## ✨ 새로 추가된 토큰

### Base Colors

#### Light 모드
```json
{
  "Base-Colors.Red.red900": "#ed2d32"
}
```

#### Dark 모드
```json
{
  "Base-Colors.Red.red900": "#ff464a"
}
```

---

### Button - Trade-red (거래용 빨간색 버튼)

#### Light 모드
```json
{
  "Button.Trade-red.background": "{Base-Colors.Red.red050}",
  "Button.Trade-red.text": "{Font.Color.Buy}",
  "Button.Trade-red.border": "{Base-Colors.Red.red900}",
  "Button.Trade-red.hover": "{Base-Colors.Red.red050}",
  "Button.Trade-red.background-before": "{Base-Colors.Neutral.neutral150}",
  "Button.Trade-red.text-before": "{Font.Color.Buy}",
  "Button.Trade-red.hover-before": "#e4e8ec",
  "Button.Trade-red.border-before": "#e4e8ec"
}
```

#### Dark 모드
```json
{
  "Button.Trade-red.background": "{Base-Colors.Red.red900}",
  "Button.Trade-red.text": "{Font.Color.White}",
  "Button.Trade-red.border": "{Base-Colors.Red.red700}",
  "Button.Trade-red.hover": "{Base-Colors.Red.red900}",
  "Button.Trade-red.background-before": "{Base-Colors.Neutral.neutral200}",
  "Button.Trade-red.text-before": "{Font.Color.Buy}",
  "Button.Trade-red.hover-before": "#393b3d",
  "Button.Trade-red.border-before": "#393b3d"
}
```

---

### Button - Trade-blue (거래용 파란색 버튼)

#### Light 모드
```json
{
  "Button.Trade-blue.background": "{Base-Colors.Blue.blue050}",
  "Button.Trade-blue.text": "{Font.Color.Sell}",
  "Button.Trade-blue.hover": "{Base-Colors.Red.red050}",
  "Button.Trade-blue.border": "{Base-Colors.Blue.blue800-deep}",
  "Button.Trade-blue.background-before": "{Base-Colors.Neutral.neutral150}",
  "Button.Trade-blue.text-before": "{Font.Color.Sell}",
  "Button.Trade-blue.hover-before": "#e4e8ec",
  "Button.Trade-blue.border-before": "#e4e8ec"
}
```

#### Dark 모드
```json
{
  "Button.Trade-blue.background": "{Base-Colors.Blue.blue600}",
  "Button.Trade-blue.text": "{Font.Color.White}",
  "Button.Trade-blue.hover": "{Base-Colors.Blue.blue600}",
  "Button.Trade-blue.border": "{Base-Colors.Blue.blue600}",
  "Button.Trade-blue.background-before": "{Base-Colors.Neutral.neutral200}",
  "Button.Trade-blue.text-before": "{Font.Color.Sell}",
  "Button.Trade-blue.hover-before": "#393b3d",
  "Button.Trade-blue.border-before": "#393b3d"
}
```

---

### Font Color

#### Light & Dark 모드
```json
{
  "Font.Color.Default-muted-light": "{Base-Colors.Neutral.neutral400}" // Light
  "Font.Color.Default-muted-light": "{Base-Colors.Neutral.neutral600}" // Dark
}
```

---

### Icon

#### Light & Dark 모드
```json
{
  "Icon.Favorite-before": "{Background.bg-surface-muted}" // Light
  "Icon.Favorite-before": "{Background.divider-muted}"    // Dark
}
```

---

## 🔄 수정된 토큰

### Red 계열 색상 참조 변경 (red800 → red900)

다음 토큰들의 색상 참조가 `{Base-Colors.Red.red800}` 또는 `{Base-Colors.Red.red700}`에서 `{Base-Colors.Red.red900}`으로 변경되었습니다:

#### Light 모드
```
Button.Red-outline.text
Button.Red-outline.border
Button.Red-solid.background
Button.Red-solid.border
Button.Red-outline-big.text
Button.Red-outline-big.border
Font.Color.Red
Font.Color.Buy
Common.border-error
Common.text-error
Long.text
Long.border
Status.Status-red-text
```

#### Dark 모드
```
Button.Red-solid.background
Button.Red-outline-big.text
Font.Color.Red
Font.Color.Buy
Common.text-error
Icon.Favorite
Long.text
Status.Status-red-text
```

---

### Background 색상 변경 (Dark 모드)

```json
{
  "Background.bg-surface": "{Base-Colors.Neutral.neutral050}" 
    → "{Base-Colors.Neutral.neutral100}",
  
  "Background.bg-surface-muted": "{Base-Colors.Neutral.neutral000}" 
    → "{Base-Colors.Neutral.neutral050}"
}
```

---

### Button.Blue-outline-big (Dark 모드)

```json
{
  "Button.Blue-outline-big.background-before": "{Base-Colors.Neutral.neutral100}" 
    → "{Base-Colors.Neutral.neutral150}"
}
```

---

## 🏷️ 이름이 변경된 토큰

### Button.Red-outline-big (Light & Dark 모드)
```
background-none → background-before
```

### Button.Blue-outline-big (Light & Dark 모드)
```
background-none → background-before
```

> **참고**: 기존 토큰 이름이 의미적으로 부정확하여 `background-before`로 변경되었습니다.

---

## 🗑️ 삭제된 토큰

### Button.Default (Dark 모드)
```json
{
  "Button.Default.background-hover 2": "{Base-Colors.Neutral.neutral100}"
}
```

> **사유**: 중복된 토큰으로 제거되었습니다.

---

## 📝 주요 변경 내용 요약

### 1. 거래 버튼 추가 (Trade-red, Trade-blue)
- 매수/매도 기능을 위한 전용 버튼 스타일 추가
- Light/Dark 모드 모두 지원
- `before` 상태 토큰 포함 (hover, border, text, background)

### 2. Red 계열 색상 체계 개선
- 새로운 `red900` 색상 추가
- 기존 `red800`/`red700` 참조를 `red900`으로 통일
- 더 명확하고 일관된 빨간색 표현

### 3. 토큰 네이밍 개선
- `background-none` → `background-before`로 변경
- 의미를 더 명확하게 전달

### 4. 아이콘 및 폰트 색상 확장
- `Icon.Favorite-before` 추가 (즐겨찾기 전 상태)
- `Font.Color.Default-muted-light` 추가 (흐린 텍스트 색상)

### 5. Dark 모드 배경 색상 조정
- `bg-surface`, `bg-surface-muted` 값 변경
- 더 나은 대비와 가독성 제공

---

## 🔍 영향 받는 컴포넌트

이 변경사항은 다음 컴포넌트들에 영향을 줄 수 있습니다:

### Button 컴포넌트
- Red 계열 버튼 (Red-outline, Red-solid, Red-outline-big)
- Blue 계열 버튼 (Blue-outline-big)
- **새로 추가**: Trade-red, Trade-blue 버튼

### Text 컴포넌트
- 에러 메시지 텍스트
- Buy/Sell 텍스트
- 빨간색 텍스트

### Icon 컴포넌트
- Favorite 아이콘
- Status 아이콘

### Common 컴포넌트
- 에러 상태 표시 (border, text)
- Long/Short 포지션 표시

---

## ⚠️ 마이그레이션 가이드

### 1. 거래 버튼 사용
```vue
<!-- Light 모드 -->
<BaseButton variant="trade-red">매수</BaseButton>
<BaseButton variant="trade-blue">매도</BaseButton>

<!-- Dark 모드 자동 적용 -->
```

### 2. 토큰 이름 변경 대응
```css
/* Before */
.button {
  background: var(--button-red-outline-big-background-none);
}

/* After */
.button {
  background: var(--button-red-outline-big-background-before);
}
```

### 3. 삭제된 토큰 대체
```css
/* Before (Dark 모드) */
.button:hover {
  background: var(--button-default-background-hover-2);
}

/* After */
.button:hover {
  background: var(--button-default-background-hover);
}
```

---

## 🎨 색상 비교

### Light 모드 - Red900
| 속성 | 값 |
|------|-----|
| HEX | #ed2d32 |
| 용도 | 매수, 에러, 경고 표시 |

### Dark 모드 - Red900
| 속성 | 값 |
|------|-----|
| HEX | #ff464a |
| 용도 | 매수, 에러, 경고 표시 (Dark 모드) |

---

## 📚 참고 자료

- [Figma 디자인 시스템](https://www.figma.com)
- [Style Dictionary 문서](https://amzn.github.io/style-dictionary)
- [프로젝트 디자인 토큰 가이드](./packages/theme/README.md)

---

## 📅 체크리스트

UI 패키지 업데이트:
- [ ] Button 컴포넌트 Trade-red, Trade-blue variant 추가
- [ ] Red 계열 버튼 색상 업데이트 확인
- [ ] Icon Favorite-before 상태 추가
- [ ] Dark 모드 Background 색상 테스트
- [ ] Storybook 업데이트
- [ ] 단위 테스트 업데이트

문서 업데이트:
- [ ] 컴포넌트 스토리북 문서
- [ ] 디자인 토큰 사용 가이드
- [ ] 마이그레이션 가이드

---

*본 문서는 커밋 `cea2fa35da6222550a90236965703ed05d76421c`의 변경사항을 분석하여 자동으로 생성되었습니다.*

