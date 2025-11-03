# 📱 모바일 앱 배포 가이드

## 개요

이 프로젝트는 Expo 기반 React Native 앱을 iOS App Store와 Google Play Store에 배포할 수 있도록 설정되어 있습니다.

## 🚀 배포 준비

### 1. Expo 계정 설정

```bash
# Expo CLI 설치
npm install -g @expo/cli

# Expo 계정 로그인
expo login

# 프로젝트 초기화
cd apps/mobile-native
expo init
```

### 2. EAS Build 설정

```bash
# EAS CLI 설치
npm install -g eas-cli

# EAS 프로젝트 초기화
eas build:configure
```

### 3. 환경 변수 설정

`.env` 파일을 생성하고 필요한 환경 변수를 설정합니다:

```env
# Expo 설정
EXPO_PUBLIC_APP_NAME="Vue3 Monorepo Template"
EXPO_PUBLIC_APP_VERSION="1.0.0"

# 웹앱 URL (네트워크 접근용)
WEBAPP_URL=http://192.168.50.187:5173

# API 설정
API_BASE_URL=https://api.example.com
```

## 📦 빌드 프로세스

### Development 빌드 (개발용)

```bash
# Android APK 빌드
pnpm run eas:build:android --profile development

# iOS 빌드 (개발자 계정 필요)
pnpm run eas:build:ios --profile development
```

### Preview 빌드 (테스트용)

```bash
# Android APK 빌드
pnpm run eas:build:android --profile preview

# iOS 빌드
pnpm run eas:build:ios --profile preview
```

### Production 빌드 (배포용)

```bash
# Android App Bundle 빌드
pnpm run eas:build:android --profile production

# iOS 빌드
pnpm run eas:build:ios --profile production
```

## 🏪 스토어 배포

### iOS App Store 배포

1. **Apple Developer 계정 준비**
   - Apple Developer Program 가입
   - App Store Connect에서 앱 생성
   - Bundle ID: `com.template.vue3monorepo`

2. **빌드 및 제출**

   ```bash
   # Production 빌드
   pnpm run eas:build:ios --profile production

   # App Store 제출
   pnpm run eas:submit:ios
   ```

3. **App Store Connect 설정**
   - 앱 정보 입력
   - 스크린샷 및 메타데이터 업로드
   - 심사 제출

### Google Play Store 배포

1. **Google Play Console 준비**
   - Google Play Console 계정 생성
   - 앱 생성 (Package name: `com.template.vue3monorepo`)
   - 서비스 계정 키 생성

2. **빌드 및 제출**

   ```bash
   # Production 빌드
   pnpm run eas:build:android --profile production

   # Play Store 제출
   pnpm run eas:submit:android
   ```

3. **Play Console 설정**
   - 앱 정보 입력
   - 스크린샷 및 메타데이터 업로드
   - 심사 제출

## 🔄 OTA 업데이트

### 개발 중 업데이트

```bash
# 개발 브랜치 업데이트
pnpm run eas:update:preview

# 프로덕션 브랜치 업데이트
pnpm run eas:update:production
```

### 업데이트 확인

앱에서 업데이트를 확인하려면:

```typescript
import * as Updates from 'expo-updates';

// 업데이트 확인
const checkForUpdates = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.log('업데이트 확인 실패:', error);
  }
};
```

## 🛠️ 빌드 최적화

### 1. 번들 크기 최적화

```json
// app.json
{
  "expo": {
    "jsEngine": "hermes",
    "android": {
      "enableProguardInReleaseBuilds": true
    }
  }
}
```

### 2. 이미지 최적화

- 앱 아이콘: 1024x1024 PNG
- 스플래시 스크린: 1242x2436 PNG
- 적응형 아이콘: 1024x1024 PNG

### 3. 성능 모니터링

```bash
# 성능 분석
expo doctor
expo install expo-dev-client
```

## 🔧 문제 해결

### 일반적인 문제들

1. **빌드 실패**

   ```bash
   # 캐시 정리
   expo r -c
   eas build --clear-cache
   ```

2. **서명 오류**

   ```bash
   # 인증서 재생성
   eas credentials
   ```

3. **메모리 부족**
   ```bash
   # 빌드 리소스 클래스 변경
   # eas.json에서 resourceClass 조정
   ```

### 지원

- [Expo 문서](https://docs.expo.dev/)
- [EAS Build 문서](https://docs.expo.dev/build/introduction/)
- [React Native 문서](https://reactnative.dev/)

## 📋 체크리스트

### 배포 전 체크리스트

- [ ] 앱 아이콘 및 스플래시 스크린 설정
- [ ] 앱 이름 및 버전 설정
- [ ] 권한 설정 확인
- [ ] 환경 변수 설정
- [ ] 테스트 완료
- [ ] 스토어 메타데이터 준비
- [ ] 개인정보처리방침 준비

### 배포 후 체크리스트

- [ ] 스토어 심사 상태 확인
- [ ] 앱 다운로드 테스트
- [ ] 주요 기능 동작 확인
- [ ] 크래시 리포트 모니터링
- [ ] 사용자 피드백 수집
