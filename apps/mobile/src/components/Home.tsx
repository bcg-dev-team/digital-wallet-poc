import { useNavigate } from "react-router-dom";
import MyHome from "../imports/MyHome";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-full">
      <MyHome
        onNavigateToWallet={() => navigate("/wallet/onboarding")}
        onNavigateMenu={() => navigate("/wallet")}
      />
    </div>
  );
}

