# 🚀 Vue3 Monorepo Template

Vue 3 + TypeScript + Vite 기반의 모노레포 템플릿입니다.

## 🏗️ 프로젝트 구조

```
vue3-monorepo-template/
├── apps/
│   ├── desktop/         # 데스크톱 웹 애플리케이션
│   ├── mobile/          # 모바일 웹 애플리케이션
│   └── mobile-native/   # React Native 네이티브 앱
├── packages/
│   ├── ui/              # 공통 UI 컴포넌트 라이브러리
│   ├── api/             # API 통신 모듈
│   ├── utils/           # 공통 유틸리티 함수
│   ├── types/           # 공통 타입 정의
│   ├── mocks/           # API 모킹 (MSW 기반)
│   └── theme/           # 디자인 토큰 및 테마 관리
├── shared/              # 공통 설정 및 도구
│   ├── config/          # 설정 파일들
│   └── scripts/         # 빌드 스크립트
├── docs/                # 프로젝트 문서
└── .cursor/             # Cursor AI 설정
    └── rules/           # 기술별 베스트 프랙티스
```

## 📚 문서

### 📖 가이드
- [아키텍처 가이드](./docs/architecture.md) - 프로젝트 구조 및 패키지 관계
- [패키지 관리 가이드](./docs/package-management.md) - 패키지 추가/수정/삭제 방법
- [개발 환경 설정](./docs/development-setup.md) - 개발 환경 구축 방법
- [순환 의존성 방지](./docs/circular-dependency-prevention.md) - 순환 참조 방지 가이드
- [**API 자동 생성 가이드**](./docs/api-generation-guide.md) - OpenAPI Generator를 활용한 타입 및 서비스 자동 생성 ⭐

### 📦 Packages
- [@template/types](./packages/types/README.md) - 공통 타입 정의
- [@template/utils](./packages/utils/README.md) - 공통 유틸리티 함수
- [@template/api](./packages/api/README.md) - API 통신 라이브러리
- [@template/mocks](./packages/mocks/README.md) - API 모킹 (MSW 기반)
- [@template/theme](./packages/theme/README.md) - 디자인 토큰 및 테마 관리
- [@template/ui](./packages/ui/README.md) - UI 컴포넌트 라이브러리

### 🔧 Shared
- [shared/config](./shared/config/README.md) - 공통 설정 파일
- [shared/scripts](./shared/scripts/README.md) - 빌드 및 유틸리티 스크립트

## 🚀 빠른 시작

### 설치 전 준비사항

