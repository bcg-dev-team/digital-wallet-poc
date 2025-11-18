import { useNavigate } from "react-router-dom";
import WithdrawalCompleteScreen from "../imports/WithdrawalComplete";

export default function WithdrawalCompletion() {
  const navigate = useNavigate();

  return (
    <WithdrawalCompleteScreen
      onNavigateBack={() => navigate("/withdrawal/processing")}
      onNavigateToWallet={() => navigate("/wallet")}
      onNavigateToHistory={() => navigate("/transaction-history")}
      onOpenExplorer={() => window.open("https://www.oklink.com/en", "_blank", "noopener")}
    />
  );
}
