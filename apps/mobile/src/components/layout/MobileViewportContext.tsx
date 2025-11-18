import { createContext, MutableRefObject, useContext } from "react";

interface MobileViewportContextValue {
  footerContainerRef: MutableRefObject<HTMLDivElement | null>;
  viewportRef: MutableRefObject<HTMLDivElement | null>;
  contentRef: MutableRefObject<HTMLDivElement | null>;
}

const MobileViewportContext = createContext<MobileViewportContextValue | null>(null);

export function useMobileViewportContext() {
  return useContext(MobileViewportContext);
}

export default MobileViewportContext;

