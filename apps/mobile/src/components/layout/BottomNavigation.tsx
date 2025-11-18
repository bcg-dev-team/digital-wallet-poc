import BottomNavigationInner from "./BottomNavigationInner";

export interface BottomNavigationProps {
  activeTab?: "home" | "favorites" | "price" | "order" | "balance";
  onNavigateHome?: () => void;
  onNavigateFavorites?: () => void;
  onNavigatePrice?: () => void;
  onNavigateOrder?: () => void;
  onNavigateBalance?: () => void;
  onOpenMenu?: () => void;
  onOpenSettings?: () => void;
}

/**
 * 하단 네비게이션 컴포넌트
 * TokenTrading의 Quickmenu 스타일과 완전히 동일하게 구현
 * Inner 컴포넌트를 공통화하여 사용
 */
export default function BottomNavigation({
  activeTab = "home",
  onNavigateHome,
  onNavigateFavorites,
  onNavigatePrice,
  onNavigateOrder,
  onNavigateBalance,
  onOpenMenu,
  onOpenSettings,
}: BottomNavigationProps) {
  return (
    <nav className="relative h-[52px] w-full bg-white" data-name="quickmenu">
      <BottomNavigationInner
        activeTab={activeTab}
        onNavigateHome={onNavigateHome}
        onNavigateFavorites={onNavigateFavorites}
        onNavigatePrice={onNavigatePrice}
        onNavigateOrder={onNavigateOrder}
        onNavigateBalance={onNavigateBalance}
        onOpenMenu={onOpenMenu}
      />
    </nav>
  );
}
