import { useNavigate } from "react-router-dom";
import UsdcWithdrawalComponent from "../imports/UsdcWithdrawal";

export default function UsdcWithdrawal() {
  const navigate = useNavigate();

  return (
    <UsdcWithdrawalComponent
      onNavigateBack={() => navigate("/wallet")}
      onSubmit={() => navigate("/withdrawal/processing")}
    />
  );
}

