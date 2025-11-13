import { useNavigate } from "react-router-dom";
import DepositStep2 from "../imports/DepositStep2";

export default function DepositAmountEntry() {
  const navigate = useNavigate();

  return (
    <DepositStep2
      onNavigateBack={() => navigate("/deposit/connect-wallet")}
      onNavigateNext={() => navigate("/deposit/processing")}
    />
  );
}
