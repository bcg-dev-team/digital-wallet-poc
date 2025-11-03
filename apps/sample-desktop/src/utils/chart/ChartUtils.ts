/**
 * 차트 관련 유틸리티 함수들
 */

/**
 * 고유한 ID를 생성합니다
 * @param prefix - ID 앞에 붙을 접두사
 * @returns 고유한 ID 문자열
 */
export function generateUniqueId(prefix: string = ''): string {
  const randomId = Math.random().toString(36).substring(2, 11);
  return prefix ? `${prefix}_${randomId}` : randomId;
}

/**
 * 차트 ID를 생성합니다
 * @returns 고유한 차트 ID 문자열
 */
export function generateChartId(): string {
  return `chart-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * 구독 ID를 생성합니다
 * @param symbol - 심볼명
 * @returns 고유한 구독 ID 문자열
 */
export function generateSubscriptionId(symbol: string): string {
  return `${symbol}_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * 차트 컨테이너 ID를 생성합니다
 * @param chartId - 사용자 지정 차트 ID (선택사항)
 * @returns TradingView 컨테이너 ID
 */
export function generateContainerId(chartId?: string): string {
  return chartId ? `tv_chart_container_${chartId}` : `tv_chart_container_${generateUniqueId()}`;
}

/**
 * 차트 매니저 인스턴스 ID를 생성합니다
 * @returns 차트 매니저 인스턴스 ID
 */
export function generateChartManagerId(): string {
  return `chart_${generateUniqueId()}`;
}
