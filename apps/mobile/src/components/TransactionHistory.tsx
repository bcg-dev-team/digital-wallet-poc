import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TransactionHistoryComponent from "../imports/TransactionHistory";
import WalletMenu from "../imports/WalletMenu";

export default function TransactionHistory() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  // 메뉴 버튼 클릭은 onOpenMenu prop으로 처리됨

  useEffect(() => {
    if (!isMenuOpen) return;
    const menuElement = menuRef.current;
    if (!menuElement) return;

    const clickableMenuItems = menuElement.querySelectorAll('[data-name="default"], [data-name="active"], [data-name="Group2117918730"]');
    clickableMenuItems.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.cursor = "pointer";
      }
    });

    const handleMenuClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-name="ic_00com_28_line_close"]')) {
        setMenuOpen(false);
        return;
      }

      const menuItem = target.closest('[data-name="default"]') || target.closest('[data-name="3nd depth"]');
      if (!menuItem) return;

      const text = menuItem.textContent?.replace(/\s+/g, "");
      if (text?.includes("SOL디지털월렛")) {
        setMenuOpen(false);
        navigate("/wallet");
        return;
      }

      if (text?.includes("토큰증권거래")) {
        setMenuOpen(false);
        navigate("/token-securities");
        return;
      }
    };

    menuElement.addEventListener("click", handleMenuClick);
    return () => menuElement.removeEventListener("click", handleMenuClick);
  }, [isMenuOpen, navigate]);

  return (
    <div ref={containerRef} className="relative min-h-full">
      <TransactionHistoryComponent 
        onNavigateBack={() => navigate("/wallet")}
        onOpenMenu={() => setMenuOpen(true)}
      />

      {isMenuOpen && (
        <div
          className="absolute inset-0 z-50 flex justify-center bg-black/40"
          onClick={() => setMenuOpen(false)}
        >
          <div
            ref={menuRef}
            className="relative w-full max-w-[360px]"
            onClick={(event) => event.stopPropagation()}
          >
            <WalletMenu />
          </div>
        </div>
      )}
    </div>
  );
}

