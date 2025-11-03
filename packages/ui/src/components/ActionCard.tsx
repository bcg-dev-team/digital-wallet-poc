import React from "react";
import { cn } from "../utils/cn";

export interface ActionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  title: string;
  variant?: "deposit" | "withdraw" | "history";
  onClick?: () => void;
}

/**
 * 액션 카드 컴포넌트 (입금, 출금, 거래내역 등)
 */
export const ActionCard = React.forwardRef<HTMLDivElement, ActionCardProps>(
  ({ className, icon, title, variant = "history", onClick, ...props }, ref) => {
    const variantStyles = {
      deposit: "bg-[#ffe8e8] hover:bg-[#ffd8d8]",
      withdraw: "bg-[#f1f2ff] hover:bg-[#e1e2ff]",
      history: "bg-[#f4f6f9] hover:bg-[#e4e6e9]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "basis-0 grow min-h-px min-w-px relative rounded-[12px] shrink-0",
          "transition-all duration-200",
          "cursor-pointer",
          "hover:shadow-md hover:-translate-y-[2px]",
          "active:scale-95",
          variantStyles[variant],
          className
        )}
        onClick={onClick}
        {...props}
      >
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[12px] pt-[16px] px-[16px] relative w-full">
            <div className="content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold gap-[4px] items-start leading-[0] not-italic relative shrink-0 text-[#333950] text-[16px] tracking-[-0.08px] w-full">
              <div className="flex flex-col justify-center relative shrink-0 w-full">
                <p className="leading-[16px]">{icon}</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 w-full">
                <p className="leading-[24px]">{title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ActionCard.displayName = "ActionCard";

