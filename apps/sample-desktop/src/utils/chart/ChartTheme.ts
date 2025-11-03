/**
 * 차트 테마 관련 유틸리티
 */

import type { ChartSettings } from '@template/types';

/**
 * 테마 색상 정의
 */
export const CHART_THEME_COLORS = {
  // FIXME: 프로젝트 글로벌 테마 반영
  greenRed: {
    up: '#00a22f',
    down: '#f63338',
    name: 'greenRed' as const,
  },
  redBlue: {
    up: '#f63338',
    down: '#0067ef',
    name: 'redBlue' as const,
  },
} as const;

/**
 * 테마에 따른 TradingView overrides 생성
 */
export function generateThemeOverrides(theme: 'greenRed' | 'redBlue'): Record<string, any> {
  const colors = CHART_THEME_COLORS[theme];

  const overrides: Record<string, any> = {
    // 캔들스틱 스타일 강제 설정
    // FIXME: 차트 종류 기획에 따라 수정 필요

    'mainSeriesProperties.style': 1, // 1 = 캔들스틱
    // 캔들 색상 속성들
    'mainSeriesProperties.candleStyle.upColor': colors.up,
    'mainSeriesProperties.candleStyle.downColor': colors.down,
    'mainSeriesProperties.candleStyle.borderUpColor': colors.up,
    'mainSeriesProperties.candleStyle.borderDownColor': colors.down,
    'mainSeriesProperties.candleStyle.wickUpColor': colors.up,
    'mainSeriesProperties.candleStyle.wickDownColor': colors.down,
  };

  return overrides;
}

/**
 * 설정에서 테마 추출
 */
export function getThemeFromSettings(settings: ChartSettings): 'greenRed' | 'redBlue' {
  return settings.basic.theme;
}

/**
 * 테마 색상 가져오기
 */
export function getThemeColors(theme: 'greenRed' | 'redBlue') {
  return CHART_THEME_COLORS[theme];
}

/**
 * CSS에서 사용할 테마 색상 변수 생성
 */
export function generateThemeCSSVariables(theme: 'greenRed' | 'redBlue'): Record<string, string> {
  const colors = CHART_THEME_COLORS[theme];

  return {
    '--chart-theme-up-color': colors.up,
    '--chart-theme-down-color': colors.down,
  };
}

/**
 * CSS 변수를 실제 색상 값으로 변환하는 헬퍼 함수
 */
function getCSSVariableValue(
  cssVariable: string,
  property: 'background-color' | 'color' = 'background-color'
): string {
  // CSS 변수 값을 가져오기 위해 임시 요소 생성
  const tempElement = document.createElement('div');
  tempElement.style.setProperty(property, cssVariable);
  document.body.appendChild(tempElement);

  const computedStyle = window.getComputedStyle(tempElement);
  const value =
    property === 'background-color' ? computedStyle.backgroundColor : computedStyle.color;

  document.body.removeChild(tempElement);

  return value || (property === 'background-color' ? '#ffffff' : '#191919'); // fallback
}

/**
 * 현재 테마에 따른 차트 배경 색상 가져오기
 * CSS 변수를 실제 색상 값으로 변환
 */
export function getCurrentThemeBackgroundColor(): string {
  return getCSSVariableValue('var(--background-bg-default)', 'background-color');
}

/**
 * 현재 테마에 따른 차트 텍스트 색상 가져오기
 */
export function getCurrentThemeTextColor(): string {
  return getCSSVariableValue('var(--font-color-default)', 'color');
}

/**
 * 테마 변경에 따른 차트 배경 overrides 생성
 */
export function generateThemeBackgroundOverrides(): Record<string, any> {
  const backgroundColor = getCurrentThemeBackgroundColor();
  const textColor = getCurrentThemeTextColor();

  return {
    'paneProperties.background': backgroundColor,
    'scalesProperties.textColor': textColor,
  };
}
