/**
 * 글로벌 차트 설정 관리
 * 모든 차트 인스턴스에 적용되는 전역 설정을 통합 관리
 * 테마, 심볼 표시, 스케일, 트레이딩 설정 등을 포함
 */

import {
  CHART_THEME_COLORS,
  generateThemeOverrides,
  getThemeFromSettings,
} from '@/utils/chart/ChartTheme';
import LocalStorageService from '@/services/localStorage/local-storage.service';
import LocalStorageKey from '@/services/localStorage/local-storage-key';
import type { ChartSettings } from '@template/types';
import { reactive, readonly } from 'vue';

// 글로벌 차트 설정 상태
const globalChartSettings = reactive<ChartSettings>({
  // === 기본 탭 ===
  basic: {
    // 테마 (redBlue: 빨강/파랑, greenRed: 녹색/빨강)
    theme: 'redBlue',
    // 가격 정밀도
    precision: 'default',
    // 타임존 (UTC +09:00) 서울(KST)
    timezone: 'Asia/Seoul',
    // 시간 형식 (24시간)
    locale: 'ko',
  },
  // === 심볼 및 지표 탭 ===
  symbols: {
    // 지표 값 (지표 이름 표시)
    showIndicatorNames: true,
    // 지표 매개변수 (지표 설정값 표시)
    showIndicatorArguments: false,
    // 지표 값 (지표 계산값 표시)
    showIndicatorValues: false,
  },
  // === 축 및 눈금선 탭 ===
  scales: {
    // 종목 가격 (우측 가격 축 표시)
    showPriceLabels: true,
    // 격자선 (차트 격자선 표시/숨김)
    showGridLines: false,
    // 격자선 모드 (수직/수평)
    gridLineMode: 'both',
    // 수직 격자선 색상
    verticalGridColor: '#e6e6e6',
    // 수평 격자선 색상
    horizontalGridColor: '#e6e6e6',
    // 십자선 (마우스 커서 십자선 표시)
    showCrosshair: true,
    // 십자선 색상
    crosshairColor: '#8f9299',
  },
  // === 트레이딩 탭 ===
  trading: {
    // 매수/매도 버튼 (차트 위 거래 버튼 표시)
    showBuySellButtons: false,
    // 즉시 주문 실행 (원클릭 거래 활성화)
    instantOrderExecution: false,
    // 주문 (차트에 주문 정보 표시)
    showOrders: false,
  },
});

// 등록된 차트 매니저들 추적 (글로벌 관리)
const globalChartManagers = new Set<any>();

/**
 * 개별 차트 매니저에 설정 적용
 */
async function applySettingsToChart(chartManager: any, newSettings: ChartSettings): Promise<void> {
  if (!chartManager?.applyChartSettings) return;

  const needsRecreation = chartManager.needsRecreation?.(newSettings) ?? false;

  // 차트 재생성이 필요한 경우
  if (needsRecreation) {
    await chartManager.applyChartSettings(newSettings);
    return;
  }

  // overrides 적용이 불가능한 경우
  if (!chartManager.applyChartOverrides) return;

  // 전체 설정을 overrides로 변환 가능한 경우
  if (chartManager.convertSettingsToOverrides) {
    const allOverrides = chartManager.convertSettingsToOverrides(newSettings);
    chartManager.applyChartOverrides(allOverrides);
    return;
  }

  // fallback: 테마만 적용
  applyThemeOnlyFallback(chartManager, newSettings);
}

/**
 * 모든 차트에 테마 배경 업데이트 적용
 */
function updateAllChartsThemeBackground(): void {
  globalChartManagers.forEach((chartManager) => {
    if (chartManager.updateThemeBackground) {
      try {
        chartManager.updateThemeBackground();
      } catch (error) {
        console.error('[GlobalChartSettings] Failed to update theme background:', error);
      }
    }
  });
}

/**
 * fallback: 테마만 적용
 */
function applyThemeOnlyFallback(chartManager: any, newSettings: ChartSettings): void {
  const theme = getThemeFromSettings(newSettings);
  const themeOverrides = generateThemeOverrides(theme);
  chartManager.applyChartOverrides(themeOverrides);
}

/**
 * 글로벌 차트 설정 관리 composable
 * 모든 차트 인스턴스의 설정을 중앙에서 통합 관리
 */
export function useGlobalChartSettings() {
  /**
   * 차트 매니저 등록 (글로벌 관리 대상에 추가)
   */
  const registerChartManager = (chartManager: any) => {
    globalChartManagers.add(chartManager);
  };

  /**
   * 차트 매니저 등록 해제 (글로벌 관리 대상에서 제거)
   */
  const unregisterChartManager = (chartManager: any) => {
    globalChartManagers.delete(chartManager);
  };

  /**
   * 글로벌 차트 설정 가져오기
   */
  const getGlobalChartSettings = (): ChartSettings => {
    return { ...globalChartSettings };
  };

  /**
   * 글로벌 차트 설정 업데이트 (모든 차트에 적용)
   */
  const updateGlobalChartSettings = (newSettings: ChartSettings) => {
    // 테마 변경 여부 확인
    const themeChanged = globalChartSettings.basic.theme !== newSettings.basic.theme;

    // 글로벌 설정 업데이트
    Object.assign(globalChartSettings, newSettings);

    // 백그라운드에서 모든 차트에 설정 적용
    globalChartManagers.forEach((chartManager) => {
      applySettingsToChart(chartManager, newSettings).catch((error) => {
        console.error('[GlobalChartSettings] Failed to apply settings:', error);
      });
    });

    // 테마가 변경된 경우 배경 즉시 업데이트
    if (themeChanged) {
      updateAllChartsThemeBackground();
    }

    // 로컬 스토리지에 저장
    LocalStorageService.setItem(LocalStorageKey.GLOBAL_CHART_SETTINGS, newSettings);
  };

  /**
   * 테마만 변경
   */
  const changeTheme = (theme: 'greenRed' | 'redBlue') => {
    const newSettings = { ...globalChartSettings };
    newSettings.basic.theme = theme;
    updateGlobalChartSettings(newSettings);
  };

  /**
   * 로컬 스토리지에서 설정 로드
   */
  const loadSettingsFromStorage = () => {
    try {
      const saved = LocalStorageService.getItem(LocalStorageKey.GLOBAL_CHART_SETTINGS);
      if (saved) {
        Object.assign(globalChartSettings, saved);
      }
    } catch (error) {
      console.error('[GlobalChartSettings] Failed to load settings from storage:', error);
    }
  };

  /**
   * 현재 테마 색상 가져오기
   */
  const getCurrentThemeColors = () => {
    return CHART_THEME_COLORS[globalChartSettings.basic.theme];
  };

  // 초기화 시 설정 로드
  loadSettingsFromStorage();

  return {
    globalChartSettings,
    registerChartManager,
    unregisterChartManager,
    getGlobalChartSettings,
    updateGlobalChartSettings,
    changeTheme,
    loadSettingsFromStorage,
    getCurrentThemeColors,
    updateAllChartsThemeBackground,
  };
}

// 싱글톤 인스턴스
let globalChartSettingsInstance: ReturnType<typeof useGlobalChartSettings> | null = null;

/**
 * 싱글톤 글로벌 차트 설정 인스턴스 가져오기
 */
export function getGlobalChartSettingsInstance() {
  if (!globalChartSettingsInstance) {
    globalChartSettingsInstance = useGlobalChartSettings();
  }
  return globalChartSettingsInstance;
}
