/**
 * 차트 설정 유틸리티 클래스
 * TradingView 차트의 기본 설정을 담당합니다.
 */

/**
 * 가격 스케일 설정
 * @param chart - TradingView 차트 인스턴스
 */
export function setupPriceScale(chart: any): void {
  try {
    if (chart.getPanes && chart.getPanes().length > 0) {
      const panes = chart.getPanes();
      const firstPane = panes[0];

      if (firstPane && typeof firstPane.getRightPriceScale === 'function') {
        const priceScale = firstPane.getRightPriceScale();
        if (priceScale) {
          priceScale.setAutoScale(true);
          priceScale.setVisible(true);
        }
      }
    }
  } catch (error) {
    console.error('[ChartSetupUtils] Price scale setup failed');
  }
}

/**
 * 시간 축 설정
 * @param chart - TradingView 차트 인스턴스
 */
export function setupTimeScale(chart: any): void {
  try {
    if (chart.timeScale) {
      const timeScale = chart.timeScale();
      if (timeScale) {
        timeScale.setVisible(true);
        timeScale.setTimeVisible(true);
        timeScale.setSecondsVisible(false);
        timeScale.refresh();
      }
    }
  } catch (error) {
    console.error('[ChartSetupUtils] Time scale setup failed');
  }
}

/**
 * 차트 기본 설정 적용
 * onChartReady 콜백에서 호출되므로 차트가 이미 준비된 상태
 * @param chart - TradingView 차트 인스턴스
 */
export function setupChart(chart: any): void {
  if (!chart) {
    return;
  }

  try {
    if (chart && typeof chart.chart === 'function') {
      const instance = chart.chart();
      if (instance) {
        // 가격 스케일 설정
        setupPriceScale(instance);

        // 시간 축 설정
        setupTimeScale(instance);

        // 차트 새로고침
        if (typeof instance.refresh === 'function') {
          instance.refresh();
        }

        console.log('[ChartSetupUtils] Chart setup completed successfully');
      } else {
        console.warn('[ChartSetupUtils] Chart instance is not available');
      }
    } else {
      console.warn('[ChartSetupUtils] Chart widget is not ready');
    }
  } catch (error) {
    console.error('[ChartSetupUtils] Chart setup failed:', error);
  }
}
