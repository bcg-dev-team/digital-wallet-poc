import { useNavigate } from "react-router-dom";
import WalletOnboardingScreen from "../imports/WalletOnboardingScreen";

export default function WalletWelcome() {
  const navigate = useNavigate();

  return (
    <WalletOnboardingScreen
      onNavigateBack={() => navigate("/")}
      onStart={() => navigate("/wallet/asset")}
    />
  );
}
