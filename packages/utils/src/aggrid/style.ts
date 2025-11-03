/**
 * 색상 관련 유틸리티 함수들
 */

/**
 * 수익/손실에 따른 색상 클래스 반환
 * @param value - 수익/손실 값
 * @returns CSS 클래스명
 */
export function getProfitLossClass(value: number): string {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'neutral';
}

/**
 * 수익/손실에 따른 색상 스타일 객체 반환
 * @param value - 수익/손실 값
 * @param textAlign - 텍스트 정렬 (기본값: 'right')
 * @returns 스타일 객체
 */
export function getProfitLossStyle(
  value: number,
  textAlign: 'left' | 'center' | 'right' = 'right'
): { textAlign: string; color: string } {
  const baseStyle = { textAlign };

  if (value > 0) {
    return { ...baseStyle, color: 'var(--font-color-buy)' };
  } else if (value < 0) {
    return { ...baseStyle, color: 'var(--font-color-sell)' };
  } else {
    return { ...baseStyle, color: 'var(--font-color-default)' };
  }
}

/**
 * 수익/손실에 따른 CSS 변수 색상만 반환
 * @param value - 수익/손실 값
 * @returns CSS 색상 변수
 */
export function getProfitLossColor(value: number): string {
  return getProfitLossStyle(value).color;
}

/**
 * 미리 정의된 스타일 객체들
 */
export const predefinedStyles = {
  center: { textAlign: 'center' as const },
  right: { textAlign: 'right' as const },
  left: { textAlign: 'left' as const },

  // 수익/손실 스타일
  profit: { textAlign: 'right' as const, color: 'var(--font-color-buy)' },
  loss: { textAlign: 'right' as const, color: 'var(--font-color-sell)' },
  neutral: { textAlign: 'right' as const, color: 'var(--font-color-default)' },
} as const;
