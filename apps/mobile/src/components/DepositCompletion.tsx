import { useNavigate } from "react-router-dom";
import Component09 from "../imports/ExchangeProgress";

export default function DepositCompletion() {
  const navigate = useNavigate();

  return <Component09 onNavigateHome={() => navigate("/wallet")} />;
}
