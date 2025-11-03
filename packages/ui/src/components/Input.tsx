import React from "react";
import { cn } from "../utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
  helperText?: string;
}

/**
 * 입력 필드 컴포넌트
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", suffix, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative w-full">
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full h-[40px] px-0 py-[8px]",
              "bg-white border-0 border-b-2 border-[#f4f4f4]",
              "font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium text-[16px] leading-[24px]",
              "text-[#111111] placeholder:text-[#aaaeb3]",
              "transition-all duration-200",
              "hover:border-[#e4e6e9]",
              "focus:outline-none focus:border-[#2a3fec] focus:shadow-[0_2px_0_0_rgba(42,63,236,0.1)]",
              suffix && "pr-[80px]",
              className
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-[8px]">
              {suffix}
            </div>
          )}
        </div>
        {helperText && (
          <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium text-[11px] text-[#aaaeb3] mt-[8px]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

