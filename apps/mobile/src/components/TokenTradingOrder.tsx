import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenTradingScreen from "../imports/TokenTrading";
import BuyOrderBottomSheet from "./BuyOrderBottomSheet";

export default function TokenTradingOrder() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBuyOrderOpen, setBuyOrderOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleBuyOrderClick = () => {
      setBuyOrderOpen(true);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-name="ic_00com_28_line_arrow_l_111"]')) {
        navigate(-1);
        return;
      }
    };

    const backButton = container.querySelector('[data-name="ic_00com_28_line_arrow_l_111"]');
    if (backButton instanceof HTMLElement) {
      backButton.style.cursor = "pointer";
    }

    const buyOrderSelectors = [
      '[data-name="np_02tr_btn_r6_buy_sld_n.9"]',
      '[data-name="Group825766"]',
      '[data-name="Group825768"]',
    ];
    const buyOrderElements = container.querySelectorAll<HTMLElement>(buyOrderSelectors.join(", "));
    buyOrderElements.forEach((element) => {
      element.style.cursor = "pointer";
      element.addEventListener("click", handleBuyOrderClick);
    });

    container.addEventListener("click", handleClick);
    return () => {
      container.removeEventListener("click", handleClick);
      buyOrderElements.forEach((element) => {
        element.removeEventListener("click", handleBuyOrderClick);
      });
    };
  }, [navigate]);

  return (
    <div ref={containerRef} className="relative min-h-full">
      <TokenTradingScreen />
      <BuyOrderBottomSheet
        isOpen={isBuyOrderOpen}
        onClose={() => setBuyOrderOpen(false)}
        onConfirm={() => setBuyOrderOpen(false)}
      />
    </div>
  );
}