1. **Node.js 설치**

    a. **Vercel 설치 스크립트 사용 (권장)**
    ```bash
    curl -sfLS install-node.vercel.app/v20 | bash
    ```

    b. **공식 웹사이트 통한 설치**
    - [Node.js 공식 웹사이트](https://nodejs.org/)에서 20.0.0 이상 버전 다운로드 및 설치

    - **Node.js 버전 확인**
    ```bash
    node --version
    ```

2. **PNPM 설치**

    - **PNPM 설치 (Node.js 16.13+ 필요)**
    ```bash
    npm install -g pnpm
    ```

    - **PNPM 버전 확인**
    ```bash
    pnpm --version
    ```

3. **Git 설치 및 설정**

    - **Git 설치 (Ubuntu/Debian)**
    ```bash
    sudo apt-get install git
    ```

    - **Git 설정 (필수)**
    ```bash
    # 대소문자 구분 설정 (모든 개발자가 실행해야 함)
    git config core.ignorecase false

    # 줄바꿈 문자 설정 (운영체제별로 다름)
    # Windows 사용자
    git config --global core.autocrlf true

    # Mac/Linux 사용자
    git config --global core.autocrlf input
    ```

### 설치 방법

1. **저장소 클론**
    ```bash
    git clone <repository-url>
    cd vue3-monorepo-template-2
    ```

2. **의존성 설치**
    ```bash
    # PNPM을 사용하여 의존성 설치
    pnpm install
    ```

3. **Vue Inspector 설정 (선택사항)**
    ```bash
    # macOS/Linux
    ./shared/scripts/setup-vue-inspector.sh
    
    # Windows (Git Bash/WSL)
    ./shared/scripts/setup-vue-inspector.sh
    
    # Windows (Command Prompt)
    shared\scripts\setup-vue-inspector.bat
    ```

4. **개발 서버 실행**
    ```bash
    # MODA 앱 개발 서버
    pnpm dev

    # 데스크톱 앱 개발 서버
    pnpm dev:desktop

    # 모바일 앱 개발 서버
    pnpm dev:mobile
    ```

### 5. 빌드

```bash
# 인터랙티브 빌드 (권장) - 각 작업을 선택적으로 수행
pnpm build

# 전체 빌드 (모든 작업 자동 수행)
pnpm build:all

# 개별 앱 빌드
pnpm build:desktop
pnpm build:mobile
pnpm build:sample-desktop

# Bundle Analyzer와 함께 빌드 (번들 크기 분석)
pnpm build:analyze:desktop        # 데스크톱 앱 번들 분석
pnpm build:analyze:mobile         # 모바일 앱 번들 분석
pnpm build:analyze:sample-desktop # 샘플 데스크톱 앱 번들 분석

# 네이티브 앱 빌드
pnpm mobile:build:android    # Android APK/AAB 빌드
pnpm mobile:build:ios        # iOS 빌드
```

**인터랙티브 빌드 옵션**

`pnpm build` 실행 시 다음 항목들을 선택적으로 실행할 수 있습니다:
- **API 자동 생성 스킵 여부** (기본: Y - 스킵)
- **Design Tokens 생성 스킵 여부** (기본: Y - 스킵)
  - 토큰 파일이 이미 존재하면 TypeScript만 다시 빌드
  - 토큰 파일이 없으면 전체 빌드 수행
- **아이콘 최적화 스킵 여부** (기본: Y - 스킵)
  - SVG 아이콘 최적화 작업
- **순환참조 검사 스킵 여부** (기본: Y - 스킵)
- **빌드할 앱 선택** (기본: sample-desktop만)
  - sample-desktop만
  - sample-desktop + mobile
  - sample-desktop + mobile + desktop
  - 모든 앱

**💡 Tip:** 
- `y`, `n`, `숫자` 키를 누르면 **Enter 없이 바로 진행**됩니다.
- Enter 키만 누르면 기본값이 선택됩니다.

**⚠️ 참고:** `mobile-native` 앱은 별도로 빌드해야 합니다.
- Android: `pnpm mobile:build:android`
- iOS: `pnpm mobile:build:ios`

**📖 상세 가이드:** [빌드 스크립트 가이드](./shared/scripts/README.md#인터랙티브-빌드-옵션)에서 각 옵션에 대한 자세한 설명과 시나리오별 권장 설정을 확인하세요.

## 🛠️ 개발 도구

### 스크립트 명령어

```bash
# 개발
pnpm dev:desktop          # 데스크톱 앱 개발 서버
pnpm dev:mobile           # 모바일 앱 개발 서버

# 빌드
pnpm build                # 인터랙티브 빌드 (권장)
pnpm build:all            # 전체 빌드 (모든 작업 자동 수행)
pnpm build:desktop        # 데스크톱 앱 빌드
pnpm build:mobile         # 모바일 앱 빌드
pnpm build:sample-desktop # 샘플 데스크톱 앱 빌드

# API 및 서비스 생성
pnpm generate:api         # API 클라이언트 자동 생성
pnpm generate:services    # 서비스 자동 생성
pnpm generate:all         # 모든 생성 작업 수행

# 아이콘 최적화
pnpm optimize-icons       # SVG 아이콘 최적화

# Bundle Analyzer (번들 크기 분석)
pnpm build:analyze:desktop        # 데스크톱 앱 번들 분석
pnpm build:analyze:mobile         # 모바일 앱 번들 분석
pnpm build:analyze:sample-desktop # 샘플 데스크톱 앱 번들 분석

# 테스팅 (TBD)
pnpm test                 # 전체 테스트 실행
pnpm test:unit            # 단위 테스트만
pnpm test:e2e             # E2E 테스트만
pnpm test:coverage        # 커버리지 리포트

# 코드 품질
pnpm lint                 # ESLint 검사 및 수정
pnpm format               # Prettier 포맷팅
pnpm type-check           # TypeScript 타입 검사

# API 자동 생성
pnpm generate:api         # Swagger로부터 타입 및 API 클라이언트 생성
pnpm generate:services    # 서비스 클래스 자동 생성

# Storybook
pnpm storybook            # Storybook 개발 서버
pnpm build-storybook      # Storybook 빌드
```

## 🚀 배포 (Deployment)

### 배포 프로세스

#### 1. **기능 개발 및 브랜치 관리**
- 기능 작업은 `feature` 브랜치에서 진행합니다.
- 작업이 완료된 `feature` 브랜치는 `main` 브랜치에 병합합니다.

#### 2. **릴리즈 준비**
- `main` 브랜치를 `release/sample-desktop` 브랜치로 병합합니다.

#### 3. **CI 자동화**
- `release/sample-desktop` 브랜치 병합 시 GitHub Workflow가 실행되어 CI 작업이 진행됩니다.
- CI가 성공적으로 완료되면 Docker 이미지가 생성됩니다.
- 동시에 [kubernetes_config](https://github.com/bcg-dev-team/kubernetes_config/tree/helm) 레포지토리가 업데이트됩니다.

#### 4. **배포 알림 및 ArgoCD 연동**
- [kubernetes_config](https://github.com/bcg-dev-team/kubernetes_config/tree/helm) 레포지토리 업데이트 시 웹훅 채널([#moda_webhook](https://blockchainglobalhq.slack.com/archives/C09HF0VPXH6))로 배포 알림이 전송됩니다.
- CI 작업 중 에러 발생 후 실패 알림이 전송되면, **Github Action URL** 링크를 클릭하여 에러 내용을 확인합니다.

  **실패 알림(예시)**

  ![ci_fail.png](docs/images/ci_fail.png)

- CI 작업 완료 후 성공 알림이 전송되면, **Deploy URL** 링크를 클릭하여 ArgoCD UI 화면으로 이동합니다.

  **성공 알림(예시)**

  ![ci_success.png](docs/images/ci_success.png)

#### 5. **ArgoCD UI에서 배포 동기화**
- CI 완료 후, [ArgoCD UI](https://172.25.1.24:12121/login?return_url=https%3A%2F%2F172.25.1.24%3A12121%2Fapplications%2Fmoda-front-desktop)에서 SYNC 버튼을 눌러 배포 상태를 동기화하여 배포를 완료합니다.

  **ArgoCD UI (예시)**

  ![argocd_ui.png](docs/images/argocd_ui.png)

## 📚 추가 문서

- [Cursor AI 명령어 사용법](./CURSOR_COMMANDS.md) - Cursor AI 명령어 상세 가이드
- [모노레포 아키텍처 가이드](./docs/architecture.md) - 패키지 구조 및 데이터 흐름
- [API 자동 생성 가이드](./docs/api-generation-guide.md) - OpenAPI Generator 활용 가이드 ⭐
- [모바일 배포 가이드](./docs/mobile-deployment.md) - React Native 앱 배포 방법
- [순환 의존성 방지](./docs/circular-dependency-prevention.md) - 모노레포에서 순환 의존성 방지

### 필수 요구사항

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-339933?logo=node.js&logoColor=white)
![PNPM](https://img.shields.io/badge/PNPM-%3E%3D8.0.0-F69220?logo=pnpm&logoColor=white)

## Technology Used

| Category      | Name/Version                                                                                                                          | Description                                          | License    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ---------- |
| 핵심 기술     | [![Vue.js](https://img.shields.io/badge/Vue.js-3.5.18-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)                        | 프로그레시브 JavaScript 프레임워크                   | MIT        |
|               | [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)              | JavaScript 런타임 환경                               | MIT        |
|               | [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | JavaScript의 타입이 있는 상위 집합                   | Apache-2.0 |
| 빌드 도구     | [![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)                              | 차세대 프론트엔드 빌드 도구                          | MIT        |
|               | [![PNPM](https://img.shields.io/badge/PNPM-%3E%3D8.0.0-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)                           | 빠르고 효율적인 패키지 매니저                        | MIT        |
| 라우팅        | [![Vue Router](https://img.shields.io/badge/Vue_Router-4.5.1-4FC08D?logo=vue.js&logoColor=white)](https://router.vuejs.org/)          | Vue.js 공식 라우터                                   | MIT        |
| 상태 관리     | [![Pinia](https://img.shields.io/badge/Pinia-2.3.1-4FC08D?logo=vue.js&logoColor=white)](https://pinia.vuejs.org/)                     | Vue.js를 위한 직관적인 상태 관리 라이브러리          | MIT        |
| UI/스타일링   | [![Headless UI](https://img.shields.io/badge/Headless_UI-1.7.23-000000?logo=headlessui&logoColor=white)](https://headlessui.com/)     | 완전히 스타일이 없는 접근 가능한 UI 컴포넌트         | MIT        |
|               | [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)   | 유틸리티 우선 CSS 프레임워크                         | MIT        |
|               | [![SASS](https://img.shields.io/badge/SASS-1.89.2-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)                          | CSS 전처리기                                         | MIT        |
| 폼 검증       | [![VeeValidate](https://img.shields.io/badge/VeeValidate-4.15.1-4FC08D?logo=vue.js&logoColor=white)](https://vee-validate.logaretm.com/) | Vue.js용 폼 검증 라이브러리                          | MIT        |
|               | [![Zod](https://img.shields.io/badge/Zod-3.25.76-3E67B1?logo=zod&logoColor=white)](https://zod.dev/)                                  | TypeScript 우선 스키마 검증 라이브러리               | MIT        |
| 비동기 통신   | [![Axios](https://img.shields.io/badge/Axios-1.11.0-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)                      | Promise 기반 HTTP 클라이언트                         | MIT        |
|               | [![MSW](https://img.shields.io/badge/MSW-2.10.5-FF6B6B?logo=msw&logoColor=white)](https://mswjs.io/)                                  | API 모킹 라이브러리                                  | MIT        |
| 개발 도구     | [![ESLint](https://img.shields.io/badge/ESLint-9.32.0-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)                        | JavaScript 린터                                      | MIT        |
|               | [![Prettier](https://img.shields.io/badge/Prettier-3.6.2-F7B93E?logo=prettier&logoColor=black)](https://prettier.io/)                 | 코드 포맷터                                          | MIT        |
|               | [![PostCSS](https://img.shields.io/badge/PostCSS-8.5.6-DD3A0A?logo=postcss&logoColor=white)](https://postcss.org/)                   | CSS 변환 도구                                        | MIT        |
| 테스트        | [![Vitest](https://img.shields.io/badge/Vitest-1.6.1-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)                        | 빠른 단위 테스트 프레임워크                          | MIT        |
|               | [![Vue Test Utils](https://img.shields.io/badge/Vue_Test_Utils-2.4.0-4FC08D?logo=vue.js&logoColor=white)](https://test-utils.vuejs.org/) | Vue 컴포넌트 테스트 유틸리티                         | MIT        |
| 문서화        | [![Storybook](https://img.shields.io/badge/Storybook-8.6.14-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org/)         | UI 컴포넌트 개발 도구                                | MIT        |
| 유틸리티      | [![date-fns](https://img.shields.io/badge/date_fns-3.6.0-770C56)](https://date-fns.org/)                                               | 모듈러 JavaScript 날짜 유틸리티 라이브러리           | MIT        |
|               | [![date-fns-tz](https://img.shields.io/badge/date_fns_tz-3.2.0-770C56)](https://github.com/marnusw/date-fns-tz)                       | 타임존 지원 날짜 유틸리티                            | MIT        |
|               | [![zxcvbn](https://img.shields.io/badge/zxcvbn-4.4.2-000000)](https://github.com/dropbox/zxcvbn)                                       | 비밀번호 강도 측정 라이브러리                        | MIT        |
|               | [![change-case](https://img.shields.io/badge/change_case-5.4.4-000000)](https://github.com/blakeembrey/change-case)                    | 문자열 케이스 변환 유틸리티                          | MIT        |
| 디자인 토큰   | [![Style Dictionary](https://img.shields.io/badge/Style_Dictionary-4.4.0-000000)](https://amzn.github.io/style-dictionary/)             | 디자인 토큰 변환 도구                                | Apache-2.0 |
|               | [![Tokens Studio](https://img.shields.io/badge/Tokens_Studio-2.0.1-000000)](https://tokens.studio/)                                    | Figma 디자인 토큰 플러그인                           | MIT        |
| 모바일        | [![Expo](https://img.shields.io/badge/Expo-53.0.20-000020?logo=expo&logoColor=white)](https://expo.dev/)                               | React Native 개발 플랫폼                             | MIT        |
|               | [![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)                         | 사용자 인터페이스 구축을 위한 JavaScript 라이브러리 | MIT        |
|               | [![React Native](https://img.shields.io/badge/React_Native-0.80.1-61DAFB?logo=react&logoColor=white)](https://reactnative.dev/)       | 모바일 앱 개발 프레임워크                            | MIT        |

---
