import * as React from "react";
import { cn } from "../utils/cn";

export interface SmallButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary";
}

/**
 * 작은 버튼 컴포넌트 (주소확인 등)
 */
export const SmallButton = React.forwardRef<HTMLButtonElement, SmallButtonProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-[#f4f6f9] text-[#333950] hover:bg-[#e4e6e9] active:bg-[#d4d6d9]",
      primary: "bg-[#2a3fec] text-white hover:bg-[#1a2fdc] active:bg-[#0a1fcc]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "px-[8px] py-[5px] rounded-[6px]",
          "font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium text-[11px] leading-[16px]",
          "transition-all duration-200",
          "hover:shadow-sm active:scale-95",
          "cursor-pointer",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SmallButton.displayName = "SmallButton";

