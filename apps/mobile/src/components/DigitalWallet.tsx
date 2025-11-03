import { useNavigate } from "react-router-dom";
import Component04Usdc from "../imports/WalletMainUsdc";

export default function DigitalWallet() {
  const navigate = useNavigate();

  return (
    <Component04Usdc
      onNavigateToDeposit={() => navigate("/deposit")}
      onNavigateToExchange={() => navigate("/exchange")}
      onNavigateToHome={() => navigate("/")}
    />
  );
}
