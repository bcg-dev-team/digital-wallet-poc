import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "@digital-wallet/ui";
import MobileStickyFooter from "./layout/MobileStickyFooter";
import MobilePageHeader from "./ui/MobilePageHeader";

type Asset = "eth" | "btc" | "usdt" | "usdc";

interface AssetOption {
  id: Asset;
  nameKo: string;
  symbol: string;
  description: string;
  accent: string;
  background: string;
  recommended?: boolean;
}

const ASSET_OPTIONS: AssetOption[] = [
  {
    id: "eth",
    nameKo: "이더리움",
    symbol: "ETH",
    description: "Ethereum 메인넷",
    accent: "#627EEA",
    background: "bg-[#eef0ff]",
  },
  {
    id: "btc",
    nameKo: "비트코인",
    symbol: "BTC",
    description: "Bitcoin 네트워크",
    accent: "#F7931A",
    background: "bg-[#fff4e5]",
  },
  {
    id: "usdt",
    nameKo: "테더",
    symbol: "USDT",
    description: "Tether USD",
    accent: "#26A17B",
    background: "bg-[#e7f6f1]",
  },
  {
    id: "usdc",
    nameKo: "USD Coin",
    symbol: "USDC",
    description: "USD Coin",
    accent: "#2775CA",
    background: "bg-[#e9f1ff]",
    recommended: true,
  },
];

interface WalletAssetSelectionState {
  from?: string;
  selectedAsset?: Asset;
}

export default function WalletAssetSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state as WalletAssetSelectionState) ?? {};
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(locationState.selectedAsset ?? null);

  const handleBack = () => {
    if (locationState.from) {
      navigate(locationState.from, {
        state: { selectedAsset: locationState.selectedAsset ?? selectedAsset },
      });
      return;
    }
    navigate("/wallet/start");
  };

  const handleNext = () => {
    if (!selectedAsset) return;
    navigate("/wallet/network", { state: { selectedAsset } });
  };

  const title = useMemo(() => {
    if (!selectedAsset) return "자산을 선택하세요";
    const asset = ASSET_OPTIONS.find((option) => option.id === selectedAsset);
    return asset ? `${asset.nameKo} (${asset.symbol}) 선택됨` : "자산을 선택하세요";
  }, [selectedAsset]);

  return (
    <div className="flex min-h-full w-full flex-col bg-white">
      <MobilePageHeader title={title} onBack={handleBack} />

      <main className="flex-1 overflow-y-auto px-5 pb-28 pt-10">
        <section className="text-center space-y-2">
          <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] text-[20px] leading-[28px] text-[#111111]">
            자산 선택
          </p>
          <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] text-[14px] text-[#999ea4]">
            입금할 디지털 자산을 선택해주세요
          </p>
        </section>

        <section className="mt-8 space-y-3">
          {ASSET_OPTIONS.map((option) => (
            <AssetCard
              key={option.id}
              option={option}
              selected={selectedAsset === option.id}
              onSelect={() => setSelectedAsset(option.id)}
            />
          ))}
        </section>
      </main>

      {selectedAsset && (
        <MobileStickyFooter>
          <div className="flex w-full flex-col gap-2">
            <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] text-[13px] text-[#777e8c]">
              {title}
            </p>
            <Button variant="primary" size="lg" className="w-full" onClick={handleNext}>
              다음
            </Button>
          </div>
        </MobileStickyFooter>
      )}
    </div>
  );
}

interface AssetCardProps {
  option: AssetOption;
  selected: boolean;
  onSelect: () => void;
}

function AssetCard({ option, selected, onSelect }: AssetCardProps) {
  return (
    <Card
      className={`flex items-center justify-between gap-3 border transition-all duration-200 ${selected ? "border-[#2a3fec] shadow-[0px_6px_16px_rgba(42,63,236,0.15)]" : "border-[#ebedf5]"}`}
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full ${option.background}`}
          style={{ color: option.accent }}
        >
          <span className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] text-[16px]">{option.symbol}</span>
        </div>
        <div>
          <p className={`font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] text-[16px] ${selected ? "text-[#2a3fec]" : "text-[#111111]"}`}>
            {option.nameKo} ({option.symbol})
          </p>
          <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] text-[13px] text-[#777e8c]">
            {option.description}
          </p>
          {option.recommended && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-[4px] bg-[#ededff] px-2 py-1 text-[11px] font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] text-[#2a3fec]">
              추천
            </span>
          )}
        </div>
      </div>
      {selected && (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect width="20" height="20" rx="10" fill="#2a3fec" />
          <path d="M15 7L9 13L6 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Card>
  );
}

