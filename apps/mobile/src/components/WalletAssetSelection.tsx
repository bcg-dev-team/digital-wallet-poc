import { useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@digital-wallet/ui";
import MobileStickyFooter from "./layout/MobileStickyFooter";
import svgPaths from "../imports/svg-3h50f2el8r";

type Asset = "usdc" | "usdt" | "dai" | "busd";

function Group820325() {
  return (
    <div className="absolute contents left-[234px] top-[11px]" data-name="Group820325">
      <div className="absolute left-[234px] size-[28px] top-[11px]" data-name="Rectangle154476" />
    </div>
  );
}

interface HeaderProps {
  onBack?: () => void;
}

function Header({ onBack }: HeaderProps) {
  return (
    <div className="absolute contents left-0 top-0" data-name="+ HEADER">
      <div className="absolute h-[52px] left-0 top-0 w-[360px]" data-name="bg">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 52">
          <path d="M0 0H360V52H0V0Z" fill="var(--fill-0, white)" id="bg" />
        </svg>
      </div>
      <div
        className="absolute inset-[1.55%_88.89%_94.84%_3.33%] cursor-pointer"
        data-name="ic_00com_28_line_arrow_l_111"
        onClick={onBack}
        role="button"
        aria-label="뒤로 가기"
      >
        <div className="absolute inset-0" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Vector"></g>
          </svg>
        </div>
        <div className="absolute inset-[21.43%_35.71%]" data-name="Vector">
          <div className="absolute inset-[-4.04%_-9.38%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 21">
              <path
                d={svgPaths.p2c0ecd80}
                id="Vector"
                stroke="var(--stroke-0, #111111)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] inset-[1.8%_57.78%_95.1%_11.11%] justify-center leading-[0] not-italic text-[#111111] text-[16px]">
        <p className="leading-[24px]">SOL 디지털 월렛</p>
      </div>
      <Group820325 />
    </div>
  );
}

function Group823301() {
  return (
    <div className="absolute inset-[8.333%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Group 823301">
          <circle cx="20" cy="20" fill="var(--fill-0, #2A3FEC)" id="Ellipse 944" r="20" />
        </g>
      </svg>
    </div>
  );
}

function MaskGroup() {
  return (
    <div className="absolute contents inset-[8.333%]" data-name="Mask group">
      <Group823301 />
    </div>
  );
}

function Group823189() {
  return (
    <div className="absolute contents inset-[8.333%]">
      <MaskGroup />
    </div>
  );
}

function Frame2117921362() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center not-italic relative shrink-0 text-center w-full">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[28px] min-w-full relative shrink-0 text-[#111111] text-[20px] tracking-[-0.5px] w-[min-content]">
        자산 선택
      </p>
      <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#999ea4] text-[14px] text-nowrap whitespace-pre">
        입금할 디지털 자산을 선택해주세요
      </p>
    </div>
  );
}

function Frame2117921363() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0">
      <div className="relative shrink-0 size-[48px]" data-name="img_00com_apng_completed">
        <Group823189 />
        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" />
      </div>
      <Frame2117921362 />
      <div className="absolute h-[15.553px] left-[111px] top-[17px] w-[22px]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
          <path d={svgPaths.p20a3d080} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Frame2117921486() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[4px] py-0 relative w-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none scale-y-[-100%]">
              <div className="relative size-[8px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" fill="var(--fill-0, #E02D23)" id="Ellipse 91412" r="4" />
                </svg>
              </div>
            </div>
          </div>
          <p className="basis-0 font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#111111] text-[14px]">
            스테이블코인
          </p>
        </div>
      </div>
    </div>
  );
}

interface AssetInfoProps {
  selected: boolean;
  name: string;
  symbol: string;
}

