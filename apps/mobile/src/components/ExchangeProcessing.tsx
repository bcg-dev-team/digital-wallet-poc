import { useNavigate } from "react-router-dom";
import ExchangeProgressScreen from "../imports/ExchangeProgress";

export default function ExchangeProcessing() {
  const navigate = useNavigate();

  return (
    <ExchangeProgressScreen
      onNavigateNext={() => navigate("/usdc-exchange/completion")}
      onNavigateBack={() => navigate("/usdc-exchange")}
    />
  );
}
