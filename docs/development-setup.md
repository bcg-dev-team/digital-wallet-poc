# 개발 환경 설정 가이드

## Vue Inspector 설정

개발 환경에서 Vue Inspector를 사용하여 컴포넌트를 클릭해 Cursor 에디터에서 해당 파일을 열 수 있습니다.

### 자동 설정 (권장)

프로젝트 루트에서 OS에 맞는 설정 스크립트를 실행하세요:

```bash
# macOS/Linux
./shared/scripts/setup-vue-inspector.sh

# Windows (Git Bash/WSL)
./shared/scripts/setup-vue-inspector.sh

# Windows (Command Prompt/PowerShell)
shared\scripts\setup-vue-inspector.bat
```

이 스크립트는 다음 작업을 수행합니다:
- Cursor CLI 명령어를 PATH에 추가
- Vue Inspector가 필요로 하는 `code` 명령어 연결
- 환경 변수 설정 확인

### 수동 설정

자동 설정이 작동하지 않는 경우 수동으로 설정하세요:

1. **홈 디렉토리에 bin 폴더 생성**:
   ```bash
   mkdir -p ~/bin
   ```

2. **Cursor CLI 심볼릭 링크 생성**:
   ```bash
   ln -sf /Applications/Cursor.app/Contents/Resources/app/bin/cursor ~/bin/cursor
   ln -sf ~/bin/cursor ~/bin/code
   ```

3. **PATH 환경 변수에 추가**:
   ```bash
   echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
   source ~/.zshrc
   ```

### 사용법

1. **개발 서버 실행**:
   ```bash
   pnpm run dev
   ```

2. **Vue Inspector 사용**:
   - 브라우저에서 개발 서버 접속
   - 맥에서는 `Option`키, 윈도우에서는 `Alt`키를 누른 상태로 Vue 컴포넌트를 클릭
   - Cursor에서 해당 컴포넌트 파일이 자동으로 열립니다

### 특징
- vite-plugin-vue-inspector가 개발 모드에서만 자동으로 활성화됩니다
- 모든 앱 (desktop, mobile, sample-desktop)에서 동일하게 작동합니다
- 프로덕션 빌드에는 포함되지 않습니다

### 테스트
- 개발 서버 실행 후 브라우저에서 `Option/Alt` + 클릭으로 컴포넌트 파일이 열리는지 확인
- 터미널에서 "Vue Inspector: Press Alt in App to toggle the Inspector" 메시지 확인

## 기타 개발 환경 설정

### 필수 도구
- Node.js 18+
- pnpm
- Cursor IDE

### 권장 브라우저 확장 프로그램
- Vue.js devtools
- React Developer Tools (React 프로젝트인 경우)

### 환경 변수 설정
```bash
# .env.development 파일 생성
cp .env.example .env.development
```

## 문제 해결

### Vue Inspector가 작동하지 않는 경우

1. **설정 스크립트 실행**:
   ```bash
   ./shared/scripts/setup-vue-inspector.sh
   ```

2. **개발 모드 확인**:
   - `pnpm run dev`로 실행하고 있는지 확인
   - 터미널에서 "Vue Inspector: Press Alt in App to toggle the Inspector" 메시지 확인

3. **사용법 확인**:
   - `Option/Alt` 키를 누른 상태로 클릭하고 있는지 확인
   - 마우스를 컴포넌트 위에 올렸을 때 하이라이트가 나타나는지 확인

4. **환경 변수 확인**:
   ```bash
   which cursor  # ~/bin/cursor가 출력되어야 함
   which code    # ~/bin/code가 출력되어야 함
   echo $PATH    # $HOME/bin이 포함되어야 함
   ```

5. **터미널 에러 확인**:
   - 개발 서버 터미널에서 "spawn cursor ENOENT" 또는 "spawn code ENOENT" 에러가 있는지 확인
   - 에러가 있다면 설정 스크립트를 다시 실행

6. **브라우저 콘솔 확인**:
   - 개발자 도구에서 JavaScript 에러가 있는지 확인

### 기타 문제
- 팀 리드에게 문의하거나 이슈를 생성해주세요 