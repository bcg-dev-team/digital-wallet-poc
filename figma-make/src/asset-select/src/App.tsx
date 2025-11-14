import { useState } from "react";
import svgPaths from "./imports/svg-q7483i82xf";
import imgImage4 from "figma:asset/d354673552a465504a29e5fb8faea6af002ba04b.png";
import imgImage6 from "figma:asset/e6769d863f16bbccc165602f58f3391daffd454e.png";
import imgImage7 from "figma:asset/c70a76a62088b5d21df9ee6ece31859439bd6a1d.png";
import imgImage8 from "figma:asset/c464d9e903817c3ef7f389ae66705c9445719c95.png";

function Group2() {
  return (
    <div className="absolute inset-[8.33%]">
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
    <div className="absolute contents inset-[8.33%]" data-name="Mask group">
      <Group2 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[8.33%]">
      <MaskGroup />
    </div>
  );
}

function Img00ComApngCompleted() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="img_00com_apng_completed">
      <Group1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center not-italic relative shrink-0 text-center w-full">
      <p className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[28px] min-w-full relative shrink-0 text-[#111111] text-[20px] tracking-[-0.5px] w-[min-content]">자산 선택</p>
      <p className="font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] leading-[20px] relative shrink-0 text-[#999ea4] text-[14px] text-nowrap whitespace-pre">사용할 자산을 선택해주세요</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-center relative shrink-0">
      <Img00ComApngCompleted />
      <Frame />
      <div className="absolute h-[15.552px] left-[70px] top-[17px] w-[22px]" data-name="Vector">
        <div className="absolute inset-0" style={{ "--fill-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 16">
            <path d={svgPaths.p20a3d080} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[4px] py-0 relative w-full">
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none scale-y-[-100%]">
              <div className="relative size-[8px]">
                <div className="absolute inset-0" style={{ "--fill-0": "rgba(224, 45, 35, 1)" } as React.CSSProperties}>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" fill="var(--fill-0, #E02D23)" id="Ellipse 91412" r="4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <p className="basis-0 font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[#111111] text-[14px]">전체 자산</p>
        </div>
      </div>
    </div>
  );
}

interface AssetItemProps {
  name: string;
  nameKo: string;
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

function AssetItem({ name, nameKo, image, isSelected, onClick }: AssetItemProps) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <div 
            className={`relative rounded-[6px] shrink-0 w-full cursor-pointer transition-colors ${
              isSelected ? 'bg-[#2A3FEC]' : 'bg-[#f4f6f9]'
            }`}
            onClick={onClick}
          >
            <div className="size-full">
              <div className="box-border content-stretch flex flex-col gap-[10px] items-start px-[16px] py-[14px] relative w-full">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
                    <div className="relative shrink-0 size-[30px]">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={image} />
                    </div>
                    <div className="basis-0 content-stretch flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] grow items-start leading-[0] min-h-px min-w-px not-italic relative shrink-0">
                      <div className="flex flex-col justify-center relative shrink-0 text-[14px] w-full">
                        <p className={`leading-[20px] ${isSelected ? 'text-white' : 'text-[#333950]'}`}>{name}</p>
                      </div>
                      <div className="flex flex-col justify-center relative shrink-0 text-[11px] w-full">
                        <p className={`leading-[16px] ${isSelected ? 'text-white opacity-80' : 'text-[#999ea4]'}`}>{nameKo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame26({ selectedAsset, onSelectAsset }: { selectedAsset: string; onSelectAsset: (asset: string) => void }) {
  const assets = [
    { id: 'ethereum', name: 'Ethereum', nameKo: '이더리움', image: imgImage4 },
    { id: 'bitcoin', name: 'Bitcoin', nameKo: '비트코인', image: imgImage6 },
    { id: 'usdt', name: 'USDT', nameKo: '테더', image: imgImage7 },
    { id: 'usdc', name: 'USDC', nameKo: 'USD Coin', image: imgImage8 },
  ];

  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      {assets.map((asset) => (
        <AssetItem
          key={asset.id}
          name={asset.name}
          nameKo={asset.nameKo}
          image={asset.image}
          isSelected={selectedAsset === asset.id}
          onClick={() => onSelectAsset(asset.id)}
        />
      ))}
    </div>
  );
}

function Frame2({ selectedAsset, onSelectAsset }: { selectedAsset: string; onSelectAsset: (asset: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame4 />
      <Frame26 selectedAsset={selectedAsset} onSelectAsset={onSelectAsset} />
    </div>
  );
}

function Frame11({ selectedAsset, onSelectAsset }: { selectedAsset: string; onSelectAsset: (asset: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
      <Frame2 selectedAsset={selectedAsset} onSelectAsset={onSelectAsset} />
    </div>
  );
}

function Frame3({ selectedAsset, onSelectAsset }: { selectedAsset: string; onSelectAsset: (asset: string) => void }) {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[56px] items-center left-[16px] pb-[130px] pt-0 px-0 top-[92px] w-[328px]">
      <Frame1 />
      <Frame11 selectedAsset={selectedAsset} onSelectAsset={onSelectAsset} />
    </div>
  );
}

function Img00ComBtnbg360Bg() {
  return (
    <div className="absolute bottom-0 h-[92px] left-0 w-[360px]" data-name="img_00com_btnbg_360_bg">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 92">
        <g id="img_00com_btnbg_360_bg">
          <path d="M0 24H360V92H0V24Z" fill="var(--fill-0, white)" id="Rectangle 154436" />
          <path d="M0 0H360V24H0V0Z" fill="url(#paint0_linear_1_180)" id="Rectangle 154438" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_180" x1="180" x2="180" y1="2.5" y2="24">
            <stop stopColor="white" stopOpacity="0" />
            <stop offset="1" stopColor="white" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ButtonBtnMain({ disabled }: { disabled: boolean }) {
  return (
    <div className="h-[52px] relative shrink-0 w-[320px]" data-name="Button/btn_main">
      <div className={`absolute inset-0 rounded-[8px] ${disabled ? 'bg-[#c9cffa]' : 'bg-[#2A3FEC]'}`} data-name="btn_main_d.9" />
      <p className="absolute font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[26.92%_6.25%] leading-[24px] not-italic text-[16px] text-center text-white">다음</p>
    </div>
  );
}

function Btn({ disabled }: { disabled: boolean }) {
  return (
    <div className="absolute bottom-0 box-border content-stretch flex flex-col gap-[10px] h-[92px] items-start left-0 p-[20px] w-[360px]" data-name="+ BTN">
      <Img00ComBtnbg360Bg />
      <ButtonBtnMain disabled={disabled} />
    </div>
  );
}

function Ic00Com28LineArrowL() {
  return (
    <div className="absolute inset-[1.55%_88.89%_94.85%_3.33%]" data-name="ic_00com_28_line_arrow_l_111">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="ic_00com_28_line_arrow_l_111">
          <g id="Vector"></g>
          <path d="M18 22L10 14L18 6" id="Vector_2" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[234px] top-[11px]" data-name="Group820325">
      <div className="absolute left-[234px] size-[28px] top-[11px]" data-name="Rectangle154476" />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute contents left-0 top-0" data-name="+ HEADER">
      <div className="absolute h-[52px] left-0 top-0 w-[360px]" data-name="bg">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 52">
          <path d="M0 0H360V52H0V0Z" fill="var(--fill-0, white)" id="bg" />
        </svg>
      </div>
      <Ic00Com28LineArrowL />
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] inset-[1.8%_57.78%_95.1%_11.11%] justify-center leading-[0] not-italic text-[#111111] text-[16px]">
        <p className="leading-[24px]">SOL 디지털 월렛</p>
      </div>
      <Group />
    </div>
  );
}

export default function Component() {
  const [selectedAsset, setSelectedAsset] = useState<string>("");

  return (
    <div className="bg-white relative size-full" data-name="02.네트워크선택-전">
      <Btn disabled={!selectedAsset} />
      <Header />
      <Frame3 selectedAsset={selectedAsset} onSelectAsset={setSelectedAsset} />
    </div>
  );
}
