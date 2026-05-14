import { useEffect, useState } from "react";

/** 좌측 Quick Access를 둘 수 있는 최소 뷰포트 너비 (이하에서는 모바일 풀스크린으로 간주) */
const WIDE_WORKSPACE_MIN_PX = 769;

const WIDE_WORKSPACE_MEDIA_QUERY = `(min-width: ${WIDE_WORKSPACE_MIN_PX}px)`;

/**
 * 데스크톱 워크스페이스 레이아웃(좌측 Quick Access 패널)을 사용할 만큼 뷰가 넓은지 반환합니다.
 * @returns 뷰포트가 `WIDE_WORKSPACE_MIN_PX` 이상이면 true
 */
export function useWideWorkspaceLayout(): boolean {
  const [wide, setWide] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia(WIDE_WORKSPACE_MEDIA_QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(WIDE_WORKSPACE_MEDIA_QUERY);
    const handler = () => setWide(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return wide;
}
