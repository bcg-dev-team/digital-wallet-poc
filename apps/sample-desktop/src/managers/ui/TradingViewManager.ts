/**
 * TradingView 위젯 전역 관리자
 * TradingView 위젯 인스턴스를 재사용하여 성능을 최적화합니다.
 */

import type { ChartConfig } from '@template/types';
import { ChartManager } from './ChartManager';

/**
 * TradingView 위젯 전역 관리자
 * 이미 초기화된 차트 위젯을 재사용하여 성능을 최적화합니다.
 */
export class TradingViewManager {
  private static instance: TradingViewManager;
  private chartManagers: Map<string, ChartManager> = new Map();
  private initializedContainers: Set<string> = new Set();

  private constructor() {}

  /**
   * 싱글톤 인스턴스 반환
   */
  public static getInstance(): TradingViewManager {
    if (!TradingViewManager.instance) {
      TradingViewManager.instance = new TradingViewManager();
    }
    return TradingViewManager.instance;
  }

  /**
   * 차트 매니저 가져오기 또는 생성
   * @param containerId - 차트 컨테이너 ID
   * @returns ChartManager 인스턴스
   */
  public getChartManager(containerId: string): ChartManager {
    if (!this.chartManagers.has(containerId)) {
      const chartManager = new ChartManager();
      this.chartManagers.set(containerId, chartManager);
      console.log(`[TradingViewManager] 새로운 ChartManager 생성: ${containerId}`);
    }
    return this.chartManagers.get(containerId)!;
  }

  /**
   * 기존 차트 매니저 가져오기 (생성하지 않음)
   * @param containerId - 차트 컨테이너 ID
   * @returns ChartManager 인스턴스 또는 null
   */
  public getExistingChartManager(containerId: string): ChartManager | null {
    return this.chartManagers.get(containerId) || null;
  }

  /**
   * 차트 초기화 (이미 초기화된 경우 재사용)
   * @param config - 차트 설정
   * @returns Promise<void>
   */
  public async initializeChart(config: ChartConfig): Promise<void> {
    const containerId = config.container;

    // 이미 초기화된 컨테이너인 경우 재사용
    if (this.initializedContainers.has(containerId)) {
      console.log(`[TradingViewManager] 기존 차트 재사용: ${containerId}`);
      const chartManager = this.getChartManager(containerId);

      // 심볼이나 간격이 변경된 경우에만 업데이트
      if (config.symbol && chartManager.getCurrentSymbolInfo().symbol !== config.symbol) {
        chartManager.changeSymbol(config.symbol);
      }
      if (config.interval && chartManager.getCurrentSymbolInfo().interval !== config.interval) {
        chartManager.changeInterval(config.interval);
      }

      return;
    }

    // 새로운 차트 초기화
    console.log(`[TradingViewManager] 새로운 차트 초기화: ${containerId}`);
    const chartManager = this.getChartManager(containerId);

    try {
      await chartManager.initializeChart(config);
      this.initializedContainers.add(containerId);
      console.log(`[TradingViewManager] 차트 초기화 완료: ${containerId}`);
    } catch (error) {
      console.error(`[TradingViewManager] 차트 초기화 실패: ${containerId}`, error);
      throw error;
    }
  }

  /**
   * 차트 심볼 변경
   * @param containerId - 차트 컨테이너 ID
   * @param symbol - 새로운 심볼
   */
  public changeSymbol(containerId: string, symbol: string): void {
    const chartManager = this.getChartManager(containerId);
    if (chartManager.isChartReady()) {
      chartManager.changeSymbol(symbol);
      console.log(`[TradingViewManager] 심볼 변경: ${containerId} -> ${symbol}`);
    }
  }

  /**
   * 차트 간격 변경
   * @param containerId - 차트 컨테이너 ID
   * @param interval - 새로운 간격
   */
  public changeInterval(containerId: string, interval: string): void {
    const chartManager = this.getChartManager(containerId);
    if (chartManager.isChartReady()) {
      chartManager.changeInterval(interval);
      console.log(`[TradingViewManager] 간격 변경: ${containerId} -> ${interval}`);
    }
  }

  /**
   * 차트 설정 적용
   * @param containerId - 차트 컨테이너 ID
   * @param settings - 차트 설정
   */
  public async applySettings(containerId: string, settings: any): Promise<void> {
    const chartManager = this.getChartManager(containerId);
    if (chartManager.isChartReady()) {
      await chartManager.applyChartSettings(settings);
      console.log(`[TradingViewManager] 설정 적용: ${containerId}`);
    }
  }

  /**
   * 차트 제거
   * @param containerId - 차트 컨테이너 ID
   */
  public destroyChart(containerId: string): void {
    const chartManager = this.chartManagers.get(containerId);
    if (chartManager) {
      chartManager.destroy();
      this.chartManagers.delete(containerId);
      this.initializedContainers.delete(containerId);
      console.log(`[TradingViewManager] 차트 제거: ${containerId}`);
    }
  }

  /**
   * 모든 차트 제거
   */
  public destroyAllCharts(): void {
    console.log(`[TradingViewManager] 모든 차트 제거 시작 (${this.chartManagers.size}개)`);

    this.chartManagers.forEach((chartManager, containerId) => {
      chartManager.destroy();
      console.log(`[TradingViewManager] 차트 제거: ${containerId}`);
    });

    this.chartManagers.clear();
    this.initializedContainers.clear();

    console.log('[TradingViewManager] 모든 차트 제거 완료');
  }

  /**
   * 초기화된 컨테이너 목록 반환
   */
  public getInitializedContainers(): string[] {
    return Array.from(this.initializedContainers);
  }

  /**
   * 차트 매니저 개수 반환
   */
  public getChartManagerCount(): number {
    return this.chartManagers.size;
  }
}

/**
 * 전역 TradingView 매니저 인스턴스
 */
export const tradingViewManager = TradingViewManager.getInstance();
