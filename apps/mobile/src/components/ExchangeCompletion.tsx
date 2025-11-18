import { useNavigate } from "react-router-dom";
import ExchangeCompleteScreen from "../imports/ExchangeComplete";

export default function ExchangeCompletion() {
  const navigate = useNavigate();

  return (
    <ExchangeCompleteScreen
      onNavigateBack={() => navigate("/usdc-exchange")}
      onNavigateToWallet={() => navigate("/wallet")}
      onNavigateToHistory={() => navigate("/transaction-history")}
      onOpenExplorer={() => window.open("https://www.oklink.com/en", "_blank", "noopener")}
    />
  );
}
