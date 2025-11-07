import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import MobileViewport from "./components/layout/MobileViewport";
import Home from "./components/Home";
import DigitalWallet from "./components/DigitalWallet";
import UsdcDeposit from "./components/UsdcDeposit";
import UsdcDepositStep2 from "./components/UsdcDepositStep2";
import UsdcDepositProgress from "./components/UsdcDepositProgress";
import UsdcExchange from "./components/UsdcExchange";
import UsdcExchangeProgress from "./components/UsdcExchangeProgress";
import UsdcWithdrawal from "./components/UsdcWithdrawal";
import TransactionHistory from "./components/TransactionHistory";
import WalletOnboarding from "./components/WalletOnboarding";
import WalletNetworkSelection from "./components/WalletNetworkSelection";
import WalletSetupComplete from "./components/WalletSetupComplete";
import TokenSecurities from "./components/TokenSecurities";
import TokenSecuritiesDetail from "./components/TokenSecuritiesDetail";
import TokenTrading from "./components/TokenTrading";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MobileViewport>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wallet" element={<DigitalWallet />} />
          <Route path="/wallet/onboarding" element={<WalletOnboarding />} />
          <Route path="/wallet/network" element={<WalletNetworkSelection />} />
          <Route path="/wallet/setup-complete" element={<WalletSetupComplete />} />
          <Route path="/deposit" element={<UsdcDeposit />} />
          <Route path="/deposit/step2" element={<UsdcDepositStep2 />} />
          <Route path="/deposit/progress" element={<UsdcDepositProgress />} />
          <Route path="/exchange" element={<UsdcExchange />} />
          <Route path="/exchange/progress" element={<UsdcExchangeProgress />} />
          <Route path="/withdrawal" element={<UsdcWithdrawal />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/token-securities" element={<TokenSecurities />} />
          <Route path="/token-securities/detail" element={<TokenSecuritiesDetail />} />
          <Route path="/token-trading" element={<TokenTrading />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MobileViewport>
    </BrowserRouter>
  );
}
