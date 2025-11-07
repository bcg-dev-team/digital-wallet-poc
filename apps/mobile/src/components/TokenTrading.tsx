import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TokenTradingScreen from "../imports/TokenTrading";

export default function TokenTrading() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-name="ic_00com_28_line_arrow_l_111"]')) {
        navigate(-1);
      }
    };

    const backButton = container.querySelector('[data-name="ic_00com_28_line_arrow_l_111"]');
    if (backButton instanceof HTMLElement) {
      backButton.style.cursor = "pointer";
    }

    container.addEventListener("click", handleClick);
    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [navigate]);

  return (
    <div ref={containerRef} className="relative min-h-full">
      <TokenTradingScreen />
    </div>
  );
}
