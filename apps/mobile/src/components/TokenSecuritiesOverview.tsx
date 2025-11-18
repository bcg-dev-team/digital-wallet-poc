import { useNavigate } from "react-router-dom";
import TokenSecuritiesMain from "../imports/TokenSecuritiesMain";

export default function TokenSecuritiesOverview() {
  const navigate = useNavigate();

  return (
    <TokenSecuritiesMain
      onSelectFirst={() => navigate("/token-securities/lilac")}
      onNavigateBack={() => navigate("/wallet")}
      onOpenMenu={() => navigate("/menu")}
    />
  );
}
