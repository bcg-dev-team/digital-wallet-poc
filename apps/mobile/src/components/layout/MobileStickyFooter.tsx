import { ReactNode } from "react";
import clsx from "clsx";

interface MobileStickyFooterProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  dataName?: string;
}

/**
 * 하단 CTA 영역을 360x776 뷰포트 기준 중앙 정렬로 고정 표시합니다.
 */
export default function MobileStickyFooter({ children, className, wrapperClassName, dataName }: MobileStickyFooterProps) {
  return (
    <div className={clsx("mt-auto w-full", wrapperClassName)}>
      <div
        className={clsx(
          "sticky bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-white via-white to-transparent px-[20px] pb-[20px] pt-[24px]",
          className
        )}
        data-name={dataName}
      >
        {children}
      </div>
    </div>
  );
}
