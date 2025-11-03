import React from "react";
import { cn } from "../utils/cn";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

/**
 * 구분선 컴포넌트
 */
export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#eeeeee] shrink-0 transition-colors duration-200",
          "hover:bg-[#dddddd]",
          orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

