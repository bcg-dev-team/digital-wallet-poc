#!/bin/bash

# Vue Inspector 설정 스크립트
# 이 스크립트는 Vue Inspector가 Cursor IDE와 연동되도록 환경을 설정합니다.

set -e

echo "🔧 Vue Inspector 설정을 시작합니다..."

# OS 감지
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Windows;;
    MINGW*)     MACHINE=Windows;;
    MSYS*)      MACHINE=Windows;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo "🖥️  감지된 OS: $MACHINE"

# 1. 홈 디렉토리에 bin 폴더 생성
echo "📁 ~/bin 디렉토리 생성 중..."
mkdir -p ~/bin

# 2. Cursor CLI 경로 찾기
echo "🔍 Cursor CLI 경로를 찾는 중..."

CURSOR_PATHS=()
if [ "$MACHINE" = "Mac" ]; then
    CURSOR_PATHS=(
        "/Applications/Cursor.app/Contents/Resources/app/bin/cursor"
        "/Applications/Cursor.app/Contents/MacOS/Cursor"
        "/usr/local/bin/cursor"
        "$HOME/Applications/Cursor.app/Contents/Resources/app/bin/cursor"
    )
elif [ "$MACHINE" = "Windows" ]; then
    CURSOR_PATHS=(
        "/c/Users/$USER/AppData/Local/Programs/cursor/Cursor.exe"
        "/c/Program Files/Cursor/Cursor.exe"
        "/c/Program Files (x86)/Cursor/Cursor.exe"
        "$HOME/AppData/Local/Programs/cursor/Cursor.exe"
    )
elif [ "$MACHINE" = "Linux" ]; then
    CURSOR_PATHS=(
        "/usr/bin/cursor"
        "/usr/local/bin/cursor"
        "$HOME/.local/bin/cursor"
        "/opt/cursor/cursor"
        "/snap/bin/cursor"
    )
fi

CURSOR_PATH=""
for path in "${CURSOR_PATHS[@]}"; do
    if [ -f "$path" ] || [ -x "$path" ]; then
        CURSOR_PATH="$path"
        echo "✅ Cursor를 찾았습니다: $CURSOR_PATH"
        break
    fi
done

# 3. Cursor를 찾지 못한 경우 사용자에게 경로 입력 요청
if [ -z "$CURSOR_PATH" ]; then
    echo "❌ Cursor를 자동으로 찾을 수 없습니다."
    echo ""
    echo "📋 일반적인 설치 경로:"
    if [ "$MACHINE" = "Mac" ]; then
        echo "  - /Applications/Cursor.app/Contents/Resources/app/bin/cursor"
        echo "  - /Applications/Cursor.app/Contents/MacOS/Cursor"
    elif [ "$MACHINE" = "Windows" ]; then
        echo "  - C:\\Users\\$USER\\AppData\\Local\\Programs\\cursor\\Cursor.exe"
        echo "  - C:\\Program Files\\Cursor\\Cursor.exe"
    elif [ "$MACHINE" = "Linux" ]; then
        echo "  - /usr/bin/cursor"
        echo "  - /usr/local/bin/cursor"
        echo "  - ~/.local/bin/cursor"
    fi
    echo ""
    
    # 인터랙티브 모드에서만 입력 요청
    if [ -t 0 ]; then
        read -p "🔧 Cursor 실행 파일의 전체 경로를 입력해주세요 (Enter로 건너뛰기): " USER_CURSOR_PATH
        if [ -n "$USER_CURSOR_PATH" ] && [ -f "$USER_CURSOR_PATH" ]; then
            CURSOR_PATH="$USER_CURSOR_PATH"
            echo "✅ 사용자 지정 경로를 사용합니다: $CURSOR_PATH"
        fi
    fi
    
    if [ -z "$CURSOR_PATH" ]; then
        echo ""
        echo "⚠️  Cursor를 찾을 수 없어 자동 설정을 건너뜁니다."
        echo "📖 수동 설정 방법:"
        echo "   1. Cursor 설치 확인"
        echo "   2. 다음 명령어로 수동 설정:"
        echo "      ln -sf '<Cursor경로>' ~/bin/cursor"
        echo "      ln -sf ~/bin/cursor ~/bin/code"
        echo ""
        echo "🔄 Cursor 설치 후 이 스크립트를 다시 실행해주세요."
        exit 0
    fi
fi

# 4. Cursor CLI 심볼릭 링크 생성
echo "🔗 Cursor CLI 심볼릭 링크 생성 중..."
ln -sf "$CURSOR_PATH" ~/bin/cursor
echo "✅ cursor 명령어가 ~/bin/cursor에 설정되었습니다."

# 3. code 명령어도 cursor로 연결 (Vue Inspector가 기본적으로 code를 찾기 때문)
echo "🔗 code 명령어를 cursor로 연결 중..."
ln -sf ~/bin/cursor ~/bin/code
echo "✅ code 명령어가 cursor로 연결되었습니다."

# 4. PATH 환경 변수 확인 및 설정 안내
echo "🛠️  환경 변수 설정 확인 중..."
if [[ ":$PATH:" == *":$HOME/bin:"* ]]; then
    echo "✅ ~/bin이 이미 PATH에 포함되어 있습니다."
else
    echo "⚠️  ~/bin이 PATH에 포함되지 않았습니다."
    echo "다음 명령어를 실행하여 PATH에 추가하세요:"
    echo ""
    echo "    echo 'export PATH=\"\$HOME/bin:\$PATH\"' >> ~/.zshrc"
    echo "    source ~/.zshrc"
    echo ""
fi

# 5. 테스트
echo "🧪 설정 테스트 중..."
if command -v cursor &> /dev/null; then
    echo "✅ cursor 명령어가 정상적으로 작동합니다."
else
    echo "❌ cursor 명령어를 찾을 수 없습니다. PATH 설정을 확인해주세요."
fi

if command -v code &> /dev/null; then
    echo "✅ code 명령어가 cursor로 연결되어 있습니다."
else
    echo "❌ code 명령어를 찾을 수 없습니다. PATH 설정을 확인해주세요."
fi

echo ""
echo "🎉 Vue Inspector 설정이 완료되었습니다!"
echo ""
echo "📖 사용법:"
echo "   1. 개발 서버 실행: pnpm run dev"
echo "   2. 브라우저에서 Option/Alt 키를 누른 상태로 Vue 컴포넌트 클릭"
echo "   3. Cursor에서 해당 파일이 자동으로 열립니다"
echo ""
