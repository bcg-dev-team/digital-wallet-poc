# Figma Tokens Studio 설정 가이드

Figma에서 Tokens Studio 플러그인을 사용하여 디자인 토큰을 관리하는 방법을 설명합니다.

## 🎯 **목표**

- Figma를 Single Source of Truth로 활용
- 디자인 토큰의 일관성 유지
- 개발팀과의 효율적인 협업

## 📋 **설치 및 설정 단계**

### 1. Tokens Studio for Figma 플러그인 설치

1. **Figma 열기**
   - Figma 데스크톱 앱 또는 웹 브라우저에서 Figma 접속

2. **플러그인 마켓플레이스 접속**
   - 메뉴 → Plugins → Browse plugins in Community
   - 또는 `Ctrl/Cmd + Shift + P` → "Browse plugins"

3. **Tokens Studio 검색**
   - 검색창에 "Tokens Studio for Figma" 입력
   - 또는 직접 링크: [Tokens Studio for Figma](https://www.figma.com/community/plugin/843461159747178978/Tokens-Studio-for-Figma)

4. **플러그인 설치**
   - "Install" 버튼 클릭
   - 설치 완료 후 "Open" 버튼 클릭

### 2. 초기 설정

1. **플러그인 실행**
   - 메뉴 → Plugins → Tokens Studio for Figma
   - 또는 `Ctrl/Cmd + Shift + P` → "Tokens Studio for Figma"

2. **프로젝트 설정**
   - "Create new token set" 클릭
   - 프로젝트명 입력 (예: "Design System Tokens")

3. **기본 토큰 타입 설정**
   - Color, Typography, Spacing, Shadow, Border Radius 등 선택

## 🎨 **토큰 구조 설계**

### 권장 토큰 구조

```
Design System Tokens/
├── Colors/
│   ├── Base/
│   │   ├── Gray (50-900)
│   │   ├── Red (50-900)
│   │   ├── Green (50-900)
│   │   ├── Blue (50-900)
│   │   └── Yellow (50-900)
│   ├── Semantic/
│   │   ├── Primary (50-900)
│   │   ├── Secondary (50-900)
│   │   ├── Success (50-900)
│   │   ├── Warning (50-900)
│   │   └── Error (50-900)
│   ├── Text/
│   │   ├── Primary
│   │   ├── Secondary
│   │   ├── Tertiary
│   │   └── Inverse
│   ├── Surface/
│   │   ├── Primary
│   │   ├── Secondary
│   │   └── Tertiary
│   └── Border/
│       ├── Primary
│       ├── Secondary
│       └── Focus
├── Typography/
│   ├── Font Family/
│   │   ├── Sans
│   │   ├── Serif
│   │   └── Mono
│   ├── Font Size/
│   │   ├── XS, SM, Base, LG, XL, 2XL, 3XL, 4XL, 5XL, 6XL
│   ├── Font Weight/
│   │   ├── Thin, Light, Normal, Medium, Semibold, Bold, Extrabold, Black
│   ├── Line Height/
│   │   ├── None, Tight, Snug, Normal, Relaxed, Loose
│   ├── Letter Spacing/
│   │   ├── Tighter, Tight, Normal, Wide, Wider, Widest
│   └── Text Styles/
│       ├── Display (Large, Medium, Small)
│       ├── Headline (Large, Medium, Small)
│       ├── Title (Large, Medium, Small)
│       ├── Body (Large, Medium, Small)
│       └── Label (Large, Medium, Small)
├── Spacing/
│   ├── Base (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)
│   ├── Component (XS, SM, MD, LG, XL, 2XL, 3XL)
│   └── Layout (Container, Section)
├── Shadows/
│   ├── SM, MD, LG, XL, 2XL
│   └── Inner, None
└── Border Radius/
    ├── SM, MD, LG, XL
    └── Full
```

## 🛠️ **토큰 생성 방법**

### 1. 색상 토큰 생성

1. **기본 색상 팔레트 생성**
   - Colors 탭에서 "Add color" 클릭
   - 색상값 입력 (HEX, RGB, HSL)
   - 이름 지정 (예: "Gray/50", "Gray/100", ...)

2. **시맨틱 색상 생성**
   - Primary, Secondary 등 의미있는 이름으로 생성
   - Base 색상을 참조하여 설정

3. **토큰 참조 (Alias) 설정**
   - Primary 색상을 Base 색상으로 참조
   - 예: Primary/500 = Blue/500

### 2. 타이포그래피 토큰 생성

1. **기본 타이포그래피 설정**
   - Font Family, Font Size, Font Weight 등 개별 설정
   - 각각 독립적인 토큰으로 생성

2. **복합 타이포그래피 스타일 생성**
   - Text Styles에서 복합 스타일 생성
   - Font Size, Font Weight, Line Height 등을 조합

### 3. 간격 토큰 생성

1. **기본 간격 설정**
   - 4px 단위로 0부터 96px까지 설정
   - rem 단위로 변환 (예: 16px = 1rem)

2. **컴포넌트 간격 설정**
   - XS, SM, MD, LG, XL 등 의미있는 이름으로 설정

### 4. 그림자 토큰 생성

1. **그림자 스타일 설정**
   - Box Shadow 값으로 설정
   - 예: "0 1px 2px 0 rgb(0 0 0 / 0.05)"

### 5. 보더 반경 토큰 생성

1. **보더 반경 값 설정**
   - rem 단위로 설정
   - 예: 0.25rem, 0.375rem, 0.5rem, 0.75rem

## 🔄 **토큰 내보내기**

### 1. JSON 내보내기

1. **플러그인에서 Export 설정**
   - "Export" 탭 클릭
   - "JSON" 형식 선택
   - "Export tokens" 클릭

2. **파일 저장**
   - `figma-tokens.json` 파일명으로 저장
   - 프로젝트 루트에 저장

### 2. 토큰 동기화

```bash
# 토큰 추출 및 변환
pnpm run extract:tokens -- --figma-json=figma-tokens.json

# Style Dictionary 빌드
pnpm run build:tokens
```

## 🎯 **베스트 프랙티스**

### 1. 토큰 네이밍 컨벤션

- **카테고리/서브카테고리/변형** 형식 사용
- 예: `color/primary/500`, `typography/heading/large`
- 일관된 네이밍 규칙 적용

### 2. 토큰 참조 활용

- 중복 값 대신 참조 사용
- 예: `color/primary/600` = `{color/primary/500}`
- 유지보수성 향상

### 3. 시맨틱 토큰 우선

- 의미있는 이름으로 토큰 생성
- 예: `color/primary` 대신 `color/brand/primary`
- 디자인 의도 명확화

### 4. 테마별 분리

- 기본 테마와 다크 테마 분리
- 프로젝트별 테마 구성
- 조건부 토큰 설정

## 🐛 **문제 해결**

### 자주 발생하는 문제들

1. **토큰이 업데이트되지 않는 경우**
   - 플러그인 재시작
   - 캐시 클리어
   - Figma 파일 새로고침

2. **JSON 내보내기 실패**
   - 토큰 구조 확인
   - 참조 오류 확인
   - 플러그인 버전 확인

3. **토큰 참조 오류**
   - 참조 경로 정확성 확인
   - 순환 참조 확인
   - 토큰 존재 여부 확인

## 📚 **참고 자료**

- [Tokens Studio 공식 문서](https://docs.tokens.studio/)
- [Figma Tokens 공식 문서](https://docs.figmatokens.com/)
- [Design Tokens 가이드](https://www.designtokens.org/)
