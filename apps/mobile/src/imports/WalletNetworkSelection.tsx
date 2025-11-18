import { useState } from "react";
import svgPaths from "./svg-3h50f2el8r";
import imgImage4 from "../assets/d354673552a465504a29e5fb8faea6af002ba04b.png";
import imgImage6 from "../assets/3f6c20a55af9ae2bb9795ba5bd2a42bbadd463a4.png";
import imgImage7 from "../assets/f4a42ac4da692c5a5c9e3584ca401074569b49f8.png";
import imgImage8 from "../assets/72c84e5aed6730635a859b8246463d8e6f3f467e.png";
import imgImage9 from "../assets/45618983434d3a2e3270c96cc3abfaca576dd58e.png";
import imgImage10 from "../assets/5f6f8cc65de6c881beb30ea6f5938414f9292961.png";
import { Button } from "@digital-wallet/ui";
import MobileStickyFooter from "../components/layout/MobileStickyFooter";
import MobilePageHeader from "../components/ui/MobilePageHeader";

type Network = 'ethereum' | 'polygon' | 'bsc' | 'avalanche' | 'optimism' | 'solana';

function Header({ onNavigateBack }: { onNavigateBack?: () => void }) {
  return <MobilePageHeader title="SOL 디지털 월렛" onBack={onNavigateBack} />;
}

function Frame2117921362() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center not-italic relative shrink-0 text-center w-full">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] font-bold leading-[28px] min-w-full relative shrink-0 text-[#111111] text-[20px] tracking-[-0.5px] w-[min-content]">네트워크 선택</p>
      <p className="font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[20px] relative shrink-0 text-[#999ea4] text-[14px] text-nowrap whitespace-pre">사용할 블록체인 네트워크를 선택해주세요</p>
    </div>
  );
}

function Frame2117921363() {
  return (
    <div className="content-stretch flex flex-col items-center gap-[20px] relative shrink-0">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8ebff]">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a3fec]">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
            <path d={svgPaths.p20a3d080} fill="#FFFFFF" />
          </svg>
        </div>
      </div>
      <Frame2117921362 />
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
          <p className="basis-0 font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] font-bold grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#111111] text-[14px]">인기 네트워크</p>
        </div>
      </div>
    </div>
  );
}

function Frame2117921495({ selected }: { selected: boolean }) {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow items-start leading-[0] min-h-px min-w-px not-italic relative shrink-0">
      <div className={`flex flex-col justify-center relative shrink-0 text-[14px] w-full ${selected ? 'text-white' : 'text-[#333950]'}`}>
        <p className="leading-[20px] font-medium">Ethereum</p>
      </div>
      <div className={`flex flex-col justify-center relative shrink-0 text-[11px] w-full ${selected ? 'text-[#c9cffa]' : 'text-[#999ea4]'}`}>
        <p className="leading-[16px] font-medium">이더리움 메인넷</p>
      </div>
    </div>
  );
}

function Frame2117921496({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[30px]" data-name="image 4">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage4} />
      </div>
      <Frame2117921495 selected={selected} />
    </div>
  );
}

function Frame2117921487({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2117921496 selected={selected} />
    </div>
  );
}

