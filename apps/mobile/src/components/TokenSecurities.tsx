import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TokenSecuritiesScreen from "../imports/TokenSecurities";

export default function TokenSecurities() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const backButton = target.closest('[data-name="ic_00com_28_line_arrow_l_111"]');
      if (backButton) {
        navigate("/wallet");
        return;
      }
    };

    const backElement = container.querySelector('[data-name="ic_00com_28_line_arrow_l_111"]');
    if (backElement instanceof HTMLElement) {
      backElement.style.cursor = "pointer";
    }

    container.addEventListener("click", handleClick);
    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [navigate]);

  return (
    <div ref={containerRef} className="relative min-h-full">
      <TokenSecuritiesScreen onSelectFirst={() => navigate("/token-securities/detail")} />
    </div>
  );
}
