import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import MobileViewport from "./components/layout/MobileViewport";
import { useMobileViewportContext } from "./components/layout/MobileViewportContext";
import { QuickAccessToggle } from "./components/devtools/MobileViewportToggle";
import MyHomeScreen from "./components/MyHomeScreen";
import WalletDashboard from "./components/WalletDashboard";
import WalletWelcome from "./components/WalletWelcome";
import WalletAssetSelection from "./components/WalletAssetSelection";
import WalletNetworkSelection from "./components/WalletNetworkSelection";
import WalletCreationComplete from "./components/WalletCreationComplete";
import DepositConnectWallet from "./components/DepositConnectWallet";
import DepositAmountEntry from "./components/DepositAmountEntry";
import DepositProcessing from "./components/DepositProcessing";
import DepositCompletion from "./components/DepositCompletion";
import ExchangeCompletion from "./components/ExchangeCompletion";
import UsdcWithdrawal from "./components/UsdcWithdrawal";
import TransactionHistory from "./components/TransactionHistory";
import TokenSecuritiesOverview from "./components/TokenSecuritiesOverview";
import TokenSecuritiesLilac from "./components/TokenSecuritiesLilac";
import TokenTradingOrder from "./components/TokenTradingOrder";
import UsdcExchangeFlow from "./components/UsdcExchangeFlow";
import { ScreenSummaryPanel } from "./components/ScreenSummaryPanel";
import GlobalMenuScreen from "./components/GlobalMenuScreen";

function ScrollToTop() {
  const { pathname } = useLocation();
  const viewportContext = useMobileViewportContext();

  useEffect(() => {
    // window 스크롤 초기화
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    
    // MobileViewport 내부 스크롤 초기화
    if (viewportContext?.contentRef?.current) {
      viewportContext.contentRef.current.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, viewportContext]);

  return null;
}

function WorkspaceLayout() {
  const [isQuickAccessVisible, setIsQuickAccessVisible] = useState(true);

  // localStorage에 설정 저장 (페이지 새로고침 시 유지)
  useEffect(() => {
    const saved = localStorage.getItem("quickAccessVisible");
    if (saved !== null) {
      setIsQuickAccessVisible(saved === "true");
    }
  }, []);

  const toggleQuickAccess = () => {
    const newValue = !isQuickAccessVisible;
    setIsQuickAccessVisible(newValue);
    localStorage.setItem("quickAccessVisible", String(newValue));
  };

  return (
    <div className="flex min-h-screen bg-[#eef1f6]">
      {isQuickAccessVisible && <ScreenSummaryPanel />}
      <main className="flex flex-1 items-center justify-center">
        <MobileViewport>
          <ScrollToTop />
          <Outlet />
        </MobileViewport>
      </main>
      <QuickAccessToggle isVisible={isQuickAccessVisible} onToggle={toggleQuickAccess} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WorkspaceLayout />}>
          <Route path="/" element={<MyHomeScreen />} />
          <Route path="/wallet" element={<WalletDashboard />} />
          <Route path="/wallet/start" element={<WalletWelcome />} />
          <Route path="/wallet/asset" element={<WalletAssetSelection />} />
          <Route path="/wallet/network" element={<WalletNetworkSelection />} />
          <Route path="/wallet/creation-complete" element={<WalletCreationComplete />} />
          <Route path="/deposit/connect-wallet" element={<DepositConnectWallet />} />
          <Route path="/deposit/amount" element={<DepositAmountEntry />} />
          <Route path="/deposit/processing" element={<DepositProcessing />} />
          <Route path="/deposit/completion" element={<DepositCompletion />} />
          <Route path="/usdc-exchange" element={<UsdcExchangeFlow />} />
          <Route path="/usdc-exchange/completion" element={<ExchangeCompletion />} />
          <Route path="/withdrawal" element={<UsdcWithdrawal />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/token-securities" element={<TokenSecuritiesOverview />} />
          <Route path="/token-securities/lilac" element={<TokenSecuritiesLilac />} />
          <Route path="/token-securities/lilac/trade" element={<TokenTradingOrder />} />
          <Route path="/menu" element={<GlobalMenuScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
