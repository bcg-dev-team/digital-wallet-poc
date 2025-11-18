import { ReactNode, RefObject, useMemo, useRef } from "react";
import clsx from "clsx";
import MobileViewportContext from "./MobileViewportContext";

interface MobileViewportProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  contentRef?: RefObject<HTMLDivElement>;
  scrollable?: boolean;
}

/**
 * 360x776 고정 뷰포트 내에서 화면을 렌더링하기 위한 레이아웃 래퍼입니다.
 * 스크롤바는 숨기고, 내부 컨텐츠는 필요 시 스크롤이 가능합니다.
 */
export default function MobileViewport({
  children,
  className,
  contentClassName,
  contentRef,
  scrollable = true,
}: MobileViewportProps) {
  const mergedContentRef = useRef<HTMLDivElement>(null);
  const footerContainerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const resolvedContentRef = contentRef ?? mergedContentRef;

  const contextValue = useMemo(
    () => ({
      footerContainerRef,
      viewportRef,
      contentRef: resolvedContentRef,
    }),
    [resolvedContentRef]
  );

  return (
    <MobileViewportContext.Provider value={contextValue}>
      <div className="flex min-h-screen items-center justify-center bg-[#eef1f6] py-6">
        <div
          className={clsx(
            "mobile-viewport relative h-[776px] w-[360px] overflow-hidden rounded-[10px] bg-white shadow-[0_20px_60px_rgba(29,31,89,0.1)]",
            className
          )}
          ref={viewportRef}
        >
          <div
            ref={resolvedContentRef}
            className={clsx(
              "relative flex h-full flex-col",
              scrollable ? "overflow-y-auto scrollbar-hide" : "overflow-hidden",
              contentClassName
            )}
          >
            {children}
          </div>
          <div
            ref={footerContainerRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex flex-col items-center"
          />
        </div>
      </div>
    </MobileViewportContext.Provider>
  );
}
