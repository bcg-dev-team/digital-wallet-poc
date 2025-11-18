import { useState } from "react";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@digital-wallet/ui";
import MobileStickyFooter from "./layout/MobileStickyFooter";
import MobilePageHeader from "./ui/MobilePageHeader";
import svgPaths from "../imports/svg-3h50f2el8r";
import ethImage from "figma:asset/d354673552a465504a29e5fb8faea6af002ba04b.png";
import btcImage from "figma:asset/e6769d863f16bbccc165602f58f3391daffd454e.png";
import usdtImage from "figma:asset/c70a76a62088b5d21df9ee6ece31859439bd6a1d.png";
import usdcImage from "figma:asset/c464d9e903817c3ef7f389ae66705c9445719c95.png";

type Asset = "eth" | "btc" | "usdt" | "usdc";

interface AssetOption {
  id: Asset;
  nameEn: string;
  nameKo: string;
  symbol: string;
  image: string;
}

const ASSET_OPTIONS: AssetOption[] = [
  {
    id: "eth",
    nameEn: "Ethereum",
    nameKo: "이더리움",
    symbol: "ETH",
    image: ethImage,
  },
  {
    id: "btc",
    nameEn: "Bitcoin",
    nameKo: "비트코인",
    symbol: "BTC",
    image: btcImage,
  },
  {
    id: "usdt",
    nameEn: "USDT",
    nameKo: "테더",
    symbol: "USDT",
    image: usdtImage,
  },
  {
    id: "usdc",
    nameEn: "USDC",
    nameKo: "USD Coin",
    symbol: "USDC",
    image: usdcImage,
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

  return (
    <div className="flex min-h-full w-full flex-col bg-white">
      <MobilePageHeader title="SOL 디지털 월렛" onBack={handleBack} />

      <main className="relative flex-1 overflow-y-auto">
        <div className="px-5 pb-[140px] pt-8">
          <section className="flex flex-col items-center gap-5 text-center">
            <WifiBadge />
            <div className="space-y-1">
              <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] font-bold text-[20px] leading-[28px] text-[#111111]">
                자산 선택
              </p>
              <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] text-[14px] text-[#999ea4]">
                사용할 자산을 선택해주세요
              </p>
            </div>
          </section>

          <section className="mt-8 space-y-3 text-left">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#e02d23]" />
              <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] text-[14px] font-bold text-[#111111]">전체 자산</p>
            </div>
            <div className="space-y-2">
              {ASSET_OPTIONS.map((option) => (
                <AssetRow
                  key={option.id}
                  option={option}
                  selected={selectedAsset === option.id}
                  onSelect={() => setSelectedAsset(option.id)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <MobileStickyFooter>
        <Button variant="primary" size="lg" className="w-full" disabled={!selectedAsset} onClick={handleNext}>
          다음
        </Button>
      </MobileStickyFooter>
    </div>
  );
}

interface AssetCardProps {
  option: AssetOption;
  selected: boolean;
  onSelect: () => void;
}

function AssetRow({ option, selected, onSelect }: AssetCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        "w-full rounded-[6px] px-4 py-[14px] transition-colors duration-200",
        "text-left",
        selected ? "bg-[#2a3fec] shadow-[0px_6px_16px_rgba(42,63,236,0.18)]" : "bg-[#f4f6f9]"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="relative size-[30px] overflow-hidden rounded-full bg-white">
          <img
            src={option.image}
            alt={`${option.nameEn} 아이콘`}
            className="h-full w-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </div>
        <div className="flex flex-col">
          <span
            className={clsx(
              "font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] text-[14px] leading-[20px] font-medium",
              selected ? "text-white" : "text-[#333950]"
            )}
          >
            {option.nameEn}
          </span>
          <span
            className={clsx(
              "font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] text-[11px] leading-[16px] font-medium",
              selected ? "text-white/80" : "text-[#999ea4]"
            )}
          >
            {option.nameKo}
          </span>
        </div>
      </div>
    </button>
  );
}

function WifiBadge() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8ebff]">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a3fec]">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
          <path d={svgPaths.p20a3d080} fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  );
}

