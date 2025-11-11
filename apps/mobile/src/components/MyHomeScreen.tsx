import { useNavigate } from "react-router-dom";
import MyHome from "../imports/MyHome";

export default function MyHomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-full">
      <MyHome
        onNavigateToWallet={() => navigate("/wallet/start")}
        onNavigateMenu={() => navigate("/menu")}
      />
    </div>
  );
}

