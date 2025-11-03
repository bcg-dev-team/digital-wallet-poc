#!/usr/bin/env tsx

/**
 * 모노레포 빌드 순서 제어 스크립트
 * 순환참조를 방지하기 위해 의존성 순서대로 빌드
 * Windows와 Mac에서 모두 동작하도록 cross-platform 구현
 */

import { existsSync, rmSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

// 빌드 순서 정의 (의존성 순서)
const BUILD_ORDER = [
  'packages/types', // 기반 패키지
  'packages/theme', // types에 의존
  'packages/utils', // types에 의존
  'packages/api', // types, utils에 의존
  'packages/ui', // types, theme에 의존
  'apps/desktop', // 모든 패키지 사용
  'apps/mobile', // 모든 패키지 사용
  'apps/mobile-native', // React Native 앱 (WebView 기반)
  'apps/sample-desktop', // 모든 패키지 사용
] as const;

// 의존성 그래프 정의
const DEPENDENCY_GRAPH = {
  'packages/types': [],
  'packages/theme': ['packages/types'],
  'packages/utils': ['packages/types'],
  'packages/api': ['packages/types', 'packages/utils'],
  'packages/ui': ['packages/types', 'packages/theme'],
  'apps/desktop': [
    'packages/types',
    'packages/utils',
    'packages/api',
    'packages/ui',
    'packages/theme',
  ],
  'apps/sample-desktop': [
    'packages/types',
    'packages/utils',
    'packages/api',
    'packages/ui',
    'packages/theme',
  ],
  'apps/mobile': [
    'packages/types',
    'packages/utils',
    'packages/api',
    'packages/ui',
    'packages/theme',
  ],
  'apps/mobile-native': ['packages/types', 'packages/utils', 'packages/api', 'packages/theme'],
} as const;

// 타입 정의
type PackagePath = (typeof BUILD_ORDER)[number];

// 빌드 옵션 인터페이스
interface BuildOptions {
  skipApiGeneration: boolean;
  skipTokensGeneration: boolean;
  skipCircularCheck: boolean;
  skipIconOptimization: boolean;
  buildApps: 'sample-desktop' | 'sample-mobile' | 'sample-all' | 'all';
}

/**
 * 사용자에게 yes/no 질문하기
 * Enter 키를 누르면 기본값(defaultValue)으로 처리
 */
function askQuestion(question: string, defaultValue: boolean = true): Promise<boolean> {
  const defaultText = defaultValue ? 'Y/n' : 'y/N';
  process.stdout.write(`${question} (${defaultText}): `);

  return new Promise((resolve) => {
    // raw mode로 설정하여 키 하나만 입력받기
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    process.stdin.resume();

    const onData = (buffer: Buffer) => {
      const key = buffer.toString('utf8');

      // Ctrl+C 처리
      if (key === '\u0003') {
        process.stdout.write('\n');
        process.exit(0);
      }

      // Enter 키 (기본값)
      if (key === '\r' || key === '\n') {
        process.stdout.write('\n');
        cleanup();
        resolve(defaultValue);
        return;
      }

      const normalized = key.toLowerCase();

      // y 또는 n만 허용
      if (normalized === 'y' || normalized === 'n') {
        process.stdout.write(key + '\n');
        cleanup();
        resolve(normalized === 'y');
        return;
      }

      // 다른 키는 무시
    };

    const cleanup = () => {
      process.stdin.removeListener('data', onData);
      process.stdin.pause();
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
    };

    process.stdin.on('data', onData);
  });
}

/**
 * 사용자에게 선택지를 제공하는 질문 (숫자 키 하나만 눌러도 진행)
 */
function askChoice<T extends string>(
  question: string,
  choices: Array<{ value: T; label: string }>,
  defaultValue: T
): Promise<T> {
  console.log(question);
  choices.forEach((choice, index) => {
    const isDefault = choice.value === defaultValue;
    const marker = isDefault ? '>' : ' ';
    console.log(`${marker} ${index + 1}. ${choice.label}${isDefault ? ' (기본)' : ''}`);
  });

  process.stdout.write(`선택 (1-${choices.length}, Enter=기본값): `);

  return new Promise((resolve) => {
    // raw mode로 설정하여 키 하나만 입력받기
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }
    process.stdin.resume();

    const onData = (buffer: Buffer) => {
      const key = buffer.toString('utf8');

      // Ctrl+C 처리
      if (key === '\u0003') {
        process.stdout.write('\n');
        process.exit(0);
      }

      // Enter 키 (기본값)
      if (key === '\r' || key === '\n') {
        process.stdout.write('\n');
        cleanup();
        resolve(defaultValue);
        return;
      }

      // 숫자 키 체크
      const choiceNum = parseInt(key, 10);
      if (!isNaN(choiceNum) && choiceNum >= 1 && choiceNum <= choices.length) {
        process.stdout.write(key + '\n');
        cleanup();
        resolve(choices[choiceNum - 1].value);
        return;
      }

      // 잘못된 키는 무시
    };

    const cleanup = () => {
      process.stdin.removeListener('data', onData);
      process.stdin.pause();
      if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
      }
    };

    process.stdin.on('data', onData);
  });
}

