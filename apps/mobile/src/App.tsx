import { BrowserRouter, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import MobileViewport from "./components/layout/MobileViewport";
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
import UsdcWithdrawal from "./components/UsdcWithdrawal";
import TransactionHistory from "./components/TransactionHistory";
import TokenSecuritiesOverview from "./components/TokenSecuritiesOverview";
import ExplorerView from "./components/ExplorerView";
import TokenSecuritiesLilac from "./components/TokenSecuritiesLilac";
import TokenTradingOrder from "./components/TokenTradingOrder";
import UsdcExchangeFlow from "./components/UsdcExchangeFlow";
import { ScreenSummaryPanel } from "./components/ScreenSummaryPanel";
import GlobalMenuScreen from "./components/GlobalMenuScreen";

import { DepositProvider } from "./contexts/DepositContext";
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function WorkspaceLayout() {
  return (
    <div className="flex min-h-screen bg-[#eef1f6]">
      <ScreenSummaryPanel />
      <main className="flex flex-1 items-center justify-center">
        <MobileViewport>
          <Outlet />
        </MobileViewport>
      </main>
    </div>
  );
}

function DepositLayout() {
  return (
    <DepositProvider>
      <Outlet />
    </DepositProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<WorkspaceLayout />}>
          <Route path="/" element={<MyHomeScreen />} />
          <Route path="/wallet" element={<WalletDashboard />} />
          <Route path="/wallet/start" element={<WalletWelcome />} />
          <Route path="/wallet/asset" element={<WalletAssetSelection />} />
          <Route path="/wallet/network" element={<WalletNetworkSelection />} />
          <Route path="/wallet/creation-complete" element={<WalletCreationComplete />} />
          <Route element={<DepositLayout />}>
            <Route path="/deposit/connect-wallet" element={<DepositConnectWallet />} />
            <Route path="/deposit/amount" element={<DepositAmountEntry />} />
            <Route path="/deposit/processing" element={<DepositProcessing />} />
            <Route path="/deposit/completion" element={<DepositCompletion />} />
          </Route>
          <Route path="/usdc-exchange" element={<UsdcExchangeFlow />} />
          <Route path="/withdrawal" element={<UsdcWithdrawal />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/explorer/tx/:txid" element={<ExplorerView />} />
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
