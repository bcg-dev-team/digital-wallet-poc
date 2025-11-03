# Mobile Native App

React Native 네이티브 앱 (WebView 기반)

## 설정

### 1. 환경 변수 설정

1. `env.example` 파일을 `.env`로 복사합니다:

```bash
cp env.example .env
```

2. `.env` 파일에서 웹앱 URL을 설정합니다:

```bash
# 개발 환경 - 각자의 로컬 IP 주소 사용
WEBAPP_URL=http://YOUR_LOCAL_IP:5173

# 예시:
# WEBAPP_URL=http://192.168.1.100:5173
# WEBAPP_URL=http://10.0.0.50:5173
```

### 2. 로컬 IP 주소 확인

macOS/Linux:

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Windows:

```bash
ipconfig | findstr "IPv4"
```

### 3. 웹앱 실행

웹앱을 네트워크에서 접근 가능하도록 실행:

```bash
pnpm --filter @template/mobile dev --host
```

### 4. 네이티브 앱 실행

```bash
pnpm --filter @template/mobile-native start
```

## 개발 가이드

### Expo Go 앱 설치

- iOS: App Store에서 "Expo Go" 검색
- Android: Google Play Store에서 "Expo Go" 검색

### QR 코드 스캔

1. Expo 개발 서버가 실행되면 QR 코드가 표시됩니다
2. Expo Go 앱에서 QR 코드를 스캔합니다
3. 네이티브 앱이 로드되고 웹앱이 WebView에 표시됩니다

### 네이티브-웹 통신

- 웹앱에서 네이티브로 메시지 전송 가능
- 네이티브에서 웹앱으로 메시지 전송 가능
- 실시간 양방향 통신 지원

## 문제 해결

### WebView 연결 오류

- 웹앱이 네트워크에서 접근 가능한지 확인
- `.env` 파일의 `WEBAPP_URL`이 올바른지 확인
- 방화벽 설정 확인

### 환경 변수 인식 안됨

- `.env` 파일이 올바른 위치에 있는지 확인
- 앱을 다시 시작 (r 키 누르기)