/**
 * 인터랙티브 모드: 빌드 옵션 선택
 */
async function getBuildOptions(): Promise<BuildOptions> {
  console.log('\n📋 빌드 옵션을 선택하세요:');
  console.log('   (Enter 키를 누르면 기본값이 선택됩니다)\n');

  const skipApiGeneration = await askQuestion('API 자동 생성을 스킵하시겠습니까?', true);
  const skipTokensGeneration = await askQuestion('Design Tokens 생성을 스킵하시겠습니까?', true);
  const skipIconOptimization = await askQuestion('아이콘 최적화를 스킵하시겠습니까?', true);
  const skipCircularCheck = await askQuestion('순환참조 검사를 스킵하시겠습니까?', true);

  console.log('');
  const buildApps = await askChoice(
    '어떤 앱을 빌드하시겠습니까?',
    [
      { value: 'sample-desktop', label: 'sample-desktop만' },
      { value: 'sample-mobile', label: 'sample-desktop + mobile' },
      { value: 'sample-all', label: 'sample-desktop + mobile + desktop' },
      { value: 'all', label: '모든 앱 (sample-desktop + mobile + desktop)' },
    ],
    'sample-desktop'
  );

  console.log('\n⚠️  참고: mobile-native 앱은 별도로 빌드해야 합니다.');
  console.log('   실행: pnpm mobile:build:android 또는 pnpm mobile:build:ios\n');

  console.log('✅ 빌드 옵션 설정 완료!\n');

  return {
    skipApiGeneration,
    skipTokensGeneration,
    skipIconOptimization,
    skipCircularCheck,
    buildApps,
  };
}

/**
 * Cross-platform 대기 함수
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Cross-platform 디렉토리 삭제
 */
function removeDirectory(dirPath: string): void {
  try {
    rmSync(dirPath, { recursive: true, force: true });
  } catch (error) {
    // 디렉토리가 이미 존재하지 않는 경우 무시
    if (error instanceof Error && !error.message.includes('ENOENT')) {
      throw error;
    }
  }
}

/**
 * Cross-platform 파일 목록 가져오기
 */
