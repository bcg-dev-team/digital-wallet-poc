import { useNavigate } from "react-router-dom";
import Component09 from "../imports/ExchangeProgress";

export default function UsdcExchangeProgress() {
  const navigate = useNavigate();

  // Component09은 onNavigateHome만 받음
  return <Component09 onNavigateHome={() => navigate("/")} />;
}
