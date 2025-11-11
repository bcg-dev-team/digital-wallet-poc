import { useNavigate, useLocation } from "react-router-dom";
import WalletSetupCompleteScreen from "../imports/WalletSetupComplete";

export default function WalletCreationComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedAsset } = (location.state as { selectedAsset?: string }) ?? {};
  const handleBack = () => {
    navigate("/wallet/network", selectedAsset ? { state: { selectedAsset } } : undefined);
  };

  return (
    <WalletSetupCompleteScreen
      onNavigateBack={handleBack}
      onNavigateToDeposit={() => navigate("/deposit/connect-wallet")}
    />
  );
}
