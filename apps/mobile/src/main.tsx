import { createRoot } from "react-dom/client";
import { ClickToComponent } from "click-to-react-component";
import App from "./App.tsx";
import "./index.css";

/**
 * Chrome 등에서 설치형 PWA로 인정되도록 서비스 워커를 등록합니다.
 * `window.isSecureContext`가 false인 경우(예: LAN의 http://IP:포트)에는 브라우저가 등록을 막습니다.
 */
function registerServiceWorker(): void {
  if (!("serviceWorker" in navigator) || !window.isSecureContext) return;
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/sw.js").catch(() => {
      // 미지원·차단 환경에서는 무시
    });
  });
}

registerServiceWorker();

createRoot(document.getElementById("root")!).render(
  <>
    {import.meta.env.DEV && <ClickToComponent editor="cursor" />}
    <App />
  </>
);