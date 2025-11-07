import { useNavigate } from "react-router-dom";
import WalletNetworkSelectionScreen from "../imports/WalletNetworkSelection";

export default function WalletNetworkSelection() {
  const navigate = useNavigate();

  return (
    <WalletNetworkSelectionScreen
      onNavigateBack={() => navigate("/wallet/onboarding")}
      onNext={() => navigate("/wallet/setup-complete")}
    />
  );
}
