import { useNavigate } from "react-router-dom";
import Component0502 from "../imports/DepositStep2";

export default function DepositWalletConnected() {
  const navigate = useNavigate();

  return (
    <Component0502
      onNavigateBack={() => navigate("/deposit/connect-wallet")}
      onNavigateNext={() => navigate("/deposit/amount")}
    />
  );
}
