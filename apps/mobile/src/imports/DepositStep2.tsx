import svgPaths from "./svg-79j1gdg19g";
import { Button, Input, SmallButton } from "@digital-wallet/ui";

function Group820325() {
  return (
    <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[234px] mt-[11px] place-items-start relative" data-name="Group820325">
      <div className="[grid-area:1_/_1] ml-0 mt-0 size-[28px]" data-name="Rectangle154476" />
    </div>
  );
}

function Header() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="+ HEADER">
      <div className="[grid-area:1_/_1] h-[52px] ml-0 mt-0 relative w-[360px]" data-name="bg">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 52">
          <path d="M0 0H360V52H0V0Z" fill="var(--fill-0, white)" id="bg" />
        </svg>
      </div>
      <div className="[grid-area:1_/_1] h-[32.474px] ml-[12px] mt-[13.918px] relative w-[28px]" data-name="ic_00com_28_line_arrow_l_111">
        <div className="absolute inset-0" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g id="Vector"></g>
          </svg>
        </div>
        <div className="absolute inset-[21.43%_35.71%]" data-name="Vector">
          <div className="absolute inset-[-4.04%_-9.38%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 21">
              <path d={svgPaths.p2c0ecd80} id="Vector" stroke="var(--stroke-0, #111111)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] h-[27.835px] justify-center ml-[40px] mt-[30.155px] not-italic relative text-[#111111] text-[16px] translate-y-[-50%] w-[112px]">
        <p className="leading-[24px]">USDC 입금</p>
      </div>
      <Group820325 />
    </div>
  );
}

function Frame2117921382() {
  return (
    <div className="h-[4px] relative shrink-0 w-[360px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 360 4">
        <g id="Frame 2117921382">
          <rect fill="#EEEEEE" height="4" width="360" />
          <path d={svgPaths.p2b05d700} fill="url(#paint0_linear_4_6324)" id="np_00com_indicator_sld.9" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_4_6324" x1="0" x2="43.1579" y1="0" y2="118.954">
            <stop stopColor="#4A2AEC" />
            <stop offset="1" stopColor="#3860FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Frame2117921389() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[10px] h-[20px] items-center justify-center p-[2px] relative rounded-[4px] shadow-[0px_0px_3px_0px_rgba(17,17,17,0.18)] shrink-0 w-[47px]">
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#333950] text-[11px] text-center w-[43px]">
        <p className="leading-[16px]">직접입력</p>
      </div>
    </div>
  );
}

function Frame2117921388() {
  return (
    <div className="bg-[#e7eaef] box-border content-stretch flex gap-[4px] h-[28px] items-center p-[4px] relative rounded-[6px] shrink-0 w-[106px]">
      <Frame2117921389 />
      <div className="flex flex-col font-['Spoqa_Han_Sans_Neo:Medium',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#999ea4] text-[11px] text-center w-[47px]">
        <p className="leading-[16px]">최대한도</p>
      </div>
    </div>
  );
}

function Frame2117921340() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">입금 USDC 수량</p>
      <Frame2117921388 />
    </div>
  );
}

function UsdcAmountInput() {
  return (
    <Input 
      type="text"
      placeholder="금액을 입력하세요"
      defaultValue="1,000"
      suffix={
        <span className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-medium text-[14px] text-[#111111]">
          USDC
        </span>
      }
      helperText="최대 한도 76,520 USDC"
    />
  );
}

function Frame2117921383() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <Frame2117921340 />
      <UsdcAmountInput />
    </div>
  );
}

function AddressInput() {
  return (
    <Input 
      type="text"
      placeholder="주소를 입력하세요"
      defaultValue="0x9f8e7d6c5b4a3f2e1d0c9b8a..."
      suffix={
        <SmallButton>
          주소확인
        </SmallButton>
      }
    />
  );
}

function Frame2117921393() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
      <p className="font-['Spoqa_Han_Sans_Neo',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[#111111] text-[14px] text-nowrap whitespace-pre">입금받을 주소</p>
      <AddressInput />
    </div>
  );
}

function Frame2117921394() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full">
      <Frame2117921383 />
      <Frame2117921393 />
    </div>
  );
}

function Frame830609() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[20px] items-start pb-0 pt-[32px] px-[20px] relative w-full">
          <div className="font-['Spoqa_Han_Sans_Neo:Bold',sans-serif] leading-[28px] not-italic relative shrink-0 text-[#111111] text-[20px] text-nowrap tracking-[-0.5px] whitespace-pre">
            <p className="mb-0">입금할 금액을</p>
            <p>입력해주세요</p>
          </div>
          <Frame2117921394 />
        </div>
      </div>
    </div>
  );
}

function Frame2117921386() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame830609 />
    </div>
  );
}

function Frame2117921381() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 top-0 w-[360px]">
      <Header />
      <Frame2117921382 />
      <Frame2117921386 />
    </div>
  );
}

function Btn() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pb-[20px] px-[20px] bg-gradient-to-t from-white via-white to-transparent pt-[24px]">
      <Button 
        variant="primary" 
        size="lg"
        className="w-full"
      >
        다음
      </Button>
    </div>
  );
}

export default function Component0502() {
  return (
    <div className="bg-white relative w-full min-h-screen" data-name="05.입금-02">
      <Frame2117921381 />
      <Btn />
    </div>
  );
}