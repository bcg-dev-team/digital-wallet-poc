import { useNavigate } from "react-router-dom";
import WalletOnboardingScreen from "../imports/WalletOnboardingScreen";

export default function WalletOnboarding() {
  const navigate = useNavigate();

  return (
    <WalletOnboardingScreen
      onNavigateBack={() => navigate("/")}
      onStart={() => navigate("/wallet/network")}
    />
  );
}
