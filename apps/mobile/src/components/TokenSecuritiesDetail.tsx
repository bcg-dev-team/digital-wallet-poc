import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenSecuritiesDetailScreen from "../imports/TokenSecuritiesDetail";

export default function TokenSecuritiesDetail() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <TokenSecuritiesDetailScreen
      onNavigateBack={() => navigate("/token-securities")}
      onTrade={() => navigate("/token-trading")}
    />
  );
}
