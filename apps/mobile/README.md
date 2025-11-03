# Digital Wallet Mobile App

React + TypeScript로 구현한 디지털 월렛 모바일 애플리케이션

## 📱 주요 기능

### 1. USDC 지갑 관리

- USDC 잔액 조회
- 거래 내역 확인
- 실시간 환율 정보

### 2. USDC 입금

- 3단계 입금 프로세스
- 네트워크 선택 (Ethereum, Polygon 등)
- 입금 주소 생성 및 복사
- 실시간 입금 진행 상태 확인

### 3. USDC/DT 환전

- 실시간 환율 조회
- 즉시 환전
- 환전 진행 상태 확인

## 🎯 기술 스택

- **React 18** - UI 프레임워크
- **TypeScript 5.7** - 타입 안전성
- **Vite 6** - 빌드 도구
- **Tailwind CSS 3** - 스타일링
- **shadcn/ui** - UI 컴포넌트 (Radix UI)
- **date-fns** - 날짜/시간 처리

## 🚀 개발 시작

### 의존성 설치

```bash
# 루트에서 실행
pnpm install
```

### 개발 서버

```bash
# 루트에서 실행
pnpm dev

# 또는 apps/mobile에서 직접 실행
cd apps/mobile
pnpm dev
```

개발 서버가 시작되면 `http://localhost:3000`에서 확인할 수 있습니다.

### 모바일 기기에서 테스트

```bash
# PC의 IP 주소 확인
ipconfig (Windows) 또는 ifconfig (Mac/Linux)

# 모바일 기기에서 접속
http://[PC-IP]:3000
```

## 📦 빌드

### 프로덕션 빌드

```bash
# 루트에서 실행
pnpm build

# 빌드 결과는 apps/mobile/dist에 생성됩니다
```

### 빌드 미리보기

```bash
pnpm preview
```

## 🏗️ 프로젝트 구조

```
apps/mobile/
├── src/
│   ├── components/           # React 컴포넌트
│   │   ├── DigitalWallet.tsx          # 메인 화면
│   │   ├── UsdcDeposit.tsx            # 입금 1단계
│   │   ├── UsdcDepositStep2.tsx       # 입금 2단계
│   │   ├── UsdcDepositProgress.tsx    # 입금 진행중
│   │   ├── UsdcExchange.tsx           # 환전
│   │   └── UsdcExchangeProgress.tsx   # 환전 진행중
│   │
│   ├── imports/              # Figma 생성 컴포넌트
│   ├── assets/               # 이미지, 폰트 등
│   ├── App.tsx               # 앱 루트
│   ├── main.tsx              # 엔트리 포인트
│   └── index.css             # 글로벌 스타일
│
├── index.html                # HTML 템플릿
├── vite.config.ts            # Vite 설정
├── tailwind.config.cjs       # Tailwind 설정
├── tsconfig.json             # TypeScript 설정
└── package.json
```

## 🎨 컴포넌트 구조

### 화면 흐름

```
DigitalWallet (메인)
    │
    ├─→ UsdcDeposit (입금 1단계)
    │       └─→ UsdcDepositStep2 (입금 2단계)
    │               └─→ UsdcDepositProgress (진행중)
    │                       └─→ DigitalWallet (완료)
    │
    └─→ UsdcExchange (환전)
            └─→ UsdcExchangeProgress (진행중)
                    └─→ DigitalWallet (완료)
```

### 주요 컴포넌트

#### 1. DigitalWallet

- USDC 잔액 표시
- 거래 내역 목록
- 입금/환전 버튼

#### 2. UsdcDeposit

- 입금 금액 입력
- 네트워크 선택
- 다음 단계로 이동

#### 3. UsdcDepositStep2

- 입금 주소 표시
- QR 코드
- 주소 복사 기능

#### 4. UsdcDepositProgress

- 입금 진행 상태
- 확인 횟수
- 예상 완료 시간

#### 5. UsdcExchange

- 환전 금액 입력
- 실시간 환율 표시
- 예상 수령 금액

#### 6. UsdcExchangeProgress

- 환전 진행 상태
- 완료 시 홈으로 이동

## 📚 사용된 패키지

### UI 컴포넌트

- `@template/ui` - shadcn/ui 컴포넌트 라이브러리
- `@radix-ui/*` - 접근성 높은 UI 프리미티브

### 유틸리티

- `@template/types` - 공통 타입 정의
- `@template/utils` - 유틸리티 함수

### 폼 처리

- `react-hook-form` - 폼 상태 관리
- `zod` - 스키마 유효성 검사

### 날짜/시간

- `date-fns` - 날짜 포맷팅
- `date-fns-tz` - 타임존 처리

### 스타일링

- `tailwindcss` - 유틸리티 CSS
- `class-variance-authority` - 변형 관리
- `tailwind-merge` - 클래스 병합

## 🔧 설정 파일

### vite.config.ts

```typescript
- React SWC 플러그인
- Path alias (@, @template/*)
- Figma 에셋 alias
- Code splitting
- 모바일 최적화 (host: true)
```

### tailwind.config.cjs

```javascript
- 디자인 토큰
- 다크 모드 지원
- 커스텀 색상
- 애니메이션
```

### tsconfig.json

```json
- Strict 모드
- Path mapping
- React JSX
```

## 📱 모바일 최적화

### Viewport 설정

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 최대 너비 제한

```css
max-w-[360px]  /* 모바일 화면에 최적화 */
```

### Touch 최적화

- 터치 가능한 영역 최소 44px
- 적절한 padding/margin
- 부드러운 스크롤

## 🐛 디버깅

### 개발자 도구

```bash
# Vite 인스펙터
vite-plugin-inspect
```

### 타입 체크

```bash
# TypeScript 타입 체크
pnpm type-check
```

### Lint

```bash
# ESLint 실행
pnpm lint

# ESLint 체크만
pnpm lint:check
```

## 📝 라이선스

Private
