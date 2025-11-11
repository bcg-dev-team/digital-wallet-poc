import { useNavigate } from "react-router-dom";
import Component06 from "../imports/DepositProgress";

export default function DepositProcessing() {
  const navigate = useNavigate();

  return <Component06 onNavigateHome={() => navigate("/wallet")} />;
}
