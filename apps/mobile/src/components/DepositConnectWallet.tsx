import { useNavigate } from "react-router-dom";
import DepositStep1 from "../imports/DepositStep1";

export default function DepositConnectWallet() {
  const navigate = useNavigate();

  return (
    <DepositStep1
      onNavigateBack={() => navigate("/wallet/creation-complete")}
      onNavigateNext={() => navigate("/deposit/amount")}
    />
  );
}
