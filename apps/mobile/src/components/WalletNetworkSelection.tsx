import { useNavigate, useLocation } from "react-router-dom";
import WalletNetworkSelectionScreen from "../imports/WalletNetworkSelection";

export default function WalletNetworkSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedAsset } = (location.state as { selectedAsset?: string }) ?? {};
  const navigateBack = () =>
    navigate("/wallet/asset", { state: { selectedAsset, from: "/wallet/network" } });
  const navigateNext = () =>
    navigate("/wallet/creation-complete", { state: { selectedAsset } });

  return (
    <WalletNetworkSelectionScreen
      onNavigateBack={navigateBack}
      onNext={navigateNext}
    />
  );
}
