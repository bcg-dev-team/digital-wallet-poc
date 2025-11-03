/**
 * TradingView 차트 Features 및 Overrides 관리 유틸리티
 */

import type { ChartSettings } from '@template/types';

/**
 * TradingView Features 설정 타입
 */
export interface TradingViewFeatures {
  enabledFeatures: string[];
  disabledFeatures: string[];
}

/**
 * 기본 활성화 기능들
 */
const DEFAULT_ENABLED_FEATURES = [
  'study_templates',
  'side_toolbar_in_fullscreen_mode',
  'header_compare',
  'compare_symbol',
  'show_spread_operators',
  'hide_price_scale_if_all_sources_hidden',
  // 범례 관련 기능들은 조건부로 활성화 (overrides와 함께 제어)
];

/**
 * 기본 비활성화 기능들
 */
const DEFAULT_DISABLED_FEATURES = [
  'use_localstorage_for_settings',
  'volume_force_overlay',
  'create_volume_indicator_by_default',
  'header_widget',
  'right_toolbar',
  'left_toolbar', // 좌측 드로잉 툴바 비활성화
  'main_series_scale_menu',
  'header_symbol_search',
  'timeframes_toolbar',
  // 범례 편집은 기본 비활성화 (필요시 설정으로 활성화)
  'legend_inplace_edit',
  // 십자선 관련 features 시도 - 기본적으로 비활성화
  'hide_crosshair',
  'disable_crosshair',
  'no_crosshair',
];

/**
 * 트레이딩 관련 기능들
 */
const TRADING_FEATURES = {
  TRADING_PANEL: 'trading_panel',
  SHOW_ORDERS_ON_CHART: 'show_orders_on_chart',
} as const;

/**
 * 범례 관련 기능들
 */
const LEGEND_FEATURES = {
  LEGEND: 'legend',
  SHOW_LEGEND: 'show_legend',
  LEGEND_WIDGET: 'legend_widget',
  LEGEND_INPLACE_EDIT: 'legend_inplace_edit',
} as const;

/**
 * 설정에 따른 TradingView Features 생성
 */
