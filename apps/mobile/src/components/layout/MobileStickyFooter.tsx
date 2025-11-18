import type { CSSProperties } from "react";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { useMobileViewportContext } from "./MobileViewportContext";

interface MobileStickyFooterProps {
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  dataName?: string;
  variant?: "default" | "flat";
}

/**
 * 하단 CTA 영역을 360x776 뷰포트 기준 중앙 정렬로 고정 표시합니다.
 */
export default function MobileStickyFooter({
  children,
  className,
  wrapperClassName,
  dataName,
  variant = "default",
}: MobileStickyFooterProps) {
  const context = useMobileViewportContext();
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (!contentRef.current || typeof window === "undefined") {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });

    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!placeholderRef.current) {
      return;
    }

    placeholderRef.current.style.minHeight = `${contentHeight}px`;
  }, [contentHeight]);

  const content = (
    <div
      ref={contentRef}
      className={clsx(
        "pointer-events-auto relative w-full max-w-[360px]",
        variant === "flat"
          ? "px-0 pb-0 pt-0"
          : "px-[20px] pb-[20px] pt-[24px]",
        className
      )}
      data-name={dataName}
    >
      {/* Quickmenu 스타일: 단순 흰색 배경 */}
      {variant === "flat" && (
        <div className="absolute inset-0 bg-white" />
      )}
      {variant === "default" && (
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white to-transparent" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );

  const fallback = (
    <div className={clsx("mt-auto w-full", wrapperClassName)}>
      <div className="sticky bottom-0 left-0 right-0 z-40">{content}</div>
    </div>
  );

  if (!context?.footerContainerRef.current) {
    return fallback;
  }

  return (
    <>
      <div ref={placeholderRef} className={clsx("mt-auto w-full", wrapperClassName)} aria-hidden="true" />
      {createPortal(
        <div className={clsx("w-full", wrapperClassName)}>
          {content}
        </div>,
        context.footerContainerRef.current
      )}
    </>
  );
}
