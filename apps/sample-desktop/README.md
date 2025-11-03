## 개요

MODA 데스크톱 애플리케이션입니다.


## 🚀 주요 기능

- **인증 시스템**: 로그인, 회원가입, 비밀번호 재설정
- **거래 관리**: 주문 및 거래 내역 관리
- **자산 관리**: 포트폴리오 및 자산 현황 조회
- **계좌 관리**: 계좌 개설 및 관리
- **고객 지원**: 고객 서비스 및 지원 기능
- **차트 분석**: 실시간 차트 및 기술적 분석
- **마크업**: 마크업 및 레이아웃 테스트

## 🚦 개발 서버 실행

```bash
# 개발 서버 시작
pnpm dev

# 타입 체크
pnpm type-check

# 린트 검사
pnpm lint

# 테스트 실행
pnpm test

# 빌드
pnpm build
```

## 📱 페이지 목록

[마크업 페이지](http://localhost:3000/markup)를 통해 개발된 모든 페이지를 확인하세요.

## 📦 빌드 및 배포

```bash
# 프로덕션 빌드
pnpm build

# 빌드 분석
pnpm build:analyze

# 빌드 미리보기
pnpm preview
```

## 🔧 개발 가이드

### 프로젝트 구조

```
src/
├── components/         # Vue 컴포넌트
├── views/              # 페이지 컴포넌트
├── router/             # 라우터 설정
├── service/            # API 서비스
├── stores/             # Pinia 스토어
├── types/              # 타입 정의
└── assets/             # 정적 자산
```
