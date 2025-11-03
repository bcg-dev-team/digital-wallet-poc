/**
 * CSS 변수에서 디자인 토큰을 동적으로 읽어오는 유틸리티 함수들
 */

/**
 * CSS 변수 값을 가져오는 함수
 * @param variableName - CSS 변수명 (예: --base-colors-primary-primary800)
 * @returns CSS 변수 값
 */
export function getCSSVariable(variableName: string): string {
  if (typeof window === 'undefined') return '';

  try {
    const computedStyle = getComputedStyle(document.documentElement);
    const value = computedStyle.getPropertyValue(variableName).trim();
    return value;
  } catch (error) {
    console.error(`Error getting CSS variable ${variableName}:`, error);
    return '';
  }
}

/**
 * 공통 색상(common) 토큰을 가져오는 함수
 * @returns common 색상 토큰 객체
 */
function getCommonColorTokens() {
  const common: Record<string, string> = {};
  const style = getComputedStyle(
    typeof window !== 'undefined' ? document.documentElement : ({} as HTMLElement)
  );
  for (const key in style) {
    if (typeof key === 'string' && key.startsWith('--base-colors-common-')) {
      const value = style.getPropertyValue(key).trim();
      if (value) {
        const name = key.replace('--base-colors-common-', '');
        common[name] = value;
      }
    }
  }
  return common;
}

/**
 * 색상 토큰을 그룹별로 가져오는 함수
 * @returns 색상 토큰 객체
 */
export function getColorTokens() {
  const colors: Record<string, Record<string, string>> = {
    primary: {},
    neutral: {},
    green: {},
    red: {},
    blue: {},
    purple: {},
    common: getCommonColorTokens(),
  };

  // Primary 색상 (실제 CSS 변수명 확인)
  const primaryTokens = [
    '--base-colors-primary-primary800',
    '--base-colors-primary-primary700',
    '--base-colors-primary-primary600',
    '--base-colors-primary-primary500',
    '--base-colors-primary-primary400',
    '--base-colors-primary-primary300',
    '--base-colors-primary-primary200',
    '--base-colors-primary-primary100',
    '--base-colors-primary-primary050',
    '--base-colors-primary-primary-deep',
  ];

  primaryTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-primary-', '');
      colors.primary[key] = value;
    }
  });

  // Neutral 색상
  const neutralTokens = [
    '--base-colors-neutral-neutral800',
    '--base-colors-neutral-neutral700',
    '--base-colors-neutral-neutral600',
    '--base-colors-neutral-neutral500',
    '--base-colors-neutral-neutral400',
    '--base-colors-neutral-neutral300',
    '--base-colors-neutral-neutral200',
    '--base-colors-neutral-neutral100',
    '--base-colors-neutral-neutral000',
    '--base-colors-neutral-neutral750',
    '--base-colors-neutral-neutral250',
    '--base-colors-neutral-neutral150',
    '--base-colors-neutral-neutral550',
    '--base-colors-neutral-neutral050',
  ];

  neutralTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-neutral-', '');
      colors.neutral[key] = value;
    }
  });

  // Green 색상
  const greenTokens = [
    '--base-colors-green-green100',
    '--base-colors-green-green200',
    '--base-colors-green-green300',
    '--base-colors-green-green400',
    '--base-colors-green-green600',
    '--base-colors-green-green700',
    '--base-colors-green-green500',
    '--base-colors-green-green800',
    '--base-colors-green-green050',
  ];

  greenTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-green-', '');
      colors.green[key] = value;
    }
  });

  // Red 색상
  const redTokens = [
    '--base-colors-red-red800',
    '--base-colors-red-red700',
    '--base-colors-red-red600',
    '--base-colors-red-red500',
    '--base-colors-red-red400',
    '--base-colors-red-red300',
    '--base-colors-red-red200',
    '--base-colors-red-red100',
    '--base-colors-red-red050',
  ];

  redTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-red-', '');
      colors.red[key] = value;
    }
  });

  // Blue 색상
  const blueTokens = [
    '--base-colors-blue-blue800',
    '--base-colors-blue-blue700',
    '--base-colors-blue-blue600',
    '--base-colors-blue-blue500',
    '--base-colors-blue-blue400',
    '--base-colors-blue-blue300',
    '--base-colors-blue-blue200',
    '--base-colors-blue-blue100',
    '--base-colors-blue-blue050',
  ];

  blueTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-blue-', '');
      colors.blue[key] = value;
    }
  });

  // Purple 색상
  const purpleTokens = [
    '--base-colors-purple-purple800',
    '--base-colors-purple-purple700',
    '--base-colors-purple-purple600',
    '--base-colors-purple-purple500',
    '--base-colors-purple-purple400',
    '--base-colors-purple-purple300',
    '--base-colors-purple-purple200',
    '--base-colors-purple-purple100',
    '--base-colors-purple-purple050',
  ];

  purpleTokens.forEach((tokenName) => {
    const value = getCSSVariable(tokenName);
    if (value) {
      const key = tokenName.replace('--base-colors-purple-', '');
      colors.purple[key] = value;
    }
  });

  return colors;
}

