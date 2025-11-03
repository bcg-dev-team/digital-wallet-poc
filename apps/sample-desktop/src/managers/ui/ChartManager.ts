/**
 * Chart Widget API를 래핑하는 유틸리티 클래스
 * TradingView Chart Widget의 복잡한 API를 단순화하고 관리합니다.
 */

import {
  getThemeFromSettings,
  getThemeColors,
  generateThemeOverrides,
  generateThemeBackgroundOverrides,
} from '@/utils/chart/ChartTheme';
import {
  needsFeaturesRecreation,
  getSymbolOverrideKeys,
  generateAllOverrides,
} from '@/utils/chart/TradingViewFeatures';
import type { ChartConfig, ChartSymbolInfo, ChartSettings } from '@template/types';
import { getWebSocketService } from '@/services/websocket';
import { buildWidgetConfig } from '@/utils/chart/ChartConfigBuilder';
import { generateChartManagerId } from '@/utils/chart/ChartUtils';
import type { TradingViewWidget } from '@/types/tradingview';
import { setupChart } from '@/utils/chart/ChartSetupUtils';

export class ChartManager {
  private widget: TradingViewWidget | null = null;
  private currentSymbol: string = '';
  private currentInterval: string = '1';
  private currentSubscriberUID: string | null = null;
  private isInitialized: boolean = false;
  private currentSettings: ChartSettings | null = null;
  private instanceId: string = '';
  // private containerId: string = '';
  // private lastConfig: ChartConfig | null = null;

  constructor() {
    // 각 인스턴스마다 고유 ID 생성
    this.instanceId = generateChartManagerId();
    console.log(`[ChartManager] 새 인스턴스 생성: ${this.instanceId}`);
  }

  /**
   * Chart Widget 초기화
   */
  async initializeChart(config: ChartConfig): Promise<void> {
    if (this.isInitialized) {
      console.warn('[ChartManager] Chart is already initialized');
      return;
    }

    this.currentSymbol = config.symbol;
    this.currentInterval = config.interval;
    this.currentSettings = config.settings || null;

    return new Promise(async (resolve, reject) => {
      try {
        await this.ensureTradingViewLoaded();

        // 위젯 설정 생성 및 초기 설정
        const widgetConfig = buildWidgetConfig(config);

        this.widget = new window.TradingView.widget(widgetConfig);

        this.widget?.onChartReady(() => {
          this.isInitialized = true;

          // 기본 차트 설정 적용
          setupChart(this.widget);

          // 차트가 완전히 준비된 후 상세 설정 적용
          this.applyPostLoadSettings();

          resolve();
        });
      } catch (error) {
        console.error('[ChartManager] Failed to initialize chart:', error);
        reject(error);
      }
    });
  }

  /**
   * TradingView 라이브러리 로드 확인
   * HTML에서 미리 로드되므로 단순 확인만 수행
   */
  private async ensureTradingViewLoaded(): Promise<void> {
    if (!window.TradingView || !window.TradingView.widget) {
      throw new Error(
        'TradingView 라이브러리가 로드되지 않았습니다. HTML에서 charting_library.standalone.js를 미리 로드해야 합니다.'
      );
    }
  }

  /**
   * 심볼 변경
   */
  changeSymbol(symbol: string): void {
    if (!this.widget) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    console.log('[ChartManager] Changing symbol from', this.currentSymbol, 'to', symbol);

    // 이전 심볼 구독 해제
    if (this.currentSymbol && this.currentSubscriberUID) {
      this.unsubscribeSymbol(this.currentSymbol);
    }

    this.currentSymbol = symbol;

    try {
      // 차트 심볼 변경 (TradingView가 자동으로 데이터 로드)
      this.widget.setSymbol(symbol, this.currentInterval);
      console.log('[ChartManager] Symbol changed successfully to', symbol);
    } catch (error) {
      console.error('[ChartManager] Symbol change failed:', error);
    }
  }

  /**
   * 간격 변경
   */
  changeInterval(interval: string): void {
    if (!this.widget) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    console.log('[ChartManager] Changing interval from', this.currentInterval, 'to', interval);

    this.currentInterval = interval;

    try {
      // TradingView에서 interval을 변경하는 올바른 방법은 setSymbol을 사용하는 것
      this.widget.setSymbol(this.currentSymbol, interval);
      console.log('[ChartManager] Interval changed successfully to', interval);
    } catch (error) {
      console.error('[ChartManager] Interval change failed:', error);
    }
  }

  /**
   * 차트 새로고침
   */
  refreshChart(): void {
    if (!this.widget) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    try {
      if (typeof this.widget.chart !== 'function') {
        console.warn('[ChartManager] Chart method not available');
        return;
      }

      const chart = this.widget.chart();
      if (chart && typeof chart.refresh === 'function') {
        chart.refresh();
      }
    } catch (error) {
      console.error('[ChartManager] Chart refresh failed');
    }
  }

