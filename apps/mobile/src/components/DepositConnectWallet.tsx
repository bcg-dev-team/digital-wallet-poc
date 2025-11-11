import { useNavigate } from "react-router-dom";
import Component0501 from "../imports/DepositStep1";

export default function DepositConnectWallet() {
  const navigate = useNavigate();

  return (
    <Component0501
      onNavigateBack={() => navigate("/")}
      onNavigateNext={() => navigate("/deposit/wallet-connected")}
    />
  );
}