/**
 * 타이포그래피 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 타이포그래피 토큰 객체
 */
export function getTypographyTokens() {
  return {
    fontSize: {
      'font-10': getCSSVariable('--font-size-font-10'),
      'font-12': getCSSVariable('--font-size-font-12'),
      'font-13': getCSSVariable('--font-size-font-13'),
      'font-14': getCSSVariable('--font-size-font-14'),
      'font-16': getCSSVariable('--font-size-font-16'),
      'font-18': getCSSVariable('--font-size-font-18'),
      'font-20': getCSSVariable('--font-size-font-20'),
      'font-24': getCSSVariable('--font-size-font-24'),
      'font-36': getCSSVariable('--font-size-font-36'),
      'font-48': getCSSVariable('--font-size-font-48'),
      'font-64': getCSSVariable('--font-size-font-64'),
    },
    lineHeight: {
      'line-height-0': getCSSVariable('--font-line-heights-0'),
      'line-height-1': getCSSVariable('--font-line-heights-1'),
      'line-height-2': getCSSVariable('--font-line-heights-2'),
      'line-height-3': getCSSVariable('--font-line-heights-3'),
      'line-height-4': getCSSVariable('--font-line-heights-4'),
      'line-height-5': getCSSVariable('--font-line-heights-5'),
      'line-height-6': getCSSVariable('--font-line-heights-6'),
      'line-height-7': getCSSVariable('--font-line-heights-7'),
      'line-height-8': getCSSVariable('--font-line-heights-8'),
    },
    letterSpacing: {
      'letter-spacing-0': getCSSVariable('--font-letter-spacing-0'),
      'letter-spacing-1': getCSSVariable('--font-letter-spacing-1'),
      'letter-spacing-2': getCSSVariable('--font-letter-spacing-2'),
      'letter-spacing-3': getCSSVariable('--font-letter-spacing-3'),
      'letter-spacing-4': getCSSVariable('--font-letter-spacing-4'),
      'letter-spacing-5': getCSSVariable('--font-letter-spacing-5'),
    },
  };
}

/**
 * 간격 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 간격 토큰 객체
 */
export function getSpacingTokens() {
  return {
    'spacing-4': getCSSVariable('--base-size-size-4'),
    'spacing-6': getCSSVariable('--base-size-size-6'),
    'spacing-8': getCSSVariable('--base-size-size-8'),
    'spacing-10': getCSSVariable('--base-size-size-10'),
    'spacing-12': getCSSVariable('--base-size-size-12'),
    'spacing-13': getCSSVariable('--base-size-size-13'),
    'spacing-14': getCSSVariable('--base-size-size-14'),
    'spacing-16': getCSSVariable('--base-size-size-16'),
    'spacing-18': getCSSVariable('--base-size-size-18'),
    'spacing-20': getCSSVariable('--base-size-size-20'),
    'spacing-24': getCSSVariable('--base-size-size-24'),
    'spacing-36': getCSSVariable('--base-size-size-36'),
    'spacing-40': getCSSVariable('--base-size-size-40'),
    'spacing-48': getCSSVariable('--base-size-size-48'),
    'spacing-50': getCSSVariable('--base-size-size-50'),
    'spacing-64': getCSSVariable('--base-size-size-64'),
    'spacing-100': getCSSVariable('--base-size-size-100'),
    'spacing-130': getCSSVariable('--base-size-size-130'),
    'spacing-140': getCSSVariable('--base-size-size-140'),
    'spacing-200': getCSSVariable('--base-size-size-200'),
    'spacing-300': getCSSVariable('--base-size-size-300'),
  };
}

/**
 * 패딩 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 패딩 토큰 객체
 */