  /**
   * 볼륨 지표 제거
   */
  removeVolumeIndicator(): void {
    if (!this.widget) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    try {
      const chart = this.widget.chart();
      if (!chart || typeof chart.getAllStudies !== 'function') {
        console.warn('[ChartManager] Chart getAllStudies method not available');
        return;
      }

      // 볼륨 지표 제거
      const studies = chart.getAllStudies();
      const volumeStudy = studies.find((s: any) => s.name === 'Volume');

      if (volumeStudy && typeof chart.removeEntity === 'function') {
        chart.removeEntity(volumeStudy.id);
        console.log('[ChartManager] Volume indicator removed');
      }
    } catch (error) {
      console.error('[ChartManager] Volume indicator remove failed');
    }
  }

  /**
   * 테스트용 지표 추가
   */
  addTestIndicators(): void {
    if (!this.isInitialized || !this.widget) {
      console.warn('[ChartManager] Cannot add test indicators: chart not initialized');
      return;
    }

    try {
      const chart = this.widget.chart();
      if (!chart || typeof chart.createStudy !== 'function') {
        console.warn('[ChartManager] Chart createStudy method not available');
        return;
      }

      const theme = this.currentSettings ? getThemeFromSettings(this.currentSettings) : 'redBlue';
      const themeColors = getThemeColors(theme);

      const studyOverrides = {
        'volume.color.0': themeColors.up,
        'volume.color.1': themeColors.down,
        'volume.transparency': 50,
      };

      chart.createStudy('Volume', false, false, {}, null, studyOverrides);
      console.log('[ChartManager] Test indicators added successfully');
    } catch (error) {
      console.warn('[ChartManager] Failed to add test indicators:', error);
    }
  }

  /**
   * 테스트용 지표 제거
   */
  removeAllIndicators(): void {
    if (!this.widget) {
      console.warn('[ChartManager] Cannot remove indicators: chart not initialized');
      return;
    }

    try {
      const chart = this.widget.chart();
      if (!chart || typeof chart.getAllStudies !== 'function') {
        console.warn('[ChartManager] Chart getAllStudies method not available');
        return;
      }

      const studies = chart.getAllStudies();
      const volumeStudy = studies.find((s: any) => s.name === 'Volume');

      if (volumeStudy && typeof chart.removeEntity === 'function') {
        chart.removeEntity(volumeStudy.id);
        console.log('[ChartManager] Test indicators removed successfully');
      }
    } catch (error) {
      console.warn('[ChartManager] Failed to remove test indicators:', error);
    }
  }

  /**
   * 차트 설정 적용 (overrides)
   */
  applyChartOverrides(overrides: Record<string, any>): void {
    if (!this.widget || !this.isInitialized) {
      console.warn('[ChartManager] Chart is not initialized');
      return;
    }

    try {
      if (typeof this.widget.chart !== 'function') {
        console.warn('[ChartManager] Chart method not available');
        return;
      }

      const chart = this.widget.chart();
      if (chart && typeof chart.applyOverrides === 'function') {
        // 심볼 관련 override 로깅
        const symbolKeys = getSymbolOverrideKeys(overrides);
        const symbolOverrides = symbolKeys.reduce((obj: any, key) => {
          obj[key] = overrides[key];
          return obj;
        }, {});

        // overrides 적용
        chart.applyOverrides(overrides);
      } else {
        console.warn('[ChartManager] Chart applyOverrides method not available');
      }
    } catch (error) {
      console.error('[ChartManager] Failed to apply chart overrides:', error);
    }
  }

  /**
   * 설정 기반 차트 업데이트
   */
  async applyChartSettings(settings: ChartSettings): Promise<void> {
    if (!this.widget || !this.isInitialized) {
      console.warn('[ChartManager] Chart not initialized');
      return;
    }

    this.currentSettings = settings;

    try {
      // 차트 오버라이드 적용
      const overrides = generateAllOverrides(settings);
      const theme = getThemeFromSettings(settings);
      const themeOverrides = generateThemeOverrides(theme);
      const allOverrides = { ...overrides, ...themeOverrides };

      this.applyChartOverrides(allOverrides);

      // 테마 배경 업데이트
      this.updateThemeBackground();
    } catch (error) {
      console.error('[ChartManager] Error applying chart settings:', error);
    }
  }

  /**
   * 현재 설정 가져오기
   */
  getCurrentSettings(): ChartSettings | null {
    // 깊은 복사로 독립된 객체 반환 (참조 문제 방지)
    return this.currentSettings ? JSON.parse(JSON.stringify(this.currentSettings)) : null;
  }

