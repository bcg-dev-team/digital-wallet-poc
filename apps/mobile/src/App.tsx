import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import DigitalWallet from "./components/DigitalWallet";
import UsdcDeposit from "./components/UsdcDeposit";
import UsdcDepositStep2 from "./components/UsdcDepositStep2";
import UsdcDepositProgress from "./components/UsdcDepositProgress";
import UsdcExchange from "./components/UsdcExchange";
import UsdcExchangeProgress from "./components/UsdcExchangeProgress";

export default function App() {
  return (
    <BrowserRouter>
      <div className="size-full flex items-center justify-center bg-[#f6f6f9]">
        <div className="w-full max-w-[360px] h-full overflow-auto bg-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wallet" element={<DigitalWallet />} />
            <Route path="/deposit" element={<UsdcDeposit />} />
            <Route path="/deposit/step2" element={<UsdcDepositStep2 />} />
            <Route path="/deposit/progress" element={<UsdcDepositProgress />} />
            <Route path="/exchange" element={<UsdcExchange />} />
            <Route path="/exchange/progress" element={<UsdcExchangeProgress />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
