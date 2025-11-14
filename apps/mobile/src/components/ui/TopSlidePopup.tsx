import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@digital-wallet/ui";
import { useMobileViewportContext } from "../layout/MobileViewportContext";

interface TopSlidePopupProps {
  message: string;
  open: boolean;
  duration?: number;
  onOpenChange?: (open: boolean) => void;
}

/**
 * 상단에서 슬라이드 다운되는 알림 팝업
 */
export function TopSlidePopup({ message, open, duration = 2400, onOpenChange }: TopSlidePopupProps) {
  const context = useMobileViewportContext();

  useEffect(() => {
    if (!open || !duration) return;

    const timer = window.setTimeout(() => {
      onOpenChange?.(false);
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [open, duration, onOpenChange]);

  if (!open && !message) {
    return null;
  }

  const target = context?.viewportRef.current;
  if (!target) return null;

  return createPortal(
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 top-4 z-[90] w-[280px] max-w-[92vw] -translate-x-1/2 transform transition-all duration-250 ease-out",
        open ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
      )}
      aria-live="assertive"
    >
      <div className="pointer-events-auto rounded-[10px] bg-white px-6 py-9 text-center text-[14px] font-medium leading-[20px] text-[#131313] shadow-[0px_2px_6px_rgba(0,0,0,0.10)]">
        {message.split("\n").map((line, index) => (
          <span key={index} className={index > 0 ? "mt-1 block" : "block"}>
            {line}
          </span>
        ))}
      </div>
    </div>,
    target
  );
}