function getDirectoryContents(dirPath: string): string {
  try {
    const files = readdirSync(dirPath, { withFileTypes: true });
    return files
      .map((dirent) => {
        const type = dirent.isDirectory() ? 'd' : '-';
        const name = dirent.name;
        return `${type} ${name}`;
      })
      .join('\n');
  } catch (error) {
    return `Error reading directory: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

/**
 * Cross-platform 명령어 실행
 */
function executeCommand(command: string, options: { cwd?: string; stdio?: any } = {}): void {
  const isWindows = process.platform === 'win32';

  // Windows에서 명령어 처리
  if (isWindows) {
    // npx 명령어 처리
    if (command.startsWith('npx ')) {
      command = command.replace('npx ', 'npx.cmd ');
    }
    // pnpm 명령어 처리
    if (command.startsWith('pnpm ')) {
      command = command.replace('pnpm ', 'pnpm.cmd ');
    }
  }

  try {
    execSync(command, options);
  } catch (error) {
    if (isWindows && error instanceof Error) {
      if (error.message.includes('ENOENT')) {
        console.error(`❌ Windows에서 명령어를 찾을 수 없습니다: ${command}`);
        console.error('💡 해결 방법:');
        console.error('   1. Node.js가 올바르게 설치되었는지 확인');
        console.error('   2. pnpm이 전역으로 설치되었는지 확인: npm install -g pnpm');
        console.error('   3. PATH 환경변수에 Node.js와 pnpm이 포함되어 있는지 확인');
      }
      if (error.message.includes('EACCES')) {
        console.error('❌ 권한 부족. 관리자 권한으로 실행해주세요.');
      }
      if (error.message.includes('ENAMETOOLONG')) {
        console.error('❌ 경로가 너무 깁니다. 더 짧은 경로를 사용해주세요.');
      }
    }
    throw error;
  }
}

/**
 * 패키지가 존재하는지 확인
 */
function packageExists(packagePath: string): boolean {
  return existsSync(join(process.cwd(), packagePath, 'package.json'));
}

/**
 * 패키지가 빌드되었는지 확인
 */
function isPackageBuilt(packagePath: string): boolean {
  const distPath = join(process.cwd(), packagePath, 'dist');

  if (!existsSync(distPath)) {
    return false;
  }

  // types 패키지는 index.d.ts 체크
  if (packagePath === 'packages/types') {
    return existsSync(join(distPath, 'index.d.ts'));
  }

  // ui 패키지는 dist 기반: index.js, index.d.ts 모두 체크
  if (packagePath === 'packages/ui') {
    return existsSync(join(distPath, 'index.js')) && existsSync(join(distPath, 'index.d.ts'));
  }

  // theme 패키지는 ESM 기준: index.js, index.d.ts 모두 체크
  if (packagePath === 'packages/theme') {
    return existsSync(join(distPath, 'index.js')) && existsSync(join(distPath, 'index.d.ts'));
  }

  // utils, api 패키지는 index.js 체크
  if (packagePath === 'packages/utils' || packagePath === 'packages/api') {
    return existsSync(join(distPath, 'index.js'));
  }

  // React Native 앱은 빌드 체크 제외 (Expo 빌드는 별도 프로세스)
  if (packagePath === 'apps/mobile-native') {
    return true; // React Native 앱은 별도 빌드 프로세스이므로 항상 성공으로 처리
  }

  // 앱 패키지인 경우 index.html 확인
  if (packagePath.startsWith('apps/')) {
    return existsSync(join(distPath, 'index.html'));
  }

  // 기본값: index.js
  return existsSync(join(distPath, 'index.js'));
}

/**
 * 의존성 순환참조 검사
 */
function checkCircularDependencies(skip: boolean = false): void {
  if (skip) {
    console.log('⏭️  순환참조 검사 스킵됨');
    return;
  }

  console.log('🔍 순환참조 검사 중...');

  try {
    // madge가 설치되어 있는지 확인
    try {
      executeCommand('npx madge --version', { stdio: 'pipe' });
    } catch {
      console.log('📦 madge 설치 중...');
      executeCommand('pnpm add -D madge', { stdio: 'inherit' });
    }

    executeCommand(
      'npx madge --circular packages/ --exclude "storybook-static,dist,node_modules,coverage" --extensions js,ts,vue',
      {
        stdio: 'inherit',
      }
    );
    console.log('✅ 순환참조 없음');
  } catch (error) {
    console.error('❌ 순환참조 발견!');
    console.error('💡 해결 방법:');
    console.error('   1. packages/ 디렉토리의 import 문을 확인하세요');
    console.error('   2. 순환참조가 있는 패키지들을 분리하세요');
    console.error('   3. 인터페이스를 통해 의존성을 역전시키세요');
    process.exit(1);
  }
}

/**
 * 패키지 빌드
 */
async function buildPackage(packagePath: PackagePath, options: BuildOptions): Promise<void> {
  console.log(`📦 빌드 중: ${packagePath}`);

  try {
    // React Native 앱은 별도 빌드 프로세스
    if (packagePath === 'apps/mobile-native') {
      console.log(`✅ React Native 앱 빌드 건너뜀 (Expo 빌드는 별도 프로세스)`);
      return;
    }

    // packages/theme 패키지의 경우 토큰 생성 스킵 옵션 적용
    if (packagePath === 'packages/theme' && options.skipTokensGeneration) {
      // 토큰 파일들이 존재하는지 확인
      const tokenFiles = [
        join(process.cwd(), packagePath, 'src/styles/__tokens-light.css'),
        join(process.cwd(), packagePath, 'src/styles/__tokens-dark.css'),
        join(process.cwd(), packagePath, 'tailwind.config.cjs'),
      ];

      const tokensExist = tokenFiles.every((file) => existsSync(file));

      if (tokensExist) {
        console.log('⏭️  Design Tokens 생성 스킵됨, 기존 토큰 파일 사용하여 TypeScript만 빌드');

        // dist 폴더만 정리하고 토큰 생성 없이 빌드
        const distPath = join(process.cwd(), packagePath, 'dist');
        if (existsSync(distPath)) {
          console.log(`🗑️  ${packagePath} dist 폴더 삭제 중...`);
          removeDirectory(distPath);
        }

        // 토큰 생성 없이 TypeScript만 빌드
        executeCommand('pnpm run build:skip-tokens', {
          cwd: join(process.cwd(), packagePath),
          stdio: 'inherit',
        });

        console.log(`✅ 빌드 완료: ${packagePath}`);
        return;
      } else {
        console.log(
          '⚠️  토큰 파일이 없어서 토큰 생성 없이 빌드할 수 없습니다. 전체 빌드를 수행합니다.'
        );
      }
    }

    // 빌드 전 dist 폴더 정리 (types 패키지는 제외)
    console.log(`🔍 ${packagePath} 빌드 전 dist 폴더 상태 확인...`);
    const distPath = join(process.cwd(), packagePath, 'dist');
    if (process.platform === 'win32' && distPath.length > 240) {
      console.warn(
        '⚠️  Windows 경로가 260자에 근접합니다. 경로가 너무 길면 빌드가 실패할 수 있습니다.'
      );
    }
    if (packagePath !== 'packages/types') {
      if (existsSync(distPath)) {
        console.log(`🗑️  ${packagePath} dist 폴더 삭제 중...`);
        removeDirectory(distPath);
      }
    } else {
      console.log(`✅ ${packagePath} dist 폴더 삭제 건너뜀`);
    }

    executeCommand('pnpm build', {
      cwd: join(process.cwd(), packagePath),
      stdio: 'inherit',
    });

    // 빌드 결과 확인 (파일 시스템 동기화 대기)
    const maxRetries = 10;
    let retryCount = 0;
    const waitTime = process.platform === 'win32' ? 200 : 100;
    while (!isPackageBuilt(packagePath) && retryCount < maxRetries) {
      await sleep(waitTime); // Windows에서 더 오래 대기
      retryCount++;
    }

    if (!isPackageBuilt(packagePath)) {
      // dist 폴더 내 실제 파일 목록 출력
      const distPath = join(process.cwd(), packagePath, 'dist');
      let fileList = '';
      if (existsSync(distPath)) {
        fileList = getDirectoryContents(distPath);
      }
      console.error('❌ 빌드 산출물이 생성되지 않았습니다.');
      if (process.platform === 'win32' && distPath.length > 240) {
        console.error(
          '⚠️  Windows 경로가 260자에 근접합니다. 경로가 너무 길면 빌드가 실패할 수 있습니다.'
        );
      }
      throw new Error(
        `빌드 산출물이 생성되지 않았습니다: ${packagePath}/dist/index.js, index.d.ts\n실제 dist 폴더 파일 목록:\n${fileList}`
      );
    }

    console.log(`✅ 빌드 완료: ${packagePath}`);
  } catch (error) {
    if (process.platform === 'win32' && error instanceof Error) {
      if (error.message.includes('EACCES')) {
        console.error('❌ 권한 부족. 관리자 권한으로 실행해주세요.');
      }
      if (error.message.includes('ENAMETOOLONG')) {
        console.error('❌ 경로가 너무 깁니다. 더 짧은 경로를 사용해주세요.');
      }
    }
    console.error(`❌ 빌드 실패: ${packagePath}`);
    console.error(`💡 오류 내용: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    console.error('💡 해결 방법:');
    console.error('   1. 해당 패키지의 의존성이 올바르게 설치되었는지 확인');
    console.error('   2. TypeScript 설정을 확인');
    console.error('   3. 빌드 스크립트가 올바르게 정의되었는지 확인');
    process.exit(1);
  }
}

