// 1. Style Dictionary 및 변환기 등록
import { makeSdTailwindConfig } from 'sd-tailwindcss-transformer';
import { register } from '@tokens-studio/sd-transforms';
import { readFile, writeFile } from 'fs/promises';
import StyleDictionary from 'style-dictionary';
import { kebabCase } from 'change-case';

register(StyleDictionary);

// 2. 토큰 분리 및 CSS 변수/JSON 생성
async function buildTheme(themeKey, jsonOut, cssOut) {
  const tokens = JSON.parse(await readFile('src/tokens/__tokens.json', 'utf-8'));
  const themeTokens = tokens[themeKey];
  if (!themeTokens) throw new Error(`${themeKey} 토큰이 존재하지 않습니다.`);
  await writeFile(jsonOut, JSON.stringify(themeTokens, null, 2), 'utf-8');

  // 2-1. Style Dictionary로 CSS/JSON 변환
  const sd = new StyleDictionary({
    source: [jsonOut],
    preprocessors: ['tokens-studio'],
    platforms: {
      json: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        files: [
          {
            destination: jsonOut.replace('.json', '-transformed.json'),
            format: 'json',
          },
        ],
      },
      css: {
        transformGroup: 'tokens-studio',
        transforms: ['name/kebab'],
        buildPath: './src/styles/',
        files: [
          {
            destination: cssOut,
            format: 'css/variables',
            options: { outputReferences: true },
          },
        ],
      },
    },
  });
  await sd.hasInitialized;
  await sd.cleanAllPlatforms();
  await sd.buildAllPlatforms();
}

