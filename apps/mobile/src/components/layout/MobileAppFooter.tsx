import BottomNavigation, { BottomNavigationProps } from "./BottomNavigation";
import MobileStickyFooter from "./MobileStickyFooter";

export interface MobileAppFooterProps extends BottomNavigationProps {
  variant?: "default" | "flat";
}

/**
 * 공통 하단 네비게이션을 고정 배치합니다.
 * @param variant - Sticky Footer 스타일
 * @returns 하단 네비게이션 래퍼
 */
export default function MobileAppFooter({ variant = "flat", ...navigationProps }: MobileAppFooterProps) {
  return (
    <MobileStickyFooter variant={variant}>
      <BottomNavigation {...navigationProps} />
    </MobileStickyFooter>
  );
}