function AssetInfo({ selected, name, symbol }: AssetInfoProps) {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow items-start leading-[0] min-h-px min-w-px not-italic relative shrink-0">
      <div className={`flex flex-col justify-center relative shrink-0 text-[14px] w-full ${selected ? "text-white" : "text-[#333950]"}`}>
        <p className="leading-[20px]">{name}</p>
      </div>
      <div className={`flex flex-col justify-center relative shrink-0 text-[11px] w-full ${selected ? "text-[#c9cffa]" : "text-[#999ea4]"}`}>
        <p className="leading-[16px]">{symbol}</p>
      </div>
    </div>
  );
}

interface AssetIconProps {
  color: string;
  text: string;
}

function AssetIcon({ color, text }: AssetIconProps) {
  return (
    <div className="relative shrink-0 size-[30px] rounded-full flex items-center justify-center" style={{ backgroundColor: color }}>
      <span className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] text-white text-[14px] leading-[20px]">{text}</span>
    </div>
  );
}

interface AssetContentProps {
  selected: boolean;
  name: string;
  symbol: string;
  iconColor: string;
  iconText: string;
}

function AssetContent({ selected, name, symbol, iconColor, iconText }: AssetContentProps) {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <AssetIcon color={iconColor} text={iconText} />
      <AssetInfo selected={selected} name={name} symbol={symbol} />
    </div>
  );
}

interface AssetWrapperProps {
  selected: boolean;
  children: ReactNode;
}

function AssetWrapper({ children }: AssetWrapperProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      {children}
    </div>
  );
}

interface AssetCardProps {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}

