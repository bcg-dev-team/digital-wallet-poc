/**
 * Manager Factory
 * 모든 Manager 인스턴스를 중앙에서 관리하는 팩토리 클래스
 * 
 * Note: DataSourceManager와 WebSocketManager는 제거됨
 * 데이터 소스 관리는 ServiceFactory를 통해 직접 처리
 */

// 타입 정의
export type ManagerName = 'chart';

export interface ManagerRegistry {
  chart: import('./ui/ChartManager').ChartManager;
}

class ManagerFactory {
  private static instance: ManagerFactory;
  private managers: Partial<ManagerRegistry> = {};
  private isInitialized = false;

  private constructor() {}

  static getInstance(): ManagerFactory {
    if (!ManagerFactory.instance) {
      ManagerFactory.instance = new ManagerFactory();
    }
    return ManagerFactory.instance;
  }

  /**
   * 모든 Manager 초기화
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Lazy import로 순환 의존성 방지
      const { ChartManager } = await import('./ui/ChartManager');

      // Manager 인스턴스 생성
      this.managers.chart = new ChartManager();

      this.isInitialized = true;
      console.log('[ManagerFactory] 초기화 완료');
    } catch (error) {
      const err = error as Error;
      console.error('[ManagerFactory] 초기화 실패:', err);
      throw err;
    }
  }

  /**
   * 특정 Manager 가져오기
   */
  getManager<T extends ManagerName>(name: T): ManagerRegistry[T] {
    if (!this.isInitialized) {
      throw new Error(
        '[ManagerFactory] Factory가 초기화되지 않았습니다. initialize()를 먼저 호출하세요.'
      );
    }

    const manager = this.managers[name];
    if (!manager) {
      throw new Error(`[ManagerFactory] Manager '${name}'이 등록되지 않았습니다.`);
    }

    return manager as ManagerRegistry[T];
  }

  /**
   * 모든 Manager 정리
   */
  cleanup(): void {
    // 각 Manager의 cleanup/destroy 메서드 호출
    Object.entries(this.managers).forEach(([name, manager]) => {
      try {
        if (manager && 'cleanup' in manager && typeof manager.cleanup === 'function') {
          manager.cleanup();
        }
        if (manager && 'destroy' in manager && typeof manager.destroy === 'function') {
          manager.destroy();
        }
      } catch (error) {
        console.error(`[ManagerFactory] ${name} 정리 오류:`, error);
      }
    });

    // Manager 참조 제거
    this.managers = {};
    this.isInitialized = false;
  }

  /**
   * Factory 상태 확인
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * 등록된 Manager 목록 가져오기
   */
  getRegisteredManagers(): ManagerName[] {
    return Object.keys(this.managers) as ManagerName[];
  }
}

// 전역 Factory 인스턴스
export const managerFactory = ManagerFactory.getInstance();

// 편의를 위한 개별 Manager 접근 함수
export const getChartManager = () => managerFactory.getManager('chart');

// 통합 초기화 함수
export const initializeManagers = async () => {
  await managerFactory.initialize();
};

// 통합 정리 함수
export const cleanupManagers = () => {
  managerFactory.cleanup();
};
