import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenTradingScreen from "../imports/TokenTrading";
import BuyOrderBottomSheet from "./BuyOrderBottomSheet";
import { TopSlidePopup } from "./ui/TopSlidePopup";

export default function TokenTradingOrder() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBuyOrderOpen, setBuyOrderOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleBuyOrderClick = () => {
      setBuyOrderOpen(true);
    };

    const buyOrderSelectors = [
      '[data-name="np_02tr_btn_r6_buy_sld_n.9"]',
      '[data-name="Group825766"]',
      '[data-name="Group825768"]',
      '[data-name="Group825768"] path',
      '[data-name="Group825768"] text',
      '[data-name="Group825768"] span',
      '[data-name="Group825766"] *',
      '[data-name="Group825768"] *'
    ];
    const buyOrderElements = container.querySelectorAll<HTMLElement>(buyOrderSelectors.join(", "));
    buyOrderElements.forEach((element) => {
      element.style.cursor = "pointer";
      element.addEventListener("click", handleBuyOrderClick);
    });

    return () => {
      buyOrderElements.forEach((element) => {
        element.removeEventListener("click", handleBuyOrderClick);
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-full">
      <TopSlidePopup
        message={toastMessage ?? ""}
        open={toastMessage !== null}
        onOpenChange={(open) => {
          if (!open) {
            setToastMessage(null);
          }
        }}
      />
      <TokenTradingScreen onNavigateBack={() => navigate(-1)} />
      <BuyOrderBottomSheet
        isOpen={isBuyOrderOpen}
        onClose={() => setBuyOrderOpen(false)}
        onConfirm={() => {
          setBuyOrderOpen(false);
          setToastMessage("주문을 접수했어요.\n체결내역에서 확인하세요.");
        }}
      />
    </div>
  );
}
