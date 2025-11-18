import { useEffect, useState } from "react";
import clsx from "clsx";

/**
 * 개발 모드에서 Quick Access (ScreenSummaryPanel)를 토글할 수 있는 플로팅 버튼
 * 단축키: Cmd/Ctrl + Shift + A (Quick Access의 A)
 */
export function QuickAccessToggle({
  isVisible,
  onToggle,
}: {
  isVisible: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + Shift + A (Quick Access)
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === "a") {
        event.preventDefault();
        onToggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggle]);

  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <div
      className="group fixed bottom-4 right-4 z-[9999] transition-opacity duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={onToggle}
        className={clsx(
          "flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all",
          "bg-white hover:bg-gray-50 active:scale-95",
          "border-2",
          isVisible
            ? "border-blue-500 text-blue-600"
            : "border-gray-300 text-gray-600"
        )}
        title={`Quick Access ${isVisible ? "ON" : "OFF"} (Cmd/Ctrl + Shift + A)`}
        aria-label={`Toggle Quick Access panel (currently ${isVisible ? "visible" : "hidden"})`}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isVisible ? (
            // 리스트 아이콘 (ON 상태)
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          ) : (
            // 사이드바 아이콘 (OFF 상태)
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          )}
        </svg>
      </button>
      <div className="pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {isVisible ? "Quick Access ON" : "Quick Access OFF"}
        <br />
        <span className="text-gray-400">Cmd/Ctrl + Shift + A</span>
      </div>
    </div>
  );
}

