/**
 * 차트 레이아웃 관련 유틸리티 함수들
 * @fileoverview 차트 그리드 레이아웃, 위치 계산, 정렬 등의 유틸리티 함수
 */

import type { ChartLayout, ChartData } from '@template/types';

/**
 * 레이아웃별 차트 개수 반환
 * @param layout 차트 레이아웃 타입
 * @returns 해당 레이아웃에서 표시할 수 있는 차트 개수
 */
export function getChartCountForLayout(layout: ChartLayout): number {
  const countMap: Record<ChartLayout, number> = {
    '1x1': 1,
    '2x2': 4,
    '3x3': 9,
    '4x4': 16,
  };
  return countMap[layout] || 4;
}

/**
 * 그리드 레이아웃 CSS 클래스 반환
 * @param layout 차트 레이아웃 타입
 * @returns Tailwind CSS 그리드 클래스 문자열
 */
export function getGridLayoutClass(layout: ChartLayout): string {
  const layoutMap: Record<ChartLayout, string> = {
    '1x1': 'grid-cols-1 grid-rows-1',
    '2x2': 'grid-cols-2 grid-rows-2',
    '3x3': 'grid-cols-3 grid-rows-3',
    '4x4': 'grid-cols-4 grid-rows-4',
  };
  return layoutMap[layout];
}

/**
 * 다음 사용 가능한 차트 위치 계산
 * @param charts 현재 차트 목록
 * @param layout 차트 레이아웃 타입
 * @returns 사용 가능한 다음 위치 (row, col)
 */
export function getNextAvailablePosition(
  charts: ChartData[],
  layout: ChartLayout
): { row: number; col: number } {
  const layoutConfig = {
    '1x1': { rows: 1, cols: 1 },
    '2x2': { rows: 2, cols: 2 },
    '3x3': { rows: 3, cols: 3 },
    '4x4': { rows: 4, cols: 4 },
  };

  const config = layoutConfig[layout];
  const usedPositions = charts.map((chart) => chart.position);

  for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.cols; col++) {
      const position = { row, col };
      if (!usedPositions.some((pos) => pos.row === row && pos.col === col)) {
        return position;
      }
    }
  }

  // 모든 위치가 사용 중인 경우 첫 번째 위치 반환
  return { row: 0, col: 0 };
}

/**
 * 차트를 위치별로 정렬
 * @param charts 정렬할 차트 목록
 * @returns 위치별로 정렬된 차트 목록
 */
export function sortChartsByPosition(charts: ChartData[]): ChartData[] {
  return [...charts].sort((a, b) => {
    if (a.position.row !== b.position.row) {
      return a.position.row - b.position.row;
    }
    return a.position.col - b.position.col;
  });
}