function Frame2117921488({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div 
      className={`relative rounded-[6px] shrink-0 w-full cursor-pointer ${selected ? 'bg-[#2a3fec]' : 'bg-[#f4f6f9]'}`}
      onClick={onClick}
    >
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[14px] relative w-full">
          <Frame2117921487 selected={selected} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921489({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <Frame2117921488 selected={selected} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921497({ selected }: { selected: boolean }) {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow items-start leading-[0] min-h-px min-w-px not-italic relative shrink-0">
      <div className={`flex flex-col justify-center relative shrink-0 text-[14px] text-nowrap ${selected ? 'text-white' : 'text-[#333950]'}`}>
        <p className="leading-[20px] whitespace-pre font-medium">Polygon</p>
      </div>
      <div className={`flex flex-col justify-center min-w-full relative shrink-0 text-[11px] w-[min-content] ${selected ? 'text-[#c9cffa]' : 'text-[#999ea4]'}`}>
        <p className="leading-[16px] font-medium">폴리곤 메인넷</p>
      </div>
    </div>
  );
}

function Frame2117921498({ selected }: { selected: boolean }) {
  return (
    <div className="basis-0 content-stretch flex gap-[12px] grow items-center min-h-px min-w-px relative shrink-0">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="relative size-[30px]" data-name="image 6">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage6} />
          </div>
        </div>
      </div>
      <Frame2117921497 selected={selected} />
    </div>
  );
}

function Frame2117921476({ selected }: { selected: boolean }) {
  return (
    <div className={`box-border content-stretch flex gap-[10px] items-center justify-center px-[10px] py-[2px] relative rounded-[4px] shrink-0 ${selected ? 'bg-white' : 'bg-[#ededff]'}`}>
      <div className={`flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[11px] text-nowrap ${selected ? 'text-[#2a3fec]' : 'text-[#5623e9]'}`}>
        <p className="leading-[16px] whitespace-pre font-medium">추천</p>
      </div>
    </div>
  );
}

function Frame2117921494({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <Frame2117921476 selected={selected} />
      {selected && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="white"/>
        </svg>
      )}
    </div>
  );
}

function Frame2117921492({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame2117921498 selected={selected} />
      <Frame2117921494 selected={selected} />
    </div>
  );
}

function Frame2117921507({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div 
      className={`relative rounded-[6px] shrink-0 w-full cursor-pointer ${selected ? 'bg-[#2a3fec]' : 'bg-[#f4f6f9]'}`}
      onClick={onClick}
    >
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[14px] relative w-full">
          <Frame2117921492 selected={selected} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921490({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <Frame2117921507 selected={selected} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921499({ selected }: { selected: boolean }) {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow items-start leading-[0] min-h-px min-w-px not-italic relative shrink-0">
      <div className={`flex flex-col justify-center relative shrink-0 text-[14px] w-full ${selected ? 'text-white' : 'text-[#333950]'}`}>
        <p className="leading-[20px] font-medium">Binance Smart Chain</p>
      </div>
      <div className={`flex flex-col justify-center relative shrink-0 text-[11px] w-full ${selected ? 'text-[#c9cffa]' : 'text-[#999ea4]'}`}>
        <p className="leading-[16px] font-medium">BSC 메인넷</p>
      </div>
    </div>
  );
}

function Frame2117921500({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[30px]" data-name="image 7">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage7} />
      </div>
      <Frame2117921499 selected={selected} />
    </div>
  );
}

function Frame2117921508({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2117921500 selected={selected} />
    </div>
  );
}

function Frame2117921509({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div 
      className={`relative rounded-[6px] shrink-0 w-full cursor-pointer ${selected ? 'bg-[#2a3fec]' : 'bg-[#f4f6f9]'}`}
      onClick={onClick}
    >
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[14px] relative w-full">
          <Frame2117921508 selected={selected} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921491({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <Frame2117921509 selected={selected} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921510({ selectedNetwork, onSelectNetwork }: { selectedNetwork: Network | null; onSelectNetwork: (network: Network) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2117921489 selected={selectedNetwork === 'ethereum'} onClick={() => onSelectNetwork('ethereum')} />
      <Frame2117921490 selected={selectedNetwork === 'polygon'} onClick={() => onSelectNetwork('polygon')} />
      <Frame2117921491 selected={selectedNetwork === 'bsc'} onClick={() => onSelectNetwork('bsc')} />
    </div>
  );
}

function Frame2117921484({ selectedNetwork, onSelectNetwork }: { selectedNetwork: Network | null; onSelectNetwork: (network: Network) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame2117921486 />
      <Frame2117921510 selectedNetwork={selectedNetwork} onSelectNetwork={onSelectNetwork} />
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
          <p className="basis-0 font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] font-bold grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#111111] text-[14px]">기타 네트워크</p>
        </div>
      </div>
    </div>
  );
}

function Frame2117921501({ selected }: { selected: boolean }) {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow items-start leading-[0] min-h-px min-w-px not-italic relative shrink-0">
      <div className={`flex flex-col justify-center relative shrink-0 text-[14px] w-full ${selected ? 'text-white' : 'text-[#333950]'}`}>
        <p className="leading-[20px] font-medium">Avalanche</p>
      </div>
      <div className={`flex flex-col justify-center relative shrink-0 text-[11px] w-full ${selected ? 'text-[#c9cffa]' : 'text-[#999ea4]'}`}>
        <p className="leading-[16px] font-medium">아발란체 C-Chain</p>
      </div>
    </div>
  );
}

function Frame2117921502({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[30px]" data-name="image 8">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage8} />
      </div>
      <Frame2117921501 selected={selected} />
    </div>
  );
}

function Frame2117921512({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2117921502 selected={selected} />
    </div>
  );
}

function Frame2117921513({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div 
      className={`relative rounded-[6px] shrink-0 w-full cursor-pointer ${selected ? 'bg-[#2a3fec]' : 'bg-[#f4f6f9]'}`}
      onClick={onClick}
    >
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[14px] relative w-full">
          <Frame2117921512 selected={selected} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921514({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <Frame2117921513 selected={selected} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921503({ selected }: { selected: boolean }) {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow items-start leading-[0] min-h-px min-w-px not-italic relative shrink-0">
      <div className={`flex flex-col justify-center relative shrink-0 text-[14px] w-full ${selected ? 'text-white' : 'text-[#333950]'}`}>
        <p className="leading-[20px] font-medium">Optimism</p>
      </div>
      <div className={`flex flex-col justify-center relative shrink-0 text-[11px] w-full ${selected ? 'text-[#c9cffa]' : 'text-[#999ea4]'}`}>
        <p className="leading-[16px] font-medium">옵티미즘 메인넷</p>
      </div>
    </div>
  );
}

function Frame2117921504({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[30px]" data-name="image 9">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage9} />
      </div>
      <Frame2117921503 selected={selected} />
    </div>
  );
}

function Frame2117921515({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2117921504 selected={selected} />
    </div>
  );
}

function Frame2117921516({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div 
      className={`relative rounded-[6px] shrink-0 w-full cursor-pointer ${selected ? 'bg-[#2a3fec]' : 'bg-[#f4f6f9]'}`}
      onClick={onClick}
    >
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[14px] relative w-full">
          <Frame2117921515 selected={selected} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921517({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <Frame2117921516 selected={selected} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921505({ selected }: { selected: boolean }) {
  return (
    <div className="basis-0 content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow items-start leading-[0] min-h-px min-w-px not-italic relative shrink-0">
      <div className={`flex flex-col justify-center relative shrink-0 text-[14px] w-full ${selected ? 'text-white' : 'text-[#333950]'}`}>
        <p className="leading-[20px]">Solana</p>
      </div>
      <div className={`flex flex-col justify-center relative shrink-0 text-[11px] w-full ${selected ? 'text-[#c9cffa]' : 'text-[#999ea4]'}`}>
        <p className="leading-[16px]">솔라나 메인넷</p>
      </div>
    </div>
  );
}

function Frame2117921506({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <div className="relative shrink-0 size-[30px]" data-name="image 10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-[-9.28%] max-w-none size-[118.56%] top-[-9.28%]" src={imgImage10} />
        </div>
      </div>
      <Frame2117921505 selected={selected} />
    </div>
  );
}

function Frame2117921518({ selected }: { selected: boolean }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2117921506 selected={selected} />
    </div>
  );
}

function Frame2117921519({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div 
      className={`relative rounded-[6px] shrink-0 w-full cursor-pointer ${selected ? 'bg-[#2a3fec]' : 'bg-[#f4f6f9]'}`}
      onClick={onClick}
    >
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[14px] relative w-full">
          <Frame2117921518 selected={selected} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921520({ selected, onClick }: { selected: boolean; onClick: () => void }) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <Frame2117921519 selected={selected} onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

function Frame2117921521({ selectedNetwork, onSelectNetwork }: { selectedNetwork: Network | null; onSelectNetwork: (network: Network) => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame2117921514 selected={selectedNetwork === 'avalanche'} onClick={() => onSelectNetwork('avalanche')} />
      <Frame2117921517 selected={selectedNetwork === 'optimism'} onClick={() => onSelectNetwork('optimism')} />
      <Frame2117921520 selected={selectedNetwork === 'solana'} onClick={() => onSelectNetwork('solana')} />
    </div>
  );
}

function Frame2117921485({ selectedNetwork, onSelectNetwork }: { selectedNetwork: Network | null; onSelectNetwork: (network: Network) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame2117921511 />
      <Frame2117921521 selectedNetwork={selectedNetwork} onSelectNetwork={onSelectNetwork} />
    </div>
  );
}

function Frame2117921493({ selectedNetwork, onSelectNetwork }: { selectedNetwork: Network | null; onSelectNetwork: (network: Network) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame2117921484 selectedNetwork={selectedNetwork} onSelectNetwork={onSelectNetwork} />
      <Frame2117921485 selectedNetwork={selectedNetwork} onSelectNetwork={onSelectNetwork} />
    </div>
  );
}

function Frame2117921522({ selectedNetwork, onSelectNetwork }: { selectedNetwork: Network | null; onSelectNetwork: (network: Network) => void }) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[56px] items-center left-[16px] top-[92px] w-[328px]">
      <Frame2117921363 />
      <Frame2117921493 selectedNetwork={selectedNetwork} onSelectNetwork={onSelectNetwork} />
    </div>
  );
}

interface WalletNetworkSelectionProps {
  onNavigateBack?: () => void;
  onNext?: () => void;
}

export default function WalletNetworkSelection({ onNavigateBack, onNext }: WalletNetworkSelectionProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);

  const handleNext = () => {
    if (selectedNetwork === 'polygon' && onNext) {
      onNext();
    }
  };

  return (
    <div className="bg-white relative flex size-full min-h-full flex-col" data-name="02.네트워크선택-전">
      <Header onNavigateBack={onNavigateBack} />
      <Frame2117921522 selectedNetwork={selectedNetwork} onSelectNetwork={setSelectedNetwork} />
      
      {/* Next Button - only show when network is selected */}
      {selectedNetwork && (
        <MobileStickyFooter>
          <Button
            onClick={handleNext}
            variant="primary"
            size="lg"
            className="w-full"
          >
            다음
          </Button>
        </MobileStickyFooter>
      )}
    </div>
  );
}