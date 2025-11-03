@echo off
REM Vue Inspector 설정 스크립트 (Windows용)
REM 이 스크립트는 Vue Inspector가 Cursor IDE와 연동되도록 환경을 설정합니다.

echo 🔧 Vue Inspector 설정을 시작합니다...
echo 🖥️  OS: Windows

REM 1. 사용자 bin 디렉토리 생성
echo 📁 %USERPROFILE%\bin 디렉토리 생성 중...
if not exist "%USERPROFILE%\bin" mkdir "%USERPROFILE%\bin"

REM 2. Cursor 경로 찾기
echo 🔍 Cursor 경로를 찾는 중...

set CURSOR_PATH=
set "CURSOR_PATHS[0]=%USERPROFILE%\AppData\Local\Programs\cursor\Cursor.exe"
set "CURSOR_PATHS[1]=%ProgramFiles%\Cursor\Cursor.exe"
set "CURSOR_PATHS[2]=%ProgramFiles(x86)%\Cursor\Cursor.exe"
set "CURSOR_PATHS[3]=C:\Users\%USERNAME%\AppData\Local\Programs\cursor\Cursor.exe"

for /L %%i in (0,1,3) do (
    call set "path=%%CURSOR_PATHS[%%i]%%"
    if exist "!path!" (
        set "CURSOR_PATH=!path!"
        echo ✅ Cursor를 찾았습니다: !CURSOR_PATH!
        goto :found
    )
)

REM 3. Cursor를 찾지 못한 경우
echo ❌ Cursor를 자동으로 찾을 수 없습니다.
echo.
echo 📋 일반적인 설치 경로:
echo   - %USERPROFILE%\AppData\Local\Programs\cursor\Cursor.exe
echo   - %ProgramFiles%\Cursor\Cursor.exe
echo   - %ProgramFiles(x86)%\Cursor\Cursor.exe
echo.
set /p USER_CURSOR_PATH="🔧 Cursor 실행 파일의 전체 경로를 입력해주세요 (Enter로 건너뛰기): "
if not "%USER_CURSOR_PATH%"=="" (
    if exist "%USER_CURSOR_PATH%" (
        set "CURSOR_PATH=%USER_CURSOR_PATH%"
        echo ✅ 사용자 지정 경로를 사용합니다: %CURSOR_PATH%
        goto :found
    )
)

echo.
echo ⚠️  Cursor를 찾을 수 없어 자동 설정을 건너뜁니다.
echo 📖 수동 설정 방법:
echo    1. Cursor 설치 확인
echo    2. 환경 변수 PATH에 Cursor 경로 추가
echo    3. 또는 cursor.bat 파일을 %USERPROFILE%\bin에 생성
echo.
echo 🔄 Cursor 설치 후 이 스크립트를 다시 실행해주세요.
pause
exit /b 0

:found
REM 4. Cursor 배치 파일 생성
echo 🔗 Cursor 배치 파일 생성 중...
echo @echo off > "%USERPROFILE%\bin\cursor.bat"
echo "%CURSOR_PATH%" %%* >> "%USERPROFILE%\bin\cursor.bat"
echo ✅ cursor.bat이 %USERPROFILE%\bin에 생성되었습니다.

REM 5. code 명령어도 cursor로 연결
echo 🔗 code.bat을 cursor로 연결 중...
copy "%USERPROFILE%\bin\cursor.bat" "%USERPROFILE%\bin\code.bat" >nul
echo ✅ code.bat이 cursor로 연결되었습니다.

REM 6. PATH 환경 변수 확인
echo 🛠️  환경 변수 설정 확인 중...
echo %PATH% | find /i "%USERPROFILE%\bin" >nul
if %errorlevel% equ 0 (
    echo ✅ %USERPROFILE%\bin이 이미 PATH에 포함되어 있습니다.
) else (
    echo ⚠️  %USERPROFILE%\bin이 PATH에 포함되지 않았습니다.
    echo 다음 중 하나의 방법으로 PATH에 추가하세요:
    echo.
    echo 방법 1: 시스템 환경 변수 설정
    echo   1. Win + R → sysdm.cpl 실행
    echo   2. 고급 탭 → 환경 변수
    echo   3. 사용자 변수의 Path에 %USERPROFILE%\bin 추가
    echo.
    echo 방법 2: PowerShell로 추가
    echo   [Environment]::SetEnvironmentVariable("Path", $env:Path + ";%USERPROFILE%\bin", "User")
    echo.
)

REM 7. 테스트
echo 🧪 설정 테스트 중...
where cursor >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ cursor 명령어가 정상적으로 작동합니다.
) else (
    echo ❌ cursor 명령어를 찾을 수 없습니다. PATH 설정을 확인해주세요.
)

where code >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ code 명령어가 cursor로 연결되어 있습니다.
) else (
    echo ❌ code 명령어를 찾을 수 없습니다. PATH 설정을 확인해주세요.
)

echo.
echo 🎉 Vue Inspector 설정이 완료되었습니다!
echo.
echo 📖 사용법:
echo    1. 개발 서버 실행: pnpm run dev
echo    2. 브라우저에서 Alt 키를 누른 상태로 Vue 컴포넌트 클릭
echo    3. Cursor에서 해당 파일이 자동으로 열립니다
echo.
pause