  /**
   * 설정 변경으로 인한 차트 재생성이 필요한지 확인
   */
  needsRecreation(newSettings: ChartSettings): boolean {
    if (!this.currentSettings) return true;

    const needsRecreation = needsFeaturesRecreation(this.currentSettings, newSettings);

    if (needsRecreation) {
      console.log('[ChartManager] Recreation needed due to trading feature changes:', {
        showBuySellButtons:
          this.currentSettings.trading.showBuySellButtons !==
          newSettings.trading.showBuySellButtons,
        showOrders: this.currentSettings.trading.showOrders !== newSettings.trading.showOrders,
      });
    } else {
      console.log('[ChartManager] Settings can be applied via overrides (no recreation needed)');
    }

    return needsRecreation;
  }

  /**
   * 설정을 TradingView overrides로 변환
   */
  public convertSettingsToOverrides(settings: ChartSettings): Record<string, any> {
    const basicOverrides = generateAllOverrides(settings);
    const theme = getThemeFromSettings(settings);
    const themeOverrides = generateThemeOverrides(theme);

    return { ...basicOverrides, ...themeOverrides };
  }

  /**
   * 심볼 구독
   */
  subscribeSymbol(symbol: string, callback: (data: any) => void): string {
    const wsService = getWebSocketService();
    const subscriptionId = wsService.subscribe(symbol, callback);
    this.currentSubscriberUID = subscriptionId;
    console.log('[ChartManager] Subscribed to symbol:', symbol, 'ID:', subscriptionId);
    return subscriptionId;
  }

  /**
   * 심볼 구독 해제
   */
  unsubscribeSymbol(symbol: string): void {
    if (this.currentSubscriberUID) {
      const wsService = getWebSocketService();
      wsService.unsubscribe(this.currentSubscriberUID);
      this.currentSubscriberUID = null;
      console.log('[ChartManager] Unsubscribed from symbol:', symbol);
    }
  }

  /**
   * 현재 심볼 정보 가져오기
   */
  getCurrentSymbolInfo(): ChartSymbolInfo {
    return {
      symbol: this.currentSymbol,
      interval: this.currentInterval,
      lastUpdate: Date.now(),
    };
  }

  /**
   * 차트 위젯 인스턴스 가져오기
   */
  getWidget(): TradingViewWidget | null {
    return this.widget;
  }

  /**
   * 초기화 상태 확인
   */
  isChartReady(): boolean {
    return this.isInitialized && this.widget !== null;
  }

  /**
   * 차트 로드 완료 후에만 적용 가능한 설정들
   * 차트 위젯이 완전히 초기화된 후 실행되는 설정
   */
  private applyPostLoadSettings(): void {
    if (!this.widget || !this.currentSettings) {
      console.warn(
        '[ChartManager] Cannot apply post-load settings: widget or settings not available'
      );
      return;
    }

    try {
      // 차트가 완전히 로드된 후 설정 재적용
      // console.log('[ChartManager] Applying post-load settings...');

      // 현재 설정을 overrides로 변환하여 적용
      const overrides = this.convertSettingsToOverrides(this.currentSettings);
      this.applyChartOverrides(overrides);

      // 테마 배경 업데이트
      this.updateThemeBackground();

      // 테스트용 볼륨 지표 추가
      // this.addTestIndicators();

      console.log('[ChartManager] Post-load settings applied successfully');
    } catch (error) {
      console.error('[ChartManager] Failed to apply post-load settings:', error);
    }
  }

  /**
   * 테마 변경에 따른 차트 배경 업데이트
   */
  updateThemeBackground(): void {
    if (!this.widget || !this.isInitialized) {
      console.warn('[ChartManager] Chart not initialized, cannot update theme background');
      return;
    }

    try {
      // 현재 테마에 따른 배경 색상 overrides 생성
      const themeBackgroundOverrides = generateThemeBackgroundOverrides();

      // 차트에 배경 색상 적용
      this.applyChartOverrides(themeBackgroundOverrides);

      console.log('[ChartManager] Theme background updated:', themeBackgroundOverrides);
    } catch (error) {
      console.error('[ChartManager] Failed to update theme background:', error);
    }
  }

  /**
   * 차트 정리 및 해제
   */
  destroy(): void {
    if (this.currentSymbol && this.currentSubscriberUID) {
      this.unsubscribeSymbol(this.currentSymbol);
    }

    if (this.widget) {
      try {
        if (typeof this.widget.chart === 'function') {
          const chart = this.widget.chart();
          if (chart && typeof chart.remove === 'function') {
            chart.remove();
          }
        }
      } catch (error) {
        console.error('[ChartManager] Chart destroy failed');
      }
    }

    this.widget = null;
    this.isInitialized = false;
    this.currentSymbol = '';
    this.currentInterval = '1';
    this.currentSubscriberUID = null;

    console.log('[ChartManager] Chart destroyed');
  }
}
