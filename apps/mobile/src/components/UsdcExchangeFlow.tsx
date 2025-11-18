import { useNavigate } from "react-router-dom";
import UsdcExchangeScreen from "../imports/UsdcExchange";

export default function UsdcExchangeFlow() {
  const navigate = useNavigate();

  return (
    <UsdcExchangeScreen
      onNavigateBack={() => navigate("/wallet")}
      onSubmit={() => navigate("/usdc-exchange/processing")}
    />
  );
}