/**
 * 의존성 체크
 */
function checkDependencies(packagePath: PackagePath): void {
  const dependencies = DEPENDENCY_GRAPH[packagePath];

  for (const dep of dependencies) {
    if (!packageExists(dep)) {
      console.error(`❌ 의존성 누락: ${packagePath} → ${dep}`);
      console.error(`💡 해결 방법: ${dep} 패키지를 생성하거나 의존성에서 제거하세요`);
      process.exit(1);
    }

    // 의존 패키지가 빌드되었는지 확인
    if (!isPackageBuilt(dep)) {
      console.error(`❌ 의존 패키지 미빌드: ${packagePath} → ${dep}`);
      console.error(`💡 해결 방법: ${dep} 패키지를 먼저 빌드하세요`);
      process.exit(1);
    }
  }
}

/**
 * 빌드 가능한 패키지 필터링
 */
function getBuildablePackages(appSelection: BuildOptions['buildApps']): PackagePath[] {
  const allPackages = BUILD_ORDER.filter((packagePath) => packageExists(packagePath));

  // 앱 선택에 따라 필터링
  const appsToExclude: string[] = [];

  switch (appSelection) {
    case 'sample-desktop':
      // sample-desktop만 빌드
      appsToExclude.push('apps/desktop', 'apps/mobile', 'apps/mobile-native');
      break;
    case 'sample-mobile':
      // sample-desktop + mobile
      appsToExclude.push('apps/desktop', 'apps/mobile-native');
      break;
    case 'sample-all':
      // sample-desktop + mobile + desktop
      appsToExclude.push('apps/mobile-native');
      break;
    case 'all':
      // 모든 앱 (mobile-native 제외)
      appsToExclude.push('apps/mobile-native');
      break;
  }

  return allPackages.filter((pkg) => !appsToExclude.includes(pkg));
}

