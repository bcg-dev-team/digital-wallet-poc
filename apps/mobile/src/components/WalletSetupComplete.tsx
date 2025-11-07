import { useNavigate } from "react-router-dom";
import WalletSetupCompleteScreen from "../imports/WalletSetupComplete";

export default function WalletSetupComplete() {
  const navigate = useNavigate();

  return (
    <WalletSetupCompleteScreen
      onNavigateBack={() => navigate("/wallet/network")}
      onNavigateToDeposit={() => navigate("/deposit")}
    />
  );
}
