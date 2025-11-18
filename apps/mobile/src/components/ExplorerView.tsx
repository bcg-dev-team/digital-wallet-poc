import { useParams, useNavigate } from "react-router-dom";
import MobilePageHeader from "./ui/MobilePageHeader";

export default function ExplorerView() {
  const { txid } = useParams<{ txid: string }>();
  const navigate = useNavigate();
  const explorerUrl = `https://amoy.polygonscan.com/tx/${txid}`;

  return (
    <div className="bg-white flex min-h-full w-full flex-col">
      <MobilePageHeader title="트랜잭션 탐색기" onBack={() => navigate(-1)} />
      <main className="flex-1 flex flex-col">
        <iframe
          src={explorerUrl}
          title="PolygonScan Explorer"
          className="flex-1 border-0"
        // sandbox 속성을 사용하면 일부 기능이 제한될 수 있으나 보안을 강화합니다.
        // sandbox="allow-scripts allow-same-origin"
        />
      </main>
    </div>
  );
}