export function getPaddingTokens() {
  return {
    'padding-4': getCSSVariable('--padding-padding-4'),
    'padding-8': getCSSVariable('--padding-padding-8'),
    'padding-12': getCSSVariable('--padding-padding-12'),
    'padding-16': getCSSVariable('--padding-padding-16'),
    'padding-24': getCSSVariable('--padding-padding-24'),
    'padding-36': getCSSVariable('--padding-padding-36'),
    'padding-48': getCSSVariable('--padding-padding-48'),
    'padding-64': getCSSVariable('--padding-padding-64'),
    'padding-130': getCSSVariable('--padding-padding-130'),
    'padding-z': getCSSVariable('--padding-padding-z'),
  };
}

/**
 * 라운드(Radius) 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 라운드 토큰 객체
 */
export function getRadiusTokens() {
  return {
    'radius-xs': getCSSVariable('--radius-xs'),
    'radius-sm': getCSSVariable('--radius-sm'),
    'radius-md': getCSSVariable('--radius-md'),
    'radius-lg': getCSSVariable('--radius-lg'),
    'radius-pill': getCSSVariable('--radius-pill'),
    'radius-default': getCSSVariable('--radius-default'),
    'radius-none': getCSSVariable('--radius-none'),
  };
}

/**
 * 카테고리별 토큰 getter 생성기
 * @param {string} prefix - CSS 변수 prefix (예: '--button-')
 * @param {string} groupName - 반환 객체의 그룹명
 */
function getCategoryTokens(prefix: string, groupName: string) {
  const group: Record<string, string> = {};

  if (typeof window === 'undefined') return group;

  try {
    const style = getComputedStyle(document.documentElement);

    // CSS 변수를 찾기 위해 모든 CSS 속성을 순회
    for (let i = 0; i < style.length; i++) {
      const propertyName = style[i];
      if (propertyName.startsWith(prefix)) {
        const value = style.getPropertyValue(propertyName).trim();
        if (value) {
          const name = propertyName.replace(prefix, '');
          group[name] = value;
        }
      }
    }
  } catch (error) {
    console.error(`Error in getCategoryTokens for ${groupName}:`, error);
  }

  return group;
}

/**
 * @returns 버튼 관련 디자인 토큰 객체
 */
