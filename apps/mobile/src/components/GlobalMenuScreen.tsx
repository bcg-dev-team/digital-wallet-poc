import { useNavigate } from "react-router-dom";
import WalletMenu from "../imports/WalletMenu";

/**
 * 전체 메뉴 화면
 * SOL 디지털 월렛의 전체 메뉴를 단독 화면으로 제공합니다.
 */
export default function GlobalMenuScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-full w-full justify-center bg-white">
      <div className="relative w-full max-w-[360px]">
        <WalletMenu />
      </div>
    </div>
  );
}

