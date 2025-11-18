import { ReactNode } from "react";
import { cn } from "@digital-wallet/ui";

interface MobilePageHeaderProps {
  title: ReactNode;
  onBack?: () => void;
  rightSlot?: ReactNode;
  className?: string;
  titleClassName?: string;
  backButtonAriaLabel?: string;
}

/**
 * 모바일 화면 상단 헤더
 * - 뒤로가기 버튼과 제목, 우측 액션 영역을 제공합니다.
 */
export default function MobilePageHeader({
  title,
  onBack,
  rightSlot,
  className,
  titleClassName,
  backButtonAriaLabel = "뒤로 가기",
}: MobilePageHeaderProps) {
  return (
    <header className={cn("flex items-center border-[#f1f2f6] px-4 py-3", className)}>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label={backButtonAriaLabel}
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : (
        <span className="-ml-1 block h-9 w-9" aria-hidden />
      )}

      <div className={cn("ml-2 font-sans text-[16px] font-semibold text-[#111111]", titleClassName)}>{title}</div>

      <div className="ml-auto flex h-9 items-center justify-end gap-2">{rightSlot ?? null}</div>
    </header>
  );
}

