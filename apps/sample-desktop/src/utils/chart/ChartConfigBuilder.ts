/**
 * 차트 위젯 설정 빌더 클래스
 * TradingView 위젯 설정을 생성하는 유틸리티입니다.
 */

import {
  generateTradingViewFeatures,
  generateAllOverrides,
  logFeaturesConfiguration,
  logOverridesConfiguration,
} from '@/utils/chart/TradingViewFeatures';
import { generateThemeOverrides, getThemeFromSettings } from '@/utils/chart/ChartTheme';
import type { TradingViewWidgetConfig } from '@/types/tradingview';
import Datafeed from '@/adapters/tradingview/datafeed.js';
import type { ChartConfig } from '@template/types';

/**
 * TradingView 위젯 설정을 생성합니다.
 * @param config - 차트 설정
 * @returns TradingView 위젯 설정 객체
 */
export function buildWidgetConfig(config: ChartConfig): TradingViewWidgetConfig {
  // 설정에 따른 features와 overrides 생성
  const features = config.settings
    ? generateTradingViewFeatures(config.settings)
    : generateTradingViewFeatures({
        basic: {
          theme: 'redBlue',
          precision: 'default',
          timezone: 'Asia/Seoul',
          locale: 'ko',
        },
        symbols: {
          showIndicatorNames: false,
          showIndicatorValues: false,
          showIndicatorArguments: false,
        },
        scales: {
          showPriceLabels: true,
          showGridLines: false,
          gridLineMode: 'both',
          verticalGridColor: '#e6e6e6',
          horizontalGridColor: '#e6e6e6',
          showCrosshair: true,
          crosshairColor: '#8f9299',
        },
        trading: {
          showBuySellButtons: false,
          instantOrderExecution: false,
          showOrders: false,
        },
      });

  let overrides = config.settings ? generateAllOverrides(config.settings) : {};

  // 테마 설정 추가
  if (config.settings) {
    const theme = getThemeFromSettings(config.settings);
    const themeOverrides = generateThemeOverrides(theme);
    overrides = { ...overrides, ...themeOverrides };

    // console.log('[ChartConfigBuilder] Applying chart settings:', config.settings);
    logOverridesConfiguration(overrides);
  }

  // 타임존 설정 적용
  let timezone = 'Asia/Seoul'; // 기본값
  if (config.settings?.basic.timezone) {
    timezone = config.settings.basic.timezone;
  }

  // locale 설정
  let locale = config.settings?.basic.locale || config.locale || 'ko';

  // console.log('[ChartConfigBuilder] Widget config settings:', {
  //   timezone,
  //   locale,
  //   precision: config.settings?.basic.precision,
  //   symbolSettings: config.settings?.symbols,
  // });

  // Features 및 Overrides 로깅
  logFeaturesConfiguration(features);

  // 초기 설정을 위한 studies_overrides 준비
  const studiesOverrides = {};

  const widgetConfig: TradingViewWidgetConfig = {
    symbol: config.symbol,
    interval: config.interval,
    fullscreen: false,
    container: config.container,
    datafeed: Datafeed,
    library_path: '/charting_library/',
    width: config.width || '100%',
    height: config.height || '100%',
    locale: locale,
    debug: config.debug || false,
    enabled_features: features.enabledFeatures,
    disabled_features: features.disabledFeatures,
    overrides: overrides,
    studies_overrides: studiesOverrides,
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    // theme: 'light' - TradingView 위젯 기본 테마는 overrides로 제어
    custom_css_url: '',
    // TODO: 필요 시 로딩 배경 색상 적용
    // loading_screen: { backgroundColor: '#f7f7f7' },
    timezone: timezone, // 타임존 설정 적용
    // 추가 시간 관련 설정
    time_frames: [], // 필요시 커스텀 시간대 설정
  };

  return widgetConfig;
}
