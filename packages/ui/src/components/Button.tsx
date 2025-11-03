import React from "react";
import { cn } from "../utils/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

/**
 * 디지털 월렛용 버튼 컴포넌트
 * Figma 디자인 기반
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    const baseStyles = "relative cursor-pointer font-medium not-italic text-center transition-all duration-200 active:scale-95";
    
    const variantStyles = {
      primary: "bg-[#4d54ff] text-white hover:bg-[#3d44ef] hover:shadow-lg active:bg-[#2a3fec]",
      secondary: "bg-[#f4f6f9] text-[#333950] hover:bg-[#e4e6e9] hover:shadow-md active:bg-[#d4d6d9]",
      outline: "border border-[#2a3fec] bg-white text-[#2a3fec] hover:bg-[#f1f2ff] hover:border-[#1a2fdc] active:bg-[#e1e2ff]",
    };

    const sizeStyles = {
      default: "h-[40px] px-[16px] rounded-[6px] text-[14px] leading-[20px]",
      sm: "h-[32px] px-[12px] rounded-[4px] text-[12px] leading-[16px]",
      lg: "h-[52px] px-[20px] rounded-[8px] text-[16px] leading-[24px]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          "font-['Spoqa_Han_Sans_Neo',sans-serif]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