export function getButtonTokens() {
  const result = {
    'primary-background': getCSSVariable('--button-primary-background'),
    'primary-text': getCSSVariable('--button-primary-text'),
    'primary-border': getCSSVariable('--button-primary-border'),
    'primary-background-deep': getCSSVariable('--button-primary-background-deep'),
    'disabled-background': getCSSVariable('--button-disabled-background'),
    'disabled-text': getCSSVariable('--button-disabled-text'),
    'disabled-border': getCSSVariable('--button-disabled-border'),
    'outline-background': getCSSVariable('--button-outline-background'),
    'outline-text': getCSSVariable('--button-outline-text'),
    'outline-border': getCSSVariable('--button-outline-border'),
    'outline-gray-background': getCSSVariable('--button-outline-gray-background'),
    'outline-gray-text': getCSSVariable('--button-outline-gray-text'),
    'outline-gray-border': getCSSVariable('--button-outline-gray-border'),
    'red-background': getCSSVariable('--button-red-background'),
    'red-text': getCSSVariable('--button-red-text'),
    'red-border': getCSSVariable('--button-red-border'),
    'red-background-none': getCSSVariable('--button-red-background-none'),
    'red-background-hover': getCSSVariable('--button-red-background-hover'),
    'red-background-blank': getCSSVariable('--button-red-background-blank'),
    'red-solid-background': getCSSVariable('--button-red-solid-background'),
    'red-solid-text': getCSSVariable('--button-red-solid-text'),
    'red-solid-border': getCSSVariable('--button-red-solid-border'),
    'red-solid-hover': getCSSVariable('--button-red-solid-hover'),
    'blue-background': getCSSVariable('--button-blue-background'),
    'blue-text': getCSSVariable('--button-blue-text'),
    'blue-border': getCSSVariable('--button-blue-border'),
    'blue-background-none': getCSSVariable('--button-blue-background-none'),
    'blue-background-hover': getCSSVariable('--button-blue-background-hover'),
    'blue-background-blank': getCSSVariable('--button-blue-background-blank'),
    'blue-solid-background': getCSSVariable('--button-blue-solid-background'),
    'blue-solid-text': getCSSVariable('--button-blue-solid-text'),
    'blue-solid-border': getCSSVariable('--button-blue-solid-border'),
    'blue-solid-hover': getCSSVariable('--button-blue-solid-hover'),
    'light-solid-background': getCSSVariable('--button-light-solid-background'),
    'light-solid-text': getCSSVariable('--button-light-solid-text'),
    'light-solid-border': getCSSVariable('--button-light-solid-border'),
    'tab-background': getCSSVariable('--button-tab-background'),
    'tab-button-on': getCSSVariable('--button-tab-button-on'),
    'tab-button-off': getCSSVariable('--button-tab-button-off'),
    'tab-text-on': getCSSVariable('--button-tab-text-on'),
    'tab-text-off': getCSSVariable('--button-tab-text-off'),
    'tab-menu-background': getCSSVariable('--button-tab-menu-background'),
    'tab-menu-border': getCSSVariable('--button-tab-menu-border'),
    'tab-menu-off': getCSSVariable('--button-tab-menu-off'),
    'tab-menu-on-long': getCSSVariable('--button-tab-menu-on-long'),
    'tab-menu-on-short': getCSSVariable('--button-tab-menu-on-short'),
    'tab-menu-on-correct': getCSSVariable('--button-tab-menu-on-correct'),
    'tab-menu-text-off': getCSSVariable('--button-tab-menu-text-off'),
    'tab-menu-on-cancel': getCSSVariable('--button-tab-menu-on-cancel'),
  };
  return result;
}
export function getInputTokens() {
  const result = {
    'color-surface': getCSSVariable('--input-color-surface'),
    'color-border-static': getCSSVariable('--input-color-border-static'),
    'color-border-focus': getCSSVariable('--input-color-border-focus'),
    'color-border-error': getCSSVariable('--input-color-border-error'),
    'color-border-disabled': getCSSVariable('--input-color-border-disabled'),
    'color-text-placeholder': getCSSVariable('--input-color-text-placeholder'),
    'color-text-disable': getCSSVariable('--input-color-text-disable'),
    'color-text-static': getCSSVariable('--input-color-text-static'),
    'color-bg-disabled': getCSSVariable('--input-color-bg-disabled'),
    'check-radio-disable-border': getCSSVariable('--input-check-radio-disable-border'),
    'check-radio-disable-bg': getCSSVariable('--input-check-radio-disable-bg'),
    'check-radio-active-bg': getCSSVariable('--input-check-radio-active-bg'),
    'check-radio-active-border': getCSSVariable('--input-check-radio-active-border'),
    'check-radio-inactive-disable-bg': getCSSVariable('--input-check-radio-inactive-disable-bg'),
    'check-radio-selected-bg': getCSSVariable('--input-check-radio-selected-bg'),
    'icon-default': getCSSVariable('--input-icon-default'),
    'icon-off': getCSSVariable('--input-icon-off'),
    'icon-on': getCSSVariable('--input-icon-on'),
    'icon-off-dark': getCSSVariable('--input-icon-off-dark'),
    'icon-white': getCSSVariable('--input-icon-white'),
    'icon-favorite': getCSSVariable('--input-icon-favorite'),
    'icon-success': getCSSVariable('--input-icon-success'),
    'icon-blue': getCSSVariable('--input-icon-blue'),
  };
  return result;
}
export function getBackgroundTokens() {
  return {
    'bg-default': getCSSVariable('--background-bg-default'),
    'bg-surface': getCSSVariable('--background-bg-surface'),
    'bg-outline': getCSSVariable('--background-bg-outline'),
    'bg-surface-muted': getCSSVariable('--background-bg-surface-muted'),
    divider: getCSSVariable('--background-divider'),
    'divider-muted': getCSSVariable('--background-divider-muted'),
    'bg-innerframe': getCSSVariable('--background-bg-innerframe'),
    primary: getCSSVariable('--background-primary'),
    'primary-light': getCSSVariable('--background-primary-light'),
    'bg-surface-dark': getCSSVariable('--background-bg-surface-dark'),
  };
}
export function getFontTokens() {
  return {
    'color-primary': getCSSVariable('--font-color-primary'),
    'color-default': getCSSVariable('--font-color-default'),
    'color-default-muted': getCSSVariable('--font-color-default-muted'),
    'color-red': getCSSVariable('--font-color-red'),
    'color-buy': getCSSVariable('--font-color-buy'),
    'color-sell': getCSSVariable('--font-color-sell'),
    'color-white': getCSSVariable('--font-color-white'),
    'color-black': getCSSVariable('--font-color-black'),
    'color-blue': getCSSVariable('--font-color-blue'),
    'color-footer': getCSSVariable('--font-color-footer'),
    'color-default-muted-dark': getCSSVariable('--font-color-default-muted-dark'),
    'color-green': getCSSVariable('--font-color-green'),
    'color-purple': getCSSVariable('--font-color-purple'),
    'size-font-36': getCSSVariable('--font-size-font-36'),
    'size-font-24': getCSSVariable('--font-size-font-24'),
    'size-font-13': getCSSVariable('--font-size-font-13'),
    'size-font-20': getCSSVariable('--font-size-font-20'),
    'size-font-14': getCSSVariable('--font-size-font-14'),
    'size-font-64': getCSSVariable('--font-size-font-64'),
    'size-font-48': getCSSVariable('--font-size-font-48'),
    'size-font-12': getCSSVariable('--font-size-font-12'),
    'size-font-18': getCSSVariable('--font-size-font-18'),
    'size-font-16': getCSSVariable('--font-size-font-16'),
    'size-font-10': getCSSVariable('--font-size-font-10'),
  };
}
export function getTradeTokens() {
  return {
    'long-background': getCSSVariable('--trade-long-background'),
    'long-text': getCSSVariable('--trade-long-text'),
    'long-border': getCSSVariable('--trade-long-border'),
    'short-background': getCSSVariable('--trade-short-background'),
    'short-text': getCSSVariable('--trade-short-text'),
    'short-border': getCSSVariable('--trade-short-border'),
    'correct-background': getCSSVariable('--trade-correct-background'),
    'correct-text': getCSSVariable('--trade-correct-text'),
    'correct-border': getCSSVariable('--trade-correct-border'),
    'correct-background-solid': getCSSVariable('--trade-correct-background-solid'),
    'correct-text-solid': getCSSVariable('--trade-correct-text-solid'),
    'cancel-background': getCSSVariable('--trade-cancel-background'),
    'cancel-text': getCSSVariable('--trade-cancel-text'),
    'cancel-border': getCSSVariable('--trade-cancel-border'),
    'cancel-background-solid': getCSSVariable('--trade-cancel-background-solid'),
    'cancel-text-solid': getCSSVariable('--trade-cancel-text-solid'),
  };
}