export function generateTradingViewFeatures(settings: ChartSettings): TradingViewFeatures {
  const enabledFeatures = [...DEFAULT_ENABLED_FEATURES];
  const disabledFeatures = [...DEFAULT_DISABLED_FEATURES];

  // 중복 제거를 위한 Set 사용
  const enabledSet = new Set(enabledFeatures);
  const disabledSet = new Set(disabledFeatures);

  // 범례 표시 여부 결정 - 지표 관련 항목만 포함
  const showAnyLegend =
    settings.symbols.showIndicatorNames ||
    settings.symbols.showIndicatorArguments ||
    settings.symbols.showIndicatorValues;

  // 범례 기능 조건부 활성화 - features로 확실히 제어
  if (showAnyLegend) {
    // 범례 관련 기능들을 활성화
    enabledSet.add(LEGEND_FEATURES.LEGEND);
    enabledSet.add(LEGEND_FEATURES.SHOW_LEGEND);
    disabledSet.delete(LEGEND_FEATURES.LEGEND);
    disabledSet.delete(LEGEND_FEATURES.SHOW_LEGEND);

    // console.log('[TradingViewFeatures] Enabling legend features - legend needed');
  } else {
    // 범례 관련 기능들을 완전히 비활성화
    disabledSet.add(LEGEND_FEATURES.LEGEND);
    disabledSet.add(LEGEND_FEATURES.SHOW_LEGEND);
    disabledSet.add(LEGEND_FEATURES.LEGEND_WIDGET);
    enabledSet.delete(LEGEND_FEATURES.LEGEND);
    enabledSet.delete(LEGEND_FEATURES.SHOW_LEGEND);
    enabledSet.delete(LEGEND_FEATURES.LEGEND_WIDGET);

    // console.log('[TradingViewFeatures] Disabling legend features - no legend needed');
  }

  // 차트 값 표시 설정 제거됨 - 범례 편집 기능은 기본적으로 비활성화
  disabledSet.add(LEGEND_FEATURES.LEGEND_INPLACE_EDIT);
  enabledSet.delete(LEGEND_FEATURES.LEGEND_INPLACE_EDIT);

  // 십자선 설정에 따른 features 제어 - 여러 가능한 feature 이름 시도
  if (settings.scales.showCrosshair) {
    // 십자선 표시 시 관련 features 제거/추가
    disabledSet.delete('hide_crosshair');
    disabledSet.delete('disable_crosshair');
    disabledSet.delete('no_crosshair');
    enabledSet.add('crosshair');
    enabledSet.add('show_crosshair');
    // console.log('[TradingViewFeatures] Enabling crosshair - removing disable features');
  } else {
    // 십자선 숨김 시 관련 features 추가
    disabledSet.add('hide_crosshair');
    disabledSet.add('disable_crosshair');
    disabledSet.add('no_crosshair');
    enabledSet.delete('crosshair');
    enabledSet.delete('show_crosshair');
    // console.log('[TradingViewFeatures] Disabling crosshair - adding disable features');
  }

  // 트레이딩 기능 설정
  if (settings.trading.showBuySellButtons) {
    enabledSet.add(TRADING_FEATURES.TRADING_PANEL);
    disabledSet.delete(TRADING_FEATURES.TRADING_PANEL);
  } else {
    disabledSet.add(TRADING_FEATURES.TRADING_PANEL);
    enabledSet.delete(TRADING_FEATURES.TRADING_PANEL);
  }

  if (settings.trading.showOrders) {
    enabledSet.add(TRADING_FEATURES.SHOW_ORDERS_ON_CHART);
    disabledSet.delete(TRADING_FEATURES.SHOW_ORDERS_ON_CHART);
  } else {
    disabledSet.add(TRADING_FEATURES.SHOW_ORDERS_ON_CHART);
    enabledSet.delete(TRADING_FEATURES.SHOW_ORDERS_ON_CHART);
  }

  return {
    enabledFeatures: Array.from(enabledSet),
    disabledFeatures: Array.from(disabledSet),
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
 * 기본 TradingView Overrides 생성
 */
export function generateBasicOverrides(): Record<string, any> {
  // CSS 변수를 실제 색상 값으로 변환
  const backgroundColor = getCSSVariableValue('var(--background-bg-default)', 'background-color');
  const textColor = getCSSVariableValue('var(--font-color-default)', 'color');

  return {
    // 기본 패널 설정
    'paneProperties.gridLinesMode': 'none',
    'paneProperties.background': backgroundColor, // 앱 색상 값 동기화
    'paneProperties.vertGridProperties.color': '#e6e6e6',
    'paneProperties.horzGridProperties.color': '#e6e6e6',

    // 심볼 워터마크 설정
    'symbolWatermarkProperties.transparency': 90,

    // 스케일 설정
    'scalesProperties.textColor': textColor, // 앱 색상 값 동기화
    'scalesProperties.lineColor': '#b8b8b8',

    // 범례는 features로 제어하고, overrides는 세부 설정만 담당
    // 'paneProperties.legendProperties.showLegend': false, // features로 제어
    'scalesProperties.showSeriesLastValue': false, // 기본적으로 차트 값 비표시

    // 십자선 기본 비활성화 (설정에 따라 override됨) - TradingView 공식 API 사용
    'crosshair.mode': 0, // 0: 비활성화
    'crosshair.visible': false,
    'crosshairProperties.visible': false,
  };
}

/**
 * 심볼 및 지표 관련 Overrides 생성
 */
export function generateSymbolOverrides(settings: ChartSettings): Record<string, any> {
  const overrides: Record<string, any> = {};

  // 범례 표시 여부 결정 - 지표 관련 항목만 포함
  const showAnyLegend =
    settings.symbols.showIndicatorNames ||
    settings.symbols.showIndicatorArguments ||
    settings.symbols.showIndicatorValues;

  // 1. 범례 전체 표시 여부
  overrides['paneProperties.legendProperties.showLegend'] = showAnyLegend;

  // 2. 종목명, 차트값, 봉변화값 표시 제거됨
  overrides['paneProperties.legendProperties.showSeriesTitle'] = false;
  overrides['paneProperties.legendProperties.showSeriesOHLC'] = false;
  overrides['paneProperties.legendProperties.showBarChange'] = false;

  // 5. 지표 관련 설정 - 올바른 매핑
  overrides['paneProperties.legendProperties.showStudyTitles'] =
    settings.symbols.showIndicatorNames; // 지표 이름 (Title)
  overrides['paneProperties.legendProperties.showStudyArguments'] =
    settings.symbols.showIndicatorArguments; // 지표 매개변수
  overrides['paneProperties.legendProperties.showStudyValues'] =
    settings.symbols.showIndicatorValues; // 지표 값

  // 디버깅을 위한 로그
  // console.log('[TradingViewFeatures] Symbol overrides generated:', {
  //   showChartValues: settings.symbols.showChartValues,
  //   showAnyLegend: showAnyLegend,
  //   showSymbolName: settings.symbols.showSymbolName,
  //   showBarChangeValues: settings.symbols.showBarChangeValues,
  //   showIndicatorValues: settings.symbols.showIndicatorValues,
  //   showIndicatorArguments: settings.symbols.showIndicatorArguments,
  //   generatedOverrides: overrides,
  // });

  return overrides;
}

/**
 * 축 및 눈금선 관련 Overrides 생성
 */
export function generateScalesOverrides(settings: ChartSettings): Record<string, any> {
  const overrides: Record<string, any> = {};

  // 현재 가격 표시 (우측 현재 값) - "종목 가격" 설정으로 제어
  overrides['scalesProperties.showSeriesLastValue'] = settings.scales.showPriceLabels;

  // 격자선 설정
  if (settings.scales.showGridLines) {
    // 격자선 모드 매핑
    const gridModeMap: Record<string, string> = {
      both: 'both',
      vertical: 'vert',
      horizontal: 'horz',
    };

    overrides['paneProperties.gridLinesMode'] = gridModeMap[settings.scales.gridLineMode] || 'both';

    // 격자선 색상 설정
    overrides['paneProperties.vertGridProperties.color'] = settings.scales.verticalGridColor;
    overrides['paneProperties.horzGridProperties.color'] = settings.scales.horizontalGridColor;
  } else {
    // 격자선 비활성화
    overrides['paneProperties.gridLinesMode'] = 'none';
  }

  // console.log('[TradingViewFeatures] Grid lines settings:', {
  //   showGridLines: settings.scales.showGridLines,
  //   gridLineMode: settings.scales.gridLineMode,
  //   appliedMode: overrides['paneProperties.gridLinesMode'],
  // });
  // 십자선 설정 - TradingView 공식 API 사용
  if (settings.scales.showCrosshair) {
    // 십자선 활성화 - mode 1 (기본 모드)
    overrides['crosshair.mode'] = 1;
    overrides['crosshair.color'] = settings.scales.crosshairColor;
    overrides['crosshair.width'] = 1;
    overrides['crosshair.style'] = 0; // 실선

    // 기존 속성명들도 함께 시도 (호환성)
    overrides['crosshairProperties.visible'] = true;
    overrides['crosshairProperties.color'] = settings.scales.crosshairColor;
  } else {
    // 십자선 비활성화 - mode 0
    overrides['crosshair.mode'] = 0;

    // 기존 속성명들도 함께 시도 (호환성)
    overrides['crosshairProperties.visible'] = false;
    overrides['crosshair.visible'] = false;
  }

  // console.log('[TradingViewFeatures] Crosshair settings:', {
  //   showCrosshair: settings.scales.showCrosshair,
  //   crosshairColor: settings.scales.crosshairColor,
  //   appliedOverrides: {
  //     'crosshair.mode': overrides['crosshair.mode'],
  //     'crosshair.color': overrides['crosshair.color'],
  //     'crosshair.visible': overrides['crosshair.visible'],
  //     'crosshairProperties.visible': overrides['crosshairProperties.visible'],
  //   },
  // });

  return overrides;
}

/**
 * 기본 설정 관련 Overrides 생성
 */
export function generateBasicSettingsOverrides(settings: ChartSettings): Record<string, any> {
  const overrides: Record<string, any> = {};

  // 가격 정밀도 설정
  if (settings.basic.precision !== 'default') {
    const precision = parseInt(settings.basic.precision);
    if (!isNaN(precision)) {
      const priceScale = Math.pow(10, precision);
      overrides['mainSeriesProperties.minTick'] = `${priceScale},1,false`;
    }
  }

  // 타임존 설정
  if (settings.basic.timezone) {
    overrides['timezone'] = settings.basic.timezone;
  }

  return overrides;
}

/**
 * 모든 Overrides를 통합하여 생성
 */
export function generateAllOverrides(settings: ChartSettings): Record<string, any> {
  const basicOverrides = generateBasicOverrides();
  const symbolOverrides = generateSymbolOverrides(settings);
  const scalesOverrides = generateScalesOverrides(settings);
  const basicSettingsOverrides = generateBasicSettingsOverrides(settings);

  // 테마 관련 overrides는 ChartTheme.ts에서 처리
  return {
    ...basicOverrides,
    ...symbolOverrides,
    ...scalesOverrides,
    ...basicSettingsOverrides,
  };
}

/**
 * 설정 변경이 Features 재생성을 필요로 하는지 확인
 */
export function needsFeaturesRecreation(
  currentSettings: ChartSettings,
  newSettings: ChartSettings
): boolean {
  // 축 및 눈금선 변경사항 확인 (안전한 접근)
  const gridLinesChange =
    currentSettings.scales?.showGridLines !== newSettings.scales.showGridLines;
  const gridLineModeChange =
    currentSettings.scales?.gridLineMode !== newSettings.scales.gridLineMode;
  const crosshairChange =
    currentSettings.scales?.showCrosshair !== newSettings.scales.showCrosshair;
  const priceLabelsChange =
    currentSettings.scales?.showPriceLabels !== newSettings.scales.showPriceLabels;

  // 트레이딩 변경사항 확인
  const tradingButtonsChange =
    currentSettings.trading.showBuySellButtons !== newSettings.trading.showBuySellButtons;
  const tradingOrdersChange = currentSettings.trading.showOrders !== newSettings.trading.showOrders;

  // 차트 재생성이 꼭 필요한 경우만 확인
  // 대부분의 UI 설정은 overrides로 적용 가능
  const needsRecreation =
    gridLineModeChange || // 격자선 모드 변경 (API 제한)
    tradingOrdersChange; // 주문 표시 변경 (테마 변경 필요)

  // console.log('[TradingViewFeatures] 🔍 RECREATION CHECK:', {
  //   gridLineModeChange,
  //   tradingOrdersChange,
  //   needsRecreation,
  // });

  return needsRecreation;
}

/**
 * 심볼 관련 override 키들 필터링
 */
export function getSymbolOverrideKeys(overrides: Record<string, any>): string[] {
  return Object.keys(overrides).filter(
    (key) =>
      key.includes('legend') || key.includes('showSeriesLastValue') || key.includes('showLastValue')
  );
}

/**
 * Features 설정 로깅을 위한 유틸리티
 */
export function logFeaturesConfiguration(features: TradingViewFeatures): void {
  // console.log('[TradingViewFeatures] Configuration:', {
  //   enabledLegendFeatures: features.enabledFeatures.filter((f) => f.includes('legend')),
  //   disabledLegendFeatures: features.disabledFeatures.filter((f) => f.includes('legend')),
  //   enabledTradingFeatures: features.enabledFeatures.filter((f) => f.includes('trading')),
  //   disabledTradingFeatures: features.disabledFeatures.filter((f) => f.includes('trading')),
  //   totalEnabledFeatures: features.enabledFeatures.length,
  //   totalDisabledFeatures: features.disabledFeatures.length,
  // });
}

/**
 * Overrides 설정 로깅을 위한 유틸리티
 */
export function logOverridesConfiguration(overrides: Record<string, any>): void {
  const symbolKeys = getSymbolOverrideKeys(overrides);
  const symbolOverrides = symbolKeys.reduce((obj: any, key) => {
    obj[key] = overrides[key];
    return obj;
  }, {});

  // console.log('[TradingViewFeatures] Overrides configuration:', {
  //   totalOverrides: Object.keys(overrides).length,
  //   symbolRelatedKeys: symbolKeys,
  //   symbolOverrides: symbolOverrides,
  //   timezone: overrides['timezone'],
  //   minTick: overrides['mainSeriesProperties.minTick'],
  // });
}
