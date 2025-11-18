import { Button } from "@digital-wallet/ui";
import svgPaths from "./svg-clh66pir2u";
import MobileStickyFooter from "../components/layout/MobileStickyFooter";
import MobilePageHeader from "../components/ui/MobilePageHeader";

function Header({ onNavigateBack }: { onNavigateBack?: () => void }) {
  return <MobilePageHeader title="SOL 디지털 월렛" onBack={onNavigateBack} />;
}

function Frame2117921342() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center leading-[0] not-italic relative shrink-0 text-center w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center relative shrink-0 text-[#111111] text-[20px] tracking-[-0.1px] w-full">
        <p className="leading-[28px] font-bold">SOL 디지털 월렛</p>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center relative shrink-0 text-[#999ea4] text-[14px] tracking-[-0.07px] w-full">
        <p className="leading-[24px]">스테이블 코인으로 음악 저작권에 투자하세요</p>
      </div>
    </div>
  );
}

function Frame2117921343() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[20px] items-center left-0 pb-0 pt-[40px] px-0 top-[52px] w-[360px]">
      <div className="relative shrink-0 size-[40px]" data-name="logo">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
          <g id="logo">
            <path d={svgPaths.p10551fc0} fill="white" />
            <path d={svgPaths.p32aa580} fill="var(--fill-0, #1253FF)" />
          </g>
        </svg>
      </div>
      <Frame2117921342 />
    </div>
  );
}

function Btn({ onStart }: { onStart?: () => void }) {
  return (
    <MobileStickyFooter>
      <Button variant="primary" size="lg" className="w-full" onClick={onStart}>
        시작하기
      </Button>
    </MobileStickyFooter>
  );
}

function Frame2117921346() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center min-w-full relative shrink-0 text-[#333950] text-[16px] tracking-[-0.08px] w-[min-content]">
        <p className="leading-[24px] font-bold">간편한 입금</p>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center min-w-full relative shrink-0 text-[#77738c] text-[13px] w-[min-content]">
        <p className="leading-[20px]">MetaMask로 USDC를 간편하게 입금하세요</p>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center left-[242px] text-[#333950] text-[38px] text-nowrap top-[6.79px] tracking-[-0.19px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">💵</p>
      </div>
    </div>
  );
}

function Frame2117921347() {
  return (
    <div className="bg-[#f4f6f9] relative rounded-[6px] shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[24px] relative w-full">
          <Frame2117921346 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921348() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <Frame2117921347 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921351() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#77738c] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">{`USDC를 DT로 즉시 환전하세요 (1DT `}</p>
      </div>
      <div className="h-[4.818px] relative shrink-0 w-[8.129px]" data-name="text">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 5">
          <path d={svgPaths.p3060fd40} fill="var(--fill-0, #777E8C)" id="text" />
        </svg>
      </div>
    </div>
  );
}

function Frame2117921352() {
  return (
    <div className="content-stretch flex gap-[2px] items-center relative shrink-0">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#77738c] text-[13px] text-nowrap">
        <p className="leading-[20px] whitespace-pre">1원)</p>
      </div>
    </div>
  );
}

function Frame2117921353() {
  return (
    <div className="content-stretch flex gap-[2px] items-start relative shrink-0">
      <Frame2117921351 />
      <Frame2117921352 />
    </div>
  );
}

function Frame2117921350() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#333950] text-[16px] tracking-[-0.08px] w-[min-content]">
        <p className="leading-[24px] font-bold">실시간 환전</p>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center leading-[0] left-[246px] not-italic text-[#333950] text-[30px] text-nowrap top-[4.85px] tracking-[-0.15px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">🔄</p>
      </div>
      <Frame2117921353 />
    </div>
  );
}

function Frame2117921354() {
  return (
    <div className="bg-[#f4f6f9] relative rounded-[6px] shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[24px] relative w-full">
          <Frame2117921350 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921356() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <Frame2117921354 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921357() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] not-italic relative shrink-0 w-full">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center min-w-full relative shrink-0 text-[#333950] text-[16px] tracking-[-0.08px] w-[min-content]">
        <p className="leading-[24px] font-bold">음악 저작권 투자</p>
      </div>
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] justify-center min-w-full relative shrink-0 text-[#77738c] text-[13px] w-[min-content]">
        <p className="leading-[20px]">DT로 인기 아티스트 저작권을 거래하세요</p>
      </div>
      <div className="absolute flex flex-col font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] justify-center left-[244px] text-[#333950] text-[35px] text-nowrap top-[6.5px] tracking-[-0.175px] translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">🎼</p>
      </div>
    </div>
  );
}

function Frame2117921358() {
  return (
    <div className="bg-[#f4f6f9] relative rounded-[6px] shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[24px] relative w-full">
          <Frame2117921357 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921359() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start p-[4px] relative w-full">
          <Frame2117921358 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921349() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[4px] items-start left-0 px-[16px] py-[10px] top-[230px] w-[360px]">
      <Frame2117921348 />
      <Frame2117921356 />
      <Frame2117921359 />
    </div>
  );
}

function Frame2117921355() {
  return (
    <div className="absolute h-[8px] left-[158px] top-[582px] w-[44px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 8">
        <g id="Frame 2117921355">
          <circle cx="4" cy="4" fill="var(--fill-0, #2A3FEC)" id="Ellipse 91406" r="4" />
          <circle cx="16" cy="4" fill="var(--fill-0, #C9CFFA)" id="Ellipse 91407" r="4" />
          <circle cx="28" cy="4" fill="var(--fill-0, #C9CFFA)" id="Ellipse 91408" r="4" />
          <circle cx="40" cy="4" fill="var(--fill-0, #C9CFFA)" id="Ellipse 91409" r="4" />
        </g>
      </svg>
    </div>
  );
}

export default function WalletOnboardingScreen({ onNavigateBack, onStart }: { onNavigateBack?: () => void; onStart?: () => void }) {
  return (
    <div className="bg-white relative flex size-full min-h-full flex-col" data-name="01.지갑온보딩">
      <Header onNavigateBack={onNavigateBack} />
      <Frame2117921343 />
      <Btn onStart={onStart} />
      <Frame2117921349 />
      <Frame2117921355 />
      <div className="absolute font-['Spoqa_Han_Sans_Neo:Regular',sans-serif] leading-[16px] left-[179.5px] not-italic text-[#999ea4] text-[11px] text-center text-nowrap top-[714px] translate-x-[-50%] whitespace-pre">
        <p className="mb-0">시작하기를 누르면 이용약관 및 개인정보처리방침에</p>
        <p>동의하는 것으로 간주됩니다</p>
      </div>
    </div>
  );
}