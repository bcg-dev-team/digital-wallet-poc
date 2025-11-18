import { useNavigate } from "react-router-dom";
import WithdrawalProgressScreen from "../imports/WithdrawalProgress";

export default function WithdrawalProcessing() {
  const navigate = useNavigate();

  return (
    <WithdrawalProgressScreen
      onNavigateNext={() => navigate("/withdrawal/completion")}
      onNavigateBack={() => navigate("/withdrawal")}
    />
  );
}
