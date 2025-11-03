import React from "react";
import { cn } from "../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error";
  children: React.ReactNode;
}

/**
 * 뱃지 컴포넌트
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-[#f4f6f9] text-[#333950] hover:bg-[#e4e6e9]",
      success: "bg-[#f3f9fe] text-[#2d78fa] hover:bg-[#e3f0fe]",
      warning: "bg-[#ffe8e8] text-[#fa2d42] hover:bg-[#ffd8d8]",
      error: "bg-[#fcf4f4] text-[#fa2d42] hover:bg-[#fce4e4]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-[8px] py-[4px] rounded-[4px]",
          "font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium text-[11px] leading-[16px]",
          "transition-all duration-200 cursor-default",
          "hover:scale-105",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