// 3. CSS 변수 파일의 :root를 테마 셀렉터로 패치
async function patchThemeSelector(cssPath, theme) {
  const content = await readFile(cssPath, 'utf-8');
  const patched = content.replace(/:root\s*{/, `:root[data-theme=\"${theme}\"] {`);
  await writeFile(cssPath, patched, 'utf-8');
}

// 3-1. z-index CSS 변수 추가
async function addZIndexVariables(cssPath) {
  const content = await readFile(cssPath, 'utf-8');

  // z-index 변수들을 추가할 위치 찾기 (마지막 } 직전)
  const lastBraceIndex = content.lastIndexOf('}');
  if (lastBraceIndex === -1) {
    console.warn('CSS 파일에서 닫는 괄호를 찾을 수 없습니다.');
    return;
  }

  // MUI z-index 값을 참고한 계층 구조
  // 참고: https://mui.com/material-ui/customization/z-index/
  /*
   * z-index 계층 구조 상세 설명:
   * - base (0): 기본 레이어, 일반 콘텐츠
   * - dropdown (100): 드롭다운 메뉴, 셀렉트 박스
   * - sticky (200): 스티키 헤더, 고정 요소
   * - overlay (300): 배경 오버레이, 배경 딤
   * - fab (1050): Floating Action Button, 플로팅 버튼
   * - speed-dial (1050): Speed Dial, 빠른 액션 메뉴
   * - app-bar (1100): App Bar, 네비게이션 바, 헤더
   * - drawer (1200): Sidebar, Drawer, 사이드 패널
   * - modal (1300): Modal, Dialog, 팝업 창
   * - snackbar (1400): Toast, Notification, 알림 메시지
   * - tooltip (1500): Tooltip, Popover, 툴팁
   * - max (9999): 최대값, 긴급 상황용
   *
   * MUI z-index 가이드라인:
   * - 각 계층은 50 단위로 구분하여 충분한 여유 공간 확보
   * - 모바일 stepper: 1000, fab: 1050, app bar: 1100
   * - drawer: 1200, modal: 1300, snackbar: 1400, tooltip: 1500
   * - 개별 값 변경 시 전체 계층 구조 재검토 필요
   */
  const zIndexVariables = `
  --z-index-base: 0;
  --z-index-dropdown: 100;
  --z-index-sticky: 200;
  --z-index-overlay: 300;
  --z-index-fab: 1050;
  --z-index-speed-dial: 1050;
  --z-index-app-bar: 1100;
  --z-index-drawer: 1200;
  --z-index-modal: 1300;
  --z-index-toast: 1400;
  --z-index-snackbar: 1400;
  --z-index-tooltip: 1500;
  --z-index-max: 9999;
`;

  // 마지막 } 직전에 z-index 변수들 삽입
  const updatedContent =
    content.slice(0, lastBraceIndex) + zIndexVariables + content.slice(lastBraceIndex);
  await writeFile(cssPath, updatedContent, 'utf-8');
  console.log('✅ z-index CSS 변수 추가 완료');
}

// 4. 전체 빌드 실행
async function run() {
  // 4-1. 라이트/다크 토큰 분리 및 CSS/JSON 생성
  await buildTheme('Theme/Light', './__light-tokens.json', '__tokens-light.css');
  await patchThemeSelector('src/styles/__tokens-light.css', 'light');
  await addZIndexVariables('src/styles/__tokens-light.css');

  await buildTheme('Theme/Dark', './__dark-tokens.json', '__tokens-dark.css');
  await patchThemeSelector('src/styles/__tokens-dark.css', 'dark');
  await addZIndexVariables('src/styles/__tokens-dark.css');

  // 4-2. Tailwind config 자동 생성
  const sdConfig = makeSdTailwindConfig({
    type: 'all',
    isVariables: true,
    formatType: 'cjs',
    source: ['__light-tokens-transformed.json'],
    buildPath: './',
    transforms: ['attribute/cti', 'name/kebab'],
    tailwind: {
      content: [
        './src/**/*.{vue,js,ts,jsx,tsx}',
        '../../packages/**/*.{vue,js,ts,jsx,tsx}',
        '../../apps/**/*.{vue,js,ts,jsx,tsx}',
      ],
      darkMode: 'class',
    },
  });

  const styleDictionaryTailwind = new StyleDictionary(sdConfig);
  await styleDictionaryTailwind.hasInitialized;
  await styleDictionaryTailwind.buildAllPlatforms();

  console.log('✅ Tailwind config 및 CSS 변수 파일(라이트/다크) 생성 완료!');

  // 5. Tailwind config 후처리: 공식 분류만 남기고 재구성
  try {
    const configPath = './tailwind.config.cjs';
    let content = await readFile(configPath, 'utf-8');
    // module.exports = ... 부분만 추출
    const configMatch = content.match(/module\.exports\s*=\s*(\{[\s\S]*\});?/);
    if (!configMatch) throw new Error('config 객체를 찾을 수 없습니다.');
    const configObj = eval('(' + configMatch[1] + ')');

    // z-index 설정을 theme.extend에 추가
    if (!configObj.theme) configObj.theme = {};
    if (!configObj.theme.extend) configObj.theme.extend = {};

    configObj.theme.extend.zIndex = {
      base: 'var(--z-index-base, 0)',
      dropdown: 'var(--z-index-dropdown, 100)',
      sticky: 'var(--z-index-sticky, 200)',
      overlay: 'var(--z-index-overlay, 300)',
      fab: 'var(--z-index-fab, 1050)',
      'speed-dial': 'var(--z-index-speed-dial, 1050)',
      'app-bar': 'var(--z-index-app-bar, 1100)',
      drawer: 'var(--z-index-drawer, 1200)',
      modal: 'var(--z-index-modal, 1300)',
      toast: 'var(--z-index-toast, 1400)',
      snackbar: 'var(--z-index-snackbar, 1400)',
      tooltip: 'var(--z-index-tooltip, 1500)',
      max: 'var(--z-index-max, 9999)',
    };

    // 매핑 규칙
    const mappingRules = {
      'base-colors': 'colors',
      'base-colors.primary': 'colors.primary',
      'base-colors.neutral': 'colors.neutral',
      'base-colors.green': 'colors.green',
      'base-colors.red': 'colors.red',
      'base-colors.blue': 'colors.blue',
      'base-colors.purple': 'colors.purple',
      'base-colors.common': 'colors.common',
      'font.color': 'textColor',
      'font.size': 'fontSize',
      'font.line-heights': 'lineHeight',
      'font.letter-spacing': 'letterSpacing',
      'base-size': 'spacing',
      radius: 'borderRadius',
      padding: 'spacing',
      // background: 'colors.background', // 기존 매핑 제거
      'input.color': 'colors.input',
      'z-index': 'zIndex', // z-index 매핑 추가
    };
    // 공식 분류
    const allowed = [
      'colors',
      'textColor',
      'fontSize',
      'lineHeight',
      'letterSpacing',
      'spacing',
      'borderRadius',
      'zIndex', // zIndex 추가
    ];
    // 컴포넌트성 키
    const ignoreKeys = [
      'button',
      'trade',
      'table',
      'popup',
      'nav',
      'chips',
      'sidebar',
      '메뉴명_01',
      '메뉴명_02',
      '메뉴명_03',
      '메뉴명_04',
      '메뉴명_05',
    ];
    // flatten 함수 (key를 케밥 케이스로 변환)
    function flatten(obj, prefix = '', res = {}) {
      for (const key of Object.keys(obj)) {
        const value = obj[key];
        // key를 케밥 케이스로 변환
        const kebabKey = kebabCase(key);
        const newKey = prefix ? `${prefix}.${kebabKey}` : kebabKey;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          flatten(value, newKey, res);
        } else {
          res[newKey] = value;
        }
      }
      return res;
    }
    // deep merge 함수
    function deepMerge(target, source) {
      for (const key of Object.keys(source)) {
        if (
          typeof target[key] === 'object' &&
          typeof source[key] === 'object' &&
          target[key] !== null &&
          source[key] !== null &&
          !Array.isArray(target[key]) &&
          !Array.isArray(source[key])
        ) {
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
      return target;
    }
    // theme.extend flatten
    const flat = flatten(configObj.theme?.extend || {});
    // 매핑 및 병합
    const merged = {};
    for (const [flatKey, value] of Object.entries(flat)) {
      // 무시할 키
      if (ignoreKeys.some((k) => flatKey.startsWith(k))) continue;
      // flatKey가 background.으로 시작하면 flat하게 colors에 bg- 접두사로 매핑
      if (flatKey.startsWith('background.')) {
        const suffix = flatKey.slice('background.'.length);
        const targetKey = `colors.bg-${suffix}`;
        // 중첩 객체로 복원
        const parts = targetKey.split('.');
        let cur = merged;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        const lastKey = parts[parts.length - 1];
        cur[lastKey] = value;
        continue;
      }
      // 기존 매핑 규칙 적용
      let matched = '';
      let mapped = '';
      for (const rule of Object.keys(mappingRules).sort((a, b) => b.length - a.length)) {
        if (flatKey.startsWith(rule)) {
          matched = rule;
          mapped = mappingRules[rule];
          break;
        }
      }
      if (matched) {
        const suffix = flatKey.slice(matched.length).replace(/^[.]/, '');
        const targetKey = suffix ? `${mapped}.${suffix}` : mapped;
        // 중첩 객체로 복원
        const parts = targetKey.split('.');
        let cur = merged;
        for (let i = 0; i < parts.length - 1; i++) {
          if (!cur[parts[i]]) cur[parts[i]] = {};
          cur = cur[parts[i]];
        }
        const lastKey = parts[parts.length - 1];
        if (
          typeof cur[lastKey] === 'object' &&
          typeof value === 'object' &&
          cur[lastKey] !== null &&
          value !== null &&
          !Array.isArray(cur[lastKey]) &&
          !Array.isArray(value)
        ) {
          cur[lastKey] = deepMerge(cur[lastKey], value);
        } else {
          cur[lastKey] = value;
        }
      }
    }
    // 공식 분류만 남기기
    const filteredExtend = Object.fromEntries(
      Object.entries(merged).filter(([k]) => allowed.includes(k))
    );
    // 새 config 객체 재구성
    const newConfig = {
      ...configObj,
      theme: {
        ...configObj.theme,
        extend: filteredExtend,
      },
    };
    const configStr =
      "/** @type {import('tailwindcss').Config} */\nmodule.exports = " +
      JSON.stringify(newConfig, null, 2) +
      ';\n';
    await writeFile(configPath, configStr, 'utf-8');
    console.log('✅ Tailwind config 후처리(공식 분류 재구성) 완료!');
  } catch (e) {
    console.error('❌ Tailwind config 후처리 오류:', e);
  }

  // 6. 불필요한 중간 산출물 삭제
  const fs = await import('fs/promises');
  const filesToRemove = [
    './__light-tokens.json',
    './__dark-tokens.json',
    './__light-tokens-transformed.json',
    './__dark-tokens-transformed.json',
    './__light-tokens-flat.json',
    './__dark-tokens-flat.json',
  ];
  for (const file of filesToRemove) {
    try {
      await fs.unlink(file);
      console.log(`🗑️  ${file} 삭제 완료`);
    } catch (e) {
      // 파일이 없으면 무시
    }
  }
}

// 7. 실행
run();