/**
 * API 자동 생성
 */
function generateApiClient(skip: boolean = false): void {
  if (skip) {
    console.log('⏭️  API 자동 생성 스킵됨\n');
    return;
  }

  console.log('🔄 API 자동 생성 중...');

  try {
    executeCommand('pnpm run generate:api', {
      stdio: 'inherit',
    });
    console.log('✅ API 자동 생성 완료!\n');
  } catch (error) {
    console.error(
      '❌ API 자동 생성 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류'
    );
    console.error('💡 swagger.json 파일이 있는지 확인하세요\n');
    process.exit(1);
  }
}

/**
 * 아이콘 최적화
 */
function optimizeIcons(skip: boolean = false): void {
  if (skip) {
    console.log('⏭️  아이콘 최적화 스킵됨\n');
    return;
  }

  console.log('🎨 아이콘 최적화 중...');

  try {
    executeCommand('pnpm run optimize-icons', {
      stdio: 'inherit',
    });
    console.log('✅ 아이콘 최적화 완료!\n');
  } catch (error) {
    console.error(
      '❌ 아이콘 최적화 실패:',
      error instanceof Error ? error.message : '알 수 없는 오류'
    );
    console.error('💡 packages/ui/src/assets/icons 폴더를 확인하세요\n');
    // 아이콘 최적화는 필수가 아니므로 경고만 출력하고 계속 진행
    console.log('⚠️  아이콘 최적화 없이 빌드를 계속합니다.\n');
  }
}

/**
 * 메인 빌드 프로세스
 */
async function main(): Promise<void> {
  console.log('🚀 모노레포 빌드 시작...\n');

  // CLI 인자 확인: --interactive 또는 -i 플래그가 있으면 인터랙티브 모드
  const isInteractive = process.argv.includes('--interactive') || process.argv.includes('-i');

  // 빌드 옵션 결정
  let options: BuildOptions;

  if (isInteractive) {
    // 인터랙티브 모드: 사용자에게 물어보기
    options = await getBuildOptions();
  } else {
    // 기본 모드: 모든 작업 수행
    options = {
      skipApiGeneration: false,
      skipTokensGeneration: false,
      skipIconOptimization: false,
      skipCircularCheck: false,
      buildApps: 'all', // 기본값: 모든 앱 빌드 (mobile-native 제외)
    };
  }

  // API 자동 생성
  generateApiClient(options.skipApiGeneration);

  // 아이콘 최적화
  optimizeIcons(options.skipIconOptimization);

  // 빌드 가능한 패키지 확인
  const buildablePackages = getBuildablePackages(options.buildApps);

  if (buildablePackages.length === 0) {
    console.error('❌ 빌드할 패키지가 없습니다.');
    console.error('💡 packages/ 또는 apps/ 디렉토리에 package.json이 있는지 확인하세요');
    process.exit(1);
  }

  console.log(`💡 빌드 대상 패키지: ${buildablePackages.join(', ')}\n`);

  // 순환참조 검사
  checkCircularDependencies(options.skipCircularCheck);

  // 순서대로 빌드
  for (const packagePath of buildablePackages) {
    // 의존성 체크
    checkDependencies(packagePath);

    // 패키지 빌드
    await buildPackage(packagePath, options);
    console.log('');
  }

  console.log('✅ 모든 패키지 빌드 완료!');
  console.log('📊 빌드된 패키지:');
  buildablePackages.forEach((pkg) => {
    console.log(`   ✅ ${pkg}`);
  });

  console.log('\n💡 참고사항:');
  console.log('   - mobile-native 앱은 별도로 빌드해야 합니다.');
  console.log('   - Android: pnpm mobile:build:android');
  console.log('   - iOS: pnpm mobile:build:ios');
}

// 스크립트 실행
// tsx 환경에서 import.meta.url === `file://${process.argv[1]}` 가 false가 될 수 있으므로, 항상 main()을 실행하도록 수정
(async () => {
  try {
    await main();
  } catch (error) {
    console.error('❌ 빌드 프로세스 실패:', error);
    process.exit(1);
  }
})();
