import { useNavigate } from "react-router-dom";
import DepositCompleteScreen from "../imports/DepositComplete";

export default function DepositCompletion() {
  const navigate = useNavigate();

  return (
    <DepositCompleteScreen
      onNavigateBack={() => navigate("/deposit/processing")}
      onNavigateToWallet={() => navigate("/wallet")}
      onNavigateToExchange={() => navigate("/usdc-exchange")}
      onOpenExplorer={() => window.open("https://www.oklink.com/en", "_blank", "noopener")}
    />
  );
}
