/**
 * 로컬 스토리지 키 상수 정의
 * 모든 localStorage 키는 이 클래스를 통해 관리됩니다.
 */
export default class LocalStorageKey {
  // 인증 관련
  static ACCESS_TOKEN = 'access_token';
  static SAVED_EMAIL = 'saved_email';

  // 테마 관련
  static THEME_MODE = 'theme-mode';

  // 차트 관련
  static GLOBAL_CHART_SETTINGS = 'global-chart-settings';
  static REALTIME_CONFIG = 'realtime-config';

  // 워크스페이스 관련
  static MODA_WORKSPACES = 'moda_workspaces';

  // 참고: TradingView 라이브러리에서 내부적으로 사용하는 키들
  // - tv.logger.loglevel
  // - tv.logger.logHighRate
  // - tvlocalstorage.available
  static SELECTED_ACCOUNT = 'selected_account';

  // 주문 패널 관련
  static AUTO_LIQUIDATION_ACCORDION_OPEN = 'auto-liquidation-accordion-open';
}
