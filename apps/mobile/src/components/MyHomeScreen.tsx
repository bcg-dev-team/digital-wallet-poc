import { useNavigate } from "react-router-dom";
import MyHome from "../imports/MyHome";
import { useMyWallet } from "../contexts/WalletContext";

export default function MyHomeScreen() {
  const navigate = useNavigate();
  const { myAddress, setMyAddress } = useMyWallet();

  return (
    <div className="relative min-h-full">
      <MyHome
        onNavigateToWallet={() => navigate(myAddress ? "/wallet" : "/wallet/start")}
        onNavigateMenu={() => navigate("/menu")}
        onSetAddress={(address: string) => setMyAddress(address)}
      />
    </div>
  );
}