export function getTableTokens() {
  return {
    'type1-header-bg': getCSSVariable('--table-type1-header-bg'),
    'type1-header-underline': getCSSVariable('--table-type1-header-underline'),
    'type1-body-border': getCSSVariable('--table-type1-body-border'),
    'type1-body-bg': getCSSVariable('--table-type1-body-bg'),
    'type1-body-bg-select': getCSSVariable('--table-type1-body-bg-select'),
    'type1-body-bg-row': getCSSVariable('--table-type1-body-bg-row'),
    'type2-body-border': getCSSVariable('--table-type2-body-border'),
    'type2-header-underline': getCSSVariable('--table-type2-header-underline'),
    'type2-header-bg': getCSSVariable('--table-type2-header-bg'),
    'type2-body-bg': getCSSVariable('--table-type2-body-bg'),
    'type2-body-border-mid': getCSSVariable('--table-type2-body-border-mid'),
    'bg-red': getCSSVariable('--table-bg-red'),
    'bg-blue': getCSSVariable('--table-bg-blue'),
    'bg-inner': getCSSVariable('--table-bg-inner'),
    'chip-background': getCSSVariable('--table-chip-background'),
  };
}

export function getPopupTokens() {
  return {
    background: getCSSVariable('--popup-background'),
    'inner-background': getCSSVariable('--popup-inner-background'),
    border: getCSSVariable('--popup-border'),
    text: getCSSVariable('--popup-text'),
  };
}

export function getNavTokens() {
  return {
    on: getCSSVariable('--nav-on'),
    off: getCSSVariable('--nav-off'),
  };
}

export function getSidebarTokens() {
  return {
    'bg-sidebar': getCSSVariable('--sidebar-bg-sidebar'),
    'bg-topbar': getCSSVariable('--sidebar-bg-topbar'),
  };
}

/**
 * 모든 디자인 토큰을 가져오는 함수
 * @returns 모든 디자인 토큰 객체
 */
export function getAllDesignTokens() {
  return {
    colors: getColorTokens(),
    button: getButtonTokens(),
    input: getInputTokens(),
    background: getBackgroundTokens(),
    font: getFontTokens(),
    trade: getTradeTokens(),
    table: getTableTokens(),
    popup: getPopupTokens(),
    nav: getNavTokens(),
    sidebar: getSidebarTokens(),
    radius: getRadiusTokens(),
    padding: getPaddingTokens(),
    typography: getTypographyTokens(),
    spacing: getSpacingTokens(),
  };
}

/**
 * 토큰 이름을 사용자 친화적으로 변환하는 함수
 * @param tokenName - 토큰 이름
 * @returns 사용자 친화적인 이름
 */
export function formatTokenName(tokenName: string): string {
  return tokenName
    .replace(/^--/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}
