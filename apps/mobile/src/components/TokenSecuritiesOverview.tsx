import { useNavigate } from "react-router-dom";
import TokenSecuritiesScreen from "../imports/TokenSecurities";

export default function TokenSecuritiesOverview() {
  const navigate = useNavigate();

  return (
    <TokenSecuritiesScreen
      onSelectFirst={() => navigate("/token-securities/lilac")}
      onNavigateBack={() => navigate("/wallet")}
    />
  );
}