function AssetCard({ selected, onClick, children }: AssetCardProps) {
  return (
    <div
      className={`relative rounded-[6px] shrink-0 w-full cursor-pointer ${selected ? "bg-[#2a3fec]" : "bg-[#f4f6f9]"}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[14px] relative w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

interface AssetItemProps {
  selected: boolean;
  onClick: () => void;
  name: string;
  symbol: string;
  iconColor: string;
  iconText: string;
}

function AssetItem({ selected, onClick, name, symbol, iconColor, iconText }: AssetItemProps) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <AssetCard selected={selected} onClick={onClick}>
            <AssetWrapper selected={selected}>
              <AssetContent selected={selected} name={name} symbol={symbol} iconColor={iconColor} iconText={iconText} />
            </AssetWrapper>
          </AssetCard>
        </div>
      </div>
    </div>
  );
}

function RecommendBadge({ selected }: { selected: boolean }) {
  return (
    <div
      className={`box-border content-stretch flex gap-[10px] items-center justify-center px-[10px] py-[2px] relative rounded-[4px] shrink-0 ${
        selected ? "bg-white" : "bg-[#ededff]"
      }`}
    >
      <div
        className={`flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-nowrap ${
          selected ? "text-[#2a3fec]" : "text-[#5623e9]"
        }`}
      >
        <p className="leading-[16px] whitespace-pre">추천</p>
      </div>
    </div>
  );
}

interface AssetWithBadgeProps {
  selected: boolean;
  onClick: () => void;
  name: string;
  symbol: string;
  iconColor: string;
  iconText: string;
  showRecommend?: boolean;
}

function AssetWithBadge({ selected, onClick, name, symbol, iconColor, iconText, showRecommend }: AssetWithBadgeProps) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <AssetCard selected={selected} onClick={onClick}>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0">
                <AssetIcon color={iconColor} text={iconText} />
                <AssetInfo selected={selected} name={name} symbol={symbol} />
              </div>
              <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                {showRecommend && <RecommendBadge selected={selected} />}
                {selected && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="white" />
                  </svg>
                )}
              </div>
            </div>
          </AssetCard>
        </div>
      </div>
    </div>
  );
}

interface StablecoinAssetsProps {
  selectedAsset: Asset | null;
  onSelectAsset: (asset: Asset) => void;
}

function StablecoinAssets({ selectedAsset, onSelectAsset }: StablecoinAssetsProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <AssetItem
        selected={selectedAsset === "usdc"}
        onClick={() => onSelectAsset("usdc")}
        name="USDC"
        symbol="USD Coin"
        iconColor="#2775CA"
        iconText="$"
      />
      <AssetWithBadge
        selected={selectedAsset === "usdt"}
        onClick={() => onSelectAsset("usdt")}
        name="USDT"
        symbol="Tether USD"
        iconColor="#26A17B"
        iconText="₮"
        showRecommend
      />
      <AssetItem
        selected={selectedAsset === "dai"}
        onClick={() => onSelectAsset("dai")}
        name="DAI"
        symbol="Dai Stablecoin"
        iconColor="#F5AC37"
        iconText="◈"
      />
    </div>
  );
}

interface StablecoinSectionProps {
  selectedAsset: Asset | null;
  onSelectAsset: (asset: Asset) => void;
}

function StablecoinSection({ selectedAsset, onSelectAsset }: StablecoinSectionProps) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame2117921486 />
      <StablecoinAssets selectedAsset={selectedAsset} onSelectAsset={onSelectAsset} />
    </div>
  );
}

function Frame2117921511() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[4px] py-0 relative w-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none scale-y-[-100%]">
              <div className="relative size-[8px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" fill="var(--fill-0, #AAAEB3)" id="Ellipse 91412" r="4" />
                </svg>
              </div>
            </div>
          </div>
          <p className="basis-0 font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#111111] text-[14px]">
            기타 자산
          </p>
        </div>
      </div>
    </div>
  );
}

interface OtherAssetsProps {
  selectedAsset: Asset | null;
  onSelectAsset: (asset: Asset) => void;
}

function OtherAssets({ selectedAsset, onSelectAsset }: OtherAssetsProps) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <AssetItem
        selected={selectedAsset === "busd"}
        onClick={() => onSelectAsset("busd")}
        name="BUSD"
        symbol="Binance USD"
        iconColor="#F0B90B"
        iconText="B"
      />
    </div>
  );
}

interface OtherAssetsSectionProps {
  selectedAsset: Asset | null;
  onSelectAsset: (asset: Asset) => void;
}

function OtherAssetsSection({ selectedAsset, onSelectAsset }: OtherAssetsSectionProps) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame2117921511 />
      <OtherAssets selectedAsset={selectedAsset} onSelectAsset={onSelectAsset} />
    </div>
  );
}

interface AllAssetsProps {
  selectedAsset: Asset | null;
  onSelectAsset: (asset: Asset) => void;
}

function AllAssets({ selectedAsset, onSelectAsset }: AllAssetsProps) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <StablecoinSection selectedAsset={selectedAsset} onSelectAsset={onSelectAsset} />
      <OtherAssetsSection selectedAsset={selectedAsset} onSelectAsset={onSelectAsset} />
    </div>
  );
}

interface MainContentProps {
  selectedAsset: Asset | null;
  onSelectAsset: (asset: Asset) => void;
}

function MainContent({ selectedAsset, onSelectAsset }: MainContentProps) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[56px] items-center left-[16px] top-[92px] w-[328px]">
      <Frame2117921363 />
      <AllAssets selectedAsset={selectedAsset} onSelectAsset={onSelectAsset} />
    </div>
  );
}

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
      navigate(locationState.from, { state: { selectedAsset: locationState.selectedAsset ?? selectedAsset } });
      return;
    }
    navigate("/wallet/start");
  };

  const handleNext = () => {
    if (!selectedAsset) return;
    navigate("/wallet/network", { state: { selectedAsset } });
  };

  return (
    <div className="bg-white relative flex size-full min-h-full flex-col" data-name="자산선택">
      <Header onBack={handleBack} />
      <MainContent selectedAsset={selectedAsset} onSelectAsset={setSelectedAsset} />
      {selectedAsset && (
        <MobileStickyFooter>
          <Button onClick={handleNext} variant="primary" size="lg" className="w-full">
            다음
          </Button>
        </MobileStickyFooter>
      )}
    </div>
  );
}

