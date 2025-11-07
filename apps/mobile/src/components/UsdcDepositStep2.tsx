import { useNavigate } from "react-router-dom";
import Component0502 from "../imports/DepositStep2";

export default function UsdcDepositStep2() {
  const navigate = useNavigate();

  return (
    <Component0502
      onNavigateBack={() => navigate("/deposit")}
      onNavigateNext={() => navigate("/deposit/progress")}
    />
  );
}
